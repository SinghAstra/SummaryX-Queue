import { prisma } from "@/lib/prisma";
import { ProcessStatus } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const process = await prisma.process.create({
      data: { status: "PENDING" },
    });

    // Start background processing
    void processStages(process.id);

    return NextResponse.json({ processId: process.id });
  } catch (error) {
    console.log("Error while creating process");
    if (error instanceof Error) {
      console.log("error.message is ", error.message);
      console.log("error.stack is ", error.stack);
    }
    return NextResponse.json(
      { error: "Failed to create process" },
      { status: 500 }
    );
  }
}

async function processStages(processId: string) {
  const stages: ProcessStatus[] = [
    "PENDING",
    "GENERATING_TRANSCRIPT",
    "SEMANTIC_CHUNKING",
    "ANALYZING",
    "COMPLETED",
  ];

  try {
    for (const status of stages) {
      // Skip PENDING as it's the initial state
      if (status === "PENDING") continue;

      // Update the process status
      await prisma.process.update({
        where: { id: processId },
        data: { status },
      });

      // If this is not the final status (COMPLETED), wait for 2 seconds
      if (status !== "COMPLETED") {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }

      // Check if the process was cancelled
      const currentProcess = await prisma.process.findUnique({
        where: { id: processId },
      });

      if (currentProcess?.status === "CANCELLED") {
        return;
      }
    }
  } catch (error) {
    console.error("Error in processing stages:", error);
    await prisma.process.update({
      where: { id: processId },
      data: { status: "FAILED" },
    });
  }
}
