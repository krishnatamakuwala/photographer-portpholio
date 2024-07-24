//loader
paceOptions = {
  ajax: true,
  document: true,
  eventLag: false,
};

Pace.on("done", function () {
  $("#preloader")
    .delay(0)
    .animate({ top: "-120%" }, 3800, $.bez([0.19, 1, 0.22, 1]));
});

$(window).on("load", function () {
  $(function () {
    //slideshow

    new Swiper("#projects .swiper-container", {
      slidesPerView: "auto",
      speed: 1000,
      spaceBetween: 30,
      centeredSlides: true,
      loop: true,
      grabCursor: false,
      navigation: {
        nextEl: "#next",
        prevEl: "#prev",
      },
      mousewheel: false,
      allowTouchMove: false,
      // observer: true,
      // observeParents: true,
    });

    //parallax
    $(document).ready(function () {
      var parallaxSlider;
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
        allowTouchMove: false,
        on: {
          init: function () {
            let swiper = this;
            for (let i = 0; i < swiper.slides.length; i++) {
              $(swiper.slides[i])
                .find(".img-container")
                .attr({
                  "data-swiper-parallax": 0.75 * swiper.width,
                });
            }
          },
          resize: function () {
            this.update();
          },
        },
        pagination: {
          el: ".swiper-pagination",
          type: "progressbar",
        },
        navigation: {
          nextEl: ".slider-controls .next-ctrl",
          prevEl: ".slider-controls .prev-ctrl",
        },
      };

      parallaxSlider = new Swiper(".parallax-slider", parallaxSliderOptions);
      $(window).on("resize", function () {
        parallaxSlider.destroy();
        parallaxSlider = new Swiper(".parallax-slider", parallaxSliderOptions);
      });
      $(".home-link").on("click", function () {
        setTimeout(function () {
          parallaxSlider.destroy();
          parallaxSlider = new Swiper(
            ".parallax-slider",
            parallaxSliderOptions
          );
        }, 750);
      });

      $(".navigation-close").on("click", function () {
        setTimeout(function () {
          parallaxSlider.destroy();
          parallaxSlider = new Swiper(
            ".parallax-slider",
            parallaxSliderOptions
          );
        }, 750);
      });
    });
    //parallax over

    //cursor
    $(function () {
      var body = document.querySelector("body");
      var $cursor = $(".cursor");
      var $cursortwo = $(".cursor-two");
      function cursormover(e) {
        gsap.to($cursor, {
          x: e.clientX,
          y: e.clientY,
        });
        gsap.to($cursortwo, {
          x: e.clientX,
          y: e.clientY,
        });
      }
      function cursorhover(e) {
        gsap.to($cursor, {
          scale: 1.5,
          opacity: 0.4,
          background: "rgb(235,235,235)",
          border: "none",
          ease: Expo.easeOut,
        });
        gsap.to($cursortwo, {
          scale: 0,
          opacity: 0,
        });
      }
      function linkhover(e) {
        gsap.to($cursor, {
          scale: 1.5,
          opacity: 1,
          background: "rgb(245,245,245)",
          border: "none",
          innerHTML: "view <br> project",
        });
        gsap.to($cursortwo, {
          scale: 0,
          opacity: 0,
        });
      }
      function cursor(e) {
        gsap.to($cursor, {
          scale: 1,
          opacity: 1,
          background: "transparent",
          border: "1px solid rgb(235,235,235)",
          innerHTML: "",
        });
        gsap.to($cursortwo, {
          scale: 1,
          opacity: 1,
        });
      }
      $(window).on("mousemove", cursormover);
      $("a").hover(cursorhover, cursor);
      $(".control").hover(cursorhover, cursor);
      $(".hover").hover(cursorhover, cursor);
      //  $('.project-link').hover(linkhover,cursor)
    });

    //cursor over

    // links-animations
    $(function () {
      gsap.from(".opacity", 1, { opacity: 0, delay: 3 });
      gsap.from(".scale", 1, { opacity: 0, delay: 3, scale: 0, stagger: 0.5 });
      gsap.from(".fade-up", 1, {
        y: 120,
        opacity: 0,
        delay: 1.5,
        stagger: 0.25,
      });
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
      // $('.marine-close').on('click',function(){
      //   gsap.to('.marine-project',.5,{scale:.9});
      //   gsap.to('.marine-project',0,{width:'100%',height:'100vh',overflow:'hidden'});
      //   gsap.to('.marine-project',0,{display:'none',delay:.7});
      //   gsap.to('#home',0,{display:'block',delay:.7})
      //   gsap.to('#home',.5,{scale:1,delay:1.1})
      //   gsap.to('.project-name',.5,{opacity:1,delay:1})
      //   gsap.to('#breaker',{display:'block'})
      //   gsap.to('#breaker',0,{display:'none',delay:1.7});
      // })
      // $('.forest-close').on('click',function(){
      //   gsap.to('.forest-project',.5,{scale:.9});
      //   gsap.to('.forest-project',0,{width:'100%',height:'100vh',overflow:'hidden'});
      //   gsap.to('.forest-project',0,{display:'none',delay:.7});
      //   gsap.to('#home',0,{display:'block',delay:.7})
      //   gsap.to('#home',.5,{scale:1,delay:1.1})
      //   gsap.to('.project-name',.5,{opacity:1,delay:1})
      //   gsap.to('#breaker',{display:'block'})
      //   gsap.to('#breaker',0,{display:'none',delay:1.7});
      // })
      // $('.wildlife-close').on('click',function(){
      //   gsap.to('.wildlife-project',.5,{scale:.9});
      //   gsap.to('.wildlife-project',0,{width:'100%',height:'100vh',overflow:'hidden'});
      //   gsap.to('.wildlife-project',0,{display:'none',delay:.7});
      //   gsap.to('#home',0,{display:'block',delay:.7})
      //   gsap.to('#home',.5,{scale:1,delay:1.1})
      //   gsap.to('.project-name',.5,{opacity:1,delay:1})
      //   gsap.to('#breaker',{display:'block'})
      //   gsap.to('#breaker',0,{display:'none',delay:1.7});
      // })
      // $('.city-close').on('click',function(){
      //   gsap.to('.city-project',.5,{scale:.9});
      //   gsap.to('.city-project',0,{width:'100%',height:'100vh',overflow:'hidden'});
      //   gsap.to('.city-project',0,{display:'none',delay:.7});
      //   gsap.to('#home',0,{display:'block',delay:.7})
      //   gsap.to('#home',.5,{scale:1,delay:1.1})
      //   gsap.to('.project-name',.5,{opacity:1,delay:1})
      //   gsap.to('#breaker',{display:'block'})
      //   gsap.to('#breaker',0,{display:'none',delay:1.7});
      // })
    });
  });
});

// window.onscroll = function () {
//   scrollFunction();
// };

function scrollFunction() {
  if (
    document.body.scrollTop > 700 ||
    document.documentElement.scrollTop > 700
  ) {
    console.log("scroll bottom");
    document.getElementsByClassName("navigation")[0].classList.add("scroll");
    // document.getElementsByClassName("logo")[0].classList.remove("center");
    // document
    //   .getElementsByClassName("navigation-links")[0]
    //   .classList.remove("hide");
    // document.getElementById("logo").style.fontSize = "25px";
  } else {
    console.log("scroll top");
    document.getElementsByClassName("navigation")[0].classList.remove("scroll");
    // document.getElementsByClassName("logo")[0].classList.add("center");
    // document
    //   .getElementsByClassName("navigation-links")[0]
    //   .classList.add("hide");
    // document.getElementById("logo").style.fontSize = "35px";
  }
}

var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementsByClassName("navigation")[0].style.top = "0";
  } else {
    document.getElementsByClassName("navigation")[0].style.top = "-80px";
  }
  prevScrollpos = currentScrollPos;
};
