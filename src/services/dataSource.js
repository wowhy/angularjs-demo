app.service('dataSourceService', ['$http', '$q', dataSourceService]);

function dataSourceService($http, $q) {
    var all = [
        { Code: '1', Name: '123', Database: '123', Server: '123', Status: 1 },
        { Code: '2', Name: '1223', Database: '1d23', Server: '123', Status: 1 },
        { Code: '3', Name: '1223', Database: '123f', Server: '123', Status: 2 },
        { Code: '4', Name: '1d23', Database: '12x3', Server: '123', Status: 2 },
        { Code: '5', Name: '12a3', Database: '1a23', Server: '123', Status: 1 }
    ];

    this.search = function (page, limit) {
        var defer = $q.defer();
        setTimeout(function () {
            var total = all.length;
            var data = [];

            for (var i = (page - 1) * limit; (i < page * limit) && i < total; i++) {
                data.push(all[i]);
            }

            defer.resolve(data);
        }, 2000);

        return defer.promise;
    }

    this.count = function () {
        var defer = $q.defer();
        setTimeout(function () {
            defer.resolve(all.length);
        }, 1000);

        return defer.promise;
    }
}