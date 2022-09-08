/*! For license information please see permission-page.f37cb4d6d4adc63dfac4.js.LICENSE.txt */
"use strict";(self.webpackChunknicefish_react=self.webpackChunknicefish_react||[]).push([[436],{60331:(e,t,n)=>{n.d(t,{Z:()=>g});var a=n(4942),c=n(87462),r=n(29439),l=n(67294),o=n(94184),i=n.n(o),s=n(98423),m=n(54549),u=n(65632),f=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var c=0;for(a=Object.getOwnPropertySymbols(e);c<a.length;c++)t.indexOf(a[c])<0&&Object.prototype.propertyIsEnumerable.call(e,a[c])&&(n[a[c]]=e[a[c]])}return n};const d=function(e){var t,n=e.prefixCls,r=e.className,o=e.checked,s=e.onChange,m=e.onClick,d=f(e,["prefixCls","className","checked","onChange","onClick"]),p=(0,l.useContext(u.E_).getPrefixCls)("tag",n),v=i()(p,(t={},(0,a.Z)(t,"".concat(p,"-checkable"),!0),(0,a.Z)(t,"".concat(p,"-checkable-checked"),o),t),r);return l.createElement("span",(0,c.Z)({},d,{className:v,onClick:function(e){null==s||s(!o),null==m||m(e)}}))};var p=n(98787),v=n(21790),E=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var c=0;for(a=Object.getOwnPropertySymbols(e);c<a.length;c++)t.indexOf(a[c])<0&&Object.prototype.propertyIsEnumerable.call(e,a[c])&&(n[a[c]]=e[a[c]])}return n},b=new RegExp("^(".concat(p.Y.join("|"),")(-inverse)?$")),y=new RegExp("^(".concat(p.E.join("|"),")$")),h=function(e,t){var n,o=e.prefixCls,f=e.className,d=e.style,p=e.children,h=e.icon,N=e.color,g=e.onClose,k=e.closeIcon,x=e.closable,C=void 0!==x&&x,O=E(e,["prefixCls","className","style","children","icon","color","onClose","closeIcon","closable"]),Z=l.useContext(u.E_),w=Z.getPrefixCls,j=Z.direction,S=l.useState(!0),P=(0,r.Z)(S,2),I=P[0],q=P[1];l.useEffect((function(){"visible"in O&&q(O.visible)}),[O.visible]);var _=function(){return!!N&&(b.test(N)||y.test(N))},R=(0,c.Z)({backgroundColor:N&&!_()?N:void 0},d),z=_(),F=w("tag",o),T=i()(F,(n={},(0,a.Z)(n,"".concat(F,"-").concat(N),z),(0,a.Z)(n,"".concat(F,"-has-color"),N&&!z),(0,a.Z)(n,"".concat(F,"-hidden"),!I),(0,a.Z)(n,"".concat(F,"-rtl"),"rtl"===j),n),f),$=function(e){e.stopPropagation(),null==g||g(e),e.defaultPrevented||"visible"in O||q(!1)},B="onClick"in O||p&&"a"===p.type,D=(0,s.Z)(O,["visible"]),L=h||null,Y=L?l.createElement(l.Fragment,null,L,l.createElement("span",null,p)):p,A=l.createElement("span",(0,c.Z)({},D,{ref:t,className:T,style:R}),Y,C?k?l.createElement("span",{className:"".concat(F,"-close-icon"),onClick:$},k):l.createElement(m.Z,{className:"".concat(F,"-close-icon"),onClick:$}):null);return B?l.createElement(v.Z,null,A):A},N=l.forwardRef(h);N.displayName="Tag",N.CheckableTag=d;const g=N},13122:(e,t,n)=>{n.r(t),n.d(t,{default:()=>o});var a=n(67294),c=n(96974);function r(e){var t={};return e.name||(t.name="权限名称为必填项"),t}var l=function(){return l=Object.assign||function(e){for(var t,n=1,a=arguments.length;n<a;n++)for(var c in t=arguments[n])Object.prototype.hasOwnProperty.call(t,c)&&(e[c]=t[c]);return e},l.apply(this,arguments)};const o=function(e){var t=(0,c.s0)(),n=(0,a.useState)({name:""}),o=n[0],i=n[1],s=(0,a.useState)({}),m=s[0],u=s[1],f=(0,a.useState)(!1),d=f[0],p=f[1],v=(0,a.useState)({name:{touched:!1,dirty:!1}}),E=v[0],b=v[1];return(0,a.useEffect)((function(){var e=r(o),t=Object.keys(e).some((function(t){return e[t]}));p(t)}),[m]),a.createElement("div",{className:"role-edit-container font-size-16"},a.createElement("div",{className:"card "},a.createElement("div",{className:"card-header"},a.createElement("h3",{className:"font-size-16 m-0"},"编辑权限")),a.createElement("div",{className:"pd-10px "},a.createElement("form",{onSubmit:function(e){e.preventDefault(),console.log(o)}},a.createElement("div",{className:"form-group row"},a.createElement("label",{className:"col-md-2 md-text-align-right col-form-label"},"名称："),a.createElement("div",{className:"col-md-10"},a.createElement("input",{name:"roleName",type:"text",value:o.name,className:"form-control",onBlur:function(e){return function(e,t){var n;"name"===e&&(b(l(l({},E),((n={})[e]=l(l({},E[e]),{touched:!0}),n))),u(r(o)))}("name",e.target.value)},onChange:function(e){return function(e,t){var n,a=l(l({},o),{name:t});b(l(l({},E),((n={})[e]=l(l({},E[e]),{dirty:!0}),n))),i(a),u(r(a))}("name",e.target.value)},placeholder:"请输入名称"}),(E.name.touched||E.name.dirty)&&m.name?a.createElement("div",{className:"text-red"},m.name):"")),a.createElement("div",{className:"form-group"},a.createElement("div",{className:"col-md-offset-2 col-md-10"},a.createElement("button",{className:"btn btn-primary btn-margin-1rem",disabled:d},"保存"),a.createElement("button",{type:"button",className:"btn btn-secondary ml-16px",onClick:function(){t(-1)}},"取消")))))))}},80124:(e,t,n)=>{n.r(t),n.d(t,{default:()=>o});var a=n(67294),c=n(60331),r=n(98061),l=n(39711);const o=function(){var e=[{title:"序号",dataIndex:"key",key:"key",filters:[{text:"1",value:"1"},{text:"2",value:"2"}],onFilter:function(e,t){return t.key.includes(e)},sorter:function(e,t){return e.key-t.key}},{title:"名称",dataIndex:"title",key:"title",sorter:function(e,t){return e.title.localeCompare(t.title)}},{title:"操作",dataIndex:"options",key:"options",width:120,fixed:"right",render:function(e,t){return a.createElement("div",null,e.map((function(e,n){return e.link?a.createElement(c.Z,{key:n},a.createElement(l.OL,{to:"".concat(e.link+t.key)},a.createElement("i",{className:"".concat(e.icon," "),"aria-hidden":"true"}))):a.createElement(c.Z,{key:n},a.createElement("a",null,a.createElement("i",{className:"".concat(e.icon," "),"aria-hidden":"true"})))})))}}],t=(0,a.useState)([{key:"1",title:"发表文章",userName:"damoqiongqiu",options:[{icon:"fa fa-pencil-square-o",link:"/manage/permission-edit/"},{icon:"fa fa-trash"}]},{key:"2",title:"删除文章",userName:"damoqiongqiu",options:[{icon:"fa fa-pencil-square-o",link:"/manage/permission-edit/"},{icon:"fa fa-trash"}]}])[0];return a.createElement("div",{className:"permission-table-container"},a.createElement("form",{className:"form-vertical",role:"form"},a.createElement("div",{className:"row"},a.createElement("div",{className:"col-sm-8 "},a.createElement("div",{className:"input-group"},a.createElement("input",{className:"form-control",type:"text",placeholder:"权限名称，权限代码"}),a.createElement("span",{className:"input-group-btn"},a.createElement("button",{className:"btn btn-primary",type:"button"},a.createElement("i",{className:"fa fa-search","aria-hidden":"true"}),"搜索")))),a.createElement("div",{className:"col-sm-4 "},a.createElement("div",{className:"input-group pull-right"},a.createElement("button",{className:"btn btn-primary",type:"button"},a.createElement("i",{className:"fa fa-user","aria-hidden":"true"}),"创建权限"))))),a.createElement("div",{className:"row mt-16px"},a.createElement("div",{className:"col-md-12"},a.createElement(r.Z,{dataSource:t,columns:e,scroll:{x:420}}))))}}}]);