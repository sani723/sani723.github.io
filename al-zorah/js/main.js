/*
 * A self invoking anonymous function to project $ namespace.
 * Also the function executes when the 
 * */
(function($){

	
	$(function(){
		
		/* On DOM Ready initialzations for the complete application
		 * For example calling Alzorah.init();
		 *  */
		Alzorah.init()
        $('#status').fadeOut(); // will first fade out the loading animation
        $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
        $('body').delay(350).css({'overflow':'visible'});
        
        //resizing images on load and window resize
        $('.hero-carousel .item').supersize();
        $(window).on('resize',function(){$('.hero-carousel .item').supersize();});	
		
		$('.hero-carousel .item').append('<div class="overlay" />');
		
		//Adds transparent layer for elements having class .has-underlay
		$('.has-underlay').underlay();

		//Open all anchors with rel="external" in external window
		$('a[rel="external"]').on('click',function(e){
			window.open($(this).attr('href'),'_blank');
			e.preventDefault();
		});     
		//Kills hash for all anchors with only hash
		$('a[href="#"]').on('click',function(e){ e.preventDefault(); });     
		

	});



	
	var Alzorah = Alzorah || {};
	
		Alzorah = {

			init:function(){
                this.handleNavigation('.main-nav');  
                this.allCarousels();
                this.hashLinks();
                this.initLightbox();
                this.initSubscriptionForm();
                this.initCallbackRequest();
                this.initSendMail();
                this.smoothScroll();
			},
			smoothScroll:function(){
			    var $window = $(window);
			    var scrollTime = 1.1;
			    var scrollDistance = 280;
			    $window.on("mousewheel DOMMouseScroll", function(event) {
			        event.preventDefault();
			        var delta = event.originalEvent.wheelDelta / 120 || -event.originalEvent.detail / 3;
			        var scrollTop = $window.scrollTop();
			        var finalScroll = scrollTop - parseInt(delta * scrollDistance);
			        TweenMax.to($window, scrollTime, {
			            scrollTo: {
			                y: finalScroll,
			                autoKill: true
			            },
			            ease: Power1.easeOut,
			            overwrite: 5
			        });
			    });				
			},
            initSubscriptionForm:function(){
                $('#subscription-form').submit(function() {
                    // update user interface
                    $('#response').html('Adding email address...');
                    
                    //
                    var interest = new Array();
                    $.each($("input[name='interest[]']:checked"), function() {
                      interest.push($(this).val());
                      // or you can do something to the actual checked checkboxes by working directly with  'this'
                      // something like $(this).hide() (only something useful, probably) :P
                    });

                    // Prepare query string and send AJAX request
                    $.ajax({
                        url: 'inc/process-user-subscription.php',
                        data: 'ajax=true&recaptcha_response_field='+ escape($('#recaptcha_response_field').val()) +'&recaptcha_challenge_field='+ escape($('#recaptcha_challenge_field').val()) +'&name=' + escape($('#name').val()) +'&email='+ escape($('#email').val()) +'&phone='+ escape($('#phone').val()) +'&selected_interest='+ interest,
                        success: function(msg) {
                            if(msg.trim() == "success"){
                                $("#subscription-form fieldset").hide();
                                $("#subscription-form .thankyou").show();
                                $('#response').html("");
                                
                            } else {
                                $('#response').html(msg);
                                
                            }
                        }
                    });
                
                    return false;
                });
            },
            initCallbackRequest:function(){
                $('#request-callback-form').submit(function() {
                    // update user interface
                    $('#response').html('Sending message...');
                    
                   

                    // Prepare query string and send AJAX request
                    $.ajax({
                        url: 'inc/process-callback-message.php',
                        data: 'ajax=true&recaptcha_response_field='+ escape($('#recaptcha_response_field').val()) +'&recaptcha_challenge_field='+ escape($('#recaptcha_challenge_field').val()) +'&name=' + escape($('#name').val()) +'&phone='+ escape($('#phone').val()),
                        success: function(msg) {
                            if(msg.trim() == "success"){
                                $("#request-callback-form fieldset").hide();
                                $("#request-callback-form .thankyou").show();
                                $('#response').html("");
                                
                            } else {
                                $('#response').html(msg);
                                
                            }
                        }
                    });
                
                    return false;
                });
            },
            initSendMail:function(){
                $('#send-message-form').submit(function() {
                    // update user interface
                    $('#response').html('Sending message...');
                    
                   

                    // Prepare query string and send AJAX request
                    $.ajax({
                        url: 'inc/process-user-message.php',
                        data: 'ajax=true&recaptcha_response_field='+ escape($('#recaptcha_response_field').val()) +'&recaptcha_challenge_field='+ escape($('#recaptcha_challenge_field').val()) +'&name=' + escape($('#name').val()) +'&email='+ escape($('#email').val()) +'&phone='+ escape($('#phone').val()) +'&message='+ escape($('#message').val()),
                        success: function(msg) {
                            if(msg.trim() == "success"){
                                $("#send-message-form fieldset").hide();
                                $("#send-message-form .thankyou").show();
                                $('#response').html("");
                                
                            } else {
                                $('#response').html(msg);
                                
                            }
                        }
                    });
                
                    return false;
                });
            },
            initLightbox:function(){
                $('.popup-with-form').magnificPopup({
                    type: 'inline',
                    preloader: false,
                    closeBtnInside:true,
                    focus: '#name',
                    callbacks: {
                        open: function () {
                            $.magnificPopup.instance.close = function () {
                                $("#subscription-form fieldset").show();
                                $("#subscription-form .subscribe_thankyou").hide();
                                $.magnificPopup.proto.close.call(this);
                            };
                        }
                    }
                });

            },
            hashLinks:function(){

                $(".navigation a").on("click", function(e) {
                	
                	e.preventDefault();
                	
                	var hashLink = $(this).attr('href').replace('#',''),
                		finalScroll, $window = $(window),scrollTime = 1.2;
                	
                	if($('.page[id="'+hashLink+'"]').length){
                	
	                	finalScroll = $('.page[id="'+hashLink+'"]').offset();
	
				        TweenMax.to($window, scrollTime, {
				            scrollTo: {
				                y: finalScroll.top,
				                autoKill: true
				            },
				            ease: Power1.easeOut
				        ,onComplete:function(){location.hash = hashLink;}}); 
			        
			        }    
			        
			        if(Modernizr.touch) {
			        	$('.main-nav').addClass('close');
			        }         	
                	
                });

            },
            handleNavigation:function(el){
            	
            	var $nav = $(el).find('.navigation'),
            		$openMenu = $(el).find('.menu-selector'),
            		$closeMenu = $(el).find('.close-menu');
            	

            	$openMenu.on('click',function(e){
					if($(el).hasClass("close")){
						$(el).removeClass("close");
					}						
					else {
						$(el).addClass("close");
					} 
                });

            	if(Modernizr.touch) {
            		$(el).addClass("close");
            	}


            	$(window).scroll(function(){
            		
					if(!Modernizr.touch) {
            		
	            		var isHovered = $(el).is(':hover');
	
	            		if ($(this).scrollTop() > $(window).height() && !isHovered){
	            			$(el).addClass("close");
	            		}
						else {
	                        $(el).removeClass("close");                       
	                    }
	
		                $nav.mouseleave(function() {
		                    if ($(window).scrollTop() > $(window).height()){
		                        $(el).addClass("close");
		                    }
		                }); 
		                
	                }
                            		
            		
            	});
                           	
            },
            allCarousels:function(){
                $(".hero-carousel").owlCarousel({
                    navigation:true,
                    singleItem : true,
                    lazyLoad : true,
                    responsive: true,
                    navigationText: false,
                    slideSpeed:800
                });

                
                $(".content-carousel").owlCarousel({
                    navigation:true,
                    items : 3,
                    lazyLoad : true,
                    responsive: true,
                    navigationText: false,
                    itemsDesktop:3,
                    rewindNav:false
                });


            }
			

		}


}(jQuery));



