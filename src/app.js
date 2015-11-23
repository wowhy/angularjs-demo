/**
 * Created by hongyuan on 2015/11/9.
 */

require('core');
require('utility/setting');

require('frontend/frontend.config');
require('auth/auth.config');
require('backend/backend.config');
require('dashboard/dashboard.config');

app.run(['$rootScope', '$state', 'setting', '$uibModalStack', run]);

function run($rootScope, $state, setting, $uibModalStack) {
    $rootScope.$state = $state;
    $rootScope.setting = setting;

    $rootScope.$on('$stateChangeSuccess', function () {
        $uibModalStack.dismissAll();
    });
}