"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown } from "lucide-react";
import type { Translation, ProjectCategory } from "@/types";
import { projects, projectCategories } from "@/lib/constants";
import { ProjectCard } from "../project-card";
import { ScrollReveal } from "../scroll-reveal";

interface ProjectsProps {
  t: Translation;
}

export function Projects({ t }: ProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState<
    ProjectCategory | "all"
  >("all");
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [mounted, setMounted] = useState(false); // <-- for client-only rendering

  // run after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // compute counts dynamically
  const categoryOptions = useMemo(() => {
    return Object.entries(projectCategories).map(([id, meta]) => ({
      id,
      name: meta.name,
      color: meta.color,
      count: projects.filter((p) => p.category === id).length,
    }));
  }, []);

  const filteredProjects = useMemo(() => {
    const filtered =
      selectedCategory === "all"
        ? projects
        : projects.filter((project) => project.category === selectedCategory);

    // Sort by year
    return [...filtered].sort((a, b) => b.year - a.year);
  }, [selectedCategory]);

  const [projectsToShow, setProjectsToShow] = useState(6); // default fallback

  // Calculate number of projects per row based on screen size
  useEffect(() => {
    if (!mounted) return;

    const updateProjectsToShow = () => {
      const width = window.innerWidth;
      let cols = 1,
        rows = 2;

      if (width >= 1024) cols = 3;
      else if (width >= 768) cols = 2;

      setProjectsToShow(cols * rows);
    };

    updateProjectsToShow();
    window.addEventListener("resize", updateProjectsToShow);
    return () => window.removeEventListener("resize", updateProjectsToShow);
  }, [mounted]);

  // Show more projects
  const displayedProjects = showAllProjects
    ? filteredProjects
    : filteredProjects.slice(0, projectsToShow);

  const hasMoreProjects = filteredProjects.length > projectsToShow;

  return (
    <section id="projects" className="border-t py-16 sm:py-20">
      <div className="container mx-auto px-6 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-12" amount={0.5}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-space-grotesk">
              {t.projects.title}
            </h2>
            <p className="sm:text-lg text-muted-foreground mb-8">
              {t.projects.subtitle}
            </p>
          </ScrollReveal>

          <ScrollReveal className="flex justify-center mb-12" amount={0.5}>
            {/* Category Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                onClick={() => setSelectedCategory("all")}
                className="cursor-pointer text-sm sm:text-base transition-all duration-200 ease-in-out hover:scale-105"
              >
                All
                <Badge
                  variant="secondary"
                  className="ml-1 sm:ml-2 text-xs px-1.5 sm:px-2"
                >
                  {projects.length}
                </Badge>
              </Button>
              {categoryOptions.map((category) => (
                <Button
                  key={category.id}
                  variant={
                    selectedCategory === category.id ? "default" : "outline"
                  }
                  onClick={() =>
                    setSelectedCategory(category.id as ProjectCategory)
                  }
                  className="cursor-pointer text-sm sm:text-base transition-all duration-200 ease-in-out hover:scale-105"
                >
                  {category.name}
                  <Badge
                    variant="secondary"
                    className="ml-1 sm:ml-2 text-xs px-1.5 sm:px-2"
                  >
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </ScrollReveal>

          {/* Projects Grid */}
          {mounted && (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {displayedProjects.map((project, index) => (
                  <motion.div
                    key={project.title}
                    layout
                    initial={{ opacity: 0, y: 28, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    // exit={{ opacity: 0, scale: 0.9 }}
                    transition={{
                      duration: 0.45,
                      ease: [0.21, 0.47, 0.32, 0.98],
                      delay: Math.min(index, 8) * 0.1,
                    }}
                  >
                    <ProjectCard project={project} t={t} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {hasMoreProjects && (
            <ScrollReveal className="flex justify-center mt-8" amount={0.5}>
              <Button
                variant="outline"
                onClick={() => setShowAllProjects(!showAllProjects)}
                className="cursor-pointer flex items-center gap-2 transition-all duration-300 ease-in-out hover:scale-105 bg-background/90 backdrop-blur-sm border shadow-sm"
              >
                {showAllProjects ? "Show Less" : "Show More"}
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ease-in-out ${
                    showAllProjects ? "rotate-180" : "rotate-0"
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
