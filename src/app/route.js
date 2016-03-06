function route($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    var index = {
        name: 'index',
        url: '/',
        data: {title: '前台'},
        template: '<div><h3>前台</h3></div>'
    };

    $stateProvider.state(index);
}

route.$inject = ['$stateProvider', '$urlRouterProvider'];

export default route;