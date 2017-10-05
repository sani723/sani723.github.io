$(function(){
	
	EM.init();
	
	/* Direct initialization of bxSlider plugin for page it exists */
	if($('.h-carousel').length) {
		$('.h-carousel ul').bxSlider({pager:false,touchEnabled:true});
	}
	
});


var EM = {} || EM;

EM = {
	init:function(){
		this.showNextSibling('.quick-links .search>a','click');	
		this.hideParent('.quick-links .drop-box .close','click');
		this.navToggle('#nav-toggle');
		this.navOffersSlider('.level01 .offers-col');
		this.secondryNavHandler('#side-nav .active-box','click');
		this.popUpHandler('.call-to-action .contact','click');
		this.accordionHandler('.offers-accordion .item-header','click');
		this.mediaGallery('.media-gallery.videos');
		this.homeParallax('#hero-parallax .experience',1);
		this.lightbox('.media-gallery.images .list');
		this.lightbox('.media-gallery.videos .list');
	},
	showNextSibling:function(el,handler){
		$(el).bind(handler,function(e){
			$(this).next().css({'display':'block'});
			return false;
		});
	},
	hideParent:function(el,handler){
		$(el).bind(handler,function(e){
			$(this).parent().css({'display':'none'});
			return false;
		});		
	},
	navToggle:function(el){
		$(el).bind('click',function(e){
			if($(el).hasClass('active')) {
				$('#top-nav, .quick-links').css({'display':'none'});
				$(el).removeClass('active');
			}
			else {
				$('#top-nav, .quick-links').css({'display':'block'});
				$(el).addClass('active');
			}
			return false;
		});
	},
	navOffersSlider:function(el){
		$(el).find('.stepper a').bind('click',function(){
			$(this).parent().parent().find('.offers').css({'marginTop':-($(this).index()*137)+'px','transition':'all .5s ease-out'});
			$(this).parent().find('.active').removeClass('active');
			$(this).addClass('active');
			return false;
		});
	},
	secondryNavHandler:function(el,handler){
		$(el).bind(handler,function(e){
			if($(el).hasClass('active')) {
				$(this).next().slideUp('slow',function(){
					$(el).removeClass('active');
				});
			}
			else {
				$(this).next().slideDown('slow',function(){
					$(el).addClass('active');
				});							
			}
			return false;
		});		
	},
	popUpHandler:function(el,handler){
		var $closeBtn =$('<a href="#" class="close"><img src="img/icons/close-small.gif" alt="x" /></a>');
		$(el).find('.pop-up').append($closeBtn);
		$(el).find('>a').bind('click',function(){
			$(this).next().css({'display':'block'});
			return false;
		});
		$(el).delegate('.close','click',function(){
			$(this).parent().css({'display':'none'});
			return false;
		});
	},
	accordionHandler:function(el,handler){
		$(el).bind('click',function(){
			$(this).parent().toggleClass('expanded');
			return false;
		});
	},
	mediaGallery:function(parentEl){
		var $playIcon = $('<img class="play-icon" src="img/icons/play.png" />');
		$(parentEl).find('li>a').append($playIcon);
		$(parentEl).find('li>a').hover(
			function(){
				$(this).find('.play-icon').css({'opacity':'.7'});
			},
			function(){
				$(this).find('.play-icon').css({'opacity':'1'});
		});
	},
	homeParallax:function(el,speed){
		
		var $steppers = $(el).parent().find('.stepper a');
		if($(window).width()>970) {
			$(el).each(function(){
				var $self = $(this),
				current = $self.index(),
				$parent = $self.parent(),
				$summary = $self.find('.summary'),
				offsetCoords = $self.offset(),
				topOffset = offsetCoords.top-130,
				movePx = 0;
				$bg = $self.find('.para-bg');
				
				$self.css({'backgroundImage':"url("+$bg.attr('src')+")",'backgroundAttachment':'fixed','backgroundPosition':'50% 130px','backgroundRepeat':'no-repeat'});
				
				$(window).bind('scroll',function(){
					if(parseInt($(this).scrollTop(),10)>=(topOffset) && ((topOffset)+$self.height()>$(this).scrollTop())){
						$steppers.removeClass('active');
						$steppers.eq(current).addClass('active');	
					}
					if(parseInt($(this).scrollTop()+($(this).height()),10)>=(topOffset) && ((topOffset)+$self.height()>$(this).scrollTop())){
						movePx = ((-$(this).scrollTop()/speed)+(topOffset+145));
						$summary.css({'top':movePx+'px'});
						$self.css({'backgroundPosition':'50% '+movePx/(speed+1)+'px'});
					}

					if($(this).scrollTop()<$(this).height()/6) {
						$(el).parent().find('.next-experience').fadeIn('slow');
					}
					else {
						$(el).parent().find('.next-experience').fadeOut('slow');							
					}	
				});
			});
		}
		
		$steppers.bind('click',function(e){

			var offset = $(el).eq($(this).index()).offset();
			var topDistance = offset.top;
			$('html,body').animate({scrollTop:(topDistance-125),'transition':'all .5s ease-out'},{duration:850,queue:false});
			return false;
		});	

		$(".next-experience").bind('click',function(e){
			var offset = $(el).eq(1).offset();
			var topDistance = offset.top;
			$('html,body').animate({scrollTop:(topDistance-130)},{duration:850,queue:false});
			return false;
		});	
	},
	lightbox:function(parentEl){
		
		var currentIndex = 0;
		$(parentEl).delegate('li a','click',function(){
			if($(this).attr('rel')=='video') {
				$('#lightbox .next,#lightbox .previous,#lightbox .info').css({'display':'none'});
				var id,embed;
				var urlReg = new RegExp('http://[a-zA-z.]*/','g');				
				id=$(this).attr('href').replace(String(urlReg.exec($(this).attr('href'))),'');
				embed = '<embed type="application/x-shockwave-flash" src="http://www.youtube.com/v/'+id+'?version=3&amp;enablejsapi=1" name="plugin" width="100%">';
				$('#lightbox .viewer').html(embed);
				$('#lightbox').css({'display':'table-cell'});
			}
			else {
				$('#lightbox .next,#lightbox .previous,#lightbox .info').css({'display':'block'});
				$('#lightbox .viewer').empty().append('<img />');
				$('#lightbox .viewer img').attr('src',$(this).attr('href'));
				$('#lightbox .info').empty().html('<p>'+$(this).attr('title')+'</p>');
				$('#lightbox').css({'display':'table-cell'});
				currentIndex = $(this).parent().index();
			}
			return false;
		});	
		
		$('#lightbox').delegate('.close','click',function(){
			$('#lightbox').css('display','none');
			return false;
		});
		
		if($(parentEl).parent().hasClass('images')) {
		
			$('#lightbox').delegate('.previous','click',function(){
				if(currentIndex>0) {
					currentIndex-=1;
					$(parentEl).find('li').eq(currentIndex).find('a').trigger('click');
				}
				return false;
			});
			$('#lightbox').delegate('.next','click',function(){
				if(currentIndex<($(parentEl).find('li').length-1)) {
					currentIndex+=1;
					$(parentEl).find('li').eq(currentIndex).find('a').trigger('click');
				}
				return false;			
			});
		}	
	}
	
};


