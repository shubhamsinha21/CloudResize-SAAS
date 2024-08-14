import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// this is how we write a function for request in next js
export async function GET(request: NextRequest) {
  try {
    // use a video and with lots of methods
    const videos = await prisma.video.findMany({
      // orderBy clause
      orderBy: { createdAt: "desc" },
    });
    // return response
    return NextResponse.json(videos);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching videos" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
