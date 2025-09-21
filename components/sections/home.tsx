"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FolderClosed , FileText } from "lucide-react";
import type { Translation } from "@/types";
import { specialties } from "@/lib/constants";

interface HomeProps {
  t: Translation;
  onNavigate: (section: string) => void;
}

export function Home({ t, onNavigate }: HomeProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();

      // update CSS variables directly (no React state updates)
      sectionRef.current.style.setProperty(
        "--mouse-x",
        `${e.clientX - rect.left}px`
      );
      sectionRef.current.style.setProperty(
        "--mouse-y",
        `${e.clientY - rect.top}px`
      );
    };

    const section = sectionRef.current;
    section?.addEventListener("mousemove", handleMouseMove);

    return () => section?.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="flex items-center justify-center pt-28 pb-16 sm:min-h-screen relative overflow-hidden"
    >
      {/* Base grid */}
      <div className="absolute inset-0 opacity-30 bg-grid-base" />

      {/* Cursor reveal grid */}
      <div className="absolute inset-0 pointer-events-none mask-radial bg-grid-strong" />

      <div className="container mx-auto px-4 relative z-20 ">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="order-1 md:order-2">
              <div className="rounded-4xl mx-auto w-[clamp(192px,40vw,384px)] aspect-square bg-gradient-to-r from-blue-500 to-purple-500 p-1 sm:p-1 md:p-1.5 shadow-lg">
                <Image
                  src="/office.png"
                  alt="Awwab"
                  width={400}
                  height={400}
                  className="rounded-4xl w-full h-full object-cover bg-gray-100"
                />
              </div>
            </div>

            {/* Content */}
            <div className="order-2 md:order-1">
              {/* Main introduction */}
              <p className="text-xl text-foreground mb-2">
                {t.home.greeting}
              </p>
              <h1 className="inline-block text-5xl md:text-6xl font-space-grotesk font-bold mb-4 bg-gradient-to-r rtl:bg-gradient-to-l from-blue-600 to-purple-600 bg-clip-text text-transparent leading-[1.3]">
                {t.home.awwab}
              </h1>

              {/* Specialty tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {specialties.map((specialty, index) => (
                  <Badge
                    key={specialty}
                    variant="secondary"
                    className="text-sm font-medium px-3 py-1 bg-primary/10 text-primary border border-primary/20"
                  >
                    {specialty}
                  </Badge>
                ))}
              </div>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {t.home.description}
              </p>

              {/* Stats */}
              {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">2+</div>
                  <div className="text-sm text-muted-foreground">
                    {t.home.experience}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">
                    15+
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {t.home.projects}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">
                    10+
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {t.home.clients}
                  </div>
                </div>
              </div> */}

              {/* CTA Buttons */}
              <div className="flex gap-4 justify-center md:justify-start">
                <Button
                  size="lg"
                  onClick={() => onNavigate("projects")}
                  className="cursor-pointer flex-initial min-w-0 hover:scale-105 transition-all duration-300 ease-in-out"
                >
                  <FolderClosed  className="w-5 h-5 mr-2" />
                  <span className="whitespace-nowrap">{t.home.viewWork}</span>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="cursor-pointer flex-initial min-w-0 hover:scale-105 transition-all duration-300 ease-in-out"
                >
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FileText className="w-5 h-5 mr-2" />
                    <span className="whitespace-nowrap">
                      {t.home.viewResume}
                    </span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
