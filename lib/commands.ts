import { projects, skills, contactInfo, timelineData } from "@/lib/constants";
import { translations } from "@/lib/translations";
import type { Language } from "@/types";

export interface TerminalLine {
  type: "input" | "output" | "error";
  text: string;
}

export interface TerminalCallbacks {
  openResume: () => void;
  setTheme: (dark: boolean) => void;
  setLanguage: (lang: Language) => void;
  scrollToSection: (id: string) => void;
}

const bio = translations.en.home.description;

const VALID_SECTIONS = ["home", "about", "projects", "skills", "contact"];
const VALID_LANGS: Language[] = ["en", "ar", "ur", "fr", "es", "fa"];

function listProjects(): string[] {
  return [
    "Here's what I've been building:",
    "",
    ...projects.map((p, i) => `  [${i + 1}] ${p.title} (${p.year})`),
    "",
    "Type 'projects <number>' to see details on one of them.",
  ];
}

function showProject(indexArg: string): string[] {
  const index = parseInt(indexArg, 10) - 1;
  const project = projects[index];

  if (!project) {
    return [
      `error: no project numbered '${indexArg}'.`,
      "Type 'projects' to see the full list.",
    ];
  }

  const lines = [
    `${project.title} (${project.year})`,
    "",
    project.description,
    "",
    `tech: ${project.tech.join(", ")}`,
  ];

  if (project.github) lines.push(`github: ${project.github}`);
  if (project.live) lines.push(`live: ${project.live}`);

  return lines;
}

function listSkills(): string[] {
  const names = skills.map((s) => s.name);
  if (names.length === 0) {
    return ["Nothing to show here yet — check back soon."];
  }
  return ["Skills & tools I work with:", "", `  ${names.join(", ")}`];
}

function showContact(): string[] {
  return [
    "Let's talk:",
    "",
    `  email     ${contactInfo.email}`,
    `  location  ${contactInfo.location}`,
    `  github    ${contactInfo.github}`,
    `  linkedin  ${contactInfo.linkedin}`,
    `  discord   ${contactInfo.discord}`,
  ];
}

function listByType(type: "education" | "experience"): string[] {
  const items = timelineData.filter((item) => item.type === type);
  if (items.length === 0) return ["Nothing to show here yet."];

  return [
    type === "education" ? "Education:" : "Experience:",
    "",
    ...items.map(
      (item) => `  ${item.title} — ${item.institution} (${item.date})`
    ),
  ];
}

function listSections(): string[] {
  return ["home/", "about/", "projects/", "skills/", "contact/"];
}

const HELP_TEXT = [
  "Available commands:",
  "",
  "  help                 show available commands",
  "  hello                say hi",
  "  about / me           show my bio",
  "  education            education history",
  "  experience           work experience",
  "  projects             list all projects",
  "  projects <n>         view details of a specific project",
  "  skills               list skills & tools",
  "  contact              show my contact info",
  "  resume               open my resume",
  "  ls                   list portfolio sections",
  "  scroll <section>     scroll to a specific section",
  "  theme <light|dark>   switch theme",
  "  lang <code>          switch language (en/ar/ur/fr/es/fa)",
  "  sudo <command>       execute command as superuser",
  "  pwd                  print working directory",
  "  cd <path>            change directory (scroll to section)",
  "  cat <file>           view content of a file",
  "  rm <target>          remove files (at your own risk!)",
  "  ping                 ping the host",
  "  whoami               print active user",
  "  top                  display system status",
  "  date                 current date & time",
  "  clear                clear the screen",
  "  echo <text>          print text to the terminal",
  "  exit / close         close this terminal",
];


