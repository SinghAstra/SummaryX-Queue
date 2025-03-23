import ServerMdxRenderer from "@/components/server-mdx-renderer";

export default async function Home() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-foreground">
        MDX Rendering Demo
      </h1>

      <ServerMdxRenderer />
    </main>
  );
}
