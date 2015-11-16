/**
 * Created by hongyuan on 2015/11/16.
 */

require('../../core');
require('../home/homeController');
require('./userController');

function route($stateProvider) {
    $stateProvider
        .state('home.user', {
            url: '/user',
            data: {pageTitle: '用户管理', pageSubTitle: '列表'},
            views: {
                'page': {
                    templateUrl: 'app/modules/user/user-list.html',
                    controller: 'userController'
                }
            }
        })
    ;
}

angular.module('example').config(['$stateProvider', route]);