/*! Copyright By yanyunchangfeng */
(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{1279:function(e,t,n){"use strict";n.r(t),n.d(t,"CommentTable",function(){return m});var a=n(1),r=n(558),o=n(1279);function m(){var e=Object(a.useState)({}),t=e[0],n=e[1],o=Object(a.useState)({}),m=o[0],c=o[1],i=[{title:"序号",dataIndex:"key",filteredValue:t.key||null,filters:[{text:"1",value:"1"},{text:"2",value:"2"}],onFilter:function(e,t){return t.key.includes(e)},sorter:function(e,t){return e.key-t.key},sortOrder:"key"===m.columnKey&&m.order},{title:"内容",dataIndex:"content",sorter:function(e,t){return e.content.length-t.content.length},sortOrder:"content"===m.columnKey&&m.order},{title:"用户",dataIndex:"userName",sorter:function(e,t){return e.userName.localeCompare(t.userName)},sortOrder:"userName"===m.columnKey&&m.order},{title:"日期",dataIndex:"time",width:182,fixed:"right",sorter:function(e,t){return new Date(e.time).getTime()-new Date(t.time).getTime()},sortOrder:"time"===m.columnKey&&m.order}],u=Object(a.useState)([{key:"1",content:"这是一条不合法的评论",userName:"damoqiongqiu",time:"2017-07-15 16:22:58"},{key:"2",content:"这是一条合法的评论",userName:"yanyuncahngfeng",time:"2016-07-15 16:22:58"},{key:"3",content:"这是一条不合法的评论",userName:"damoqiongqiu",time:"2015-07-15 16:22:58"},{key:"4",content:"这是一条合法的评论",userName:"yanyuncahngfeng",time:"2014-07-15 16:22:58"},{key:"5",content:"这是一条不合法的评论",userName:"damoqiongqiu",time:"2013-07-15 16:22:58"},{key:"6",content:"这是一条合法的评论",userName:"yanyuncahngfeng",time:"2012-07-15 16:22:58"},{key:"7",content:"这是一条不合法的评论",userName:"damoqiongqiu",time:"2011-07-15 16:22:58"},{key:"8",content:"这是一条合法的评论",userName:"yanyuncahngfeng",time:"2010-07-15 16:22:58"},{key:"9",content:"这是一条不合法的评论",userName:"damoqiongqiu",time:"2009-07-15 16:22:58"},{key:"10",content:"这是一条合法的评论",userName:"yanyuncahngfeng",time:"2008-07-15 16:22:58"},{key:"11",content:"这是一条合法的评论",userName:"damoqiongqiu",time:"2007-07-15 16:22:58"},{key:"12",content:"这是一条不合法的评论",userName:"yanyuncahngfeng",time:"2006-07-15 16:22:58"},{key:"13",content:"这是一条合法的评论",userName:"damoqiongqiu",time:"2005-07-15 16:22:58"},{key:"14",content:"这是一条不合法的评论",userName:"yanyuncahngfeng",time:"2004-07-15 16:22:58"}])[0];return a.createElement("div",{className:"comment-table-container"},a.createElement("form",{className:"form-vertical",role:"form"},a.createElement("div",{className:"row"},a.createElement("div",{className:"col-md-12"},a.createElement("div",{className:"input-group"},a.createElement("input",{className:"form-control",type:"text",placeholder:"内容，用户名"}),a.createElement("span",{className:"input-group-btn"},a.createElement("button",{className:"btn btn-primary",type:"button"},a.createElement("i",{className:"fa fa-search"}))))))),a.createElement("div",{className:"row mt-16px"},a.createElement("div",{className:"col-md-12"},a.createElement("div",{className:"comment-item-container"},a.createElement(r.a,{dataSource:u,columns:i,scroll:{x:690},onChange:function(e,t,a){console.log(e,t,a),n(t),c(a)}})))))}n.d(t,"default",function(){return o.CommentTable})}}]);