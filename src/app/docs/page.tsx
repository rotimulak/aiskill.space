"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navigation, texts } from "./content";

type TextItem = string | { bold?: string; code?: string; text: string };

const renderTextItem = (item: TextItem, index: number) => {
  if (typeof item === "string") {
    return <li key={index}>{item}</li>;
  }
  if (item.code) {
    return (
      <li key={index}>
        <code className="bg-muted px-1.5 py-0.5 rounded text-xs">{item.code}</code>
        {item.text}
      </li>
    );
  }
  return (
    <li key={index}>
      <strong>{item.bold}</strong>
      {item.text}
    </li>
  );
};

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("intro");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navigation.map((nav) => ({
        id: nav.id,
        element: document.getElementById(nav.id),
      }));

      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element && section.element.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileNavOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="font-semibold">{texts.header.backLink}</span>
            </Link>
            <h1 className="text-lg font-semibold">{texts.header.title}</h1>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-lg border lg:hidden"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              aria-label="Toggle navigation"
            >
              {mobileNavOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
            <div className="hidden lg:block w-[120px]" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4">
        <div className="flex">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <nav className="sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto py-8 pr-4">
              <ul className="space-y-1">
                {navigation.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                        activeSection === item.id
                          ? "bg-primary text-primary-foreground font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      )}
                    >
                      {item.title}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Mobile Sidebar */}
          {mobileNavOpen && (
            <div className="fixed inset-0 top-16 z-40 lg:hidden">
              <div
                className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                onClick={() => setMobileNavOpen(false)}
              />
              <nav className="relative z-50 w-64 h-full bg-background border-r p-4 overflow-y-auto">
                <ul className="space-y-1">
                  {navigation.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                          activeSection === item.id
                            ? "bg-primary text-primary-foreground font-medium"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        )}
                      >
                        {item.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          )}

          {/* Main Content */}
          <main className="flex-1 min-w-0 py-8 lg:pl-8">
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              {/* Hero */}
              <div className="not-prose mb-12 pb-8 border-b">
                <h1 className="text-4xl font-bold mb-4">{texts.hero.title}</h1>
                <p className="text-xl text-muted-foreground">{texts.hero.subtitle}</p>
              </div>

              {/* Intro Section */}
              <section id="intro" className="scroll-mt-20 mb-16">
                <h2 className="text-2xl font-bold mb-4">{texts.intro.title}</h2>
                {texts.intro.paragraphs.map((p, i) => (
                  <p key={i} className="text-muted-foreground mb-4">
                    {i === 0 && <strong>Envise</strong>}
                    {i === 0 ? p.replace("Envise", "") : p}
                  </p>
                ))}
              </section>

              {/* Principles Section */}
              <section id="principles" className="scroll-mt-20 mb-16">
                <h2 className="text-2xl font-bold mb-6">{texts.principles.title}</h2>
                <div className="space-y-6">
                  {texts.principles.cards.map((card, cardIndex) => (
                    <div key={cardIndex} className="p-6 rounded-lg border bg-card">
                      <h3 className="text-lg font-semibold mb-3">{card.title}</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        {card.items.map((item, i) => renderTextItem(item, i))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* Capabilities Section */}
              <section id="capabilities" className="scroll-mt-20 mb-16">
                <h2 className="text-2xl font-bold mb-6">{texts.capabilities.title}</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {texts.capabilities.cards.map((card, cardIndex) => (
                    <div key={cardIndex} className="p-6 rounded-lg border bg-card">
                      <h3 className="text-lg font-semibold mb-3">{card.title}</h3>
                      <ul className="space-y-2 text-muted-foreground text-sm">
                        {card.items.map((item, i) => renderTextItem(item, i))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* VibeADOps Section */}
              <section id="vibeadops" className="scroll-mt-20 mb-16">
                <h2 className="text-2xl font-bold mb-6">{texts.vibeadops.title}</h2>

                <div className="p-6 rounded-lg border bg-gradient-to-br from-primary/5 to-primary/10 mb-6">
                  <h3 className="text-xl font-semibold mb-3">{texts.vibeadops.hero.title}</h3>
                  <p className="text-muted-foreground mb-4">
                    <strong>VibeADOps</strong>
                    {texts.vibeadops.hero.description.replace("VibeADOps", "")}
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    {texts.vibeadops.hero.items.map((item, i) => renderTextItem(item, i))}
                  </ul>
                </div>

                <div className="p-6 rounded-lg border bg-card">
                  <h3 className="text-lg font-semibold mb-4">{texts.vibeadops.ecosystem.title}</h3>
                  <p className="text-muted-foreground mb-4">{texts.vibeadops.ecosystem.description}</p>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {texts.vibeadops.ecosystem.roles.map((role, i) => (
                      <div key={i} className="p-3 rounded-lg bg-muted/50">
                        <strong>{role.name}</strong>
                        <p className="text-sm text-muted-foreground">{role.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Use Cases Section */}
              <section id="use-cases" className="scroll-mt-20 mb-16">
                <h2 className="text-2xl font-bold mb-6">{texts.useCases.title}</h2>
                <div className="space-y-6">
                  {texts.useCases.cases.map((useCase, i) => (
                    <div key={i} className="p-6 rounded-lg border bg-card">
                      <h3 className="text-lg font-semibold mb-3">{useCase.title}</h3>
                      <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                        <code>{useCase.code}</code>
                      </pre>
                    </div>
                  ))}
                </div>
              </section>

              {/* Architecture Section */}
              <section id="architecture" className="scroll-mt-20 mb-16">
                <h2 className="text-2xl font-bold mb-6">{texts.architecture.title}</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {texts.architecture.cards.map((card, cardIndex) => (
                    <div key={cardIndex} className="p-6 rounded-lg border bg-card">
                      <h3 className="text-lg font-semibold mb-3">{card.title}</h3>
                      <ul className="space-y-2 text-muted-foreground text-sm">
                        {card.items.map((item, i) => renderTextItem(item, i))}
                      </ul>
                    </div>
                  ))}
                  <div className="p-6 rounded-lg border bg-card md:col-span-2">
                    <h3 className="text-lg font-semibold mb-3">{texts.architecture.security.title}</h3>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      {texts.architecture.security.items.map((item, i) => (
                        <div key={i} className="text-center p-3 bg-muted/50 rounded-lg">
                          <p className="font-medium">{item.title}</p>
                          <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Shared Knowledge Section */}
              <section id="shared-knowledge" className="scroll-mt-20 mb-16">
                <h2 className="text-2xl font-bold mb-6">{texts.sharedKnowledge.title}</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {texts.sharedKnowledge.cards.map((card, cardIndex) => (
                    <div key={cardIndex} className="p-6 rounded-lg border bg-card">
                      <h3 className="text-lg font-semibold mb-3">{card.title}</h3>
                      {card.description && (
                        <p className="text-muted-foreground mb-3">
                          {card.description.split("shared/")[0]}
                          <code className="bg-muted px-1.5 py-0.5 rounded">shared/</code>
                          {card.description.split("shared/")[1]}
                        </p>
                      )}
                      <ul className="space-y-2 text-muted-foreground text-sm">
                        {card.items.map((item, i) => renderTextItem(item, i))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* Output Formats Section */}
              <section id="output-formats" className="scroll-mt-20 mb-16">
                <h2 className="text-2xl font-bold mb-6">{texts.outputFormats.title}</h2>
                <div className="grid gap-6 md:grid-cols-3">
                  {texts.outputFormats.cards.map((card, cardIndex) => (
                    <div key={cardIndex} className="p-6 rounded-lg border bg-card">
                      <h3 className="text-lg font-semibold mb-3">{card.title}</h3>
                      <p className="text-muted-foreground text-sm mb-3">{card.description}</p>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        {card.items.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* Integrations Section */}
              <section id="integrations" className="scroll-mt-20 mb-16">
                <h2 className="text-2xl font-bold mb-6">{texts.integrations.title}</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {texts.integrations.cards.map((card, cardIndex) => (
                    <div key={cardIndex} className="p-6 rounded-lg border bg-card">
                      <h3 className="text-lg font-semibold mb-3">{card.title}</h3>
                      <p className="text-muted-foreground text-sm mb-3">{card.description}</p>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        {card.items.map((item, i) => renderTextItem(item, i))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* Deployment Section */}
              <section id="deployment" className="scroll-mt-20 mb-16">
                <h2 className="text-2xl font-bold mb-6">{texts.deployment.title}</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="p-6 rounded-lg border bg-card">
                    <h3 className="text-lg font-semibold mb-4">{texts.deployment.poc.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{texts.deployment.poc.description}</p>
                    <div className="mb-4">
                      <p className="font-medium mb-2">{texts.deployment.poc.current.title}</p>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {texts.deployment.poc.current.items.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium mb-2">{texts.deployment.poc.future.title}</p>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {texts.deployment.poc.future.items.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-6 rounded-lg border bg-card">
                    <h3 className="text-lg font-semibold mb-4">{texts.deployment.patterns.title}</h3>
                    <div className="space-y-3">
                      {texts.deployment.patterns.items.map((item, i) => (
                        <div key={i} className="p-3 bg-muted/50 rounded-lg">
                          <p className="font-medium">{item.title}</p>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Getting Started Section */}
              <section id="getting-started" className="scroll-mt-20 mb-16">
                <h2 className="text-2xl font-bold mb-6">{texts.gettingStarted.title}</h2>
                <div className="space-y-6">
                  <div className="p-6 rounded-lg border bg-card">
                    <h3 className="text-lg font-semibold mb-4">{texts.gettingStarted.installation.title}</h3>
                    <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                      <code>{texts.gettingStarted.installation.code}</code>
                    </pre>
                  </div>

                  <div className="p-6 rounded-lg border bg-gradient-to-br from-primary/5 to-primary/10">
                    <h3 className="text-lg font-semibold mb-4">{texts.gettingStarted.example.title}</h3>
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <span className="shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm">
                          👤
                        </span>
                        <div className="p-3 bg-background rounded-lg flex-1">
                          <p className="text-sm">&quot;{texts.gettingStarted.example.userMessage}&quot;</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <span className="shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm">
                          🔄
                        </span>
                        <div className="p-3 bg-background rounded-lg flex-1">
                          <p className="text-sm font-medium mb-2">VibeADOps:</p>
                          <p className="text-sm text-muted-foreground">
                            {texts.gettingStarted.example.botResponse.intro}
                          </p>
                          <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                            {texts.gettingStarted.example.botResponse.items.map((item, i) => (
                              <li key={i}>• {item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Community Section */}
              <section id="community" className="scroll-mt-20 mb-16">
                <h2 className="text-2xl font-bold mb-6">{texts.community.title}</h2>
                <div className="grid gap-6 md:grid-cols-3">
                  {texts.community.cards.map((card, cardIndex) => (
                    <div key={cardIndex} className="p-6 rounded-lg border bg-card">
                      <h3 className="text-lg font-semibold mb-3">{card.title}</h3>
                      <ul className="space-y-2 text-muted-foreground text-sm">
                        {card.items.map((item, i) => renderTextItem(item, i))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* Roadmap Section */}
              <section id="roadmap" className="scroll-mt-20 mb-16">
                <h2 className="text-2xl font-bold mb-6">{texts.roadmap.title}</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="p-6 rounded-lg border bg-card">
                    <h3 className="text-lg font-semibold mb-4">{texts.roadmap.development.title}</h3>
                    <ul className="space-y-3 text-muted-foreground">
                      {texts.roadmap.development.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="shrink-0 mt-0.5">{item.icon}</span>
                          <div>
                            <strong>{item.title}</strong>
                            <p className="text-sm">{item.description}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-6 rounded-lg border bg-card">
                    <h3 className="text-lg font-semibold mb-4">{texts.roadmap.trends.title}</h3>
                    <ul className="space-y-3 text-muted-foreground">
                      {texts.roadmap.trends.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="shrink-0 mt-0.5">{item.icon}</span>
                          <div>
                            <strong>{item.title}</strong>
                            <p className="text-sm">{item.description}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* Conclusion */}
              <section className="scroll-mt-20 p-8 rounded-lg border bg-gradient-to-br from-primary/5 to-primary/10">
                <h2 className="text-2xl font-bold mb-4">{texts.conclusion.title}</h2>
                <p className="text-muted-foreground mb-4">
                  {texts.conclusion.paragraphs[0].split("платформа для создания интеллектуальных систем")[0]}
                  <strong>платформа для создания интеллектуальных систем</strong>
                  {texts.conclusion.paragraphs[0].split("платформа для создания интеллектуальных систем")[1]}
                </p>
                <p className="text-muted-foreground mb-6">
                  С <strong>VibeADOps</strong>
                  {texts.conclusion.paragraphs[1].replace("С VibeADOps", "")}
                </p>
                <p className="font-semibold">{texts.conclusion.cta}</p>
              </section>
            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>{texts.footer.text}</p>
        </div>
      </footer>
    </div>
  );
}
