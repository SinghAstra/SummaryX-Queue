import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const headers = {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  };

  const stream = new TransformStream();
  const writer = stream.writable.getWriter();
  const encoder = new TextEncoder();

  // Start monitoring process updates
  void monitorProcess(params.id, writer, encoder);

  return new NextResponse(stream.readable, { headers });
}

async function monitorProcess(
  processId: string,
  writer: WritableStreamDefaultWriter,
  encoder: TextEncoder
) {
  try {
    while (true) {
      const process = await prisma.process.findUnique({
        where: { id: processId },
      });

      if (!process) {
        await writer.write(
          encoder.encode(
            `data: ${JSON.stringify({ error: "Process not found" })}\n\n`
          )
        );
        break;
      }

      await writer.write(
        encoder.encode(`data: ${JSON.stringify(process)}\n\n`)
      );

      if (
        process.status === "COMPLETED" ||
        process.status === "FAILED" ||
        process.status === "CANCELLED"
      ) {
        break;
      }

      // Check for updates every second
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  } catch (error) {
    console.error("Error in monitoring process:", error);
    await writer.write(
      encoder.encode(
        `data: ${JSON.stringify({ error: "Monitoring failed" })}\n\n`
      )
    );
  } finally {
    await writer.close();
  }
}
