"use client";

import { mdxContent } from "@/lib/mdx-content";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { useEffect, useState } from "react";
import rehypePrism from "rehype-prism-plus";
import remarkGfm from "remark-gfm";

export default function ClientMdxRenderer() {
  const [mdxSource, setMdxSource] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const compileMdx = async () => {
      try {
        const mdxSource = await serialize(mdxContent, {
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypePrism],
          },
          parseFrontmatter: true,
        });
        setMdxSource(mdxSource);
      } catch (error) {
        console.error("Error serializing MDX:", error);
      } finally {
        setIsLoading(false);
      }
    };

    compileMdx();
  }, []);

  if (isLoading) {
    return <div className="animate-pulse">Loading content...</div>;
  }

  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      {mdxSource ? <MDXRemote {...mdxSource} /> : <p>Failed to load content</p>}
    </div>
  );
}
