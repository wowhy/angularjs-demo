app.service('dataSourceService', ['$http', '$q', dataSourceService]);

function dataSourceService($http, $q) {
    var all = [
        {Id: 1, Code: '1', Name: '123', Database: '123', Server: '123', Status: 1},
        {Id: 2, Code: '2', Name: '1223', Database: '1d23', Server: '123', Status: 1},
        {Id: 3, Code: '3', Name: '1223', Database: '123f', Server: '123', Status: 2},
        {Id: 4, Code: '4', Name: '1d23', Database: '12x3', Server: '123', Status: 2},
        {Id: 5, Code: '5', Name: '12a3', Database: '1a23', Server: '123', Status: 1}
    ];

    this.search = function (page, limit, order, filter) {
        var defer = $q.defer();
        setTimeout(function () {
            var total = all.length;
            var data = [];

            for (var i = (page - 1) * limit; (i < page * limit) && i < total; i++) {
                data.push(all[i]);
            }

            defer.resolve({
                total: all.length,
                data: data
            });
        }, 300);

        return defer.promise;
    };

    this.removeById = function (id) {
        var defer = $q.defer();
        angular.forEach(all, function(item, i){
            if(item.Id === id){
                all.splice(i, 1);
                return false;
            }
        });

        setTimeout(function(){
            defer.resolve({
                success: true,
                message: '删除成功'
            });
        }, 300);

        return defer.promise;
    };
}