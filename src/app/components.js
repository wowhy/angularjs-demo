(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function menuService($http, $q){
	this.authorizationMenus = function() {
		var menus = [
			{ name: '仪表板', url: '/dashboard' },
			{ name: '权限管理系统', menus: [{name: '用户管理', url: '/rms/user'}] }
		];
		
		var defer = $q.defer();
		
		setTimeout(function(){
			defer.resolve(menus);
		}, 200);
		
		return defer.promise;
	}
}

angular.module('example.service')
	   .service('menuService', ['$http', '$q', menuService]);
},{}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
function msgFactory($uibModal, setting){
    var msg = {};
    
    msg.confirm = function (model) {
        if (!model.ok) {
            model.ok = '确定';
        }
        if (!model.cancel) {
            model.cancel = '取消';
        }

        return $uibModal.open({
            templateUrl: 'app/templates/confirm.html',
            backdrop: 'static',
            controller: ['$scope', '$modalInstance', 'args', function ($scope, $modalInstance, args) {
                $scope.ok = function () {
                    $modalInstance.close(true);
                }

                $scope.cancel = function () {
                    $modalInstance.close(false);
                }

                $scope.model = args;
            }],
            resolve: {
                args: function () {
                    return model;
                }
            }
        }).result;
    };
    
    msg.notify = function(content, options){
        alert(content);
    }
    
    return msg;
}

angular.module('example.utility')
       .factory('msg', ['$uibModal', msgFactory]);
},{}],4:[function(require,module,exports){
function settingFactory(){
	var setting = {
		applicationName: '培训管理系统'
	};
	return setting;
}

angular.module('example.utility')
	   .factory('setting', [settingFactory]);
},{}]},{},[1,2,3,4]);
