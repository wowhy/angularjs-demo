function aboutController($scope){
	console.log('about');
}

angular.module('example')
	   .controller('aboutController', ['$scope', aboutController]);