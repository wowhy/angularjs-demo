function aboutController($scope){
	console.log('about');
}

angular.module('example.index')
	   .controller('aboutController', ['$scope', aboutController]);