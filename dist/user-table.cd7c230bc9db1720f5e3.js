/*! For license information please see user-table.cd7c230bc9db1720f5e3.js.LICENSE.txt */
"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[589],{34940:(e,t,n)=>{n.d(t,{Z:()=>N});var a=n(64649),r=n(25773),c=n(11026),l=n(27378),o=n(60042),i=n.n(o),s=n(42445),m=n(97311),u=n(73533),f=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(a=Object.getOwnPropertySymbols(e);r<a.length;r++)t.indexOf(a[r])<0&&Object.prototype.propertyIsEnumerable.call(e,a[r])&&(n[a[r]]=e[a[r]])}return n};const p=function(e){var t,n=e.prefixCls,c=e.className,o=e.checked,s=e.onChange,m=e.onClick,p=f(e,["prefixCls","className","checked","onChange","onClick"]),d=(0,l.useContext(u.E_).getPrefixCls)("tag",n),g=i()(d,(t={},(0,a.Z)(t,"".concat(d,"-checkable"),!0),(0,a.Z)(t,"".concat(d,"-checkable-checked"),o),t),c);return l.createElement("span",(0,r.Z)({},p,{className:g,onClick:function(e){null==s||s(!o),null==m||m(e)}}))};var d=n(97933),g=n(24174),b=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(a=Object.getOwnPropertySymbols(e);r<a.length;r++)t.indexOf(a[r])<0&&Object.prototype.propertyIsEnumerable.call(e,a[r])&&(n[a[r]]=e[a[r]])}return n},y=new RegExp("^(".concat(d.Y.join("|"),")(-inverse)?$")),E=new RegExp("^(".concat(d.E.join("|"),")$")),v=function(e,t){var n,o=e.prefixCls,f=e.className,p=e.style,d=e.children,v=e.icon,k=e.color,N=e.onClose,h=e.closeIcon,x=e.closable,C=void 0!==x&&x,O=b(e,["prefixCls","className","style","children","icon","color","onClose","closeIcon","closable"]),w=l.useContext(u.E_),Z=w.getPrefixCls,T=w.direction,j=l.useState(!0),P=(0,c.Z)(j,2),I=P[0],S=P[1];l.useEffect((function(){"visible"in O&&S(O.visible)}),[O.visible]);var L=function(){return!!k&&(y.test(k)||E.test(k))},q=(0,r.Z)({backgroundColor:k&&!L()?k:void 0},p),D=L(),R=Z("tag",o),F=i()(R,(n={},(0,a.Z)(n,"".concat(R,"-").concat(k),D),(0,a.Z)(n,"".concat(R,"-has-color"),k&&!D),(0,a.Z)(n,"".concat(R,"-hidden"),!I),(0,a.Z)(n,"".concat(R,"-rtl"),"rtl"===T),n),f),$=function(e){e.stopPropagation(),null==N||N(e),e.defaultPrevented||"visible"in O||S(!1)},_="onClick"in O||d&&"a"===d.type,Y=(0,s.Z)(O,["visible"]),z=v||null,A=z?l.createElement(l.Fragment,null,z,l.createElement("span",null,d)):d,B=l.createElement("span",(0,r.Z)({},Y,{ref:t,className:F,style:q}),A,C?h?l.createElement("span",{className:"".concat(R,"-close-icon"),onClick:$},h):l.createElement(m.Z,{className:"".concat(R,"-close-icon"),onClick:$}):null);return _?l.createElement(g.Z,null,B):B},k=l.forwardRef(v);k.displayName="Tag",k.CheckableTag=p;const N=k},97252:(e,t,n)=>{n.r(t),n.d(t,{default:()=>o});var a=n(27378),r=n(34940),c=n(65364),l=n(4289);const o=function(){var e=[{title:"序号",dataIndex:"key",filters:[{text:"1",value:"1"},{text:"2",value:"2"}],onFilter:function(e,t){return console.log(e,t),t.key.includes(e)},sorter:function(e,t){return e.key-t.key}},{title:"用户名",dataIndex:"userName",sorter:function(e,t){return e.userName.localeCompare(t.userName)}},{title:"注册时间",dataIndex:"registerTime",sorter:function(e,t){return new Date(e.registerTime).getTime()-new Date(t.registerTime).getTime()}},{title:"最后登录",dataIndex:"lastLoginTime",sorter:function(e,t){return new Date(e.lastLoginTime).getTime()-new Date(t.lastLoginTime).getTime()}},{title:"操作",dataIndex:"options",width:100,fixed:"right",render:function(e,t){return a.createElement("div",null,e.map((function(e,n){return e.link?a.createElement(r.Z,{key:n,className:"mb-1"},a.createElement(l.OL,{to:"".concat(e.link+t.key)},a.createElement("i",{className:"".concat(e.icon," "),"aria-hidden":"true"}))):a.createElement(r.Z,{key:n,className:"mb-1"},a.createElement("a",{href:"javascript:void(0)"},a.createElement("i",{className:"".concat(e.icon," "),"aria-hidden":"true"})))})))}}],t=(0,a.useState)([{key:"1",userName:"damoqiongqiu@126.com",registerTime:"2010-11-11 11:11",lastLoginTime:"2016-11-27 09:34",options:[{icon:"fa fa-pencil-square-o",link:"/manage/user-table/edituser/"},{icon:"fa fa-lock"},{icon:"fa fa-trash"},{icon:"fa fa-user-secret"}]},{key:"2",userName:"yanyunchangfeng@gmail.com",registerTime:"2011-11-11 11:11",lastLoginTime:"2018-11-15 09:34",options:[{icon:"fa fa-pencil-square-o",link:"/manage/user-table/edituser/"},{icon:"fa fa-lock"},{icon:"fa fa-trash"},{icon:"fa fa-user-secret"}]}])[0];return a.createElement("div",{className:"user-table-container"},a.createElement("form",{role:"form"},a.createElement("div",{className:"row"},a.createElement("div",{className:"col-sm-8"},a.createElement("div",{className:"input-group"},a.createElement("input",{className:"form-control",type:"text",placeholder:"用户名，昵称"}),a.createElement("span",{className:"input-group-btn"},a.createElement("button",{className:"btn btn-primary",type:"button"},a.createElement("i",{className:"fa fa-search"}),"搜索")))),a.createElement("div",{className:"col-sm-4"},a.createElement("div",{className:"input-group pull-right"},a.createElement("button",{className:"btn btn-primary",type:"button"},a.createElement("i",{className:"fa fa-user","aria-hidden":"true"}),"创建用户"))))),a.createElement("div",{className:"row mt-16px"},a.createElement("div",{className:"col-md-12"},a.createElement(c.Z,{dataSource:t,columns:e,scroll:{x:690}}))))}}}]);