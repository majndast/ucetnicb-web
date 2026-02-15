import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
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
}
