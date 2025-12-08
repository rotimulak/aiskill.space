"use client";

import { Button } from "@/components/ui/button";
import { heroContent, siteConfig } from "@/lib/landing-content";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">

      <div className="container mx-auto px-4">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          {/* Badge */}
          <div className="animate-fade-in-down mb-6 inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-1.5 text-sm backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">AI-автоматизация нового поколения</span>
          </div>

          {/* Heading + Description в плашке */}
          <div className="animate-fade-in-up animation-delay-200 relative mb-10 overflow-hidden rounded-3xl border bg-white/70 dark:bg-card/80 px-6 py-8 md:px-10 md:py-10">
            {/* Animated gradient orbs */}
            <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-primary/15 blur-3xl animate-pulse-slow" />
            <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-chart-2/15 blur-3xl animate-pulse-slow animation-delay-2000" />

            <h1 className="relative mb-4 text-4xl font-bold tracking-normal md:text-5xl lg:text-6xl">
              {heroContent.heading}
            </h1>
            <p className="relative text-lg text-muted-foreground md:text-xl">
              {heroContent.description}
            </p>
          </div>

          {/* CTAs */}
          <div className="animate-fade-in-up animation-delay-600 flex flex-col gap-4 sm:flex-row">
            <Button size="lg" className="group gap-2" asChild>
              <a href="https://t.me/rotimulak" target="_blank" rel="noopener noreferrer">
                {heroContent.cta.primary}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href={siteConfig.docsUrl}>{heroContent.cta.secondary}</a>
            </Button>
          </div>

          {/* Stats */}
          <div className="animate-fade-in-up animation-delay-800 mt-16 grid grid-cols-3 gap-8 md:gap-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary md:text-4xl">{heroContent.stats.tracks}</div>
              <div className="mt-1 text-sm text-muted-foreground">готовых треков</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary md:text-4xl">{heroContent.stats.integrations}</div>
              <div className="mt-1 text-sm text-muted-foreground">интеграций</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary md:text-4xl">{heroContent.stats.tests}</div>
              <div className="mt-1 text-sm text-muted-foreground">автотестов</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
