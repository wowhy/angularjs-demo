(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by hongyuan on 2015/11/9.
 */
// window.$ = window.jQuery = require('../libs/jquery/dist/jquery');
//require('../libs/angular');
//require('../libs/angular-ui-router/release/angular-ui-router');
//require('../libs/angular-bootstrap/ui-bootstrap-tpls');
//require('../libs/angular-ui-grid/ui-grid');

angular.module('example.utility', ['ui.router', 'ui.bootstrap']);
angular.module('example.service', ['example.utility']);
angular.module('example', [
    'example.service',
    'example.utility',
    'ui.router',
    'ui.bootstrap'
]);

require('./components/utilities/setting');
require('./modules/home/homeController');
require('./modules/home/dashboardController');
require('./modules/home/aboutController');



function run($rootScope, $state, setting){
    $rootScope.$state = $state;
    $rootScope.setting = setting;
}

function route($stateProvider, $urlRouterProvider){
    var home = {
        templateUrl: 'app/modules/home/index.html',
        controller: 'homeController'
    }

    $urlRouterProvider
        .when('', '/dashboard')
        .otherwise('/404');

    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'app/modules/login/index.html'
        })
        .state('404', {
            url: '/404',
            templateUrl: 'app/templates/404.html'
        })
        .state('dashboard', {
            url: '/dashboard',
            views: {
                '': home,
                'page': {
                    templateUrl: 'app/modules/home/dashboard.html',
                    controller: 'dashboardController'
                }
            }
        })
        .state('about', {
            url: '/about',
            templateUrl: 'app/modules/home/about.html',
            controller: 'aboutController'
        })
    ;
}

angular.module('example')
    .config(['$stateProvider', '$urlRouterProvider', route])
    .run(['$rootScope', '$state', 'setting', run]);
},{"./components/utilities/setting":4,"./modules/home/aboutController":5,"./modules/home/dashboardController":6,"./modules/home/homeController":7}],2:[function(require,module,exports){
function menuService($http, $q){
	this.authorizationMenus = function() {
		var menus = [
			//{ name: '仪表板', url: '/dashboard' },
			{ name: '权限管理系统', menus: [{name: '用户管理', url: '/rms/user'}] }
		];
		
		var defer = $q.defer();
		
		setTimeout(function(){
			defer.resolve(menus);
		}, 200);
		
		return defer.promise;
	}
}

angular.module('example.service')
	   .service('menuService', ['$http', '$q', menuService]);
},{}],3:[function(require,module,exports){
function msgFactory($uibModal, setting){
    var msg = {};
    
    msg.confirm = function (model) {
        if (!model.ok) {
            model.ok = '确定';
        }
        if (!model.cancel) {
            model.cancel = '取消';
        }

        return $uibModal.open({
            templateUrl: 'app/templates/confirm.html',
            backdrop: 'static',
            controller: ['$scope', '$uibModalInstance', 'args', function ($scope, $uibModalInstance, args) {
                $scope.ok = function () {
                    $uibModalInstance.close(true);
                }

                $scope.cancel = function () {
                    $uibModalInstance.close(false);
                }

                $scope.model = args;
            }],
            resolve: {
                args: function () {
                    return model;
                }
            }
        }).result;
    };
    
    msg.notify = function(content, options){
        alert(content);
    }
    
    return msg;
}

angular.module('example.utility')
       .factory('msg', ['$uibModal', msgFactory]);
},{}],4:[function(require,module,exports){
function settingFactory(){
	var setting = {
		applicationName: '培训管理系统'
	};
	return setting;
}

angular.module('example.utility')
	   .factory('setting', [settingFactory]);
},{}],5:[function(require,module,exports){
function aboutController($scope){
	console.log('about');
}

angular.module('example')
	   .controller('aboutController', ['$scope', aboutController]);
},{}],6:[function(require,module,exports){
require('../../components/utilities/msg');

function dashboardController($scope, msg){
    msg.confirm({text: 'Hello, Dashboard!'});
}

angular.module('example')
	   .controller('dashboardController', ['$scope', 'msg', dashboardController]);
},{"../../components/utilities/msg":3}],7:[function(require,module,exports){
/**
 * Created by hongyuan on 2015/11/13.
 */
require('../../components/utilities/msg');
require('../../components/services/menu');

function homeController($scope, menuService){
    $scope.menus = [];

    menuService.authorizationMenus()
        .then(function(menus){
            $scope.menus = menus;
        });
}

angular.module('example')
    .controller('homeController', ['$scope', 'menuService', homeController])
},{"../../components/services/menu":2,"../../components/utilities/msg":3}]},{},[1]);
