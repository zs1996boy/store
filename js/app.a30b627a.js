(function(e){function n(n){for(var a,o,u=n[0],i=n[1],s=n[2],f=0,h=[];f<u.length;f++)o=u[f],Object.prototype.hasOwnProperty.call(c,o)&&c[o]&&h.push(c[o][0]),c[o]=0;for(a in i)Object.prototype.hasOwnProperty.call(i,a)&&(e[a]=i[a]);d&&d(n);while(h.length)h.shift()();return r.push.apply(r,s||[]),t()}function t(){for(var e,n=0;n<r.length;n++){for(var t=r[n],a=!0,o=1;o<t.length;o++){var u=t[o];0!==c[u]&&(a=!1)}a&&(r.splice(n--,1),e=i(i.s=t[0]))}return e}var a={},o={app:0},c={app:0},r=[];function u(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-011f83dc":"ff66b81a","chunk-036dd812":"12c5296b","chunk-0e3ee073":"e37dccbc","chunk-13ab6600":"702aa340","chunk-3bf1aec4":"9e5d5051","chunk-3e7b866d":"bf959125","chunk-4d691990":"ee90f9ba","chunk-51bb5251":"38adbd81","chunk-681f6930":"06079113","chunk-9827a37e":"1f05d6c2","chunk-a539f9a6":"b2c8ab68","chunk-ae39c23c":"89ac412a","chunk-bc6454b8":"aebb4362","chunk-e3ddb4e0":"6bec4ea0","chunk-effc3b58":"7adc25a4"}[e]+".js"}function i(n){if(a[n])return a[n].exports;var t=a[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.e=function(e){var n=[],t={"chunk-011f83dc":1,"chunk-036dd812":1,"chunk-0e3ee073":1,"chunk-13ab6600":1,"chunk-3bf1aec4":1,"chunk-3e7b866d":1,"chunk-4d691990":1,"chunk-51bb5251":1,"chunk-681f6930":1,"chunk-9827a37e":1,"chunk-a539f9a6":1,"chunk-bc6454b8":1,"chunk-e3ddb4e0":1,"chunk-effc3b58":1};o[e]?n.push(o[e]):0!==o[e]&&t[e]&&n.push(o[e]=new Promise((function(n,t){for(var a="css/"+({}[e]||e)+"."+{"chunk-011f83dc":"e75f6614","chunk-036dd812":"76897cf3","chunk-0e3ee073":"05b2ae84","chunk-13ab6600":"f0130e4c","chunk-3bf1aec4":"786740f2","chunk-3e7b866d":"f60bd3f6","chunk-4d691990":"6618b4fc","chunk-51bb5251":"b34ed579","chunk-681f6930":"3b00f13d","chunk-9827a37e":"bc767d8d","chunk-a539f9a6":"291ed879","chunk-ae39c23c":"31d6cfe0","chunk-bc6454b8":"c64953b5","chunk-e3ddb4e0":"21b7bc5b","chunk-effc3b58":"1a773ff1"}[e]+".css",c=i.p+a,r=document.getElementsByTagName("link"),u=0;u<r.length;u++){var s=r[u],f=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(f===a||f===c))return n()}var h=document.getElementsByTagName("style");for(u=0;u<h.length;u++){s=h[u],f=s.getAttribute("data-href");if(f===a||f===c)return n()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=n,d.onerror=function(n){var a=n&&n.target&&n.target.src||c,r=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");r.code="CSS_CHUNK_LOAD_FAILED",r.request=a,delete o[e],d.parentNode.removeChild(d),t(r)},d.href=c;var l=document.getElementsByTagName("head")[0];l.appendChild(d)})).then((function(){o[e]=0})));var a=c[e];if(0!==a)if(a)n.push(a[2]);else{var r=new Promise((function(n,t){a=c[e]=[n,t]}));n.push(a[2]=r);var s,f=document.createElement("script");f.charset="utf-8",f.timeout=120,i.nc&&f.setAttribute("nonce",i.nc),f.src=u(e);var h=new Error;s=function(n){f.onerror=f.onload=null,clearTimeout(d);var t=c[e];if(0!==t){if(t){var a=n&&("load"===n.type?"missing":n.type),o=n&&n.target&&n.target.src;h.message="Loading chunk "+e+" failed.\n("+a+": "+o+")",h.name="ChunkLoadError",h.type=a,h.request=o,t[1](h)}c[e]=void 0}};var d=setTimeout((function(){s({type:"timeout",target:f})}),12e4);f.onerror=f.onload=s,document.head.appendChild(f)}return Promise.all(n)},i.m=e,i.c=a,i.d=function(e,n,t){i.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,n){if(1&n&&(e=i(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var a in e)i.d(t,a,function(n){return e[n]}.bind(null,a));return t},i.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(n,"a",n),n},i.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},i.p="",i.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],f=s.push.bind(s);s.push=n,s=s.slice();for(var h=0;h<s.length;h++)n(s[h]);var d=f;r.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("56d7")},"49ee":function(e,n,t){e.exports=t.p+"img/close.446e8669.gif"},"56d7":function(e,n,t){"use strict";t.r(n);t("e260"),t("e6cf"),t("cca6"),t("a79d");var a=t("2b0e"),o=(t("d3b7"),t("bc3a")),c=t.n(o),r=t("2f62");a["a"].use(r["a"]);var u=new r["a"].Store({state:{showoverlay:!1,loginInfo:null,token:null},getters:{tokens:function(e){var n=e.token;return n||(n=sessionStorage.getItem("token"),n||(n=document.cookie.substr(6))),n},loginUser:function(e){var n=e.loginInfo;if(!n){var t=sessionStorage.getItem("loginfos");n=JSON.parse(t)}return n}},mutations:{changeoverlay:function(e,n){e.showoverlay=n},saveToken:function(e,n){e.token=n,document.cookie="token="+n,sessionStorage.setItem("token",n)},saveLoginInfo:function(e,n){e.loginInfo=n;var t=JSON.stringify(n);document.cookie+=t,sessionStorage.setItem("loginfos",t)},LoginOut:function(e){document.cookie="token=",sessionStorage.removeItem("loginfos"),sessionStorage.removeItem("token"),e.token=null,e.loginInfo=null}},actions:{getLoginInfo:function(e,n){f.get("api/user",{headers:{"Authori-zation":"Bearer "+n}}).then((function(n){e.commit("saveLoginInfo",n.data.data)}))}},modules:{}}),i={baseURL:"http://47.115.51.185"},s=c.a.create(i);s.interceptors.request.use((function(e){var n=u.getters.tokens;return n&&n.length>1&&(e.headers={"Authori-zation":"Bearer "+n}),e}),(function(e){return Promise.reject(e)})),s.interceptors.response.use((function(e){return e}),(function(e){return Promise.reject(e)})),Plugin.install=function(e){e.axios=s,window.axios=s,Object.defineProperties(e.prototype,{axios:{get:function(){return s}},$axios:{get:function(){return s}}})},a["a"].use(Plugin);var f=s,h=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"main"}},[t("nav-bar"),t("router-view"),t("div",{ref:"touchhome",staticClass:"imgbutton",staticStyle:{right:"10px",top:"500px","z-index":"9999999"}},[t("div",{on:{touchstart:function(n){return n.stopPropagation(),e.touchstart(n)},touchmove:function(n){return n.stopPropagation(),n.preventDefault(),e.touchmov(n)}}},[t("van-image",{staticClass:"img",attrs:{round:"",src:e.imgcontentshow?e.imgss:e.imgs},on:{click:function(n){e.imgcontentshow=!e.imgcontentshow}}})],1),e.imgcontentshow?t("div",{staticClass:"imgcontent"},[t("van-icon",{attrs:{name:"home-o",color:"#fff"},on:{click:e.myindex}}),t("van-icon",{attrs:{name:"shopping-cart-o",color:"#fff"},on:{click:e.mycart}}),t("van-icon",{attrs:{name:"contact",color:"#fff"},on:{click:e.myMy}})],1):e._e()]),t("div",{staticClass:"paddingBottom"})],1)},d=[],l=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"app"}},[t("van-tabbar",{attrs:{route:"","active-color":"#ee0a24"},model:{value:e.active,callback:function(n){e.active=n},expression:"active"}},[t("van-tabbar-item",{attrs:{icon:"home-o",to:"/"}},[e._v("首页")]),t("van-tabbar-item",{attrs:{icon:"apps-o",to:"/category"}},[e._v("分类")]),t("van-tabbar-item",{attrs:{icon:"shopping-cart-o",to:"/cart"}},[e._v("购物车")]),t("van-tabbar-item",{attrs:{icon:"contact",to:"/my"}},[e._v("我的")])],1)],1)},p=[],b={data:function(){return{active:0}}},m=b,g=t("2877"),k=Object(g["a"])(m,l,p,!1,null,"2efae645",null),v=k.exports,y=t("7a08"),w=t.n(y),x=t("49ee"),S=t.n(x),O={data:function(){return{imgs:w.a,imgss:S.a,imgcontentshow:!1}},components:{NavBar:v},methods:{touchstart:function(e){this.offsetTop=this.$refs.touchhome.offsetTop,this.y=e.changedTouches[0].clientY},touchmov:function(e){this.offsetTop+(e.changedTouches[0].clientY-this.y)>0&&this.offsetTop+(e.changedTouches[0].clientY-this.y)<500&&(document.querySelector(".imgbutton").style.top=this.offsetTop+(e.changedTouches[0].clientY-this.y)+"px")},myindex:function(){this.$router.push("/")},mycart:function(){this.$router.push("/cart")},myMy:function(){this.$router.push("/my")}}},T=O,_=(t("7c55"),Object(g["a"])(T,h,d,!1,null,null,null)),P=_.exports,j=(t("3ca3"),t("ddb0"),t("8c4f"));a["a"].use(j["a"]);var C=j["a"].prototype.push;j["a"].prototype.push=function(e,n,t){return n||t?C.call(this,e,n,t):C.call(this,e).catch((function(e){return e}))};var I=[{path:"/cart",name:"Cart",meta:{login:!0},component:function(){return t.e("chunk-681f6930").then(t.bind(null,"b789"))}},{path:"/category",name:"Category",component:function(){return t.e("chunk-036dd812").then(t.bind(null,"4886"))}},{path:"/commodity/:id",name:"Commodity",props:!0,component:function(){return t.e("chunk-51bb5251").then(t.bind(null,"5a37"))}},{path:"/none",name:"None",props:!0,component:function(){return t.e("chunk-a539f9a6").then(t.bind(null,"99ae"))}},{path:"/addmanage",name:"AddManage",props:!0,component:function(){return t.e("chunk-ae39c23c").then(t.bind(null,"4378"))}},{path:"/detail/:id",name:"Detail",props:!0,component:function(){return t.e("chunk-e3ddb4e0").then(t.bind(null,"c84b"))}},{path:"/orderdetail/:id",name:"OrderDetail",props:!0,component:function(){return t.e("chunk-effc3b58").then(t.bind(null,"d3bb"))}},{path:"/order/:id",name:"Order",props:!0,component:function(){return t.e("chunk-011f83dc").then(t.bind(null,"cf2a"))}},{path:"/",name:"Index",component:function(){return t.e("chunk-13ab6600").then(t.bind(null,"d504"))}},{path:"/search",name:"Search",component:function(){return t.e("chunk-9827a37e").then(t.bind(null,"2d3b"))}},{path:"/hotnewgoods/:num",name:"Hotnewgoods",props:!0,component:function(){return t.e("chunk-3e7b866d").then(t.bind(null,"6646"))}},{path:"/my",name:"My",meta:{login:!0},component:function(){return t.e("chunk-bc6454b8").then(t.bind(null,"4c41"))}},{path:"/mydata",name:"Mydata",meta:{login:!0},component:function(){return t.e("chunk-4d691990").then(t.bind(null,"43cb"))}},{path:"/changepassword",name:"Changepassword",meta:{login:!0},component:function(){return t.e("chunk-3bf1aec4").then(t.bind(null,"2a08"))}},{path:"/login",name:"login",component:function(){return t.e("chunk-0e3ee073").then(t.bind(null,"a55b"))}}],E=new j["a"]({routes:I});E.beforeEach((function(e,n,t){e.meta.login&&!u.getters.tokens&&t("/login"),t()}));var L=E,A=(t("5cfb"),t("157a"),t("ac28")),M=t("2ed4"),N=t("d961"),$=t("44bf"),B=t("8f80"),D=t("5596"),q=t("2bb1"),J=t("343b"),Y=t("2830"),z=t("21ab"),U=t("ad06"),H=t("c36e"),F=t("66fd"),K=t("b650"),R=t("0b33"),G=t("5e46"),Q=t("9ffb"),V=t("d1e1"),W=t("a3e2"),X=t("6e47"),Z=t("772a"),ee=t("565f"),ne=t("bb33"),te=t("82a8"),ae=t("7713"),oe=t("2b5e"),ce=t("df1a"),re=t("ac3c"),ue=t("453b"),ie=t("e41f"),se=t("efa0"),fe=t("e27c"),he=t("9f14"),de=t("20fb"),le=t("417e"),pe=t("3acc"),be=t("7744"),me=t("34e9"),ge=t("543e"),ke=t("dc0f"),ve=t("510b"),ye=t("67bb"),we=t("d399"),xe=t("6869"),Se=t("1125"),Oe=t("2241"),Te=t("ab2c");a["a"].config.productionTip=!1,a["a"].use(A["a"]).use(M["a"]).use(N["a"]).use($["a"]).use(B["a"]),a["a"].use(D["a"]),a["a"].use(q["a"]),a["a"].use(J["a"]),a["a"].use(Y["a"]),a["a"].use(z["a"]),a["a"].use(U["a"]),a["a"].use(H["a"]),a["a"].use(F["a"]),a["a"].use(K["a"]),a["a"].use(R["a"]).use(G["a"]),a["a"].use(Q["a"]),a["a"].use(V["a"]),a["a"].use(W["a"]),a["a"].use(X["a"]),a["a"].use(Z["a"]).use(ee["a"]),a["a"].use(ne["a"]),a["a"].use(te["a"]),a["a"].use(ae["a"]),a["a"].use(oe["a"]).use(ce["a"]),a["a"].use(re["a"]).use(ue["a"]).use(ie["a"]).use(se["a"]),a["a"].use(fe["a"]).use(he["a"]).use(de["a"]).use(le["a"]).use(pe["a"]),a["a"].use(be["a"]).use(me["a"]).use(ge["a"]),a["a"].use(ke["a"]).use(ve["a"]).use(ye["a"]).use(we["a"]).use(xe["a"]).use(Se["a"]).use(Oe["a"]).use(Te["a"]),new a["a"]({router:L,store:u,render:function(e){return e(P)}}).$mount("#app")},"7a08":function(e,n,t){e.exports=t.p+"img/open.7da41017.gif"},"7c55":function(e,n,t){"use strict";t("dcc4")},dcc4:function(e,n,t){}});
//# sourceMappingURL=app.a30b627a.js.map