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
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _commonCore = __webpack_require__(1);

	var _commonCore2 = _interopRequireDefault(_commonCore);

	var _appConfigJs = __webpack_require__(13);

	var _appConfigJs2 = _interopRequireDefault(_appConfigJs);

	angular.module('sample', [_commonCore2['default'], _appConfigJs2['default']]);

/***/ },

/***/ 1:
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

/***/ 13:
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

	var settings = function settings() {
	    _classCallCheck(this, settings);
	};

	function routing($stateProvider, $urlRouterProvider) {
	    $urlRouterProvider.otherwise('/');

	    var index = {
	        name: 'index',
	        url: '/',
	        data: { title: '前台' },
	        template: '<div><h3>前台</h3></div>'
	    };

	    $stateProvider.state(index);
	}

	exports['default'] = angular.module('simple.app.modules', [_commonCore2['default']]).constant('settings', new settings()).config(routing).name;
	module.exports = exports['default'];

/***/ }

/******/ });