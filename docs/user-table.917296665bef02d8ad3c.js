/*! For license information please see user-table.917296665bef02d8ad3c.js.LICENSE.txt */
"use strict";(self.webpackChunknicefish_react=self.webpackChunknicefish_react||[]).push([[589],{31764:(e,t,a)=>{a.r(t),a.d(t,{default:()=>d});var r=a(67294),n=a(59908),l=a(58650),s=a(99403),c=a(89250),i=a(88843),o=a(49148);function u(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=a){var r,n,l,s,c=[],i=!0,o=!1;try{if(l=(a=a.call(e)).next,0===t){if(Object(a)!==a)return;i=!1}else for(;!(i=(r=l.call(a)).done)&&(c.push(r.value),c.length!==t);i=!0);}catch(e){o=!0,n=e}finally{try{if(!i&&null!=a.return&&(s=a.return(),Object(s)!==s))return}finally{if(o)throw n}}return c}}(e,t)||function(e,t){if(e){if("string"==typeof e)return m(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(e):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?m(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,r=new Array(t);a<t;a++)r[a]=e[a];return r}const d=function(e){var t=(0,c.s0)(),a=u((0,r.useState)([]),2),m=a[0],d=a[1],f=u((0,r.useState)(0),2),p=f[0],h=f[1],E=u((0,r.useState)(10),2),b=E[0],v=E[1],y=u((0,r.useState)(1),2),g=y[0],N=y[1],U=u((0,r.useState)(0),2),w=U[0],Z=U[1],L=function(){o.Z.getUserTable(g,"").then((function(e){var t,a=e.data;Z(a.totalElements),a=(null===(t=a)||void 0===t?void 0:t.content)||[],d(a)}))};return(0,r.useEffect)(L,[]),r.createElement("div",{className:"user-table-container"},r.createElement("form",{className:"form-vertical",role:"form"},r.createElement("div",{className:"row"},r.createElement("div",{className:"col-md-11"},r.createElement("div",{className:"input-group"},r.createElement("input",{name:"searchStr",className:"form-control",type:"text",placeholder:"用户名，手机号"}),r.createElement("span",{className:"input-group-btn"},r.createElement("button",{className:"btn btn-default",type:"button"},r.createElement("i",{className:"fa fa-search","aria-hidden":"true"}))))),r.createElement("div",{className:"col-md-1"},r.createElement("div",{className:"input-group pull-right"},r.createElement("button",{className:"btn btn-primary",type:"button",onClick:function(){t("/manage/permission/user-profile/-1")}},r.createElement("i",{className:"pi pi-plus","aria-hidden":"true"})))))),r.createElement("div",{className:"row"},r.createElement("div",{className:"col-md-12"},r.createElement("div",{className:"user-item-container"},r.createElement(n.w,{showGridlines:!0,stripedRows:!0,tableStyle:{width:"100%"},value:m,rows:b,first:p,paginator:{totalRecords:w,onPageChange:function(e){h(e.first),v(e.rows),N(e.page+1)}}},r.createElement(l.s,{field:"userName",header:"用户名"}),r.createElement(l.s,{field:"nickName",header:"昵称"}),r.createElement(l.s,{field:"status",body:function(e){return 0==e.status?r.createElement("span",{className:"label label-danger"},"禁用"):r.createElement("span",{className:"label label-success"},"正常")},header:"状态"}),r.createElement(l.s,{field:"email",header:"email"}),r.createElement(l.s,{field:"cellphone",header:"手机号"}),r.createElement(l.s,{field:"createTime",header:"注册时间"}),r.createElement(l.s,{field:"roleEntities",body:function(e){var t;return null==e||null===(t=e.roleEntities)||void 0===t?void 0:t.map((function(e){return r.createElement("h5",{key:e.roleId},r.createElement("span",{className:"label label-success"},e.roleName))}))},header:"角色列表"}),r.createElement(l.s,{field:"",header:"操作",body:function(e){return r.createElement(r.Fragment,null,r.createElement(s.z,{icon:"pi pi-pencil",className:"p-button-success",onClick:function(){t("/manage/permission/user-profile/".concat(e.userId))}}),"  ",r.createElement(s.z,{icon:"pi pi-trash",className:"p-button-danger",onClick:function(){var t;t=e,(0,i.V)({message:"确定要删除吗？",header:"确认",icon:"pi pi-exclamation-triangle",accept:function(){o.Z.del(t.userId).then((function(e){niceFishToast({severity:"success",summary:"Success",detail:"删除成功"})}),(function(e){niceFishToast({severity:"error",summary:"Error",detail:"删除失败"})})).finally(L)},reject:function(){console.log("reject")}})}}))}}))))))}},49148:(e,t,a)=>{a.d(t,{Z:()=>d});var r=a(24065),n=a(96486),l=a(90600),s=l.Z.dataURL.userListURL,c=l.Z.dataURL.delUserURL,i=l.Z.dataURL.userDetailURL,o=l.Z.dataURL.signUpURL,u=l.Z.dataURL.updateUserURL,m=l.Z.dataURL.userMenuListURL;const d={getUserTable:function(e,t){var a=n.template(s)({page:e});return r.Z.post(a,{userName:t})},del:function(e){var t=n.template(c)({id:e});return r.Z.delete(t)},getUserDetails:function(e){var t=n.template(i)({id:e});return r.Z.get(t)},newUser:function(e){return r.Z.post(o,e)},updateUser:function(e){return r.Z.post(u,e)},getMenuByUser:function(e){var t=n.template(m)({id:e});return r.Z.get(t)}}}}]);