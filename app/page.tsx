import ClientMdxRenderer from "@/components/client-mdx-renderer";
import ServerMdxRenderer from "@/components/server-mdx-renderer";
import TabsContainer from "@/components/tabs-container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-foreground">
        MDX Rendering Demo
      </h1>

      <ClientMdxRenderer />
      <ServerMdxRenderer />

      {/* <TabsContainer defaultValue="client">
        <TabsList className="mb-8">
          <TabsTrigger value="client">Client Component</TabsTrigger>
          <TabsTrigger value="server">Server Component</TabsTrigger>
        </TabsList>

        <Tabs>
          <TabsContent className="mt-4" value="client">
            <div className="p-6 rounded-lg border border-border bg-card">
              <h2 className="text-xl font-semibold mb-4 text-foreground">
                Client-side MDX Rendering
              </h2>
            </div>
          </TabsContent>

          <TabsContent className="mt-4" value="server">
            <div className="p-6 rounded-lg border border-border bg-card">
              <h2 className="text-xl font-semibold mb-4 text-foreground">
                Server-side MDX Rendering
              </h2>
              <ServerMdxRenderer />
            </div>
          </TabsContent>
        </Tabs>
      </TabsContainer> */}
    </main>
  );
}
