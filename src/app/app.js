/**
 * Created by hongyuan on 2015/11/9.
 */

require('./core');
require('./components/utilities/setting');
require('./modules/home/main');
require('./modules/account/main');
require('./modules/user/main');

function run($rootScope, $state, setting) {
    $rootScope.$state = $state;
    $rootScope.setting = setting;

    $rootScope.$on('$stateChangeStart',
        function (event, toState/*, toParams, fromState, fromParams*/) {
            if (toState.name.indexOf('home') != -1) {
                if (!setting.isAuthenticated) {
                    event.preventDefault();
                    setTimeout(function () {
                        $state.go('login', {}, {});
                    }, 0);
                }
            }
        });
}

angular.module('example')
    .run(['$rootScope', '$state', 'setting', run]);