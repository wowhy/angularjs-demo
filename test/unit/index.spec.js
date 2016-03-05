//import angular from 'angular';
//import mocks from 'angular-mocks';
import assert from 'assert';

var testsContext = require.context(".", true, /\.spec.js/);
testsContext.keys().forEach(testsContext);