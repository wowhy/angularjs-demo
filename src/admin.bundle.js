!function(e){function t(a){if(n[a])return n[a].exports;var i=n[a]={exports:{},id:a,loaded:!1};return e[a].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(1),r=a(i),o=n(2),s=a(o),l=n(3),u=a(l),c=n(4),d=a(c),f=n(14),p=a(f),v=angular.module("sample.admin",[r["default"],d["default"],p["default"]]).constant("settings",s["default"]).config(u["default"]).run(["$rootScope","settings",function(e,t){e.settings=t}]);t["default"]=v.name},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=angular.module("sample.core",["ng","ngLocale","ngTouch","ngAnimate","ngSanitize","ui.router","ui.bootstrap","blockUI"]).config(["$locationProvider",function(e){}]).run(["$rootScope","$state",function(e,t){e.$state=t}]).name},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var a=function i(){n(this,i)};t["default"]=new a},function(e,t){"use strict";function n(e,t){t.otherwise("/admin");var n={name:"index",url:"/",data:{title:"后台管理"},template:"<div><h3>后台管理</h3></div>"};e.state(n)}Object.defineProperty(t,"__esModule",{value:!0}),n.$inject=["$stateProvider","$urlRouterProvider"],t["default"]=n},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),n(5),n(6),n(7),n(8),n(9),n(10),t["default"]=angular.module("sample.admin.layout",[]).name},function(e,t){var n="admin/views/layout/index.html",a='<header class="main-header" ng-include="\'admin/views/layout/header.html\'"></header><main><aside class="main-sidebar" ng-include="\'admin/views/layout/sidebar.html\'"></aside><div class="content-wrapper"><section class="content-header" ng-include="\'admin/views/layout/page-head.html\'"></section><section class="content" ui-view></section></div></main><footer class="main-footer" ng-include="\'admin/views/layout/footer.html\'"></footer>';window.angular.module("ng").run(["$templateCache",function(e){e.put(n,a)}]),e.exports=n},function(e,t){var n="admin/views/layout/header.html",a='<a href="/" target="_self" class="logo"><span class="logo-mini"><b>DEMO</b></span> <span class="logo-lg"><b>测试站点</b></span></a><nav class="navbar navbar-static-top" role="navigation"><a href="javascript:void(0);" class="sidebar-toggle" data-toggle="offcanvas" role="button"><span class="sr-only">Toggle navigation</span></a><div class="navbar-custom-menu"><ul class="nav navbar-nav"><li class="dropdown user user-menu"><a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown"><span>{用户名}</span> <span class="caret"></span></a><ul class="dropdown-menu"><li class="user-header"><p>姓名 <small>账号</small></p></li><li class="user-footer"><div class="pull-right"><a class="btn btn-default btn-flat"><i class="glyphicon glyphicon-log-out"></i> 退出</a></div></li></ul></li></ul></div></nav>';window.angular.module("ng").run(["$templateCache",function(e){e.put(n,a)}]),e.exports=n},function(e,t){var n="admin/views/layout/page-head.html",a='<h1>Page Title <small></small></h1><ol class="breadcrumb"><li><i class="fa fa-home"></i> <a href="/" target="_self">首页</a></li><li ng-if="$state.current.name != \'index\'"><a ui-sref="index">后台管理</a></li><li><span>{{$state.current.data.title}}</span></li></ol>';window.angular.module("ng").run(["$templateCache",function(e){e.put(n,a)}]),e.exports=n},function(e,t){var n="admin/views/layout/footer.html",a='<div class="pull-right hidden-xs"></div><strong>Copyright &copy; 2016 <a href="#">Howonder</a>.</strong> All rights reserved.';window.angular.module("ng").run(["$templateCache",function(e){e.put(n,a)}]),e.exports=n},function(e,t){var n="admin/views/layout/sidebar.html",a='<section class="sidebar"><ul class="sidebar-menu"><li><a ui-sref="index"><i class="fa fa-home"></i> <span class="title">后台管理</span></a></li><li class="treeview active" ng-repeat="nav in vm.menus"><a ng-href="{{nav.url ? \'#\' + nav.url: \'\' }}"><i class="fa fa-{{nav.icon || \'folder\'}}"></i> <span ng-bind="nav.name"></span> <i class="fa fa-angle-left pull-right"></i></a><ul class="treeview-menu"><li ng-repeat="menu in nav.menus"><a ng-href="{{menu.url ? \'#\' + menu.url: \'\' }}"><i class="fa fa-{{menu.icon || \'link\'}}"></i> <span ng-bind="menu.name"></span></a></li></ul></li></ul></section>';window.angular.module("ng").run(["$templateCache",function(e){e.put(n,a)}]),e.exports=n},function(e,t,n){var a=n(11);"string"==typeof a&&(a=[[e.id,a,""]]);n(13)(a,{});a.locals&&(e.exports=a.locals)},function(e,t,n){t=e.exports=n(12)(),t.push([e.id,"div{background:red}",""])},function(e,t){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var n=this[t];n[2]?e.push("@media "+n[2]+"{"+n[1]+"}"):e.push(n[1])}return e.join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var a={},i=0;i<this.length;i++){var r=this[i][0];"number"==typeof r&&(a[r]=!0)}for(i=0;i<t.length;i++){var o=t[i];"number"==typeof o[0]&&a[o[0]]||(n&&!o[2]?o[2]=n:n&&(o[2]="("+o[2]+") and ("+n+")"),e.push(o))}},e}},function(e,t,n){function a(e,t){for(var n=0;n<e.length;n++){var a=e[n],i=p[a.id];if(i){i.refs++;for(var r=0;r<i.parts.length;r++)i.parts[r](a.parts[r]);for(;r<a.parts.length;r++)i.parts.push(u(a.parts[r],t))}else{for(var o=[],r=0;r<a.parts.length;r++)o.push(u(a.parts[r],t));p[a.id]={id:a.id,refs:1,parts:o}}}}function i(e){for(var t=[],n={},a=0;a<e.length;a++){var i=e[a],r=i[0],o=i[1],s=i[2],l=i[3],u={css:o,media:s,sourceMap:l};n[r]?n[r].parts.push(u):t.push(n[r]={id:r,parts:[u]})}return t}function r(e,t){var n=h(),a=y[y.length-1];if("top"===e.insertAt)a?a.nextSibling?n.insertBefore(t,a.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),y.push(t);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(t)}}function o(e){e.parentNode.removeChild(e);var t=y.indexOf(e);t>=0&&y.splice(t,1)}function s(e){var t=document.createElement("style");return t.type="text/css",r(e,t),t}function l(e){var t=document.createElement("link");return t.rel="stylesheet",r(e,t),t}function u(e,t){var n,a,i;if(t.singleton){var r=b++;n=g||(g=s(t)),a=c.bind(null,n,r,!1),i=c.bind(null,n,r,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=l(t),a=f.bind(null,n),i=function(){o(n),n.href&&URL.revokeObjectURL(n.href)}):(n=s(t),a=d.bind(null,n),i=function(){o(n)});return a(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;a(e=t)}else i()}}function c(e,t,n,a){var i=n?"":a.css;if(e.styleSheet)e.styleSheet.cssText=w(t,i);else{var r=document.createTextNode(i),o=e.childNodes;o[t]&&e.removeChild(o[t]),o.length?e.insertBefore(r,o[t]):e.appendChild(r)}}function d(e,t){var n=t.css,a=t.media;t.sourceMap;if(a&&e.setAttribute("media",a),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}function f(e,t){var n=t.css,a=(t.media,t.sourceMap);a&&(n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */");var i=new Blob([n],{type:"text/css"}),r=e.href;e.href=URL.createObjectURL(i),r&&URL.revokeObjectURL(r)}var p={},v=function(e){var t;return function(){return"undefined"==typeof t&&(t=e.apply(this,arguments)),t}},m=v(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),h=v(function(){return document.head||document.getElementsByTagName("head")[0]}),g=null,b=0,y=[];e.exports=function(e,t){t=t||{},"undefined"==typeof t.singleton&&(t.singleton=m()),"undefined"==typeof t.insertAt&&(t.insertAt="bottom");var n=i(e);return a(n,t),function(e){for(var r=[],o=0;o<n.length;o++){var s=n[o],l=p[s.id];l.refs--,r.push(l)}if(e){var u=i(e);a(u,t)}for(var o=0;o<r.length;o++){var l=r[o];if(0===l.refs){for(var c=0;c<l.parts.length;c++)l.parts[c]();delete p[l.id]}}}};var w=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}()},function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(15),r=a(i);t["default"]=angular.module("sample.admin.authorization",["sample.core"]).config(r["default"]).name},function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function i(e){var t={name:"login",url:"/login",data:{title:"登录"},template:"<div><h3>{{vm.message}}</h3></div>",controller:o["default"],controllerAs:"vm"};e.state(t)}Object.defineProperty(t,"__esModule",{value:!0});var r=n(16),o=a(r);i.$inject=["$stateProvider"],t["default"]=i},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var a=function i(e){n(this,i),this.$scope=e,this.message="Hello, World!"};a.$inject=["$scope"],t["default"]=a}]);