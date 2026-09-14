"use client";

import { useLanguage } from "@/hooks/use-language";
import { useTheme } from "@/hooks/use-theme";
import { translations } from "@/lib/translations";
import { CustomCursor } from "@/components/custom-cursor";
import { Header } from "@/components/sections/header";
import { Home } from "@/components/sections/home";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { Terminal } from "@/components/terminal";

export default function Portfolio() {
  const { language, setLanguage } = useLanguage();
  const { isDark, toggleTheme, setTheme } = useTheme();

  const isRTL = language === "ar" || language === "ur" || language === "fa";
  const t = translations[language];

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        isDark ? "dark" : ""
      }`}
    >
      <Header
        t={t}
        language={language}
        onLanguageChange={setLanguage}
        isDark={isDark}
        onThemeToggle={toggleTheme}
        onNavigate={scrollToSection}
      />
      <Home t={t} onNavigate={scrollToSection} />
      <About t={t} isRTL={isRTL} />
      <Projects t={t} />
      <Skills t={t} isRTL={isRTL} />
      <Contact t={t} isRTL={isRTL} />
      <Footer t={t} onNavigate={scrollToSection} />

      <CustomCursor />
      <Terminal
        isDark={isDark}
        onThemeChange={setTheme}
        language={language}
        onLanguageChange={setLanguage}
        onNavigate={scrollToSection}
      />
    </div>
  );
}
