import core from '../common/core';
import layout from './layout/';

class settings {
    constructor() {
    }
}

function routing($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/admin');

    var index = {
        name: 'index',
        url: '/admin',
        data: {title: '后台管理'},
        template: '<div><h3>后台管理</h3></div>'
    };

    $stateProvider.state(index);
}

export default angular.module('simple.admin.modules', [
        core,
        layout
    ])
    .constant('settings', new settings())
    .config(routing)
    .name;