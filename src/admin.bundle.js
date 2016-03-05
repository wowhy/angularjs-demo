/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _commonCore = __webpack_require__(1);

	var _commonCore2 = _interopRequireDefault(_commonCore);

	var _adminConfigJs = __webpack_require__(2);

	var _adminConfigJs2 = _interopRequireDefault(_adminConfigJs);

	exports['default'] = angular.module('sample.admin', [_commonCore2['default'], _adminConfigJs2['default']]).run(["$rootScope", "settings", function ($rootScope, settings) {
	    $rootScope.settings = settings;
	}]).name;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports['default'] = angular.module('sample.core', [
	// angular modules
	'ng', 'ngLocale', 'ngTouch', 'ngAnimate', 'ngSanitize',

	// 3rd-party modules
	'ui.router', 'ui.bootstrap', 'blockUI']).config(['$locationProvider', function ($locationProvider) {
	    $locationProvider.html5Mode(true);
	}]).run(["$rootScope", "$state", function ($rootScope, $state) {
	    $rootScope.$state = $state;
	}]).name;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	routing.$inject = ["$stateProvider", "$urlRouterProvider"];
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _commonCore = __webpack_require__(1);

	var _commonCore2 = _interopRequireDefault(_commonCore);

	var _layout = __webpack_require__(3);

	var _layout2 = _interopRequireDefault(_layout);

	var settings = function settings() {
	    _classCallCheck(this, settings);
	};

	function routing($stateProvider, $urlRouterProvider) {
	    $urlRouterProvider.otherwise('/admin');

	    var index = {
	        name: 'index',
	        url: '/admin',
	        data: { title: '后台管理' },
	        template: '<div><h3>后台管理</h3></div>'
	    };

	    $stateProvider.state(index);
	}

	exports['default'] = angular.module('simple.admin.modules', [_commonCore2['default'], _layout2['default']]).constant('settings', new settings()).config(routing).name;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	var _ngtemplateRelativeToSrcAdminPrefixAdminViewsLayoutIndexHtml = __webpack_require__(4);

	var index = _interopRequireWildcard(_ngtemplateRelativeToSrcAdminPrefixAdminViewsLayoutIndexHtml);

	var _ngtemplateRelativeToSrcAdminPrefixAdminViewsLayoutHeaderHtml = __webpack_require__(5);

	var header = _interopRequireWildcard(_ngtemplateRelativeToSrcAdminPrefixAdminViewsLayoutHeaderHtml);

	var _ngtemplateRelativeToSrcAdminPrefixAdminViewsLayoutPageHeadHtml = __webpack_require__(6);

	var pageHead = _interopRequireWildcard(_ngtemplateRelativeToSrcAdminPrefixAdminViewsLayoutPageHeadHtml);

	var _ngtemplateRelativeToSrcAdminPrefixAdminViewsLayoutFooterHtml = __webpack_require__(7);

	var footer = _interopRequireWildcard(_ngtemplateRelativeToSrcAdminPrefixAdminViewsLayoutFooterHtml);

	var _ngtemplateRelativeToSrcAdminPrefixAdminViewsLayoutSidebarHtml = __webpack_require__(8);

	var sidebar = _interopRequireWildcard(_ngtemplateRelativeToSrcAdminPrefixAdminViewsLayoutSidebarHtml);

	__webpack_require__(9);

	exports['default'] = angular.module('sample.admin.layout', []).name;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports) {

	var path = 'admin/views/layout/index.html';
	var html = "<header class=\"main-header\" ng-include=\"'admin/views/layout/header.html'\"></header><main><aside class=\"main-sidebar\" ng-include=\"'admin/views/layout/sidebar.html'\"></aside><div class=\"content-wrapper\"><section class=\"content-header\" ng-include=\"'admin/views/layout/page-head.html'\"></section><section class=\"content\" ui-view></section></div></main><footer class=\"main-footer\" ng-include=\"'admin/views/layout/footer.html'\"></footer>";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 5 */
/***/ function(module, exports) {

	var path = 'admin/views/layout/header.html';
	var html = "<a href=\"/\" target=\"_self\" class=\"logo\"><span class=\"logo-mini\"><b><i class=\"glyphicon glyphicon-yen\"></i></b></span> <span class=\"logo-lg\"><b>DEMO</b></span></a><nav class=\"navbar navbar-static-top\" role=\"navigation\"><a href=\"javascript:void(0);\" class=\"sidebar-toggle\" data-toggle=\"offcanvas\" role=\"button\"><span class=\"sr-only\">Toggle navigation</span></a><div class=\"navbar-custom-menu\"><ul class=\"nav navbar-nav\"><li class=\"dropdown user user-menu\"><a href=\"javascript:void(0);\" class=\"dropdown-toggle\" data-toggle=\"dropdown\"><span>{用户名}</span> <span class=\"caret\"></span></a><ul class=\"dropdown-menu\"><li class=\"user-header\"><p>姓名 <small>账号</small></p></li><li class=\"user-footer\"><div class=\"pull-right\"><a class=\"btn btn-default btn-flat\"><i class=\"glyphicon glyphicon-log-out\"></i> 退出</a></div></li></ul></li></ul></div></nav>";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 6 */
/***/ function(module, exports) {

	var path = 'admin/views/layout/page-head.html';
	var html = "<h1>Page Title <small></small></h1><ol class=\"breadcrumb\"><li><i class=\"fa fa-home\"></i> <a href=\"/\" target=\"_self\">首页</a></li><li ng-if=\"$state.current.name != 'index'\"><a ui-sref=\"index\">后台管理</a></li><li><span>{{$state.current.data.title}}</span></li></ol>";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 7 */
/***/ function(module, exports) {

	var path = 'admin/views/layout/footer.html';
	var html = "<div class=\"pull-right hidden-xs\"></div><strong>Copyright &copy; 2016 <a href=\"#\">Howonder</a>.</strong> All rights reserved.";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 8 */
/***/ function(module, exports) {

	var path = 'admin/views/layout/sidebar.html';
	var html = "<section class=\"sidebar\"><ul class=\"sidebar-menu\"><li><a ui-sref=\"index\"><i class=\"fa fa-home\"></i> <span class=\"title\">后台管理</span></a></li><li class=\"treeview active\" ng-repeat=\"nav in vm.menus\"><a ng-href=\"{{nav.url ? '#' + nav.url: '' }}\"><i class=\"fa fa-{{nav.icon || 'folder'}}\"></i> <span ng-bind=\"nav.name\"></span> <i class=\"fa fa-angle-left pull-right\"></i></a><ul class=\"treeview-menu\"><li ng-repeat=\"menu in nav.menus\"><a ng-href=\"{{menu.url ? '#' + menu.url: '' }}\"><i class=\"fa fa-{{menu.icon || 'link'}}\"></i> <span ng-bind=\"menu.name\"></span></a></li></ul></li></ul></section>";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(10);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(12)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./layout.css", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./layout.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(11)();
	// imports


	// module
	exports.push([module.id, "div {\n}", ""]);

	// exports


/***/ },
/* 11 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ]);