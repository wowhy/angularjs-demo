/**
 * Created by hongyuan on 2015/11/9.
 */

require('core');
require('utility/setting');

require('admin/main');
require('frontend/main');
require('account/main');
require('user/main');

app.run(['$rootScope', '$state', 'setting', '$uibModalStack', run]);

function run($rootScope, $state, setting, $uibModalStack) {
    $rootScope.$state = $state;
    $rootScope.setting = setting;

    $rootScope.$on('$stateChangeStart',
        function (event, toState/*, toParams, fromState, fromParams*/) {
            if (toState.name.indexOf('admin') != -1) {
                if (!setting.isAuthenticated) {
                    event.preventDefault();
                    setTimeout(function () {
                        $state.go('frontend', {}, {});
                    }, 0);
                }
            }
        });

    $rootScope.$on('$stateChangeSuccess', function () {
        $uibModalStack.dismissAll();
    });
}