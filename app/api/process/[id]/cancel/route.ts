import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const process = await prisma.process.update({
      where: { id: params.id },
      data: { status: "CANCELLED" },
    });

    return NextResponse.json(process);
  } catch (error) {
    console.error("Error cancelling process:", error);
    return NextResponse.json(
      { error: "Failed to cancel process" },
      { status: 500 }
    );
  }
}
