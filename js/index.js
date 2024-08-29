var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

var v = document.getElementById("Vid");
// $("#Vid").attr("src", "./images/temp2/Main_1 - Trim.gif");

if (isSafari) {
  $("#Iid").attr("src", "./images/Main_1 - Trim.mp4");
  document.getElementById("Iid").style.display = "block";
  document.getElementById("Vid").style.display = "none";
  setTimeout(() => {
    // $("#Vid").attr("src", "./images/temp2/Main_1 - Trim - last frame.jpg");
    $("#preloader")
      .delay(0)
      .animate({ top: "-120%" }, 3800, $.bez([0.19, 1, 0.22, 1]));
    $("#Iid").attr("src", "");
    $("#Iid").css("display", "none");
  }, 2550);
} else {
  $("#Vid").attr("src", "./images/Main_1 - Trim.mp4");
  document.getElementById("Vid").style.display = "block";
  document.getElementById("Iid").style.display = "none";
  v.onended = function () {
    $("#preloader")
      .delay(0)
      .animate({ top: "-120%" }, 3800, $.bez([0.19, 1, 0.22, 1]));
    $("#Vid").attr("src", "");
    $("#Vid").css("display", "none");
  };
}

if (sessionStorage.getItem("reloadAnimationRequired") == "false") {
  $("#preloader").css("top", "-120%");
  sessionStorage.removeItem("reloadAnimationRequired");
  if (parseInt(sessionStorage.getItem("scrollPosition")) !== 0) {
    $("html, body").animate({
      scrollTop: parseInt(sessionStorage.getItem("scrollPosition")) + "px",
    });
    sessionStorage.removeItem("scrollPosition");
  }
}

let fadeAnimationArray = [];

document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger);
  // gsap code here!
});

