(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e0352ca4"],{"10a1":function(t,i,a){"use strict";a.r(i);var e=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("div",{staticClass:"chart"},[a("back",{attrs:{title:"市场数据"}}),a("van-dropdown-menu",[a("van-dropdown-item",{ref:"city",attrs:{title:t.city}},[a("div",{staticClass:"search"},[a("i",{staticClass:"iconfont iconicon_search"}),t._v(" 请输入关键字 ")]),a("van-index-bar",{attrs:{sticky:!1}},t._l(t.cityList,(function(i,e){return a("van-index-anchor",{key:e,attrs:{index:e}},[t._v(" "+t._s(e)+" "),t._l(i,(function(i,n){return a("h3",{key:n,on:{click:function(i){return t.changeCity(e,n)}}},[t._v(" "+t._s(i[0])+" ")])}))],2)})),1)],1),a("van-dropdown-item",{ref:"position",attrs:{title:t.position},model:{value:t.position,callback:function(i){t.position=i},expression:"position"}},[a("div",{staticClass:"search"},[a("i",{staticClass:"iconfont iconicon_search"}),t._v(" 请输入关键字 ")]),t._l(t.positionList,(function(i,e){return a("div",{key:e,staticClass:"position_text",on:{click:function(a){return t.changePosition(i)}}},[t._v(" "+t._s(i)+" ")])}))],2)],1),a("div",{staticClass:"title"},[t._v(" 工资收入 ")]),a("canvas",{attrs:{id:"chart1"}}),a("div",{staticClass:"title"},[t._v(" 工作经验 ")]),a("canvas",{attrs:{id:"chart2"}}),a("div",{staticClass:"title"},[t._v(" 平均工资 ")]),a("canvas",{attrs:{id:"chart3"}}),a("div",{staticClass:"title"},[t._v(" 就业形式 ")]),a("canvas",{attrs:{id:"chart4"}})],1)},n=[],r=a("1da1"),o=(a("159b"),a("96cf"),a("7e1e")),s=a("8bd2"),c=a.n(s),l={name:"",components:{},props:{},data:function(){return{city:"",position:"",cityList:{},positionList:[],data1:[],data2:[],data3:[],data4:[]}},computed:{},watch:{},created:function(){this.getDataIndex()},mounted:function(){},methods:{getDataIndex:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function i(){var a,e;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return i.prev=0,i.next=3,Object(o["b"])();case 3:a=i.sent,e=a.data,t.cityList=e.data,t.city=e.data["热门"][0][0],t.positionList=e.data["热门"][0][1],t.position=t.positionList[0],t.getChartData(),i.next=14;break;case 12:i.prev=12,i.t0=i["catch"](0);case 14:case"end":return i.stop()}}),i,null,[[0,12]])})))()},changeCity:function(t,i){this.city=this.cityList[t][i][0],this.positionList=this.cityList[t][i][1],this.position=this.positionList[0],this.getChartData(),this.$refs.city.toggle()},changePosition:function(t){this.position=t,this.getChartData(),this.$refs.position.toggle()},getChartData:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function i(){var a,e;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return i.prev=0,i.next=3,Object(o["a"])({city:t.city,position:t.position});case 3:a=i.sent,e=a.data,t.data1=e.data.percentSalary,t.data2=e.data.experienceSalary,t.data3=e.data.yearSalary,t.data4=e.data.employmentNum,t.setChart1(),t.setChart2(),t.setChart3(),t.setChart4(),i.next=17;break;case 15:i.prev=15,i.t0=i["catch"](0);case 17:case"end":return i.stop()}}),i,null,[[0,15]])})))()},setChart1:function(){var t={};this.data1.forEach((function(i){t[i.assetType]=i.percent,i.a="1"}));var i=new c.a.Chart({id:"chart1",pixelRatio:window.devicePixelRatio});i.source(this.data1,{percent:{formatter:function(t){return 100*t+"%"}}}),i.legend({position:"right",itemFormatter:function(i){return i+"  "+t[i]+"%"}}),i.tooltip(!1),i.coord("polar",{transposed:!0,innerRadius:.4,radius:.85}),i.axis(!1),i.interval().position("a*percent").color("assetType",["#1890FF","#13C2C2","#2FC25B","#FACC14","#F04864","#8543E0"]).adjust("stack").style({lineWidth:1,stroke:"#fff",lineJoin:"round",lineCap:"round"}).animate({appear:{duration:1200,easing:"bounceOut"}}),i.guide().html({position:["50%","45%"],html:'<div style="width: 250px;height: 40px;text-align: center;margin-top: 15px;">\n            <div style="font-size: 10px">平均工资</div>\n            <div style="font-size: 10px">15300</div>\n          </div>'}),i.render()},setChart2:function(){var t=new c.a.Chart({id:"chart2",pixelRatio:window.devicePixelRatio});t.source(this.data2),t.tooltip({showCrosshairs:!0}),t.scale({info:{range:[.1,.9]},tem:{tickCount:5,min:0}}),t.axis("info",{label:{rotate:Math.PI/3,textAlign:"start",textBaseline:"middle"}}),t.area().position("info*value"),t.line().position("info*value"),t.point().position("info*value").style({stroke:"skyblue",fill:"#fff",lineWidth:1}),t.render()},setChart3:function(){var t=new c.a.Chart({id:"chart3",pixelRatio:window.devicePixelRatio});t.source(this.data3),t.tooltip({showCrosshairs:!0}),t.scale({info:{range:[.1,.9]},tem:{tickCount:5,min:0}}),t.axis("year",{label:{rotate:Math.PI/3,textAlign:"start",textBaseline:"middle"}}),t.area().position("year*salary"),t.line().position("year*salary"),t.point().position("year*salary").style({stroke:"skyblue",fill:"#fff",lineWidth:1}),t.render()},setChart4:function(){var t=new c.a.Chart({id:"chart4",pixelRatio:window.devicePixelRatio});t.source(this.data4),t.tooltip({showCrosshairs:!0}),t.scale({info:{range:[.1,.9]},tem:{tickCount:5,min:0}}),t.axis("date",{label:{rotate:Math.PI/3,textAlign:"start",textBaseline:"middle"}}),t.area().position("date*value"),t.line().position("date*value"),t.point().position("date*value").style({stroke:"skyblue",fill:"#fff",lineWidth:1}),t.render()}}},d=l,u=(a("ea44"),a("2877")),h=Object(u["a"])(d,e,n,!1,null,"132c017a",null);i["default"]=h.exports},"159b":function(t,i,a){var e=a("da84"),n=a("fdbc"),r=a("17c2"),o=a("9112");for(var s in n){var c=e[s],l=c&&c.prototype;if(l&&l.forEach!==r)try{o(l,"forEach",r)}catch(d){l.forEach=r}}},"17c2":function(t,i,a){"use strict";var e=a("b727").forEach,n=a("a640"),r=n("forEach");t.exports=r?[].forEach:function(t){return e(this,t,arguments.length>1?arguments[1]:void 0)}},"7e1e":function(t,i,a){"use strict";a.d(i,"c",(function(){return n})),a.d(i,"b",(function(){return r})),a.d(i,"a",(function(){return o}));var e=a("b775"),n=function(){return Object(e["a"])({url:"/chart-data/hot",needToken:!1})},r=function(){return Object(e["a"])({url:"/chart-data/indexes",needToken:!1})},o=function(t){return Object(e["a"])({url:"/chart-data/statistics",params:t,needToken:!1})}},a640:function(t,i,a){"use strict";var e=a("d039");t.exports=function(t,i){var a=[][t];return!!a&&e((function(){a.call(null,i||function(){throw 1},1)}))}},da66:function(t,i,a){},ea44:function(t,i,a){"use strict";a("da66")}}]);
//# sourceMappingURL=chunk-e0352ca4.ca675724.js.map