/*! For license information please see user-profile.7ce58fc8e961374001ec.js.LICENSE.txt */
"use strict";(self.webpackChunknicefish_react=self.webpackChunknicefish_react||[]).push([[273],{89983:(e,t,a)=>{a.r(t),a.d(t,{default:()=>g});var r=a(67294),n=a(89250),l=a(49148),m=a(10926);function o(e){return o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o(e)}function c(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function s(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?c(Object(a),!0).forEach((function(t){i(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):c(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function i(e,t,a){return(t=function(e){var t=function(e,t){if("object"!==o(e)||null===e)return e;var a=e[Symbol.toPrimitive];if(void 0!==a){var r=a.call(e,"string");if("object"!==o(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"===o(t)?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function u(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=a){var r,n,l,m,o=[],c=!0,s=!1;try{if(l=(a=a.call(e)).next,0===t){if(Object(a)!==a)return;c=!1}else for(;!(c=(r=l.call(a)).done)&&(o.push(r.value),o.length!==t);c=!0);}catch(e){s=!0,n=e}finally{try{if(!c&&null!=a.return&&(m=a.return(),Object(m)!==m))return}finally{if(s)throw n}}return o}}(e,t)||function(e,t){if(e){if("string"==typeof e)return d(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(e):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?d(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,r=new Array(t);a<t;a++)r[a]=e[a];return r}var f=[{label:"女",value:0},{label:"男",value:1},{label:"未知",value:2}];const g=function(e){var t=(0,n.s0)(),a=(0,n.UO)().userId,o=u((0,r.useState)(!0),2),c=o[0],d=o[1],g=u((0,r.useState)({userId:a,avatarURL:"",userName:"",nickName:"",gender:0,email:"",cellphone:"",password:"",confirmPassword:"",status:"",remark:""}),2),v=g[0],p=g[1],N=u((0,r.useState)({userName:{valid:!0,ruleName:"",message:""},nickName:{valid:!0,ruleName:"",message:""},email:{valid:!0,ruleName:"",message:""},cellphone:{valid:!0,ruleName:"",message:""},password:{valid:!0,ruleName:"",message:""},confirmPassword:{valid:!0,ruleName:"",message:""},remark:{valid:!0,ruleName:"",message:""}}),2),h=N[0],E=N[1],b={userName:[{ruleName:"required",message:"请输入邮箱或者手机号",fn:function(e){return(e+"").trim().length>0}},{ruleName:"email",message:"请输入正确的邮箱",fn:function(e){return/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(e)}},{ruleName:"maxLength",message:"用户名最多 32 位",fn:function(e){return(e+"").trim().length<=32}},{ruleName:"minLength",message:"用户名最少 2 位",fn:function(e){return(e+"").trim().length>=2}}],nickName:[{ruleName:"maxLength",message:"昵称最多 32 个字符",fn:function(e){return(e+"").trim().length<=32}},{ruleName:"minLength",message:"昵称最少 2 个字符",fn:function(e){return(e+"").trim().length>=2}}],email:[{ruleName:"email",message:"请输入正确的邮箱",fn:function(e){return/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(e)}}],cellphone:[{ruleName:"phone",message:"请输入正确的手机号",fn:function(e){return/^1[3456789]\d{9}$/.test(e)}}],password:[{ruleName:"required",message:"请输入密码",fn:function(e){return(e+"").trim().length>0}},{ruleName:"maxLength",message:"密码最多16位",fn:function(e){return(e+"").trim().length<=16}},{ruleName:"minLength",message:"密码最少8位",fn:function(e){return(e+"").trim().length>=8}}],confirmPassword:[{ruleName:"required",message:"请输入密码",fn:function(e){return(e+"").trim().length>0}},{ruleName:"maxLength",message:"密码最多 16 位",fn:function(e){return(e+"").trim().length<=16}},{ruleName:"minLength",message:"密码最少 8 位",fn:function(e){return(e+"").trim().length>=8}},{ruleName:"match",message:"两次密码不一致",fn:function(e){return e===v.password}}],remark:[{ruleName:"maxLength",message:"备注最多 200 个字符",fn:function(e){return(e+"").trim().length<=200}},{ruleName:"minLength",message:"备注最少 2 个字符",fn:function(e){return(e+"").trim().length>=2}}]},y=function(e,t){if(b[e]){var a=s(s({},h),i({},e,{valid:!0,ruleName:"",message:""}));if(0===t.length){var r=!1;if(b[e].forEach((function(e){"required"===e.ruleName&&(r=!0)})),!r)return}b[e].forEach((function(r){r.fn(t)||(a[e].valid=!1,a[e].ruleName=r.ruleName,a[e].message=r.message)})),E(a)}},w=function(e,t){y(e,t),p(s(s({},v),{},i({},e,t)))},k=function(){var e=!0;for(var t in v)if(document.getElementsByName(t).length){var a=document.getElementsByName(t)[0].value;y(t,a)}for(var r in h)h[r].valid||(e=!1);d(e)};return(0,r.useEffect)((function(){k()}),[v]),(0,r.useEffect)((function(){"-1"!==a&&l.Z.getUserDetails(a).then((function(e){var t=e.data.data;p(s(s({},t),{},{password:"",confirmPassword:""}))}),(function(e){niceFishToast({severity:"error",summary:"Error",detail:"加载用户信息失败"})}))}),[]),r.createElement("div",{className:"user-profile-container"},r.createElement("div",{className:"panel panel-default"},r.createElement("div",{className:"panel-heading"},"创建/编辑用户"),r.createElement("div",{className:"panel-body"},r.createElement("form",{className:"form-horizontal",role:"form"},r.createElement("div",{className:"form-group"},r.createElement("label",{className:"col-md-2 control-label"},"当前头像："),r.createElement("div",{className:"col-md-10"},r.createElement("img",{src:v.avatarURL||m,style:{width:"64px"}}))),r.createElement("div",{className:"form-group"},r.createElement("label",{className:"col-md-2 control-label"},"上传头像："),r.createElement("div",{className:"col-md-10"},r.createElement("input",{className:"form-control",type:"file",placeholder:"上传头像"}))),r.createElement("div",{className:"form-group ".concat(h.userName.valid?"":"has-error")},r.createElement("label",{className:"col-md-2 control-label"},"用户名："),r.createElement("div",{className:"col-md-10"},r.createElement("input",{className:"form-control",type:"input",placeholder:"用户名",name:"userName",value:v.userName,onChange:function(e){return w(e.target.name,e.target.value)},onBlur:function(e){return y(e.target.name,e.target.value)}}),h.userName.valid?r.createElement(r.Fragment,null):r.createElement("div",{className:"text-danger"},h.userName.message))),r.createElement("div",{className:"form-group ".concat(h.nickName.valid?"":"has-error")},r.createElement("label",{className:"col-md-2 control-label"},"昵称："),r.createElement("div",{className:"col-md-10"},r.createElement("input",{className:"form-control",type:"input",placeholder:"昵称",name:"nickName",value:v.nickName,onChange:function(e){return w(e.target.name,e.target.value)},onBlur:function(e){return y(e.target.name,e.target.value)}}),h.nickName.valid?r.createElement(r.Fragment,null):r.createElement("div",{className:"text-danger"},h.nickName.message))),r.createElement("div",{className:"form-group"},r.createElement("label",{className:"col-md-2 control-label"},"性别："),r.createElement("div",{className:"col-md-10"},f.map((function(e,t){return r.createElement("label",{className:"radio-inline",key:t},r.createElement("input",{type:"radio",name:"gender",value:e.value,checked:e.value==v.gender,onChange:function(e){return w(e.target.name,e.target.value)}})," ",e.label)})))),r.createElement("div",{className:"form-group ".concat(h.email.valid?"":"has-error")},r.createElement("label",{className:"col-md-2 control-label"},"常用邮箱："),r.createElement("div",{className:"col-md-10"},r.createElement("input",{className:"form-control",type:"input",placeholder:"常用邮箱",name:"email",value:v.email,onChange:function(e){return w(e.target.name,e.target.value)},onBlur:function(e){return y(e.target.name,e.target.value)}}),h.email.valid?r.createElement(r.Fragment,null):r.createElement("div",{className:"text-danger"},h.email.message))),r.createElement("div",{className:"form-group ".concat(h.cellphone.valid?"":"has-error")},r.createElement("label",{className:"col-md-2 control-label"},"手机号："),r.createElement("div",{className:"col-md-10"},r.createElement("input",{className:"form-control",type:"input",placeholder:"手机号",name:"cellphone",value:v.cellphone,onChange:function(e){return w(e.target.name,e.target.value)},onBlur:function(e){return y(e.target.name,e.target.value)}}),h.cellphone.valid?r.createElement(r.Fragment,null):r.createElement("div",{className:"text-danger"},h.cellphone.message))),r.createElement("div",{className:"form-group ".concat(h.password.valid?"":"has-error")},r.createElement("label",{className:"col-md-2 control-label"},"密码："),r.createElement("div",{className:"col-md-10"},r.createElement("input",{className:"form-control",type:"password",placeholder:"密码",name:"password",value:v.password,onChange:function(e){return w(e.target.name,e.target.value)},onBlur:function(e){return y(e.target.name,e.target.value)}}),h.password.valid?r.createElement(r.Fragment,null):r.createElement("div",{className:"text-danger"},h.password.message))),r.createElement("div",{className:"form-group ".concat(h.confirmPassword.valid?"":"has-error")},r.createElement("label",{className:"col-md-2 control-label"},"重复密码："),r.createElement("div",{className:"col-md-10"},r.createElement("input",{className:"form-control",type:"password",placeholder:"重复密码",name:"confirmPassword",value:v.confirmPassword,onChange:function(e){return w(e.target.name,e.target.value)},onBlur:function(e){return y(e.target.name,e.target.value)}}),h.confirmPassword.valid?r.createElement(r.Fragment,null):r.createElement("div",{className:"text-danger"},h.confirmPassword.message))),r.createElement("div",{className:"form-group"},r.createElement("label",{className:"col-md-2 control-label"},"启用："),r.createElement("div",{className:"col-md-10"},r.createElement("div",{className:"checkbox"},r.createElement("label",null,r.createElement("input",{type:"checkbox",name:"status",checked:1===v.status,onChange:function(e){var t=e.target.checked?1:0;w(e.target.name,t)}}))))),r.createElement("div",{className:"form-group ".concat(h.remark.valid?"":"has-error")},r.createElement("label",{className:"col-md-2 control-label"},"简介："),r.createElement("div",{className:"col-md-10"},r.createElement("textarea",{rows:"5",className:"form-control",placeholder:"简介",name:"remark",value:v.remark,onChange:function(e){w(e.target.name,e.target.value)},onBlur:function(e){return y(e.target.name,e.target.value)}}),h.remark.valid?r.createElement(r.Fragment,null):r.createElement("div",{className:"text-danger"},h.remark.message)))))),r.createElement("form",{className:"form-horizontal",role:"form"},r.createElement("div",{className:"form-group"},r.createElement("div",{className:"col-md-12"},r.createElement("button",{type:"button",className:"btn btn-primary btn-margin-1rem",onClick:function(){k(),console.log("isFormValid",c),console.log(v),c?"-1"!==a?(delete v.confirmPassword,delete v.salt,l.Z.updateUser(v).then((function(e){e.data.success?(niceFishToast({severity:"success",summary:"Success",detail:"更新成功"}),window.history.back()):niceFishToast({severity:"error",summary:"Error",detail:"更新失败"})}),(function(e){niceFishToast({severity:"error",summary:"Error",detail:"更新失败"})}))):l.Z.newUser(v).then((function(e){var t=e.data;t.success?(niceFishToast({severity:"success",summary:"Success",detail:"创建成功"}),window.history.back()):niceFishToast({severity:"error",summary:"Error",detail:(null==t?void 0:t.msg)||"创建失败"})}),(function(e){niceFishToast({severity:"error",summary:"Error",detail:"创建失败"})})):niceFishToast({severity:"error",summary:"Error",detail:"存在不合法的输入项，请检查"})}},"保存"),r.createElement("button",{type:"button",className:"btn btn-default",onClick:function(){t(-1)}},"取消")))))}},49148:(e,t,a)=>{a.d(t,{Z:()=>d});var r=a(24065),n=a(96486),l=a(90600),m=l.Z.dataURL.userListURL,o=l.Z.dataURL.delUserURL,c=l.Z.dataURL.userDetailURL,s=l.Z.dataURL.signUpURL,i=l.Z.dataURL.updateUserURL,u=l.Z.dataURL.userMenuListURL;const d={getUserTable:function(e,t){var a=n.template(m)({page:e});return r.Z.post(a,{userName:t})},del:function(e){var t=n.template(o)({id:e});return r.Z.delete(t)},getUserDetails:function(e){var t=n.template(c)({id:e});return r.Z.get(t)},newUser:function(e){return r.Z.post(s,e)},updateUser:function(e){return r.Z.post(i,e)},getMenuByUser:function(e){var t=n.template(u)({id:e});return r.Z.get(t)}}},10926:(e,t,a)=>{e.exports=a.p+"3a03708e42481565259f.svg"}}]);