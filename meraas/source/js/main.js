/*
 * A self invoking anonymous function to project $ namespace.
 * Also the function executes when the
 * */


(function($) {

    $(function() {

        MEERAS.init();

    });


    var MEERAS = {

        viewportWidth:$(window).width(),
        init:function() {

            this.windowResize();
            this.handleNavTabs();
            this.handleHeroResize();
            this.handleMobileNavToggle();
            this.handleSearchNavToggle();
            this.handleFeaturedPropertyCarousel();
            this.handleBrandsCarousel();
            this.handleKeyStoneCarousel();
            this.handleLatestNewsCarousel();
            this.handleNewsDetailCarousel();
        },
        windowResize:function() {

            var that = this;

            $(window).on('resize',function(){
                that.viewportWidth = $(window).width();

                //trigger for handleNavTabs to hide the navigation drop-tab
                if(parseInt(that.viewportWidth) <= 960){
                    $('.main-nav .active').removeClass('active');
                    $('.wrapper-header .drop-tabs').removeClass('expanded').css({height:0});

                    $('.header .top-nav').css({'display':'none'});
                }

                if(parseInt(that.viewportWidth) >= 960){
                    $('.header .top-nav').css({'display':'block'});
                }

            });

        },
        handleNavTabs:function() {

            var $tabWrapper = $('.wrapper-header'),
                $tabNav = $tabWrapper.find('.main-nav'),
                $tabContent = $tabWrapper.find('.drop-tabs'),
                cIndex=0;

                var that = this;

            $('.has-sub').each(function(i) {

                $(this).find('>a').on('click',function(e) {

                    if(parseInt(that.viewportWidth) >= 960) {

                        var $linkTab = $tabContent.find('.tab').eq(i),
                            $navItem = $(this).parent(),
                            expandHeight = parseInt($linkTab.height())+parseInt($linkTab.css('paddingTop'))+parseInt($linkTab.css('paddingBottom'));


                        if($tabContent.hasClass('expanded') && cIndex==i) {

                            $navItem.removeClass('active');
                            $tabContent.removeClass('expanded').css({height:0});

                        }

                        else if($tabContent.hasClass('expanded') && cIndex!=i) {

                            $tabNav.find('.active').removeClass('active');
                            $navItem.addClass('active');

                            $linkTab.parent().find('.active').fadeOut(function(){
                                $(this).removeClass('active');
                                $linkTab.fadeIn(function(){ $(this).addClass('active');cIndex=i; });
                                $tabContent.css({height:expandHeight});
                            });
                        }

                        else {

                            $tabContent.find('.active').removeClass('active').css({'display':'none'});
                            $navItem.addClass('active');
                            $linkTab.addClass('active').css({'display':'block'});
                            $tabContent.addClass('expanded').css({height:expandHeight});

                            cIndex=i;

                        }
                        e.preventDefault();

                    }

                });
            });

        },
        handleHeroResize:function() {

            function resizer() {

                var bHeight = parseFloat($(window).height()),
                    headHeight = parseFloat($('.page-header').height()),
                    heroWidth = parseFloat($(window).width()),
                    heroHeight = bHeight-headHeight,
                    $hero = $('.page-hero'),
                    $bgImage = $('.backdrop'),
                    bgSrc = $bgImage.attr('src');

                if($('.section-nav').length) {
                    var sectionNavHeight = $('.section-nav').height();
                    heroHeight = heroHeight - sectionNavHeight;
                }

                $hero.css({'width':heroWidth,'height':heroHeight});
                $hero.backstretch(bgSrc);
            }

            resizer();

            $(window).on('resize',function() {
                resizer();
            });

        },
        handleMobileNavToggle:function() {

            var $navToggle = $('.page-header .nav-toggle'),
                $nav = $('.page-header .top-nav'),
                navHeight=0;

            $navToggle.find('a').on('click',function() {

                if($(this).parent().hasClass('active')) {

                    $nav.slideUp(function(){
                        $navToggle.removeClass('active');
                    });

                }
                else {

                    navHeight = $nav.height();
                    $nav.slideDown(function(){
                        $navToggle.addClass('active');
                    });

                }
            });
        },
        handleSearchNavToggle:function() {

            var $searchToggle = $('.page-header .quick-nav .search');

            $searchToggle.find('>a').on('click',function(e){

                if($(this).parent().hasClass('active')) {
                    $(this).parent().removeClass('active');
                }
                else {
                    $(this).parent().addClass('active');
                }

                e.preventDefault();
            });


        },
        handleFeaturedPropertyCarousel:function() {

            var $featuredProjects = $('.mod-featured-projects');

            $featuredProjects.each(function(){

                var flag=false,
                    $backdropCarousel = $(this).find('.backdrops .list'),
                    $summaryCarousel = $(this).find('.summaries .list');


                if($backdropCarousel.find('.item').length > 1){

                    $backdropCarousel.owlCarousel({
                        items:1,
                        dots:false
                    })
                    .on('changed.owl.carousel',function(e) {

                        if(!flag) {
                            flag=true;
                            $summaryCarousel.trigger('to.owl.carousel',[e.item.index,300,true]);
                            flag = false;
                        }
                    });

                    $summaryCarousel.owlCarousel({
                        items:1,
                        nav:true,
                        dots:false,
                        navText:false
                    })
                    .on('changed.owl.carousel',function(e) {

                        if(!flag) {
                            flag=true;
                            $backdropCarousel.trigger('to.owl.carousel',[e.item.index,500,true]);
                            flag = false;
                        }
                    });
                }
            });
        },
        handleBrandsCarousel:function() {

            var $brandsCarousel = $('.mod-brands-carousel .brands-list');

            $brandsCarousel.owlCarousel({
                items:1,
                responsiveClass:true,
                responsive:{
                    960:{
                        items:3
                    },
                    620: {
                        items:2
                    }
                },
                dots:false,
                nav:true,
                navText:false
            });
        },
        handleKeyStoneCarousel:function() {
            var $keyStoneCarousel = $('.mod-keystone-carousel .keystone-pod-list');

            if($keyStoneCarousel.length > 0){
                $keyStoneCarousel.owlCarousel({
                    margin: 24,
                    responsiveClass:true,
                    responsive:{
                        0:{
                            items:2
                        },
                        600:{
                            items:3
                        }
                    },
                    dots:false,
                    nav:true,
                    navText:false
                });
            }
        },
        handleLatestNewsCarousel:function() {
            var $latestNewsCarousel = $('.mod-latest-news-carousel .news-list');
            if($latestNewsCarousel.length > 0){
                $latestNewsCarousel.owlCarousel({
                    items:1,
                    margin: 20,
                    responsiveClass:true,
                    responsive:{
                        960: {
                            items:2
                        }
                    },
                    dots:false,
                    nav:true,
                    navText:false
                });
            }
        },
        handleNewsDetailCarousel: function (){
            var $newsImageItem = $('.mod-image-carousel .image-list');
            if($newsImageItem.length > 0){
                $newsImageItem.owlCarousel({
                    items:1,
                    margin: 20,
                    responsiveClass:true,
                    dots:false,
                    nav:true,
                    navText:false
                });
            }
        }
    };

}(jQuery));