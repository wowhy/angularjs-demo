app.service('employeeService',['$http','$q',employeeService]);

function employeeService($http,$q) {
    var all = [
		{ Code: 'aaaakkkkd', Name: '家电及', Gander: '1', Age: '32', Status: '1' },
		{ Code: 'fgf', Name: '味儿', Gander: '1', Age: '12', Status: '1' },
		{ Code: 'fg', Name: '二五二', Gander: '2', Age: '2', Status: '0' },
		{ Code: 'hjk', Name: '我里', Gander: '2', Age: '12', Status: '1' },
		{ Code: 'hj', Name: '玩儿', Gander: '2', Age: '32', Status: '1' },
		{ Code: 'rty', Name: '金坷垃', Gander: '0', Age: '56', Status: '0' },
		{ Code: 'uio', Name: '水电费', Gander: '0', Age: '98', Status: '0' }
    ];

    this.search = function (page,limit) {
        var defer = $q.defer();
        var data = all;
        defer.resolve(data);
        return defer.promise;
    }
};