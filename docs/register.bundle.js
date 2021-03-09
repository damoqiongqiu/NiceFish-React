/*! Copyright By yanyunchangfeng */
(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{1277:function(e,t,a){"use strict";t.a={fillClass:"ui-state-filled",toggleClass:function(e,t,a){void 0===a&&(a=""),t(e?a:"")}}},1292:function(e,t,a){"use strict";a.r(t);var n=a(1);function l(e){var t={},a=e.pwd,n=e.cfpwd;return e.email?/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(e.email)||(t.email="请输入正确的邮箱格式"):t.email="邮箱必须输入",e.pwd?/\w{8,}/.test(e.pwd)||(t.pwd="密码至少为8位"):t.pwd="请输入密码",e.cfpwd?/\w{8,}/.test(e.cfpwd)?a!==n&&(t.cfpwd="密码不一致"):t.cfpwd="确认密码至少为8位":t.cfpwd="请输入确认密码",t}var r=a(75),c=a(342),i=a(1277),s=function(){return(s=Object.assign||function(e){for(var t,a=1,n=arguments.length;a<n;a++)for(var l in t=arguments[a])Object.prototype.hasOwnProperty.call(t,l)&&(e[l]=t[l]);return e}).apply(this,arguments)};t.default=Object(r.k)(function(e){var t=Object(n.useState)(""),a=t[0],r=t[1],o=Object(n.useState)(""),d=o[0],u=o[1],m=Object(n.useState)(""),p=m[0],f=m[1],w=Object(n.useState)(!1),b=w[0],y=w[1],h=Object(n.useState)({email:{touched:!1,dirty:!1},pwd:{touched:!1,dirty:!1},cfpwd:{touched:!1,dirty:!1}}),v=h[0],g=h[1],x=Object(n.useState)({}),E=x[0],N=x[1],O=Object(n.useState)({email:"",pwd:"",cfpwd:""}),j=O[0],C=O[1];function k(e,t){var a,n,c;switch(e){case"email":N(l(j)),g(s({},v,((a={})[e]={touched:!0},a))),i.a.toggleClass(t,r,i.a.fillClass);break;case"pwd":N(l(j)),g(s({},v,((n={})[e]={touched:!0},n))),i.a.toggleClass(t,u,i.a.fillClass);break;case"cfpwd":N(l(j)),g(s({},v,((c={})[e]={touched:!0},c))),i.a.toggleClass(t,f,i.a.fillClass)}}function S(e,t){var a,n,r,c,i=s({},j,((a={})[e]=t,a));switch(e){case"email":g(s({},v,((n={})[e]={dirty:!0},n)));break;case"pwd":g(s({},v,((r={})[e]={dirty:!0},r)));break;case"cfpwd":g(s({},v,((c={})[e]={dirty:!0},c)))}C(i),N(l(i))}return Object(n.useEffect)(function(){var e=l(j),t=Object.keys(e).some(function(t){return e[t]});y(t)},[E]),n.createElement("div",{className:"container d-flex align-items-center login-container"},n.createElement("div",{className:"card login-panel bg-white"},n.createElement("div",{className:"col-12 d-flex justify-content-center  text-white"},n.createElement("span",{className:"bg-red pd-5-10px font-size-24"},"魚")),n.createElement("form",{onSubmit:function(t){return function(t){t.preventDefault(),c.a.setKeyValue("user",j.email),e.history.push("/home")}(t)}},n.createElement("div",{className:"col-12 d-flex  text-white"},n.createElement("span",{className:"inputfiled"},n.createElement("input",{className:"col input-text "+a+" "+((v.email.touched||v.email.dirty)&&E.email?"error":""),type:"text",autoComplete:"off",value:j.email,onChange:function(e){return S("email",e.target.value)},onBlur:function(e){return k("email",e.target.value)}}),n.createElement("label",null,"Email"),(v.email.touched||v.email.dirty)&&E.email?n.createElement("div",{className:"text-red"},E.email):"")),n.createElement("div",{className:"col-12 d-flex justify-content-center  text-white"},n.createElement("span",{className:"inputfiled"},n.createElement("input",{className:"col input-text "+d+" "+((v.pwd.touched||v.pwd.dirty)&&E.pwd?"error":""),type:"password",value:j.pwd,autoComplete:"off",onBlur:function(e){k("pwd",e.target.value)},onChange:function(e){return S("pwd",e.target.value)}}),n.createElement("label",null,"Password"),(v.pwd.touched||v.pwd.dirty)&&E.pwd?n.createElement("div",{className:"text-red"},E.pwd):"")),n.createElement("div",{className:"col-12 d-flex justify-content-center  text-white"},n.createElement("span",{className:"inputfiled"},n.createElement("input",{className:"col input-text "+p+" "+((v.cfpwd.touched||v.cfpwd.dirty)&&E.cfpwd?"error":""),type:"password",value:j.cfpwd,autoComplete:"off",onBlur:function(e){k("cfpwd",e.target.value)},onChange:function(e){return S("cfpwd",e.target.value)}}),n.createElement("label",null,"Confirm Password"),(v.cfpwd.touched||v.cfpwd.dirty)&&E.cfpwd?n.createElement("div",{className:"text-red"},E.cfpwd):"")),n.createElement("div",{className:"col-12 d-flex justify-content-center  text-white ui-fluid"},n.createElement("button",{className:"btn btn-primary col",disabled:b},"注册")))))})},1294:function(e,t,a){"use strict";a.r(t);var n=a(1),l=["#25859e","#6acece","#e78816","#eabc7f","#12619d","#ad2532","#15938d","#b3aa9b","#042d4c"],r={baseColor:l,genColor:function(e){for(var t=0,a=[],n=0;n<e.length;n++)t<l.length?a[n]=l[t++]:(t=0,a[n]=l[t++]);return a}},c=a(938);t.default=function(){var e,t,a,l=Object(n.useRef)(null),i=Object(n.useRef)(null),s=Object(n.useRef)(null),o={theme:"",event:[{type:"click",cb:function(e){console.log(e)}}],color:r.baseColor,title:{text:"NiceFish访问用户地区分布",subtext:"纯属虚构",x:"center"},tooltip:{trigger:"item",formatter:"{a} <br/>{b} : {c} ({d}%)"},legend:{orient:"vertical",top:"7%",left:"3%",data:["深圳","北京","广州","上海","长沙"]},series:[{name:"访问来源",type:"pie",startAngle:-180,radius:"55%",center:["50%","60%"],data:[{value:3350,name:"深圳"},{value:310,name:"北京"},{value:234,name:"广州"},{value:135,name:"上海"},{value:1548,name:"长沙"}],itemStyle:{emphasis:{shadowBlur:10,shadowOffsetX:0,shadowColor:"rgba(0, 0, 0, 0.5)"}}}]},d={title:{text:"NiceFish月访问量统计",subtext:"纯属虚构",x:"center"},tooltip:{trigger:"axis",axisPointer:{type:"shadow"},formatter:"{b}月{a}:{c}"},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},xAxis:[{type:"category",data:["1","2","3","4","5","6","7","8","9","10","11","12"],axisTick:{alignWithLabel:!0}}],yAxis:[{type:"value"}],series:[{name:"访问量",type:"bar",barWidth:"60%",itemStyle:{normal:{color:function(e){return r.genColor(d.series[0].data)[e.dataIndex]}}},data:[900,1258,1300,1334,1390,1430,1520,1e3,500,444,999,555]}]},u={title:{text:"NiceFish月访问趋势图",subtext:"纯属虚构",x:"center"},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},legend:{x:"center",y:"center"},tooltip:{trigger:"axis"},xAxis:{type:"category",boundaryGap:!1,data:["1","2","3","4","5","6","7","8","9","10","11","12"]},yAxis:{type:"value",axisLabel:{formatter:"{value} 次"}},series:[{name:"访问量",type:"line",data:[11,11,15,13,12,13,10,123,100,19,16,199]},{name:"访问量1",type:"line",data:[21,21,25,23,22,23,20,223,200,29,26,299]},{name:"访问量2",type:"line",data:[31,31,35,33,32,33,30,323,300,39,36,399]},{name:"访问量3",type:"line",data:[41,41,45,43,42,43,40,423,400,49,46,499]},{name:"访问量4",type:"line",data:[41,41,45,43,42,43,40,423,400,49,56,499]},{name:"访问量5",type:"line",data:[51,51,55,53,52,53,50,523,500,59,66,599]},{name:"访问量6",type:"line",data:[61,61,65,63,62,63,60,623,600,69,76,699]},{name:"访问量7",type:"line",data:[71,71,75,73,72,73,70,723,700,79,86,799]},{name:"访问量8",type:"line",data:[81,81,85,83,82,83,80,823,800,89,96,899]}]};return Object(n.useEffect)(function(){e=c.init(l.current),t=c.init(i.current),a=c.init(s.current),e.setOption(o),t.setOption(d),a.setOption(u)}),n.createElement("div",null,n.createElement("div",{ref:l,className:"react-echart"}),n.createElement("div",{ref:i,className:"react-echart"}),n.createElement("div",{ref:s,className:"react-echart"}))}}}]);