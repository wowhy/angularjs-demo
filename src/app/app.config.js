import core from '../common/core';

class settings {
    constructor() {
    }
}

function routing($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    var index = {
        name: 'index',
        url: '/',
        data: {title: '前台'},
        template: '<div><h3>前台</h3></div>'
    };

    $stateProvider.state(index);
}

export default angular.module('simple.app.modules', [
        core
    ])
    .constant('settings', new settings())
    .config(routing)
    .name;