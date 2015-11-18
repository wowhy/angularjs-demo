/**
 * Created by hongyuan on 2015/11/16.
 */

// 引用依赖模块，配置路由

require('../../core');
require('./homeController');
require('./dashboardController');
require('./aboutController');

function route($stateProvider){
    $stateProvider
        .state('404', {
            url: '/404',
            templateUrl: 'app/templates/404.html'
        })
        .state('about', {
            url: '/about',
            templateUrl: 'app/modules/admin/about.html',
            controller: 'aboutController'
        })
        .state('admin', {
            templateUrl: 'app/modules/admin/layout/index.html',
            controller: 'homeController'
        })
        .state('admin.dashboard', {
            url: '/dashboard',
            views: {
                'page': {
                    templateUrl: 'app/modules/admin/dashboard.html',
                    controller: 'dashboardController'
                }
            },
            data: { pageTitle: '仪表板', pageSubTitle: '统计&报表' }
        })
    ;
}

angular.module('example')
    .config(['$stateProvider', route]);