import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const filter = searchParams.get("filter");

    const where = filter === "unread" ? { read: false } : {};

    const [contacts, unreadCount] = await Promise.all([
      prisma.contact.findMany({
        where,
        orderBy: { createdAt: "desc" },
      }),
      prisma.contact.count({ where: { read: false } }),
    ]);

    return NextResponse.json({
      contacts: contacts.map((c) => ({
        ...c,
        createdAt: c.createdAt.toISOString(),
      })),
      unreadCount,
    });
  } catch (error) {
    console.error("Admin contacts API error:", error);
    return NextResponse.json(
      { error: "Internal server error", contacts: [], unreadCount: 0 },
      { status: 500 }
    );
  }
}
