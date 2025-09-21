"use client";
import { Moon, Sun } from "lucide-react";

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="cursor-pointer p-2 rounded-md transition-colors duration-300 ease-in-out hover:bg-muted/50 group"
    >
      {isDark ? (
        <Sun className="h-6 w-6 text-foreground group-hover:text-primary transition-colors duration-300 ease-in-out" />
      ) : (
        <Moon className="h-6 w-6 text-foreground group-hover:text-primary transition-colors duration-300 ease-in-out" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
