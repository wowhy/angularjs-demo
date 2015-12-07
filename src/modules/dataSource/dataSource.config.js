require('dataSource/dataSourceController');
require('dataSource/dataSourceEditController');
require('dataSource/dataSourceDetailController');

app.config(['$stateProvider', route]);

function route($stateProvider) {
    var dataSource = {
            name: 'dataSource',
            abstract: true,
            url: '/datasource',
            data: {pageTitle: '数据源管理'},
            template: '<ui-view />'
        }, dataSourceList = {
            name: 'list',
            url: '',
            parent: dataSource,
            data: { pageTitle: '列表' },
            templateUrl: 'modules/datasource/list.html',
            controller: 'dataSourceController'
        }, dataSourceAdd = {
            name: 'add',
            url: '/add',
            parent: dataSource,
            data: { pageTitle: '新建' },
            templateUrl: 'modules/datasource/edit.html',
            controller: 'dataSourceEditController'
        }, dataSourceEdit = {
            name: 'edit',
            url: '/edit/:id',
            parent: dataSource,
            data: { pageTitle: '修改' },
            templateUrl: 'modules/datasource/edit.html',
            controller: 'dataSourceEditController'
        }, dataSourceDetail = {
            name: 'detail',
            url: '/detail/:id',
            parent: dataSource,
            data: { pageTitle: '详细' },
            templateUrl: 'modules/datasource/detail.html',
            controller: 'dataSourceDetailController'
        }
        ;

    $stateProvider
        .state(dataSource)
        .state(dataSourceList)
        .state(dataSourceAdd)
        .state(dataSourceEdit)
        .state(dataSourceDetail)
    ;
}