"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FolderClosed, FileText, ChevronDown } from "lucide-react";
import type { Translation } from "@/types";
import { specialties } from "@/lib/constants";

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.32, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

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
        `${e.clientX - rect.left}px`,
      );
      sectionRef.current.style.setProperty(
        "--mouse-y",
        `${e.clientY - rect.top}px`,
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
      className="flex items-center justify-center pt-28 pb-12 sm:min-h-screen relative"
    >
      {/* Base grid */}
      <div className="absolute inset-0 opacity-30 bg-grid-base" />

      {/* Cursor reveal grid */}
      <div className="absolute inset-0 pointer-events-none mask-radial bg-grid-strong" />

      <div className="container mx-auto px-6 sm:px-8 relative z-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div
              className="order-1 md:order-2"
              initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <motion.div
                className="rounded-4xl mx-auto w-[clamp(192px,40vw,384px)] aspect-square bg-gradient-to-r from-blue-500 to-purple-500 p-1.25 md:p-1.5 shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src="/office.png"
                  alt="Awwab"
                  width={400}
                  height={400}
                  className="rounded-4xl w-full h-full object-cover bg-gray-100"
                />
              </motion.div>
            </motion.div>

            {/* Content */}
            <motion.div
              className="order-2 md:order-1"
              variants={container}
              initial="hidden"
              animate="visible"
            >
              {/* Main introduction */}
              <motion.p
                variants={item}
                className="text-xl text-foreground mb-2"
              >
                {t.home.greeting}
              </motion.p>
              <motion.h1
                variants={item}
                className="inline-block text-5xl md:text-6xl font-space-grotesk font-bold mb-4 bg-gradient-to-r rtl:bg-gradient-to-l from-blue-600 to-purple-600 bg-clip-text text-transparent leading-[1.3]"
              >
                {t.home.awwab}
              </motion.h1>

              {/* Specialty tags */}
              <motion.div variants={item} className="flex flex-wrap gap-2 mb-6">
                {specialties.map((specialty, index) => (
                  <Badge
                    key={specialty}
                    variant="secondary"
                    className="text-xs sm:text-sm font-medium px-3 py-1 bg-primary/10 text-primary border border-primary/20"
                  >
                    {specialty}
                  </Badge>
                ))}
              </motion.div>

              {/* Description */}
              <motion.p
                variants={item}
                className="sm:text-lg text-muted-foreground mb-8 leading-relaxed"
              >
                {t.home.description}
              </motion.p>

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
              <motion.div
                variants={item}
                className="flex flex-wrap gap-4 justify-center md:justify-start"
              >
                <Button
                  size="lg"
                  onClick={() => onNavigate("projects")}
                  className="cursor-pointer flex-initial hover:scale-105 transition-all duration-300 ease-in-out text-sm md:text-base px-4 md:px-6 py-2 md:py-3"
                >
                  <FolderClosed className="w-5 h-5 mr-2" />
                  <span className="whitespace-nowrap">{t.home.viewWork}</span>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="cursor-pointer flex-initial hover:scale-105 transition-all duration-300 ease-in-out text-sm md:text-base px-4 md:px-6 py-2 md:py-3"
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
              </motion.div>
            </motion.div>
          </div>
          {/* Scroll Down Indicator */}
          <div className="flex flex-col items-center mt-8 md:mt-4 lg:mt-12 text-muted-foreground animate-bounce">
            <ChevronDown className="w-6 h-6" />
          </div>
        </div>
      </div>
    </section>
  );
}
