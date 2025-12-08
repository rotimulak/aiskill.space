"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { problemsContent } from "@/lib/landing-content";
import { Code, EyeOff, Puzzle } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  "eye-off": <EyeOff className="h-8 w-8" />,
  "puzzle": <Puzzle className="h-8 w-8" />,
  "code": <Code className="h-8 w-8" />,
};

export function ProblemsSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        {/* Section heading */}
        <div className="mb-12 text-center md:mb-16">
          <h2 className="animate-fade-in-up text-3xl font-bold md:text-4xl">
            {problemsContent.heading}
          </h2>
        </div>

        {/* Problems grid */}
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {problemsContent.items.map((problem, index) => (
            <Card
              key={problem.id}
              className="animate-fade-in-up group border-destructive/20 bg-red-50 dark:bg-red-950 transition-all duration-300 hover:border-destructive/40 hover:shadow-lg"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardHeader>
                <div className="mb-2 text-destructive/70 transition-colors group-hover:text-destructive">
                  {iconMap[problem.icon]}
                </div>
                <CardTitle className="text-lg">{problem.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {problem.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
