/**
 * Created by hongyuan on 2015/11/16.
 */

// 引用依赖模块，配置路由

var modules = require('../../core');
require('../../components/utilities/setting');
require('./adminController');
require('./dashboardController');

function route($stateProvider) {
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
            //templateUrl: 'app/modules/admin/layout/index.html',
            templateProvider: ['$http', '$templateCache', 'setting', function ($http, $templateCache, setting) {
                var url = 'app/modules/admin/' + setting.layout.adminLayout + '/index.html';
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
                    templateUrl: 'app/modules/admin/dashboard.html',
                    controller: 'dashboardController'
                }
            },
            data: {pageTitle: '仪表板', pageSubTitle: '统计&报表'}
        })
    ;
}

modules.root.config(['$stateProvider', route]);