require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"app":[function(require,module,exports){
/**
 * Created by hongyuan on 2015/11/9.
 */

require('core');
require('utility/setting');

require('frontend/frontend.config');
require('auth/auth.config');
require('backend/backend.config');
require('dashboard/dashboard.config');
require('user/user.config');
require('dataSource/dataSource.config');
require('employee/employee.config');
require('house/house.config');

app.run(['$rootScope', '$state', 'auth', 'setting',run]);

function run($rootScope, $state, auth, setting) {
    $rootScope.$state = $state;
    $rootScope.setting = setting;
    $rootScope.auth = auth;
}
},{"auth/auth.config":"auth/auth.config","backend/backend.config":"backend/backend.config","core":"core","dashboard/dashboard.config":"dashboard/dashboard.config","dataSource/dataSource.config":"dataSource/dataSource.config","employee/employee.config":"employee/employee.config","frontend/frontend.config":"frontend/frontend.config","house/house.config":"house/house.config","user/user.config":"user/user.config","utility/setting":"utility/setting"}],"auth/auth.config":[function(require,module,exports){
require('auth/permission');
require('auth/session');
require('auth/securityInterceptor');
require('auth/auth');
require('auth/loginController');

app.config(['$stateProvider', route])
   .run(['$rootScope', '$state', '$location', 'auth', 'session', 'setting', loginInterceptor]);


function route($stateProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            data: {pageTitle: '登录', pageSubTitle: ''},
            controller: 'loginController'
        })
        .state('register', {
            url: '/register',
            templateUrl: 'modules/auth/register.html',
            data: {pageTitle: '注册', pageSubTitle: ''}
        })
    ;
}

