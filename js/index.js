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
            gsap.registerPlugin(ScrollTrigger);
            initCategoryOverlayEffect();
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
                                .find(".img-container")
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
                    el: '#cover-swiper-pagination',
                    clickable: true,
                    renderBullet: function (index, className) {
                        return '<span class="' + className + '"></span>';
                    },
                }
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
            }

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
                    el: '#testimonial-swiper-pagination',
                    clickable: false,
                    renderBullet: function (index, className) {
                        return '<span class="' + className + '"></span>';
                    },
                },
                navigation: {
                    nextEl: '#testimonial-controls .next-ctrl',
                    prevEl: '#testimonial-controls .prev-ctrl',
                }
            }

            parallaxSlider = new Swiper("#cover-slider", parallaxSliderOptions);
            testimonialContentSlider = new Swiper("#testimonial-container-right", testimonialContentSliderOptions);
            testimonialImageSlider = new Swiper("#testimonial-container-left", testimonialImageSliderOptions);
            // testimonialSlider = new Swiper("#testimonial-swiper", testimonialSliderOptions);
            $(window).on("resize", function () {
                testimonialImageSlider.destroy();
                testimonialContentSlider.destroy();
                parallaxSlider.destroy();
                parallaxSlider = new Swiper("#cover-slider", parallaxSliderOptions);
                testimonialImageSlider = new Swiper("#testimonial-container-left", testimonialImageSliderOptions);
                testimonialContentSlider = new Swiper("#testimonial-container-right", testimonialContentSliderOptions);
                testimonialImageSlider.controller.control = testimonialContentSlider;
            });
            $(".home-link").on("click", function () {
                setTimeout(function () {
                parallaxSlider.destroy();
                testimonialImageSlider.destroy();
                testimonialContentSlider.destroy();
                parallaxSlider = new Swiper(
                    "#cover-slider",
                    parallaxSliderOptions
                );
                testimonialImageSlider = new Swiper("#testimonial-container-left", testimonialImageSliderOptions);
                testimonialContentSlider = new Swiper("#testimonial-container-right", testimonialContentSliderOptions);
                testimonialImageSlider.controller.control = testimonialContentSlider;
                }, 750);
            });

            $(".navigation-close").on("click", function () {
                setTimeout(function () {
                parallaxSlider.destroy();
                testimonialImageSlider.destroy();
                testimonialContentSlider.destroy();
                parallaxSlider = new Swiper(
                    "#cover-slider",
                    parallaxSliderOptions
                );
                testimonialImageSlider = new Swiper("#testimonial-container-left", testimonialImageSliderOptions);
                testimonialContentSlider = new Swiper("#testimonial-container-right", testimonialContentSliderOptions);
                testimonialImageSlider.controller.control = testimonialContentSlider;
                }, 750);
            });

            testimonialImageSlider.controller.control = testimonialContentSlider;

            $("#submit").on("click", function() {
                onSubmitContactUsForm();
            });

            myMap();
            let tl = gsap.timeline({
                // ease: "none",
                scrollTrigger: {
                    trigger: ".contact-us",
                    start: "top center",
                    end: "+=400",
                    toggleActions: "restart complete none reset",
                    scrub: true
                },
            });
    
            // tl.set(container, { autoAlpha: 0 });
            // tl.from(panel, 1.5, {
            //     // scrollTrigger: panel,
            //     // xPercent: -100,
            //     ease: Power2.out
            // })
            tl.from("#googleMap", 2, {
                opacity: 0,
                x: -100,
                ease: Power2.out,
            });

            tl.from("#myForm", 2, {
                opacity: 0,
                x: 100,
                ease: Power2.out,
            });
        });
        //parallax over

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
            // console.log("scroll bottom");
            document.getElementsByClassName("navigation")[0].classList.add("scroll");
            // document.getElementsByClassName("logo")[0].classList.remove("center");
            // document
            //   .getElementsByClassName("navigation-links")[0]
            //   .classList.remove("hide");
            // document.getElementById("logo").style.fontSize = "25px";
    } else {
        // console.log("scroll top");
        document.getElementsByClassName("navigation")[0].classList.remove("scroll");
        // document.getElementsByClassName("logo")[0].classList.add("center");
        // document
        //   .getElementsByClassName("navigation-links")[0]
        //   .classList.add("hide");
        // document.getElementById("logo").style.fontSize = "35px";
    }
}

function scrollToParticularElement(element, isFromBurgerMenu) {
    if (isFromBurgerMenu) {
        $(".burger-menu-icon").prop('checked', false);
    }
    $('html, body').animate({
        scrollTop: $(element).offset().top
    }, 1200);
}

