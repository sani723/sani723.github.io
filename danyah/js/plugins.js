// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());


/*
 * The plugin parallaxes the background
 */


(function($){
	
		var defaults = {};
	
        $.fn.MouseDirectedParallax = function(params){
        	
        	return this.each(function(){
					
				var elWidth,bgWidth,centerDiff,that,mouseX,bgX;
				
				elWidth = $(this).width();
				bgWidth = params.backgroundWidth;	
				
				centerDiff = (bgWidth/2) - (elWidth/2);
			
				$(this).css({backgroundPosition:''+-centerDiff+'px bottom'});
				
				that = $(this);
				
				//console.log(window.DeviceOrientationEvent);
				
				$('body').on('mousemove',function(e){
					
					mouseX = e.pageX;
					bgX = -(mouseX-centerDiff) / params.speed;

					if(params.inverse == true) {
						TweenMax.to(that,.8,{backgroundPosition:(-centerDiff+bgX)+'px bottom',ease:Sine.easeOut});
					}
					else {
						TweenMax.to(that,.8,{backgroundPosition:(-centerDiff-bgX)+'px bottom',ease:Sine.easeOut});
					}
				});

        	});
        	
        };
})(jQuery);

