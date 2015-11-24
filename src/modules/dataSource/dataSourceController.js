require('filter/dataSourceStatus');
require('service/dataSource');

app.controller('dataSourceController', ['$scope', 'dataSourceService', dataSourceController]);

function dataSourceController($scope, dataSourceService) {
    $scope.current = 1;
    $scope.pageSize = 3;

    $scope.pagination = function () {
        dataSourceService.count().then(function (total) {
            $scope.total = total;
        });

        dataSourceService.search($scope.current, $scope.pageSize)
            .then(function (data) {
                $scope.data = data;
            });

        //$scope.total = dataSourceService.count();
        //$scope.data = dataSourceService.search($scope.current, $scope.pageSize);
    }

    $scope.pagination();
}