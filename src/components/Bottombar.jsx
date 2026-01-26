import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import SlidingBanner from "./SlidingBanner";

const Bottombar = () => {
  const textRef = useRef(null);

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
  }, []);

  return (
    <div className="flex justify-between items-end">
      {/* LEFT TEXT */}
      <div ref={textRef} className="max-w-xl">
        <h1 className="text-4xl font-semibold leading-tight">
          Shaping Cost. Delivering Value. <br />
          Since 1984.
        </h1>

        <p className="mt-4 text-sm text-gray-600 max-w-md">
          A Leading Dubai-Based Cost Consultancy Delivering Expert Quantity
          Surveying, Project Management, And Value-Driven Construction Solutions
          Across The Middle East.
        </p>

        {/* Button */}
        <button className="mt-5 px-8 py-3 rounded-sm bg-primary text-white text-sm font-medium hover:bg-blue-800 transition cursor-pointer">
          Explore Our Expertise
        </button>
      </div>

      {/* Banner Already Animated */}
      <SlidingBanner />
    </div>
  );
};

export default Bottombar;
