/**
 * Created by hongyuan on 2015/11/16.
 */

var modules = require('../../core');
require('./userController');

function route($stateProvider) {
    $stateProvider
        .state('admin.user', {
            url: '/user',
            data: {pageTitle: '用户管理', pageSubTitle: '列表'},
            views: {
                'page@admin': {
                    templateUrl: 'app/modules/user/user-list.html',
                    controller: 'userController'
                }
            }
        })
    ;
}

modules.root.config(['$stateProvider', route]);