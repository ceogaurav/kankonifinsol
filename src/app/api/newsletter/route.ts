import { db } from "@/lib/db";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    if (!rateLimit(`newsletter:${ip}`, 10, 60_000)) {
      return Response.json(
        { success: false, error: "Too many requests. Please try again shortly." },
        { status: 429 }
      );
    }

    let body: { email?: unknown };
    try {
      body = (await req.json()) as { email?: unknown };
    } catch {
      return Response.json({ success: false, error: "Invalid JSON body." }, { status: 400 });
    }

    const email =
      typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Persist as a lead with service "Newsletter" for simplicity (single DB).
    // Use upsert-like behaviour: if email exists as newsletter lead, return success.
    const existing = await db.lead.findFirst({
      where: { email, service: "Newsletter" },
      select: { id: true },
    });

    if (existing) {
      return Response.json({ success: true, id: existing.id, alreadySubscribed: true });
    }

    const lead = await db.lead.create({
      data: {
        name: "Newsletter Subscriber",
        email,
        phone: "0000000000",
        service: "Newsletter",
        source: "newsletter",
        message: "Subscribed to financial insights newsletter",
      },
    });

    return Response.json({ success: true, id: lead.id }, { status: 201 });
  } catch (err) {
    console.error("[api/newsletter POST] error:", err);
    return Response.json(
      { success: false, error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
