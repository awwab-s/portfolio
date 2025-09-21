"use client"

import { useState, useEffect } from "react"
import type { Language } from "@/types"

export function useLanguage() {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("language", language)
    document.documentElement.dir = language === "ar" || language === "ur" ? "rtl" : "ltr"
    document.documentElement.lang = language
  }, [language])

  return { language, setLanguage }
}
