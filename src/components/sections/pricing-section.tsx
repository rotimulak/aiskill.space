"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { pricingContent } from "@/lib/landing-content";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function PricingSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        {/* Section heading */}
        <div className="mb-12 text-center md:mb-16">
          <h2 className="animate-fade-in-up mb-4 text-3xl font-bold md:text-4xl">
            {pricingContent.heading}
          </h2>
          <p className="animate-fade-in-up animation-delay-200 text-muted-foreground">
            {pricingContent.note}
          </p>
        </div>

        {/* Pricing cards */}
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {pricingContent.plans.map((plan, index) => (
            <Card
              key={plan.id}
              className={cn(
                "animate-fade-in-up relative transition-all duration-300 hover:shadow-lg",
                plan.popular && "border-primary shadow-lg scale-105 z-10"
              )}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-medium text-primary-foreground">
                  Популярный
                </div>
              )}

              <CardHeader className="text-center">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-chart-2" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                  asChild
                >
                  <a href="https://t.me/rotimulak" target="_blank" rel="noopener noreferrer">
                    {plan.cta}
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
