/*! Copyright By yanyunchangfeng */
(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{1296:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a(75);function c(e){var t={};return e.name||(t.name="权限名称为必填项"),t}var m=function(){return(m=Object.assign||function(e){for(var t,a=1,n=arguments.length;a<n;a++)for(var r in t=arguments[a])Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e}).apply(this,arguments)};t.default=Object(r.k)(function(e){var t=Object(n.useState)({name:""}),a=t[0],r=t[1],o=Object(n.useState)({}),l=o[0],s=o[1],i=Object(n.useState)(!1),u=i[0],d=i[1],f=Object(n.useState)({name:{touched:!1,dirty:!1}}),b=f[0],v=f[1];return Object(n.useEffect)(function(){var e=c(a),t=Object.keys(e).some(function(t){return e[t]});d(t)},[l]),n.createElement("div",{className:"role-edit-container font-size-16"},n.createElement("div",{className:"card "},n.createElement("div",{className:"card-header"},n.createElement("h3",{className:"font-size-16 m-0"},"编辑权限")),n.createElement("div",{className:"pd-10px "},n.createElement("form",{onSubmit:function(e){e.preventDefault(),console.log(a)}},n.createElement("div",{className:"form-group row"},n.createElement("label",{className:"col-md-2 md-text-align-right col-form-label"},"名称："),n.createElement("div",{className:"col-md-10"},n.createElement("input",{name:"roleName",type:"text",value:a.name,className:"form-control",onBlur:function(e){return function(e,t){var n;switch(e){case"name":v(m({},b,((n={})[e]=m({},b[e],{touched:!0}),n))),s(c(a))}}("name",e.target.value)},onChange:function(e){return t="name",n=e.target.value,l=m({},a,{name:n}),v(m({},b,((o={})[t]=m({},b[t],{dirty:!0}),o))),r(l),void s(c(l));var t,n,o,l},placeholder:"请输入名称"}),(b.name.touched||b.name.dirty)&&l.name?n.createElement("div",{className:"text-red"},l.name):"")),n.createElement("div",{className:"form-group"},n.createElement("div",{className:"col-md-offset-2 col-md-10"},n.createElement("button",{className:"btn btn-primary btn-margin-1rem",disabled:u},"保存"),n.createElement("button",{type:"button",className:"btn btn-secondary ml-16px",onClick:function(){e.history.goBack()}},"取消")))))))})}}]);