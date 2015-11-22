/**
 * Created by hongyuan on 2015/11/16.
 */

// 引用依赖模块，配置路由

require('../../core');
require('../../components/utilities/setting');
require('./adminController');
require('./dashboardController');

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