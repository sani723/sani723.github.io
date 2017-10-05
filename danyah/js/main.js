/*
 * A self invoking anonymous function to project $ namespace.
 * Also the function executes when the 
 * */

(function($){

	
	$(function(){
		
		Danyah.init();
		
	});

	
	var Danyah = Danyah || {};
	
	Danyah = {
        baseApiURL:'http://dataflyer.net/danyahapi/api/',
		userImagePath:'http://dataflyer.net/danyahapi/upload/userprofile/',
		init:function(){

			this.homeTransitions();
			this.footerHandlers('.footer-wrapper');
			
			//Being called from the Angular Controller
			//this.mediaListHandler('.media-list');
			
			this.addCartLightbox('.lightbox');
			//Being called from the Register Controller
			//this.customSelectHandlers('.custom-combo');
			
			//Checks if the device is touch then does not need hovers
			if(!Modernizr.touch){
				this.navigationHover('.main-nav a');
				this.homeCharacterHover('.stage .layer .scale');
			}
			
			$('.parallax-bg').parallax({scalarX:15,scalarY:8});
			$('.stage,.main-nav').parallax({scalarX:15,scalarY:8});
			
			if($('.slider-content .content').length){
				var photoSlider = $('.slider-content .content');				
				photoSlider.owlCarousel({
					responsive:false,
					items:3,
					navigation:true,
					navigationText : ["",""],
					rewindNav:false
				});
			}
			
			
		},
		loadProductCarousel:function(){
			
			if($('.carousel').length) {
				var owl = $('.stage').find('.carousel');
				owl.owlCarousel({
					pagination:false,
					responsive:false,
					items:3,
					navigation:true,
					navigationText : ["",""],
					rewindNav:false
				});
			}
						
		},
		homeTransitions:function(){
			
			//Continous Animation for Homepage logo flower
			var logo = $('.home-logo .bg, .logo .bg');
			TweenMax.to(logo,20,{rotation:360,repeat:-1,ease:Linear.easeNone});
			
		},
		footerHandlers:function(el){
			var footer = $(el);			
			
			var ID = window.setTimeout(function(){
				TweenMax.to(footer,.8,{bottom:'-280px',ease:Back.easeOut});
			},1000);
			
			footer.hover(function(){
				TweenMax.to(footer,.8,{bottom:'-30px',ease:Back.easeOut});
			},function(){
				TweenMax.to(footer,.8,{bottom:'-280px',ease:Back.easeOut});
			});
			
		},
		homeCharacterHover:function(el){
			
			var familyLinks = $(el);
			
			familyLinks.hover(function(){
				var linkImg = $(this).find('img');
				$(this).find('.speech-bubble').css({'display':'block'});
				TweenMax.to(linkImg,.4,{width:'100%',marginLeft:'-5%',ease:Back.easeOut});
			},function(){
				var linkImg = $(this).find('img');
				$(this).find('.speech-bubble').css({'display':'none'});
				TweenMax.to(linkImg,.4,{width:'90%',marginLeft:'0',ease:Back.easeOut});
			});
						
		},
		navigationHover:function(el){
			
			var navLinks = $(el);

			navLinks.hover(
				function(){
					var link = $(this);
					TweenMax.to(link,1,{width:'300px',height:'250px',marginLeft:'-30px',marginTop:'-25px',ease:Elastic.easeOut});
				}
				,function(){
					var link = $(this);
					TweenMax.to(link,1,{width:'240px',height:'200px',marginLeft:'0',marginTop:'0',ease:Elastic.easeOut});
				}
			);

		},
		mediaListHandler:function(el){

			if($(el).length) {
				
				var that = this,
					$list = $(el).find('.list'),
					$item = $list.find('li'),
					$link = $item.find('a'),
					$upArrow = $(el).find('.up-arrow'),
					$downArrow = $(el).find('.down-arrow'),
					counter=0,max=Math.ceil($list.find('li').length/5)-1;
				$link.append('<span />');
				$list.css({marginTop:0});
				if(max >= 1) {
					$upArrow.css({'display':'block'});
					$downArrow.css({'display':'block'});
					$upArrow.on('click',function(evt){
						var list = $list;					
						if(counter>0) {
							counter-=1;
							TweenMax.to(list,.6,{marginTop:(-160*counter)+'px',ease:Back.easeOut});
						}
						evt.preventDefault();
					});
					
					$downArrow.on('click',function(evt){
						var list = $list;
						if(counter<max) {
							counter+=1;
							TweenMax.to(list,.6,{marginTop:(-160*counter)+'px',ease:Back.easeOut});
						}
						evt.preventDefault();
					});
				}
				else {
					$upArrow.css({'display':'none'});
					$downArrow.css({'display':'none'});
				}
				
				$link.on('click',function(e){
					
					that.loadMedia($(this).attr('href'));
					e.preventDefault();
					
				});
				
			}
		},
		loadMedia:function(source){
			$('.player').find('iframe').attr('src','//www.youtube.com/embed/'+source);
		},
		addCartLightbox:function(el){
			var $btnClose;
			
			$('a[rel="lightbox"]').on('click',function(e){
				
				var tmplSource = $('#lightbox-tmpl').html();
				var tmpl = Handlebars.compile(tmplSource);
				var data = {source:$(this).attr('href')};
				
				$('.master').append(tmpl(data));
				
				/* Binding Close Button After Template Compilation */
				bindCloseButton();
							
				$('.lightbox').fadeIn('fast');
				
				e.preventDefault();
				
			});
		
			function bindCloseButton(e) {
				$btnClose = $(el).find('.btn-close');
				$btnClose.on('click',function(){
					$('.lightbox').fadeOut('fast');
					e.preventDefault();
				});				
			}bindCloseButton();
			
		},
		customSelectHandlers:function(el){
			$(el).wrap('<div class="select-wrapper"></div>');
		},
		progressOverlay:function(task){			
			if(task=="show"){
				$('body').append('<div class="progress"><div class="pinker"></div><div class="message"></div></div>');
			}
			else {
				$('.progress').remove();
			}
		}
		
	};


	//Danyah Angular App
	var DanyahApp = angular.module('DanyahApp',["ngRoute","ngCookies","angularFileUpload"]);
	
	DanyahApp.config(function($routeProvider){
		
		$routeProvider
			.when("/register",{
				templateUrl:'/partial/_registration_lightbox.html',
				controller:'RegisterCtrl'
			}).otherwise({redirectTo:'/'});

        $routeProvider
			.when("/forgetPassword",{
				templateUrl:'/partial/_forgetpassword_lightbox.html',
				controller:'ForgetEmailPasswordCtrl'
			}).otherwise({redirectTo:'/'});
			
		$routeProvider
			.when("/invitefriend",{
				templateUrl:'/partial/_invitefriend_lightbox.html',
				controller:'InviteFriendCtrl'
			}).otherwise({redirectTo:'/'});

    	$routeProvider
			.when("/login",{
				templateUrl:'/partial/_login_lightbox.html',
				controller:'LoginCtrl'
			}).otherwise({redirectTo:'/'});
						
    	$routeProvider
			.when("/thankyou",{
				templateUrl:'/partial/_thankyou_lightbox.html',
				controller:'ThankyouCtrl'
			}).otherwise({redirectTo:'/'});
			
		$routeProvider
			.when("/thankyouforget",{
				templateUrl:'/partial/_thankyou_forget_lightbox.html',
				controller:'ThankForgetCtrl'
			}).otherwise({redirectTo:'/'});

		$routeProvider
			.when("/settings",{
				templateUrl:'/partial/_settings_lightbox.html',
				controller:'SettingsCtrl'
			}).otherwise({redirectTo:'/'});

	});

	
	//Start [unique-email] directive
	DanyahApp.directive('uniqueEmail',['$http',function($http){
		
		var postUri = Danyah.baseApiURL + "Profiles/ValidateEmail?email=";
		
		return {
			require: 'ngModel',
			link: function(scope, elem, attrs, ctrl) {
				scope.busy = false;

					scope.$watch(attrs.ngModel, function(value) {

						if (!value) {
							return;
						}

						scope.busy = true;

						$http.post(postUri + value).success(function(data, status) {
							ctrl.$setValidity('isTaken', true);
							scope.busy = false;
						}).error(function(data, status) {
							if (status == 403) {
								ctrl.$setValidity('required', true);
								ctrl.$setValidity('isTaken', false);
							}
							scope.busy = false;
						});

					})

			}
		}

	}]);
	//End [unique-email] directive

	
	
	// Start Password [match] directive
	DanyahApp.directive('match', [
	function() {
		return {
			require : 'ngModel',
			link : function(scope, elem, attrs, ctrl) {
				
				scope.$watch('[' + attrs.ngModel + ', ' + attrs.match + ']', function(value) {
					
					ctrl.$setValidity('match', value[0] === value[1]);
				},true);

			}
		}
	}]); 
	// Start Password [match] directive



	//Start - MediaCtrl
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
	
	DanyahApp.controller('MediaCtrl',MediaCtrl);
	//End - MediaCtrl
	
	
	
	//Start - RegisterCtrl
	var RegisterCtrl = function($scope,$http,$location,$cookieStore){
		
		$scope.serverError = false;
		
		if($cookieStore.get('ProfileID')){
			$location.path('/');
		}
		
		$scope.$watch('$viewContentLoaded', function(){
			Danyah.customSelectHandlers('.custom-combo');		
		});		
		
	
		$scope.registerUser = function(){
		
			var jsonUri = Danyah.baseApiURL + "Profiles/AddModel";
			
			Danyah.progressOverlay("show");
			
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
					Danyah.progressOverlay("hide");
					$location.path('/thankyou');
				}).
				error(function(data,status,headers){
					$scope.serverError = true;
				});
			}

		};	
			
	};
	
	DanyahApp.controller('RegisterCtrl',['$scope','$http','$location','$cookieStore',RegisterCtrl]);
	//End - RegisterCtrl

