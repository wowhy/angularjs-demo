function userService($http, $q) {
    this.add = function (user) {
        var $post = {
            Code: user.Code,
            Name: user.Name,
            Email: user.Email,
            CreatedOn: new Date(),
            Status: 1
        };

        return $http({
            method: 'POST',
            url: 'http://localhost:45020/DataService.svc/Users',
            data: $post
        }).then(function (data) {
            var result = {};
            if (data.status == 201) {
                result.success = true;
                result.message = "添加成功！";
            } else {
                result.success = false;
                result.message = data.data;
            }

            return result;
        });
    }

    this.edit = function (user) {
        var $patch = {
            Code: user.Code,
            Name: user.Name,
            Email: user.Email
        };

        return $http({
            method: 'PATCH',
            url: 'http://localhost:45020/DataService.svc/Users(' + user.Id + ')', 
            data: $patch
        }).then(function (data) {
            var result = {};
            if (data.status == 204 || data.status == 200) {
                result.success = true;
                result.message = "修改成功！";
            } else {
                result.success = false;
                result.message = data.data;
            }

            return result;
        });
    }

    this.removeById = function (id) {
        return $http({ method: 'DELETE', url: 'http://localhost:45020/DataService.svc/Users(' + id + ')' }).then(function (data) {
            var result = {};
            if (data.status == 204 || data.status == 200) {
                result.success = true;
                result.message = "删除成功！";
            } else {
                result.success = false;
                result.message = data.data;
            }

            return result;
        });
    }

    this.getById = function (id) {
        return $http.get('http://localhost:45020/DataService.svc/Users(' + id + ')').then(function (data) {
            return data.data;
        });
    }

    this.search = function (page, limit, filter) {
        // http://localhost:1234/DataService.svc/Users?$skip=20&$top=20
        var $filter = {};
        var $total = $http.get('http://localhost:45020/DataService.svc/Users/$count'/*, { params: { $filter: $filter } }*/);
        var $data = $http.get('http://localhost:45020/DataService.svc/Users', {
            params: {
                $skip: (page - 1) * limit,
                $top: limit /*,
                $filter: concatFilter(filter)*/
            }
        });

        return $q.all([$total, $data]).then(function (response) {
            return {
                total: parseInt(response[0].data),
                data: response[1].data.value
            };
        });
    }
}

angular.module('example.service')
	   .service('userService', ['$http', '$q', userService]);