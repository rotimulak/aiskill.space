"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { solutionContent } from "@/lib/landing-content";
import { Blocks, GitBranch, Layers, MessageCircle, PiggyBank, Webhook } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  "message-circle": <MessageCircle className="h-6 w-6" />,
  "git-branch": <GitBranch className="h-6 w-6" />,
  "layers": <Layers className="h-6 w-6" />,
  "piggy-bank": <PiggyBank className="h-6 w-6" />,
  "blocks": <Blocks className="h-6 w-6" />,
  "webhook": <Webhook className="h-6 w-6" />,
};

export function SolutionSection() {
  return (
    <section className="bg-muted/30 py-20 md:py-28">
      <div className="container mx-auto px-4">
        {/* Section heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <h2 className="animate-fade-in-up mb-4 text-3xl font-bold md:text-4xl">
            {solutionContent.heading}
          </h2>
          <p className="animate-fade-in-up animation-delay-200 text-lg text-muted-foreground">
            {solutionContent.description}
          </p>
        </div>

        {/* Features grid */}
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {solutionContent.features.map((feature, index) => (
            <Card
              key={feature.id}
              className="animate-fade-in-up group transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="mb-2 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    {iconMap[feature.icon]}
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">#{feature.number}</span>
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
