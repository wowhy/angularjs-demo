require('account/loginController');

function route($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'modules/account/login.html',
            data: {pageTitle: '登录', pageSubTitle: ''},
            controller: 'loginController'
        })
        .state('register', {
            url: '/register',
            templateUrl: 'modules/account/register.html',
            data: {pageTitle: '注册', pageSubTitle: ''}
        })
    ;
}

app.config(['$stateProvider', '$urlRouterProvider', route]);