/**
 * Created by hongyuan on 2015/11/9.
 */
// window.$ = window.jQuery = require('../libs/jquery/dist/jquery');
//require('../libs/angular');
//require('../libs/angular-ui-router/release/angular-ui-router');
//require('../libs/angular-bootstrap/ui-bootstrap-tpls');
//require('../libs/angular-ui-grid/ui-grid');

angular.module('example.index', [
    'example.service',
    'example.utility',
    'ui.router',
    'ui.bootstrap'])
;

function run($rootScope, $state, setting){
    $rootScope.$state = $state;
    $rootScope.setting = setting;
}

function route($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/404');

    $stateProvider
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'app/modules/index/dashboard.html',
            controller: 'dashboardController'
        })
        .state('about', {
            url: '/about',
            templateUrl: 'app/modules/index/about.html',
            controller: 'aboutController'
        })
        .state('404', {
            url: '/404',
            templateUrl: 'app/templates/404.html'
        })
    ;
}

angular.module('example.index')
    .config(['$stateProvider', '$urlRouterProvider', route])
    .run(['$rootScope', '$state', 'setting', run]);

require('../../core');
require('../../components/utilities/setting');
require('./indexController');
require('./dashboardController');
require('./aboutController');