$(window).on("load", function () {
  $(function () {
    //slideshow

    // new Swiper("#cover-slider", {
    //     slidesPerView: "auto",
    //     speed: 1000,
    //     spaceBetween: 30,
    //     centeredSlides: true,
    //     loop: true,
    //     grabCursor: false,
    //     mousewheel: false,
    //     allowTouchMove: false
    // });

    //parallax
    $(document).ready(function () {
      initCategoryOverlayEffect();
      let currentState = "";
      resizeLandingPageForSmallDisplay();
      var parallaxSlider;
      var testimonialImageSlider;
      var testimonialContentSlider;
      var parallaxSliderOptions = {
        speed: 1500,
        autoplay: {
          delay: 4500,
          disableOnInteraction: false,
        },
        parallax: false,
        loop: true,
        grabCursor: false,
        mousewheel: false,
        centeredSlides: true,
        allowTouchMove: true,
        on: {
          init: function () {
            let swiper = this;
            for (let i = 0; i < swiper.slides.length; i++) {
              $(swiper.slides[i])
                .find(".img-container>img")
                .attr({
                  "data-swiper-parallax": 0.75 * swiper.width,
                });
            }
          },
          activeIndexChange: function () {
            // console.log(this);
          },
          resize: function () {
            this.update();
          },
        },
        pagination: {
          el: "#cover-swiper-pagination",
          clickable: true,
          renderBullet: function (index, className) {
            return '<span class="' + className + '"></span>';
          },
        },
      };

      // var testimonialSliderOptions = {
      //     speed: 1500,
      //     autoplay: {
      //         delay: 4500,
      //         disableOnInteraction: false,
      //     },
      //     // loop: true,
      //     centeredSlides: true,
      //     on: {
      //         init: function () {
      //             let swiper = this;
      //             debugger;
      //             for (let i = 0; i < swiper.slides.length; i++) {
      //             $(swiper.slides[i])
      //                 .find(".testimonial-content")
      //                 .attr({
      //                 "data-swiper-parallax": 0.75 * swiper.width,
      //                 });
      //             }
      //         },
      //         activeIndexChange: function () {
      //             // console.log(this);
      //         },
      //         resize: function () {
      //             this.update();
      //         },
      //     },
      //     pagination: {
      //         el: '#testimonial-swiper-pagination',
      //         clickable: true,
      //         renderBullet: function (index, className) {
      //             return '<span class="' + className + '"></span>';
      //         },
      //     },
      //     navigation: {
      //         nextEl: "#testimonial-controls .next-ctrl",
      //         prevEl: "#testimonial-controls .prev-ctrl",
      //     },
      // };

      var testimonialContentSliderOptions = {
        direction: "vertical",
        effect: "slide",
        autoHeight: true,
        loop: false, // Not recommended to enable!!!
        allowTouchMove: false,
      };

      var testimonialImageSliderOptions = {
        mousewheel: true,
        speed: 1000,
        slidesPerView: 1,
        centeredSlides: true,
        // spaceBetween: 10,
        loop: false, // Not recommended to enable!!!
        // longSwipesRatio: 0.01,
        followFinger: false,
        grabCursor: true,
        // watchSlidesProgress: true,
        parallax: true,
        lazy: {
          loadPrevNext: true,
        },
        on: {
          resize: function () {
            this.update();
          },
        },
        pagination: {
          el: "#testimonial-swiper-pagination",
          clickable: false,
          renderBullet: function (index, className) {
            return '<span class="' + className + '"></span>';
          },
        },
        navigation: {
          nextEl: "#testimonial-controls .next-ctrl",
          prevEl: "#testimonial-controls .prev-ctrl",
        },
      };

      parallaxSlider = new Swiper("#cover-slider", parallaxSliderOptions);
      testimonialContentSlider = new Swiper(
        "#testimonial-container-right",
        testimonialContentSliderOptions
      );
      testimonialImageSlider = new Swiper(
        "#testimonial-container-left",
        testimonialImageSliderOptions
      );
      // testimonialSlider = new Swiper("#testimonial-swiper", testimonialSliderOptions);
      $(window).on("resize", function () {
        resizeLandingPageForSmallDisplay();
        testimonialImageSlider.destroy();
        testimonialContentSlider.destroy();
        parallaxSlider.destroy();
        parallaxSlider = new Swiper("#cover-slider", parallaxSliderOptions);
        testimonialImageSlider = new Swiper(
          "#testimonial-container-left",
          testimonialImageSliderOptions
        );
        testimonialContentSlider = new Swiper(
          "#testimonial-container-right",
          testimonialContentSliderOptions
        );
        testimonialImageSlider.controller.control = testimonialContentSlider;
      });
      $(".home-link").on("click", function () {
        setTimeout(function () {
          parallaxSlider.destroy();
          testimonialImageSlider.destroy();
          testimonialContentSlider.destroy();
          parallaxSlider = new Swiper("#cover-slider", parallaxSliderOptions);
          testimonialImageSlider = new Swiper(
            "#testimonial-container-left",
            testimonialImageSliderOptions
          );
          testimonialContentSlider = new Swiper(
            "#testimonial-container-right",
            testimonialContentSliderOptions
          );
          testimonialImageSlider.controller.control = testimonialContentSlider;
        }, 750);
      });

      $(".navigation-close").on("click", function () {
        setTimeout(function () {
          parallaxSlider.destroy();
          testimonialImageSlider.destroy();
          testimonialContentSlider.destroy();
          parallaxSlider = new Swiper("#cover-slider", parallaxSliderOptions);
          testimonialImageSlider = new Swiper(
            "#testimonial-container-left",
            testimonialImageSliderOptions
          );
          testimonialContentSlider = new Swiper(
            "#testimonial-container-right",
            testimonialContentSliderOptions
          );
          testimonialImageSlider.controller.control = testimonialContentSlider;
        }, 750);
      });

      testimonialImageSlider.controller.control = testimonialContentSlider;

      $("#submit").on("click", function () {
        onSubmitContactUsForm();
      });

      // myMap();
      // window.addEventListener("resize", fadeScrollEffect);
      fadeScrollEffect();

      function resizeLandingPageForSmallDisplay() {
        let newState =
          $(window).width() > 1028 ? "above-1028px" : "below-1028px";
        let newSrcPrefix = "";
        if (currentState === "" || newState !== currentState) {
          if (newState === "above-1028px") {
            newSrcPrefix = "./images/temp2/new-header-";
          } else {
            newSrcPrefix = "./images/temp2/header-";
          }

          $(".img-container>img")
            .toArray()
            .map((x) => {
              let oldSrcArr = $(x).attr("src").split("-");
              let newSrc = newSrcPrefix + oldSrcArr[oldSrcArr.length - 1];
              $(x).attr("src", newSrc);
            });

          // Update the current state
          currentState = newState;
        }
      }
    });
    //parallax over

    // links-animations
    $(function () {
      // gsap.from(".opacity", 1, { opacity: 0, delay: 3 });
      // gsap.from(".scale", 1, { opacity: 0, delay: 3, scale: 0, stagger: 0.5 });
      // gsap.from(".fade-up", 1, {
      //   y: 120,
      //   opacity: 0,
      //   delay: 1.5,
      //   stagger: 0.25,
      // });
      gsap.from(".fade-down", 1, {
        y: -100,
        opacity: 0,
        delay: 1.5,
        stagger: 0.25,
      });
      gsap.from(".fade-up-two", 1, {
        y: 120,
        opacity: 0,
        delay: 2.25,
        stagger: 0.25,
      });

      $(".about-link").on("click", function () {
        gsap.to("#home", 0.5, { scale: 0.9 });
        gsap.to("#home", 0, {
          width: "100%",
          height: "100vh",
          overflow: "hidden",
        });
        gsap.to("#home", 0, { display: "none", delay: 0.7 });
        gsap.to("#about", 0, { display: "block", delay: 0.7 });
        gsap.to("#about", 0.5, { scale: 1, delay: 1.1 });
        gsap.to("#breaker", { display: "block" });
        gsap.to("#breaker", 0, { display: "none", delay: 1.7 });
        gsap.from(".about-opacity", 1, {
          opacity: 0,
          delay: 1.8,
          stagger: 0.2,
        });
        gsap.from(".about-img", 1, { delay: 1.8, opacity: 0 });
      });
      $(".contact-link").on("click", function () {
        gsap.to("#home", 0.5, { scale: 0.9 });
        gsap.to("#home", 0, {
          width: "100%",
          height: "100vh",
          overflow: "hidden",
        });
        gsap.to("#home", 0, { display: "none", delay: 0.7 });
        gsap.to("#contact", 0, { display: "block", delay: 0.7 });
        gsap.to("#contact", 0.5, { scale: 1, delay: 1.1 });
        gsap.to("#breaker", { display: "block" });
        gsap.to("#breaker", 0, { display: "none", delay: 1.7 });
        gsap.from(".contact-opacity", 1, {
          opacity: 0,
          delay: 1.6,
          stagger: 0.2,
        });
      });
      $(".contact-link-about").on("click", function () {
        gsap.to("#about", 0.5, { scale: 0.9 });
        gsap.to("#about", 0, {
          width: "100%",
          height: "100vh",
          overflow: "hidden",
        });
        gsap.to("#about", 0, { display: "none", delay: 0.7 });
        gsap.to("#contact", 0, { display: "block", delay: 0.7 });
        gsap.to("#contact", 0.5, { scale: 1, delay: 1.1 });
        gsap.to("#breaker", { display: "block" });
        gsap.to("#breaker", 0, { display: "none", delay: 1.7 });
        gsap.from(".contact-opacity", 1, {
          opacity: 0,
          delay: 1.6,
          stagger: 0.2,
        });
      });
      $(".home-link").on("click", function () {
        gsap.to(".city-project", 0.5, { scale: 0.9 });
        gsap.to(".city-project", 0, {
          width: "100%",
          height: "100vh",
          overflow: "hidden",
        });
        gsap.to(".city-project", 0, { display: "none", delay: 0.7 });
        gsap.to(".wildlife-project", 0.5, { scale: 0.9 });
        gsap.to(".wildlife-project", 0, {
          width: "100%",
          height: "100vh",
          overflow: "hidden",
        });
        gsap.to(".wildlife-project", 0, { display: "none", delay: 0.7 });
        gsap.to(".forest-project", 0.5, { scale: 0.9 });
        gsap.to(".forest-project", 0, {
          width: "100%",
          height: "100vh",
          overflow: "hidden",
        });
        gsap.to(".forest-project", 0, { display: "none", delay: 0.7 });
        gsap.to(".marine-project", 0.5, { scale: 0.9 });
        gsap.to(".marine-project", 0, {
          width: "100%",
          height: "100vh",
          overflow: "hidden",
        });
        gsap.to(".marine-project", 0, { display: "none", delay: 0.7 });
        gsap.to("#about", 0.5, { scale: 0.9 });
        gsap.to("#about", 0, {
          width: "100%",
          height: "100vh",
          overflow: "hidden",
        });
        gsap.to("#about", 0, { display: "none", delay: 0.7 });
        gsap.to("#contact", 0, {
          width: "100%",
          height: "100vh",
          overflow: "hidden",
        });
        gsap.to("#contact", 0, { display: "none", delay: 0.7 });
        gsap.to("#home", 0, { display: "block", delay: 0.7 });
        gsap.to("#home", 0.5, { scale: 1, delay: 1.1 });
        gsap.to("#breaker", { display: "block" });
        gsap.to("#breaker", 0, { display: "none", delay: 1.7 });
      });
      // $('.marine-project-link').on('click',function(){
      //   gsap.to('#home',.5,{scale:.9});
      //   gsap.to('#home',0,{width:'100%',height:'100vh',overflow:'hidden'});
      //   gsap.to('#home',0,{display:'none',delay:.7});
      //   gsap.to('.marine-project',0,{display:'block',delay:.7})
      //   gsap.to('.marine-project',.5,{scale:1,delay:1.1})
      //   gsap.to('.project-name',.5,{opacity:0,delay:2.5})
      //   gsap.to('#breaker',{display:'block'})
      //   gsap.to('#breaker',0,{display:'none',delay:1.7});
      // })
      // $('.forest-project-link').on('click',function(){
      //   gsap.to('#home',.5,{scale:.9});
      //   gsap.to('#home',0,{width:'100%',height:'100vh',overflow:'hidden'});
      //   gsap.to('#home',0,{display:'none',delay:.7});
      //   gsap.to('.forest-project',0,{display:'block',delay:.7})
      //   gsap.to('.forest-project',.5,{scale:1,delay:1.1})
      //   gsap.to('.project-name',.5,{opacity:0,delay:2.5})
      //   gsap.to('#breaker',{display:'block'})
      //   gsap.to('#breaker',0,{display:'none',delay:1.7});
      // })
      // $('.wildlife-project-link').on('click',function(){
      //   gsap.to('#home',.5,{scale:.9});
      //   gsap.to('#home',0,{width:'100%',height:'100vh',overflow:'hidden'});
      //   gsap.to('#home',0,{display:'none',delay:.7});
      //   gsap.to('.wildlife-project',0,{display:'block',delay:.7})
      //   gsap.to('.wildlife-project',.5,{scale:1,delay:1.1})
      //   gsap.to('.project-name',.5,{opacity:0,delay:2.5})
      //   gsap.to('#breaker',{display:'block'})
      //   gsap.to('#breaker',0,{display:'none',delay:1.7});
      // })
      // $('.city-project-link').on('click',function(){
      //   gsap.to('#home',.5,{scale:.9});
      //   gsap.to('#home',0,{width:'100%',height:'100vh',overflow:'hidden'});
      //   gsap.to('#home',0,{display:'none',delay:.7});
      //   gsap.to('.city-project',0,{display:'block',delay:.7})
      //   gsap.to('.city-project',.5,{scale:1,delay:1.1})
      //   gsap.to('.project-name',.5,{opacity:0,delay:2.5})
      //   gsap.to('#breaker',{display:'block'})
      //   gsap.to('#breaker',0,{display:'none',delay:1.7});
      // })
      $(".about-close").on("click", function () {
        gsap.to("#about", 0.5, { scale: 0.9 });
        gsap.to("#about", 0, {
          width: "100%",
          height: "100vh",
          overflow: "hidden",
        });
        gsap.to("#about", 0, { display: "none", delay: 0.7 });
        gsap.to("#home", 0, { display: "block", delay: 0.7 });
        gsap.to("#home", 0.5, { scale: 1, delay: 1.1 });
        gsap.to("#breaker", { display: "block" });
        gsap.to("#breaker", 0, { display: "none", delay: 1.7 });
      });
      $(".contact-close").on("click", function () {
        gsap.to("#contact", 0.5, { scale: 0.9 });
        gsap.to("#contact", 0, {
          width: "100%",
          height: "100vh",
          overflow: "hidden",
        });
        gsap.to("#contact", 0, {
          width: "100%",
          height: "auto",
          overflow: "hidden",
          delay: 1.7,
        });
        gsap.to("#contact", 0, { display: "none", delay: 0.7 });
        gsap.to("#home", 0, { display: "block", delay: 0.7 });
        gsap.to("#home", 0.5, { scale: 1, delay: 1.1 });
        gsap.to("#breaker", { display: "block" });
        gsap.to("#breaker", 0, { display: "none", delay: 1.7 });
      });
    });
  });
});

