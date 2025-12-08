"use client";

import { footerContent, siteConfig } from "@/lib/landing-content";
import { Github, Send } from "lucide-react";

export function FooterSection() {
  return (
    <footer className="border-t bg-muted/30 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Logo and copyright */}
          <div className="flex flex-col items-center gap-2 md:items-start">
            <span className="text-xl font-bold">{siteConfig.name}</span>
            <span className="text-sm text-muted-foreground">{footerContent.copyright}</span>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-6">
            {footerContent.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social links */}
          <div className="flex gap-4">
            {footerContent.social.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border bg-background text-muted-foreground transition-all hover:border-primary hover:text-primary"
                aria-label={social.label}
              >
                {social.label === "Telegram" ? (
                  <Send className="h-4 w-4" />
                ) : (
                  <Github className="h-4 w-4" />
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
