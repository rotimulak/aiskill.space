"use client";

import dynamic from "next/dynamic";

const WorkflowViewer = dynamic(
  () => import("@/components/workflow/WorkflowViewer").then((mod) => mod.WorkflowViewer),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-[600px]">
        <div className="text-lg text-muted-foreground">Loading workflow...</div>
      </div>
    ),
  }
);

export function WorkflowSection() {
  return (
    <section id="workflow" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        {/* Section heading */}
        <div className="mb-8 text-center md:mb-12">
          <h2 className="animate-fade-in-up text-3xl font-bold md:text-4xl">
            Workflow Visualization
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Interactive visualization of AI-powered workflow pipelines.
            Explore how tasks are orchestrated and executed in sequence.
          </p>
        </div>

        {/* Workflow viewer container */}
        <div className="animate-fade-in-up rounded-xl border bg-card/50 shadow-lg overflow-hidden">
          <div className="h-[600px] w-full">
            <WorkflowViewer />
          </div>
        </div>
      </div>
    </section>
  );
}
