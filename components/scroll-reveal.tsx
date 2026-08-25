"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "left" | "right" | "none";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: Direction;
  isRTL?: boolean;
  delay?: number;
  duration?: number;
  className?: string;
  /** How much of the element must be visible before it animates in (0-1) */
  amount?: number;
  /** Distance in px the element travels while animating in */
  distance?: number;
}

const offsets: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 32 },
  left: { x: -32 },
  right: { x: 32 },
  none: {},
};

export function ScrollReveal({
  children,
  direction = "up",
  isRTL = false,
  delay = 0,
  duration = 0.6,
  className,
  amount = 0.2,
  distance,
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const resolvedDirection =
    direction === "left"
      ? isRTL
        ? "right"
        : "left"
      : direction === "right"
        ? isRTL
          ? "left"
          : "right"
        : direction;

  const offset = offsets[resolvedDirection];
  const scaled =
    distance !== undefined
      ? Object.fromEntries(
          Object.entries(offset).map(([k, v]) => [
            k,
            v && v > 0 ? distance : -distance,
          ]),
        )
      : offset;

  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...(shouldReduceMotion ? {} : scaled),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  return (
    <motion.div
      key={resolvedDirection}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

/** Wraps children and staggers the animation of each direct motion child */
export function ScrollRevealGroup({
  children,
  className,
  stagger = 0.12,
  amount = 0.15,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  amount?: number;
}) {
  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={container}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};
