import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validations/contact";
import { buildContactEmailHtml } from "@/lib/email/contact-notification";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
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
    await resend.emails.send({
      from: `Účetnictví Kotmanová <${fromEmail}>`,
      to: process.env.CONTACT_EMAIL || "info@ucetnicb.cz",
      replyTo: data.email,
      subject: `Nová poptávka od ${data.name}`,
      html: buildContactEmailHtml(data),
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Něco se pokazilo. Zkuste to prosím znovu." },
      { status: 500 }
    );
  }
}
