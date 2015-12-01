/**
 * Created by hongyuan on 2015/11/9.
 */

require('core');
require('utility/setting');

require('frontend/frontend.config');
require('auth/auth.config');
require('backend/backend.config');
require('dashboard/dashboard.config');
require('user/user.config');
require('dataSource/dataSource.config');
require('employee/employee.config');
require('house/house.config');

app.run(['$rootScope', '$state', 'auth', 'setting',run]);

function run($rootScope, $state, auth, setting) {
    $rootScope.$state = $state;
    $rootScope.setting = setting;
    $rootScope.auth = auth;
}