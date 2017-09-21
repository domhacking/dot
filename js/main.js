(function($) {

    /* --------------------------------------------
    Page height mange
    --------------------------------------------- */

    function page_height_mange() {
        var minheight = $(window).height();
        var headerhight = $('header').outerHeight(true);
        var hightoutput = minheight - headerhight - 50;
        var half_height = hightoutput / 2;
        var thirdhaflhight = (hightoutput / 4) * 3;

        $(".full_height").css({
            'min-height': hightoutput,
            'height': hightoutput
        });

        $(".thirdhalf_height").css({
            'height': thirdhaflhight
        });

        $(".halfheight_screen").css({
            'height': half_height
        });


        $(".full-screen .work-item").css({
            'min-height': hightoutput,
            'height': hightoutput
        });

    }

    function page_loading() {
        // Page loader

        $("body").imagesLoaded(function() {
            $(".page_loading div").fadeOut();
            $(".page_loading").delay(200).fadeOut("slow");
            $(".page_loading").remove();
        });
    }

    /* --------------------------------------------
    owl carousel calling function
    --------------------------------------------- */

    function owl_main_carousel() {
        //owl slider
        var owl = $("#main-carousel");
        owl.owlCarousel({
            nav: true, // Show next and prev buttons
            smartSpeed: 1000,
            dotsSpeed: 1000,
            dragEndSpeed: true,
            dragEndSpeed: 1000,
            singleItem: true,
            pagination: false,

            items: 1,
        });
    }

    function owl_second_carousel() {
        //owl slider with no nav
        var owl = $("#second_carousel");
        owl.owlCarousel({
            nav: false, // Show next and prev buttons
            smartSpeed: 1000,
            dotsSpeed: 1000,
            items: 1,
        });
    }

    function owl_loop_carousel() {
        //owl slider with no nav

        $('#loop_carousel').owlCarousel({
            nav: true, // Show next and prev buttons
            center: true,
            smartSpeed: 1000,
            dotsSpeed: 1000,
            items: 1.4,
            loop: true,
            margin: 20,

        });


    }



    /* --------------------------------------------
    Isotope  calling function
    --------------------------------------------- */

    function Isotope_masonry_layout() {

        // init Isotope
        var $grid = $('.masonry_layout').isotope({
            percentPosition: true,
            hiddenStyle: {
                opacity: 0,
                transform: 'scale(0.001)'
            },
            visibleStyle: {
                opacity: 1,
                transform: 'scale(1)'
            },
            transitionDuration: '0.6s',
            masonry: {
                // use element for option
                columnWidth: 0
            }
        });
        // Isotope filter
        $('.work_filter li span').on('click', function() {
            var filterValue = $(this).attr('data-filter');
            jQuery('.work_filter li').removeClass('active');
            jQuery(this).parent().addClass('active');
            $grid.isotope({
                filter: filterValue
            });
        });

        // layout Isotope after each image loads
        $grid.imagesLoaded().progress(function() {
            $grid.isotope('layout');
        });

    }


    function Isotope_masonry_fitRows() {

        // init Isotope
        var $grid = $('.masonry_fitRows').isotope({
            percentPosition: true,
            hiddenStyle: {
                opacity: 0,
                transform: 'scale(0.001)'
            },
            visibleStyle: {
                opacity: 1,
                transform: 'scale(1)'
            },
            transitionDuration: '0.6s',
            masonry: {
                columnWidth: 30,

            }
        });

        // layout Isotope after each image loads
        $grid.imagesLoaded().progress(function() {
            $grid.isotope('layout');
        });

    }

    /* --------------------------------------------
    wow  calling function
    --------------------------------------------- */

    function wow_animated() {
        /********  wow.js *******/
        var wow = new WOW({
            boxClass: 'wow', // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset: 50, // distance to the element when triggering the animation (default is 0)
            mobile: false
        });
        wow.init();

    }


    function popup_gallery_int() {
        $('.popup_gallery').magnificPopup({
            delegate: 'img',
            type: 'image',
            mainClass: 'mfp-with-zoom mfp-img-mobile',
            fixedContentPos: false,
            gallery: {
                enabled: true
            },
            zoom: {
                enabled: true,
                duration: 300, // don't foget to change the duration also in CSS

            },


            callbacks: {
                elementParse: function(qw) {
                    qw.src = qw.el.attr('src');
                }
            }

        });

    }
    /* --------------------------------------------
    On scroll
    --------------------------------------------- */

    $(window).scroll(function() {
        console.log('hello');
        var whiteheader = document.querySelector('.whiteheaderTransparent');
        var footer = document.querySelector('.footerTransparent');
        var arrow = document.querySelector('.arrow');
        var copyRight = document.querySelector('.copyRight');

        if ($(window).scrollTop() > 10) {
            $(".main-nav .menu-btn").addClass("fixed_nav");
        } else {
            $(".main-nav .menu-btn").removeClass("fixed_nav");
        };

        var h = window.innerHeight;
        if (h < pageYOffset){
            whiteheader.style.backgroundColor = "white";
        } else {
            whiteheader.style.backgroundColor = "transparent";
        };
        if ( pageYOffset > 50) {
            footer.style.backgroundColor = "white";
            arrow.style.opacity = "0";
        } else {
            footer.style.backgroundColor = "transparent";
            arrow.style.opacity = "1"
        };

        if($(window).scrollTop() + $(window).height() == $(document).height()) {
            console.log('here');
            copyRight.style.display = "inline-block";
        } else {
            copyRight.style.display = "none";
        }




    });



    /* ---------------------------------------------
    Scripts initialization
    --------------------------------------------- */

    $(window).load(function() {
        "use strict"; // Start of use strict

        owl_main_carousel();
        owl_second_carousel();
        owl_loop_carousel();
        popup_gallery_int();
        Isotope_masonry_layout();
        Isotope_masonry_fitRows();
        wow_animated();
        page_loading();
        paral();
        //  prNav();

    });

    $(document).ready(function() {
        "use strict"; // Start of use strict


        /******** Header Menu button *******/

        $('.menu_toggle, .overlay-content-wrap, .menu-nav li a').on('click', function() {
            $('.menu-content').fadeToggle(200);
            $('menu-btn').add('.activeMenu');

        });

        /********  FitVids.js *******/
        // Target your .container, .wrapper, .post, etc.
        $(".fit").fitVids();


    });


    /* ---------------------------------------------
    On resize calling function
    --------------------------------------------- */
    $(window).on('resize', function() {
        "use strict"; // Start of use strict
        page_height_mange();

    }).trigger('resize');




    /* ---------------------------------------------
    Dynamic Page Replacing or loading
    --------------------------------------------- */

    if (Modernizr.history) {

        $("#page-wrap").append("<div class='display-none page_loading'><div class='spinner'></div></div>").fadeIn(500);
        var newHash = "",
        $mainContent = $("#main-content"),
        $pageWrap = $("#page-wrap-ex"),
        baseHeight = 0,
        $el;

        $pageWrap.height($pageWrap.height());
        baseHeight = $pageWrap.height() - $mainContent.height();

        $("body").delegate("a", "click", function() {
            //  console.log('hello');
            var _link;
            _link = $(this).attr("href");
            history.pushState(null, null, _link);
            loadContent(_link);
            prNav()
            return false;

        });


        function loadContent(href) {
            "use strict"; // Start of use strict

            $mainContent
            .find("#guts")
            .fadeOut(200, function() {
                $mainContent.hide().load(href + " #guts", function() {
                    $mainContent.fadeIn(200, function() {
                        $pageWrap.animate({
                            height: baseHeight + $mainContent.height() + "px"
                        });
                    });
                    $("nav a").removeClass("current");
                    $("nav a[href$='" + href + "']").addClass("current");

                    owl_main_carousel();
                    owl_second_carousel();
                    owl_loop_carousel();
                    Isotope_masonry_layout();
                    Isotope_masonry_fitRows();
                    page_height_mange();
                    $(window).scrollTop(0);
                    $(".fit").fitVids();
                    page_loading();
                    paral();

                });
            });
        }

        $(window).bind('popstate', function() {
            _link = location.pathname.replace(/^.*[\\\/]/, ''); //get filename only
            loadContent(_link);
        });

    } // otherwise, history is not supported, so nothing fancy here.
})(jQuery);


