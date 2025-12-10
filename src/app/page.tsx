import {
  Navbar,
  HeroSection,
  ProblemsSection,
  SolutionSection,
  HowItWorksSection,
  UseCasesSection,
  VibeAdOpsSection,
  CapabilitiesSection,
  TechStackSection,
  WorkflowSection,
  PricingSection,
  CtaSection,
  FooterSection,
} from "@/components/sections";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Navbar />
      <main>
        {/* First parallax section with fixed background */}
        <div className="parallax-container">
          <div
            className="parallax-bg"
            style={{ backgroundImage: "url('/images/image5up.png')" }}
          />
          <div className="parallax-overlay" />
          <HeroSection />
          <ProblemsSection />
        </div>

        {/* Solid sections that overlay the first background */}
        <div className="relative z-10 bg-background">
          <SolutionSection />
          <HowItWorksSection />
        </div>

        {/* Second parallax section with fixed background */}
        <div className="parallax-container">
          <div
            className="parallax-bg"
            style={{ backgroundImage: "url('/images/image1up.png')" }}
          />
          <div className="parallax-overlay" />
          <section id="use-cases">
            <UseCasesSection />
          </section>
          <VibeAdOpsSection />
        </div>

        {/* Rest of sections - overlay the second background */}
        <div className="relative z-10 bg-background">
          <section id="capabilities">
            <CapabilitiesSection />
          </section>
          <TechStackSection />
          <WorkflowSection />
        </div>

        {/* Third parallax section with fixed background */}
        <div className="parallax-container">
          <div
            className="parallax-bg"
            style={{ backgroundImage: "url('/images/image2up.jpg')" }}
          />
          <div className="parallax-overlay" />
          <section id="pricing">
            <PricingSection />
          </section>
          <CtaSection />
        </div>
      </main>
      <FooterSection />
    </div>
  );
}
