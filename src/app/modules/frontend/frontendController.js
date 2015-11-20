/**
 * Created by hongyuan on 2015/11/17.
 */
var modules = require('../../core');
require('../../components/services/menu');
require('../../components/services/user');
require('../../components/utilities/modal');

function frontendController($scope, modal, menuService, userService) {
    $scope.slides = [{
        image: 'assets/global/img/layerslider/slide1/bg.jpg',
        title: 'Hi',
        content: 'This is Slide 1'
    }, {
        image: 'assets/global/img/layerslider/slide2/bg.jpg',
        title: 'Hi!',
        content: 'This is Slide 2'
    }, {
        image: 'assets/global/img/layerslider/slide3/bg.jpg',
        title: 'Hi!!!',
        content: 'This is Slide 3'
    }, {
        image: 'assets/global/img/layerslider/slide5/bg.jpg',
        title: 'Hi!!!!',
        content: 'This is Slide 4'
    }];

    $scope.menus = [];

    $scope.login = function(){
        modal.show('app/modules/account/login.html', 'loginController', 'login');
    };

    $scope.logout = function(){
        userService.logout();
    };

    menuService.frontendMenus()
        .then(function (menus) {
            $scope.menus = menus;
        });
}

modules.root.controller('frontendController', ['$scope', 'modal', 'menuService', 'userService', frontendController]);