"use client";

import { Card, CardContent } from "@/components/ui/card";
import { testimonialsContent } from "@/lib/landing-content";
import { Quote } from "lucide-react";

export function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        {/* Section heading */}
        <div className="mb-12 text-center md:mb-16">
          <h2 className="animate-fade-in-up text-3xl font-bold md:text-4xl">
            {testimonialsContent.heading}
          </h2>
        </div>

        {/* Testimonials grid */}
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {testimonialsContent.items.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className="animate-fade-in-up transition-all duration-300 hover:shadow-lg"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="pt-6">
                <Quote className="mb-4 h-8 w-8 text-primary/30" />
                <blockquote className="mb-6 text-lg leading-relaxed">
                  &laquo;{testimonial.quote}&raquo;
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
