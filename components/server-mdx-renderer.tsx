"use server";

import { markdownContent } from "@/lib/mdx-content";
import { cn } from "@/lib/utils";
import { MDXRemote } from "next-mdx-remote/rsc";

const components = {
  h1: ({ ...props }) => (
    <h1
      className="mt-2 scroll-m-20 text-4xl font-bold tracking-tight"
      {...props}
    />
  ),
  h2: ({ ...props }) => (
    <h2
      className={cn(
        "mt-10 scroll-m-20 border-b border-border pb-2 text-3xl font-semibold tracking-tight"
      )}
      {...props}
    />
  ),
  h3: ({ ...props }) => (
    <h3
      className={cn("mt-8 scroll-m-20 text-2xl font-semibold tracking-tight")}
      {...props}
    />
  ),
  h4: ({ ...props }) => (
    <h4
      className={cn("mt-8 scroll-m-20 text-xl font-semibold tracking-tight")}
      {...props}
    />
  ),

  // Paragraphs and text
  p: ({ ...props }) => (
    <p className={cn("leading-7 [&:not(:first-child)]:mt-6")} {...props} />
  ),
  a: ({ ...props }) => (
    <a
      className={cn(
        "font-medium underline underline-offset-4 text-primary hover:text-primary/80"
      )}
      {...props}
    />
  ),
  blockquote: ({ ...props }) => (
    <blockquote
      className={cn(
        "mt-6 border-l-2 border-primary pl-6 italic text-muted-foreground"
      )}
      {...props}
    />
  ),

  // Lists
  ul: ({ ...props }) => <ul className={cn("my-6 ml-6 list-disc")} {...props} />,
  ol: ({ ...props }) => (
    <ol className={cn("my-6 ml-6 list-decimal")} {...props} />
  ),
  li: ({ ...props }) => <li className={cn("mt-2")} {...props} />,

  // Code blocks
  pre: ({ ...props }) => (
    <pre
      className={cn(
        "mb-4 mt-6 overflow-x-auto rounded-lg border border-border bg-[var(--astro-code-color-background)] p-4"
      )}
      {...props}
    />
  ),
  code: ({ ...props }) => (
    <code
      className={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm"
      )}
      {...props}
    />
  ),

  // Tables
  table: ({ ...props }) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn("w-full")} {...props} />
    </div>
  ),
  tr: ({ ...props }) => (
    <tr className={cn("m-0 border-t border-border p-0")} {...props} />
  ),
  th: ({ ...props }) => (
    <th
      className={cn("border border-border px-4 py-2 text-left font-semibold")}
      {...props}
    />
  ),
  td: ({ ...props }) => (
    <td className={cn("border border-border px-4 py-2 text-left")} {...props} />
  ),
};

export default async function ServerMdxRenderer() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <MDXRemote source={markdownContent} components={components} />
    </div>
  );
}
