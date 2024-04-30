function sendEmail(event) {
  event.preventDefault(); // Prevent form submission

  var senderName = document.getElementById("usernamee").value;
  var senderEmail = document.getElementById("emaill").value;
  var senderPhone = document.getElementById("phonee").value;
  var message = document.getElementById("note").value;

  var recipient = "abenezernigussiecs@gmail.com";
  var subject = "Email Subject";
  var body =
    "Sender Name: " +
    senderName +
    "\n" +
    "Sender Email: " +
    senderEmail +
    "\n" +
    "Sender Phone: " +
    senderPhone +
    "\n\n" +
    "Message: " +
    message;

  var mailtoUrl =
    "mailto:" +
    encodeURIComponent(recipient) +
    "?subject=" +
    encodeURIComponent(subject) +
    "&body=" +
    encodeURIComponent(body) +
    "&cc=" +
    encodeURIComponent(senderEmail);

  window.location.href = mailtoUrl;

  // Refresh the page
  location.reload();
}

/*------------------------------------------
        = Register Function
    -------------------------------------------*/
$(document).ready(function () {
  // Handle form submission
  $("#signup-form").submit(function (event) {
    event.preventDefault(); // Prevent the form from submitting normally

    var password = $("#password").val().toString();
    var confirmPassword = $("#confirmPassword").val().toString();

    //Check if password and confirm password match
    if (password !== confirmPassword) {
      // Remove previous error message, if any
      $("#confirmPasswordError").remove();

      var errorMessage = $("<p>")
        .text("Confirm password does not match!")
        .addClass("error-message")
        .css({
          color: "red",
          display: "inline-block",
        })
        .attr("id", "confirmPasswordError");

      $("#confirmPassword").after(errorMessage);

      return;
    }
    // Create the form data object
    var formData = {
      username: $("#username").val().toString(),
      email: $("#email").val().toString(),
      password: password,
      PhoneNumber: $("#phoneNumber").val().toString(),
    };

    // Submit the form using AJAX
    $.ajax({
      url: $(this).attr("action"),
      type: $(this).attr("method"),
      data: JSON.stringify(formData),
      contentType: "application/json", // Set the Content-Type header
      success: function (response) {
        // Handle success response
        console.log(response);
        alert("Account Created successfully!");
        window.location.href = "login.html";
      },
      error: function (xhr, status, error) {
        console.log(xhr); // Log the full error object for debugging'

        if (xhr.status === 500) {
          // Remove previous error message, if any
          $("#InternalServerError").remove();

          var errorMessage = $("<p>")
            .text("Email Already Taken!")
            .addClass("error-message")
            .css({
              color: "red",
              display: "inline-block",
            })
            .attr("id", "InternalServerError");

          $("#email").after(errorMessage);

          return;
        } else {
          // Handle other error scenarios
          alert("An error occurred. Please try again later.");
        }
      },
    });
  });
});

