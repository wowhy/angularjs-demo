function settingFactory(){
	var setting = {
		applicationName: '培训管理系统'
	};
	return setting;
}

angular.module('example.utility')
	   .factory('setting', [settingFactory]);