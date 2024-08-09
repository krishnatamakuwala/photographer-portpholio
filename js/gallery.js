$(document).ready(function() {
    
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    })

    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    let galleryImages = gsap.utils.toArray(".gallery-img");
    debugger;
    galleryImages.forEach((image, i) => {
        let tl = gsap.timeline({
        scrollTrigger: {
            trigger: image,
            scrub: true,
            on: {
                resize: function () {
                    this.update();
                },
            }
        }
        })
        .to('.gallery-img', {
            // duration: 1,
            stagger: .2,
            y: -500,
            // scrub: true,
            // ease: "power2.inOut",
        })
    })

});


getImagesFromCloudinary().then(images => {
    console.log('Images:', images);
    images.forEach((item, index) => {
        $("#gallery-container").append(`<div class="gallery-img" style="background-image: url('${item}')"></div>`)
    })
});


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

    
    const res = await fetch("http://localhost:1254/?folderName=EV-PINPOINT", {
        method: 'GET'
    })
    const data= await res.json();
    console.log(data);
    return data.imageUrls;
}
