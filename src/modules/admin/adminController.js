/**
 * Created by hongyuan on 2015/11/13.
 */
require('../../core');
require('../../components/utilities/msg');
require('../../components/services/menu');
require('../../components/directives/spinnerBar');
require('../../components/directives/pageSidebar');

function adminController($scope){
}

function headerController($scope, $location, userService, setting){
    $scope.toggleSidebar = function(){
        setting.layout.pageSidebarClosed = !setting.layout.pageSidebarClosed;
    };

    $scope.logout = function(){
        userService.logout().then(function(){
            $location.path('/');
        });
    }
}

function navbarController($scope, menuService) {
    $scope.menus = [];

    menuService.authorizationMenus()
        .then(function (menus) {
            $scope.menus = menus;
        });
}

app.controller('adminController', ['$scope', adminController])
   .controller('headerController', ['$scope', '$location', 'userService', 'setting', headerController])
   .controller('navbarController', ['$scope', 'menuService', navbarController]);