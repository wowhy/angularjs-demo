/**
 * Created by hongyuan on 2015/11/13.
 */
require('../../components/utilities/msg');
require('../../components/services/menu');

function indexController($scope, menuService){
    $scope.menus = [];

    menuService.authorizationMenus()
        .then(function(menus){
            $scope.menus = menus;
        });
}

angular.module('example.index')
    .controller('indexController', ['$scope', 'menuService', indexController])