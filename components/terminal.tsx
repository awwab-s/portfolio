"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, X } from "lucide-react";
import { runCommand } from "@/lib/commands";
import type { Language } from "@/types";

interface CommandBlock {
  input: string | null; // null for the initial welcome block
  output: string[];
}

interface TerminalProps {
  isDark: boolean;
  onThemeChange: (dark: boolean) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onNavigate: (sectionId: string) => void;
}

const WELCOME_OUTPUT: string[] = [
  "awwab@shell ~ %",
  "Welcome to Awwab's portfolio terminal! 👋",
  "Type 'help' to see what commands are available.",
];

// Render a single line of output, with special formatting for commands and descriptions.
function renderOutputLine(line: string, key: number, isDark: boolean) {
  // Matches (Command) (2+ spaces) (Description)
  const match = line.match(/^(\s{0,2}.+?)(\s{2,})(.*)$/);

  if (match) {
    const [, command, gap, description] = match;
    return (
      <div key={key}>
        <span className={isDark ? "text-blue-400" : "text-blue-600"}>
          {command}
        </span>
        <span className="whitespace-pre">{gap}</span>
        <span className={isDark ? "text-white/60" : "text-neutral-500"}>
          {description}
        </span>
      </div>
    );
  }

  return <div key={key}>{line || "\u00A0"}</div>;
}

export function Terminal({
  isDark,
  onThemeChange,
  language,
  onLanguageChange,
  onNavigate,
}: TerminalProps) {
  const [open, setOpen] = useState(false);
  const [blocks, setBlocks] = useState<CommandBlock[]>([
    { input: null, output: WELCOME_OUTPUT },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isTyping =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      if (e.key === "`" && !isTyping) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }

      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [blocks]);

  const openResume = () => {
    window.open("/resume.pdf", "_blank", "noopener,noreferrer");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const command = input;
    setInput("");
    setHistoryIndex(null);
    if (!command.trim()) return;

    setHistory((prev) => [...prev, command]);

    const result = runCommand(command, {
      openResume,
      setTheme: onThemeChange,
      setLanguage: onLanguageChange,
      scrollToSection: onNavigate,
    });

    if (result[0] === "__CLEAR__") {
      setBlocks([]);
      return;
    }

    if (result[0] === "__CLOSE__") {
      setBlocks((prev) => [...prev, { input: command, output: [] }]);
      setOpen(false);
      return;
    }

    setBlocks((prev) => [...prev, { input: command, output: result }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIndex =
        historyIndex === null
          ? history.length - 1
          : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex]);
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === null) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(null);
        setInput("");
      } else {
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      }
    }
  };

  const scrollbarVars = {
    "--terminal-scroll-thumb": isDark
      ? "rgba(255,255,255,0.15)"
      : "rgba(0,0,0,0.15)",
    "--terminal-scroll-thumb-hover": isDark
      ? "rgba(255,255,255,0.25)"
      : "rgba(0,0,0,0.25)",
  } as React.CSSProperties;

  return (
    <>
      {/* Trigger button: bobs continuously, scales + gets a gradient
          ring on hover. Desktop only, same call as the custom cursor. */}
      {/* <motion.button
        onClick={() => setOpen(true)}
        aria-label="Open terminal"
        className="hidden md:block fixed bottom-6 right-6 z-40 rounded-full group"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.15 }}
      >
        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[2px]" />
        <span className="relative flex h-12 w-12 items-center justify-center rounded-full border bg-background/90 backdrop-blur-sm shadow-lg m-[2px]">
          <TerminalIcon className="h-5 w-5 text-primary" />
        </span>
      </motion.button> */}
      <motion.div
        className="hidden md:flex fixed bottom-6 right-6 z-40"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.button
          onClick={() => setOpen(true)}
          aria-label="Open terminal"
          className="h-12 w-12 flex items-center justify-center rounded-xl border bg-background/90 backdrop-blur-sm shadow-lg hover:border-hover/60 transition-colors duration-300"
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <TerminalIcon className="h-5 w-5 text-primary" />
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div
                dir="ltr"
                onClick={(e) => e.stopPropagation()}
                className={`pointer-events-auto w-full max-w-2xl h-[60vh] rounded-lg border shadow-2xl flex flex-col overflow-hidden font-mono text-sm text-left ${
                  isDark
                    ? "border-white/10 bg-[#0b0e14] text-white/80"
                    : "border-black/10 bg-white text-neutral-800"
                }`}
              >
                {/* Title bar */}
                <div
                  className={`flex items-center justify-between px-4 py-2 border-b ${
                    isDark
                      ? "border-white/10 bg-white/[0.03]"
                      : "border-black/10 bg-black/[0.02]"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-red-400/70" />
                    <span className="h-3 w-3 rounded-full bg-amber-400/70" />
                    <span className="h-3 w-3 rounded-full bg-green-500/70" />
                  </div>
                  <span
                    className={`text-xs ${
                      isDark ? "text-white/40" : "text-neutral-400"
                    }`}
                  >
                    awwab@shell
                  </span>
                  <button
                    onClick={() => setOpen(false)}
                    aria-label="Close terminal"
                    className={
                      isDark
                        ? "text-white/40 hover:text-white/80 transition-colors"
                        : "text-neutral-400 hover:text-neutral-700 transition-colors"
                    }
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Output */}
                <div
                  ref={scrollRef}
                  style={scrollbarVars}
                  className="terminal-scroll flex-1 overflow-y-auto px-4 py-3"
                >
                  {blocks.map((block, i) => (
                    <div key={i} className="mb-4 last:mb-0">
                      {block.input !== null && (
                        <div
                          className={
                            isDark ? "text-green-400" : "text-green-600"
                          }
                        >
                          $ {block.input}
                        </div>
                      )}
                      <div className="space-y-0.5 mt-0.5">
                        {block.output.map((line, j) =>
                          renderOutputLine(line, j, isDark),
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input line */}
                <form
                  onSubmit={handleSubmit}
                  className={`flex items-center gap-2 px-4 py-3 border-t ${
                    isDark ? "border-white/10" : "border-black/10"
                  }`}
                >
                  <span
                    className={`flex-shrink-0 ${
                      isDark ? "text-green-400" : "text-green-600"
                    }`}
                  >
                    {">"}
                  </span>
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    dir="ltr"
                    className={`flex-1 bg-transparent outline-none ${
                      isDark
                        ? "text-white/90 placeholder:text-white/30"
                        : "text-neutral-800 placeholder:text-neutral-400"
                    }`}
                    placeholder="type a command..."
                    autoComplete="off"
                    autoCapitalize="off"
                    spellCheck={false}
                  />
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