function loginInterceptor($rootScope, $state, $location, auth, session, setting){
    $rootScope.$on('$stateChangeStart',
        function (event, toState/*, toParams, fromState, fromParams*/) {
            if(toState.name == 'frontend'||
               toState.name == 'register') {
                setting.layout.path = 'modules/frontend/index.html';
                return;
            }

            if(toState.name == 'login'){
                setting.layout.path = 'modules/frontend/index.html';
                session.clear();
            }else {
                if (!!toState.skipAuth) {
                    setting.layout.path = 'modules/frontend/index.html';
                    return;
                }

                setting.layout.path = 'modules/backend/layout/index.html';

                if (!auth.isLogin()) {
                    setTimeout(function () {
                        $state.go('login');
                    }, 0);
                    event.preventDefault();
                    return;
                }

                // check permission
                // todo
            }
        });

    $rootScope.$on('$stateChangeSuccess', function(){
        if($location.search().popup) {
            angular.element('body').addClass('popup');
        }
    });

    $rootScope.$watch(function(){
        return session.sessionId;
    }, function(){
        // todo
    });
}
},{"auth/auth":"auth/auth","auth/loginController":"auth/loginController","auth/permission":"auth/permission","auth/securityInterceptor":"auth/securityInterceptor","auth/session":"auth/session"}],"auth/auth":[function(require,module,exports){
require('auth/session');
require('service/user');

app.factory('auth', ['$q', '$state', 'session', 'userService', 'modal', authenticator]);

function authenticator($q, $state, session, userService, modal) {
    var auth = {
        getUserName: function () {
            return session.username;
        },
        login: loginUser,
        logout: logoutUser,
        isLogin: function () {
            return !!session.sessionId;
        },
        showLoginModal: function () {
            modal.show('modules/auth/login.html', [
                    '$scope', '$state', 'setting', function ($scope, $state, setting) {
                        $scope.login = function () {
                            auth.login($scope.username, $scope.password)
                                .then(function (result) {
                                    if (result.success) {
                                        setting.layout.path = 'modules/backend/layout/index.html';
                                        $state.go('dashboard', {});
                                    } else {
                                        alert(result.message);
                                    }
                                });
                        };
                    }
                ],
                'login'
            )
            ;
        }
    };
    return auth;

    function loginUser(username, password) {
        var defer = $q.defer();

        username === password;

        session.set({
            username: username
        });

        defer.resolve({
            success: true,
            message: '登录成功'
        });

        auth.username = username;

        return defer.promise;
    }

    function logoutUser() {
        $state.go('login');
    }
}
},{"auth/session":"auth/session","service/user":"service/user"}],"auth/loginController":[function(require,module,exports){
require('auth/auth');
require('utility/modal');

app.controller('loginController', [
    '$scope', 'auth', loginController
]);

function loginController($scope, auth) {
    auth.showLoginModal();
}


},{"auth/auth":"auth/auth","utility/modal":"utility/modal"}],"auth/permission":[function(require,module,exports){

},{}],"auth/securityInterceptor":[function(require,module,exports){
app.factory('securityInterceptor', ['$q', '$injector', securityInterceptor])
   .config(['$httpProvider', function ($httpProvider) {
       $httpProvider.interceptors.push('securityInterceptor');
   }]);


function securityInterceptor($q, $injector) {
    var responseInterceptor = {
        responseError: function (response) {
            if (response.status === 403 || response.status === 401) { //status
                var $stateService = $injector.get('$state'); //为了解决Circular dependency
                $stateService.go('login');
            }
            return $q.reject(response);
        }
    };

    return responseInterceptor;
}
},{}],"auth/session":[function(require,module,exports){
var session_key = 'user_session',
    session_timestamp_key = 'user_session_timestamp',
    expired_duration = 1000 * 60 * 120; // 2 hours

app.factory('session', ['hngLocalStorage', 'hngGuid', sessionFactory]);

function sessionFactory(store, guid) {
    var _session = {
        sessionId: null,
        username: '',
        navData: null,
        permissions: null,
        features: null,
        clear: onClear,
        set: onSet,
        updateTimestamp: updateTimestamp,
        isExpired: isExpired
    };
    initSession();
    return _session;

    function initSession() {
        if (store.enabled) {
            if (_session.isExpired()) {
                _clearStorage();
            } else {
                var storedSession = store.get(session_key);
                _session.updateTimestamp();
                _syncSession(storedSession || {});
            }
        }
    }

    function onClear() {
        _session.sessionId = null;
        _session.username = '';
        _session.navData = null;
        _session.permissions = null;

        _clearStorage();
    }

    function onSet(opts) {
        opts.sessionId = guid.newGuid();
        _syncSession(opts); //将opts的数据设置到session中并保存在localStorage

        store.set(session_key, opts);
        _session.updateTimestamp();

        console.log('[Update Session]');
        console.log(_session);
        return _session;
    }

    function isExpired() {
        function ft(num) {
            if (num > 1000 * 60 * 60) return (num / (1000 * 60 * 60)).toFixed(1) + ' hour';
            if (num > 1000 * 60) return (num / (1000 * 60)).toFixed(1) + ' minutes';
            if (num > 1000) return (Math.floor(num / 1000)) + 'secs';
            return num;
        }
        if (!store.enabled) return true;
        var lastSavedTimestamp = store.get(session_timestamp_key);
        if (!lastSavedTimestamp) { // has not save any data yet
            return true;
        } else {
            var now = Date.now(),
              diff = now - lastSavedTimestamp;
            //expired after two hour
            console.log("session update time diff(" + diff + "):" + ft(diff));
            return diff > expired_duration;
        }
    }

    function updateTimestamp() {
        if (store.enabled) {
            store.set(session_timestamp_key, Date.now());
        }
    }

    //helpers
    function _syncSession(opts) {
        _session.sessionId = opts.sessionId;
        _session.username = opts.username;
        _session.navData = opts.navData;
        _session.permissions = opts.permissions;
        _session.features = opts.features;
    }

    function _clearStorage() {
        store.remove(session_key);
        store.remove(session_timestamp_key);
    }
}
},{}],"backend/backend.config":[function(require,module,exports){
/**
 * Created by hongyuan on 2015/11/16.
 */

// 引用依赖模块，配置路由

require('utility/setting');
require('backend/backendController');
},{"backend/backendController":"backend/backendController","utility/setting":"utility/setting"}],"backend/backendController":[function(require,module,exports){
/**
 * Created by hongyuan on 2015/11/13.
 */
require('service/menu');
require('directive/spinnerBar');
require('directive/pageSidebar');

function headerController($scope, setting){
    $scope.toggleSidebar = function(){
        setting.layout.pageSidebarClosed = !setting.layout.pageSidebarClosed;
    };
}

function navbarController($scope, menuService) {
    $scope.menus = [];

    menuService.authorizationMenus()
        .then(function (menus) {
            $scope.menus = menus;
        });
}

app.controller('headerController', ['$scope', 'setting', headerController])
   .controller('navbarController', ['$scope', 'menuService', navbarController]);
},{"directive/pageSidebar":"directive/pageSidebar","directive/spinnerBar":"directive/spinnerBar","service/menu":"service/menu"}],"core":[function(require,module,exports){
/**
 * Created by hongyuan on 2015/11/16.
 */

// window.$ = window.jQuery = require('../libs/jquery/dist/jquery');
// require('../libs/angular');
// require('../libs/angular-ui-router/release/angular-ui-router');
// require('../libs/angular-bootstrap/ui-bootstrap-tpls');
// require('../libs/angular-ui-grid/ui-grid');

var utilities = angular.module('example.utility', ['hng', 'ngLocale', 'ngTouch', 'ngAnimate', 'ui.router', 'ui.bootstrap']);
var services = angular.module('example.service', ['hng', 'example.utility']);
var directives = angular.module('example.directive', ['hng', 'example.utility']);
var filters = angular.module('example.filters', ['hng', 'example.utility']);
var example = angular.module('example', [
    'example.directive',
    'example.service',
    'example.filters',
    'example.utility',
    'ngLocale',
    'ngTouch',
    'ngAnimate',
    'ui.router',
    'ui.bootstrap'
]);

var app = {};

app.controller = function(name, controller) {
    example.controller(name, controller);
    return app;
};

app.factory = app.utility = function(name, method){
    utilities.factory(name, method);
    return app;
};

app.service = function(name, method){
    services.service(name, method);
    return app;
};

app.directive = function(name, method){
    directives.directive(name, method);
    return app;
};

app.filter = function(name, method){
    filters.filter(name, method);
    return app;
};

app.config = function(method){
  example.config(method);
    return app;
};

app.run = function(method){
    example.run(method);
    return app;
};

window.app = app;
module.export = app;
},{}],"dashboard/dashboard.config":[function(require,module,exports){
require('dashboard/dashboardController');

app.config(['$stateProvider', route]);

function route($stateProvider) {
    $stateProvider
        .state('dashboard', {
            url: '/dashboard',
            data: {pageTitle: '仪表板', pageSubTitle: '统计&报表'},
            templateUrl: 'modules/dashboard/dashboard.html',
            controller: 'dashboardController'
        })
    ;
}
},{"dashboard/dashboardController":"dashboard/dashboardController"}],"dashboard/dashboardController":[function(require,module,exports){
function dashboardController($scope) {
    $scope.message = "Hello, World!";
}

app.controller('dashboardController', ['$scope', dashboardController]);
},{}],"dataSource/dataSource.config":[function(require,module,exports){
require('dataSource/dataSourceController');
require('dataSource/dataSourceEditController');
require('dataSource/dataSourceDetailController');

app.config(['$stateProvider', route]);

function route($stateProvider) {
    var dataSource = {
            name: 'dataSource',
            abstract: true,
            url: '/datasource',
            data: {pageTitle: '数据源管理'},
            template: '<ui-view />'
        }, dataSourceList = {
            name: 'list',
            url: '',
            parent: dataSource,
            data: { pageTitle: '列表' },
            templateUrl: 'modules/datasource/list.html',
            controller: 'dataSourceController'
        }, dataSourceAdd = {
            name: 'add',
            url: '/add',
            parent: dataSource,
            data: { pageTitle: '新建' },
            templateUrl: 'modules/datasource/edit.html',
            controller: 'dataSourceEditController'
        }, dataSourceEdit = {
            name: 'edit',
            url: '/edit/:id',
            parent: dataSource,
            data: { pageTitle: '修改' },
            templateUrl: 'modules/datasource/edit.html',
            controller: 'dataSourceEditController'
        }, dataSourceDetail = {
            name: 'detail',
            url: '/detail/:id',
            parent: dataSource,
            data: { pageTitle: '详细' },
            templateUrl: 'modules/datasource/detail.html',
            controller: 'dataSourceDetailController'
        }
        ;

    $stateProvider
        .state(dataSource)
        .state(dataSourceList)
        .state(dataSourceAdd)
        .state(dataSourceEdit)
        .state(dataSourceDetail)
    ;
}
},{"dataSource/dataSourceController":"dataSource/dataSourceController","dataSource/dataSourceDetailController":"dataSource/dataSourceDetailController","dataSource/dataSourceEditController":"dataSource/dataSourceEditController"}],"dataSource/dataSourceController":[function(require,module,exports){
require('filter/dataSourceStatus');
require('service/dataSource');

app.controller('dataSourceController', ['$scope', 'dataSourceService', 'hngMsg', 'hngModal', dataSourceController]);

function dataSourceController($scope, dataSourceService, hngMsg, hngModal) {
    $scope.current = 1;
    $scope.pageSize = 10;

    // 分页
    $scope.pagination = function () {
        dataSourceService.search($scope.current, $scope.pageSize)
            .then(function (result) {
                $scope.total = result.total;
                $scope.data = result.data;
            });
    };

    // 全部选择/取消全选
    $scope.toggleCheckAll = function ($event) {
        var checked = $event.target.checked;
        angular.forEach($scope.data, function (item) {
            item.__checked = checked;
        });
    };

    // 当前选择数据
    $scope.selection = function () {
        var selection = [];

        angular.forEach($scope.data, function (item) {
            if (item.__checked)
                selection.push(item);
        });

        return selection;
    };

    $scope.remove = function (items) {
        if (!angular.isArray(items)) {
            items = [].push(items);
        }

        if (!items.length) {
            return;
        }

        hngMsg.confirm('是否删除当前选择项？')
            .then(function (result) {
                if (result) {
                    var total = items.length;
                    var $progress = hngMsg.progress('正在删除...', total);

                    var progress = function (result) {
                        if (result.success) {
                            $progress.increment('success');
                        }
                        else {
                            $progress.increment('danger');
                        }

                        return doRemove();
                    };

                    var doRemove = function () {
                        if (items.length) {
                            return dataSourceService.removeById(items.pop().Id).then(progress);
                        }
                        /*else {
                         $progress.complete();
                         // $scope.pagination();
                         }*/
                    };

                    $progress.result.then(function () {
                        return hngMsg.alert(
                            '删除成功: ' + $progress.getValue('success') +
                            '删除失败: ' + $progress.getValue('danger'));
                    }).then(function () {
                        $scope.pagination();
                    });
                    return doRemove();
                }
            });
    };

    $scope.pagination();

    $scope.add = function () {
        var dialog = hngModal.show('modules/dataSource/edit.html', 'dataSourceEditController', {});
        dialog.closed.then(function (result) {
            if (result) {
                $scope.pagination();
            }
        });
    };
}
},{"filter/dataSourceStatus":"filter/dataSourceStatus","service/dataSource":"service/dataSource"}],"dataSource/dataSourceDetailController":[function(require,module,exports){
require('filter/dataSourceStatus');
require('service/dataSource');

app.controller('dataSourceDetailController', ['$scope', 'dataSourceService', 'hngMsg', dataSourceDetailController]);

function dataSourceDetailController($scope, dataSourceService, hngMsg) {
}
},{"filter/dataSourceStatus":"filter/dataSourceStatus","service/dataSource":"service/dataSource"}],"dataSource/dataSourceEditController":[function(require,module,exports){
require('filter/dataSourceStatus');
require('service/dataSource');

app.controller('dataSourceEditController', ['$scope', 'dataSourceService', 'hngMsg', dataSourceEditController]);

function dataSourceEditController($scope, dataSourceService, hngMsg) {
}
},{"filter/dataSourceStatus":"filter/dataSourceStatus","service/dataSource":"service/dataSource"}],"directive/pageSidebar":[function(require,module,exports){
require('utility/setting');

function uiPageSidebar() {
    return {
        link: function (scope, element/*, attrs*/) {
        }
    };
}

function uiPageSidebarMenu(setting) {
    return {
        link: function (scope, element, attrs) {
            element.on('click', 'li > a', function (e) {
                if (setting.layout.pageSidebarClosed) {
                    return;
                }

                var sub = $(this).next();

                if (!sub.hasClass('sub-menu')) {
                    return;
                }

                var slideSpeed = 200;

                if (sub.is(":visible")) {
                    $('.arrow', $(this)).removeClass("open");
                    $(this).parent().removeClass("open");
                    sub.slideUp();
                } else {
                    $('.arrow', $(this)).addClass("open");
                    $(this).parent().addClass("open");
                    sub.slideDown(slideSpeed);
                }

                e.preventDefault();
            });
        }
    };
}

app.directive('uiPageSidebar', [uiPageSidebar]);
app.directive('uiPageSidebarMenu', ['setting', uiPageSidebarMenu]);
},{"utility/setting":"utility/setting"}],"directive/spinnerBar":[function(require,module,exports){
function uiSpinnerBar($rootScope) {
    return {
        link: function (scope, element/*, attrs*/) {
            element.addClass('hide');
            element.parent().removeClass('page-on-load');

            $rootScope.$on('$stateChangeStart', function () {
                element.removeClass('hide');
            });

            $rootScope.$on('$stateChangeSuccess', function () {
                element.addClass('hide');
                element.parent().removeClass('page-on-load');
            });

            $rootScope.$on('$stateNotFound', function () {
                element.addClass('hide');
            });

            $rootScope.$on('$stateChangeError', function () {
                element.addClass('hide');
            });
        }
    };
}

app.directive('uiSpinnerBar', ['$rootScope', uiSpinnerBar]);
},{}],"employee/employee.config":[function(require,module,exports){
require('employee/employeeController');

app.config(['$stateProvider', router]);

function router($stateProvider) {
    $stateProvider.state('employee', {
        url:'/employee',
        data:{ pageTitle:'职员管理',pageSubTitle:'列表'},
        templateUrl:'modules/employee/list.html',
        controller:'employeeController'
    });
}
},{"employee/employeeController":"employee/employeeController"}],"employee/employeeController":[function(require,module,exports){
require('service/employee');

app.controller('employeeController', ['$scope', 'employeeService', employeeController]);

function employeeController($scope, employeeService) {

    /* 在控制直接数据绑定
	var data = [
		{ Code: 'aaaakkkkd', Name: '家电及', Gander: '1', Age: '32',Status:'1' },
		{ Code: 'fgf', Name: '味儿', Gander: '1', Age: '12', Status: '1' },
		{ Code: 'fg', Name: '二五二', Gander: '2', Age: '2', Status: '0' },
		{ Code: 'hjk', Name: '我里', Gander: '2', Age: '12', Status: '1' },
		{ Code: 'hj', Name: '玩儿', Gander: '2', Age: '32', Status: '1' },
		{ Code: 'rty', Name: '金坷垃', Gander: '0', Age: '56', Status: '0' },
		{ Code: 'uio', Name: '水电费', Gander: '0', Age: '98', Status: '0' },
	];

	$scope.list = data;
    */

    //使用服务绑定数据
    employeeService.search(1, 1).then(function (result) {
        $scope.list = result;
    });
}
},{"service/employee":"service/employee"}],"filter/dataSourceStatus":[function(require,module,exports){
app.filter('dataSourceStatus', [dataSourceStatus]);

function dataSourceStatus() {
    return function (value) {
        switch (value) {
            case 1:
                return '有效';

            default:
                return '未知';
        }
    }
}
},{}],"filter/houseStatus":[function(require,module,exports){
app.filter('houseStatus', [houseStatus]);
app.filter('houseType', [houseType]);

function houseStatus() {
    return function (value)
    {
        switch (value) {
            case 1:
                return '有效';
            case 2:
                return '无效';
            case 3:
                return '已售';
            default:
                return '未知';              
        }
    }
}

function houseType() {
    return function (value) {
        switch (value) {
            case 1:
                return '出售';
            default:
                return '出租';
        }
    }
}
},{}],"frontend/frontend.config":[function(require,module,exports){
require('frontend/frontendController');

function route($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('frontend', {
            url: '/',
            templateUrl: 'modules/frontend/slider.html',
            data: { pageTitle: '主页', pageSubTitle: '' },
            controller: 'frontendController'
        })
    ;
}

app.config(['$stateProvider', '$urlRouterProvider', route]);

},{"frontend/frontendController":"frontend/frontendController"}],"frontend/frontendController":[function(require,module,exports){
require('service/menu');
require('service/user');
require('utility/modal');

require('auth/loginController');

function frontendController($scope, menuService, hngMsg) {
    $scope.slides = [{
        image: 'assets/global/img/layerslider/slide1/bg.jpg',
        title: 'Hi',
        content: 'This is Slide 1'
    }, {
        image: 'assets/global/img/layerslider/slide2/bg.jpg',
        title: 'Hi!',
        content: 'This is Slide 2'
    }, {
        image: 'assets/global/img/layerslider/slide3/bg.jpg',
        title: 'Hi!!!',
        content: 'This is Slide 3'
    }, {
        image: 'assets/global/img/layerslider/slide5/bg.jpg',
        title: 'Hi!!!!',
        content: 'This is Slide 4'
    }];

    $scope.menus = [];

    menuService.frontendMenus()
        .then(function (menus) {
            $scope.menus = menus;
        });
}

app.controller('frontendController', ['$scope', 'menuService', 'hngMsg', frontendController]);
},{"auth/loginController":"auth/loginController","service/menu":"service/menu","service/user":"service/user","utility/modal":"utility/modal"}],"house/house.config":[function(require,module,exports){
require('house/houseController');

app.config(['$stateProvider', router]);

function router($stateProvider) {
    $stateProvider
        .state('house', {
            url: '/house',
            data: { pageTitle: '房源管理', pageSubTile: '列表' },
            templateUrl: 'modules/house/house-list.html',
            controller: 'houseController'
        });
}
},{"house/houseController":"house/houseController"}],"house/houseController":[function(require,module,exports){
require('filter/houseStatus');
require('service/house')

app.controller('houseController', ['$scope','houseService', houseController]);

function houseController($scope, houseService) {

    //var list = [
    //    { Id: '0001', Type: "出租", Address: '中山区', Status: 1 },
    //    { Id: '0002', Type: "出租", Address: '沙河口区', Status: 2 },
    //    { Id: '0003', Type: "出售", Address: '西岗区', Status: 3 },
    //    { Id: '0004', Type: "出售", Address: '甘井子区', Status: 4 },
    //];

    //$scope.total = list.length;
    //$scope.current = 1;
    //$scope.pageSize = 3;

    //$scope.pagination = function () {
    //    var total = $scope.total,
    //        page = $scope.current,
    //        pageSize = $scope.pageSize;
    //    var data = [];
    //    for (var i = (page - 1) * pageSize; i < page * pageSize && i < total; i++) {
    //        data.push(list[i]);
    //    }
    //    $scope.data = data;
    //}

    //$scope.pagination();

    $scope.current = 1;
    $scope.pageSize = 3;

    $scope.pagination = function () {
        houseService.count().then(function (total) {
            $scope.total = total;
        })
        houseService.search($scope.current, $scope.pageSize).then(function (data) {
            $scope.data = data;
        })
    }

    $scope.pagination();


}
},{"filter/houseStatus":"filter/houseStatus","service/house":"service/house"}],"service/dataSource":[function(require,module,exports){
app.service('dataSourceService', ['$http', '$q', dataSourceService]);

function dataSourceService($http, $q) {
    var all = [
        {Id: 1, Code: '1', Name: '123', Database: '123', Server: '123', Status: 1},
        {Id: 2, Code: '2', Name: '1223', Database: '1d23', Server: '123', Status: 1},
        {Id: 3, Code: '3', Name: '1223', Database: '123f', Server: '123', Status: 2},
        {Id: 4, Code: '4', Name: '1d23', Database: '12x3', Server: '123', Status: 2},
        {Id: 5, Code: '5', Name: '12a3', Database: '1a23', Server: '123', Status: 1}
    ];

    this.search = function (page, limit, order, filter) {
        var defer = $q.defer();
        setTimeout(function () {
            var total = all.length;
            var data = [];

            for (var i = (page - 1) * limit; (i < page * limit) && i < total; i++) {
                data.push(all[i]);
            }

            defer.resolve({
                total: all.length,
                data: data
            });
        }, 300);

        return defer.promise;
    };

    this.removeById = function (id) {
        var defer = $q.defer();
        angular.forEach(all, function(item, i){
            if(item.Id === id){
                all.splice(i, 1);
                return false;
            }
        });

        setTimeout(function(){
            defer.resolve({
                success: true,
                message: '删除成功'
            });
        }, 300);

        return defer.promise;
    };
}
},{}],"service/employee":[function(require,module,exports){
app.service('employeeService',['$http','$q',employeeService]);

function employeeService($http,$q) {
    var all = [
		{ Code: 'aaaakkkkd', Name: '家电及', Gander: '1', Age: '32', Status: '1' },
		{ Code: 'fgf', Name: '味儿', Gander: '1', Age: '12', Status: '1' },
		{ Code: 'fg', Name: '二五二', Gander: '2', Age: '2', Status: '0' },
		{ Code: 'hjk', Name: '我里', Gander: '2', Age: '12', Status: '1' },
		{ Code: 'hj', Name: '玩儿', Gander: '2', Age: '32', Status: '1' },
		{ Code: 'rty', Name: '金坷垃', Gander: '0', Age: '56', Status: '0' },
		{ Code: 'uio', Name: '水电费', Gander: '0', Age: '98', Status: '0' }
    ];

    this.search = function (page,limit) {
        var defer = $q.defer();
        var data = all;
        defer.resolve(data);
        return defer.promise;
    }
};
},{}],"service/house":[function(require,module,exports){
app.service('houseService', ['$http', '$q', houseService]);

function houseService($http, $q) {
    var list = [
    { Id: '0001', Type: 1, Address: '中山区', Status: 1 },
    { Id: '0002', Type: "出租", Address: '沙河口区', Status: 2 },
    { Id: '0003', Type: 2, Address: '西岗区', Status: 3 },
    { Id: '0004', Type: "出售", Address: '甘井子区', Status: 4 },
    ];

    this.search = function (page, limit) {
        var defer = $q.defer();

        setTimeout(function () {
            var total = list.length;
            var data = [];
            for (var i = (page - 1) * limit; i < page * limit && i < total; i++) {
                data.push(list[i]);
            }
            defer.resolve(data);
        }, 1000);
        return defer.promise;
    }

    this.count = function () {
        var defer = $q.defer();

        setTimeout(function () {
            defer.resolve(list.length);
        }, 1000);
        return defer.promise;
    }
}
},{}],"service/menu":[function(require,module,exports){
function menuService($http, $q) {
    this.authorizationMenus = function () {
        var menus = [
            {name: '权限管理系统', icon: 'icon-people', menus: [{name: '用户管理', url: '#/user'}]},
            { name: '报表管理系统', icon: 'icon-home', menus: [{ name: '数据源管理', url: '#/datasource' }] },
            { name: '职员管理', icon: 'icon-home', menus: [{ name: '职员管理', url: '#/employee' }] },
            { name: '房源管理系统', icon: 'icon-map',menus:[{name:'房源管理',url:'#/house'}] }
        ];

        var defer = $q.defer();

        setTimeout(function () {
            defer.resolve(menus);
        }, 200);

        return defer.promise;
    };

    this.frontendMenus = function () {
        var menus = [
            {
                name: '链家集团',
                menus: [
                    {
                        name: '链家网', url: '#', menus: [{
                            name: '大连链家', url: 'https://dl.lianjia.com'
                        },{
                            name: '北京链家', url: 'https://bj.lianjia.com'
                        }]
                    },
                    {name: '链家理财', url: 'https://licai.lianjia.com/'}
                ]
            },{
                name: '关于',
                menus: [
                    { name: '关于', url: '#/about' },
                    { name: '广告合作', url: '#/ad' },
                    { name: '友情链接', url: '#/link' }
                ]
            }
        ];

        var defer = $q.defer();

        setTimeout(function () {
            defer.resolve(menus);
        }, 200);

        return defer.promise;
    };
}

app.service('menuService', ['$http', '$q', menuService]);
},{}],"service/user":[function(require,module,exports){
require('utility/setting');

function userService($http, $q, setting) {
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
    };

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
    };

    this.removeById = function (id) {
        return $http({
            method: 'DELETE',
            url: 'http://hongyuan-win10:1234/DataService.svc/Users(' + id + ')'
        }).then(function (data) {
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
    };

    this.getById = function (id) {
        return $http.get('http://hongyuan-win10:1234/DataService.svc/Users(' + id + ')').then(function (data) {
            return data.data;
        });
    };

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
    };

    this.login = function (username, password) {
        var defer = $q.defer();
        defer.resolve({success: true});
        return defer.promise;
    }

    this.logout = function () {
        var defer = $q.defer();
        defer.resolve();
        return defer.promise;
    }
}

app.service('userService', ['$http', '$q', 'setting', userService]);
},{"utility/setting":"utility/setting"}],"user/user.config":[function(require,module,exports){
require('user/userController');

function route($stateProvider) {
    $stateProvider
        .state('user', {
            url: '/user',
            data: { pageTitle: '用户管理', pageSubTitle: '列表' },
            templateUrl: 'modules/user/user-list.html',
            controller: 'userController'
        })
        .state('user.add', {
            url: '/user/add',
            data: { pageTitle: '用户管理', pageSubTitle: '添加' },
            templateUrl: 'modules/user/user-edit.html',
            controller: 'userEditController'
        })
        .state('user.edit', {
            url: '/user/edit/:id',
            data: { pageTitle: '用户管理', pageSubTitle: '编辑' },
            templateUrl: 'modules/user/user-edit.html',
            controller: 'userEditController'
        })
        .state('user.detail', {
            url: '/user/detail/:id',
            data: { pageTitle: '用户管理', pageSubTitle: '编辑' },
            templateUrl: 'modules/user/user-detail.html',
            controller: 'userDetailController'
        })
    ;
}

app.config(['$stateProvider', route]);
},{"user/userController":"user/userController"}],"user/userController":[function(require,module,exports){
require('service/user');

function userController($scope, userService, msg) {
    $scope.list = [];

    //$scope.gridOptions = {
    //	data: 'list',
    //	columnDefs: [
    //		{ field: 'Code', displayName: '用户代码', width: '20%' },
    //		{ field:'Name', displayName: '姓名', width: '*' },
    //		{ field:'Email', displayName: '邮箱', width: '30%' },
    //		{ field:'Status', displayName: '状态', width: 80, cellFilter: 'userStatus' }
    //	]
    //};

    //userService.search(1, 100, {})
    //    .then(function (result) {
    //        $scope.list = result.data;
    //    });
}

app.filter('userStatus', [function () {
        return function (value) {
            switch (value) {
                case 1:
                    return '有效';

                default:
                    return '无效';
            }
        }
    }])
    .controller('userController', ['$scope', 'userService', 'msg', userController]);
},{"service/user":"service/user"}],"utility/modal":[function(require,module,exports){
require('utility/setting');

function modalFactory($uibModal, $rootScope, $uibModalStack){
    var modal = {};

    modal.show = function(templateUrl, controller, size){
        var dialog = $uibModal.open({
            templateUrl: templateUrl,
            backdrop: 'static',
            size: (size? size : 'md'),
            controller: controller});

        return dialog.result;
    };

    $rootScope.$on('$stateChangeSuccess', function () {
        $uibModalStack.dismissAll();
    });

    return modal;
}

app.factory('modal', ['$uibModal', '$rootScope', '$uibModalStack', modalFactory]);
},{"utility/setting":"utility/setting"}],"utility/setting":[function(require,module,exports){
function settingFactory() {
    var setting = {
        applicationName: '报表管理系统',
        tel: '0411-88888888',
        email: 'wowhy@outlook.com',

        layout: {
            path: '',
            pageSidebarClosed: false,
            menuCollapse: true
        },

        API: {
            baseUrl: ''
        }
    };

    if(Math.round(Math.random() * 10) > 5) {
        setting.layout.adminLayout = 'layout3';
    }

    return setting;
}

app.factory('setting', [settingFactory]);
},{}]},{},["app"]);
