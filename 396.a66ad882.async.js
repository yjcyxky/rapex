(self.webpackChunkbiomedgps_studio=self.webpackChunkbiomedgps_studio||[]).push([[396],{93181:function(Q,K,r){"use strict";r.d(K,{Z:function(){return z}});var c=r(28991),o=r(67294),D={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M888 792H200V168c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v688c0 4.4 3.6 8 8 8h752c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM288 604a64 64 0 10128 0 64 64 0 10-128 0zm118-224a48 48 0 1096 0 48 48 0 10-96 0zm158 228a96 96 0 10192 0 96 96 0 10-192 0zm148-314a56 56 0 10112 0 56 56 0 10-112 0z"}}]},name:"dot-chart",theme:"outlined"},M=D,b=r(27029),t=function(G,A){return o.createElement(b.Z,(0,c.Z)((0,c.Z)({},G),{},{ref:A,icon:M}))};t.displayName="DotChartOutlined";var z=o.forwardRef(t)},70347:function(){},18067:function(){},91894:function(Q,K,r){"use strict";r.d(K,{Z:function(){return ue}});var c=r(96156),o=r(22122),D=r(94184),M=r.n(D),b=r(98423),t=r(67294),z=r(53124),L=r(97647),G=r(19586),A=r(63885),ne=function(a,d){var x={};for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&d.indexOf(n)<0&&(x[n]=a[n]);if(a!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,n=Object.getOwnPropertySymbols(a);s<n.length;s++)d.indexOf(n[s])<0&&Object.prototype.propertyIsEnumerable.call(a,n[s])&&(x[n[s]]=a[n[s]]);return x},re=function(d){var x=d.prefixCls,n=d.className,s=d.hoverable,B=s===void 0?!0:s,T=ne(d,["prefixCls","className","hoverable"]);return t.createElement(z.C,null,function(k){var $=k.getPrefixCls,N=$("card",x),S=M()("".concat(N,"-grid"),n,(0,c.Z)({},"".concat(N,"-grid-hoverable"),B));return t.createElement("div",(0,o.Z)({},T,{className:S}))})},X=re,le=function(a,d){var x={};for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&d.indexOf(n)<0&&(x[n]=a[n]);if(a!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,n=Object.getOwnPropertySymbols(a);s<n.length;s++)d.indexOf(n[s])<0&&Object.prototype.propertyIsEnumerable.call(a,n[s])&&(x[n[s]]=a[n[s]]);return x};function ce(a){var d=a.map(function(x,n){return t.createElement("li",{style:{width:"".concat(100/a.length,"%")},key:"action-".concat(n)},t.createElement("span",null,x))});return d}var se=t.forwardRef(function(a,d){var x,n,s=t.useContext(z.E_),B=s.getPrefixCls,T=s.direction,k=t.useContext(L.Z),$=function(w){var R;(R=a.onTabChange)===null||R===void 0||R.call(a,w)},N=function(){var w;return t.Children.forEach(a.children,function(R){R&&R.type&&R.type===X&&(w=!0)}),w},S=a.prefixCls,H=a.className,u=a.extra,e=a.headStyle,l=e===void 0?{}:e,i=a.bodyStyle,y=i===void 0?{}:i,E=a.title,h=a.loading,v=a.bordered,f=v===void 0?!0:v,m=a.size,P=a.type,C=a.cover,Z=a.actions,O=a.tabList,j=a.children,V=a.activeTabKey,fe=a.defaultActiveTabKey,me=a.tabBarExtraContent,_=a.hoverable,I=a.tabProps,W=I===void 0?{}:I,U=le(a,["prefixCls","className","extra","headStyle","bodyStyle","title","loading","bordered","size","type","cover","actions","tabList","children","activeTabKey","defaultActiveTabKey","tabBarExtraContent","hoverable","tabProps"]),g=B("card",S),Y=t.createElement(G.Z,{loading:!0,active:!0,paragraph:{rows:4},title:!1},j),q=V!==void 0,ee=(0,o.Z)((0,o.Z)({},W),(x={},(0,c.Z)(x,q?"activeKey":"defaultActiveKey",q?V:fe),(0,c.Z)(x,"tabBarExtraContent",me),x)),F,te=O&&O.length?t.createElement(A.Z,(0,o.Z)({size:"large"},ee,{className:"".concat(g,"-head-tabs"),onChange:$,items:O.map(function(J){var w;return{label:J.tab,key:J.key,disabled:(w=J.disabled)!==null&&w!==void 0?w:!1}})})):null;(E||u||te)&&(F=t.createElement("div",{className:"".concat(g,"-head"),style:l},t.createElement("div",{className:"".concat(g,"-head-wrapper")},E&&t.createElement("div",{className:"".concat(g,"-head-title")},E),u&&t.createElement("div",{className:"".concat(g,"-extra")},u)),te));var ae=C?t.createElement("div",{className:"".concat(g,"-cover")},C):null,Ce=t.createElement("div",{className:"".concat(g,"-body"),style:y},h?Y:j),xe=Z&&Z.length?t.createElement("ul",{className:"".concat(g,"-actions")},ce(Z)):null,Ee=(0,b.Z)(U,["onTabChange"]),ye=m||k,he=M()(g,(n={},(0,c.Z)(n,"".concat(g,"-loading"),h),(0,c.Z)(n,"".concat(g,"-bordered"),f),(0,c.Z)(n,"".concat(g,"-hoverable"),_),(0,c.Z)(n,"".concat(g,"-contain-grid"),N()),(0,c.Z)(n,"".concat(g,"-contain-tabs"),O&&O.length),(0,c.Z)(n,"".concat(g,"-").concat(ye),ye),(0,c.Z)(n,"".concat(g,"-type-").concat(P),!!P),(0,c.Z)(n,"".concat(g,"-rtl"),T==="rtl"),n),H);return t.createElement("div",(0,o.Z)({ref:d},Ee,{className:he}),F,ae,Ce,xe)}),ie=se,oe=function(a,d){var x={};for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&d.indexOf(n)<0&&(x[n]=a[n]);if(a!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,n=Object.getOwnPropertySymbols(a);s<n.length;s++)d.indexOf(n[s])<0&&Object.prototype.propertyIsEnumerable.call(a,n[s])&&(x[n[s]]=a[n[s]]);return x},ve=function(d){return t.createElement(z.C,null,function(x){var n=x.getPrefixCls,s=d.prefixCls,B=d.className,T=d.avatar,k=d.title,$=d.description,N=oe(d,["prefixCls","className","avatar","title","description"]),S=n("card",s),H=M()("".concat(S,"-meta"),B),u=T?t.createElement("div",{className:"".concat(S,"-meta-avatar")},T):null,e=k?t.createElement("div",{className:"".concat(S,"-meta-title")},k):null,l=$?t.createElement("div",{className:"".concat(S,"-meta-description")},$):null,i=e||l?t.createElement("div",{className:"".concat(S,"-meta-detail")},e,l):null;return t.createElement("div",(0,o.Z)({},N,{className:H}),u,i)})},de=ve,p=ie;p.Grid=X,p.Meta=de;var ue=p},58024:function(Q,K,r){"use strict";var c=r(38663),o=r.n(c),D=r(70347),M=r.n(D),b=r(71748),t=r(18106)},19586:function(Q,K,r){"use strict";r.d(K,{Z:function(){return H}});var c=r(96156),o=r(22122),D=r(90484),M=r(94184),b=r.n(M),t=r(67294),z=r(53124),L=r(98423),G=function(e){var l,i,y=e.prefixCls,E=e.className,h=e.style,v=e.size,f=e.shape,m=b()((l={},(0,c.Z)(l,"".concat(y,"-lg"),v==="large"),(0,c.Z)(l,"".concat(y,"-sm"),v==="small"),l)),P=b()((i={},(0,c.Z)(i,"".concat(y,"-circle"),f==="circle"),(0,c.Z)(i,"".concat(y,"-square"),f==="square"),(0,c.Z)(i,"".concat(y,"-round"),f==="round"),i)),C=t.useMemo(function(){return typeof v=="number"?{width:v,height:v,lineHeight:"".concat(v,"px")}:{}},[v]);return t.createElement("span",{className:b()(y,m,P,E),style:(0,o.Z)((0,o.Z)({},C),h)})},A=G,ne=function(e){var l=e.prefixCls,i=e.className,y=e.active,E=e.shape,h=E===void 0?"circle":E,v=e.size,f=v===void 0?"default":v,m=t.useContext(z.E_),P=m.getPrefixCls,C=P("skeleton",l),Z=(0,L.Z)(e,["prefixCls","className"]),O=b()(C,"".concat(C,"-element"),(0,c.Z)({},"".concat(C,"-active"),y),i);return t.createElement("div",{className:O},t.createElement(A,(0,o.Z)({prefixCls:"".concat(C,"-avatar"),shape:h,size:f},Z)))},re=ne,X=function(e){var l,i=e.prefixCls,y=e.className,E=e.active,h=e.block,v=h===void 0?!1:h,f=e.size,m=f===void 0?"default":f,P=t.useContext(z.E_),C=P.getPrefixCls,Z=C("skeleton",i),O=(0,L.Z)(e,["prefixCls"]),j=b()(Z,"".concat(Z,"-element"),(l={},(0,c.Z)(l,"".concat(Z,"-active"),E),(0,c.Z)(l,"".concat(Z,"-block"),v),l),y);return t.createElement("div",{className:j},t.createElement(A,(0,o.Z)({prefixCls:"".concat(Z,"-button"),size:m},O)))},le=X,ce=r(93181),se=function(e){var l=e.prefixCls,i=e.className,y=e.style,E=e.active,h=e.children,v=t.useContext(z.E_),f=v.getPrefixCls,m=f("skeleton",l),P=b()(m,"".concat(m,"-element"),(0,c.Z)({},"".concat(m,"-active"),E),i),C=h!=null?h:t.createElement(ce.Z,null);return t.createElement("div",{className:P},t.createElement("div",{className:b()("".concat(m,"-image"),i),style:y},C))},ie=se,oe="M365.714286 329.142857q0 45.714286-32.036571 77.677714t-77.677714 32.036571-77.677714-32.036571-32.036571-77.677714 32.036571-77.677714 77.677714-32.036571 77.677714 32.036571 32.036571 77.677714zM950.857143 548.571429l0 256-804.571429 0 0-109.714286 182.857143-182.857143 91.428571 91.428571 292.571429-292.571429zM1005.714286 146.285714l-914.285714 0q-7.460571 0-12.873143 5.412571t-5.412571 12.873143l0 694.857143q0 7.460571 5.412571 12.873143t12.873143 5.412571l914.285714 0q7.460571 0 12.873143-5.412571t5.412571-12.873143l0-694.857143q0-7.460571-5.412571-12.873143t-12.873143-5.412571zM1097.142857 164.571429l0 694.857143q0 37.741714-26.843429 64.585143t-64.585143 26.843429l-914.285714 0q-37.741714 0-64.585143-26.843429t-26.843429-64.585143l0-694.857143q0-37.741714 26.843429-64.585143t64.585143-26.843429l914.285714 0q37.741714 0 64.585143 26.843429t26.843429 64.585143z",ve=function(e){var l=e.prefixCls,i=e.className,y=e.style,E=e.active,h=t.useContext(z.E_),v=h.getPrefixCls,f=v("skeleton",l),m=b()(f,"".concat(f,"-element"),(0,c.Z)({},"".concat(f,"-active"),E),i);return t.createElement("div",{className:m},t.createElement("div",{className:b()("".concat(f,"-image"),i),style:y},t.createElement("svg",{viewBox:"0 0 1098 1024",xmlns:"http://www.w3.org/2000/svg",className:"".concat(f,"-image-svg")},t.createElement("path",{d:oe,className:"".concat(f,"-image-path")}))))},de=ve,p=function(e){var l,i=e.prefixCls,y=e.className,E=e.active,h=e.block,v=e.size,f=v===void 0?"default":v,m=t.useContext(z.E_),P=m.getPrefixCls,C=P("skeleton",i),Z=(0,L.Z)(e,["prefixCls"]),O=b()(C,"".concat(C,"-element"),(l={},(0,c.Z)(l,"".concat(C,"-active"),E),(0,c.Z)(l,"".concat(C,"-block"),h),l),y);return t.createElement("div",{className:O},t.createElement(A,(0,o.Z)({prefixCls:"".concat(C,"-input"),size:f},Z)))},ue=p,a=r(85061),d=function(e){var l=function(m){var P=e.width,C=e.rows,Z=C===void 0?2:C;if(Array.isArray(P))return P[m];if(Z-1===m)return P},i=e.prefixCls,y=e.className,E=e.style,h=e.rows,v=(0,a.Z)(Array(h)).map(function(f,m){return t.createElement("li",{key:m,style:{width:l(m)}})});return t.createElement("ul",{className:b()(i,y),style:E},v)},x=d,n=function(e){var l=e.prefixCls,i=e.className,y=e.width,E=e.style;return t.createElement("h3",{className:b()(l,i),style:(0,o.Z)({width:y},E)})},s=n;function B(u){return u&&(0,D.Z)(u)==="object"?u:{}}function T(u,e){return u&&!e?{size:"large",shape:"square"}:{size:"large",shape:"circle"}}function k(u,e){return!u&&e?{width:"38%"}:u&&e?{width:"50%"}:{}}function $(u,e){var l={};return(!u||!e)&&(l.width="61%"),!u&&e?l.rows=3:l.rows=2,l}var N=function(e){var l=e.prefixCls,i=e.loading,y=e.className,E=e.style,h=e.children,v=e.avatar,f=v===void 0?!1:v,m=e.title,P=m===void 0?!0:m,C=e.paragraph,Z=C===void 0?!0:C,O=e.active,j=e.round,V=t.useContext(z.E_),fe=V.getPrefixCls,me=V.direction,_=fe("skeleton",l);if(i||!("loading"in e)){var I,W=!!f,U=!!P,g=!!Z,Y;if(W){var q=(0,o.Z)((0,o.Z)({prefixCls:"".concat(_,"-avatar")},T(U,g)),B(f));Y=t.createElement("div",{className:"".concat(_,"-header")},t.createElement(A,(0,o.Z)({},q)))}var ee;if(U||g){var F;if(U){var te=(0,o.Z)((0,o.Z)({prefixCls:"".concat(_,"-title")},k(W,g)),B(P));F=t.createElement(s,(0,o.Z)({},te))}var ae;if(g){var Ce=(0,o.Z)((0,o.Z)({prefixCls:"".concat(_,"-paragraph")},$(W,U)),B(Z));ae=t.createElement(x,(0,o.Z)({},Ce))}ee=t.createElement("div",{className:"".concat(_,"-content")},F,ae)}var xe=b()(_,(I={},(0,c.Z)(I,"".concat(_,"-with-avatar"),W),(0,c.Z)(I,"".concat(_,"-active"),O),(0,c.Z)(I,"".concat(_,"-rtl"),me==="rtl"),(0,c.Z)(I,"".concat(_,"-round"),j),I),y);return t.createElement("div",{className:xe,style:E},Y,ee)}return typeof h!="undefined"?h:null};N.Button=le,N.Avatar=re,N.Input=ue,N.Image=de,N.Node=ie;var S=N,H=S},71748:function(Q,K,r){"use strict";var c=r(38663),o=r.n(c),D=r(18067),M=r.n(D)}}]);