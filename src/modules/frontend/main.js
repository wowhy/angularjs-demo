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
            templateUrl: 'modules/frontend/layout/index.html',
            data: { pageTitle: '主页', pageSubTitle: ''},
            controller: 'frontendController'
        })
    ;
}

app.config(['$stateProvider', '$urlRouterProvider', route]);
