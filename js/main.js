/* =====================================
Template Name: 	Mediplus.
Author Name: Naimur Rahman
Website: http://wpthemesgrid.com/
Description: Mediplus - Doctor HTML Template.
Version:	1.1
========================================*/
/*=======================================
[Start Activation Code]
=========================================
* Sticky Header JS
* Search JS
* Mobile Menu JS
* Hero Slider JS
* Testimonial Slider JS
* Portfolio Slider JS
* Clients Slider JS
* Single Portfolio Slider JS
* Accordion JS
* Nice Select JS
* Date Picker JS
* Counter Up JS
* Checkbox JS
* Right Bar JS
* Video Popup JS
* Wow JS
* Scroll Up JS
* Animate Scroll JS
* Stellar JS
* Google Maps JS
* Preloader JS
=========================================
[End Activation Code]
=========================================*/
(function ($) {
  "use strict";
  $(document).on("ready", function () {
    jQuery(window).on("scroll", function () {
      if ($(this).scrollTop() > 200) {
        $("#header .header-inner").addClass("sticky");
      } else {
        $("#header .header-inner").removeClass("sticky");
      }
    });

    /*====================================
			Sticky Header JS
		======================================*/
    jQuery(window).on("scroll", function () {
      if ($(this).scrollTop() > 100) {
        $(".header").addClass("sticky");
      } else {
        $(".header").removeClass("sticky");
      }
    });

    $(".pro-features .get-pro").on("click", function () {
      $(".pro-features").toggleClass("active");
    });

    /*====================================
			Search JS
		======================================*/
    $(".search a").on("click", function () {
      $(".search-top").toggleClass("active");
    });

    /*===============================
			Hero Slider JS
		=================================*/
    $(".hero-slider").owlCarousel({
      loop: true,
      autoplay: true,
      smartSpeed: 500,
      autoplayTimeout: 3500,
      singleItem: true,
      autoplayHoverPause: true,
      items: 1,
      nav: true,
      navText: [
        '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        '<i class="fa fa-angle-right" aria-hidden="true"></i>',
      ],
      dots: false,
    });

    /*===============================
			Testimonial Slider JS
		=================================*/
    $(".testimonial-slider").owlCarousel({
      items: 3,
      autoplay: true,
      autoplayTimeout: 4500,
      smartSpeed: 300,
      autoplayHoverPause: true,
      loop: true,
      merge: true,
      nav: false,
      dots: true,
      responsive: {
        1: {
          items: 1,
        },
        300: {
          items: 1,
        },
        480: {
          items: 1,
        },
        768: {
          items: 2,
        },
        1170: {
          items: 3,
        },
      },
    });

    /*===============================
			Portfolio Slider JS
		=================================*/
    $(".portfolio-slider").owlCarousel({
      autoplay: true,
      autoplayTimeout: 4000,
      margin: 15,
      smartSpeed: 300,
      autoplayHoverPause: true,
      loop: true,
      nav: true,
      dots: false,
      responsive: {
        300: {
          items: 1,
        },
        480: {
          items: 2,
        },
        768: {
          items: 2,
        },
        1170: {
          items: 4,
        },
      },
    });

    /*=====================================
			Counter Up JS
		======================================*/
    $(".counter").counterUp({
      delay: 20,
      time: 2000,
    });

    /*===============================
			Clients Slider JS
		=================================*/
    $(".clients-slider").owlCarousel({
      items: 5,
      autoplay: true,
      autoplayTimeout: 3500,
      margin: 15,
      smartSpeed: 400,
      autoplayHoverPause: true,
      loop: true,
      nav: false,
      dots: false,
      responsive: {
        300: {
          items: 1,
        },
        480: {
          items: 2,
        },
        768: {
          items: 3,
        },
        1170: {
          items: 5,
        },
      },
    });

    /*====================================
			Single Portfolio Slider JS
		======================================*/
    $(".pf-details-slider").owlCarousel({
      items: 1,
      autoplay: false,
      autoplayTimeout: 5000,
      smartSpeed: 400,
      autoplayHoverPause: true,
      loop: true,
      merge: true,
      nav: true,
      dots: false,
      navText: [
        '<i class="icofont-rounded-left"></i>',
        '<i class="icofont-rounded-right"></i>',
      ],
    });

    /*===================
			Accordion JS
		=====================*/
    // Scope to the direct <a> child of each accordion item. A bare
    // ".accordion a" selector would also match ordinary links inside the
    // answer text and swallow their clicks via preventDefault().
    $(".accordion > li:eq(0) > a").addClass("active").next().slideDown();
    $(".accordion > li > a").on("click", function (j) {
      var dropDown = $(this).closest("li").find("p");
      $(this).closest(".accordion").find("p").not(dropDown).slideUp(300);
      if ($(this).hasClass("active")) {
        $(this).removeClass("active");
      } else {
        $(this).closest(".accordion").find("a.active").removeClass("active");
        $(this).addClass("active");
      }
      dropDown.stop(false, true).slideToggle(300);
      j.preventDefault();
    });

    /*====================================
			Nice Select JS
		======================================*/
    // Opt-out class: niceSelect replaces the <select> with a custom widget and
    // hides the original, which overrides any styling applied to the native
    // element. Forms that style their own selects add .native-select.
    $("select:not(.native-select)").niceSelect();

    /*=====================================
			Date Picker JS
		======================================*/
    $(function () {
      $("#datepicker").datepicker();
    });

    /*===============================
			Checkbox JS
		=================================*/
    $('input[type="checkbox"]').change(function () {
      if ($(this).is(":checked")) {
        $(this).parent("label").addClass("checked");
      } else {
        $(this).parent("label").removeClass("checked");
      }
    });

    /*===============================
			Right Bar JS
		=================================*/
    $(".right-bar .bar").on("click", function () {
      $(".sidebar-menu").addClass("active");
    });
    $(".sidebar-menu .cross").on("click", function () {
      $(".sidebar-menu").removeClass("active");
    });

    /*=====================
			Video Popup JS
		=======================*/
    $(".video-popup").magnificPopup({
      type: "video",
    });

    /*================
			Wow JS
		==================*/
    var window_width = $(window).width();
    if (window_width > 767) {
      new WOW().init();
    }

    /*===================
			Scroll Up JS
		=====================*/
    $.scrollUp({
      scrollText: '<span><i class="fa fa-angle-up"></i></span>',
      easingType: "easeInOutExpo",
      scrollSpeed: 900,
      animation: "fade",
    });

    /*=======================
			Animate Scroll JS
		=========================*/
    $(".scroll").on("click", function (e) {
      var anchor = $(this);
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $(anchor.attr("href")).offset().top - 100,
          },
          1000,
        );
      e.preventDefault();
    });


    // Google Maps JS (GMaps.js library) intentionally removed here: no page
    // ever included the GMaps.js library or a matching #map element (the
    // real map target is #myMap on the contact page, and that's now a plain
    // Google Maps iframe embed — see pages/contact.html), so this call
    // used to throw a "GMaps is not defined" error on every single page load.
  });

  /*====================================
			Mobile Menu + Stellar (parallax) JS
		======================================*
    These both depend on the header menu already existing in the DOM.
    The header/footer are injected asynchronously by js/loader.js, so we
    wait for the "components:loaded" event it fires once that's done,
    instead of running on jQuery's normal document-ready (which fires
    too early and silently initializes on zero elements). */
  function initComponentDependentFeatures() {
    /*====================================
			Mobile Menu
		======================================*/
    $(".menu").slicknav({
      prependTo: ".mobile-nav",
      duration: 300,
      closeOnClick: true,
    });

    /*=======================
			Stellar JS (parallax backgrounds)
		=========================*/
    $.stellar({
      horizontalOffset: 0,
      verticalOffset: 0,
    });
  }

  var headerEl = document.getElementById("header");

  if (headerEl && headerEl.innerHTML.trim() !== "") {
    $(initComponentDependentFeatures);
  } else if (headerEl) {
    $(document).on("components:loaded", initComponentDependentFeatures);
  }

  /*====================
			Preloader JS
		======================*/
  $(window).on("load", function () {
    $(".preloader").addClass("preloader-deactivate");
  });
})(jQuery);
