/**
 * Created by wowhy on 2015/11/16.
 */
require('../../core');
require('./frontendController');

function route($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('frontend', {
            url: '/',
            templateUrl: 'app/modules/frontend/index.html',
            data: {pageTitle: '主页', pageSubTitle: ''},
            controller: 'frontendController'
        })
    ;
}

angular.module('example').config(['$stateProvider', '$urlRouterProvider', route]);
