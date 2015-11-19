/**
 * Created by wowhy on 2015/11/16.
 */
var modules = require('../../core');
require('./frontendController');

function route($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('frontend', {
            url: '/',
            templateUrl: 'app/modules/frontend/layout/index.html',
            data: { pageTitle: '主页', pageSubTitle: ''},
            controller: 'frontendController'
        })
    ;
}

modules.root.config(['$stateProvider', '$urlRouterProvider', route]);
