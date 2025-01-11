"use client";

import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <section className="relative pt-24 pb-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-primary/20 to-transparent blur-3xl opacity-30" />

        <div className="text-center space-y-8 relative">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
              {siteConfig.headline}
            </h1>
          </div>

          <div className="flex flex-col items-center gap-6">
            <div className="text-7xl md:text-8xl font-bold text-primary">
              {count}
            </div>
            <p className="text-xl md:text-2xl font-medium text-foreground">
              {siteConfig.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteConfig.features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-colors"
            >
              <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                <div className="h-6 w-6 rounded-md bg-primary" />
              </div>
              <p className="text-lg font-medium text-foreground">{feature}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="text-3xl">{siteConfig.name}</span>
          </div>

          <p className="text-sm text-muted-foreground text-center md:text-left">
            {siteConfig.description}
          </p>

          <div className="flex gap-4">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost" size="icon">
                <Icons.gitLogo className="h-5 w-5" />
              </Button>
            </Link>
            <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost" size="icon">
                <Icons.twitter className="h-5 w-5" />
              </Button>
            </Link>
            <Link
              href={siteConfig.links.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost" size="icon">
                <Icons.linkedin className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
