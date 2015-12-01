require('house/houseController');

app.config(['$stateProvider', router]);

function router($stateProvider) {
    $stateProvider
        .state('house', {
            url: '/house',
            data: { pageTitle: '房源管理', pageSubTile: '列表' },
            templateUrl: 'modules/house/house-list.html',
            controller: 'houseController'
        });
}