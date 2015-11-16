/**
 * Created by hongyuan on 2015/11/16.
 */
require('../../core');
require('../../components/utilities/setting');

function loginController($scope, $location, setting) {
    $scope.login = function () {
        setting.setAuth($scope.username);
        $location.path('/dashboard');
    }
}

angular.module('example')
    .controller('loginController', ['$scope', '$location', 'setting', loginController]);