export function runCommand(
  raw: string,
  callbacks: TerminalCallbacks
): string[] {
  const trimmed = raw.trim();
  if (!trimmed) return [];

  const [command, ...args] = trimmed.split(/\s+/);
  const lower = command.toLowerCase();

  switch (lower) {
    case "help":
      return HELP_TEXT;

    case "hello":
      return [
        "Hello User! 👋",
        "Welcome to Awwab's portfolio terminal!",
        "Type 'help' to see what commands are available.",
      ];

    case "about":
    case "me":
      return [bio];

    case "education":
      return listByType("education");

    case "experience":
      return listByType("experience");

    case "projects":
      return args.length > 0 ? showProject(args[0]) : listProjects();

    case "project":
      return args.length > 0
        ? showProject(args[0])
        : ["usage: project <number>", "Type 'projects' to see the list."];

    case "skills":
      return listSkills();

    case "contact":
      return showContact();

    case "resume":
      callbacks.openResume();
      return ["Opening resume in a new tab..."];

    case "ls": {
      return listSections();
    }

    case "scroll": {
      const arg = args[0]?.toLowerCase();
      if (!arg || !VALID_SECTIONS.includes(arg)) {
        return [`usage: scroll <${VALID_SECTIONS.join("|")}>`];
      }
      callbacks.scrollToSection(arg);
      return [`Scrolling to ${arg}...`];
    }

    case "cd": {
      const arg = args[0]?.toLowerCase();
      if (!arg || !VALID_SECTIONS.includes(arg)) {
        return [`usage: cd <${VALID_SECTIONS.join("|")}>`];
      }
      callbacks.scrollToSection(arg);
      return [`Scrolling to ${arg}...`];
    }

    case "theme": {
      const arg = args[0]?.toLowerCase();
      if (arg !== "light" && arg !== "dark") {
        return ["usage: theme <light|dark>"];
      }
      callbacks.setTheme(arg === "dark");
      return [`Switched to ${arg} mode.`];
    }

    case "lang": {
      const arg = args[0]?.toLowerCase() as Language | undefined;
      if (!arg || !VALID_LANGS.includes(arg)) {
        return [`usage: lang <${VALID_LANGS.join("|")}>`];
      }
      callbacks.setLanguage(arg);
      return [`Language switched to '${arg}'.`];
    }
    
    case "sudo":
      return [
        args.length > 0
          ? `[sudo] password for visitor: Nice try, you don't have superuser access! 😏`
          : "Permission denied: you are not root here.",
      ];
    
    case "pwd":
      return [
        "/home/awwab",
        "Just kidding — this isn't a real shell, so there's no actual root directory 😜.",
      ];
    
    // case "cd":
    //   if (args.length === 0) {
    //     return ["usage: cd <section>"];
    //   }
    //   return [
    //     "There's no real filesystem here — this is a portfolio, not a shell. 😅",
    //     "Try 'scroll <section>' if you actually want to jump there.",
    //   ];
    
    case "whoami":
      return [
        "visitor (or maybe future employer? 😉)",
      ];
    
    case "rm": {
      const flags = args.join(" ");
      if (flags.includes("-rf") || flags.includes("-r")) {
        return [
          "rm: refusing to destroy the portfolio. Nice try! 😎",
        ];
      }
      return ["rm: refusing to destroy the portfolio. Nice try! 😎"];
    }
    
    case "ping": {
      const host = args[0] || "awwab";
      return [
        `PING ${host} (127.0.0.1) with 32 bytes of data.`,
        "64 bytes from 127.0.0.1: icmp_seq=0 ttl=64 time=0.1 ms",
        `--- ${host} ping statistics ---`,
        "1 packets transmitted, 1 received, 0% packet loss",
        "Just kidding — this isn't a real shell, so there's no actual network connection. 😜",
      ];
    }
    
    case "top":
    case "htop":
      return [
        "CPU usage: 99.9% passion, 0.1% coffee",
        "Memory usage: 100% creativity, 0% boredom",
        "Tasks: 1 running (awwab), 0 sleeping",
        "Uptime: forever",
      ];
    
    case "cat": {
      if (args.length === 0) return ["usage: cat <resume|bio|about>"];
      const file = args[0].toLowerCase();
      if (file === "resume" || file === "resume.pdf" || file === "cv") {
        callbacks.openResume();
        return ["Opening resume in a new tab..."];
      }
      if (file === "bio" || file === "about") {
        return [bio];
      }
      return [`cat: ${args[0]}: No such file or directory`];
    }

    case "date":
      return [new Date().toString()];

    case "echo":
      return [args.join(" ")];

    case "clear":
      return ["__CLEAR__"];

    case "exit":
    case "close":
      return ["__CLOSE__"];

    default:
      return [
        `command not found: ${command}`,
        "Type 'help' to see available commands.",
      ];
  }
}
