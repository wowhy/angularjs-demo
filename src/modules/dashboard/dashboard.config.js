require('dashboard/dashboardController');

app.config(['$stateProvider', route]);

function route($stateProvider) {
    $stateProvider
        .state('dashboard', {
            url: '/dashboard',
            data: {pageTitle: '仪表板', pageSubTitle: '统计&报表'},
            templateUrl: 'modules/dashboard/dashboard.html',
            controller: 'dashboardController'
        })
    ;
}