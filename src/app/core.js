/**
 * Created by hongyuan on 2015/11/16.
 */

// window.$ = window.jQuery = require('../libs/jquery/dist/jquery');
// require('../libs/angular');
// require('../libs/angular-ui-router/release/angular-ui-router');
// require('../libs/angular-bootstrap/ui-bootstrap-tpls');
// require('../libs/angular-ui-grid/ui-grid');

angular.module('example.utility', ['ngLocale', 'ngTouch', 'ngAnimate', 'ui.router', 'ui.bootstrap']);
angular.module('example.service', ['example.utility']);
angular.module('example', [
    'example.service',
    'example.utility',
    'ngLocale',
    'ngTouch',
    'ngAnimate',
    'ui.router',
    'ui.bootstrap',
    'ui.grid'
]);