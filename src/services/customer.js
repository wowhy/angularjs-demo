function customerService($http, $q) {
    if (window.sessionStorage.getItem('list') == undefined) {
        var list = [
            { Id: '1', Code: 'ZhangS', Name: '张三', Tel: '18612345678', ShareStatus: '组内共享', Level: '不详', Status: 1 },
            { Id: '1', Code: 'LiS', Name: '李四', Tel: '18912345678', ShareStatus: '组内共享', Level: '不详', Status: 2 },
            { Id: '1', Code: 'ZhangS', Name: '张三', Tel: '18612345678', ShareStatus: '组内共享', Level: '不详', Status: 1 },
            { Id: '1', Code: 'LiS', Name: '李四', Tel: '18912345678', ShareStatus: '组内共享', Level: '不详', Status: 2 },
            { Id: '1', Code: 'ZhangS', Name: '张三', Tel: '18612345678', ShareStatus: '组内共享', Level: '不详', Status: 1 },
            { Id: '1', Code: 'LiS', Name: '李四', Tel: '18912345678', ShareStatus: '组内共享', Level: '不详', Status: 2 },
            { Id: '1', Code: 'ZhangS', Name: '张三', Tel: '18612345678', ShareStatus: '组内共享', Level: '不详', Status: 1 },
            { Id: '1', Code: 'LiS', Name: '李四', Tel: '18912345678', ShareStatus: '组内共享', Level: '不详', Status: 2 },
            { Id: '1', Code: 'ZhangS', Name: '张三', Tel: '18612345678', ShareStatus: '组内共享', Level: '不详', Status: 1 },
            { Id: '1', Code: 'LiS', Name: '李四', Tel: '18912345678', ShareStatus: '组内共享', Level: '不详', Status: 2 },
            { Id: '1', Code: 'ZhangS', Name: '张三', Tel: '18612345678', ShareStatus: '组内共享', Level: '不详', Status: 1 },
            { Id: '1', Code: 'LiS', Name: '李四', Tel: '18912345678', ShareStatus: '组内共享', Level: '不详', Status: 2 },
            { Id: '1', Code: 'ZhangS', Name: '张三', Tel: '18612345678', ShareStatus: '组内共享', Level: '不详', Status: 1 },
            { Id: '1', Code: 'LiS', Name: '李四', Tel: '18912345678', ShareStatus: '组内共享', Level: '不详', Status: 2 },
            { Id: '1', Code: 'ZhangS', Name: '张三', Tel: '18612345678', ShareStatus: '组内共享', Level: '不详', Status: 1 },
            { Id: '1', Code: 'LiS', Name: '李四', Tel: '18912345678', ShareStatus: '组内共享', Level: '不详', Status: 2 }, ];
        window.sessionStorage.setItem('list', JSON.stringify(list));
    }

    this.search = function (current, size) {
        var d1 = $q.defer();
        var d2 = $q.defer();

        setTimeout(function () {
            var total = JSON.parse(window.sessionStorage.getItem('list')).length;
            d1.resolve(total);
        }, 100);
        setTimeout(function () {
            var data = [];
            var $data = JSON.parse(window.sessionStorage.getItem('list'));
            for (var i = (current - 1) * size; (i < current * size) && (i < $data.length) ; i++) {
                data.push($data[i]);
            }

            d2.resolve(data);
        }, 500);

        return $q.all([d1.promise, d2.promise]).then(function (args) {
            return {
                total: args[0],
                data: args[1]
            };
        });
    };

    this.add = function (datasource) {
        var defer = $q.defer();

        setTimeout(function () {
            var data = JSON.parse(window.sessionStorage.getItem('list'));
            data.push(datasource);
            window.sessionStorage.setItem('list', JSON.stringify(data));

            defer.resolve({
                success: true,
                message: '添加成功'
            });
        }, 1000);

        return defer.promise;
    }

    this.remove = function (list) {
        var defer = $q.defer();

        setTimeout(function () {
            var data = JSON.parse(window.sessionStorage.getItem('list'));

            var current = [],
                flag;
            angular.forEach(data, function (item, i) {
                flag = false;
                angular.forEach(list, function (toRemove, i) {
                    if (item.Code == toRemove.Code) {
                        flag = true;
                        return false;
                    }
                });

                if (!flag) {
                    current.push(item);
                }
            });


            window.sessionStorage.setItem('list', JSON.stringify(current));

            defer.resolve({
                success: true,
                message: '删除成功'
            });
        }, 500);

        return defer.promise;
    }
}

app.service('customerService', ['$http', '$q', customerService]);

