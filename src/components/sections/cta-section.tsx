"use client";

import { Button } from "@/components/ui/button";
import { ctaContent } from "@/lib/landing-content";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="animate-fade-in-up mx-auto max-w-3xl text-center">
          {/* Background decoration */}
          <div className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-primary/5 via-chart-2/5 to-chart-1/5 p-8 md:p-16">
            {/* Animated gradient orbs */}
            <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-primary/20 blur-3xl animate-pulse-slow" />
            <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-chart-2/20 blur-3xl animate-pulse-slow animation-delay-2000" />

            <h2 className="relative mb-4 text-3xl font-bold md:text-4xl">
              {ctaContent.heading}
            </h2>

            <p className="relative mb-8 text-lg text-muted-foreground">
              {ctaContent.description}
            </p>

            <div className="relative flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="group gap-2" asChild>
                <a href="https://t.me/rotimulak" target="_blank" rel="noopener noreferrer">
                  {ctaContent.primaryCta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="https://t.me/rotimulak" target="_blank" rel="noopener noreferrer">
                  {ctaContent.secondaryCta}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
