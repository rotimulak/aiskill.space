"use client";

import { capabilitiesContent } from "@/lib/landing-content";
import { Brain, Database, FileOutput, Plug, Server, Shield } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  "brain": <Brain className="h-6 w-6" />,
  "plug": <Plug className="h-6 w-6" />,
  "file-output": <FileOutput className="h-6 w-6" />,
  "shield": <Shield className="h-6 w-6" />,
  "server": <Server className="h-6 w-6" />,
  "database": <Database className="h-6 w-6" />,
};

export function CapabilitiesSection() {
  return (
    <section className="bg-muted/30 py-20 md:py-28">
      <div className="container mx-auto px-4">
        {/* Section heading */}
        <div className="mb-12 text-center md:mb-16">
          <h2 className="animate-fade-in-up text-3xl font-bold md:text-4xl">
            {capabilitiesContent.heading}
          </h2>
        </div>

        {/* Capabilities grid */}
        <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {capabilitiesContent.items.map((item, index) => (
            <div
              key={item.id}
              className="animate-fade-in-up group flex gap-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110">
                {iconMap[item.icon]}
              </div>
              <div>
                <h3 className="mb-1 font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
