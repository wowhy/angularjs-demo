/**
 * Created by hongyuan on 2015/11/13.
 */
var modules = require('../../core');
require('../../components/utilities/msg');
require('../../components/services/menu');
require('../../components/directives/spinnerBar');

function adminController($scope, menuService){
    $scope.menus = [];

    menuService.authorizationMenus()
        .then(function(menus){
            $scope.menus = menus;
        });
}

modules.root.controller('adminController', ['$scope', 'menuService', adminController])