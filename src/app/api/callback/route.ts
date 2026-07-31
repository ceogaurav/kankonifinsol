import { db } from "@/lib/db";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { sendFormNotification } from "@/lib/email";

export const dynamic = "force-dynamic";

interface CallbackPayload {
  name?: unknown;
  phone?: unknown;
  preferredTime?: unknown;
  service?: unknown;
}

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    if (!rateLimit(`callback:${ip}`, 20, 60_000)) {
      return Response.json(
        { success: false, error: "Too many requests. Please try again shortly." },
        { status: 429 }
      );
    }

    let body: CallbackPayload;
    try {
      body = (await req.json()) as CallbackPayload;
    } catch {
      return Response.json(
        { success: false, error: "Invalid JSON body." },
        { status: 400 }
      );
    }

    const name = isNonEmptyString(body.name) ? body.name.trim() : "";
    const phone = isNonEmptyString(body.phone) ? body.phone.trim() : "";

    if (!name || !phone) {
      return Response.json(
        { success: false, error: "name and phone are required." },
        { status: 400 }
      );
    }

    if (phone.replace(/\D/g, "").length < 10) {
      return Response.json(
        { success: false, error: "Please enter a valid 10-digit phone number." },
        { status: 400 }
      );
    }

    const callback = await db.callback.create({
      data: {
        name,
        phone,
        preferredTime: isNonEmptyString(body.preferredTime)
          ? body.preferredTime.trim()
          : null,
        service: isNonEmptyString(body.service) ? body.service.trim() : null,
      },
    });

    // Send email notification
    await sendFormNotification({
      subject: `New Callback Request: ${name}`,
      html: `
        <h2>New Callback Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Preferred Time:</strong> ${callback.preferredTime || "N/A"}</p>
        <p><strong>Service:</strong> ${callback.service || "N/A"}</p>
      `,
    });

    return Response.json({ success: true, id: callback.id }, { status: 201 });
  } catch (err) {
    console.error("[api/callback POST] error:", err);
    return Response.json(
      { success: false, error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
