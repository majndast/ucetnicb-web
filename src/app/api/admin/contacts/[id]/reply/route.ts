import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const { message } = await request.json();

    if (!message || typeof message !== "string" || message.trim().length < 1) {
      return NextResponse.json({ error: "Zpráva je povinná" }, { status: 400 });
    }

    const contact = await prisma.contact.findUnique({ where: { id } });
    if (!contact) {
      return NextResponse.json({ error: "Kontakt nenalezen" }, { status: 404 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const fromEmail = process.env.EMAIL_FROM || "onboarding@resend.dev";
    const { data, error: sendError } = await resend.emails.send({
      from: `Účetnictví Kotmanová <${fromEmail}>`,
      to: contact.email,
      replyTo: process.env.CONTACT_EMAIL || "info@ucetnicb.cz",
      subject: `Re: Vaše poptávka - Účetnictví Kotmanová`,
      html: buildReplyHtml(contact.name, contact.message, message.trim()),
    });

    if (sendError) {
      console.error("Resend error:", sendError);
      return NextResponse.json(
        { error: `Email se nepodařilo odeslat: ${sendError.message}` },
        { status: 422 }
      );
    }
    console.log("Reply sent successfully, id:", data?.id, "to:", contact.email);

    // Mark as read after replying
    await prisma.contact.update({
      where: { id },
      data: { read: true },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Reply error:", error);
    return NextResponse.json(
      { error: "Nepodařilo se odeslat odpověď" },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildReplyHtml(
  clientName: string,
  originalMessage: string,
  reply: string
): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:system-ui,-apple-system,sans-serif;">
  <div style="max-width:560px;margin:40px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
    <div style="background:#1a365d;padding:24px 32px;">
      <h1 style="margin:0;color:#ffffff;font-size:18px;font-weight:600;">Účetnictví Kotmanová</h1>
    </div>
    <div style="padding:32px;">
      <p style="margin:0 0 8px;color:#64748b;font-size:13px;">Dobrý den, ${escapeHtml(clientName)},</p>
      <p style="margin:0;color:#1e293b;font-size:14px;line-height:1.7;white-space:pre-wrap;">${escapeHtml(reply)}</p>

      <div style="margin-top:28px;padding-top:20px;border-top:1px solid #e2e8f0;">
        <p style="margin:0 0 8px;color:#94a3b8;font-size:12px;">Vaše původní zpráva:</p>
        <p style="margin:0;color:#94a3b8;font-size:13px;line-height:1.5;font-style:italic;white-space:pre-wrap;">${escapeHtml(originalMessage)}</p>
      </div>
    </div>
    <div style="padding:16px 32px;background:#f8fafc;border-top:1px solid #e2e8f0;">
      <p style="margin:0;color:#94a3b8;font-size:12px;">
        Šárka Kotmanová | +420 724 159 681 | info@ucetnicb.cz
      </p>
    </div>
  </div>
</body>
</html>`;
}
