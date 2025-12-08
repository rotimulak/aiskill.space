"use client";

import { techStackContent } from "@/lib/landing-content";

export function TechStackSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        {/* Section heading */}
        <div className="mb-12 text-center md:mb-16">
          <h2 className="animate-fade-in-up text-3xl font-bold md:text-4xl">
            {techStackContent.heading}
          </h2>
        </div>

        {/* Tech categories */}
        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
          {techStackContent.categories.map((category, index) => (
            <div
              key={category.title}
              className="animate-fade-in-up text-center"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                {category.title}
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="inline-flex rounded-full border bg-card px-3 py-1.5 text-sm transition-colors hover:border-primary/50 hover:bg-primary/5"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
