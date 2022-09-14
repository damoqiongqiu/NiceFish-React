/*! For license information please see forgot.c0033160a9f9f18f134a.js.LICENSE.txt */
"use strict";(self.webpackChunknicefish_react=self.webpackChunknicefish_react||[]).push([[89],{74521:(e,t,n)=>{n.r(t),n.d(t,{default:()=>s});var r=n(67294),a=n(69587);function c(e){var t={};return e.email?/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(e.email)||(t.email="请输入正确的邮箱格式"):t.email="邮箱必须输入",t}var o=n(19462),l=n(63709),i=n(8939),u=function(){return u=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e},u.apply(this,arguments)};const s=function(){(0,l.G2)(i.Z).useHome();var e=(0,r.useState)(""),t=e[0],n=e[1],s=(0,r.useState)(!1),f=s[0],m=s[1],p=(0,r.useState)({email:{touched:!1,dirty:!1}}),d=p[0],y=p[1],v=(0,r.useState)({}),h=v[0],b=v[1],g=(0,r.useState)({email:""}),E=g[0],_=g[1];return(0,r.useEffect)((function(){var e=c(E),t=Object.keys(e).some((function(t){return e[t]}));m(t)}),[h]),r.createElement("div",{className:"container d-flex align-items-center"},r.createElement("div",{className:"card login-panel bg-white"},r.createElement("div",{className:"col-12 d-flex justify-content-center  text-white"},r.createElement("span",{className:"bg-red pd-5-10px font-size-24"},"魚")),r.createElement("form",{onSubmit:function(e){return function(e){e.preventDefault(),a.ZP.success("邮件发送成功，请登录邮箱查看。")}(e)}},r.createElement("div",{className:"col-12 d-flex  text-white"},r.createElement("span",{className:"inputfiled"},r.createElement("input",{className:"col input-text ".concat(t," ").concat((d.email.touched||d.email.dirty)&&h.email?"error":""),type:"text",autoComplete:"off",value:E.email,onChange:function(e){return function(e,t){var n,r,a=u(u({},E),((n={})[e]=t,n));y(u(u({},d),((r={})[e]={dirty:!0},r))),_(a),b(c(a))}("email",e.target.value)},onBlur:function(e){return function(e,t){var r;b(c(E)),y(u(u({},d),((r={})[e]={touched:!0},r))),o.Z.toggleClass(t,n,o.Z.fillClass)}("email",e.target.value)}}),r.createElement("label",null,"Email"),(d.email.touched||d.email.dirty)&&h.email?r.createElement("div",{className:"text-red"},h.email):"")),r.createElement("div",{className:"col-12 d-flex justify-content-center  text-white ui-fluid"},r.createElement("button",{className:"btn btn-primary col",disabled:f},"找回密码")))))}},8939:(e,t,n)=>{n.d(t,{Z:()=>s});var r,a=n(96974),c=n(67294),o=n(48569),l=n(63709),i=n(3911),u=(r=function(e,t){return r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])},r(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)});const s=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return u(t,e),t.prototype.useLogin=function(){return(0,l.G2)(o.Z).getKey("user")},t.prototype.useHome=function(){var e=this.useLogin(),t=(0,a.s0)();(0,c.useEffect)((function(){e&&t("/")}),[])},function(e,t,n,r){var a,c=arguments.length,o=c<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,n,r);else for(var l=e.length-1;l>=0;l--)(a=e[l])&&(o=(c<3?a(o):c>3?a(t,n,o):a(t,n))||o);return c>3&&o&&Object.defineProperty(t,n,o),o}([(0,l.b2)("AccountService")],t)}(i.Z)},19462:(e,t,n)=>{n.d(t,{Z:()=>r});const r={fillClass:"ui-state-filled",toggleClass:function(e,t,n){void 0===n&&(n=""),t(e?n:"")}}}}]);