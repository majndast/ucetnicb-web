import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validations/contact";
import { buildContactEmailHtml } from "@/lib/email/contact-notification";
import { rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    // Rate limiting by IP - 5 submissions per hour
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";
    const { success: allowed } = rateLimit(`contact:${ip}`, {
      limit: 5,
      windowMs: 60 * 60 * 1000,
    });
    if (!allowed) {
      return NextResponse.json(
        { error: "Příliš mnoho požadavků. Zkuste to za chvíli." },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Honeypot - if filled, it's a bot
    if (body.website) {
      return NextResponse.json({ success: true }, { status: 201 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Neplatná data", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = result.data;

    // Save to database
    await prisma.contact.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        message: data.message,
      },
    });

    // Send email notification
    const fromEmail = process.env.EMAIL_FROM || "onboarding@resend.dev";
    const { error: sendError } = await resend.emails.send({
      from: `Účetnictví Kotmanová <${fromEmail}>`,
      to: process.env.CONTACT_EMAIL || "info@ucetnicb.cz",
      replyTo: data.email,
      subject: `Nová poptávka od ${data.name}`,
      html: buildContactEmailHtml(data),
    });

    if (sendError) {
      console.error("Resend error:", sendError);
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Něco se pokazilo. Zkuste to prosím znovu." },
      { status: 500 }
    );
  }
}
