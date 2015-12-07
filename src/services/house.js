app.service('houseService', ['$http', '$q', houseService]);

function houseService($http, $q) {
    var list = [
    { Id: '0001', Type: 1, Address: '中山区', Status: 1 },
    { Id: '0002', Type: "出租", Address: '沙河口区', Status: 2 },
    { Id: '0003', Type: 2, Address: '西岗区', Status: 3 },
    { Id: '0004', Type: "出售", Address: '甘井子区', Status: 4 },
    ];

    this.search = function (page, limit) {
        var defer = $q.defer();

        setTimeout(function () {
            var total = list.length;
            var data = [];
            for (var i = (page - 1) * limit; i < page * limit && i < total; i++) {
                data.push(list[i]);
            }
            defer.resolve(data);
        }, 1000);
        return defer.promise;
    }

    this.count = function () {
        var defer = $q.defer();

        setTimeout(function () {
            defer.resolve(list.length);
        }, 1000);
        return defer.promise;
    }
}