//Forget Password


	var ForgetEmailPasswordCtrl = function($scope,$http,$location){
		
		$scope.serverError = false;

		$scope.forgetEmail = function(){
		
		//$http.post(postUri + "ValidateEmailPassword?email=" + $scope.user.email+"&password="+$scope.user.pass)
			var jsonUri = Danyah.baseApiURL + "Profiles/ForgetPassword?email="+$scope.user.email;
			
			if($scope.loginForm.$valid) {
						
                Danyah.progressOverlay("show");

                $http.post(jsonUri).success(function(data, status) {

                }).success(function(data, status) {
                    Danyah.progressOverlay("hide");
                    $location.path('/thankyouforget');
                }).error(function(data, status) {
                    if (status == 403)
                    {
                        Danyah.progressOverlay("hide");
                    }
                    console.log('error');
                });

			}

		};	
			
	};
	DanyahApp.controller('ForgetEmailPasswordCtrl',ForgetEmailPasswordCtrl);
    //End of Forget Password

    //Start - FriendsListCtrl
    var FriendsListCtrl = function($scope,$http,$cookieStore){

        $scope.ListFriends = function(){
            var postUri = Danyah.baseApiURL + "/Profiles/FriendListForUser?profile_id=";

            $http.post(postUri + $cookieStore.get('ProfileID')).success(function(data, status) {

            }).success(function(data, status) {

                $scope.baseImageURL = Danyah.userImagePath;
                $scope.friends = data;
                $scope.dummies = [];
                for(var i=1;i<=5-data.length;i+=1) {

                    $scope.dummies.push({'dummy':'dummy'});

                }

            }).error(function(data, status) {});


        };$scope.ListFriends();

    };

    DanyahApp.controller('FriendsListCtrl',FriendsListCtrl);
    //End - FriendsListCtrl

    //Start - InviteFriendCtrl
	var InviteFriendCtrl = function($scope,$http,$location,$cookieStore){
		
		$scope.serverError = false;

		$scope.inviteFriend = function(){
		
		    //$http.post(postUri + "ValidateEmailPassword?email=" + $scope.user.email+"&password="+$scope.user.pass)
			var jsonUri = Danyah.baseApiURL +"ProfileFriends/AddModel";
			
			if($scope.loginForm.$valid) {
						
                var addModel = {
                        "ProfileID":$cookieStore.get('ProfileID'),
                        "ProfileEmail":$scope.user.email
                  };

                Danyah.progressOverlay("show");

                $http.post(jsonUri,addModel).success(function(data, status) {

                }).success(function(data, status) {
                    Danyah.progressOverlay("hide");
                    $location.path('/thankyouforget');
                }).error(function(data, status) {
                    if (status == 403)
                    {
                        Danyah.progressOverlay("hide");
                    }
                    console.log('error');
                });

			}
		};
			
	};
	DanyahApp.controller('InviteFriendCtrl',InviteFriendCtrl);
    //End - InviteFriendCtrl


	//Start - LoginCtrl
	var LoginCtrl = function($scope,$http,$cookieStore,$location,$rootScope){
		
		if($cookieStore.get('ProfileID')){
			$location.path('/');
		}
		
		
		$scope.loginUser = function(){
		
			var postUri = Danyah.baseApiURL + "Profiles/";
			
			if($scope.loginForm.$valid) {
						
                Danyah.progressOverlay("show");

                $http.post(postUri + "ValidateEmailPassword?email=" + $scope.user.email+"&password="+$scope.user.pass).success(function(data, status) {

                }).success(function(data, status) {

                    $cookieStore.put('ProfileID',data.ProfileID);
                    $cookieStore.put('ProfileName',data.ProfileName);
                    $cookieStore.put('ProfileImage',Danyah.userImagePath+data.ProfileImage.replace("\"","").replace("\"",""));

                    $location.path('/');

                    console.log(data);

                    $rootScope.$broadcast('sessionStart');

                    Danyah.progressOverlay("hide");

                }).error(function(data, status) {
                    $cookieStore.remove('ProfileID');
                    $cookieStore.remove('ProfileName');
                    $cookieStore.remove('ProfileImage');
                    console.log('error');
                });

			}

		};	
			
	};
	
	DanyahApp.controller('LoginCtrl',LoginCtrl);
	//End - LoginCtrl	
	

	
	//Start - ThankyouCtrl
	var ThankyouCtrl = function($scope,$http,$cookieStore){};
	
	DanyahApp.controller('ThankyouCtrl',ThankyouCtrl);
	//End - ThankyouCtrl		

    //Start - ThankForgetCtrl
	var ThankForgetCtrl = function($scope,$http,$cookieStore){};
	
	DanyahApp.controller('ThankForgetCtrl',ThankForgetCtrl);
	//End - ThankForgetCtrl

	//Start - SessionCtrl
	var SessionCtrl = function($scope,$http,$cookieStore){	
		
		$scope.loggedIn = function(){
			if ($cookieStore.get('ProfileID') !== undefined ) {
				$scope.ProfileID = $cookieStore.get('ProfileID');
				$scope.ProfileName = $cookieStore.get('ProfileName');
				$scope.ProfileImage = $cookieStore.get('ProfileImage');	
			}
		}
		
		$scope.loggedIn();

		$scope.logOut = function(){
		
			if ($cookieStore.get('ProfileID') !== undefined ) {
				$cookieStore.remove('ProfileID');
				$cookieStore.remove('ProfileName');
				$cookieStore.remove('ProfileImage');	
				$scope.ProfileID = undefined;
				$scope.ProfileName = undefined;
				$scope.ProfileImage = undefined;					
			}
			
		}
		
		$scope.$on('sessionStart',function(event){$scope.loggedIn();});
		
	};
	
	DanyahApp.controller('SessionCtrl',SessionCtrl);
	//End - SessionCtrl
	

	//Start - SettingsCtrl
	var SettingsCtrl = function($scope,$upload,$cookieStore,$location,$rootScope){
		
		if($cookieStore.get('ProfileID') == undefined){
			$location.path('/');
		}
		
		else {
			
			
			if($cookieStore.get('ProfileImage') != null) {
				$scope.ProfileImage = $cookieStore.get('ProfileImage');
			}
			
		
			$scope.onFilesSelect = function($files) {
				
				var file = $files[0];
				
				Danyah.progressOverlay("show");
				
				if(file.type == 'image/gif' || file.type == 'image/jpeg' || file.type == 'image/png') {
					
					$scope.upload = $upload.upload({
						url:Danyah.baseApiURL + 'Profiles/ImageForuser?profile_id='+$cookieStore.get('ProfileID'),
						file:file
					}).
					success(function(data,status,headers,config){
						
						$cookieStore.put('ProfileImage',Danyah.userImagePath+data.replace("\"","").replace("\"",""));
						$scope.ProfileImage = $cookieStore.get('ProfileImage');
						$rootScope.$broadcast('sessionStart');
						Danyah.progressOverlay("hide");
						
					});
				
				}
				else {
					alert("please upload a valid image");
				}
							
			};
		}
	};
	
	DanyahApp.controller('SettingsCtrl',SettingsCtrl);
	//End - SettingsCtrl		


	//Start - ProfileCtrl
	var ProfileCtrl = function($scope,$http,$cookieStore){
		
		if($cookieStore.get('ProfileID') == undefined){
			window.location.href = '../';
		}
		
		else {
			$scope.initProfile = function(){
				$scope.ProfileName = $cookieStore.get('ProfileName');
				$scope.ProfileImage = $cookieStore.get('ProfileImage');
  			};
			
			$scope.initProfile();
			$scope.$on('sessionStart',function(/*event*/){$scope.initProfile();});
		}
	};
	
	DanyahApp.controller('ProfileCtrl',ProfileCtrl);
	//End - ProfileCtrl


	//Start - ShopCtrl
	var ShopCtrl = function($scope,$http,$cookieStore){
		
		
		$scope.loadProducts = function(){
			
			var jsonUri=Danyah.baseApiURL+"Site/GetProducts";
			
			$http({method:'GET',url:jsonUri})
			.success(function(data/*,status,headers,config*/){
				$scope.items = data;
			}).
			error(function(status){
				console.log(status+' data not loading');
            	/*$scope.error = 'Unable to load data';*/
            });  
		}
		
		$scope.loadProducts();		
		
		
	};
	
	DanyahApp.controller('ShopCtrl',ShopCtrl);
	//End - ShopCtrl
	
}(jQuery));
















