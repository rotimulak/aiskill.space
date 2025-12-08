"use client";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/landing-content";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Возможности", href: "#capabilities" },
  { label: "Применения", href: "#use-cases" },
  { label: "Тарифы", href: "#pricing" },
  { label: "Документация", href: siteConfig.docsUrl },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <nav className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="/" className="text-xl font-bold">
            {siteConfig.name}
          </a>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA button */}
          <div className="hidden md:block">
            <Button asChild>
              <a href="https://t.me/rotimulak" target="_blank" rel="noopener noreferrer">Запросить демо</a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg border md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {/* Mobile navigation */}
        {isOpen && (
          <div className="animate-fade-in-down border-t py-4 md:hidden">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button className="mt-2 w-full" asChild>
                <a href="https://t.me/rotimulak" target="_blank" rel="noopener noreferrer">Запросить демо</a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