/* ---------------------------------------------
    Toggle Burger
--------------------------------------------- */

var activeMenu = document.querySelector('.menu-btn');
activeMenu.addEventListener('click', menuActive, false);

function menuActive(){
    activeMenu.classList.toggle('activeMenu');
}

/* ---------------------------------------------
    Tabs on PR page
--------------------------------------------- */

function onTabClick(event){
    var actives = document.querySelectorAll('.active');

    for (var i=0; i < actives.length; i++){
        actives[i].className = actives[i].className.replace('active', '');
    }
    event.target.className += ' active';

    document.getElementById(event.target.id.split('Tab')[0]).className += ' active';
};

var el = document.getElementById('nav-tab');

if (el){
    el.addEventListener('click', onTabClick, false);

};


/* ---------------------------------------------
    Instagram Reel at the footer
--------------------------------------------- */
function instagramReel(){
    var ulContainer = document.getElementById('rudr_instafeed');
    var instagramContainer = document.querySelector('.instagramContainer');


    var token = '2178488517.1677ed0.f22bef2885a64a439a2266cc4858b28c', // learn how to obtain it below
        userid = 2178488517, // User ID - get it in source HTML of your Instagram profile or look at the next example :)
        num_photos = 50; // how much photos do you want to get

    $.ajax({
        url: 'https://api.instagram.com/v1/users/' + userid + '/media/recent', // or /users/self/media/recent for Sandbox
        dataType: 'jsonp',
        type: 'GET',
        data: {access_token: token, count: num_photos},
        success: function(data){
        // 	console.log(data);
            for( x in data.data ){
                $('#rudr_instafeed').append('<li class="instagramList"><a target="blank" href="'+data.data[x].link+'"><img src="'+data.data[x].images.standard_resolution.url+'"></a></li>');
            }

            var transitionDistance = (-1 * (ulContainer.offsetWidth - instagramContainer.offsetWidth));
            var position = 0;
            var active = true;

            var updatePosition = function(direction) {

                if (position > transitionDistance ) {
                    active = true;

                    if (active) {
                        position += (1 * direction);
                        ulContainer.style.transform = "translateX(" + position + "px)";
                        requestAnimationFrame(updatePosition.bind(this, direction));
                    }
                }
            }
                updatePosition(-1);


        },
        error: function(data){
            // console.log(data); // send the error notifications to console
        }
    });
};

/* ---------------------------------------------
Homepage Parallax
--------------------------------------------- */
function paral(){
    var parallax = document.querySelectorAll(".parallax"),
    speed = 0.5;

    window.onscroll = function(){
        [].slice.call(parallax).forEach(function(el,i){

            var windowYOffset = window.pageYOffset,
            elBackgrounPos = "50% calc(45% + " + (windowYOffset * speed) + "px)";

            el.style.backgroundPosition = elBackgrounPos;

        });
    };
};

paral();
instagramReel();
