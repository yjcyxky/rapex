(self.webpackChunkbiomedgps_studio=self.webpackChunkbiomedgps_studio||[]).push([[520],{42872:function(ce,F,o){"use strict";o.r(F),o.d(F,{default:function(){return Le}});var R=o(18106),C=o(63885),v=o(2824),f=o(67294),ee=o(13062),P=o(71230),te=o(34792),H=o(48086),O=o(93224),q=o(39428),U=o(3182),E=o(11849),Y=o(14388),W=o(83461),w=o(51615),G=o(98361),n=o(74310);function B(s,a,h){console.log("makeQueryStr filter: ",h);var m=":select [:*]",p="",d="";if(a){var c=Object.keys(a)[0],b=Object.values(a)[0];c&&b&&(b==="ascend"?p=":order-by [:".concat(c,"]"):p=":order-by [[:".concat(c," :desc]]"))}if(s){for(var l=[],y=0,t=Object.keys(s);y<t.length;y++){var r=t[y];r=="queried_id"&&s[r].length>0&&(s[r].match(/ENS/i)?l.push('[:like [:upper :ensembl_id] [:upper "%'.concat(s[r],'%"]]')):s[r].match(/[a-zA-Z][a-zA-Z0-9]+/i)?l.push('[:like [:upper :gene_symbol] [:upper "%'.concat(s[r],'%"]]')):s[r].match(/[0-9]+/i)&&l.push('[:like [:upper :entrez_id] [:upper "%'.concat(s[r],'%"]]'))),["current","pageSize","queried_id","dataset"].indexOf(r)<0&&s[r].length>0&&l.push("[:like [:upper :".concat(r,'] [:upper "%').concat(s[r],'%"]]'))}l.length==1?d=":where ".concat(l[0]):l.length>1&&(d=":where [:and ".concat(l.join(" "),"]"))}return"{".concat(m," ").concat(p," ").concat(d,"}")}var e=o(85893),he=["type","defaultRender"];function V(s){return Promise.resolve((0,E.Z)((0,E.Z)({},s),{},{success:!0}))}var pe=function(a){var h=(0,w.k6)(),m=a.queryDEGs,p=a.queryGenes,d=a.queryGeneBaseUrl,c=a.defaultDataset,b=function(){var j=(0,U.Z)((0,q.Z)().mark(function g(i,S,_){return(0,q.Z)().wrap(function(Z){for(;;)switch(Z.prev=Z.next){case 0:if(console.log("requestDEGs: ",S,_),!(i.method&&i.datatype&&i.organ)){Z.next=7;break}return Z.next=4,m({page:i.current,page_size:i.pageSize,query_str:B(i,S,_),dataset:"".concat(c)}).then(function(I){return V(I)}).catch(function(I){return console.log("requestDEGs Error: ",I),V({total:0,page:1,page_size:10,data:[]})});case 4:return Z.abrupt("return",Z.sent);case 7:return Z.abrupt("return",V({total:0,page:1,page_size:10,data:[]}));case 8:case"end":return Z.stop()}},g)}));return function(i,S,_){return j.apply(this,arguments)}}(),l=(0,f.useRef)(),y=(0,f.useState)([]),t=(0,v.Z)(y,2),r=t[0],N=t[1],A=[{title:(0,e.jsx)(n._H,{id:"pages.GeneList.gene",defaultMessage:"Gene"}),dataIndex:"queried_id",sorter:!0,hideInForm:!0,hideInSetting:!0,hideInTable:!0,fieldProps:{placeholder:"Please input a gene symbol, ensembl id or entrez id."},tip:"Ensembl gene IDs begin with ENS for Ensembl, and then a G for gene.",renderFormItem:function(g,i,S){var _=i.type,T=i.defaultRender,Z=(0,O.Z)(i,he);return _==="form"?null:(0,e.jsx)(G.Z,(0,E.Z)((0,E.Z)({dataset:c,queryGenes:p},Z),{},{style:{width:"280px"}}))}},{title:(0,e.jsx)(n._H,{id:"pages.GeneList.ensemblId",defaultMessage:"Ensembl ID"}),dataIndex:"ensembl_id",sorter:!0,hideInSearch:!0,width:"180px",tip:"Ensembl gene IDs begin with ENS for Ensembl, and then a G for gene.",render:function(g,i){return(0,e.jsx)("a",{onClick:function(){d?h.push("".concat(d).concat(i.ensembl_id)):console.log("You need to set queryGeneBaseUrl.")},children:g})}},{title:(0,e.jsx)(n._H,{id:"pages.GeneList.entrezId",defaultMessage:"Entrez ID"}),align:"center",sorter:!0,hideInSearch:!0,dataIndex:"entrez_id",tip:"Entrez Gene provides unique integer identifiers for genes and other loci.",render:function(g,i){return(0,e.jsx)("a",{onClick:function(){d?h.push("".concat(d).concat(i.ensembl_id)):console.log("You need to set queryGeneBaseUrl.")},children:g})}},{title:(0,e.jsx)(n._H,{id:"pages.GeneList.geneSymbol",defaultMessage:"Gene Symbol"}),align:"center",dataIndex:"gene_symbol",hideInSearch:!0,sorter:!0,tip:"A gene symbol is a short-form abbreviation for a particular gene.",render:function(g,i){return(0,e.jsx)("a",{onClick:function(){d?h.push("".concat(d).concat(i.ensembl_id)):console.log("You need to set queryGeneBaseUrl.")},children:g})}},{title:(0,e.jsx)(n._H,{id:"pages.GeneList.organ",defaultMessage:"Organ"}),align:"center",dataIndex:"organ",sorter:!0,tip:"Organ name.",valueType:"select",formItemProps:{required:!0},valueEnum:{gut:{text:"Gut"},kdn:{text:"Kidney"},hrt:{text:"Heart"},lng:{text:"Lung"},lvr:{text:"Liver"},tst:{text:"Testis"},tyr:{text:"Thyroid"},brn:{text:"Brain"}}},{title:(0,e.jsx)(n._H,{id:"pages.GeneList.method",defaultMessage:"Method"}),align:"center",dataIndex:"method",sorter:!0,valueType:"select",formItemProps:{required:!0},valueEnum:{ttest:{text:"T Test"},wilcox:{text:"Wilcox Test"},limma:{text:"Limma"}},tip:"Stat method, such as ttest, wilcox."},{title:(0,e.jsx)(n._H,{id:"pages.GeneList.datatype",defaultMessage:"Data Type"}),align:"center",dataIndex:"datatype",sorter:!0,tip:"Data type, such as FPKM, TPM, Counts.",valueType:"select",formItemProps:{required:!0},valueEnum:{fpkm:{text:"FPKM"},tpm:{text:"TPM"},counts:{text:"Counts"}}},{title:(0,e.jsx)(n._H,{id:"pages.GeneList.pAdj",defaultMessage:"AdjPvalue"}),align:"center",hideInSearch:!0,dataIndex:"padj",sorter:!0},{title:(0,e.jsx)(n._H,{id:"pages.GeneList.pvalue",defaultMessage:"Pvalue"}),align:"center",hideInSearch:!0,dataIndex:"pvalue",width:"80px",sorter:!0},{title:(0,e.jsx)(n._H,{id:"pages.GeneList.logfc",defaultMessage:"LogFC"}),align:"center",hideInSearch:!0,dataIndex:"logfc",sorter:!0,width:"80px",tip:"Log fold change = log(FC) Usually, the transformation is log at base 2, so the interpretation is straightforward: a log(FC) of 1 means twice as expressed."},{title:(0,e.jsx)(n._H,{id:"pages.GeneList.direction",defaultMessage:"Direction"}),align:"center",dataIndex:"direction",hideInSearch:!0,sorter:!0,width:"100px",tip:"`Up` means up-regulated, `Down` means down-regulated and `No` means no difference.",valueType:"select",valueEnum:{up:{text:"Up"},down:{text:"Down"},no:{text:"No"}}}];return(0,e.jsx)(P.Z,{className:"genelist",children:(0,e.jsx)(Y.Z,{scroll:{y:"calc(100vh - 200px)"},className:"genelist__table",actionRef:l,rowKey:"id",search:{labelWidth:120,showHiddenNum:!0,defaultCollapsed:!1,searchText:(0,e.jsx)(n._H,{id:"pages.GeneList.analyze",defaultMessage:"Analyze"})},pagination:{showQuickJumper:!0,position:["topLeft"]},locale:{emptyText:(0,e.jsx)("b",{children:(0,e.jsx)(n._H,{id:"pages.GeneList.nodata",defaultMessage:"Please input the parameters for analyzing diff genes."})})},cardBordered:!0,request:b,columns:A,rowSelection:{onChange:function(g,i){N(i)}},toolbar:{actions:[(0,e.jsx)(W.CSVLink,{data:r,filename:"download-degs.csv",onClick:function(){return r.length==0?(H.ZP.warn("Please select records firstly."),!1):!0},children:(0,e.jsx)(n._H,{id:"pages.GeneList.download",defaultMessage:"Download"})})]}})})},ge=(0,f.memo)(pe),z=o(70543),Q=o(10224),fe=function(){var a=(0,n.tT)("dataset",function(m){return{defaultDataset:m.defaultDataset,setDataset:m.setDataset}}),h=a.defaultDataset;return(0,e.jsxs)(P.Z,{className:"gene-list-wrapper",children:[(0,e.jsx)(Q.Z,{position:"center",title:"Differential Genes",children:(0,e.jsxs)("p",{children:["After selecting the dataset in the red box in the upper right corner, you can use the user-defined parameters in the data set range to obtain dynamic data tables.",(0,e.jsx)("br",{}),(0,e.jsx)("b",{children:"Gene:"})," Select a gene of interest. You can input ensembl_id, gene_symbol or entrez_id for analyzing. (e.g. Dgat2, 67800 or ENSMUSG00000030747)",(0,e.jsx)("br",{}),(0,e.jsx)("b",{children:"Organ:"})," Select an organ of interest.",(0,e.jsx)("br",{}),(0,e.jsx)("b",{children:"Method:"})," Select a method, such as ttest, wilcox, or Limma.",(0,e.jsx)("br",{}),(0,e.jsx)("b",{children:"DataType:"})," Select a data type, such as FPKM, TPM, or Counts.",(0,e.jsx)("br",{}),(0,e.jsx)("b",{children:"DataSet:"})," Click the red box in the upper right corner of the page to select the data set you are interested in, and then select the data set from the drop-down menu here."]})}),(0,e.jsx)(ge,{defaultDataset:h,queryDEGs:z.wr,queryGenes:z.hX,queryGeneBaseUrl:"/expression-analysis/single-gene?ensemblId="})]})},ne=(0,f.memo)(fe),me=o(96486);function xe(s,a,h){console.log("makeQueryStr filter: ",h);var m=":select [:*]",p="",d="";if(a){var c=Object.keys(a)[0],b=Object.values(a)[0];c&&b&&(b==="ascend"?p=":order-by [:".concat(c,"]"):p=":order-by [[:".concat(c," :desc]]"))}if(s){for(var l=[],y=0,t=Object.keys(s);y<t.length;y++){var r=t[y];r=="queried_id"&&s[r].length>0&&(s[r].match(/ENS/i)?l.push('[:like [:upper :ensembl_id] [:upper "%'.concat(s[r],'%"]]')):s[r].match(/[a-zA-Z][a-zA-Z0-9]+/i)?l.push('[:like [:upper :gene_symbol] [:upper "%'.concat(s[r],'%"]]')):s[r].match(/[0-9]+/i)&&l.push('[:like [:upper :entrez_id] [:upper "%'.concat(s[r],'%"]]'))),["current","pageSize","queried_id"].indexOf(r)<0&&s[r].length>0&&l.push("[:like [:upper :".concat(r,'] [:upper "%').concat(s[r],'%"]]'))}l.length==1?d=":where ".concat(l[0]):l.length>1&&(d=":where [:and ".concat(l.join(" "),"]"))}return"{".concat(m," ").concat(p," ").concat(d,"}")}var ye=["type","defaultRender"];function ae(s){return Promise.resolve((0,E.Z)((0,E.Z)({},s),{},{success:!0,data:(0,me.map)(s.data,function(a){return(0,E.Z)({key:"".concat(a.pathway_id,"_").concat(a.ensembl_id)},a)})}))}var be=function(a){var h=(0,w.k6)(),m=a.queryPathways,p=a.queryGenes,d=a.queryGeneBaseUrl,c=a.dataset,b=function(){var j=(0,U.Z)((0,q.Z)().mark(function g(i,S,_){var T;return(0,q.Z)().wrap(function(I){for(;;)switch(I.prev=I.next){case 0:return console.log("requestPathways: ",i,S,_),T=xe(i,S,_),I.next=4,m({page:i.current,page_size:i.pageSize,query_str:T,dataset:c}).then(function(M){return ae(M)}).catch(function(M){return console.log("requestPathways Error: ",M),ae({total:0,page:1,page_size:10,data:[]})});case 4:return I.abrupt("return",I.sent);case 5:case"end":return I.stop()}},g)}));return function(i,S,_){return j.apply(this,arguments)}}(),l=(0,f.useRef)(),y=(0,f.useState)([]),t=(0,v.Z)(y,2),r=t[0],N=t[1],A=[{title:(0,e.jsx)(n._H,{id:"pages.KEGGPathway.pathwayId",defaultMessage:"Pathway ID"}),dataIndex:"pathway_id",sorter:!0,tip:"Each pathway map is identified by the combination of 2-4 letter prefix code and 5 digit number.",render:function(g,i){return(0,e.jsx)("a",{href:"https://www.kegg.jp/entry/".concat(i.pathway_id),rel:"noreferrer",target:"_blank",children:g})}},{title:(0,e.jsx)(n._H,{id:"pages.KEGGPathway.pathwayName",defaultMessage:"Pathway Name"}),align:"center",sorter:!0,dataIndex:"pathway_name",tip:"The name of a KEGG pathway."},{title:(0,e.jsx)(n._H,{id:"pages.KEGGPathway.gene",defaultMessage:"Gene"}),dataIndex:"queried_id",sorter:!0,hideInForm:!0,hideInSetting:!0,hideInTable:!0,fieldProps:{placeholder:"Please input a gene symbol, ensembl id or entrez id."},tip:"Ensembl gene IDs begin with ENS for Ensembl, and then a G for gene.",renderFormItem:function(g,i,S){var _=i.type,T=i.defaultRender,Z=(0,O.Z)(i,ye);return _==="form"?null:(0,e.jsx)(G.Z,(0,E.Z)((0,E.Z)({dataset:c,queryGenes:p},Z),{},{style:{}}))}},{title:(0,e.jsx)(n._H,{id:"pages.KEGGPathway.geneSymbol",defaultMessage:"Gene Symbol"}),align:"center",hideInSearch:!0,dataIndex:"gene_symbol",sorter:!0,tip:"A gene symbol is a short-form abbreviation for a particular gene.",render:function(g,i){return(0,e.jsx)("a",{onClick:function(){d?h.push("".concat(d).concat(i.ensembl_id)):console.log("You need to set queryGeneBaseUrl.")},children:g})}},{title:(0,e.jsx)(n._H,{id:"pages.KEGGPathway.ensemblId",defaultMessage:"Ensembl ID"}),dataIndex:"ensembl_id",hideInSearch:!0,sorter:!0,tip:"Ensembl gene IDs begin with ENS for Ensembl, and then a G for gene.",render:function(g,i){return(0,e.jsx)("a",{onClick:function(){d?h.push("".concat(d).concat(i.ensembl_id)):console.log("You need to set queryGeneBaseUrl.")},children:g})}},{title:(0,e.jsx)(n._H,{id:"pages.KEGGPathway.entrezId",defaultMessage:"Entrez ID"}),align:"center",sorter:!0,hideInSearch:!0,dataIndex:"entrez_id",tip:"Entrez Gene provides unique integer identifiers for genes and other loci.",render:function(g,i){return(0,e.jsx)("a",{onClick:function(){d?h.push("".concat(d).concat(i.ensembl_id)):console.log("You need to set queryGeneBaseUrl.")},children:g})}}];return(0,e.jsx)(P.Z,{className:"keggpathway",children:(0,e.jsx)(Y.Z,{className:"keggpathway__table",actionRef:l,rowKey:"key",search:{labelWidth:120,defaultCollapsed:!1},pagination:{showQuickJumper:!0,position:["topLeft"]},request:b,columns:A,rowSelection:{onChange:function(g,i){N(i)}},cardBordered:!0,toolbar:{actions:[(0,e.jsx)(W.CSVLink,{data:r,filename:"download-pathway.csv",onClick:function(){return r.length==0?(H.ZP.warn("Please select records firstly."),!1):!0},children:(0,e.jsx)(n._H,{id:"pages.GeneList.download",defaultMessage:"Download"})})]}})})},Se=be,je=function(){var a=(0,n.tT)("dataset",function(m){return{defaultDataset:m.defaultDataset,setDataset:m.setDataset}}),h=a.defaultDataset;return(0,e.jsxs)(P.Z,{className:"kegg-pathway-wrapper",children:[(0,e.jsx)(Q.Z,{position:"center",title:"Discovery Genes in KEGG Pathway",children:(0,e.jsxs)("p",{children:["This page contains the pathway of the mouse tag and the genes contained in each pathway, and you can use the pathway name, pathway id, or gene id to confirm which pathway the gene you want belongs to.",(0,e.jsx)("br",{}),(0,e.jsx)("b",{children:"Pathway ID:"})," Enter the corresponding pathway ID, which is usually composed of 2-4 letter prefix code and 5 digital number.(e.g. path:mmu00010)",(0,e.jsx)("br",{}),(0,e.jsx)("b",{children:"Pathway Name:"})," You can input he name of a KEGG pathway.",(0,e.jsx)("br",{}),(0,e.jsx)("b",{children:"Gene:"})," Select genes of interest. You can input gene_symbol,ensembl_id or entrez_id to analyze."]})}),(0,e.jsx)(Se,{dataset:h,queryPathways:z.XR,queryGenes:z.hX,queryGeneBaseUrl:"/expression-analysis/single-gene?ensemblId="})]})},re=je,Te=o(57338),Ge=o(273);function ve(s,a,h){console.log("makeQueryStr: ",s,a,h);var m=":select [:*]",p="",d="";if(a){var c=Object.keys(a)[0],b=Object.values(a)[0];c&&b&&(b==="ascend"?p=":order-by [:".concat(c,"]"):p=":order-by [[:".concat(c," :desc]]"))}if(s){for(var l=[],y=0,t=Object.keys(s);y<t.length;y++){var r=t[y];r=="queried_id"&&s[r].length>0&&(s[r].match(/ENS/i)?l.push('[:= [:upper :queried_ensembl_id] [:upper "'.concat(s[r],'"]]')):s[r].match(/[a-zA-Z][a-zA-Z0-9]+/i)?l.push('[:= [:upper :queried_gene_symbol] [:upper "'.concat(s[r],'"]]')):s[r].match(/[0-9]+/i)&&l.push('[:= [:upper :queried_entrez_id] [:upper "'.concat(s[r],'"]]')))}l.length==1?d=":where ".concat(l[0]):l.length>1?d=":where [:and ".concat(l.join(" "),"]"):d=':where [:= :queried_ensembl_id "xxx"]'}return"{".concat(m," ").concat(p," ").concat(d,"}")}var we=["type","defaultRender"];function se(s){return Promise.resolve((0,E.Z)((0,E.Z)({},s),{},{success:!0}))}var Ie=function(a){var h=a.querySimilarGenes,m=a.queryGenes,p=a.showDetails,d=a.defaultDataset,c=(0,f.useState)({}),b=(0,v.Z)(c,2),l=b[0],y=b[1],t=(0,f.useState)(),r=(0,v.Z)(t,2),N=r[0],A=r[1],j=(0,f.useRef)(),g=(0,f.useState)([]),i=(0,v.Z)(g,2),S=i[0],_=i[1],T={};d&&(T[d]={text:d}),(0,f.useEffect)(function(){a.ensemblId?(A(!1),y({queried_id:a.ensemblId})):A({labelWidth:120,defaultCollapsed:!1,searchText:(0,e.jsx)(n._H,{id:"pages.SimilarGeneList.analyze",defaultMessage:"Analyze"})})},[a.ensemblId]);var Z=function(){var M=(0,U.Z)((0,q.Z)().mark(function x(u,L,k){return(0,q.Z)().wrap(function(K){for(;;)switch(K.prev=K.next){case 0:return console.log("requestSimilarGenes: ",L,k),K.next=3,h({page:u.current,page_size:u.pageSize,query_str:ve(u,L,k),organ:u.organ,dataset:u.dataset}).then(function(J){return se(J)}).catch(function(J){return console.log("requestSimilarGenes Error: ",J),se({total:0,page:1,page_size:10,data:[]})});case 3:return K.abrupt("return",K.sent);case 4:case"end":return K.stop()}},x)}));return function(u,L,k){return M.apply(this,arguments)}}(),I=[{title:(0,e.jsx)(n._H,{id:"pages.SimilarGeneList.gene",defaultMessage:"Gene"}),dataIndex:"queried_id",sorter:!0,hideInForm:!0,hideInSetting:!0,hideInTable:!0,fieldProps:{placeholder:"Please input a gene symbol, ensembl id or entrez id."},tip:"Ensembl gene IDs begin with ENS for Ensembl, and then a G for gene.",renderFormItem:function(x,u,L){var k=u.type,ze=u.defaultRender,K=(0,O.Z)(u,we);return k==="form"?null:(0,e.jsx)(G.Z,(0,E.Z)((0,E.Z)({dataset:d,queryGenes:m},K),{},{style:{width:"280px"}}))}},{title:(0,e.jsx)(n._H,{id:"pages.SimilarGeneList.gene",defaultMessage:"Gene"}),dataIndex:"queried_ensembl_id",sorter:!0,hideInForm:!0,hideInSearch:!0,tip:"Ensembl gene IDs begin with ENS for Ensembl, and then a G for gene."},{title:(0,e.jsx)(n._H,{id:"pages.SimilarGeneList.gene",defaultMessage:"Gene"}),dataIndex:"queried_gene_symbol",sorter:!0,hideInForm:!0,hideInSearch:!0,hideInTable:!0,tip:"A gene symbol is a short-form abbreviation for a particular gene."},{title:(0,e.jsx)(n._H,{id:"pages.SimilarGeneList.gene",defaultMessage:"Gene"}),dataIndex:"queried_entrez_id",sorter:!0,hideInForm:!0,hideInSearch:!0,hideInTable:!0,tip:"Entrez Gene provides unique integer identifiers for genes and other loci."},{title:(0,e.jsx)(n._H,{id:"pages.SimilarGeneList.ensemblId",defaultMessage:"Ensembl ID"}),dataIndex:"ensembl_id",sorter:!0,hideInForm:!0,hideInSearch:!0,hideInSetting:!0,width:"180px",tip:"Ensembl gene IDs begin with ENS for Ensembl, and then a G for gene.",render:function(x,u){return(0,e.jsx)("a",{style:{cursor:a.ensemblId?"unset":"pointer"},onClick:function(){a.ensemblId||p&&p(u.ensembl_id)},children:x})}},{title:(0,e.jsx)(n._H,{id:"pages.SimilarGeneList.entrezId",defaultMessage:"Entrez ID"}),align:"center",sorter:!0,hideInForm:!0,hideInSearch:!0,dataIndex:"entrez_id",tip:"Entrez Gene provides unique integer identifiers for genes and other loci."},{title:(0,e.jsx)(n._H,{id:"pages.SimilarGeneList.geneSymbol",defaultMessage:"Gene Symbol"}),align:"center",hideInForm:!0,hideInSearch:!0,dataIndex:"gene_symbol",sorter:!0,tip:"A gene symbol is a short-form abbreviation for a particular gene."},{title:(0,e.jsx)(n._H,{id:"pages.SimilarGeneList.organ",defaultMessage:"Organ"}),align:"center",dataIndex:"organ",sorter:!0,hideInForm:!0,hideInSetting:!0,hideInTable:!0,tip:"Organ name.",initialValue:"gut",valueType:"select",valueEnum:{gut:{text:"Gut"},kdn:{text:"Kidney"},hrt:{text:"Heart"},lng:{text:"Lung"},lvr:{text:"Liver"},tst:{text:"Testis"},tyr:{text:"Thyroid"},brn:{text:"Brain"}}},{title:(0,e.jsx)(n._H,{id:"pages.SimilarGeneList.dataset",defaultMessage:"Dataset"}),align:"center",dataIndex:"dataset",valueType:"select",hideInForm:!0,hideInSetting:!0,hideInTable:!0,initialValue:"000000",valueEnum:T},{title:(0,e.jsx)(n._H,{id:"pages.SimilarGeneList.pvalue",defaultMessage:"Pvalue"}),align:"center",hideInSearch:!0,dataIndex:"pvalue",width:"80px",sorter:!0,render:function(x,u){return(0,e.jsx)("span",{children:parseFloat(u.pvalue).toFixed(5)})}},{title:(0,e.jsx)(n._H,{id:"pages.SimilarGeneList.PCC",defaultMessage:"PCC"}),align:"center",hideInSearch:!0,dataIndex:"pcc",sorter:!0,tip:"Pearson correlation coefficient.",render:function(x,u){return(0,e.jsx)("span",{children:u.pcc.toFixed(3)})}}];return(0,e.jsx)(P.Z,{className:"similar-genelist",children:(0,e.jsx)(Y.Z,{className:a.ensemblId?"embeded_genelist_table":"genelist__table",actionRef:j,rowKey:"ensembl_id",search:N,cardBordered:!0,polling:void 0,locale:{emptyText:(0,e.jsx)("b",{children:(0,e.jsx)(n._H,{id:"pages.SimilarGeneList.nodata",defaultMessage:"Please input a gene symbol or ensembl id."})})},params:l,pagination:{showQuickJumper:!0,position:["topLeft"]},request:Z,columns:I,rowSelection:{onChange:function(x,u){_(u)}},toolbar:{actions:[(0,e.jsx)(W.CSVLink,{data:S,filename:"download-degs.csv",onClick:function(){return S.length==0?(H.ZP.warn("Please select records firstly."),!1):!0},children:(0,e.jsx)(n._H,{id:"pages.SimilarGeneList.download",defaultMessage:"Download"})})]}})})},ie=Ie,qe=o(49111),Ee=o(19650),Re=o(71153),D=o(60331),He=o(89032),X=o(15746),le=o(23658),oe=o(14066),Ze=function(a){var h=(0,w.TH)().search,m=new URLSearchParams(h).get("ensemblId")||a.ensemblId||"ENSMUSG00000059552",p=(0,f.useState)(m),d=(0,v.Z)(p,2),c=d[0],b=d[1],l=(0,f.useState)(void 0),y=(0,v.Z)(l,2),t=y[0],r=y[1],N=(0,f.useState)(null),A=(0,v.Z)(N,2),j=A[0],g=A[1],i=(0,f.useState)(null),S=(0,v.Z)(i,2),_=S[0],T=S[1],Z=(0,n.tT)("dataset",function(x){return{defaultDataset:x.defaultDataset,setDataset:x.setDataset}}),I=Z.defaultDataset;(0,f.useEffect)(function(){if(c&&c!=="NA"){var x='{:select [:*] :where [:like [:upper :ensembl_id] [:upper "%'.concat(c,'%"]]}');(0,z.hX)({query_str:x,dataset:I}).then(function(u){var L=u.data;r(L&&L[0])}).catch(function(u){console.log("requestDEGs Error: ",u),r(void 0)}),(0,oe.nj)({filelink:"file:///".concat(I,"/single_gene/barplot_across_organs/").concat(c,".json")}).then(function(u){g({data:u.data,layout:u.layout,frames:u.frames||void 0})}).catch(function(u){H.ZP.warn("Cannot fetch the result, please retry later.")}),(0,oe.nj)({filelink:"file:///".concat(I,"/single_gene/boxplot_across_organs/").concat(c,".json")}).then(function(u){T({data:u.data,layout:u.layout,frames:u.frames||void 0})}).catch(function(u){H.ZP.warn("Cannot fetch the result, please retry later.")})}else r(void 0),g(null),T(null)},[c]);var M=function(u,L){console.log("onSearch: ",u,L),u&&typeof u=="string"&&b(u),L&&r(L)};return(0,e.jsxs)(Ee.Z,{className:"single-gene-container",children:[(0,e.jsx)(Q.Z,{position:"center",title:"General Information for Single Gene",children:(0,e.jsxs)("p",{children:["You can search for genes of interest on this page. After a quick search, you can see the trend of the expression level of this gene in different organs between the exposed group and the control group. And you also can view the top 100 genes that most closely resemble your gene expression patterns and related description information.",(0,e.jsx)("br",{}),(0,e.jsx)("br",{}),(0,e.jsx)("b",{children:"Quick Search"}),": You can input gene_symbol, ensembl_id or entrez_id to analyze. (e.g. Trp53/22059/ENSMUSG00000059552)"]})}),(0,e.jsxs)(P.Z,{className:"single-gene",children:[(0,e.jsx)(X.Z,{className:"left",xxl:10,xl:10,lg:10,md:24,sm:24,xs:24,children:(0,e.jsxs)(P.Z,{className:"gene-searcher",children:[(0,e.jsxs)(X.Z,{className:"header",span:24,children:[(0,e.jsx)("span",{style:{fontWeight:500},children:"Quick Search"}),(0,e.jsx)(G.Z,{dataset:I,queryGenes:z.hX,placeholder:"e.g Trp53 / ENSMUSG00000059552 / 22059",style:{width:"100%"},initialValue:c,onChange:M})]}),(0,e.jsxs)(X.Z,{className:"summary",span:24,children:[(0,e.jsx)("h3",{children:t?t.gene_symbol:""}),(0,e.jsxs)("p",{children:[(0,e.jsx)(D.Z,{children:"Entrez ID"}),(0,e.jsx)("a",{href:"https://www.ncbi.nlm.nih.gov/gene/?term=".concat(t&&t.entrez_id),target:"_blank",children:t?t.entrez_id:""})]}),(0,e.jsxs)("p",{children:[(0,e.jsx)(D.Z,{children:"Ensembl ID"}),(0,e.jsx)("a",{href:"https://www.ensembl.org/Mus_musculus/Gene/Summary?db=core;g=".concat(t&&t.ensembl_id),target:"_blank",children:t?t.ensembl_id:""})]}),(0,e.jsxs)("p",{children:[(0,e.jsx)(D.Z,{children:"Alias"}),t?t.alias.replaceAll(",",", "):""]}),(0,e.jsxs)("p",{children:[(0,e.jsx)(D.Z,{children:"Name"}),t?t.name:""]}),(0,e.jsxs)("p",{children:[(0,e.jsx)(D.Z,{children:"Description"}),t?t.description:""]}),(0,e.jsxs)("p",{children:[(0,e.jsx)(D.Z,{children:"Type"}),t?t.type_of_gene:""]}),(0,e.jsxs)("p",{children:[(0,e.jsx)(D.Z,{children:"MGI"}),t?t.mgi_id:""]}),(0,e.jsxs)("p",{children:[(0,e.jsx)(D.Z,{children:"Taxid"}),t?t.taxid:""]}),(0,e.jsxs)("p",{children:[(0,e.jsx)(D.Z,{children:"Chromosome"}),t?t.chromosome:""," \xA0",(0,e.jsx)(D.Z,{children:"Strand"}),t?t.strand:""," \xA0",(0,e.jsx)(D.Z,{children:"Start"}),t?t.start:""," \xA0",(0,e.jsx)(D.Z,{children:"End"}),t?t.end:""," \xA0"]}),(0,e.jsxs)("p",{children:[(0,e.jsx)(D.Z,{children:"Pubmed"}),(0,e.jsx)("a",{href:"https://pubmed.ncbi.nlm.nih.gov/".concat(t?t.pubmed_ids:""),target:"_blank",children:t&&t.pubmed_ids.length<5?t.pubmed_ids:"".concat(t?t.pubmed_ids.length:0," Publications")})]}),t&&t.pdb?(0,e.jsxs)("p",{children:[(0,e.jsx)(D.Z,{children:"PDB"}),t.pdb.split(",").map(function(x){return(0,e.jsx)("a",{href:"https://www.rcsb.org/structure/".concat(x),target:"_blank",style:{marginRight:"10px"},children:x},x)})]}):null,t&&t.pfam?(0,e.jsxs)("p",{children:[(0,e.jsx)(D.Z,{children:"Pfam"}),t.pfam.split(",").map(function(x){return(0,e.jsx)("a",{href:"https://www.ebi.ac.uk/interpro/search/text/".concat(x),target:"_blank",style:{marginRight:"10px"},children:x},x)})]}):null,t&&t.prosite?(0,e.jsxs)("p",{children:[(0,e.jsx)(D.Z,{children:"Prosite"}),t.prosite.split(",").map(function(x){return(0,e.jsx)("a",{href:"https://prosite.expasy.org/cgi-bin/prosite/prosite_search_full.pl?SEARCH=".concat(x),target:"_blank",style:{marginRight:"10px"},children:x},x)})]}):null]})]})}),(0,e.jsx)(X.Z,{className:"right",xxl:14,xl:14,lg:14,md:24,sm:24,xs:24,children:(0,e.jsxs)(P.Z,{className:"statistics",children:[(0,e.jsx)(le.Z,{responsiveKey:1,plotlyData:j,mode:"Plotly"},"1"),(0,e.jsx)(le.Z,{responsiveKey:2,plotlyData:_,mode:"Plotly"},"2"),(0,e.jsxs)(P.Z,{className:"similar-genelist-container",children:[(0,e.jsx)("h3",{children:"Most Similar Genes"}),(0,e.jsx)("p",{children:"The similar detection are based on the datasets used above."}),(0,e.jsx)(ie,{defaultDataset:I,ensemblId:c,querySimilarGenes:z.hs,queryGenes:z.hX})]})]})})]})]})},$=Ze,De=function(){var a=(0,f.useState)(!1),h=(0,v.Z)(a,2),m=h[0],p=h[1],d=(0,f.useState)(null),c=(0,v.Z)(d,2),b=c[0],l=c[1],y=(0,n.tT)("dataset",function(r){return{defaultDataset:r.defaultDataset,setDataset:r.setDataset}}),t=y.defaultDataset;return(0,e.jsxs)(P.Z,{className:"similar-genelist-wrapper",children:[(0,e.jsx)(Q.Z,{position:"center",title:"Similar Genes Detection",children:(0,e.jsxs)("p",{children:["This module identifies genes with similar expression patterns within selected datasets and generates a list.",(0,e.jsx)("br",{}),(0,e.jsx)("b",{children:"Gene:"})," Select a gene of interest. You can input ensembl_id, gene_symbol or entrez_id for searching. (e.g. Dgat2, 67800 or ENSMUSG00000030747)",(0,e.jsx)("b",{children:"Organ:"})," Select an organ of interest.",(0,e.jsx)("b",{children:"DataSet:"})," Click the red box in the upper right corner of the page to select the data set you are interested in, and then select the data set from the drop-down menu here."]})}),(0,e.jsx)(ie,{defaultDataset:t,querySimilarGenes:z.hs,queryGenes:z.hX,showDetails:function(N){l(N),p(!0)}}),(0,e.jsx)(Ge.Z,{width:"80%",visible:m,className:"gene-details",onClose:function(){p(!1),l(null)},closable:!0,maskClosable:!0,children:(0,e.jsx)($,{ensemblId:b})})]})},de=De,_e=o(42877),Pe=function(a){var h=a.chart,m=(0,f.useState)("rapex-boxplot"),p=(0,v.Z)(m,2),d=p[0],c=p[1],b=[{label:(0,e.jsx)(n._H,{id:"pages.StatEngineWrapper.boxplot",defaultMessage:"Boxplot"}),key:"rapex-boxplot"},{label:(0,e.jsx)(n._H,{id:"pages.StatEngineWrapper.barplot",defaultMessage:"Barplot"}),key:"rapex-barplot"},{label:(0,e.jsx)(n._H,{id:"pages.StatEngineWrapper.across-organs-boxplot",defaultMessage:"Across Organs (Boxplot)"}),key:"rapex-boxplot-organs"},{label:(0,e.jsx)(n._H,{id:"pages.StatEngineWrapper.across-organs-barplot",defaultMessage:"Across Organs (Barplot)"}),key:"rapex-barplot-organs"},{label:(0,e.jsx)(n._H,{id:"pages.StatEngineWrapper.correlation-analysis",defaultMessage:"Correlation Analysis"}),key:"rapex-corrplot"},{label:(0,e.jsx)(n._H,{id:"pages.StatEngineWrapper.multiple-genes-comparison",defaultMessage:"Multiple Genes Comparison"}),key:"rapex-multiple-genes-comparison"}];return(0,f.useEffect)(function(){h?c(h):a.location&&a.location.query&&a.location.query.chart&&c(a.location.query.chart)},[h]),(0,e.jsx)(C.Z,{className:"stat-engine-container",activeKey:d,onChange:function(y){c(y)},children:b.map(function(l){return(0,e.jsx)(C.Z.TabPane,{tab:l.label,children:(0,e.jsx)(_e.Z,{chart:l.key,queryGenes:z.hX})},l.key)})})},ue=Pe,Ne={GeneListWrapper:ne,KEGGPathwayWrapper:re,SimilarGeneListWrapper:de,SingleGene:$,StatEngineWrapper:ue},Me=function(){var a=[{label:"Single Gene",key:"single-gene",children:(0,e.jsx)($,{ensemblId:null})},{label:"Gene List",key:"gene-list",children:(0,e.jsx)(ne,{})},{label:"KEGG Pathway",key:"kegg-pathway",children:(0,e.jsx)(re,{})},{label:"Similar Genes",key:"similar-genes",children:(0,e.jsx)(de,{})},{label:"Statistics Engine",key:"statistics-engine",children:(0,e.jsx)(ue,{})}];return a},Ce=function(a){var h=(0,f.useState)([]),m=(0,v.Z)(h,2),p=m[0],d=m[1];return(0,f.useEffect)(function(){d(Me())},[]),(0,e.jsx)(C.Z,{className:"omics-analyzer",items:p})},Le=Ce},70543:function(ce,F,o){"use strict";o.d(F,{wr:function(){return ee},hX:function(){return te},XR:function(){return O},hs:function(){return U}});var R=o(39428),C=o(11849),v=o(3182),f=o(74310);function ee(w,G){return P.apply(this,arguments)}function P(){return P=(0,v.Z)((0,R.Z)().mark(function w(G,n){return(0,R.Z)().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,f.WY)("/api/v1/dataset/rapex-degs",(0,C.Z)({method:"GET",params:(0,C.Z)({},G)},n||{})));case 1:case"end":return e.stop()}},w)})),P.apply(this,arguments)}function te(w,G){return H.apply(this,arguments)}function H(){return H=(0,v.Z)((0,R.Z)().mark(function w(G,n){return(0,R.Z)().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,f.WY)("/api/v1/dataset/rapex-genes",(0,C.Z)({method:"GET",params:(0,C.Z)({},G)},n||{})));case 1:case"end":return e.stop()}},w)})),H.apply(this,arguments)}function O(w,G){return q.apply(this,arguments)}function q(){return q=(0,v.Z)((0,R.Z)().mark(function w(G,n){return(0,R.Z)().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,f.WY)("/api/v1/dataset/rapex-pathways",(0,C.Z)({method:"GET",params:(0,C.Z)({},G)},n||{})));case 1:case"end":return e.stop()}},w)})),q.apply(this,arguments)}function U(w,G){return E.apply(this,arguments)}function E(){return E=(0,v.Z)((0,R.Z)().mark(function w(G,n){return(0,R.Z)().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,f.WY)("/api/v1/dataset/rapex-similar-genes",(0,C.Z)({method:"GET",params:(0,C.Z)({},G)},n||{})));case 1:case"end":return e.stop()}},w)})),E.apply(this,arguments)}function Y(w,G){return W.apply(this,arguments)}function W(){return W=_asyncToGenerator(_regeneratorRuntime().mark(function w(G,n){return _regeneratorRuntime().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",request("/api/v1/rapex-gene-expr-data",_objectSpread({method:"GET",params:_objectSpread({},G)},n||{})));case 1:case"end":return e.stop()}},w)})),W.apply(this,arguments)}}}]);