function menuService($http, $q){
	this.authorizationMenus = function() {
		var menus = [
			//{ name: '仪表板', url: '/dashboard' },
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