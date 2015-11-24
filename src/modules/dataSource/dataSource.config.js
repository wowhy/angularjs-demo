require('dataSource/dataSourceController');

app.config(['$stateProvider', route]);

function route($stateProvider) {
    $stateProvider
        .state('dataSource', {
            url: '/datasource',
            data: { pageTitle: '数据源管理', pageSubTitle: '列表' },
            templateUrl: 'modules/datasource/list.html',
            controller: 'dataSourceController'
        })
    ;
}