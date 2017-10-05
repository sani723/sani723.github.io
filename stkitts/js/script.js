/*
 * ***************************************************************************
 * Muhammad Bilal Niaz Awan
 * User Interface Developer 
 * http://www.uipress.com/about-me/
 * ***************************************************************************
 */


$(function(){
	STK.init();
});



var STK = STK || {};


STK = {
	//tmplPreloader:'<div id="preloader"><img src="/projects/stkitts/v13/img/generic/preloader.gif" /></div>',
	tmplPreloader:'<div id="preloader"><img src="/stkitts/img/generic/preloader.gif" /></div>',
	init:function(){
		$('#slideshow').supersize();
		if($(".hscroll").length){this.hScroll(".hscroll");}
		var so = new SWFObject('/stkitts/music/player.swf', 'website', '20px', '15px', '8');

		so.addParam("wmode","transparent"); 
		
	},
	
	intro:function(){
		
		var counter=0;
		var total = $("#slidecaps h1").length;
		
		function anim(){

		//set initial captions position and opacity
		$("#slidecaps").css({"opacity":0,display:"block",top:"55%"});
		$("#slidecaps h1").css({display:"none"}).eq(counter).css({display:"block"});;
		$("#slidecaps").delay(500).animate({opacity:1,top:"50%"},{duration:400,easing:"easeOutSine",complete:function(){
			
			/*first time animation sequence*/
			if(counter==0){
				$("#nav").delay(3500).fadeIn({duration:500,easing:"easeOutQuad"});
				
				$("#slidecaps").delay(3000).animate({opacity:0,top:"45%"},{duration:400,easing:"easeOutSine"});
				$(".bg").css({display:"none"}).eq(counter).css({display:"block"});
				$("#bgoverlay").delay(3400).animate({opacity:0},{duration:700,easing:"easeInSine",complete:function(){	
				$("#bgoverlay").delay(2000).animate({opacity:.8},{duration:800,easing:"easeOutQuad",complete:function(){
					counter=counter+1;
					anim();
				}});
				}});
			}
			
			/*every time animation sequence*/
			else{
				$("#slidecaps").delay(3000).animate({opacity:0,top:"45%"},{duration:400,easing:"easeOutSine"});
				$("#bgoverlay").delay(3000).animate({opacity:1},{duration:700,easing:"easeInSine",complete:function(){	
					//if(counter<total) {
						$(".bg").css({display:"none"}).eq(counter).css({display:"block"});
						$("#bgoverlay").delay(200).animate({opacity:0},{duration:700,easing:"easeInSine",complete:function(){
							if(counter<total-1){
								$("#bgoverlay").delay(2000).animate({opacity:.8},{duration:800,easing:"easeOutQuad",complete:function(){
									counter=counter+1;
									anim();
								}});
							}
							else {
								$("#home-content").delay(500).fadeIn({duration:700,easing:"easeInSine"});
							}
							
						}});
					
				}});
			}
		}});	
		}
		anim();
	},
	loadSection:function(overlayOpacity){
		var bgOverlayOpacity = 0.5;
		if(overlayOpacity != undefined){bgOverlayOpacity = overlayOpacity;}

		$("#nav").delay(300).fadeIn({duration:500,easing:"easeOutQuad"});
		$("#slideshow .bg").css({display:"block"});
		$("#bgoverlay").delay(400).animate({opacity:0},{duration:700,easing:"easeInSine",complete:function(){
			$("#bgoverlay").delay(800).animate({opacity:bgOverlayOpacity},{duration:700,easing:"easeOutSine"});
		}});
		$("#section-nav").delay(800).animate({opacity:1},{duration:700,easing:"easeInSine"});
		if($("#gallery").length)
		$("#gallery").delay(1200).animate({opacity:1},{duration:700,easing:"easeInSine"});
		if($("#content").length)
		$("#content").delay(1200).animate({opacity:1},{duration:700,easing:"easeInSine"});
		
		$(".section-thumb").bind("click",function(){
			$("#section-nav,#nav,#content").fadeOut("slow");
			var source = $(this).attr("href");
			var $img = $('<img src="'+source+'" />');
			$("#logo").fadeIn({duration:800,easing:"easeInQuad"});
			$("body").append(STK.tmplPreloader);
			$img.load(function(){
				$("#preloader").fadeOut("fast").remove();
				$("#bgoverlay").animate({opacity:1},{duration:800,easing:"easeOutQuad",complete:function(){
					$("#slideshow .bg").attr("src",source);
					$("#bgoverlay").delay(200).animate({opacity:0},{duration:700,easing:"easeInSine"});
					$(".close-zoom").fadeIn("slow");
				}});				
			});
			return false;
			
		});	
		
		$(".close-zoom").bind("click",function(){
			$("#bgoverlay").animate({opacity:.5},{duration:700,easing:"easeOutSine"});
			$(".close-zoom").fadeOut("fast");
			$("#section-nav,#nav").delay(200).fadeIn("slow");
			$("#content").delay(300).fadeIn("slow");			
		});			
		
	},
	gallerySlider:function(el,containWidth){
		
		var total = $(el).find(".carousel ul li").length;
		var $ul = $(el).find(".carousel ul");
		var cIndex = 0;
		var pause=false;
		$ul.css({width:(total*containWidth)});
		$(el).find(".scroll-left").bind("click",function(){
			if(pause==false){
				pause=true;
				if(cIndex>0){
					cIndex-=1;
					$ul.animate({marginLeft:-(cIndex*containWidth)},{duration:500,complete:function(){pause=false;}});
					hideButton();				
				}				
			}
			return false;
		});
		
		$(el).find(".scroll-right").bind("click",function(){
			if(pause==false){
				pause=true;
				if(cIndex<total-1){
					cIndex+=1;
					$ul.animate({marginLeft:-(cIndex*containWidth)},{duration:500,complete:function(){pause=false;}});
					hideButton();
				}				
			}
			
			return false;
		});
	
		$(el).find(".carousel a").bind("click",function(){
			
			$("#section-nav,#nav,#gallery").fadeOut("slow");
			var source = $(this).attr("href");
			var $img = $('<img src="'+source+'" />');
			$("#logo").fadeIn({duration:800,easing:"easeInQuad"});
			$("body").append(STK.tmplPreloader);
			$img.load(function(){
				$("#preloader").fadeOut("fast").remove();
				$("#bgoverlay").animate({opacity:1},{duration:800,easing:"easeOutQuad",complete:function(){
					$("#slideshow .bg").attr("src",source);
					$("#bgoverlay").delay(200).animate({opacity:0},{duration:700,easing:"easeInSine"});
					$(".close-zoom,.show-prev,.show-next").fadeIn("slow");
					hideButton();
				}});				
			});
			return false;
			
		});
		

		
		$(".show-prev").bind("click",function(){
			if(pause==false){
				pause=true;
				if(cIndex!=0) {
					cIndex-=1;
					$ul.css({marginLeft:-(containWidth)});
					var source = $(el).find(".carousel li").eq(cIndex).find("a").attr("href");
					var $img = $('<img src="'+source+'" />');
					$("body").append(STK.tmplPreloader);
					$img.load(function(){
					$("#preloader").fadeOut("fast").remove();
						$("#bgoverlay").animate({opacity:1},{duration:800,easing:"easeOutQuad",complete:function(){
							$("#slideshow .bg").attr("src",source);
							$("#bgoverlay").delay(200).animate({opacity:0},{duration:700,easing:"easeInSine",complete:function(){pause=false;}});
							hideButton();
						}});
					});
				}				
			}
		});
		
		$(".show-next").bind("click",function(){
			if(pause==false){
				pause=true;
				if(cIndex!=(total-1)) {
					cIndex+=1;
					$ul.css({marginLeft:-(cIndex*800)});
					var source = $(el).find(".carousel li").eq(cIndex).find("a").attr("href");
					var $img = $('<img src="'+source+'" />');
					$("body").append(STK.tmplPreloader);
					$img.load(function(){
					$("#preloader").fadeOut("fast").remove();
						$("#bgoverlay").animate({opacity:1},{duration:800,easing:"easeOutQuad",complete:function(){
							$("#slideshow .bg").attr("src",source);
							$("#bgoverlay").delay(200).animate({opacity:0},{duration:700,easing:"easeInSine",complete:function(){pause=false;}});
							hideButton();
						}});
					});
				}					
			}		
		});
		
		$(".close-zoom").bind("click",function(){
			$("#bgoverlay").animate({opacity:.5},{duration:700,easing:"easeOutSine"});
			$(".close-zoom,.show-prev,.show-next").fadeOut("fast");
			$("#section-nav,#nav").delay(200).fadeIn("slow");
			$("#gallery").delay(300).fadeIn("slow");			
		});		
		
		function hideButton(){
			if(cIndex==0) {
				if($(".close-zoom:visible").length)
				$(".show-prev").css({display:"none"});
				$(el).find(".scroll-left").css({display:"none"});
			}
			else if(cIndex==total-1) {
				if($(".close-zoom:visible").length)
				$(".show-next").css({display:"none"});
				$(el).find(".scroll-right").css({display:"none"});
			}
			else {
				if($(".close-zoom:visible").length) {
					$(".show-prev").css({display:"block"});
					$(".show-next").css({display:"block"});
				}
				$(el).find(".scroll-left").css({display:"block"});
				$(el).find(".scroll-right").css({display:"block"});
			}
		}
		
	},
	hScroll:function(el){
		var cIndex = 0;
		$(el).css({width:1600});
		$(el).find("li.pane:not(:first-child)").css({display:"none"});	
		
		
		$(".scroll-nav a").bind("click",function(){
			
			var clickIndex = ($(this).parent().index())+1;
			var total = $(".scroll-nav li").length;
			cIndex=clickIndex;	

			if(cIndex>0 && cIndex<=total){
				$(el).find("li.pane").eq(cIndex).css({display:"none"});
				$(el).find("li.pane").eq(clickIndex).css({display:"block"});
				$(el).animate({marginLeft:-800},{duration:500,easing:"easeOutQuad"});			
			}
			return false;
		});
		
		$(el).find(".back").bind("click",function(){
		
			$(el).find("li.pane").eq(cIndex).css({display:"none"});
			cIndex = 0;
			$(el).animate({marginLeft:0},{duration:500,easing:"easeOutQuad"});	
			return false;
		});
	}
};

