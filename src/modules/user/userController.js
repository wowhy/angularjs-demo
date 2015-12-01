require('service/user');

function userController($scope, userService, msg) {
    $scope.list = [];

    //$scope.gridOptions = {
    //	data: 'list',
    //	columnDefs: [
    //		{ field: 'Code', displayName: '用户代码', width: '20%' },
    //		{ field:'Name', displayName: '姓名', width: '*' },
    //		{ field:'Email', displayName: '邮箱', width: '30%' },
    //		{ field:'Status', displayName: '状态', width: 80, cellFilter: 'userStatus' }
    //	]
    //};

    //userService.search(1, 100, {})
    //    .then(function (result) {
    //        $scope.list = result.data;
    //    });
}

app.filter('userStatus', [function () {
        return function (value) {
            switch (value) {
                case 1:
                    return '有效';

                default:
                    return '无效';
            }
        }
    }])
    .controller('userController', ['$scope', 'userService', 'msg', userController]);