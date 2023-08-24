/*! For license information please see user-home.36cc965e36057a77ab5e.js.LICENSE.txt */
"use strict";(self.webpackChunknicefish_react=self.webpackChunknicefish_react||[]).push([[884],{39734:(e,t,n)=>{n.r(t),n.d(t,{default:()=>k});var r=n(67294),a=n(40827),l=n(66367),o=n(13308),i=n(73425),c=n(25508),u=n(49925),s=n(69868),f=n(13643),d=n(23652);function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function b(e,t){if(e){if("string"==typeof e)return p(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?p(e,t):void 0}}function m(e){return m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},m(e)}function v(e,t,n){return(t=function(e){var t=function(e,t){if("object"!==m(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!==m(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"===m(t)?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function y(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,l,o,i=[],c=!0,u=!1;try{if(l=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;c=!1}else for(;!(c=(r=l.call(n)).done)&&(i.push(r.value),i.length!==t);c=!0);}catch(e){u=!0,a=e}finally{try{if(!c&&null!=n.return&&(o=n.return(),Object(o)!==o))return}finally{if(u)throw a}}return i}}(e,t)||b(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var h=d.V.extend({defaultProps:{__TYPE:"TabView",id:null,activeIndex:0,className:null,onBeforeTabChange:null,onBeforeTabClose:null,onTabChange:null,onTabClose:null,panelContainerClassName:null,panelContainerStyle:null,renderActiveOnly:!0,scrollable:!1,style:null,children:void 0}}),g=d.V.extend({defaultProps:{__TYPE:"TabPanel",className:null,closable:!1,contentClassName:null,contentStyle:null,disabled:!1,header:null,headerClassName:null,headerStyle:null,headerTemplate:null,leftIcon:null,rightIcon:null,prevButton:null,nextButton:null,closeIcon:null,style:null,children:void 0},getCProp:function(e,t){return f.gb.getComponentProp(e,t,g.defaultProps)},getCProps:function(e){return f.gb.getComponentProps(e,g.defaultProps)},getCOtherProps:function(e){return f.gb.getComponentDiffProps(e,g.defaultProps)}});function C(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function w(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?C(Object(n),!0).forEach((function(t){v(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):C(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var E=function(){},S=r.forwardRef((function(e,t){var n=r.useContext(l.Ou),a=h.getProps(e,n),d=y(r.useState(a.id),2),m=d[0],v=d[1],C=y(r.useState(!0),2),E=C[0],S=C[1],O=y(r.useState(!1),2),N=O[0],P=O[1],x=y(r.useState([]),2),I=x[0],T=x[1],j=y(r.useState(a.activeIndex),2),A=j[0],k=j[1],_=r.useRef(null),L=r.useRef(null),B=r.useRef(null),D=r.useRef(null),G=r.useRef(null),R=r.useRef(null),Z=r.useRef({}),X=a.onTabChange?a.activeIndex:A,V={props:a,state:{id:m,isPrevButtonDisabled:E,isNextButtonDisabled:N,hiddenTabsState:I,activeIndex:A}},W=h.setMetaData(w({},V)),J=W.ptm,K=W.ptmo,z=function(e,t){return K($(e,"pt"),t,{props:e.props,parent:V})},M=function(e){return e===X},$=function(e,t){return g.getCProp(e,t)},H=function(e,t){return e&&f.gb.isValidChild(e,"TabPanel")&&I.every((function(e){return e!==t}))},U=function(e,t){var n;e.preventDefault(),a.onBeforeTabClose&&!1===a.onBeforeTabClose({originalEvent:e,index:t})||(T([].concat(function(e){if(Array.isArray(e))return p(e)}(n=I)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(n)||b(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),[t])),a.onTabClose&&a.onTabClose({originalEvent:e,index:t}))},Y=function(e,t,n){if(e&&e.preventDefault(),!$(t,"disabled")){if(a.onBeforeTabChange&&!1===a.onBeforeTabChange({originalEvent:e,index:n}))return;a.onTabChange?a.onTabChange({originalEvent:e,index:n}):k(n)}F(n)},q=function(e,t,n){"Enter"===e.key&&Y(e,t,n)},F=function(e){var t=Z.current["tab_".concat(e)];t&&t.scrollIntoView&&t.scrollIntoView({block:"nearest"})},Q=function(){return[G.current,R.current].reduce((function(e,t){return t?e+f.p7.getWidth(t):e}),0)},ee=function(){S(!0),P(!1),T([]),a.onTabChange?a.onTabChange({index:X}):k(a.activeIndex)};r.useEffect((function(){var e;e=Z.current["tab_".concat(X)],D.current.style.width=f.p7.getWidth(e)+"px",D.current.style.left=f.p7.getOffset(e).left-f.p7.getOffset(B.current).left+"px"})),(0,o.nw)((function(){m||v((0,f.Th)())})),(0,o.rf)((function(){if(f.gb.isNotEmpty(I)){var e=(t=I[I.length-1],(n=r.Children.map(a.children,(function(e,t){if(H(e,t))return{tab:e,index:t}}))).find((function(e){var n=e.tab,r=e.index;return!$(n,"disabled")&&r>=t}))||n.reverse().find((function(e){var n=e.tab,r=e.index;return!$(n,"disabled")&&t>r})));e&&Y(null,e.tab,e.index)}var t,n}),[I]),(0,o.rf)((function(){a.activeIndex!==A&&F(a.activeIndex)}),[a.activeIndex]),r.useImperativeHandle(t,(function(){return{props:a,reset:ee,getElement:function(){return _.current}}}));var te,ne,re,ae,le,oe,ie,ce,ue=(0,f.AK)("p-tabview p-component",{"p-tabview-scrollable":a.scrollable},a.className),se=(0,f.dG)({id:m,ref:_,style:a.style,className:ue},h.getOtherProps(a),J("root")),fe=(0,f.dG)({className:"p-tabview-nav-container"},J("navcontainer")),de=(te=r.Children.map(a.children,(function(e,t){if(H(e,t))return function(e,t){var n=M(t),l=g.getCProps(e),o=l.headerStyle,i=l.headerClassName,c=l.style,d=l.className,p=l.disabled,b=l.leftIcon,v=l.rightIcon,y=l.header,h=l.headerTemplate,C=l.closable,E=l.closeIcon,S=w(w({},o||{}),c||{}),O=(0,f.AK)("p-unselectable-text",{"p-tabview-selected p-highlight":n,"p-disabled":p},i,d),N=m+"_header_"+t,P=m+"_content_"+t,x=p?null:0,I=b&&f.Cz.getJSXIcon(b,void 0,{props:a}),T=(0,f.dG)({className:"p-tabview-title"},z(e,"headertitle")),j=r.createElement("span",T,y),A=v&&f.Cz.getJSXIcon(v,void 0,{props:a}),k="p-tabview-close",_=E||r.createElement(u.q,{className:k,onClick:function(e){return U(e,t)}}),L=C?f.Cz.getJSXIcon(_,{className:k,onClick:function(e){return U(e,t)}},{props:a}):null,B=(0,f.dG)({id:N,role:"tab",className:"p-tabview-nav-link",tabIndex:x,"aria-controls":P,"aria-selected":n,onClick:function(n){return Y(n,e,t)},onKeyDown:function(n){return q(n,e,t)}},z(e,"headeraction")),D=r.createElement("a",B,I,j,A,L,r.createElement(s.H,null));if(h){var G={className:"p-tabview-nav-link",titleClassName:"p-tabview-title",onClick:function(n){return Y(n,e,t)},onKeyDown:function(n){return q(n,e,t)},leftIconElement:I,titleElement:j,rightIconElement:A,element:D,props:a,index:t,selected:n,ariaControls:P};D=f.gb.getJSXElement(h,G)}var R=(0,f.dG)({ref:function(e){return Z.current["tab_".concat(t)]=e},className:O,style:S,role:"presentation"},z(e,"root"),z(e,"header"));return r.createElement("li",R,D)}(e,t)})),ne=(0,f.dG)({id:m,ref:L,className:"p-tabview-nav-content",style:a.style,onScroll:function(e){var t,n,r,l;a.scrollable&&(n=(t=L.current).scrollLeft,r=t.scrollWidth,l=f.p7.getWidth(L.current),S(0===n),P(n===r-l)),e.preventDefault()}},J("navcontent")),re=(0,f.dG)({ref:B,className:"p-tabview-nav",role:"tablist"},J("nav")),ae=(0,f.dG)({ref:D,className:"p-tabview-ink-bar"},J("inkbar")),r.createElement("div",ne,r.createElement("ul",re,te,r.createElement("li",ae)))),pe=function(){var e=(0,f.AK)("p-tabview-panels",a.panelContainerClassName),t=(0,f.dG)({className:e,style:a.panelContainerStyle},J("panelcontainer")),n=r.Children.map(a.children,(function(e,t){if(H(e,t)&&(!a.renderActiveOnly||M(t))){var n=M(t),l=w(w({},$(e,"contentStyle")||{}),$(e,"style")||{}),o=(0,f.AK)($(e,"contentClassName"),$(e,"className"),"p-tabview-panel",{"p-hidden":!n}),i=m+"_content_"+t,c=m+"_header_"+t,u=(0,f.dG)({id:i,className:o,style:l,role:"tabpanel","aria-labelledby":c,"aria-hidden":!n},g.getCOtherProps(e),z(e,"root"),z(e,"content"));return r.createElement("div",u,a.renderActiveOnly?n&&$(e,"children"):$(e,"children"))}}));return r.createElement("div",t,n)}(),be=(le=(0,f.dG)(J("previcon")),oe=a.prevButton||r.createElement(i.w,le),ie=f.Cz.getJSXIcon(oe,w({},le),{props:a}),ce=(0,f.dG)({ref:G,type:"button",className:"p-tabview-nav-prev p-tabview-nav-btn p-link","aria-label":(0,l.$2)("previousPageLabel"),onClick:function(e){return t=f.p7.getWidth(L.current)-Q(),n=L.current.scrollLeft-t,void(L.current.scrollLeft=n<=0?0:n);var t,n}},J("prevbutton")),a.scrollable&&!E?r.createElement("button",ce,ie,r.createElement(s.H,null)):null),me=function(){var e=(0,f.dG)({"aria-hidden":"true"},J("nexticon")),t=a.nextButton||r.createElement(c.X,e),n=f.Cz.getJSXIcon(t,w({},e),{props:a}),o=(0,f.dG)({ref:R,type:"button",className:"p-tabview-nav-next p-tabview-nav-btn p-link","aria-label":(0,l.$2)("nextPageLabel"),onClick:function(e){return t=f.p7.getWidth(L.current)-Q(),n=L.current.scrollLeft+t,r=L.current.scrollWidth-t,void(L.current.scrollLeft=n>=r?r:n);var t,n,r}},J("nextbutton"));if(a.scrollable&&!N)return r.createElement("button",o,n,r.createElement(s.H,null))}();return r.createElement("div",se,r.createElement("div",fe,be,de,me),pe)}));E.displayName="TabPanel",S.displayName="TabView";var O=n(89250),N=n(49148),P=n(33448),x=n(3599),I=n(30113),T=n(28225);function j(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,l,o,i=[],c=!0,u=!1;try{if(l=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;c=!1}else for(;!(c=(r=l.call(n)).done)&&(i.push(r.value),i.length!==t);c=!0);}catch(e){u=!0,a=e}finally{try{if(!c&&null!=n.return&&(o=n.return(),Object(o)!==o))return}finally{if(u)throw a}}return i}}(e,t)||function(e,t){if(e){if("string"==typeof e)return A(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?A(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function A(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}const k=function(e){var t=(0,T.$G)().i18n,n=(0,O.UO)().userId,l=((0,O.s0)(),j((0,r.useState)([]),2)),o=l[0],i=l[1],c=j((0,r.useState)([]),2),u=c[0],s=c[1],f=j((0,r.useState)(0),2),d=(f[0],f[1],j((0,r.useState)(10),2)),p=(d[0],d[1],j((0,r.useState)(1),2)),b=p[0],m=(p[1],j((0,r.useState)(0),2)),v=(m[0],m[1]);(0,r.useEffect)((function(){P.Z.getPostTable(n,b).then((function(e){var t,n=e.data;v(n.totalElements),n=(null===(t=n)||void 0===t?void 0:t.content)||[],i(n)})),N.Z.getUserRelatedPostList({userId:n,relationType:2}).then((function(e){var t=e.data||[];s(t)}))}),[n]);var y={default:6,1396:4,1024:3,768:2,500:1};return r.createElement("div",{className:"user-home-container"},r.createElement(I.Z,{userId:n}),r.createElement("div",{className:"tab-content"},r.createElement(S,{onBeforeTabChange:function(e){return 2!==e.index}},r.createElement(E,{header:t.t("posts")},r.createElement("div",{className:"post-list-container"},r.createElement(a.Z,{breakpointCols:y,className:"my-masonry-grid",columnClassName:"my-masonry-grid_column"},o.map((function(e,t){return r.createElement(x.Z,{postDetail:e,key:t})}))))),r.createElement(E,{header:t.t("saved")},r.createElement("div",{className:"post-list-container"},r.createElement(a.Z,{breakpointCols:y,className:"my-masonry-grid",columnClassName:"my-masonry-grid_column"},u.map((function(e,t){return r.createElement(x.Z,{postDetail:e,key:t})}))))),r.createElement(E,{headerTemplate:function(){return r.createElement("div",null,r.createElement("input",{type:"text",className:"search-box",placeholder:"".concat(t.t("searchYourPosts"),"...")}))},style:{marginLeft:"auto"}}))))}},73425:(e,t,n)=>{n.d(t,{w:()=>o});var r=n(67294),a=n(4320);function l(){return l=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},l.apply(this,arguments)}var o=r.memo(r.forwardRef((function(e,t){var n=a.A.getPTI(e);return r.createElement("svg",l({ref:t,width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg"},n),r.createElement("path",{d:"M9.61296 13C9.50997 13.0005 9.40792 12.9804 9.3128 12.9409C9.21767 12.9014 9.13139 12.8433 9.05902 12.7701L3.83313 7.54416C3.68634 7.39718 3.60388 7.19795 3.60388 6.99022C3.60388 6.78249 3.68634 6.58325 3.83313 6.43628L9.05902 1.21039C9.20762 1.07192 9.40416 0.996539 9.60724 1.00012C9.81032 1.00371 10.0041 1.08597 10.1477 1.22959C10.2913 1.37322 10.3736 1.56698 10.3772 1.77005C10.3808 1.97313 10.3054 2.16968 10.1669 2.31827L5.49496 6.99022L10.1669 11.6622C10.3137 11.8091 10.3962 12.0084 10.3962 12.2161C10.3962 12.4238 10.3137 12.6231 10.1669 12.7701C10.0945 12.8433 10.0083 12.9014 9.91313 12.9409C9.81801 12.9804 9.71596 13.0005 9.61296 13Z",fill:"currentColor"}))})));o.displayName="ChevronLeftIcon"},25508:(e,t,n)=>{n.d(t,{X:()=>o});var r=n(67294),a=n(4320);function l(){return l=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},l.apply(this,arguments)}var o=r.memo(r.forwardRef((function(e,t){var n=a.A.getPTI(e);return r.createElement("svg",l({ref:t,width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg"},n),r.createElement("path",{d:"M4.38708 13C4.28408 13.0005 4.18203 12.9804 4.08691 12.9409C3.99178 12.9014 3.9055 12.8433 3.83313 12.7701C3.68634 12.6231 3.60388 12.4238 3.60388 12.2161C3.60388 12.0084 3.68634 11.8091 3.83313 11.6622L8.50507 6.99022L3.83313 2.31827C3.69467 2.16968 3.61928 1.97313 3.62287 1.77005C3.62645 1.56698 3.70872 1.37322 3.85234 1.22959C3.99596 1.08597 4.18972 1.00371 4.3928 1.00012C4.59588 0.996539 4.79242 1.07192 4.94102 1.21039L10.1669 6.43628C10.3137 6.58325 10.3962 6.78249 10.3962 6.99022C10.3962 7.19795 10.3137 7.39718 10.1669 7.54416L4.94102 12.7701C4.86865 12.8433 4.78237 12.9014 4.68724 12.9409C4.59212 12.9804 4.49007 13.0005 4.38708 13Z",fill:"currentColor"}))})));o.displayName="ChevronRightIcon"}}]);