/**
 * Created by hongyuan on 2015/11/16.
 */

// window.$ = window.jQuery = require('../libs/jquery/dist/jquery');
// require('../libs/angular');
// require('../libs/angular-ui-router/release/angular-ui-router');
// require('../libs/angular-bootstrap/ui-bootstrap-tpls');
// require('../libs/angular-ui-grid/ui-grid');

var modules = {
};

modules.utilities = angular.module('example.utility', ['ngLocale', 'ngTouch', 'ngAnimate', 'ui.router', 'ui.bootstrap']);
modules.services = angular.module('example.service', ['example.utility']);
modules.directives = angular.module('example.directive', ['example.utility']);
modules.root = angular.module('example', [
    'example.directive',
    'example.service',
    'example.utility',
    'ngLocale',
    'ngTouch',
    'ngAnimate',
    'ui.router',
    'ui.bootstrap'
]);

module.exports = modules;