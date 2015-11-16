require('../../core');
require('../../components/utilities/msg');

function dashboardController($scope, msg){
    msg.confirm({text: 'Hello, Dashboard!'});
}

angular.module('example')
	   .controller('dashboardController', ['$scope', 'msg', dashboardController]);