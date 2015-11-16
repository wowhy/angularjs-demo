(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by hongyuan on 2015/11/9.
 */

require('./core');
require('./components/utilities/setting');
require('./modules/home/main');
require('./modules/account/main');
require('./modules/user/main');

function run($rootScope, $state, setting) {
    $rootScope.$state = $state;
    $rootScope.setting = setting;

    $rootScope.$on('$stateChangeStart',
        function (event, toState/*, toParams, fromState, fromParams*/) {
            if (toState.name.indexOf('home') != -1) {
                if (!setting.isAuthenticated) {
                    event.preventDefault();
                    setTimeout(function () {
                        $state.go('login', {}, {});
                    }, 0);
                }
            }
        });
}

angular.module('example')
    .run(['$rootScope', '$state', 'setting', run]);
},{"./components/utilities/setting":5,"./core":6,"./modules/account/main":8,"./modules/home/main":12,"./modules/user/main":13}],2:[function(require,module,exports){
function menuService($http, $q){
	this.authorizationMenus = function() {
		var menus = [
			//{ name: '仪表板', url: '/dashboard' },
			{ name: '权限管理系统', menus: [{name: '用户管理', url: '/user'}] }
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
function userService($http, $q) {
    var me = this;

    this.add = function (user) {
        var $post = {
            Code: user.Code,
            Name: user.Name,
            Email: user.Email,
            CreatedOn: new Date(),
            Status: 1
        };

        return $http({
            method: 'POST',
            url: 'http://hongyuan-win10:1234/DataService.svc/Users',
            data: $post
        }).then(function (data) {
            var result = {};
            if (data.status == 201) {
                result.success = true;
                result.message = "添加成功！";
            } else {
                result.success = false;
                result.message = data.data;
            }

            return result;
        });
    }

    this.edit = function (user) {
        var $patch = {
            Code: user.Code,
            Name: user.Name,
            Email: user.Email
        };

        return $http({
            method: 'PATCH',
            url: 'http://hongyuan-win10:1234/DataService.svc/Users(' + user.Id + ')',
            data: $patch
        }).then(function (data) {
            var result = {};
            if (data.status == 204 || data.status == 200) {
                result.success = true;
                result.message = "修改成功！";
            } else {
                result.success = false;
                result.message = data.data;
            }

            return result;
        });
    }

    this.removeById = function (id) {
        return $http({ method: 'DELETE', url: 'http://hongyuan-win10:1234/DataService.svc/Users(' + id + ')' }).then(function (data) {
            var result = {};
            if (data.status == 204 || data.status == 200) {
                result.success = true;
                result.message = "删除成功！";
            } else {
                result.success = false;
                result.message = data.data;
            }

            return result;
        });
    }

    this.getById = function (id) {
        return $http.get('http://hongyuan-win10:1234/DataService.svc/Users(' + id + ')').then(function (data) {
            return data.data;
        });
    }

    this.search = function (page, limit, filter) {
        // http://localhost:1234/DataService.svc/Users?$skip=20&$top=20
        var $filter = {};
        var $total = $http.get('http://hongyuan-win10:1234/DataService.svc/Users/$count'/*, { params: { $filter: $filter } }*/);
        var $data = $http.get('http://hongyuan-win10:1234/DataService.svc/Users', {
            params: {
                $skip: (page - 1) * limit,
                $top: limit /*,
                $filter: concatFilter(filter)*/
            }
        });

        return $q.all([$total, $data]).then(function (response) {
            return {
                total: parseInt(response[0].data),
                data: response[1].data.value
            };
        });
    }
}

angular.module('example.service')
	   .service('userService', ['$http', '$q', userService]);
},{}],4:[function(require,module,exports){
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
},{}],5:[function(require,module,exports){
function setCookie(name,value,hours){
    var d = new Date();
    d.setTime(d.getTime() + hours * 3600 * 1000);
    document.cookie = name + '=' + value + '; expires=' + d.toGMTString();
}
function getCookie(name){
    var arr = document.cookie.split('; ');
    for(var i = 0; i < arr.length; i++){
        var temp = arr[i].split('=');
        if(temp[0] == name){
            return temp[1];
        }
    }
    return '';
}
function removeCookie(name){
    var d = new Date();
    d.setTime(d.getTime() - 10000);
    document.cookie = name + '=1; expires=' + d.toGMTString();
}

function settingFactory() {
    var setting = {
        applicationName: '培训管理系统',

        setAuth: function (username) {
            this.isAuthenticated = true;
            this.username = username;

            setCookie('username', username, 1);
        }
    };

    var username = getCookie('username');
    if(username){
        setting.setAuth(username);
    }

    return setting;
}

angular.module('example.utility')
    .factory('setting', [settingFactory]);
},{}],6:[function(require,module,exports){
/**
 * Created by hongyuan on 2015/11/16.
 */

// window.$ = window.jQuery = require('../libs/jquery/dist/jquery');
// require('../libs/angular');
// require('../libs/angular-ui-router/release/angular-ui-router');
// require('../libs/angular-bootstrap/ui-bootstrap-tpls');
// require('../libs/angular-ui-grid/ui-grid');

angular.module('example.utility', ['ui.router', 'ui.bootstrap']);
angular.module('example.service', ['example.utility']);
angular.module('example', [
    'example.service',
    'example.utility',
    'ui.router',
    'ui.bootstrap',
    'ui.grid'
]);
},{}],7:[function(require,module,exports){
/**
 * Created by hongyuan on 2015/11/16.
 */
require('../../core');
require('../../components/utilities/setting');

function loginController($scope, $location, setting) {
    $scope.login = function () {
        setting.setAuth($scope.username);
        $location.path('/');
    }
}

angular.module('example')
    .controller('loginController', ['$scope', '$location', 'setting', loginController]);
},{"../../components/utilities/setting":5,"../../core":6}],8:[function(require,module,exports){
/**
 * Created by hongyuan on 2015/11/16.
 */

require('../../core');
require('./loginController');

function route($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'app/modules/account/login.html',
            data: {pageTitle: '登录', pageSubTitle: ''},
            controller: 'loginController'
        })
    ;
}

angular.module('example').config(['$stateProvider', '$urlRouterProvider', route]);
},{"../../core":6,"./loginController":7}],9:[function(require,module,exports){
require('../../core');

function aboutController($scope){
	console.log('about');
}

angular.module('example')
	   .controller('aboutController', ['$scope', aboutController]);
},{"../../core":6}],10:[function(require,module,exports){
require('../../core');
require('../../components/utilities/msg');

function dashboardController($scope, msg){
    msg.confirm({text: 'Hello, Dashboard!'});
}

angular.module('example')
	   .controller('dashboardController', ['$scope', 'msg', dashboardController]);
},{"../../components/utilities/msg":4,"../../core":6}],11:[function(require,module,exports){
/**
 * Created by hongyuan on 2015/11/13.
 */
require('../../core');
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
},{"../../components/services/menu":2,"../../components/utilities/msg":4,"../../core":6}],12:[function(require,module,exports){
/**
 * Created by hongyuan on 2015/11/16.
 */

// 引用依赖模块，配置路由

require('../../core');
require('./homeController');
require('./dashboardController');
require('./aboutController');

function route($stateProvider, $urlRouterProvider){
    $urlRouterProvider
        .when('', '/login')
        .when('/', '/dashboard');

    $stateProvider
        .state('404', {
            url: '/404',
            templateUrl: 'app/templates/404.html'
        })
        .state('about', {
            url: '/about',
            templateUrl: 'app/modules/home/about.html',
            controller: 'aboutController'
        })
        .state('home', {
            templateUrl: 'app/modules/home/index.html',
            controller: 'homeController'
        })
        .state('home.dashboard', {
            url: '/dashboard',
            views: {
                'page': {
                    templateUrl: 'app/modules/home/dashboard.html',
                    controller: 'dashboardController'
                }
            },
            data: { pageTitle: '仪表板', pageSubTitle: '统计&报表' }
        })
    ;
}

angular.module('example')
    .config(['$stateProvider', '$urlRouterProvider', route]);
},{"../../core":6,"./aboutController":9,"./dashboardController":10,"./homeController":11}],13:[function(require,module,exports){
/**
 * Created by hongyuan on 2015/11/16.
 */

require('../../core');
require('../home/homeController');
require('./userController');

function route($stateProvider) {
    $stateProvider
        .state('home.user', {
            url: '/user',
            data: {pageTitle: '用户管理', pageSubTitle: '列表'},
            views: {
                'page': {
                    templateUrl: 'app/modules/user/user-list.html',
                    controller: 'userController'
                }
            }
        })
    ;
}

angular.module('example').config(['$stateProvider', route]);
},{"../../core":6,"../home/homeController":11,"./userController":14}],14:[function(require,module,exports){
require('../../components/services/user');
require('../../components/utilities/msg');

function userController($scope, userService, msg) {
	$scope.list = [];
	
	$scope.gridOptions = {
		data: 'list',
		columnDefs: [
			{ field: 'Code', displayName: '用户代码', width: '20%' },
			{ field:'Name', displayName: '姓名', width: '*' },
			{ field:'Email', displayName: '邮箱', width: '30%' },
			{ field:'Status', displayName: '状态', width: 80, cellFilter: 'userStatus' }
		]
	};
	
	userService.search(1, 100, {})
			   .then(function(result){
				   $scope.list = result.data;
			   });
}

angular.module('example')
	   .filter('userStatus', [function() {
		   return function(value) {
			   switch(value){
				   case 1:
				   	   return '有效';
						   
				   default:
					   return '无效';
			   }
		   }
	   }])
	   .controller('userController', ['$scope', 'userService', 'msg', userController]);
},{"../../components/services/user":3,"../../components/utilities/msg":4}]},{},[1]);
