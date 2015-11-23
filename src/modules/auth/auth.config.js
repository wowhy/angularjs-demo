require('auth/permission');
require('auth/session');
require('auth/securityInterceptor');

app.config(['$stateProvider', route])
   .run(['$rootScope', loginInterceptor]);


function route($stateProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'modules/auth/login.html',
            data: {pageTitle: '登录', pageSubTitle: ''},
            controller: 'loginController'
        })
        .state('register', {
            url: '/register',
            templateUrl: 'modules/auth/register.html',
            data: {pageTitle: '注册', pageSubTitle: ''}
        })
    ;
}

function loginInterceptor($rootScope){
    $rootScope.$on('$stateChangeStart',
        function (event, toState/*, toParams, fromState, fromParams*/) {
        });
}