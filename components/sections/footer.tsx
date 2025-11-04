"use client";

import Link from "next/link";
import { Github, Linkedin, Twitter, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Translation } from "@/types";
import { socialLinks, contactInfo } from "@/lib/constants";
import { FaDiscord } from "react-icons/fa";
import { toast } from "sonner";

interface FooterProps {
  t: Translation;
  onNavigate?: (section: string) => void;
}

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  // instagram: Instagram,
};

export function Footer({ t, onNavigate }: FooterProps) {
  const handleDiscordCopy = () => {
      navigator.clipboard.writeText(contactInfo.discord)
      toast.success(`Discord username "${contactInfo.discord}" copied!`, {
        duration: 2000,
      })
    }

  return (
    <footer className="border-t py-4">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="text-xl font-bold text-primary font-space-grotesk">
            Awwab
          </div>

          <div className="flex space-x-2">
            {socialLinks.map((social) => {
              if (social.icon === "discord") {
                return (
                  <Button
                    key={social.name}
                    variant="outline"
                    size="icon"
                    onClick={handleDiscordCopy}
                    className="cursor-pointer hover:scale-110 transition-all duration-200 ease-in-out bg-transparent"
                    title={`Click to copy Discord username: ${contactInfo.discord}`}
                  >
                    <FaDiscord className="w-3.5 h-3.5" />
                  </Button>
                )
              }

              const Icon = iconMap[social.icon as keyof typeof iconMap];
              return (
                <Button
                  key={social.name}
                  variant="outline"
                  size="icon"
                  asChild
                  className="cursor-pointer hover:scale-110 transition-all duration-200 ease-in-out bg-transparent"
                >
                  <Link href={social.url} aria-label={social.name}>
                    <Icon className="w-3.5 h-3.5" />
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Bottom section - Copyright */}
        <div className="text-center mt-3 pt-4 border-t">
          <p className="text-muted-foreground text-xs">
            © 2025 Awwab. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
