/**
 * Created by hongyuan on 2015/11/9.
 */

var modules = require('./core');
require('./components/utilities/setting');
require('./modules/frontend/main');
require('./modules/admin/main');
require('./modules/account/main');
require('./modules/user/main');

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

    $rootScope.$on('$stateChangeSuccess', function(){
        $uibModalStack.dismissAll();
    });
}

modules.root.run(['$rootScope', '$state', 'setting', '$uibModalStack', run]);