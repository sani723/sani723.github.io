(function($){

	var MediaCtrl = function($scope,$http) {
		
		$scope.httpLoad = function(mediaType){
			
			var jsonUri;
			if(mediaType == "video") { jsonUri = "http://dataflyer.net/danyahapi/api/Site/GetVideo"; }
			else { jsonUri = "http://dataflyer.net/danyahapi/api/Site/GetAudio"; }
			
			$http({method:'GET',url:jsonUri})
			.success(function(data,status,headers,config){

				$scope.items = data; 
				$scope.$watch('$viewContentLoaded', function(){
					Danyah.mediaListHandler('.media-list');	
					Danyah.loadMedia(data[0].Youtube);			
				});
				
			}).
			error(function(){
				$scope.error = 'Unable to load data';
			});				
			
		};
		
		$scope.httpLoad("video");

		$scope.changeMediaType = function(mediaType){
			$scope.httpLoad(mediaType);
		};
				
	};
	
	var DanyahApp = angular.module('DanyahApp');
	DanyahApp.controller('MediaCtrl',MediaCtrl);
	
}(jQuery));