function initCategoryOverlayEffect() {
    let categoryPanels = gsap.utils.toArray(".category");
    // console.log(categoryPanels);
    // let tops = categoryPanels.map(panel => ScrollTrigger.create({trigger: panel, start: "top top"}));
    categoryPanels.forEach((panel, i) => {
        // let image = panel.querySelector("img");
        ScrollTrigger.create({
            trigger: panel,
            start: () => panel.offsetHeight < window.innerHeight ? "top top" : "bottom bottom", // if it's shorter than the viewport, we prefer to pin it at the top
            // start: "top top",
            pin: true,
            pinSpacing: false,
            // scrub: true,
            // markers: true,
            onEnter: () => {
                // debugger;
                // console.log("entered: ");
                // gsap.from(image.id, 0.5, { scale: 1.3, delay: 1.1 });
            }
        });

        let image = panel.querySelector(".overlay-img");
        // let h1 = panel.querySelector("h1");
        let tl = gsap.timeline({
            // ease: "none",
            scrollTrigger: {
                trigger: panel,
                // toggleActions: "restart none none reset",
                start: "top top",
                // start: () => panel.offsetHeight < window.innerHeight ? "top top" : "bottom bottom",
                // pin: true,
                // pinSpacing: false,
                // start: "top top",
                // markers: true,
                toggleActions: "restart complete none reset",
                // scrub: true
            },
        });

        // tl.set(container, { autoAlpha: 0 });
        // tl.from(panel, 1.5, {
        //     // scrollTrigger: panel,
        //     // xPercent: -100,
        //     ease: Power2.out
        // })
        tl.from(image, 0.5, {
            // scrollTrigger: panel,
            // xPercent: 100,
            scale: 1.3,
            // delay: -1.5,
            ease: Power2.out
        });
        // console.log(tl.duration());
        // console.log('*', tl);
        // console.log('***', tl.scrollTrigger);
    });
    ScrollTrigger.refresh();
    // GSDevTools.create();
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

function myMap() {
    var mapProp= {
      center:new google.maps.LatLng(21.1414806,72.7776534),
      zoom:15,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
    var marker = new google.maps.Marker({position: new google.maps.LatLng(21.1414806,72.7776534)});
    marker.setMap(map);
  }

function onSubmitContactUsForm() {
    let isNameValid = false, isContactNumberValid = false, isEmailValid = false, isSubjectValid = false, isMessageValid = false;
    let name = $("#name");
    let contactnumber = $("#contactnumber");
    let email = $("#email");
    let subject = $("#subject");
    let message = $("#message");

    if (/<\/?[a-z][\s\S]*>/i.test(name.val()) || name.val() === '' || name.val() === undefined) {
        $("#err-" + name.attr('id')).html("Invalid name!");
        $("#" + name.attr('id')).addClass("error-input");
    } else {
        $("#err-" + name.attr('id')).html("");
        $("#" + name.attr('id')).removeClass("error-input");
        isNameValid = true;
    }

    if (/<\/?[a-z][\s\S]*>/i.test(contactnumber.val()) || contactnumber.val() === '' || contactnumber.val() === undefined || contactnumber.val().length != 10) {
        $("#err-" + contactnumber.attr('id')).html("Invalid contact number!");
        $("#" + contactnumber.attr('id')).addClass("error-input");
    } else {
        $("#err-" + contactnumber.attr('id')).html("");
        $("#" + contactnumber.attr('id')).removeClass("error-input");
        isContactNumberValid = true;
    }

    if (email.val() === '' || email.val() === undefined || !(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(email.val()))) {
        $("#err-" + email.attr('id')).html("Invalid email!");
        $("#" + email.attr('id')).addClass("error-input");
    } else {
        $("#err-" + email.attr('id')).html("");
        $("#" + email.attr('id')).removeClass("error-input");
        isEmailValid = true;
    }

    if (/<\/?[a-z][\s\S]*>/i.test(subject.val()) || subject.val() === '' || subject.val() === undefined) {
        $("#err-" + subject.attr('id')).html("Invalid subject!");
        $("#" + subject.attr('id')).addClass("error-input");
    } else {
        $("#err-" + subject.attr('id')).html("");
        $("#" + subject.attr('id')).removeClass("error-input");
        isSubjectValid = true;
    }

    if (/<\/?[a-z][\s\S]*>/i.test(message.val()) || message.val() === '' || message.val() === undefined) {
        $("#err-" + message.attr('id')).html("Invalid message!");
        $("#" + message.attr('id')).addClass("error-input");
    } else if (message.val().length > 250) {
        $("#err-" + message.attr('id')).html("Message exceeds limit of 250 character!");
        $("#" + message.attr('id')).addClass("error-input");
    } else {
        $("#err-" + message.attr('id')).html("");
        $("#" + message.attr('id')).removeClass("error-input");
        isMessageValid = true;
    }

    if (isNameValid && isContactNumberValid && isEmailValid && isSubjectValid && isMessageValid) {
        let whatsAppMessage = 
        `Hello,\r\nMy name is ${name.val()}. I want to enquire about ${subject.val()}.\r\n${message.val()}.\r\nYou can contact me on my email address ${email.val()} or contact number ${contactnumber.val()}.`
        let encodedWhatsAppMessage = encodeURI(whatsAppMessage);
        window.open(`https://wa.me/919081301107?text=${encodedWhatsAppMessage}`, "_blank");
    }
}