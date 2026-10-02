import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import "./NotFound.css";

export default function NotFound() {
  const containerRef = useRef(null);
  const monkeyRef = useRef(null);
  const skeletonRef = useRef(null);

  // Hand Element Refs
  const leftHandRef = useRef(null);
  const rightHandRef = useRef(null);

  // Cable SVG Path Refs
  const cableLeftRef = useRef(null);
  const cableRightRef = useRef(null);
  const singleCableRef = useRef(null);
  const electricArcRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.2 });

      // INITIAL STATE: Disconnected Wire Ends & Hands Apart
      tl.set(skeletonRef.current, { opacity: 0 })
        .set(monkeyRef.current, { x: 0, y: 0, rotation: 0 })
        .set(electricArcRef.current, { opacity: 0 })
        .set(singleCableRef.current, { opacity: 0 })
        .set([cableLeftRef.current, cableRightRef.current], { opacity: 1 })
        .set(leftHandRef.current, { x: -8 })
        .set(rightHandRef.current, { x: 8 })
        .set(cableLeftRef.current, { attr: { d: "M 10 50 Q 70 70 120 70" } })
        .set(cableRightRef.current, { attr: { d: "M 270 50 Q 210 70 160 70" } });

      // 1. MONKEY MOVES HANDS TO GRAB AND JOIN CABLES
      tl.to([leftHandRef.current, rightHandRef.current], {
        x: 0,
        duration: 0.4,
        ease: "power2.out",
      })
      .to(
        cableLeftRef.current,
        {
          attr: { d: "M 10 50 Q 70 50 135 50" },
          duration: 0.4,
          ease: "power2.out",
        },
        "<"
      )
      .to(
        cableRightRef.current,
        {
          attr: { d: "M 270 50 Q 210 50 145 50" },
          duration: 0.4,
          ease: "power2.out",
        },
        "<"
      );

      // 2. HANDS CONNECT WIRE -> SWITCH TO SINGLE CONNECTED CABLE & TRIGGER SHOCK
      tl.set([cableLeftRef.current, cableRightRef.current], { opacity: 0 })
        .set(singleCableRef.current, { opacity: 1 })
        .to(monkeyRef.current, {
          x: "+=3",
          y: "-=2",
          duration: 0.04,
          repeat: 10,
          yoyo: true,
          ease: "none",
        })
        .to(
          skeletonRef.current,
          {
            opacity: 1,
            duration: 0.08,
            repeat: 5,
            yoyo: true,
            ease: "none",
          },
          "<"
        )
        .to(
          electricArcRef.current,
          {
            opacity: 1,
            duration: 0.08,
            repeat: 5,
            yoyo: true,
          },
          "<"
        );

      // 3. SKELETON JUMP: Flying upward with single connected wire
      tl.to(monkeyRef.current, {
        y: -95,
        rotation: -25,
        duration: 0.5,
        ease: "power2.out",
      })
      .to(
        skeletonRef.current,
        {
          opacity: 1,
          duration: 0.5,
        },
        "<"
      )
      .to(
        [singleCableRef.current, electricArcRef.current],
        {
          attr: { d: "M 10 50 Q 140 -45 270 50" },
          duration: 0.5,
          ease: "power2.out",
        },
        "<"
      );

      // 4. LANDING & DISCONNECT RESET
      tl.to(monkeyRef.current, {
        y: 0,
        rotation: 90,
        duration: 0.4,
        ease: "power2.in",
      })
      .to(
        skeletonRef.current,
        {
          opacity: 0,
          duration: 0.15,
        },
        "<"
      )
      .to(
        electricArcRef.current,
        {
          opacity: 0,
          duration: 0.1,
        },
        "<"
      )
      .set(singleCableRef.current, { opacity: 0 })
      .set([cableLeftRef.current, cableRightRef.current], { opacity: 1 })
      .to(
        cableLeftRef.current,
        {
          attr: { d: "M 10 50 Q 70 70 120 70" },
          duration: 0.3,
          ease: "bounce.out",
        },
        "<"
      )
      .to(
        cableRightRef.current,
        {
          attr: { d: "M 270 50 Q 210 70 160 70" },
          duration: 0.3,
          ease: "bounce.out",
        },
        "<"
      );

      // 5. RECOVERY
      tl.to(monkeyRef.current, {
        rotation: 0,
        duration: 0.4,
        delay: 0.3,
        ease: "power1.inOut",
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="notfound-wrapper" ref={containerRef}>
      <h1 className="code-header">404</h1>
      <h2 className="title-header">ERROR</h2>

      <div className="animation-stage">
        {/* LEFT DEVICE: USER COMPUTER */}
        <div className="device left-monitor">
          <div className="device-label">USER</div>
          <div className="monitor-screen">
            <div className="user-icon"></div>
          </div>
          <div className="monitor-neck"></div>
        </div>

        {/* SVG CABLES */}
        <svg className="cables-svg" viewBox="0 0 280 100">
          {/* Disconnected Wire Segment Left */}
          <path
            ref={cableLeftRef}
            d="M 10 50 Q 70 70 120 70"
            className="main-cable"
          />
          {/* Disconnected Wire Segment Right */}
          <path
            ref={cableRightRef}
            d="M 270 50 Q 210 70 160 70"
            className="main-cable"
          />

          {/* Connected Continuous Wire */}
          <path
            ref={singleCableRef}
            d="M 10 50 Q 140 50 270 50"
            className="main-cable"
          />
          {/* Shock Lightning Current */}
          <path
            ref={electricArcRef}
            d="M 10 50 Q 140 50 270 50"
            className="electric-current"
          />
        </svg>

        {/* MONKEY CHARACTER */}
        <div className="monkey-entity" ref={monkeyRef}>
          {/* Normal Outer Monkey Body */}
          <div className="monkey-layer">
            <div className="hand hand-left" ref={leftHandRef}></div>
            <div className="hand hand-right" ref={rightHandRef}></div>
            <div className="ear ear-left"></div>
            <div className="ear ear-right"></div>
            <div className="head-circle">
              <div className="eye eye-l"></div>
              <div className="eye eye-r"></div>
              <div className="snout-box"></div>
            </div>
            <div className="torso-box"></div>
          </div>

          {/* Skeleton X-Ray Layer */}
          <div className="skeleton-layer" ref={skeletonRef}>
            <div className="sk-cranium">
              <div className="socket socket-l"></div>
              <div className="socket socket-r"></div>
              <div className="teeth-row"></div>
            </div>
            <div className="sk-backbone"></div>
            <div className="sk-ribs"></div>
          </div>
        </div>

        {/* RIGHT DEVICE: SERVER CABINET */}
        <div className="device right-server">
          <div className="device-label">SERVER</div>
          <div className="rack-slot"></div>
          <div className="rack-slot"></div>
          <div className="rack-slot"></div>
          <div className="status-light"></div>
        </div>

        {/* Ground Platform */}
        <div className="ground-bar"></div>
      </div>

      <div className="text-message">
        <h3>Connection Interrupted!</h3>
        <p>The page you are looking for is not available.</p>
      </div>
    </div>
  );
}