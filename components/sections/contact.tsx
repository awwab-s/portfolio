import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Send,
  Globe,
  Instagram,
} from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import { toast } from "sonner";
import type { Translation } from "@/types";
import { contactInfo } from "@/lib/constants";
import { handleContactSubmit } from "@/lib/email";
import { ScrollReveal } from "../scroll-reveal";

interface ContactProps {
  t: Translation;
  isRTL: boolean;
}

export function Contact({ t, isRTL }: ContactProps) {
  const handleDiscordCopy = () => {
    navigator.clipboard.writeText(contactInfo.discord);
    toast.success(`Discord username "${contactInfo.discord}" copied!`, {
      duration: 2000,
    });
  };

  return (
    <section id="contact" className="border-t py-16 sm:py-20">
      <div className="container mx-auto px-6 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-12" amount={0.5}>
            <h2 className="text-3xl sm:text-4xl text-primary font-bold mb-4 font-space-grotesk">
              {t.contact.title}
            </h2>
            <p className="sm:text-lg text-muted-foreground">
              {t.contact.subtitle}
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            <ScrollReveal
              direction="left"
              className="space-y-6 sm:space-y-8"
              amount={0.5}
              isRTL={isRTL}
            >
              {/* Contact Info */}
              <Card className="bg-background backdrop-blur-sm border shadow-sm py-4 sm:py-6">
                <CardHeader className="px-4 sm:px-6">
                  <CardTitle className="text-lg sm:text-xl">
                    {t.contact.contactInfo}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm sm:text-base px-4 sm:px-6">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <span>{contactInfo.email}</span>
                  </div>
                  {/* <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <span>{contactInfo.phone}</span>
                  </div> */}
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span>{contactInfo.location}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-primary" />
                    <Link
                      href="https://awwabsamad.vercel.app"
                      className="hover:text-hover transition-color ease-in-out duration-200 underline-offset-2 hover:underline"
                    >
                      awwabsamad.vercel.app
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Socials */}
              <Card className="bg-background backdrop-blur-sm border shadow-sm py-4 sm:py-6">
                <CardHeader className="px-4 sm:px-6">
                  <CardTitle className="text-lg sm:text-xl">
                    {t.contact.followMe}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 sm:px-6">
                  <div className="flex space-x-3 sm:space-x-4 text-sm sm:text-base">
                    <Button
                      variant="outline"
                      size="icon"
                      asChild
                      className="cursor-pointer hover:scale-110 transition-all duration-200 ease-in-out bg-transparent"
                    >
                      <Link
                        href={contactInfo.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      asChild
                      className="cursor-pointer hover:scale-110 transition-all duration-200 ease-in-out bg-transparent"
                    >
                      <Link
                        href={contactInfo.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="w-4 h-4" />
                      </Link>
                    </Button>
                    {/* <Button
                      variant="outline"
                      size="icon"
                      asChild
                      className="cursor-pointer hover:scale-110 transition-all duration-200 ease-in-out bg-transparent"
                    >
                      <Link
                        href={contactInfo.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Instagram className="w-4 h-4" />
                      </Link>
                    </Button> */}
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleDiscordCopy}
                      className="cursor-pointer hover:scale-110 transition-all duration-200 ease-in-out bg-transparent"
                      title={`Click to copy Discord username: ${contactInfo.discord}`}
                    >
                      <FaDiscord className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal direction="right" amount={0.5} isRTL={isRTL}>
              {/* Contact Form */}
              <Card className="bg-background backdrop-blur-sm border shadow-sm h-full py-4 sm:py-6">
                <CardHeader className="px-4 sm:px-6">
                  <CardTitle className="text-lg sm:text-xl">
                    {t.contact.sendMessage}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 sm:pt-2 px-4 sm:px-6">
                  <form className="space-y-6" onSubmit={handleContactSubmit}>
                    <div>
                      <Label htmlFor="name" className="mb-2 block">
                        {t.contact.name}
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder={t.contact.name}
                        required
                        className="placeholder:text-sm"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="mb-2 block">
                        {t.contact.email}
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder={t.contact.email}
                        required
                        className="placeholder:text-sm"
                      />
                    </div>
                    <div>
                      <Label htmlFor="message" className="mb-2 block">
                        {t.contact.message}
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder={t.contact.message}
                        rows={5}
                        required
                        className="placeholder:text-sm"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="flex gap-3 w-full cursor-pointer group hover:scale-103"
                    >
                      {t.contact.send}
                      <Send
                        className={`w-4 h-4 transition-transform duration-300 ease-in-out ${
                          isRTL
                            ? "group-hover:-translate-x-2 scale-x-[-1]"
                            : "group-hover:translate-x-2"
                        }`}
                      />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
