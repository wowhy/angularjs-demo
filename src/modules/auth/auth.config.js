require('auth/permission');
require('auth/session');
require('auth/securityInterceptor');
require('auth/auth');
require('auth/loginController');

app.config(['$stateProvider', route])
   .run(['$rootScope', '$state', '$location', 'auth', 'session', 'setting', loginInterceptor]);


function route($stateProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
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

function loginInterceptor($rootScope, $state, $location, auth, session, setting){
    $rootScope.$on('$stateChangeStart',
        function (event, toState/*, toParams, fromState, fromParams*/) {
            if(toState.name == 'frontend'||
               toState.name == 'register') {
                setting.layout.path = 'modules/frontend/index.html';
                return;
            }

            if(toState.name == 'login'){
                setting.layout.path = 'modules/frontend/index.html';
                session.clear();
            }else {
                if (!!toState.skipAuth) {
                    setting.layout.path = 'modules/frontend/index.html';
                    return;
                }

                setting.layout.path = 'modules/backend/layout/index.html';

                if (!auth.isLogin()) {
                    setTimeout(function () {
                        $state.go('login');
                    }, 0);
                    event.preventDefault();
                    return;
                }

                // check permission
                // todo
            }
        });

    $rootScope.$on('$stateChangeSuccess', function(){
        if($location.search().popup) {
            angular.element('body').addClass('popup');
        }
    });

    $rootScope.$watch(function(){
        return session.sessionId;
    }, function(){
        // todo
    });
}