(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-47a63958"],{"0b2b":function(t,e,n){},1098:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("van-skeleton",{attrs:{title:"",avatar:"",row:16,loading:t.loading}},[n("div",{staticClass:"detail"},[n("back",{attrs:{title:""}}),t.detail.title?n("div",{staticClass:"padding"},[n("div",{staticClass:"detail_title"},[t._v(" "+t._s(t.detail.title)+" ")]),n("div",{staticClass:"detail_header"},[n("div",{staticClass:"time"},[t._v(" "+t._s(t.detail.created_at.slice(0,10))+" ")]),n("div",{staticClass:"read"},[n("i",{staticClass:"iconfont iconicon_liulanliang"}),t._v(" "+t._s(t.detail.read)+" ")]),n("div",{staticClass:"star"},[n("i",{staticClass:"iconfont iconbtn_dianzan_small_nor"}),t._v(" "+t._s(t.detail.star)+" ")])]),n("div",{staticClass:"detail_content",domProps:{innerHTML:t._s(t.detail.content)}})]):t._e()],1)])},r=[],c=n("1da1"),i=(n("96cf"),n("9407")),s=n("8bbf"),o=n.n(s),u=n("3089");o.a.use(u["Skeleton"]);var d={name:"",components:{},props:{},data:function(){return{loading:!0,detail:{}}},computed:{},watch:{},created:function(){var t=this;return Object(c["a"])(regeneratorRuntime.mark((function e(){var n,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(i["f"])(t.$route.params.id);case 3:n=e.sent,a=n.data,t.detail=a.data,t.loading=!1,e.next=11;break;case 9:e.prev=9,e.t0=e["catch"](0);case 11:case"end":return e.stop()}}),e,null,[[0,9]])})))()},mounted:function(){},methods:{}},l=d,f=(n("2497"),n("2877")),b=Object(f["a"])(l,a,r,!1,null,"c83b8156",null);e["default"]=b.exports},2497:function(t,e,n){"use strict";n("0b2b")},9407:function(t,e,n){"use strict";n.d(e,"g",(function(){return r})),n.d(e,"f",(function(){return c})),n.d(e,"d",(function(){return i})),n.d(e,"c",(function(){return s})),n.d(e,"j",(function(){return o})),n.d(e,"h",(function(){return u})),n.d(e,"e",(function(){return d})),n.d(e,"b",(function(){return l})),n.d(e,"k",(function(){return f})),n.d(e,"i",(function(){return b})),n.d(e,"a",(function(){return m}));var a=n("b775"),r=function(t){return Object(a["a"])({url:"/articles/technic",params:t,needToken:!1})},c=function(t){return Object(a["a"])({url:"/articles/technic/"+t,needToken:!1})},i=function(t){return Object(a["a"])({url:"/articles/share",params:t,needToken:!1})},s=function(t){return Object(a["a"])({url:"/articles/share/"+t,needToken:!1})},o=function(t){return Object(a["a"])({url:"/articles/star",method:"POST",data:t,needToken:!0})},u=function(){return Object(a["a"])({url:"/articles/technicTopSearch",needToken:!1})},d=function(){return Object(a["a"])({url:"/articles/shareTopSearch",needToken:!1})},l=function(t,e){return Object(a["a"])({url:"/articles/comments/"+t,params:e,needToken:!1})},f=function(t){return Object(a["a"])({url:"/article-comments/star",method:"POST",data:t,needToken:!0})},b=function(t){return Object(a["a"])({url:"/articles/comments",method:"POST",data:t,needToken:!0})},m=function(t){return Object(a["a"])({url:"/articles/collect",method:"POST",data:{id:t},needToken:!0})}}}]);
//# sourceMappingURL=chunk-47a63958.35690d9c.js.map