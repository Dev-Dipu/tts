import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

const Navbar = () => {
  const navRef = useRef(null);
  const wrapperRef = useRef(null);
  const indicatorRef = useRef(null);

  const logoRef = useRef(null);
  const contactRef = useRef(null);

  // Default active link = Home
  const [activeIndex, setActiveIndex] = useState(0);

  // Move indicator smoothly
  const moveIndicator = (el) => {
    gsap.to(indicatorRef.current, {
      x: el.offsetLeft,
      width: el.offsetWidth,
      duration: 0.65,
      ease: "expo.out",
    });
  };

  // Hover
  const handleHover = (e) => moveIndicator(e.currentTarget);

  // Leave → back to active
  const handleLeave = () => {
    const links = wrapperRef.current.querySelectorAll(".nav-link");
    moveIndicator(links[activeIndex]);
  };

  // ✅ Page Load Animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const links = wrapperRef.current.querySelectorAll(".nav-link");

      // Place indicator initially
      moveIndicator(links[activeIndex]);

      // ✅ Force elements visible (prevents stuck opacity)
      gsap.set(contactRef.current, { opacity: 1, x: 0 });
      gsap.set(logoRef.current, { opacity: 1, scale: 1 });

      const tl = gsap.timeline({ delay: 0.1 });

      // Whole navbar fade down
      tl.from(navRef.current, {
        y: -25,
        opacity: 0,
        duration: 0.8,
        ease: "expo.out",
      });

      // Links stagger
      tl.from(
        links,
        {
          y: -10,
          opacity: 0,
          stagger: 0.07,
          duration: 0.5,
          ease: "power3.out",
        },
        "-=0.45"
      );

      // Logo pop
      tl.from(
        logoRef.current,
        {
          scale: 0.85,
          opacity: 0,
          duration: 0.55,
          ease: "back.out(1.6)",
        },
        "-=0.4"
      );

      // Contact slide in
      tl.from(
        contactRef.current,
        {
          x: 25,
          opacity: 0,
          duration: 0.25,
          ease: "power3.inOut",
        },
        "-=0.45"
      );

      // Indicator fade in last
      tl.from(
        indicatorRef.current,
        {
          opacity: 0,
          duration: 0.35,
          ease: "power2.out",
        },
        "-=0.25"
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <nav
      ref={navRef}
      className="w-full relative flex items-center justify-between text-lg"
    >
      {/* Left Menu Wrapper */}
      <div
        ref={wrapperRef}
        onMouseLeave={handleLeave}
        className="relative flex gap-6"
      >
        {/* Floating Indicator */}
        <span
          ref={indicatorRef}
          className="absolute top-1.5 bottom-1.5 left-0 bg-gray-200 rounded-sm"
          style={{ zIndex: 0 }}
        />

        {/* GAP MASK */}
        <span
          className="absolute top-0 bottom-0 bg-white pointer-events-none"
          style={{
            left: "calc(56.2% - 12px)",
            width: "24px",
            zIndex: 5,
          }}
        />

        {/* Group 1 */}
        <div className="flex gap-1 px-2 py-1.5 bg-gray-100 rounded-sm">
          {["Home", "About", "Services"].map((item, index) => (
            <a
              key={index}
              href="#"
              onMouseEnter={handleHover}
              onClick={() => setActiveIndex(index)}
              className="nav-link relative z-10 px-2.5 py-1.5 rounded-sm text-sm font-medium text-gray-700"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Group 2 */}
        <div className="flex gap-1 px-2 py-1.5 bg-gray-100 rounded-sm">
          {["Projects", "Insights"].map((item, index) => (
            <a
              key={index + 3}
              href="#"
              onMouseEnter={handleHover}
              onClick={() => setActiveIndex(index + 3)}
              className="nav-link relative z-10 px-2.5 py-1.5 rounded-sm text-sm font-medium text-gray-700"
            >
              {item}
            </a>
          ))}
        </div>
      </div>

      {/* Center Logo */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <button
          ref={logoRef}
          className="px-8 py-3 rounded-sm text-lg font-semibold text-gray-700"
        >
          TTS
        </button>
      </div>

      {/* Right Contact Button */}
      <div>
        <button
          ref={contactRef}
          className="px-8 py-3 rounded-sm bg-primary text-white text-sm font-medium hover:bg-blue-800 transition cursor-pointer"
        >
          Contact
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
