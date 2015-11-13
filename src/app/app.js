/**
 * Created by hongyuan on 2015/11/9.
 */
// window.$ = window.jQuery = require('../libs/jquery/dist/jquery');
//require('../libs/angular');
//require('../libs/angular-ui-router/release/angular-ui-router');
//require('../libs/angular-bootstrap/ui-bootstrap-tpls');
//require('../libs/angular-ui-grid/ui-grid');

angular.module('example.utility', ['ui.router', 'ui.bootstrap']);
angular.module('example.service', ['example.utility']);
angular.module('example', [
    'example.service',
    'example.utility',
    'ui.router',
    'ui.bootstrap'
]);

require('./components/utilities/setting');
require('./modules/home/homeController');
require('./modules/home/dashboardController');
require('./modules/home/aboutController');



function run($rootScope, $state, setting){
    $rootScope.$state = $state;
    $rootScope.setting = setting;
}

function route($stateProvider, $urlRouterProvider){
    var home = {
        templateUrl: 'app/modules/home/index.html',
        controller: 'homeController'
    }

    $urlRouterProvider
        .when('', '/dashboard')
        .otherwise('/404');

    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'app/modules/login/index.html'
        })
        .state('404', {
            url: '/404',
            templateUrl: 'app/templates/404.html'
        })
        .state('dashboard', {
            url: '/dashboard',
            views: {
                '': home,
                'page': {
                    templateUrl: 'app/modules/home/dashboard.html',
                    controller: 'dashboardController'
                }
            }
        })
        .state('about', {
            url: '/about',
            templateUrl: 'app/modules/home/about.html',
            controller: 'aboutController'
        })
    ;
}

angular.module('example')
    .config(['$stateProvider', '$urlRouterProvider', route])
    .run(['$rootScope', '$state', 'setting', run]);