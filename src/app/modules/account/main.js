/**
 * Created by hongyuan on 2015/11/16.
 */

require('../../core');
require('./loginController');

function route($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'app/modules/account/login.html',
            data: {pageTitle: '登录', pageSubTitle: ''},
            controller: 'loginController'
        })
    ;
}

angular.module('example').config(['$stateProvider', '$urlRouterProvider', route]);