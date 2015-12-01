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
        .state('dataSource.add', {
            url: '/datasource/add',
            data: { pageTitle: '数据源管理', pageSubTitle: '列表' },
            templateUrl: 'modules/datasource/edit.html',
            controller: 'dataSourceEditController'
        })
        .state('dataSource.edit', {
            url: '/datasource/edit/:id',
            data: { pageTitle: '数据源管理', pageSubTitle: '列表' },
            templateUrl: 'modules/datasource/edit.html',
            controller: 'dataSourceEditController'
        })
        .state('dataSource.detail', {
            url: '/datasource/detail/:id',
            data: { pageTitle: '数据源管理', pageSubTitle: '列表' },
            templateUrl: 'modules/datasource/edit.html',
            controller: 'dataSourceDetailController'
        })
    ;
}