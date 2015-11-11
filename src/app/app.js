/**
 * Created by hongyuan on 2015/11/9.
 */
window.$ = window.jQuery = require('../libs/jquery/dist/jquery');
require('../libs/angular');
require('../libs/angular-ui-router/release/angular-ui-router');
require('../libs/angular-bootstrap/ui-bootstrap-tpls');

function settingFactory(){
	var setting = {
		applicationName: '示例网站'
	};
	return setting;
};

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
    ;
}

function appController($scope){
	
}

function run($rootScope, $state, setting){
	$rootScope.$state = $state;
	$rootScope.setting = setting;
}

angular.module('example.controllers', []);
angular.module('example.services', []);
angular.module('example.utilities', []);
angular.module('example', ['example.controllers', 'example.services', 'example.utilities', 'ui.router', 'ui.bootstrap'])
	   .factory('setting', [settingFactory])
	   .config(['$stateProvider', '$urlRouterProvider', configRoute])
	   .controller('appController', ['$scope', appController])
	   .run(['$rootScope', '$state', 'setting', run]);
       
require('./modules')
require('./components')