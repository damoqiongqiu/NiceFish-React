/*! For license information please see comment-table.68522b6f3fb8bcb2f41c.js.LICENSE.txt */
"use strict";(self.webpackChunknicefish_react=self.webpackChunknicefish_react||[]).push([[457],{52102:(e,t,n)=>{n.r(t),n.d(t,{default:()=>h});var r=n(67294),a=n(59908),c=n(58650),l=n(99403),i=n(88843),o=n(24065),s=n(96486),u=n(90600),m=u.Z.dataURL.commentListURL,f=u.Z.dataURL.delCommentURL;function d(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,c,l,i=[],o=!0,s=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;o=!1}else for(;!(o=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);o=!0);}catch(e){s=!0,a=e}finally{try{if(!o&&null!=n.return&&(l=n.return(),Object(l)!==l))return}finally{if(s)throw a}}return i}}(e,t)||function(e,t){if(e){if("string"==typeof e)return p(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?p(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}const h=function(e){var t=d((0,r.useState)([]),2),n=t[0],u=t[1],p=d((0,r.useState)(0),2),h=p[0],v=p[1],y=d((0,r.useState)(10),2),E=y[0],b=y[1],g=d((0,r.useState)(1),2),N=g[0],w=g[1],S=d((0,r.useState)(0),2),j=S[0],k=S[1],A=function(){(function(e){var t=s.template(m)({page:e});return o.Z.get(t)})(N).then((function(e){var t,n=e.data;k(n.totalElements),n=(null===(t=n)||void 0===t?void 0:t.content)||[],u(n)}))};return(0,r.useEffect)(A,[]),r.createElement("div",{className:"comment-table-container"},r.createElement("form",{className:"form-vertical",role:"form"},r.createElement("div",{className:"row"},r.createElement("div",{className:"col-md-12"},r.createElement("div",{className:"input-group"},r.createElement("input",{name:"searchStr",className:"form-control",type:"text",placeholder:"内容"}),r.createElement("span",{className:"input-group-btn"},r.createElement("button",{className:"btn btn-default",type:"button"},r.createElement("i",{className:"fa fa-search","aria-hidden":"true"}))))))),r.createElement("div",{className:"row"},r.createElement("div",{className:"col-md-12"},r.createElement("div",{className:"comment-item-container"},r.createElement(a.w,{showGridlines:!0,stripedRows:!0,tableStyle:{width:"100%"},value:n,rows:E,first:h,paginator:{totalRecords:j,onPageChange:function(e){v(e.first),b(e.rows),w(e.page+1)}}},r.createElement(c.s,{field:"content",header:"内容"}),r.createElement(c.s,{field:"nickName",header:"作者"}),r.createElement(c.s,{field:"time",header:"日期"}),r.createElement(c.s,{field:"",header:"操作",body:function(e){return r.createElement(r.Fragment,null,r.createElement(l.z,{icon:"pi pi-pencil",className:"p-button-success"}),"  ",r.createElement(l.z,{icon:"pi pi-trash",className:"p-button-danger",onClick:function(){var t;t=e,(0,i.V)({message:"确定要删除吗？",header:"确认",icon:"pi pi-exclamation-triangle",accept:function(){var e,n;(e=t.id,n=s.template(f)({id:e}),o.Z.delete(n)).then((function(e){niceFishToast({severity:"success",summary:"Success",detail:"删除成功"})}),(function(e){niceFishToast({severity:"error",summary:"Error",detail:"删除失败"})})).finally(A)},reject:function(){console.log("reject")}})}}))}}))))))}}}]);