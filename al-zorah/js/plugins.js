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


/* This plugin adds a partially transparent layer under the elements it is invoked for */
(function($){
        $.fn.underlay = function(){
                return this.each(function(){
					$(this).prepend('<div class="underlay"></div>');
                });
        };
})(jQuery);


/*
 * ********************************
 * Supersize
	$('#slideshow').supersize();
 * ********************************
 */
(function($){
    //Adjust image size
    $.fn.supersize = function() {
        //Define starting width and height values for the original image
        var startwidth = 1400;  
        var startheight = 650;
        //Define image ratio
        var ratio = startheight/startwidth;
        //Gather browser dimensions
        var browserwidth = $(window).width();
        var browserheight = $(window).height();
        
        //Resize image to proper ratio
        if ((browserheight/browserwidth) > ratio) {
            $(this).height(browserheight);
            $(this).width(browserwidth);
            $(this).find('img').height(browserheight);
            $(this).find('img').width(browserheight / ratio);
        } else {
            $(this).width(browserwidth);
            $(this).height(browserwidth*ratio);
            $(this).find('img').width(browserwidth);
            $(this).find('img').height(browserwidth * ratio);
        }
        //Make sure the image stays center in the window
        $(this).find('img').css({'marginLeft':-($(this).find('img').width()-$(this).width())/2})
        //$(this).find('img').css({'marginTop':(browserheight - $(this).height()/2)});
    };
})(jQuery);




