"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";

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
      "(prefers-reduced-motion: reduce)",
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
        !!target.closest("a, button, [role='button'], input, textarea, select"),
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

// Bubble clickburst effect
interface Bubble {
  angle: number;
  distance: number;
  size: number;
  duration: number;
  color: string;
}

interface Burst {
  id: string;
  x: number;
  y: number;
  bubbles: Bubble[];
}

const BUBBLE_COLORS = [
  "bg-red-500 dark:bg-red-400",
  "bg-orange-500 dark:bg-orange-400",
  "bg-amber-500 dark:bg-amber-400",
  "bg-yellow-500 dark:bg-yellow-400",
  "bg-lime-500 dark:bg-lime-400",
  "bg-green-500 dark:bg-green-400",
  "bg-emerald-500 dark:bg-emerald-400",
  "bg-teal-500 dark:bg-teal-400",
  "bg-cyan-500 dark:bg-cyan-400",
  "bg-sky-500 dark:bg-sky-400",
  "bg-blue-500 dark:bg-blue-400",
  "bg-indigo-500 dark:bg-indigo-400",
  "bg-violet-500 dark:bg-violet-400",
  "bg-purple-500 dark:bg-purple-400",
  "bg-fuchsia-500 dark:bg-fuchsia-400",
  "bg-pink-500 dark:bg-pink-400",
  "bg-rose-500 dark:bg-rose-400",
];

function createBubbles(): Bubble[] {
  // 7-10 bubbles per click, each with its own random angle, travel, distance, size, and speed.
  const count = 7 + Math.floor(Math.random() * 4);

  return Array.from({ length: count }, () => ({
    angle: Math.random() * Math.PI * 2,
    distance: 18 + Math.random() * 42,
    size: 7 + Math.random() * 8,
    duration: 0.45 + Math.random() * 0.45,
    color: BUBBLE_COLORS[Math.floor(Math.random() * BUBBLE_COLORS.length)],
  }));
}

function ClickBursts() {
  const [bursts, setBursts] = useState<Burst[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const id = `${Date.now()}-${Math.random()}`;
      setBursts((prev) => [
        ...prev,
        { id, x: e.clientX, y: e.clientY, bubbles: createBubbles() },
      ]);
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
          {burst.bubbles.map((bubble, i) => (
            <motion.span
              key={i}
              className={`absolute rounded-full ${bubble.color}`}
              style={{ width: bubble.size, height: bubble.size }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 0.6 }}
              animate={{
                x: Math.cos(bubble.angle) * bubble.distance,
                // Slight downward drift added to the vertical component so bubbles feel like they're floating/falling, not just flying outward in a flat straight line
                y: Math.sin(bubble.angle) * bubble.distance + 10,
                opacity: 0,
                scale: 1.1,
              }}
              transition={{ duration: bubble.duration, ease: "easeOut" }}
              onAnimationComplete={() => {
                if (i === 0) {
                  setBursts((prev) => prev.filter((b) => b.id !== burst.id));
                }
              }}
            />
          ))}
        </div>
      ))}
    </AnimatePresence>
  );
}
