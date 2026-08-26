"use client";

import { useEffect, useRef, useState } from "react";

interface TypingTextProps {
  text: string;
  startDelay?: number;
  speed?: number;
  cursorClassName?: string;
}

// Types out one character at a time
export function TypingText({
  text,
  startDelay = 700,
  speed = 130,
  cursorClassName,
}: TypingTextProps) {
  const [count, setCount] = useState(0);
  const characters = Array.from(text);
  const lengthRef = useRef(characters.length);
  lengthRef.current = characters.length;

  useEffect(() => {
    setCount(0);
    let i = 0;
    let interval: ReturnType<typeof setInterval> | undefined;

    const startTimeout = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= lengthRef.current && interval) {
          clearInterval(interval);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(startTimeout);
      if (interval) clearInterval(interval);
    };
    // Re-typing on `text` change is intentional: switching language
    // should visibly re-type the localized name rather than snap to it.
  }, [text, startDelay, speed]);

  return (
    <>
      {characters.slice(0, count).join("")}
      <span
        aria-hidden="true"
        className={
          cursorClassName ??
          "typing-cursor inline-block w-[5px] h-[0.85em] ms-1 mb-3 bg-gradient-to-b from-blue-600 to-purple-600 align-middle"
        }
      />
    </>
  );
}
