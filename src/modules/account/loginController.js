require('service/user');

function loginController($scope, $location, userService, $uibModalInstance) {
    $scope.login = function () {
        userService.login($scope.username, $scope.password)
            .then(function (result) {
                if (result.success) {
                    $location.path('/dashboard');
                } else {
                    alert(result.message);
                }
            });
    }
}

app.controller('loginController', ['$scope', '$location', 'userService', loginController]);