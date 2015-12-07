require('filter/houseStatus');
require('service/house')

app.controller('houseController', ['$scope','houseService', houseController]);

function houseController($scope, houseService) {

    //var list = [
    //    { Id: '0001', Type: "出租", Address: '中山区', Status: 1 },
    //    { Id: '0002', Type: "出租", Address: '沙河口区', Status: 2 },
    //    { Id: '0003', Type: "出售", Address: '西岗区', Status: 3 },
    //    { Id: '0004', Type: "出售", Address: '甘井子区', Status: 4 },
    //];

    //$scope.total = list.length;
    //$scope.current = 1;
    //$scope.pageSize = 3;

    //$scope.pagination = function () {
    //    var total = $scope.total,
    //        page = $scope.current,
    //        pageSize = $scope.pageSize;
    //    var data = [];
    //    for (var i = (page - 1) * pageSize; i < page * pageSize && i < total; i++) {
    //        data.push(list[i]);
    //    }
    //    $scope.data = data;
    //}

    //$scope.pagination();

    $scope.current = 1;
    $scope.pageSize = 3;

    $scope.pagination = function () {
        houseService.count().then(function (total) {
            $scope.total = total;
        })
        houseService.search($scope.current, $scope.pageSize).then(function (data) {
            $scope.data = data;
        })
    }

    $scope.pagination();


}