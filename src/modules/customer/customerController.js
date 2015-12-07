/**
 * Created by juym on 2015/11/19.
 */
require('filter/customerStatus');
require('service/customer');

function customerController($scope, $location, $uibModal, hngMsg, customerService) {
    $scope.loadingState = 0;

    $scope.sampleShow = true;
    $scope.complexShow = false;

    $scope.quickSearch = function () {
        $scope.complexShow = !$scope.complexShow;
        $scope.sampleShow = !$scope.sampleShow;
    }

    $scope.size = 5;
    $scope.search = function (pagination) {
        if (!pagination) {
            $scope.current = 1;
        }

        customerService.search($scope.current, $scope.size)
                   .then(function (result) {
                       $scope.list = result.data;
                       $scope.total = result.total;
                   });

        $scope.chkAll = false;
    }

    //$scope.save = function () {
    //    var datasource = {
    //        Id: 3,
    //        Code: $scope.model.Code,
    //        Name: $scope.model.Name,
    //        Database: $scope.model.Database,
    //        Product: $scope.model.Product,
    //        Status: 1
    //    };

    //    msg.confirm({ text: '是否添加?' }).then(function (ok) {
    //        if (!ok) {
    //            return;
    //        }

    //        $scope.disable = true;
    //        return customerService.add(datasource);
    //    }).then(function (result) {
    //        if (result) {
    //            $location.path('/reportdatasource');
    //        }
    //    });
    //}

    $scope.search(false);

    $scope.all = function (c, v) {//全选
        angular.forEach(v, function (chk) {
            chk.__checked = c;
        })
    };

    $scope.removeAll = function () {
        var data = [];

        angular.forEach($scope.list, function (item) {
            if (item.__checked) {
                data.push(item);
            }
        });

        if (data.length == 0) {
            hngMsg.alert('请选择要删除的数据！', '提示');
            return;
        }

        customerService.remove(data)
                         .then(function () {
                             hngMsg.alert('删除成功');
                             $scope.search(false);
                         });
    }

    $scope.back = function (dirty) {
        if (dirty) {
            hngMsg.confirm('当前有未保存的数据， 是否放弃修改？?', '提示')
                             .then(function (result) {
                                 if (result) {
                                     $location.path('/customer');
                                 }
                             });
        } else {
            $location.path('/customer');
        }
    }
}

app.controller('customerController', ['$scope', '$location', '$uibModal', 'hngMsg', 'customerService', customerController]);