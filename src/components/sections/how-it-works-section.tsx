"use client";

import { howItWorksContent } from "@/lib/landing-content";

export function HowItWorksSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        {/* Section heading */}
        <div className="mb-12 text-center md:mb-16">
          <h2 className="animate-fade-in-up text-3xl font-bold md:text-4xl">
            {howItWorksContent.heading}
          </h2>
        </div>

        {/* Steps timeline */}
        <div className="mx-auto max-w-3xl">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 h-full w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent md:left-1/2 md:-translate-x-1/2" />

            {howItWorksContent.steps.map((step, index) => (
              <div
                key={step.number}
                className="animate-fade-in-up relative mb-8 last:mb-0"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`flex items-start gap-6 md:gap-12 ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                  {/* Step number circle */}
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground shadow-lg md:absolute md:left-1/2 md:-translate-x-1/2">
                    {step.number}
                  </div>

                  {/* Content card */}
                  <div className={`flex-1 rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md md:max-w-[calc(50%-3rem)] ${index % 2 === 1 ? "md:text-right" : ""}`}>
                    <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
