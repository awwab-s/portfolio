"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import { GraduationCap, Briefcase, ChevronDown } from "lucide-react";
import type { Translation } from "@/types";
import { timelineData } from "@/lib/constants";
import { TimelineCard } from "../timeline-card";
import { ScrollReveal } from "../scroll-reveal";

interface AboutProps {
  t: Translation;
  isRTL: boolean;
}

export function About({ t, isRTL }: AboutProps) {
  const [activeTab, setActiveTab] = useState<"education" | "experience">(
    "education",
  );
  const [showAllEducation, setShowAllEducation] = useState(false);
  const [showAllExperience, setShowAllExperience] = useState(false);

  const filteredData = timelineData.filter((item) => item.type === activeTab);

  const displayedData =
    activeTab === "education"
      ? showAllEducation
        ? filteredData
        : filteredData.slice(0, 3)
      : showAllExperience
        ? filteredData
        : filteredData.slice(0, 3);

  const hasMoreItems = filteredData.length > 3;
  const showingAll =
    activeTab === "education" ? showAllEducation : showAllExperience;

  const toggleShowAll = () => {
    if (activeTab === "education") {
      setShowAllEducation(!showAllEducation);
    } else {
      setShowAllExperience(!showAllExperience);
    }
  };

  // Education: left-right-left, Experience: right-left-right
  const getItemPosition = (index: number) => {
    if (activeTab === "education") {
      return index % 2 === 0 ? "left" : "right";
    } else {
      return index % 2 === 0 ? "right" : "left";
    }
  };

  return (
    <section id="about" className="py-16 sm:py-20 border-t">
      <div className="container mx-auto px-6 sm:px-8 lg:px-4">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-12" amount={0.5}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-special">
              {t.about.title}
            </h2>
            <p className="sm:text-lg text-muted-foreground">
              {t.about.subtitle}
            </p>
          </ScrollReveal>

          {/* Toggle Buttons */}
          <ScrollReveal className="flex justify-center mb-12" amount={0.5}>
            <div className="flex bg-background/80 backdrop-blur-sm rounded-lg p-1 border">
              {[
                {
                  key: "education",
                  label: t.about.education,
                  icon: GraduationCap,
                },
                {
                  key: "experience",
                  label: t.about.experience,
                  icon: Briefcase,
                },
              ].map(({ key, label, icon: Icon }) => (
                <Button
                  key={key}
                  variant={activeTab === key ? "default" : "ghost"}
                  onClick={() =>
                    setActiveTab(key as "education" | "experience")
                  }
                  size="lg"
                  className="cursor-pointer gap-2 sm:gap-3 text-base transition-colors duration-300 ease-in-out"
                >
                  <Icon className="!w-6 !h-6" />
                  {label}
                </Button>
              ))}
            </div>
          </ScrollReveal>

          {/* Mobile Timeline (Single Column) */}
          <div className="md:hidden relative">
            {/* Vertical Line */}
            {/* <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/30"></div> */}
            <div className="absolute left-6 transform -translate-x-1/2 border top-0 bottom-0"></div>

            {/* Timeline Items */}
            <div className="space-y-6">
              {displayedData.map((item, index) => (
                <div key={index} className="relative flex items-start">
                  {/* Timeline Dot */}
                  {/* <div className="absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-background z-10 mt-2"></div> */}
                  <motion.div
                    className="absolute left-6 transform -translate-x-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-background flex items-center justify-center rounded-full border-2 overflow-hidden z-10"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <Image
                      src={item.logo || "/placeholder.svg"}
                      alt={item.institution}
                      width={48}
                      height={48}
                      className="w-9 h-9 sm:w-10 sm:h-10 object-contain rounded-full"
                    />
                  </motion.div>

                  {/* Content */}
                  <ScrollReveal
                    direction="right"
                    className="ml-16 w-full"
                    amount={0.3}
                    isRTL={isRTL}
                  >
                    <TimelineCard item={item} />
                  </ScrollReveal>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Timeline (Two Column) */}
          <div className="hidden md:block relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 border top-0 bottom-0"></div>

            {/* Timeline Items */}
            <div className="space-y-8">
              {displayedData.map((item, index) => {
                const position = getItemPosition(index);
                let revealDirection: "left" | "right" =
                  position === "left" ? "left" : "right";

                return (
                  <div key={index} className="relative">
                    {/* Timeline Dot */}
                    <motion.div
                      className="absolute left-1/2 transform -translate-x-1/2 w-14 h-14 bg-background flex items-center justify-center rounded-full border-2 overflow-hidden z-10"
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <Image
                        src={item.logo || "/placeholder.svg"}
                        alt={item.institution}
                        width={48}
                        height={48}
                        className="w-10 h-10 object-contain rounded-full"
                      />
                    </motion.div>

                    {/* Card Container */}
                    <div className="flex items-center">
                      {position === "left" ? (
                        <>
                          {/* Left side card */}
                          <ScrollReveal
                            direction={revealDirection}
                            className="w-1/2 pe-12"
                            amount={0.3}
                            isRTL={isRTL}
                          >
                            <TimelineCard item={item} />
                          </ScrollReveal>
                          {/* Empty right side */}
                          <div className="w-1/2"></div>
                        </>
                      ) : (
                        <>
                          {/* Empty left side */}
                          <div className="w-1/2"></div>
                          {/* Right side card */}
                          <ScrollReveal
                            direction={revealDirection}
                            className="w-1/2 ps-12"
                            amount={0.3}
                            isRTL={isRTL}
                          >
                            <TimelineCard item={item} />
                          </ScrollReveal>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Show More / Show Less Button */}
          {hasMoreItems && (
            <ScrollReveal
              className="flex justify-center mt-8 relative"
              amount={0.5}
            >
              <Button
                variant="outline"
                onClick={toggleShowAll}
                className="cursor-pointer flex items-center gap-2 transition-all duration-300 ease-in-out hover:scale-105 bg-background/90 backdrop-blur-sm border shadow-sm"
              >
                {showingAll ? "Show Less" : "Show More"}
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ease-in-out ${
                    showingAll ? "rotate-180" : "rotate-0"
                  }`}
                />
              </Button>
            </ScrollReveal>
          )}
        </div>
      </div>
    </section>
  );
}
