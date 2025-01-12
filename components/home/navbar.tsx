"use client";

import { siteConfig } from "@/config/site";
import Link from "next/link";

export function Navbar() {
  return (
    <header className="z-50 w-full py-2 px-4 backdrop-blur-sm border-b border-gray-800/20">
      <nav className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity ml-2"
        >
          <span className="tracking-wide text-4xl font-medium">
            {siteConfig.name}
          </span>
        </Link>
      </nav>
    </header>
  );
}
