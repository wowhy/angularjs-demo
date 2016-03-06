function route($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/admin');

    var index = {
        name: 'index',
        url: '/',
        data: {title: '后台管理'},
        template: '<div><h3>后台管理</h3></div>'
    };

    $stateProvider.state(index);
}

route.$inject = ['$stateProvider', '$urlRouterProvider'];

export default route;