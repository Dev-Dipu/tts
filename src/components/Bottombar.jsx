import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import SlidingBanner from "./SlidingBanner";

const Bottombar = () => {
  const textRef = useRef(null);
  const videoRef = useRef(null);

  useLayoutEffect(() => {
    gsap.fromTo(
      textRef.current,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        delay: 0.4, // navbar ke baad
        ease: "expo.out",
      }
    );
    gsap.fromTo(
      videoRef.current,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        delay: 0.8, // navbar ke baad
        ease: "expo.out",
      }
    );
  }, []);

  return (
    <div className="flex justify-between items-end">
      {/* LEFT TEXT */}
      <div ref={textRef} className="max-w-lg">
        <h1 className="text-4xl font-semibold leading-tight">
          Shaping Cost. Delivering Value.
          Since 1984.
        </h1>

        <p className="mt-4 text-sm text-gray-600 max-w-sm">
          A Leading Dubai-Based Cost Consultancy Delivering Expert Quantity
          Surveying, Project Management, And Value-Driven Construction Solutions
          Across The Middle East.
        </p>

        {/* Button */}
        <button className="mt-5 px-8 py-3 rounded-sm bg-primary text-white text-sm font-medium hover:bg-blue-800 transition cursor-pointer">
          Explore Expertise
        </button>
      </div>

      {/* Banner Already Animated */}
      {/* <SlidingBanner /> */}
      <div ref={videoRef} className="relative bg-[royalblue] aspect-video h-[25vh] overflow-hidden rounded-sm">
        <video
  src="https://cdn.cosmos.so/59cd197e-e711-4fde-a554-6d30327d457d.mp4"
  autoPlay
  muted
  loop
  className="w-full h-full object-cover 
             brightness-[0.75]
             contrast-[1.2]
             saturate-[0.7]
             sepia-[0.15]
             hue-rotate-[200deg]"
/>

      </div>

    </div>
  );
};

export default Bottombar;
