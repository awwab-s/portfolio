"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import type { Language, Translation } from "@/types";
import { LanguageSelector } from "./language-selector";
import { ThemeToggle } from "./theme-toggle";

interface HeaderProps {
  t: Translation;
  language: Language;
  onLanguageChange: (language: Language) => void;
  isDark: boolean;
  onThemeToggle: () => void;
  onNavigate: (section: string) => void;
}

export function Header({
  t,
  language,
  onLanguageChange,
  isDark,
  onThemeToggle,
  onNavigate,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigate = (section: string) => {
    onNavigate(section);
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div
            className="
              text-2xl font-bold cursor-pointer font-space-grotesk
              bg-gradient-to-r rtl:bg-gradient-to-l from-blue-500 to-purple-500 bg-clip-text 
              text-primary hover:text-transparent
              transition-all duration-400 ease-in-out
            "
            onClick={() => handleNavigate("home")}
          >
            Awwab
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {Object.entries(t.nav).map(([key, value]) => (
              <button
                key={key}
                onClick={() => handleNavigate(key)}
                className="relative text-foreground transition-colors duration-300 ease-in-out cursor-pointer font-medium py-2 group hover:text-hover font-space-grotesk"
              >
                <span className="relative z-10">{value}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-hover transition-all duration-300 ease-in-out group-hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-2">
            <LanguageSelector
              currentLanguage={language}
              onLanguageChange={onLanguageChange}
            />
            <ThemeToggle isDark={isDark} onToggle={onThemeToggle} />

            {/* Mobile Menu Button */}
            <button
              className="md:hidden cursor-pointer p-2 rounded-md transition-colors duration-200 ease-in-out hover:bg-muted/50 group"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-foreground group-hover:text-primary transition-colors duration-200 ease-in-out" />
              ) : (
                <Menu className="h-6 w-6 text-foreground group-hover:text-primary transition-colors duration-200 ease-in-out" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t">
            <div className="flex flex-col space-y-2 pt-4">
              {Object.entries(t.nav).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => handleNavigate(key)}
                  className="text-left text-foreground transition-colors duration-200 ease-in-out cursor-pointer font-medium py-2 relative group hover:text-hover font-space-grotesk"
                >
                  <div className="text-center">
                    <span className="relative z-10">{value}</span>
                  </div>
                  {/* <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-hover transition-all duration-300 ease-in-out group-hover:w-full"></span> */}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
