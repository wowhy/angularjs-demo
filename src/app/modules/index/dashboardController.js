require('../../components/utilities/msg');

function dashboardController($scope, msg){
    msg.confirm({text: 'Hello, Dashboard!'});
}

angular.module('example.index')
	   .controller('dashboardController', ['$scope', 'msg', dashboardController]);