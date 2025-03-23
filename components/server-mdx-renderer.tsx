import { mdxContent } from "@/lib/mdx-content";
import { MDXRemote } from "next-mdx-remote/rsc";
import { serialize } from "next-mdx-remote/serialize";
import rehypePrism from "rehype-prism-plus";
import remarkGfm from "remark-gfm";

export default async function ServerMdxRenderer() {
  try {
    const mdxSource = await serialize(mdxContent, {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypePrism],
      },
      parseFrontmatter: true,
    });

    return (
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <MDXRemote
          source={mdxContent}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypePrism],
            },
          }}
        />
      </div>
    );
  } catch (error) {
    console.error("Error serializing MDX:", error);
    return <p>Failed to load content</p>;
  }
}
