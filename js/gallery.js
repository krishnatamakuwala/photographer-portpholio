$(document).ready(function() {
    
    gsap.registerPlugin(ScrollTrigger);

    async function getImagesFromCloudinary() {
        // const cloudName = "truetalkerchatapp";
        // const folder = "EV-PINPOINT";
        // const apiKey = "629345187586577";
        // const apiSecret = "uVUjbiYwjnuGWWI3zUQ3zc45wX0";
    
        // // In a secure environment, you would generate a signature using your API secret.
        // // This example skips that step because it should be done server-side for security reasons.
    
        // const timestamp = Math.floor(Date.now() / 1000);
    
        // const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/image?prefix=${folder}/&api_key=${apiKey}&timestamp=${timestamp}`;
    
        // try {
        //     const response = await fetch(url, {
        //         method: 'GET',
        //         headers: {
        //             'Authorization': 'Basic ' + btoa(apiKey + ':' + apiSecret),
        //         },
        //     });
    
        //     if (!response.ok) {
        //         throw new Error(`Error fetching images: ${response.statusText}`);
        //     }
    
        //     const data = await response.json();
        //     return data.resources.map(resource => resource.secure_url);
        // } catch (error) {
        //     console.error('Error fetching images:', error);
        // }

        let title = document.title.split(" - ")[1];
    
        const res = await fetch("http://192.168.0.105:1254/?folderName=" + title, {
            method: 'GET'
        })
        const data= await res.json();
        console.log(data);
        return data.imageUrls;
    }

    getImagesFromCloudinary().then(images => {
        console.log('Images:', images);
        images.forEach((item, index) => {
            $("#gallery-container").append(`<div class="gallery-img-container"><img class="gallery-image" src='${item}' alt='image' /></div>`)
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