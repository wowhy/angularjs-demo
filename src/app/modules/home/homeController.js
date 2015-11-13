/**
 * Created by hongyuan on 2015/11/13.
 */
require('../../components/utilities/msg');
require('../../components/services/menu');

function homeController($scope, menuService){
    $scope.menus = [];

    menuService.authorizationMenus()
        .then(function(menus){
            $scope.menus = menus;
        });
}

angular.module('example')
    .controller('homeController', ['$scope', 'menuService', homeController])