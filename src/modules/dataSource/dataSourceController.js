require('filter/dataSourceStatus');
require('service/dataSource');

app.controller('dataSourceController', ['$scope', 'dataSourceService', 'hngMsg', 'hngModal', dataSourceController]);

function dataSourceController($scope, dataSourceService, hngMsg, hngModal) {
    $scope.current = 1;
    $scope.pageSize = 10;

    // 分页
    $scope.pagination = function () {
        dataSourceService.search($scope.current, $scope.pageSize)
            .then(function (result) {
                $scope.total = result.total;
                $scope.data = result.data;
            });
    };

    // 全部选择/取消全选
    $scope.toggleCheckAll = function ($event) {
        var checked = $event.target.checked;
        angular.forEach($scope.data, function (item) {
            item.__checked = checked;
        });
    };

    // 当前选择数据
    $scope.selection = function () {
        var selection = [];

        angular.forEach($scope.data, function (item) {
            if (item.__checked)
                selection.push(item);
        });

        return selection;
    };

    $scope.remove = function (items) {
        if (!angular.isArray(items)) {
            items = [].push(items);
        }

        if (!items.length) {
            return;
        }

        hngMsg.confirm('是否删除当前选择项？')
            .then(function (result) {
                if (result) {
                    var total = items.length;
                    var $progress = hngMsg.progress('正在删除...', total);

                    var progress = function (result) {
                        if (result.success) {
                            $progress.increment('success');
                        }
                        else {
                            $progress.increment('danger');
                        }

                        return doRemove();
                    };

                    var doRemove = function () {
                        if (items.length) {
                            return dataSourceService.removeById(items.pop().Id).then(progress);
                        }
                        /*else {
                         $progress.complete();
                         // $scope.pagination();
                         }*/
                    };

                    $progress.result.then(function () {
                        return hngMsg.alert(
                            '删除成功: ' + $progress.getValue('success') +
                            '删除失败: ' + $progress.getValue('danger'));
                    }).then(function () {
                        $scope.pagination();
                    });
                    return doRemove();
                }
            });
    };

    $scope.pagination();

    $scope.add = function () {
        var dialog = hngModal.show('modules/dataSource/edit.html', 'dataSourceEditController', {});
        dialog.closed.then(function (result) {
            if (result) {
                $scope.pagination();
            }
        });
    };
}