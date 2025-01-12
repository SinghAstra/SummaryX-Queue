import { siteConfig } from "@/config/site";
import Link from "next/link";
import React from "react";
import { Icons } from "../Icons";
import { Button } from "../ui/button";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            © 2024 {siteConfig.name}. All rights reserved.
          </div>
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
      </div>
    </footer>
  );
};

export default Footer;
