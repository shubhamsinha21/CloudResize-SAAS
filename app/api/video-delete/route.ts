import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function DELETE(request: NextRequest) {
  try {
    // Check user authentication (optional, adapt to your needs)
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const videoId = request.nextUrl.searchParams.get("id"); // Get video ID from query string

    if (!videoId) {
      return NextResponse.json({ error: "Missing video ID" }, { status: 400 });
    }

    // Delete video record from database
    await prisma.video.delete({ where: { id: videoId } });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting video:", error);
    return NextResponse.json(
      { error: "Failed to delete video" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
