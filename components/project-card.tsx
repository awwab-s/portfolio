"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, Github, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import type { Project, Translation } from "@/types";
import { projectCategories } from "@/lib/constants";

interface ProjectCardProps {
  project: Project;
  t: Translation;
}

export function ProjectCard({ project, t }: ProjectCardProps) {
  return (
    <Card
      className="group will-change-transform p-0 hover:shadow-xl hover:scale-[1.05] hover:-translate-y-1 transition-all duration-200 ease-in-out bg-background backdrop-blur-sm border shadow-sm flex flex-col h-full overflow-hidden animate-fade-slide-up"
    >
      <div className="relative overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          width={300}
          height={200}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

        <div className="absolute top-3 left-3">
          <Badge
            key={project.category}
            className={`text-xs ${projectCategories[project.category].color}`}
          >
            {projectCategories[project.category].name}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge
            variant="secondary"
            className="text-xs bg-background/90 text-foreground"
          >
            <Calendar className="w-3 h-3 mr-1" />
            {project.year}
          </Badge>
        </div>
      </div>

      {/* Title and Description */}
      <CardHeader className="mb-4 text-left">
        <CardTitle className="mb-2">{project.title}</CardTitle>
        <CardDescription className="leading-relaxed">
          {project.description}
        </CardDescription>
      </CardHeader>

      {/* Tech badges */}
      <CardContent className="mt-auto">
        <div className="flex flex-wrap gap-2 ltr:flex-row rtl:flex-row-reverse">
          {project.tech.map((tech, techIndex) => (
            <Badge key={techIndex} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>

      {/* Buttons */}
      <CardFooter className="pb-6">
        <div className="flex gap-4 w-full">
          <Button
            size="sm"
            variant="outline"
            asChild
            className="cursor-pointer flex-1 min-w-0 gap-2"
          >
            <Link href={project.github} target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4" />
              <span className="whitespace-nowrap">{t.projects.viewCode}</span>
            </Link>
          </Button>
          <Button
            size="sm"
            asChild
            className="cursor-pointer flex-1 min-w-0 gap-2"
          >
            <Link href={project.live} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4" />
              <span className="whitespace-nowrap truncate">
                {t.projects.viewProject}
              </span>
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
