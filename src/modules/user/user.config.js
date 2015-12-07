require('user/userController');

function route($stateProvider) {
    $stateProvider
        .state('user', {
            url: '/user',
            data: { pageTitle: '用户管理', pageSubTitle: '列表' },
            templateUrl: 'modules/user/user-list.html',
            controller: 'userController'
        })
        .state('user.add', {
            url: '/user/add',
            data: { pageTitle: '用户管理', pageSubTitle: '添加' },
            templateUrl: 'modules/user/user-edit.html',
            controller: 'userEditController'
        })
        .state('user.edit', {
            url: '/user/edit/:id',
            data: { pageTitle: '用户管理', pageSubTitle: '编辑' },
            templateUrl: 'modules/user/user-edit.html',
            controller: 'userEditController'
        })
        .state('user.detail', {
            url: '/user/detail/:id',
            data: { pageTitle: '用户管理', pageSubTitle: '编辑' },
            templateUrl: 'modules/user/user-detail.html',
            controller: 'userDetailController'
        })
    ;
}

app.config(['$stateProvider', route]);