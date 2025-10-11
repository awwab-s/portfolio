"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import type { Translation } from "@/types";
import { skills } from "@/lib/constants";

interface SkillsProps {
  t: Translation;
  isRTL: boolean;
}

export function Skills({ t, isRTL }: SkillsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Duplicate skills array to create seamless infinite scroll
  const duplicatedSkills = [...skills, ...skills];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Get all skill items
    const skillItems = Array.from(container.children).slice(
      0,
      skills.length
    ) as HTMLElement[];
    const totalWidth = skillItems.reduce((acc, el) => acc + el.offsetWidth, 0);

    // Initialize translateX depending on direction
    let translateX = isRTL ? -totalWidth : 0;
    const speed = 0.5;
    let animationFrame: number;

    const animate = () => {
      translateX += isRTL ? speed : -speed;

      // Reset when first set completely off-screen
      if (isRTL && translateX >= 0) translateX = -totalWidth;
      if (!isRTL && Math.abs(translateX) >= totalWidth) translateX = 0;

      container.style.transform = `translateX(${translateX}px)`;
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrame);
  }, [isRTL]);

  return (
    <section id="skills" className="pt-20 pb-4 border-t">
      <div className="mb-8 text-center px-4">
        <h2 className="text-4xl font-bold mb-4 font-space-grotesk">
          {t.skills.title}
        </h2>
        <p className="text-lg text-muted-foreground">{t.skills.subtitle}</p>
      </div>

      <div className="relative overflow-hidden w-full" dir="ltr">
        <div className="py-8">
          <div
            ref={containerRef}
            className={`flex gap-12 will-change-transform w-fit ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            {duplicatedSkills.map((skill, index) => (
              <div
                key={`${skill.name}-${index}`}
                className="flex-shrink-0 group"
              >
                <div className="w-32 h-32 rounded-full bg-white shadow-lg flex items-center justify-center hover:shadow-xl transition-transform duration-300 ease-in-out hover:scale-110 group-hover:-translate-y-2">
                  <Image
                    src={skill.logo || "/placeholder.svg"}
                    alt={skill.name}
                    width={96}
                    height={96}
                    className={`w-24 h-24 object-contain ${skill.scale || ""}`}
                  />
                </div>
                <p className="text-center text-md font-medium mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-w-[128px] mx-auto truncate">
                  {skill.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
