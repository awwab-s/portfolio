"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Languages } from "lucide-react";
import type { Language } from "@/types";
import { languageOptions } from "@/lib/constants";

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

export function LanguageSelector({
  currentLanguage,
  onLanguageChange,
}: LanguageSelectorProps) {
  const currentOption = languageOptions.find(
    (option) => option.code === currentLanguage
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer p-2 rounded-md transition-colors duration-300 ease-in-out hover:bg-muted/50 group">
          <Languages className="h-6 w-6 text-foreground group-hover:text-primary transition-colors duration-300 ease-in-out" />
          <span className="sr-only">Select language</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languageOptions.map((option) => (
          <DropdownMenuItem
            key={option.code}
            onClick={() => onLanguageChange(option.code)}
            className={`flex items-center gap-4 transition-colors duration-200 ease-in-out ${
              currentLanguage === option.code ? "bg-accent" : ""
            }`}
          >
            <span className="text-xl leading-none">{option.flag}</span>
            <div className="flex flex-col">
              <span className="font-medium">{option.name}</span>
              <span className="text-xs text-muted-foreground">
                {option.nativeName}
              </span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
