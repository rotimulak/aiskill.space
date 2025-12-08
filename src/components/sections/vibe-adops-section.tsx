"use client";

import { vibeAdOpsContent } from "@/lib/landing-content";
import { Bot, CheckCircle2, User } from "lucide-react";

export function VibeAdOpsSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left side - Info */}
            <div className="animate-fade-in-up">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
                <Bot className="h-4 w-4" />
                {vibeAdOpsContent.subheading}
              </div>

              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                {vibeAdOpsContent.heading}
              </h2>

              <p className="mb-8 text-lg text-muted-foreground">
                {vibeAdOpsContent.description}
              </p>

              {/* Capabilities list */}
              <ul className="space-y-3">
                {vibeAdOpsContent.capabilities.map((capability, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-chart-2" />
                    <span>{capability}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right side - Chat example */}
            <div className="animate-fade-in-up animation-delay-200">
              <div className="overflow-hidden rounded-2xl border bg-card shadow-lg">
                {/* Chat header */}
                <div className="border-b bg-muted/50 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-destructive/50" />
                      <div className="h-3 w-3 rounded-full bg-chart-4/50" />
                      <div className="h-3 w-3 rounded-full bg-chart-2/50" />
                    </div>
                    <span className="ml-2 text-sm font-medium">VibeADOps Chat</span>
                  </div>
                </div>

                {/* Chat messages */}
                <div className="space-y-4 p-4">
                  {/* User message */}
                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                      <User className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="rounded-2xl rounded-tl-md bg-muted px-4 py-2">
                      <p className="text-sm">{vibeAdOpsContent.example.user}</p>
                    </div>
                  </div>

                  {/* Bot message */}
                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary">
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div className="flex-1 rounded-2xl rounded-tl-md border bg-card px-4 py-3">
                      <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-muted-foreground">
                        {vibeAdOpsContent.example.assistant}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
