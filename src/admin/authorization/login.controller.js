class LoginController {
    constructor($scope) {
        this.$scope = $scope;
        this.message = 'Hello, World!';
    }
}

LoginController.$inject = ['$scope'];

export default LoginController;