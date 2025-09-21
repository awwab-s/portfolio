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
import type { Translation } from "@/types";

import { contactInfo } from "@/lib/constants";

interface ContactProps {
  t: Translation;
  isRTL: boolean;
}

export function Contact({ t, isRTL }: ContactProps) {
  return (
    <section id="contact" className="border-t py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl text-primary font-bold mb-4 font-space-grotesk">
              {t.contact.title}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t.contact.subtitle}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-8">
              {/* Contact Info */}
              <Card className="bg-background backdrop-blur-sm border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl">
                    {t.contact.contactInfo}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <span>{contactInfo.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <span>{contactInfo.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span>{contactInfo.location}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-primary" />
                    <Link
                      href="https://awwab.vercel.app"
                      className="hover:text-hover transition-color ease-in-out duration-200 underline-offset-2 hover:underline"
                    >
                      awwab.vercel.app
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Socials */}
              <Card className="bg-background backdrop-blur-sm border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl">
                    {t.contact.followMe}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4">
                    <Button
                      variant="outline"
                      size="icon"
                      asChild
                      className="cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out bg-transparent"
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
                      className="cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out bg-transparent"
                    >
                      <Link
                        href={contactInfo.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      asChild
                      className="cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out bg-transparent"
                    >
                      <Link
                        href={contactInfo.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Instagram className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div>
              {/* Contact Form */}
              <Card className="bg-background backdrop-blur-sm border shadow-sm h-full">
                <CardHeader>
                  <CardTitle className="text-xl">
                    {t.contact.sendMessage}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-2">
                  <form className="space-y-6" action={`mailto:${contactInfo.email}`} method="POST" encType="text/plain">
                    <div>
                      <Label htmlFor="name" className="mb-2 block">
                        {t.contact.name}
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder={t.contact.name}
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
                      />
                    </div>
                    <Button
                      type="submit"
                      className="flex gap-3 w-full cursor-pointer group hover:scale-105"
                    >
                      {t.contact.send}
                      <Send
                        className={`w-4 h-4 transition-transform duration-200 ease-in-out ${
                          isRTL
                            ? "group-hover:-translate-x-2 scale-x-[-1]"
                            : "group-hover:translate-x-2"
                        }`}
                      />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
