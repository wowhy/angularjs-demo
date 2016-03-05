import core from '../common/core';
import modules from './admin.config.js';

export default angular.module('sample.admin', [core, modules])
    .run(function ($rootScope, settings) {
        $rootScope.settings = settings;
    })
    .name;