function scrollToParticularElement(element, isFromBurgerMenu) {
  if (isFromBurgerMenu) {
    $(".burger-menu-icon").prop("checked", false);
  }
  $("html, body").animate(
    {
      scrollTop: $(element).offset().top,
    },
    1200
  );
}

async function fadeScrollEffect() {
  // registerFadeScrollEffect("#googleMap", "right", 2);
  // registerFadeScrollEffect("#myForm", "left", 2);
  registerFadeScrollEffect(".about-us>h1", "top", 2);
  registerFadeScrollEffect(".member-image-container.m1", "right", 2);
  registerFadeScrollEffect(".member-content.m1", "left", 2);
  registerFadeScrollEffect(".member-image-container.m2", "left", 2);
  registerFadeScrollEffect(".member-content.m2", "right", 2);
  registerFadeScrollEffect(".member-image-container.m3", "right", 2);
  registerFadeScrollEffect(".member-content.m3", "left", 2);
  // registerFadeScrollEffect(".contact-header>h3", "top", 2);
  // registerFadeScrollEffect(".contact-description>p", "top", 2);
}

function registerFadeScrollEffect(element, direction, delay) {
  let x = (y = 0);
  if (direction == "right" || direction == "left") {
    x = direction == "right" ? -100 : 100;
  }
  if (direction == "top" || direction == "bottom") {
    y = direction == "top" ? -100 : 100;
  }
  gsap
    .timeline({
      scrollTrigger: {
        trigger: element,
        end: "+=400",
        scrub: true,
      },
    })
    .from(element, delay, {
      opacity: 0,
      x: x,
      y: y,
      ease: Power2.out,
    });
}

