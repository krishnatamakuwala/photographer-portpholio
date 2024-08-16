$(document).ready(function() {
    
    gsap.registerPlugin(ScrollTrigger);

    async function getImagesFromCloudinary() {

        let title = document.title.split(" - ")[1];
    
        const res = await fetch("http://192.168.0.106:1254/?folderName=" + title, {
            method: 'GET'
        })
        const data= await res.json();
        console.log(data);
        return data.imageUrls;
        // return null;
    }

    getImagesFromCloudinary().then(images => {
        console.log('Images:', images);
        images.forEach((item, index) => {
          $('.gallery').append(`<div class='mask'><figure class="gallery-image"><img src="${modifyImageUrl(item)}" alt='image'></figure></div>`);
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
          
    });

});

function modifyImageUrl(url) {
  let imageOptions = 'f_auto,q_auto';
  let urlParts = url.split('/');

  // Insert the data at the appropriate position
  urlParts.splice(6, 0, imageOptions);

  // Join the parts back into a full URL
 return urlParts.join('/');
}