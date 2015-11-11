(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function aboutController($scope){
	
}

angular.module('example.controller')
	   .controller('aboutController', ['$scope', aboutController]);
},{}],2:[function(require,module,exports){
function dashboardController($scope, msg){
}

angular.module('example.controller')
	   .controller('dashboardController', ['$scope', 'msg', dashboardController]);
},{}],3:[function(require,module,exports){
function userController($scope, userService, msg) {
	$scope.list = [];
	
	$scope.gridOptions = {
		data: 'list',
		columnDefs: [
			{ field: 'Code', displayName: '用户代码', width: '20%' },
			{ field:'Name', displayName: '姓名', width: '*' },
			{ field:'Email', displayName: '邮箱', width: '30%' },
			{ field:'Status', displayName: '状态', width: 80, cellFilter: 'userStatus' }
		]
	};
	
	userService.search(1, 100, {})
			   .then(function(result){
				   $scope.list = result.data;
			   });
}

angular.module('example.controller')
	   .filter('userStatus', [function() {
		   return function(value) {
			   switch(value){
				   case 1:
				   	   return '有效';
						   
				   default:
					   return '无效';
			   }
		   }
	   }])
	   .controller('userController', ['$scope', 'userService', 'msg', userController]);
},{}]},{},[1,2,3]);
