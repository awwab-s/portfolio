"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

const BURST_PARTICLES = 6;

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [isPointerTarget, setIsPointerTarget] = useState(false);

  // Raw mouse position: the small dot uses this directly (snaps instantly).
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // The outer ring follows with a spring, so it trails slightly behind
  // the dot for a soft, floaty feel instead of moving 1:1 with the mouse.
  const ringX = useSpring(cursorX, { damping: 25, stiffness: 300, mass: 0.5 });
  const ringY = useSpring(cursorY, { damping: 25, stiffness: 300, mass: 0.5 });

  // Decide once on mount whether this device even wants a custom cursor:
  // real mice/trackpads only (pointer: fine), and respect reduced-motion.
  useEffect(() => {
    const pointerFine = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setEnabled(pointerFine && !reducedMotion);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const handleMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement;
      setIsPointerTarget(
        !!target.closest("a, button, [role='button'], input, textarea, select")
      );
    };

    window.addEventListener("mousemove", handleMove);
    document.body.classList.add("custom-cursor-active");

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [enabled, cursorX, cursorY]);

  if (!enabled) return null;

  return (
    <>
      {/* Dot: tracks the real cursor 1:1, no lag */}
      {/* <motion.div
        className="fixed top-0 left-0 z-[9999] h-2 w-2 rounded-full bg-primary pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      /> */}

      {/* Ring: trails behind, grows over links/buttons */}
      {/* <motion.div
        className="fixed top-0 left-0 z-[9999] rounded-full border border-primary/60 pointer-events-none mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isPointerTarget ? 48 : 28,
          height: isPointerTarget ? 48 : 28,
          opacity: isPointerTarget ? 0.9 : 0.5,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      /> */}

      <ClickBursts />
    </>
  );
}

/**
 * Separate component so it can own the click listener + burst state
 * independently, keeping the mouse-move-heavy logic above simpler.
 */
function ClickBursts() {
  const [bursts, setBursts] = useState<{ id: string; x: number; y: number }[]>(
    []
  );

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const id = `${Date.now()}-${Math.random()}`;
      setBursts((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <AnimatePresence>
      {bursts.map((burst) => (
        <div
          key={burst.id}
          className="fixed z-[9998] pointer-events-none"
          style={{ left: burst.x, top: burst.y }}
        >
          {Array.from({ length: BURST_PARTICLES }).map((_, i) => {
            const angle = (i / BURST_PARTICLES) * Math.PI * 2;
            const distance = 40;
            return (
              <motion.span
                key={i}
                className="absolute h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{
                  x: Math.cos(angle) * distance,
                  y: Math.sin(angle) * distance,
                  opacity: 0,
                  scale: 0,
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                onAnimationComplete={() => {
                  if (i === 0) {
                    setBursts((prev) => prev.filter((b) => b.id !== burst.id));
                  }
                }}
              />
            );
          })}
        </div>
      ))}
    </AnimatePresence>
  );
}