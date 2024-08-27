$(document).ready(function() {

  if (localStorage.getItem("reloadAnimationRequired") === undefined || localStorage.getItem("reloadAnimationRequired") === null) {
    localStorage.setItem("reloadAnimationRequired", false)
  }

  resetCoverHeight();
  $(window).on("resize", function () {
    resetCoverHeight();
  });
    
    gsap.registerPlugin(ScrollTrigger);

    async function getImagesFromCloudinary() {

        let title = document.title.split(" - ")[1];
    
        const res = await fetch("https://anilchauhanphotography-imageservice.onrender.com/api/images/?folderName=" + title, {
            method: 'GET'
        })
        const data = await res.json();
        return data.data;
    }

    getImagesFromCloudinary().then(images => {
        images.forEach((item, index) => {
          $('.gallery').append(`<a class="image-popup-no-margins" href="${item}"><div class='mask'><figure class="gallery-image"><img src="${modifyImageUrl(item)}" alt="image"></figure></div></a>`);
        })

        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.9
          };
          
          let revealCallback = (entries, self) => {
            entries.forEach((entry) => {
              let container = entry.target;
              let img = entry.target.querySelector(".gallery-image");
              const easeInOut = "power3.out";
              const revealAnim = gsap.timeline({ ease: easeInOut });
          
              if (entry.isIntersecting) {
                revealAnim.set(container, {
                  visibility: "visible"
                });
                revealAnim.fromTo(
                  container,
                  {
                    clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
                    webkitClipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)"
                  },
                  {
                    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                    webkitClipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                    duration: 1,
                    ease: easeInOut
                  }
                );
                revealAnim.from(img, 4, {
                  scale: 1.4,
                  ease: easeInOut,
                  delay: -1
                });
                self.unobserve(entry.target);
              }
            });
          };
          
          let revealObserver = new IntersectionObserver(revealCallback, options);
          
          document.querySelectorAll(".mask").forEach((reveal) => {
            revealObserver.observe(reveal);
          });

          $('.zoom-gallery').magnificPopup({
            delegate: 'a',
            type: 'image',
            closeOnContentClick: false,
            closeBtnInside: false,
            mainClass: 'mfp-with-zoom mfp-img-mobile',
        
            // If you enable allowHTMLInTemplate - 
            // make sure your HTML attributes are sanitized if they can be created by a non-admin user
            allowHTMLInTemplate: true,
            image: {
              verticalFit: true,
              // titleSrc: function(item) {
              //   return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">image source</a>';
              // }
            },
        
            gallery: {
              enabled: true
            },
            zoom: {
              enabled: true,
              duration: 300, // don't foget to change the duration also in CSS
              opener: function(element) {
                return element.find('img');
              }
            }
            
          });
          
          
    });

});

function resetCoverHeight() {
  $(".gallery-fixed-container").css({ top: $(".navigation").outerHeight() + 'px' });
  $(".gallery-description-container").css({ top: $(".navigation").outerHeight() + 'px' });
}

function modifyImageUrl(url) {
  let imageOptions = 'f_auto,q_auto';
  let urlParts = url.split('/');

  // Insert the data at the appropriate position
  urlParts.splice(6, 0, imageOptions);

  // Join the parts back into a full URL
 return urlParts.join('/');
}