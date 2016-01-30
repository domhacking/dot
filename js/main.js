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

     if ($(window).scrollTop() > 10) {
       $(".main-nav .menu-btn").addClass("fixed_nav");
     } else {
       $(".main-nav .menu-btn").removeClass("fixed_nav");
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

   });

   $(document).ready(function() {
     "use strict"; // Start of use strict


     /******** Header Menu button *******/

     $('.menu_toggle, .overlay-content-wrap, .menu-nav li a').on('click', function() {
       $('.menu-content').fadeToggle(200);
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

     $("#page-wrap").append("<div class='display-none page_loading'><div class='spinner'></div></div>").fadeIn(200);
     var newHash = "",
       $mainContent = $("#main-content"),
       $pageWrap = $("#page-wrap-ex"),
       baseHeight = 0,
       $el;

     $pageWrap.height($pageWrap.height());
     baseHeight = $pageWrap.height() - $mainContent.height();

     $("body").delegate("a", "click", function() {
       var _link;
       _link = $(this).attr("href");
       history.pushState(null, null, _link);
       loadContent(_link);
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

           });
         });
     }

     $(window).bind('popstate', function() {
       _link = location.pathname.replace(/^.*[\\\/]/, ''); //get filename only
       loadContent(_link);
     });

   } // otherwise, history is not supported, so nothing fancy here.



 })(jQuery)