function initCategoryOverlayEffect() {
  let panels = gsap.utils.toArray(".category");

  panels.forEach((panel, i) => {
    ScrollTrigger.create({
      trigger: panel,
      start: "top top", // if it's shorter than the viewport, we prefer to pin it at the top
      pin: true,
      pinSpacing: false,
    });

    let image = panel.querySelector(".overlay-img");
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: panel,
        start: "top top",
        scrub: true,
        toggleActions: "restart complete none reset",
      },
    });
    tl.from(image, 0.5, {
      scale: 1.3,
      ease: Power2.out,
    });
  });
}

var prevScrollpos = window.scrollY;
window.onscroll = function () {
  var currentScrollPos = window.scrollY;
  if (prevScrollpos > currentScrollPos) {
    document.getElementsByClassName("navigation")[0].style.top = "0";
  } else {
    document.getElementsByClassName("navigation")[0].style.top = "-80px";
  }
  prevScrollpos = currentScrollPos;
};

function onSubmitContactUsForm() {
  let isNameValid = false,
    isContactNumberValid = false,
    isEmailValid = false,
    isSubjectValid = false,
    isMessageValid = false;
  let name = $("#name");
  let contactnumber = $("#contactnumber");
  let email = $("#email");
  let subject = $("#subject");
  let message = $("#message");

  if (
    /<\/?[a-z][\s\S]*>/i.test(name.val()) ||
    name.val() === "" ||
    name.val() === undefined
  ) {
    $("#err-" + name.attr("id")).html("Invalid name!");
    $("#err-" + name.attr("id")).removeClass("hide");
    $("#" + name.attr("id")).addClass("error-input");
  } else {
    $("#err-" + name.attr("id")).html("");
    $("#err-" + name.attr("id")).addClass("hide");
    $("#" + name.attr("id")).removeClass("error-input");
    isNameValid = true;
  }

  if (
    /<\/?[a-z][\s\S]*>/i.test(contactnumber.val()) ||
    contactnumber.val() === "" ||
    contactnumber.val() === undefined ||
    contactnumber.val().length != 10
  ) {
    $("#err-" + contactnumber.attr("id")).html("Invalid contact number!");
    $("#err-" + contactnumber.attr("id")).removeClass("hide");
    $("#" + contactnumber.attr("id")).addClass("error-input");
  } else {
    $("#err-" + contactnumber.attr("id")).html("");
    $("#err-" + contactnumber.attr("id")).addClass("hide");
    $("#" + contactnumber.attr("id")).removeClass("error-input");
    isContactNumberValid = true;
  }

  if (
    email.val() === "" ||
    email.val() === undefined ||
    !/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(
      email.val()
    )
  ) {
    $("#err-" + email.attr("id")).html("Invalid email!");
    $("#err-" + email.attr("id")).removeClass("hide");
    $("#" + email.attr("id")).addClass("error-input");
  } else {
    $("#err-" + email.attr("id")).html("");
    $("#err-" + email.attr("id")).addClass("hide");
    $("#" + email.attr("id")).removeClass("error-input");
    isEmailValid = true;
  }

  if (
    /<\/?[a-z][\s\S]*>/i.test(subject.val()) ||
    subject.val() === "" ||
    subject.val() === undefined
  ) {
    $("#err-" + subject.attr("id")).html("Invalid subject!");
    $("#err-" + subject.attr("id")).removeClass("hide");
    $("#" + subject.attr("id")).addClass("error-input");
  } else {
    $("#err-" + subject.attr("id")).html("");
    $("#err-" + subject.attr("id")).addClass("hide");
    $("#" + subject.attr("id")).removeClass("error-input");
    isSubjectValid = true;
  }

  if (
    /<\/?[a-z][\s\S]*>/i.test(message.val()) ||
    message.val() === "" ||
    message.val() === undefined
  ) {
    $("#err-" + message.attr("id")).html("Invalid message!");
    $("#err-" + message.attr("id")).removeClass("hide");
    $("#" + message.attr("id")).addClass("error-input");
  } else if (message.val().length > 250) {
    $("#err-" + message.attr("id")).html(
      "Message exceeds limit of 250 character!"
    );
    $("#err-" + message.attr("id")).removeClass("hide");
    $("#" + message.attr("id")).addClass("error-input");
  } else {
    $("#err-" + message.attr("id")).html("");
    $("#err-" + message.attr("id")).addClass("hide");
    $("#" + message.attr("id")).removeClass("error-input");
    isMessageValid = true;
  }

  if (
    isNameValid &&
    isContactNumberValid &&
    isEmailValid &&
    isSubjectValid &&
    isMessageValid
  ) {
    let whatsAppMessage = `Hello,\r\nMy name is ${name.val()}. I want to enquire about ${subject.val()}.\r\n${message.val()}.\r\nYou can contact me on my email address ${email.val()} or contact number ${contactnumber.val()}.`;
    let encodedWhatsAppMessage = encodeURI(whatsAppMessage);
    window.open(
      `https://wa.me/919099825258?text=${encodedWhatsAppMessage}`,
      "_blank"
    );
  }
}

function preserveScrollPosition() {
  sessionStorage.setItem("scrollPosition", document.documentElement.scrollTop);
}
