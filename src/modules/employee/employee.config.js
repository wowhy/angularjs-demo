require('employee/employeeController');

app.config(['$stateProvider', router]);

function router($stateProvider) {
    $stateProvider.state('employee', {
        url:'/employee',
        data:{ pageTitle:'职员管理',pageSubTitle:'列表'},
        templateUrl:'modules/employee/list.html',
        controller:'employeeController'
    });
}