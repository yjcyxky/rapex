(ns rapex.plugins.rapex.boxplot-multiple-organs
  (:require [clojure.data.json :as json]
            [tservice-core.tasks.async :refer [make-events-init]]
            [rapex.rwrapper.opencpu :as ocpu]
            [clojure.spec.alpha :as s]
            [rapex.plugins.rapex.util :refer [draw-chart-fn update-process! gen-organ-map remove-field]]
            [rapex.config :refer [get-default-dataset]]
            [rapex.db.query-data :as qd]
            [rapex.plugins.rapex.chart-sepcs :as cs]
            [clojure.string :as clj-str]))

(def chart-name "rapex-boxplot-organs")

(defn- convert-record-map
  [organ record-map]
  (let [ensembl-id (get record-map :ensembl_id)]
    (map (fn [[key val]] {:group (second (clj-str/split (name key) #"_"))
                          :gene_symbol ensembl-id
                          :sample_name key
                          :organ organ
                          :value val})
         (dissoc record-map :ensembl_id))))

(defn- convert-db-results
  "Convert db results to a list of hash-map.
   
   [[{:a 1} {:a 2}] [{:a 3} {:a 4}] [{:a 5}]] -> [{:a 1 } {:a 2} {:a 3} {:a 4} {:a 5}]
  "
  [organ results]
  (->> (map #(convert-record-map organ %) results)
       (apply concat)))

(defn- query-db
  [dataset table ensembl-id]
  (try
    (let [query-map {:select [:*]
                     :from [(keyword table)]
                     :where [:= :ensembl_id ensembl-id]}
          ;; "expr_gut_fpkm" -> ["gut" "fpkm"]
          organ (second (clj-str/split table #"_"))
          results (qd/get-results (qd/get-db-path dataset) query-map)]
      (convert-db-results organ results))
    ;; TODO: Need to record the message into a log file.
    (catch Exception e
      [])))

(defn draw-boxplot!
  [{:keys [plot-json-path plot-path plot-data-path task-id log-path payload]}]
  (try
    (let [method (or (:method payload) "t.test")
          datatype (or (:datatype payload) "fpkm")
          log_scale (:log_scale payload)
          jitter_size (or (:jitter_size payload) 0.4)
          ;; Multiple items, such as ["gut" "lng"]
          organ (:organ payload)
          dataset (or (:dataset payload) (get-default-dataset))
          ensembl_id (:gene_symbol payload)
          results (map #(query-db dataset % ensembl_id)
                       (map #(format "expr_%s_%s" % datatype) organ))
          ;; [[{}] [{}] []] -> [{} {}]
          d (apply concat results)
          _ (spit plot-data-path (json/write-str d))
          resp (ocpu/draw-plot! "boxplotly" :params {:d (remove-field d :sample_name) :filetype "png"
                                                     :levels ["PM" "FA"]
                                                     :data_type (clj-str/upper-case datatype)
                                                     :method method :jitter_size jitter_size
                                                     :log_scale log_scale})
          out-log (json/write-str {:status "Success" :msg (ocpu/read-log! resp)})]
      (ocpu/read-plot! resp plot-json-path)
      (ocpu/read-png! resp plot-path)
      (spit log-path out-log)
      (update-process! task-id 100))
    (catch Exception e
      (spit log-path (json/write-str {:status "Failed" :msg (.toString e)}))
      (update-process! task-id -1))))

(def events-init
  "Automatically called during startup; start event listener for boxplot events.
   
   Known Issue: The instance will generate several same async tasks when you reload the jar."
  (make-events-init chart-name draw-boxplot!))

(def manifest
  {:name "Boxplot for multiple organs"
   :version "v0.1.0"
   :description ""
   :category "Chart"
   :home "https://github.com/rapex-lab/rapex/tree/master/rapex/src/rapex/tasks"
   :source "Rapex Team"
   :short_name chart-name
   :icons [{:src ""
            :type "image/png"
            :sizes "144x144"}]
   :author "Jingcheng Yang"
   :maintainers ["Jingcheng Yang" "Tianyuan Cheng"]
   :tags ["R" "Chart"]
   :readme "https://rapex.prophetdb.org/README/boxplot_organs.md"
   :id chart-name})

(s/def ::gene_symbol string?)
(s/def ::organ (s/coll-of cs/organ-sets))
(def schema (s/keys :req-un [::gene_symbol ::organ ::cs/dataset ::cs/datatype]
                    :opt-un [::cs/method ::cs/log_scale ::cs/jitter_size]))

(defn post-boxplot!
  []
  {:summary    "Draw a boxplot."
   :parameters {:body schema}
   :responses  {201 {:body {:task_id string?}}
                404 {:body {:msg string?
                            :context any?}}
                400 {:body {:msg string?
                            :context any?}}
                500 {:body {:msg string?
                            :context any?}}}
   :handler    (fn [{{{:as payload} :body} :parameters
                     {:as headers} :headers}]
                 (draw-chart-fn chart-name payload :owner (or (get headers "x-auth-users") "default")))})

(defn ui-schema-fn
  [dataset]
  (let [organ-map (gen-organ-map :dataset dataset)
        datatype-map {:fpkm {:text (clj-str/upper-case "fpkm")}}]
    {:readme "https://rapex.prophetdb.org/README/boxplot_organs.md"
     :schema
     {:fields  [{:key "gene_symbol"
                 :dataIndex "gene_symbol"
                 :valueType "gene_searcher"
                 :title "Gene Symbol"
                 :tooltip "Which gene do you want to query?"
                 :formItemProps {:rules [{:required true
                                          :message "gene_symbol field is required."}]}}
                {:key "organ"
                 :dataIndex "organ"
                 :valueType "select"
                 :title "Organ"
                 :tooltip "Which organ do you want to query?"
                 :valueEnum organ-map
                 :fieldProps {:mode "multiple"}
                 :formItemProps {:rules [{:required true
                                          :message "organ filed is required."}]}}
                {:key "datatype"
                 :dataIndex "datatype"
                 :valueType "select"
                 :title "Data Type"
                 :tooltip "Which datatype do you want to query?"
                 :valueEnum datatype-map
                 :formItemProps {:rules [{:required true
                                          :message "datatype filed is required."}]}}
                {:key "method"
                 :dataIndex "method"
                 :valueType "select"
                 :title "Method"
                 :tooltip "The statistical test method to be used. Allowed values are t.test (default) wilcox.test anova kruskal.test"
                 :valueEnum {:t.test {:text "T Test"} :wilcox.test {:text "Wilcox Test"}
                             :anova {:text "Anova"} :kruskal.test {:text "Kruskal Test"}}
                 :formItemProps {:initialValue "t.test"
                                 :rules [{:required true
                                          :message "method filed is required."}]}}
                {:key "log_scale"
                 :dataIndex "log_scale"
                 :valueType "switch"
                 :title "Log Scale"
                 :tooltip
                 "Logical value. If TRUE input data will be transformation using log2 function."
                 :formItemProps {:initialValue true}}
                {:key "jitter_size"
                 :dataIndex "jitter_size"
                 :valueType "digit"
                 :title "Jitter Size"
                 :tooltip "Jitter size greater than 0 and less than 1."
                 :fieldProps {:step 0.1}
                 :formItemProps {:initialValue 0.4}}]
      :examples [{:title "Example 1"
                  :key "example-1"
                  :arguments {:method "t.test"
                              :log_scale false
                              :jitter_size 0.4
                              :datatype "FPKM"}}]}}))
