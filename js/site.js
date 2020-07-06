/**
Handles plugin inits and custom functions
**/
(function ($) {
'use strict';
/* Instagram
=========================*/
var GTInsta = function() {
    jQuery.fn.spectragram.accessData= {
        // add instagram access token
        accessToken:'2031939360.1677ed0.47d2574eaaa54da1b04b69abb0d7eead',
    }
    ;
    jQuery('.ig-feed-widget > ul').spectragram('getUserFeed', {
        max: 6,
        size: 'large',
        wrapEachWith: '<li></li>'
    }
    );

}

/* Twitter feed -- uses tweet plugin
    =========================*/
var GTTwitter = function() {
    jQuery('.twt-feed-widget').tweet( {
        username: "envato",
                modpath: './twitter/',
                count: 3,
                loading_text: 'loading twitter feed...'
    }
    );
}

/* Isotope filters
=========================*/
var GTProjectFilter = function() {
    // initialize isotope
    var container = jQuery('#portfolio-grid > ul');
    container.isotope({
        itemSelector: '#portfolio-grid > ul > li.project-post',
        layoutMode: 'fitRows',
    });
    var filters = jQuery('#portfolio-filters');
    filters.on('click', 'a', function(e) {
        e.preventDefault();
        var filterValue = jQuery(this).attr('data-filter');
        container.isotope({
            filter: filterValue
        });
        console.log(jQuery(this).attr('data-filter'));
        // don't proceed if already selected
        if (jQuery(this).hasClass('selected')) {
            return false;
        }
        filters.find('.selected').removeClass('selected');
        jQuery(this).addClass('selected');
    });
}

/* GT carousel uses owlcarousel jquery plugin
=========================*/
var GTCarousel = function() {

    jQuery('.gt-testimonial-slider').owlCarousel({
        items:1,
        loop:true,
        nav:true,
        navSpeed: 750,
        navElement: 'div',
        navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
        autoHeight:true,
    });

    jQuery('.gt-gallery-carousel').owlCarousel({
        items:3,
        center:true,
        loop:true,
        margin:5,
        nav:true,
        navSpeed: 750,
        navElement: 'div',
        navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
        responsive : {
                // breakpoint from 0 up
                0 : {
                    items:1,
                }
                ,
                            // breakpoint from 480 up
                480 : {
                    items:2,
                },
                            // breakpoint from 980 up
                980 : {
                    items:3,
                }

            }
    });

    jQuery('.gt-image-slider').owlCarousel({
        items:1,
        loop:true,
        nav:true,
        navSpeed: 750,
        navElement: 'div',
        navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
        autoHeight:true,
    });

}

var GTHeroCarousel = function() {
    $('#slides.hero-slider').owlCarousel({
        items:1,
        loop:true,
        nav: true,
        navElement: 'div',
        navSpeed: 750,
        navText:['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        mouseDrag:false,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
    }); 
}


/* Animate on Scroll
    =========================*/
var GTAOS = function() {    
    AOS.init({
      // Global settings:

      disable:'tablet', // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function]
      startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
      initClassName: 'aos-init', // class applied after initialization
      animatedClassName: 'aos-animate', // class applied on animation
      useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
      disableMutationObserver: false, // disables automatic mutations' detections (advanced)
      debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
      throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
      duration: 1000,
      once:true,
      offset: 100,
    });
}

/* One page linking and scrolling
	=========================*/
var GTSmoothLinking = function() {
    // smooth linking 
    $('.on-page').on('click', function(e) {
        var href = $(this).attr("href"),
            topMenu = $("#site-navigation"),
            topMenuHeight = topMenu.outerHeight(),
            offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, 1200, 'easeOutExpo');
        e.preventDefault();
    });
    // Cache selectors
    // Bind to scroll
    var lastId,
        topMenu = $("#site-navigation"),
        topMenuHeight = topMenu.outerHeight(),
        menuItems = topMenu.find("a.on-page"),
        scrollItems = menuItems.map(function() {
            var item = $($(this).attr("href"));
            if (item.length) {
                return item;
            }
        });
    $(window).scroll(function() {
        // Get container scroll position
        var fromTop = $(this).scrollTop() + topMenuHeight;
        // Get id of current scroll item
        var cur = scrollItems.map(function() {
            if ($(this).offset().top < fromTop)
                return this;
        });
        // Get the id of the current element
        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : "";
        if (lastId !== id) {
            lastId = id;
            // Set/remove active class
            menuItems
                .parent().removeClass("active")
                .end().filter("[href=\\#" + id + "]").parent().addClass("active");
        }
    });
}

/* Contact form modal popup
	=========================*/
var GTContactToggle = function() {
    var
        contactBlock = $(document.getElementById('contact-modal')),
        contactBtn = $('.open-contact'),
        closeContactBtn = $(document.getElementById('close-contact'));
    contactBtn.on('click', function(e) {
        e.preventDefault();
        contactBlock.addClass('active');
        page.addClass('out-focus');
    });
    closeContactBtn.on('click', function(e) {
        e.preventDefault();
        contactBlock.removeClass('active');
        page.removeClass('out-focus');
    });
}

/* Contact form validation and submission -- uses validate plugin
	=========================*/
var GTContact = function() {
    jQuery("#contact-form").validate({
        submitHandler: function(form) {
            jQuery('#success-mail').removeClass('active');
            jQuery('#fail-mail').removeClass('active');
            var $form = jQuery('#contact-form');
            $.ajax({
                type: "POST",
                url: $form.attr('action'),
                data: {
                    name: $form.find('#name').val(),
                    email: $form.find('#email').val(),
                    phone: $form.find('#phone').val(),
                    subject: $form.find('#subject').val(),
                    message: $form.find('#message').val()
                },
                dataType: 'json',
                complete: function(data) {
                    if (typeof data.responseJSON == 'object') {
                        if (data.responseJSON.msg == 'success') {
                           // jQuery('#success-mail').addClass('active');
                          //  jQuery('html, body').animate({
                           //     scrollTop: '+=50px'
                          // }, 800);
                          $('#contact-form').html('<div class="alert alert-success" role="alert" id="success-mail">\
                                <strong>Success!</strong> Thank you for contacting us. We will be in touch shortly.\
                            </div>');
                        } else {
                           $('#contact-form').prepend('<div class="alert alert-danger" role="alert" id="fail-mail">\
                                <strong>Oh snap!</strong> Your message could not be sent! Please check all your fields and try again.\
                            </div>');
                        }
                    }
                }
            });
            return false;
        }
    });
}

/* Magnific popup lightbox
	=========================*/
var GTLightbox = function() {
    // gallery
    jQuery('.popup-gallery').on('click', function(e) {
        e.preventDefault();
        jQuery(this).next().magnificPopup('open');
    });
    // Initialize Magnific Popup Gallery + Options
    jQuery('.gallery-images').each(function() {
        jQuery(this).magnificPopup({
            delegate: 'a',
            gallery: {
                enabled: true
            },
            type: 'image'
        });
    });
    // single image lightbox
    $('.popup-image').magnificPopup({
        type: 'image',
        closeOnContentClick: false,
    });
    // video lightbox
    $('.popup-video').magnificPopup({
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        //fixedContentPos: false
    });
}

/* Mobile menu buttons
    ========================*/
var GTMobileMenu = function() {    
    /* Mobile menu buttons
    ========================
        if (matchMedia('only screen and (max-width:769px)').matches){
        jQuery('header#masthead #site-navigation').hide();

        jQuery('#mobile-open-btn').on('click', function(e){
            e.preventDefault();

            jQuery('header#masthead #site-navigation').css("display", "flex").fadeIn();
        });


        jQuery('li#mobile-close-btn > a').on('click', function(e){
            e.preventDefault();

            jQuery('header#masthead #site-navigation').fadeOut();
        });
    }
    */

    $('#primary-menu').slicknav( {
            label:'',
            prependTo:'#mobile-navigation',
            duplicate:false,
        }
    );
}

/* Ajax Project Loading
    ========================*/
var GTAjaxProject = function() {
  
    let ajaxError = '<p class="error">Cannot find project or no such project exists.</p>',
        current,
        next, 
        prev,
        target, 
        hash,
        url,
        page,
        title,
        projectIndex,
        scrollPostition,
        projectLength,
        wrapperHeight,    
        cache = false,            
        ajaxLoading = false,
        pageRefresh = true,
        content = false,
        easing = 'easeOutExpo',
        folderName = 'projects',
        loader = $('#loading-screen'),
        portfolioGrid = $('#portfolio-grid > ul'),
        parentContainer = $(document.getElementById('ajax-content')),
        projectContainer = $('#project-content'),
        projectFragment = $('#ajax-fragment'),
        projectNavigation = $('ajax-navbar ul'),
        projectNext = $(document.getElementById('ajax-next')),
        projectPrev = $(document.getElementById('ajax-prev')),
        projectClose = $(document.getElementById('ajax-close')); 


    projectNavigation.hide();

    (() => {

        // Hashchange
        $(window).bind( 'hashchange', function() {
            hash = $(window.location).attr('hash');
            var root = '#!'+ folderName +'/';
            var rootLength = root.length;
            if( hash.substr(0,rootLength) != root ) {
                return;
            } else {
                var correction = 0;
                var headerH = $('#masthead').outerHeight()+correction;
                hash = $(window.location).attr('hash');
                url = hash.replace(/[#\!]/g, '' );
                portfolioGrid.find('li.project-post').removeClass('current' );
                /* ADDRESS BAR LOAD */
                if(pageRefresh == true && hash.substr(0,rootLength) ==  root) {
                    animateContainer();
                    loadProject();
                    AOS.refresh();
                    /* PROJECT NAVIGATION / CLICK LOAD */
                } else if(pageRefresh == false && hash.substr(0,rootLength) == root) {
                    if(content == false) {
                        animateContainer();
                        loadProject();
                    } else {
                        loadProject();
                    }
                    projectNavigation.fadeOut('100');
                    //exitProject.fadeOut('100');
                    /* BROWSER NAVIGATION */
                } else if(hash=='' && pageRefresh == false || hash.substr(0,rootLength) != root && pageRefresh == false || hash.substr(0,rootLength) != root && pageRefresh == true) {
                    scrollPostition = hash;
                    removeProject();
                }
                /* ADD ACTIVE CLASS TO CLICKED PROJECT */
                portfolioGrid.find('li.project-post .post-image a[href="#!' + url + '"]' ).parent().parent().addClass( 'current' );
            }
        });

        /* load in animation */
        function animateContainer() {
            $('html').addClass('display-project');
            parentContainer.addClass('active');
        }


        /* Load */
        function loadProject() {
            if(!ajaxLoading) {
                ajaxLoading = true;
                projectContainer.load( url + ' #ajax-fragment', function(xhr, statusText, request) {
                    if(statusText == "success") {
                        ajaxLoading = false;
                        page =  $('#ajax-fragment');
                        
                        hideLoader();
                        GTLightbox();   
                        var GalleryCarousel = jQuery('.gt-gallery-carousel').owlCarousel({
                            items:3,
                            center:true,
                            loop:true,
                            margin:5,
                            nav:true,
                            navSpeed: 750,
                            navElement: 'div',
                            navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
                        });


                        var ImageSlider = jQuery('.gt-image-slider').owlCarousel({
                            items:1,
                            loop:true,
                            nav:true,
                            navSpeed: 750,
                            navElement: 'div',
                            navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
                            autoHeight:false,
                        });

                        GTContactToggle();

                    }
                    if(statusText == "error") {
                        loader.addClass('ajaxError').append(ajaxError);
                    }
                }
                );
            }
        }

        function hideLoader(){
            loader.fadeOut(500, function() {
                showProject();
            }
            );           
        }

        /* Display */
        function showProject() {
            projectIndex = portfolioGrid.find('li.project-post.current').index();
            projectLength = portfolioGrid.children().length-1;
            if(projectIndex == projectLength) {
                projectNext.addClass('disabled');
                projectPrev.removeClass('disabled');
            } else if(projectIndex == 0) {
                projectPrev.addClass('disabled');
                projectNext.removeClass('disabled');
            } else {
                $('#ajax-prev,#ajax-next').removeClass('disabled');
            }
        }

        /* Remove */
        function removeProject(closeURL) {
            projectNavigation.fadeOut();
            parentContainer.removeClass('active');
            $('html').removeClass('display-project');
            //
            projectContainer.empty();
            content == false;
            if(typeof closeURL!='undefined' && closeURL!='') {
                location = '#_';
            }
            portfolioGrid.find('li.project-post.current').removeClass('current' );
            loader.show();
            // $('.loading-screen').removeClass('inactive');
        }

        /* PROJECT BUTTON NAVIGATION */
        projectNext.on('click',function () {
            loader.show();
            current = portfolioGrid.find('li.project-post.current');
            next = current.next('li.project-post');
            target = $(next).children('div').children('a').attr('href');
            $(this).attr('href', target);
            if (next.length === 0) {
                return false;
            }
            current.removeClass('current');
            next.addClass('current');
            loader.fadeOut();
        });

        projectPrev.on('click',function () {
            loader.show();
            current = portfolioGrid.find('li.project-post.current');
            prev = current.prev('li.project-post');
            target = $(prev).children('div').children('a').attr('href');
            $(this).attr('href', target);
            if (prev.length === 0) {
                return false;
            }
            current.removeClass('current');
            prev.addClass('current');
            loader.fadeOut();
        });

        /* CLOSE PROJECT BUTTON */
        projectClose.on('click',function () {
            removeProject($(this).attr('href'));
            loader.fadeOut();
            return false;
        });

        $(window).trigger( 'hashchange' );
        pageRefresh = false;
    })();
}


$(document).ready(function() {
    GTHeroCarousel();
    GTContactToggle();
    GTContact();
    if (matchMedia('only screen and (max-width: 1023px)').matches) {
    GTMobileMenu();
    }
    GTAOS();
});

$(window).on("load", function() {
    GTCarousel();
    GTProjectFilter();
    GTAjaxProject();
    if (matchMedia('only screen and (min-width: 769px)').matches) {
        GTSmoothLinking();
    }
    GTLightbox();
    GTInsta();
    GTTwitter();
});

})(jQuery);