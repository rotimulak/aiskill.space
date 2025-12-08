"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqContent } from "@/lib/landing-content";

export function FaqSection() {
  return (
    <section className="bg-muted/30 py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          {/* Section heading */}
          <div className="mb-12 text-center">
            <h2 className="animate-fade-in-up text-3xl font-bold md:text-4xl">
              {faqContent.heading}
            </h2>
          </div>

          {/* FAQ accordion */}
          <Accordion type="single" collapsible className="animate-fade-in-up animation-delay-200">
            {faqContent.items.map((item, index) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
