function route($stateProvider) {
    let login = {
        name: 'login',
        url: '/login',
        data: {title: '登录'},
        template: '<div><h3>登录页面</h3></div>'
    };

    $stateProvider.state(login);
}

route.$inject = ['$stateProvider'];

export default route;