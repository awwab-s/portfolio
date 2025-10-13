export interface TimelineItem {
  title: string;
  institution: string;
  location: string;
  date: string;
  type: "education" | "experience";
  logo: string;
  scale?: string;
}

export interface Project {
  title: string
  description: string
  image: string
  tech: string[]
  github: string
  live: string
  category: ProjectCategory
  year: number
}

export interface Skill {
  name: string
  logo: string
  scale?: string
}

export interface Translation {
  nav: {
    home: string
    about: string
    projects: string
    skills: string
    contact: string
  }
  home: {
    greeting: string
    awwab: string
    title: string
    subtitle: string
    description: string
    projects: string
    clients: string
    cta: string
    viewResume: string
    viewWork: string
  }
  about: {
    title: string
    subtitle: string
    education: string
    experience: string
  }
  projects: {
    title: string
    subtitle: string
    viewProject: string
    viewCode: string
  }
  skills: {
    title: string
    subtitle: string
  }
  contact: {
    title: string
    subtitle: string
    name: string
    email: string
    message: string
    send: string
    sendMessage: string
    contactInfo: string
    followMe: string
  }
  footer: {
    rights: string
    built: string
  }
}

export type Language = "en" | "ar" | "ur" | "fr" | "es"
export type ProjectCategory = "web-app" | "ai-ml" | "cpp" | "other"

export interface LanguageOption {
  code: Language
  name: string
  nativeName: string
  flag: string
}

export interface CategoryOption {
  name: string
  color: string
}
