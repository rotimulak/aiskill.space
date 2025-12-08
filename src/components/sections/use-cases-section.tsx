"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCasesContent } from "@/lib/landing-content";
import { Files, Inbox, Layout, Search, Share2, Sparkles, TrendingUp, ChevronDown } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  "files": <Files className="h-6 w-6" />,
  "layout": <Layout className="h-6 w-6" />,
  "sparkles": <Sparkles className="h-6 w-6" />,
  "search": <Search className="h-6 w-6" />,
  "share-2": <Share2 className="h-6 w-6" />,
  "inbox": <Inbox className="h-6 w-6" />,
  "trending-up": <TrendingUp className="h-6 w-6" />,
};

export function UseCasesSection() {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  const toggleCard = (id: string) => {
    setExpandedCards((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        {/* Section heading */}
        <div className="mb-12 text-center md:mb-16">
          <h2 className="animate-fade-in-up text-3xl font-bold md:text-4xl">
            {useCasesContent.heading}
          </h2>
        </div>

        {/* Use cases grid */}
        <div className="mx-auto grid max-w-6xl items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {useCasesContent.cases.map((useCase, index) => {
            const isExpanded = expandedCards.has(useCase.id);
            return (
              <Card
                key={useCase.id}
                className="animate-fade-in-up group overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => toggleCard(useCase.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-chart-1/10 text-chart-1 transition-colors group-hover:bg-chart-1 group-hover:text-white">
                      {iconMap[useCase.icon]}
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                    />
                  </div>
                  <CardTitle className="text-lg">{useCase.title}</CardTitle>
                </CardHeader>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    <CardContent className="space-y-3 pt-0">
                      <CardDescription className="text-sm leading-relaxed">
                        {useCase.description}
                      </CardDescription>
                      {useCase.metric && (
                        <div className="inline-flex items-center rounded-full bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
                          {useCase.metric}
                        </div>
                      )}
                    </CardContent>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
