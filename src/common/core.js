export default angular.module('sample.core', [
// angular modules
    'ng',
    'ngLocale',
    'ngTouch',
    'ngAnimate',
    'ngSanitize',

// 3rd-party modules
    'ui.router',
    'ui.bootstrap',
    'blockUI'
]).config(['$locationProvider', function ($locationProvider) {
    //$locationProvider.html5Mode(true);
}]).run(function ($rootScope, $state) {
    $rootScope.$state = $state;
}).name;