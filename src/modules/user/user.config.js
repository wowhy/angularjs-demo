require('user/userController');

function route($stateProvider) {
    $stateProvider
        .state('user', {
            url: '/user',
            data: {pageTitle: '用户管理', pageSubTitle: '列表'},
            templateUrl: 'modules/user/user-list.html',
            controller: 'userController'
        })
    ;
}

app.config(['$stateProvider', route]);