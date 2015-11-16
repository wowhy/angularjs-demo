/**
 * Created by wowhy on 2015/11/16.
 */
require('../../core');

function route($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('frontend', {
            url: '/',
            templateUrl: 'app/modules/frontend/index.html',
            data: {pageTitle: '主页', pageSubTitle: ''}
        })
    ;
}

angular.module('example').config(['$stateProvider', '$urlRouterProvider', route]);
