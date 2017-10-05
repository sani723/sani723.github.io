(function($){

	var RegisterCtrl = function($scope,$http,$location,$cookieStore){

		if($cookieStore.get('ProfileID')){
			$location.path('/');
		}
		
		$scope.$watch('$viewContentLoaded', function(){
			Danyah.customSelectHandlers('.custom-combo');		
		});		
		
		//$scope.load = function(){};$scope.load();
		
		$scope.registerUser = function(){
		
			var jsonUri = "http://dataflyer.net/danyahapi/api/Profiles/AddModel";
			
			
			if($scope.registerForm.$valid) {
				
				var profile = {
								"ProfileName":$scope.user.name,
								"ProfileEmail":$scope.user.email,
								"ProfilePassword":$scope.user.pass,
								"ProfileDOB":$scope.user.dob,
								"ProfileGender":$scope.user.gender,
								"CountryID":$scope.user.country
							  };
				
				$http.post(jsonUri,profile).
				success(function(data,status,headers){
					$location.path('/thankyou');
				}).
				error(function(data,status,headers){
					console.log(status);
				});
			}

		};	
			
	};
	
	var DanyahApp = angular.module('DanyahApp');
	DanyahApp.controller('RegisterCtrl',['$scope','$http','$location','$cookieStore',RegisterCtrl]);
	
}(jQuery));
