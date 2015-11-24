/**
 * Created by hongyuan on 2015/11/13.
 */
require('utility/msg');
require('service/menu');
require('directive/spinnerBar');
require('directive/pageSidebar');

function headerController($scope, setting){
    $scope.toggleSidebar = function(){
        setting.layout.pageSidebarClosed = !setting.layout.pageSidebarClosed;
    };
}

function navbarController($scope, menuService) {
    $scope.menus = [];

    menuService.authorizationMenus()
        .then(function (menus) {
            $scope.menus = menus;
        });
}

app.controller('headerController', ['$scope', 'setting', headerController])
   .controller('navbarController', ['$scope', 'menuService', navbarController]);