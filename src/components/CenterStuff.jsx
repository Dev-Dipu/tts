import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import "@google/model-viewer";

const pointsData = {
    point1: {
        top: "25%",
        left: "20%",
        text: "Delivering end-to-end cost, project, and value management services across buildings, infrastructure, and complex engineering sectors.",
        side: "left",
    },
    point2: {
        top: "35%",
        left: "75%",
        text: "Trusted by public and private sector clients across buildings, infrastructure, interiors and petrochemical projects.",
        side: "right",
    },
};

const hudColor = "rgba(15,40,70,0.75)";

const CenterStuff = () => {
    const [active, setActive] = useState(null);

    const containerRef = useRef(null);
    const helmetRef = useRef(null); // ✅ NEW (Intro animation)
    const pointRefs = useRef({});

    const panelRef = useRef(null);
    const pixelsRef = useRef([]);
    const lineRef = useRef(null);
    const textRef = useRef(null);

    const borderRef = useRef(null);

    // ✅ PREMIUM INTRO ANIMATION (Only Addition)
    useLayoutEffect(() => {
        const tl = gsap.timeline({ delay: 0.6 });

        tl.fromTo(
            helmetRef.current,
            { y: 40, opacity: 0, scale: 0.96 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1.2,
                ease: "expo.out",
            },
        );

        tl.fromTo(
            Object.values(pointRefs.current),
            { opacity: 0, scale: 0.6 },
            {
                opacity: 1,
                scale: 1,
                duration: 0.6,
                stagger: 0.15,
                ease: "back.out(2)",
            },
            "-=0.6",
        );
    }, []);

    // Hover Glow Animation
    const glowIn = (el) => {
        gsap.to(el, {
            boxShadow: "0 0 10px rgba(255,255,255,0.4)",
            scale: 1.15,
            duration: 0.35,
            ease: "power3.out",
        });
    };

    const glowOut = (el) => {
        gsap.to(el, {
            boxShadow: "0 0 0px rgba(255,255,255,0)",
            scale: 1,
            duration: 0.35,
            ease: "power3.out",
        });
    };

    // ✅ HUD Open Animation (UNCHANGED)
    useLayoutEffect(() => {
        if (!active) return;

        const tl = gsap.timeline();

        gsap.set(pixelsRef.current, { scale: 0, opacity: 0 });
        gsap.set(borderRef.current, { opacity: 0 });

        gsap.set(lineRef.current, { scaleX: 0 });
        gsap.set(textRef.current, { opacity: 0, x: -15 });

        tl.fromTo(
            panelRef.current,
            { opacity: 0, scale: 0.85 },
            {
                opacity: 1,
                scale: 1,
                duration: 0.55,
                ease: "expo.out",
            },
        );

        tl.to(
            pixelsRef.current,
            {
                scale: 1,
                opacity: 1,
                stagger: {
                    each: 0.05,
                    from: "center",
                },
                duration: 0.45,
                ease: "back.out(1.8)",
            },
            "-=0.25",
        );

        tl.to(
            borderRef.current,
            {
                opacity: 1,
                duration: 0.35,
                ease: "power2.out",
            },
            "+=0.05",
        );

        tl.to(
            lineRef.current,
            {
                scaleX: 1,
                duration: 0.5,
                ease: "power3.out",
                transformOrigin: "left",
            },
            "-=0.25",
        );

        tl.to(
            textRef.current,
            {
                opacity: 1,
                x: 0,
                duration: 0.55,
                ease: "power3.out",
            },
            "-=0.3",
        );
    }, [active]);

    // Outside Click Close Logic (UNCHANGED)
    useLayoutEffect(() => {
        const handleClickOutside = () => {
            if (active) setActive(null);
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [active]);

    return (
        <div
            ref={containerRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[46%] w-[32%] select-none"
        >
            {/* Helmet Image */}
            <model-viewer
                ref={helmetRef}
                src="/models/helmet.glb"
                alt="3D Helmet"
                auto-rotate
                disable-progress-bar
                rotation-per-second="16deg"
                camera-controls={false}
                disable-zoom
                environment-image="neutral"
                shadow-intensity=".8"
                className="w-full h-[80vh] object-cover"
                tone-mapping="aces"

            />

            {/* ================= POINTS ================= */}
            {Object.keys(pointsData).map((key) => {
                const point = pointsData[key];

                return (
                    <div
                        key={key}
                        style={{ top: point.top, left: point.left }}
                        className="absolute cursor-pointer"
                        onMouseEnter={() => glowIn(pointRefs.current[key])}
                        onMouseLeave={() => glowOut(pointRefs.current[key])}
                        onClick={() => setActive(key)}
                    >
                        <div
                            ref={(el) => (pointRefs.current[key] = el)}
                            className="w-6 h-6 border border-white/50 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-sm"
                        >
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                    </div>
                );
            })}

            {/* ================= HUD PANEL ================= */}
            {active && (
                <div
                    ref={panelRef}
                    style={{
                        top: pointsData[active].top,
                        left: pointsData[active].left,
                    }}
                    className="absolute w-[180px] h-[180px] -translate-x-[43.5%] -translate-y-[43.5%]"
                >
                    <div className="absolute inset-0 bg-blue-400/20 backdrop-blur-[1px]" />

                    {/* Corner Brackets + Midlines */}
                    <div ref={borderRef} className="absolute inset-0">
                        <span
                            className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2"
                            style={{ borderColor: hudColor }}
                        />
                        <span
                            className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2"
                            style={{ borderColor: hudColor }}
                        />
                        <span
                            className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2"
                            style={{ borderColor: hudColor }}
                        />
                        <span
                            className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2"
                            style={{ borderColor: hudColor }}
                        />

                        {/* Mid Lines */}
                        <span
                            className="absolute top-0 left-1/2 w-10 h-[2px] -translate-x-1/2"
                            style={{ backgroundColor: hudColor }}
                        />
                        <span
                            className="absolute bottom-0 left-1/2 w-10 h-[2px] -translate-x-1/2"
                            style={{ backgroundColor: hudColor }}
                        />
                        <span
                            className="absolute left-0 top-1/2 h-10 w-[2px] -translate-y-1/2"
                            style={{ backgroundColor: hudColor }}
                        />
                        <span
                            className="absolute right-0 top-1/2 h-10 w-[2px] -translate-y-1/2"
                            style={{ backgroundColor: hudColor }}
                        />
                    </div>

                    {/* Inner Focus Square */}
                    <div
                        className="absolute inset-[35%] border"
                        style={{ borderColor: hudColor }}
                    />

                    {/* Center Target Ring */}
                    <div
                        className="absolute top-1/2 left-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full border"
                        style={{ borderColor: hudColor }}
                    />

                    {/* Pixel Reveal Grid */}
                    <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-[2px]">
                        {[...Array(9)].map((_, i) => (
                            <div
                                key={i}
                                ref={(el) => (pixelsRef.current[i] = el)}
                                className="bg-blue-500/10 border border-blue-300/20 backdrop-blur-[0.5px]"
                            />
                        ))}
                    </div>

                    {/* Line */}
                    <div
                        ref={lineRef}
                        className="absolute top-1/2 h-[2px] w-[140px]"
                        style={{
                            backgroundColor: hudColor,
                            left:
                                pointsData[active].side === "right"
                                    ? "100%"
                                    : "auto",
                            right:
                                pointsData[active].side === "left"
                                    ? "100%"
                                    : "auto",
                        }}
                    />

                    {/* Text */}
                    <p
                        ref={textRef}
                        className="absolute top-1/2 -translate-y-1/2 w-[320px]"
                        style={{
                            color: hudColor,
                            left:
                                pointsData[active].side === "right"
                                    ? "calc(100% + 150px)"
                                    : "auto",
                            right:
                                pointsData[active].side === "left"
                                    ? "calc(100% + 150px)"
                                    : "auto",
                            textAlign:
                                pointsData[active].side === "left"
                                    ? "right"
                                    : "left",
                        }}
                    >
                        {pointsData[active].text}
                    </p>
                </div>
            )}
        </div>
    );
};

export default CenterStuff;
