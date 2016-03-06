import core from '../common/core';
import route from './route.js';

const module = angular.module('sample', [core])
    .config(route);

export default module;