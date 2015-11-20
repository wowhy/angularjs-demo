/**
 * Created by hongyuan on 2015/11/16.
 */
var modules = require('../../core');
require('../../components/services/user');

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

modules.root.controller('loginController', ['$scope', '$location', 'userService', loginController]);