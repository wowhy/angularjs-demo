/**
 * Created by hongyuan on 2015/11/16.
 */

require('../../core');
require('./userController');

function route($stateProvider) {
    $stateProvider
        .state('admin.user', {
            url: '/user',
            data: {pageTitle: '用户管理', pageSubTitle: '列表'},
            views: {
                'page@admin': {
                    templateUrl: 'modules/user/user-list.html',
                    controller: 'userController'
                }
            }
        })
    ;
}

app.config(['$stateProvider', route]);