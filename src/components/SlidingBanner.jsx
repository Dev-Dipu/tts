import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const images = [
  "/images/bannerpic1.png",
  "https://static.dezeen.com/uploads/2008/09/selfridges-window8.jpg",
  "https://lkaaarchitecturalreferences.wordpress.com/wp-content/uploads/2019/01/snohetta_ryerson-10.jpg?w=765",
  "https://i.ytimg.com/vi/gH_wh0rucMw/maxresdefault.jpg",
];

const SlidingBanner = () => {
  const bannerRef = useRef(null);
  const imgRef = useRef(null);
  const fillRefs = useRef([]);

  useLayoutEffect(() => {
  let interval;

  const ctx = gsap.context(() => {
    let index = 0;

    // ✅ RESET INITIAL STATES
    gsap.set(bannerRef.current, { opacity: 1, y: 0 });
    gsap.set(imgRef.current, { opacity: 1, scale: 1 });

    fillRefs.current.forEach((fill) => {
      gsap.set(fill, { scaleX: 0, transformOrigin: "left" });
    });

    // ✅ PRELOAD ALL IMAGES FIRST
    const preloadImages = async () => {
      const promises = images.map((src) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = resolve;
        });
      });

      await Promise.all(promises);
      startSlider();
    };

    // ✅ Animate Progress Bar Fill
    const animateBarFill = () => {
      fillRefs.current.forEach((fill) => {
        gsap.set(fill, { scaleX: 0 });
      });

      gsap.to(fillRefs.current[index], {
        scaleX: 1,
        duration: 3,
        ease: "linear",
      });
    };

    // ✅ Slide Change Animation
    const changeSlide = () => {
      index = (index + 1) % images.length;

      gsap.to(imgRef.current, {
        opacity: 0,
        scale: 1.05,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => {
          // Change Image
          imgRef.current.src = images[index];

          // Fade In New Image
          gsap.fromTo(
            imgRef.current,
            { opacity: 0, scale: 1.12 },
            {
              opacity: 1,
              scale: 1,
              duration: 1,
              ease: "expo.out",
            }
          );

          // Restart Progress Fill
          animateBarFill();
        },
      });
    };

    // ✅ Start Slider with Navbar Delay
    const startSlider = () => {
      // Intro Animation (Delayed)
      gsap.from(bannerRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        delay: 0.8, // ✅ Navbar ke baad entry
        ease: "expo.out",
      });

      // Start fill + loop AFTER banner appears
      gsap.delayedCall(0.8, () => {
        animateBarFill();
        interval = setInterval(changeSlide, 3000);
      });
    };

    preloadImages();
  }, bannerRef);

  // ✅ Cleanup
  return () => {
    clearInterval(interval);
    ctx.revert();
  };
}, []);


  return (
    <div
      ref={bannerRef}
      className="absolute bottom-10 right-12 flex flex-col gap-4 max-w-sm"
    >
      {/* Progress Bars (Premium Fill Style) */}
      <div className="flex gap-4 px-1">
        {images.map((_, i) => (
          <div
            key={i}
            className="w-1/4 h-[4px] rounded-full bg-blue-200/60 overflow-hidden"
          >
            {/* Fill Bar */}
            <span
              ref={(el) => (fillRefs.current[i] = el)}
              className="block w-full h-full bg-primary"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        ))}
      </div>

      {/* Image Card */}
      <div className="w-full aspect-video bg-blue-200/60 rounded-sm overflow-hidden">
        <img
          ref={imgRef}
          src={images[0]}
          alt="Banner"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default SlidingBanner;
