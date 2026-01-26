import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const MobileBlock = () => {
  const wrapperRef = useRef(null);
  const barRef = useRef(null);

  useLayoutEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      wrapperRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power2.out" }
    );

    tl.fromTo(
      ".uc-item",
      { y: 25, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.9,
        ease: "expo.out",
      },
      "-=0.4"
    );

    // Infinite loading bar
    gsap.to(barRef.current, {
      scaleX: 1,
      transformOrigin: "left",
      duration: 1.8,
      repeat: -1,
      ease: "power1.inOut",
      yoyo: true,
    });
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050B14]"
    >
      <div className="text-center px-6 max-w-sm">
        {/* Logo */}
        <h1 className="uc-item text-3xl font-semibold text-white tracking-wide">
          TTS
        </h1>

        {/* Subtitle */}
        <p className="uc-item mt-4 text-white/70 text-sm leading-relaxed hidden">
          This experience is currently being crafted for desktop screens.
        </p>

        {/* Under Construction */}
        <p className="uc-item mt-2 text-white text-lg font-medium">
          🚧 Under Construction
        </p>

        {/* Premium Loader */}
        <div className="uc-item hidden mt-6 h-[3px] w-full bg-white/10 overflow-hidden rounded-full">
          <span
            ref={barRef}
            className="block h-full w-full bg-white/70 scale-x-0"
          />
        </div>

        {/* Hint */}
        <p className="uc-item mt-6 text-xs text-white/40">
          Please open on a larger screen for the full cinematic experience.
        </p>
      </div>
    </div>
  );
};

export default MobileBlock;