(function ($) {
  "use strict";

  /*------------------------------------------
        = ALL ESSENTIAL FUNCTIONS
    -------------------------------------------*/

  // Toggle mobile navigation
  function toggleMobileNavigation() {
    var navbar = $(".navigation-holder");
    var openBtn = $(".mobail-menu .open-btn");
    var xbutton = $(".mobail-menu .navbar-toggler");

    openBtn.on("click", function (e) {
      e.stopImmediatePropagation();
      navbar.toggleClass("slideInn");
      xbutton.toggleClass("x-close");
      return false;
    });
  }

  toggleMobileNavigation();

  // Function for toggle class for small menu
  function toggleClassForSmallNav() {
    var windowWidth = window.innerWidth;
    var mainNav = $("#navbar > ul");

    if (windowWidth <= 991) {
      mainNav.addClass("small-nav");
    } else {
      mainNav.removeClass("small-nav");
    }
  }

  toggleClassForSmallNav();

  // Function for small menu
  function smallNavFunctionality() {
    var windowWidth = window.innerWidth;
    var mainNav = $(".navigation-holder");
    var smallNav = $(".navigation-holder > .small-nav");
    var subMenu = smallNav.find(".sub-menu");
    var megamenu = smallNav.find(".mega-menu");
    var menuItemWidthSubMenu = smallNav.find(".menu-item-has-children > a");

    if (windowWidth <= 991) {
      subMenu.hide();
      megamenu.hide();
      menuItemWidthSubMenu.on("click", function (e) {
        var $this = $(this);
        $this.siblings().slideToggle();
        e.preventDefault();
        e.stopImmediatePropagation();
        $this.toggleClass("rotate");
      });
    } else if (windowWidth > 991) {
      mainNav.find(".sub-menu").show();
      mainNav.find(".mega-menu").show();
    }
  }

  smallNavFunctionality();

  $("body").on("click", function () {
    $(".navigation-holder").removeClass("slideInn");
  });
  $(".menu-close").on("click", function () {
    $(".navigation-holder").removeClass("slideInn");
  });
  $(".menu-close").on("click", function () {
    $(".open-btn").removeClass("x-close");
  });

  // toggle1
  $("#toggle1").on("click", function () {
    $(".create-account").slideToggle();
    $(".caupon-wrap.s1").toggleClass("active-border");
  });

  // toggle2
  $("#toggle2").on("click", function () {
    $("#open2").slideToggle();
    $(".caupon-wrap.s2").toggleClass("coupon-2");
  });

  // toggle3
  $("#toggle3").on("click", function () {
    $("#open3").slideToggle();
    $(".caupon-wrap.s2").toggleClass("coupon-2");
  });
  // toggle4
  $("#toggle4").on("click", function () {
    $("#open4").slideToggle();
    $(".caupon-wrap.s3").toggleClass("coupon-2");
  });

  $(".payment-select .addToggle").on("click", function () {
    $(".payment-name").addClass("active");
    $(".payment-option").removeClass("active");
  });

  $(".payment-select .removeToggle").on("click", function () {
    $(".payment-option").addClass("active");
    $(".payment-name").removeClass("active");
  });

  // tooltips

  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  /*------------------------------------------
        = TEAM SECTION
    -------------------------------------------*/
  var singleMember = $(".social");
  singleMember.on("click", function () {
    $(this).toggleClass("active");
  });

  // Parallax background
  function bgParallax() {
    if ($(".parallax").length) {
      $(".parallax").each(function () {
        var height = $(this).position().top;
        var resize = height - $(window).scrollTop();
        var doParallax = -(resize / 5);
        var positionValue = doParallax + "px";
        var img = $(this).data("bg-image");

        $(this).css({
          backgroundImage: "url(" + img + ")",
          backgroundPosition: "50%" + positionValue,
          backgroundSize: "cover",
        });
      });
    }
  }

  // HERO SLIDER
  var menu = [];
  jQuery(".swiper-slide").each(function (index) {
    menu.push(jQuery(this).find(".slide-inner").attr("data-text"));
  });
  var interleaveOffset = 0.5;
  var swiperOptions = {
    loop: true,
    speed: 1000,
    parallax: true,
    autoplay: {
      delay: 6500,
      disableOnInteraction: false,
    },
    watchSlidesProgress: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    on: {
      progress: function () {
        var swiper = this;
        for (var i = 0; i < swiper.slides.length; i++) {
          var slideProgress = swiper.slides[i].progress;
          var innerOffset = swiper.width * interleaveOffset;
          var innerTranslate = slideProgress * innerOffset;
          swiper.slides[i].querySelector(".slide-inner").style.transform =
            "translate3d(" + innerTranslate + "px, 0, 0)";
        }
      },

      touchStart: function () {
        var swiper = this;
        for (var i = 0; i < swiper.slides.length; i++) {
          swiper.slides[i].style.transition = "";
        }
      },

      setTransition: function (speed) {
        var swiper = this;
        for (var i = 0; i < swiper.slides.length; i++) {
          swiper.slides[i].style.transition = speed + "ms";
          swiper.slides[i].querySelector(".slide-inner").style.transition =
            speed + "ms";
        }
      },
    },
  };

  var swiper = new Swiper(".swiper-container", swiperOptions);

  // DATA BACKGROUND IMAGE
  var sliderBgSetting = $(".slide-bg-image");
  sliderBgSetting.each(function (indx) {
    if ($(this).attr("data-background")) {
      $(this).css(
        "background-image",
        "url(" + $(this).data("background") + ")"
      );
    }
  });

  /*------------------------------------------
        = HIDE PRELOADER
    -------------------------------------------*/
  function preloader() {
    if ($(".preloader").length) {
      $(".preloader")
        .delay(100)
        .fadeOut(500, function () {
          //active wow
          wow.init();
        });
    }
  }

  /*------------------------------------------
        = WOW ANIMATION SETTING
    -------------------------------------------*/
  var wow = new WOW({
    boxClass: "wow", // default
    animateClass: "animated", // default
    offset: 0, // default
    mobile: true, // default
    live: true, // default
  });

  /*------------------------------------------
        = ACTIVE POPUP IMAGE
    -------------------------------------------*/
  if ($(".fancybox").length) {
    $(".fancybox").fancybox({
      openEffect: "elastic",
      closeEffect: "elastic",
      wrapCSS: "project-fancybox-title-style",
    });
  }

  /*------------------------------------------
        = POPUP VIDEO
    -------------------------------------------*/
  if ($(".video-btn").length) {
    $(".video-btn").on("click", function () {
      $.fancybox({
        href: this.href,
        type: $(this).data("type"),
        title: this.title,
        helpers: {
          title: { type: "inside" },
          media: {},
        },

        beforeShow: function () {
          $(".fancybox-wrap").addClass("gallery-fancybox");
        },
      });
      return false;
    });
  }

  /*------------------------------------------
            = POPUP YOUTUBE, VIMEO, GMAPS
    -------------------------------------------*/
  $(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({
    type: "iframe",
    mainClass: "mfp-fade",
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false,
  });

  /*------------------------------------------
        = ACTIVE GALLERY POPUP IMAGE
    -------------------------------------------*/
  if ($(".popup-gallery").length) {
    $(".popup-gallery").magnificPopup({
      delegate: "a",
      type: "image",

      gallery: {
        enabled: true,
      },

      zoom: {
        enabled: true,

        duration: 300,
        easing: "ease-in-out",
        opener: function (openerElement) {
          return openerElement.is("img")
            ? openerElement
            : openerElement.find("img");
        },
      },
    });
  }

  /*------------------------------------------
        = FUNCTION FORM SORTING GALLERY
    -------------------------------------------*/
  function sortingGallery() {
    if ($(".sortable-gallery .gallery-filters").length) {
      var $container = $(".gallery-container");
      $container.isotope({
        filter: "*",
        animationOptions: {
          duration: 750,
          easing: "linear",
          queue: false,
        },
      });

      $(".gallery-filters li a").on("click", function () {
        $(".gallery-filters li .current").removeClass("current");
        $(this).addClass("current");
        var selector = $(this).attr("data-filter");
        $container.isotope({
          filter: selector,
          animationOptions: {
            duration: 750,
            easing: "linear",
            queue: false,
          },
        });
        return false;
      });
    }
  }

  sortingGallery();

  /*------------------------------------------
        = MASONRY GALLERY SETTING
    -------------------------------------------*/
  function masonryGridSetting() {
    if ($(".masonry-gallery").length) {
      var $grid = $(".masonry-gallery").masonry({
        itemSelector: ".grid-item",
        columnWidth: ".grid-item",
        percentPosition: true,
      });

      $grid.imagesLoaded().progress(function () {
        $grid.masonry("layout");
      });
    }
  }

  // masonryGridSetting();

  /*------------------------------------------
        = FUNFACT
    -------------------------------------------*/
  if ($(".odometer").length) {
    $(".odometer").appear();
    $(document.body).on("appear", ".odometer", function (e) {
      var odo = $(".odometer");
      odo.each(function () {
        var countNumber = $(this).attr("data-count");
        $(this).html(countNumber);
      });
    });
  }

  /*------------------------------------------
        = STICKY HEADER
    -------------------------------------------*/

  // Function for clone an element for sticky menu
  function cloneNavForSticyMenu($ele, $newElmClass) {
    $ele
      .addClass("original")
      .clone()
      .insertAfter($ele)
      .addClass($newElmClass)
      .removeClass("original");
  }

  // clone home style 1 navigation for sticky menu
  if ($(".wpo-site-header .navigation").length) {
    cloneNavForSticyMenu($(".wpo-site-header .navigation"), "sticky-header");
  }

  var lastScrollTop = "";

  function stickyMenu($targetMenu, $toggleClass) {
    var st = $(window).scrollTop();
    var mainMenuTop = $(".wpo-site-header .navigation");

    if ($(window).scrollTop() > 1000) {
      if (st > lastScrollTop) {
        // hide sticky menu on scroll down
        $targetMenu.removeClass($toggleClass);
      } else {
        // active sticky menu on scroll up
        $targetMenu.addClass($toggleClass);
      }
    } else {
      $targetMenu.removeClass($toggleClass);
    }

    lastScrollTop = st;
  }

  /*------------------------------------------
        = Header search toggle
    -------------------------------------------*/
  if ($(".header-search-form-wrapper").length) {
    var searchToggleBtn = $(".search-toggle-btn");
    var searchToggleBtnIcon = $(".search-toggle-btn i");
    var searchContent = $(".header-search-form");
    var body = $("body");

    searchToggleBtn.on("click", function (e) {
      searchContent.toggleClass("header-search-content-toggle");
      searchToggleBtnIcon.toggleClass("fi flaticon-loupe fi ti-close");
      e.stopPropagation();
    });

    body
      .on("click", function () {
        searchContent.removeClass("header-search-content-toggle");
      })
      .find(searchContent)
      .on("click", function (e) {
        e.stopPropagation();
      });
  }

  /*------------------------------------------
        = Header shopping cart toggle
    -------------------------------------------*/
  if ($(".mini-cart").length) {
    var cartToggleBtn = $(".cart-toggle-btn");
    var cartContent = $(".mini-cart-content");
    var cartCloseBtn = $(".mini-cart-close");
    var body = $("body");

    cartToggleBtn.on("click", function (e) {
      cartContent.toggleClass("mini-cart-content-toggle");
      e.stopPropagation();
    });

    cartCloseBtn.on("click", function (e) {
      cartContent.removeClass("mini-cart-content-toggle");
      e.stopPropagation();
    });

    body
      .on("click", function () {
        cartContent.removeClass("mini-cart-content-toggle");
      })
      .find(cartContent)
      .on("click", function (e) {
        e.stopPropagation();
      });
  }

  /*------------------------------------------
        = RECENT CASE SECTION SHOW HIDE
    -------------------------------------------*/
  if ($(".service-thumbs").length) {
    $(".service-thumb").on("click", function (e) {
      e.preventDefault();
      var target = $($(this).attr("data-case"));
      $(".service-thumb").removeClass("active-thumb");
      $(this).addClass("active-thumb");
      $(".service-content .service-data").hide(0);
      $(".service-data").fadeOut(300).removeClass("active-service-data");
      $(target).fadeIn(300).addClass("active-service-data");
    });
  }

  /*------------------------------------------
        = Testimonial SLIDER
    -------------------------------------------*/
  if ($(".wpo-testimonial-wrap").length) {
    $(".wpo-testimonial-wrap").owlCarousel({
      autoplay: false,
      smartSpeed: 300,
      margin: 20,
      loop: true,
      fade: true,
      autoplayHoverPause: true,
      dots: true,
      nav: false,
      items: 1,
    });
  }
  /*------------------------------------------
        = Testimonial SLIDER
    -------------------------------------------*/
  if ($(".wpo-service-slider").length) {
    $(".wpo-service-slider").owlCarousel({
      autoplay: false,
      smartSpeed: 300,
      margin: 20,
      loop: true,
      autoplayHoverPause: true,
      dots: true,
      nav: false,
      responsive: {
        0: {
          items: 1,
          dots: true,
          nav: false,
        },

        500: {
          items: 1,
          dots: true,
          nav: false,
        },

        768: {
          items: 2,
        },

        1200: {
          items: 3,
        },

        1400: {
          items: 4,
        },
      },
    });
  }
  /*------------------------------------------
        = Testimonial SLIDER
    -------------------------------------------*/
  if ($(".wpo-happy-client-slide").length) {
    $(".wpo-happy-client-slide").owlCarousel({
      autoplay: true,
      smartSpeed: 300,
      margin: 0,
      loop: true,
      autoplayHoverPause: true,
      dots: false,
      nav: false,
      items: 4,
    });
  }

  /*------------------------------------------
        = POST SLIDER
    -------------------------------------------*/
  if ($(".post-slider".length)) {
    $(".post-slider").owlCarousel({
      mouseDrag: false,
      smartSpeed: 500,
      margin: 30,
      loop: true,
      nav: true,
      navText: [
        '<i class="fi ti-arrow-left"></i>',
        '<i class="fi ti-arrow-right"></i>',
      ],
      dots: false,
      items: 1,
    });
  }
  $(".one-time").slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: '<i class="nav-btn nav-btn-lt flaticon-right-arrow-1"></i>',
    nextArrow: '<i class="nav-btn nav-btn-rt flaticon-right-arrow-1"></i>',
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
        },
      },
    ],
  });

  $(".testimonial-slider").slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: '<i class="nav-btn nav-btn-lt flaticon-right-arrow-1"></i>',
    nextArrow: '<i class="nav-btn nav-btn-rt flaticon-right-arrow-1"></i>',
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
        },
      },
    ],
  });

  /*------------------------------------------
        = SHOP DETAILS PAGE PRODUCT SLIDER
    -------------------------------------------*/
  if ($(".shop-single-slider").length) {
    $(".slider-for").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: ".slider-nav",
    });
    $(".slider-nav").slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      asNavFor: ".slider-for",
      focusOnSelect: true,
      arrows: false,

      responsive: [
        {
          breakpoint: 500,
          settings: {
            slidesToShow: 3,
            infinite: true,
          },
        },
        {
          breakpoint: 400,
          settings: {
            slidesToShow: 2,
          },
        },
      ],
    });
  }

  /*------------------------------------------
        = TOUCHSPIN FOR PRODUCT SINGLE PAGE
    -------------------------------------------*/
  if ($("input[name='product-count']").length) {
    $("input[name='product-count']").TouchSpin({
      verticalbuttons: true,
    });
  }

  /*-----------------------
       cart-plus-minus-button 
     -------------------------*/
  $(".cart-plus-minus").append(
    '<div class="dec qtybutton">-</div><div class="inc qtybutton">+</div>'
  );
  $(".qtybutton").on("click", function () {
    var $button = $(this);
    var oldValue = $button.parent().find("input").val();
    if ($button.text() == "+") {
      var newVal = parseFloat(oldValue) + 1;
    } else {
      // Don't allow decrementing below zero
      if (oldValue > 0) {
        var newVal = parseFloat(oldValue) - 1;
      } else {
        newVal = 0;
      }
    }
    $button.parent().find("input").val(newVal);
  });

  /*------------------------------------------
        = BACK TO TOP BTN SETTING
    -------------------------------------------*/
  $("body").append(
    "<a href='#' class='back-to-top'><i class='ti-arrow-up'></i></a>"
  );

  function toggleBackToTopBtn() {
    var amountScrolled = 1000;
    if ($(window).scrollTop() > amountScrolled) {
      $("a.back-to-top").fadeIn("slow");
    } else {
      $("a.back-to-top").fadeOut("slow");
    }
  }

  $(".back-to-top").on("click", function () {
    $("html,body").animate(
      {
        scrollTop: 0,
      },
      700
    );
    return false;
  });

  /*==========================================================================
        WHEN DOCUMENT LOADING
    ==========================================================================*/
  $(window).on("load", function () {
    preloader();

    sortingGallery();

    toggleMobileNavigation();

    smallNavFunctionality();
  });

  /*==========================================================================
        WHEN WINDOW SCROLL
    ==========================================================================*/
  $(window).on("scroll", function () {
    if ($(".wpo-site-header").length) {
      stickyMenu($(".wpo-site-header .navigation"), "sticky-on");
    }

    toggleBackToTopBtn();
  });

  /*==========================================================================
        WHEN WINDOW RESIZE
    ==========================================================================*/
  $(window).on("resize", function () {
    toggleClassForSmallNav();
    //smallNavFunctionality();

    clearTimeout($.data(this, "resizeTimer"));
    $.data(
      this,
      "resizeTimer",
      setTimeout(function () {
        smallNavFunctionality();
      }, 200)
    );
  });
})(window.jQuery);
