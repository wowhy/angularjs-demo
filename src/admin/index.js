import core from '../common/core';
import settings from './settings';
import route from './route';
import layout from './layout';

let module = angular.module('sample.admin', [
        core,
        layout
    ])
    .constant('settings', settings)
    .config(route)
    .run(function ($rootScope, settings) {
        $rootScope.settings = settings;
    });


export default module.name;