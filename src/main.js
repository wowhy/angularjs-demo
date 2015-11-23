require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"account/loginController":[function(require,module,exports){
require('service/user');

function loginController($scope, $location, userService, $uibModalInstance) {
    $scope.login = function () {
        userService.login($scope.username, $scope.password)
            .then(function (result) {
                if (result.success) {
                    $location.path('/dashboard');
                } else {
                    alert(result.message);
                }
            });
    }
}

app.controller('loginController', ['$scope', '$location', 'userService', loginController]);
},{"service/user":"service/user"}],"account/main":[function(require,module,exports){
require('account/loginController');

function route($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'modules/account/login.html',
            data: {pageTitle: '登录', pageSubTitle: ''},
            controller: 'loginController'
        })
        .state('register', {
            url: '/register',
            templateUrl: 'modules/account/register.html',
            data: {pageTitle: '注册', pageSubTitle: ''}
        })
    ;
}

app.config(['$stateProvider', '$urlRouterProvider', route]);
},{"account/loginController":"account/loginController"}],"admin/adminController":[function(require,module,exports){
/**
 * Created by hongyuan on 2015/11/13.
 */
require('utility/msg');
require('service/menu');
require('directive/spinnerBar');
require('directive/pageSidebar');

function adminController($scope){
}

function headerController($scope, $location, userService, setting){
    $scope.toggleSidebar = function(){
        setting.layout.pageSidebarClosed = !setting.layout.pageSidebarClosed;
    };

    $scope.logout = function(){
        userService.logout().then(function(){
            $location.path('/');
        });
    }
}

function navbarController($scope, menuService) {
    $scope.menus = [];

    menuService.authorizationMenus()
        .then(function (menus) {
            $scope.menus = menus;
        });
}

app.controller('adminController', ['$scope', adminController])
   .controller('headerController', ['$scope', '$location', 'userService', 'setting', headerController])
   .controller('navbarController', ['$scope', 'menuService', navbarController]);
},{"directive/pageSidebar":"directive/pageSidebar","directive/spinnerBar":"directive/spinnerBar","service/menu":"service/menu","utility/msg":"utility/msg"}],"admin/dashboardController":[function(require,module,exports){
require('utility/msg');

function dashboardController($scope, msg){
    // msg.confirm({text: 'Hello, Dashboard!'});
}

app.controller('dashboardController', ['$scope', 'msg', dashboardController]);
},{"utility/msg":"utility/msg"}],"admin/main":[function(require,module,exports){
/**
 * Created by hongyuan on 2015/11/16.
 */

// 引用依赖模块，配置路由

require('utility/setting');
require('admin/adminController');
require('admin/dashboardController');

function route($stateProvider) {
    $stateProvider
        .state('404', {
            url: '/404',
            templateUrl: 'templates/404.html'
        })
        .state('admin', {
            //templateUrl: 'app/modules/admin/layout/index.html',
            templateProvider: ['$http', '$templateCache', 'setting', function ($http, $templateCache, setting) {
                var url = 'modules/admin/' + setting.layout.adminLayout + '/index.html';
                return $http.get(url, {cache: $templateCache})
                    .then(function (response) {
                        return response.data;
                    });
            }],
            controller: 'adminController'
        })
        .state('admin.dashboard', {
            url: '/dashboard',
            views: {
                'page': {
                    templateUrl: 'modules/admin/dashboard.html',
                    controller: 'dashboardController'
                }
            },
            data: {pageTitle: '仪表板', pageSubTitle: '统计&报表'}
        })
    ;
}

app.config(['$stateProvider', route]);
},{"admin/adminController":"admin/adminController","admin/dashboardController":"admin/dashboardController","utility/setting":"utility/setting"}],"app":[function(require,module,exports){
/**
 * Created by hongyuan on 2015/11/9.
 */

require('core');
require('utility/setting');

require('admin/main');
require('frontend/main');
require('account/main');
require('user/main');

app.run(['$rootScope', '$state', 'setting', '$uibModalStack', run]);

function run($rootScope, $state, setting, $uibModalStack) {
    $rootScope.$state = $state;
    $rootScope.setting = setting;

    $rootScope.$on('$stateChangeStart',
        function (event, toState/*, toParams, fromState, fromParams*/) {
            if (toState.name.indexOf('admin') != -1) {
                if (!setting.isAuthenticated) {
                    event.preventDefault();
                    setTimeout(function () {
                        $state.go('frontend', {}, {});
                    }, 0);
                }
            }
        });

    $rootScope.$on('$stateChangeSuccess', function () {
        $uibModalStack.dismissAll();
    });
}
},{"account/main":"account/main","admin/main":"admin/main","core":"core","frontend/main":"frontend/main","user/main":"user/main","utility/setting":"utility/setting"}],"auth/permission":[function(require,module,exports){

},{}],"auth/session":[function(require,module,exports){
arguments[4]["auth/permission"][0].apply(exports,arguments)
},{"dup":"auth/permission"}],"core":[function(require,module,exports){
/**
 * Created by hongyuan on 2015/11/16.
 */

// window.$ = window.jQuery = require('../libs/jquery/dist/jquery');
// require('../libs/angular');
// require('../libs/angular-ui-router/release/angular-ui-router');
// require('../libs/angular-bootstrap/ui-bootstrap-tpls');
// require('../libs/angular-ui-grid/ui-grid');

var utilities = angular.module('example.utility', ['ngLocale', 'ngTouch', 'ngAnimate', 'ui.router', 'ui.bootstrap']);
var services = angular.module('example.service', ['example.utility']);
var directives = angular.module('example.directive', ['example.utility']);
var filters = angular.module('example.filters', ['example.utility']);
var example = angular.module('example', [
    'example.directive',
    'example.service',
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
},{}],"directive/pageSidebar":[function(require,module,exports){
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

                var slideSpeed = parseInt(attrs.slideSpeed);

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
},{}],"frontend/frontendController":[function(require,module,exports){
require('service/menu');
require('service/user');
require('utility/modal');

function frontendController($scope, modal, menuService, userService) {
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

    $scope.login = function(){
        modal.show('modules/account/login.html', 'loginController', 'login');
    };

    $scope.logout = function(){
        userService.logout();
    };

    menuService.frontendMenus()
        .then(function (menus) {
            $scope.menus = menus;
        });
}

app.controller('frontendController', ['$scope', 'modal', 'menuService', 'userService', frontendController]);
},{"service/menu":"service/menu","service/user":"service/user","utility/modal":"utility/modal"}],"frontend/main":[function(require,module,exports){
require('frontend/frontendController');

function route($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('frontend', {
            url: '/',
            templateUrl: 'modules/frontend/layout/index.html',
            data: { pageTitle: '主页', pageSubTitle: ''},
            controller: 'frontendController'
        })
    ;
}

app.config(['$stateProvider', '$urlRouterProvider', route]);

},{"frontend/frontendController":"frontend/frontendController"}],"service/menu":[function(require,module,exports){
function menuService($http, $q) {
    this.authorizationMenus = function () {
        var menus = [
            {name: '权限管理系统', icon: 'icon-people', menus: [{name: '用户管理', url: '#/user'}]},
            { name: '报表管理系统', icon: 'icon-home', menus: [{name: '数据源管理', url: '#/rpt/datasource'}] }
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
        setting.setAuth(username);

        var defer = $q.defer();
        defer.resolve({success: true});
        return defer.promise;
    }

    this.logout = function () {
        setting.setAuth('');

        var defer = $q.defer();
        defer.resolve();
        return defer.promise;
    }
}

app.service('userService', ['$http', '$q', 'setting', userService]);
},{"utility/setting":"utility/setting"}],"user/main":[function(require,module,exports){
require('user/userController');

function route($stateProvider) {
    $stateProvider
        .state('admin.user', {
            url: '/user',
            data: {pageTitle: '用户管理', pageSubTitle: '列表'},
            views: {
                'page@admin': {
                    templateUrl: 'modules/user/user-list.html',
                    controller: 'userController'
                }
            }
        })
    ;
}

app.config(['$stateProvider', route]);
},{"user/userController":"user/userController"}],"user/userController":[function(require,module,exports){
require('service/user');
require('utility/msg');

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

    userService.search(1, 100, {})
        .then(function (result) {
            $scope.list = result.data;
        });
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
},{"service/user":"service/user","utility/msg":"utility/msg"}],"utility/guid":[function(require,module,exports){
function guidFactory() {
    return {
        newGuid: function () {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0,
                  v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
    };
}

app.factory('guid', [guidFactory]);
},{}],"utility/modal":[function(require,module,exports){
require('utility/setting');

function modalFactory($uibModal, setting){
    var modal = {};

    modal.show = function(templateUrl, controller, size){
        var dialog = $uibModal.open({
            templateUrl: templateUrl,
            backdrop: 'static',
            size: (size? size : 'md'),
            controller: controller});

        return dialog.result;
    };

    return modal;
}

app.factory('modal', ['$uibModal', modalFactory]);
},{"utility/setting":"utility/setting"}],"utility/msg":[function(require,module,exports){
require('utility/setting');

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
                };

                $scope.cancel = function () {
                    $uibModalInstance.close(false);
                };

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

app.factory('msg', ['$uibModal', msgFactory]);
},{"utility/setting":"utility/setting"}],"utility/setting":[function(require,module,exports){
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
        applicationName: '报表管理系统',
        tel: '0411-88888888',
        email: 'wowhy@outlook.com',

        layout: {
            adminLayout: 'layout',
            pageSidebarClosed: false
        },

        setAuth: function (username) {
            this.isAuthenticated = !!username;
            this.username = username;

            setCookie('username', username, 1);
        }
    };

    var username = getCookie('username');
    if(username){
        setting.setAuth(username);
    }

    if(Math.round(Math.random() * 10) > 5){
        setting.layout.adminLayout = 'layout3';
    }

    return setting;
}

app.factory('setting', [settingFactory]);
},{}],"utility/store":[function(require,module,exports){
app.factory('localStore', [localStorageFactory]);
app.factory('sessionStore', [sessionStorageFactory]);

function localStoreFactory() {
    return getStorage('localStorage');
}

function sessionStorageFactory() {
    return getStorage('sessionStorage');
}

// short version of https://github.com/marcuswestin/store.js,
// only support modern browsers (Firefox 4.0+, Chrome 11+, IE9+, iOS 4+)
function getStorage(storageName) {
    var win = window;
    getStorage._storeCache = getStorage._storeCache || {};
    if(getStorage._storeCache[storageName]) {
        return getStorage._storeCache[storageName];
    }

    var store = {},
      doc = win.document,
      localStorageName = storageName,
      storage;
    store.disabled = false;
    store.serialize = function(value) {
        return JSON.stringify(value);
    };
    store.deserialize = function(value) {
        if (typeof value != 'string') {
            return undefined;
        }
        try {
            return JSON.parse(value);
        } catch (e) {
            return value || undefined;
        }
    };
    // Functions to encapsulate questionable FireFox 3.6.13 behavior
    // when about.config::dom.storage.enabled === false
    // See https://github.com/marcuswestin/store.js/issues#issue/13
    function isLocalStorageNameSupported() {
        try {
            return (localStorageName in win && win[localStorageName]);
        } catch (err) {
            return false;
        }
    }
    if (isLocalStorageNameSupported()) {
        store.supported = true;
        storage = win[localStorageName];
        store.set = function(key, val) {
            if (val === undefined) {
                return store.remove(key);
            }
            storage.setItem(key, store.serialize(val));
            return val;
        };
        store.get = function(key) {
            return store.deserialize(storage.getItem(key));
        };
        store.remove = function(key) {
            storage.removeItem(key);
        };
        store.clear = function() {
            storage.clear();
        };
        store.getAll = function() {
            var ret = {};
            store.forEach(function(key, val) {
                ret[key] = val;
            });
            return ret;
        };
        store.forEach = function(callback) {
            for (var i = 0; i < storage.length; i++) {
                var key = storage.key(i);
                callback(key, store.get(key));
            }
        };
        try {
            var testKey = '__storejs__';
            store.set(testKey, testKey);
            if (store.get(testKey) != testKey) {
                store.disabled = true;
            }
            store.remove(testKey);
        } catch (e) {
            store.disabled = true;
        }
        store.enabled = !store.disabled;
    } else {
        store.supported = false;
        store.enabled = false;
    }
    getStorage._storeCache[storageName] = store;
    return store;
};
},{}]},{},["core","app","directive/pageSidebar","directive/spinnerBar","utility/guid","utility/modal","utility/msg","utility/setting","utility/store","account/loginController","account/main","admin/adminController","admin/dashboardController","admin/main","auth/permission","auth/session","frontend/frontendController","frontend/main","user/main","user/userController"]);
