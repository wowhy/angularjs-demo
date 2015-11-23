require('service/user');

function loginController($scope, $state, userService, setting) {
    $scope.login = function () {
        userService.login($scope.username, $scope.password)
            .then(function (result) {
                if (result.success) {
                    setting.layout.path = 'modules/backend/layout/index.html';
                    $state.go('dashboard', {});
                } else {
                    alert(result.message);
                }
            });
    }
}

app.controller('loginController', ['$scope', '$state', 'userService', 'setting', loginController]);