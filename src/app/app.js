/**
 * Created by hongyuan on 2015/11/9.
 */
window.$ = window.jQuery = require('../libs/jquery/dist/jquery');
require('../libs/angular');
require('../libs/angular-ui-router/release/angular-ui-router');
require('../libs/angular-bootstrap/ui-bootstrap-tpls');
require('../libs/angular-ui-grid/ui-grid');

function configRoute($stateProvider, $urlRouterProvider){
    // 默认路由
    $urlRouterProvider
        .when('', '/dashboard')
        .otherwise('/404');
	
    // 路由
    $stateProvider
		.state('404', {
			url: '/404',
			templateUrl: 'app/templates/404.html',
			 data: { pageTitle: 'Not Found', pageSubTitle: '404' }
		})
        // dashboard
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'app/modules/index/dashboard.html',
            data: { pageTitle: '仪表板', pageSubTitle: '统计 & 报表' },
            controller: 'dashboardController'
        })
        .state('user', {
            url: '/rms/user',
            templateUrl: 'app/modules/user/user-list.html',
            data: { pageTitle: '用户管理', pageSubTitle: '列表' },
            controller: 'userController'
        })
    ;
}

function appController($scope, menuService){
    $scope.menus = [];
    
    menuService.authorizationMenus()
               .then(function(menus){
                   $scope.menus = menus;
               });
}

function run($rootScope, $state, setting){
	$rootScope.$state = $state;
	$rootScope.setting = setting;
}

angular.module('example.utility', ['ui.router', 'ui.bootstrap']);
angular.module('example.service', ['example.utility']);
angular.module('example.controller', ['example.service', 'example.utility', 'ui.router', 'ui.bootstrap']);


angular.module('example', ['example.controller', 'example.service', 'example.utility', 'ui.router', 'ui.bootstrap', 'ui.grid', 'ui.grid.pagination'])
	   .config(['$stateProvider', '$urlRouterProvider', configRoute])
	   .controller('appController', ['$scope', 'menuService', appController])
	   .run(['$rootScope', '$state', 'setting', run]);
       
require('./modules');
require('./components');