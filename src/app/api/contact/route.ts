import { db } from "@/lib/db";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { sendFormNotification } from "@/lib/email";

export const dynamic = "force-dynamic";

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  subject?: unknown;
  message?: unknown;
}

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    if (!rateLimit(`contact:${ip}`, 20, 60_000)) {
      return Response.json(
        { success: false, error: "Too many requests. Please try again shortly." },
        { status: 429 }
      );
    }

    let body: ContactPayload;
    try {
      body = (await req.json()) as ContactPayload;
    } catch {
      return Response.json(
        { success: false, error: "Invalid JSON body." },
        { status: 400 }
      );
    }

    const name = isNonEmptyString(body.name) ? body.name.trim() : "";
    const email = isNonEmptyString(body.email) ? body.email.trim() : "";
    const message = isNonEmptyString(body.message) ? body.message.trim() : "";

    if (!name || !email || !message) {
      return Response.json(
        { success: false, error: "name, email and message are required." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (message.length > 5000) {
      return Response.json(
        { success: false, error: "Message is too long (max 5000 characters)." },
        { status: 400 }
      );
    }

    const phone = isNonEmptyString(body.phone) ? body.phone.trim() : null;
    if (phone && phone.replace(/\D/g, "").length < 10) {
      return Response.json(
        { success: false, error: "Please enter a valid 10-digit phone number." },
        { status: 400 }
      );
    }

    const record = await db.contactMessage.create({
      data: {
        name,
        email,
        phone,
        subject: isNonEmptyString(body.subject) ? body.subject.trim() : null,
        message,
      },
    });

    // Send email notification
    await sendFormNotification({
      subject: `New Contact Message: ${record.subject || "General Inquiry"}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Subject:</strong> ${record.subject || "N/A"}</p>
        <p><strong>Message:</strong></p>
        <blockquote style="border-left: 4px solid #ccc; padding-left: 10px;">${message}</blockquote>
      `,
    });

    return Response.json({ success: true, id: record.id }, { status: 201 });
  } catch (err) {
    console.error("[api/contact POST] error:", err);
    return Response.json(
      { success: false, error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
