"use client";

import { useEffect, useRef } from "react";

export function NeonGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!gridRef.current) return;
      const rect = gridRef.current.getBoundingClientRect();

      gridRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
      gridRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={gridRef} className="absolute inset-0 pointer-events-none">
      {/* Base grid */}
      <div className="absolute inset-0 opacity-30 bg-grid-base" />

      {/* Cursor reveal grid */}
      <div className="absolute inset-0 mask-radial bg-grid-strong" />
    </div>
  );
}
