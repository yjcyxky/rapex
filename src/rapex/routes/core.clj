(ns rapex.routes.core
  (:require [clojure.spec.alpha :as s]
            [clojure.string :as clj-str]
            [clojure.tools.logging :as log]
            [reitit.coercion.spec :as spec-coercion]
            [reitit.ring.coercion :as coercion]
            [reitit.ring.middleware.multipart :as multipart]
            [reitit.ring.middleware.muuntaja :as muuntaja]
            [reitit.ring.middleware.parameters :as parameters]
            [reitit.swagger-ui :as swagger-ui]
            [reitit.swagger :as swagger]
            [rapex.routes.core-specs :as specs]
            [clojure.java.io :as io]
            [ring.util.http-response :refer [ok not-found]]
            [ring.util.mime-type :as mime-type]
            [rapex.config :refer [env get-real-path] :as config]
            [local-fs.core :as fs-lib]
            [rapex.util :as u]
            [rapex.middleware.exception :as exception]
            [rapex.middleware.formats :as formats]
            [rapex.routes.task :as task-route]
            [rapex.plugins.core :as plugins-route]
            [rapex.routes.graph :as gdb-route]
            [rapex.routes.model :as model-route]
            [remote-fs.route :as fs-route]
            [rapex.routes.graphstore :as graphstore-route]
            [rapex.version :as v]
            [rapex.db.core :as db]))

(def workdir (:workdir env))

(defn get-workdir
  ([]
   (fs-lib/join-paths workdir (u/uuid)))
  ([& {:keys [username uuid]}]
   (try
     (let [uuid (or uuid (u/uuid))
           subpath (if username (fs-lib/join-paths username uuid) uuid)]
       (fs-lib/join-paths workdir subpath))
     (catch Exception e
       (log/error "You need to run setup-workdir-root function firstly.")))))

(defn get-relative-filepath
  [filepath & {:keys [filemode]
               :or {filemode true}}]
  (let [replace-str (if filemode "." "")]
    (-> filepath
        (clj-str/replace (re-pattern workdir) replace-str)
        (clj-str/replace #"^\/" ""))))

(defn routes []
  ["/api"
   {:coercion spec-coercion/coercion
    :muuntaja formats/instance
    :swagger {:id ::api}
    :middleware [;; query-params & form-params
                 parameters/parameters-middleware
                 ;; content-negotiation
                 muuntaja/format-negotiate-middleware
                 ;; encoding response body
                 muuntaja/format-response-middleware
                 ;; exception handling
                 exception/exception-middleware
                 ;; decoding request body
                 muuntaja/format-request-middleware
                 ;; coercing response bodys
                 coercion/coerce-response-middleware
                 ;; coercing request parameters
                 coercion/coerce-request-middleware
                 ;; multipart
                 multipart/multipart-middleware]}

   ;; swagger documentation
   ["" {:no-doc true
        :swagger {:info {:title "API Service for Quartet Service."
                         :description "https://cljdoc.org/d/metosin/reitit"
                         :version "v1"}}}

    ["/swagger.json"
     {:get (swagger/create-swagger-handler)}]

    ["/api-docs/*"
     {:get (swagger-ui/create-swagger-ui-handler
            {:url "/api/swagger.json"
             :config {:validator-url nil}})}]]

   ["/v1" {:no-doc false}
    ["/version"
     {:tags ["Utility"]
      :get {:summary "Get the version of rapex instance."
            :parameters {}
            :responses {200 {:body specs/instance-version}}
            :handler (fn [_]
                       (ok {:version (v/get-version "com.github.rapex-lab" "rapex")
                            :revision (v/get-revision "com.github.rapex-lab" "rapex")
                            :db_version (db/get-db-version)}))}}]

    ["/studio-config"
     {:tags ["Utility"]
      :get {:summary "Get the config for studio."
            :parameters {}
            :responses {200 {:body ::config/studio-config}}
            :handler (fn [_]
                       (ok (config/get-studio-config)))}}]

    ["/download"
     {:tags ["File"]
      :get {:summary "Downloads a file"
            :parameters {:query specs/filelink-params-query}
            :handler (fn [{{{:keys [filelink]} :query} :parameters}]
                       (try
                         {:status 200
                          :headers {"Content-Type" (or (mime-type/ext-mime-type filelink) "text/plain")}
                          :body (-> (get-real-path filelink)
                                    (io/input-stream))}
                         (catch Exception e
                           (log/error (format "Cannot find the file (%s --> %s), the reason is %s"
                                              filelink
                                              (get-real-path filelink)
                                              (.toString e)))
                           (not-found {:msg "No such file."}))))}}]

    ["/upload"
     {:tags ["File"]
      :post {:summary "Uploads File(s)."
             :parameters {:multipart {:files (s/or :file multipart/temp-file-part :files (s/coll-of multipart/temp-file-part))}}
             :handler (fn [{{{:keys [files]} :multipart} :parameters}]
                        (let [files (if (map? files) [files] files)
                              to-dir (get-workdir)]
                          (doseq [file files]
                            (let [filename (:filename file)
                                  tempfile (:tempfile file)
                                  to-path (fs-lib/join-paths to-dir filename)]
                              (log/info "Upload file: " filename)
                              (fs-lib/create-directories! to-dir)
                              (fs-lib/copy tempfile to-path)))
                          {:status 201
                           :body {:upload_path (str "file://" (get-relative-filepath to-dir))
                                  :files (map #(:filename %) files)
                                  :total (count files)}}))}}]]

   ["/v1" {:no-doc false}
    task-route/routes
    fs-route/routes
    gdb-route/routes
    plugins-route/routes
    graphstore-route/routes
    model-route/routes]])
