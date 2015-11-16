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