var modules = require('../../core');
require('../../components/utilities/msg');

function dashboardController($scope, msg){
    msg.confirm({text: 'Hello, Dashboard!'});
}

modules.root.controller('dashboardController', ['$scope', 'msg', dashboardController]);