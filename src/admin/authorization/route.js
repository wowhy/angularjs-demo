import LoginController from './login.controller';

function route($stateProvider) {
    let login = {
        name: 'login',
        url: '/login',
        data: {title: '登录'},
        template: '<div><h3>{{vm.message}}</h3></div>',
        controller: LoginController,
        controllerAs: 'vm'
    };

    $stateProvider.state(login);
}

route.$inject = ['$stateProvider'];

export default route;