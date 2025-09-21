"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { GraduationCap, Briefcase, ChevronDown } from "lucide-react";
import type { Translation } from "@/types";
import { timelineData } from "@/lib/constants";
import { TimelineCard } from "../timeline-card";

interface AboutProps {
  t: Translation;
  onNavigate: (section: string) => void;
}

export function About({ t, onNavigate }: AboutProps) {
  const [activeTab, setActiveTab] = useState<"education" | "experience">(
    "education"
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
    <section id="about" className="py-20 border-t">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 font-space-grotesk">
              {t.about.title}
            </h2>
            <p className="text-lg text-muted-foreground">{t.about.subtitle}</p>
          </div>

          {/* Toggle Buttons */}
          <div className="flex justify-center mb-12">
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
                  className="cursor-pointer gap-3 text-lg transition-colors duration-300 ease-in-out"
                >
                  <Icon className="!w-6 !h-6" />
                  {label}
                </Button>
              ))}
            </div>
          </div>

          {/* Mobile Timeline (Single Column) */}
          <div className="md:hidden relative">
            {/* Vertical Line */}
            {/* <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/30"></div> */}
            <div className="absolute left-6 transform -translate-x-1/2 border top-0 bottom-0"></div>

            {/* Timeline Items */}
            <div className="space-y-4">
              {displayedData.map((item, index) => (
                <div key={index} className="relative flex items-start">
                  {/* Timeline Dot */}
                  {/* <div className="absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-background z-10 mt-2"></div> */}
                  <div className="absolute left-6 transform -translate-x-1/2 w-14 h-14 bg-background flex items-center justify-center rounded-full border-2 overflow-hidden z-10">
                    <Image
                      src={item.logo || "/placeholder.svg"}
                      alt={item.institution}
                      width={48}
                      height={48}
                      className="w-10 h-10 object-contain rounded-full"
                    />
                  </div>

                  {/* Content */}
                  <div className="ml-16 w-full">
                    <TimelineCard item={item} />
                  </div>
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
                return (
                  <div key={index} className="relative">
                    {/* Timeline Dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-14 h-14 bg-background flex items-center justify-center rounded-full border-2 overflow-hidden z-10">
                      <Image
                        src={item.logo || "/placeholder.svg"}
                        alt={item.institution}
                        width={48}
                        height={48}
                        className="w-10 h-10 object-contain rounded-full"
                      />
                    </div>

                    {/* Card Container */}
                    <div className="flex items-center">
                      {position === "left" ? (
                        <>
                          {/* Left side card */}
                          <div className="w-1/2 pe-12">
                            <TimelineCard item={item} />
                          </div>
                          {/* Empty right side */}
                          <div className="w-1/2"></div>
                        </>
                      ) : (
                        <>
                          {/* Empty left side */}
                          <div className="w-1/2"></div>
                          {/* Right side card */}
                          <div className="w-1/2 ps-12">
                            <TimelineCard item={item} />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {hasMoreItems && (
            <div className="flex justify-center mt-8 relative">
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
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
