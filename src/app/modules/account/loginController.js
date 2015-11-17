/**
 * Created by hongyuan on 2015/11/16.
 */
require('../../core');
require('../../components/services/user');

function loginController($scope, $location, userService) {
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

angular.module('example')
    .controller('loginController', ['$scope', '$location', 'userService', loginController]);