import { db } from "@/lib/db";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

const ADMIN_KEY = process.env.ADMIN_KEY || "kankoni-admin";

interface LeadPayload {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  city?: unknown;
  service?: unknown;
  loanAmount?: unknown;
  employment?: unknown;
  income?: unknown;
  creditScore?: unknown;
  message?: unknown;
  source?: unknown;
}

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    if (!rateLimit(`leads:${ip}`, 20, 60_000)) {
      return Response.json(
        { success: false, error: "Too many requests. Please try again shortly." },
        { status: 429 }
      );
    }

    let body: LeadPayload;
    try {
      body = (await req.json()) as LeadPayload;
    } catch {
      return Response.json(
        { success: false, error: "Invalid JSON body." },
        { status: 400 }
      );
    }

    const name = isNonEmptyString(body.name) ? body.name.trim() : "";
    const phone = isNonEmptyString(body.phone) ? body.phone.trim() : "";
    const service = isNonEmptyString(body.service) ? body.service.trim() : "";

    if (!name || !phone || !service) {
      return Response.json(
        { success: false, error: "name, phone and service are required." },
        { status: 400 }
      );
    }

    if (phone.replace(/\D/g, "").length < 10) {
      return Response.json(
        { success: false, error: "Please enter a valid 10-digit phone number." },
        { status: 400 }
      );
    }

    const email = isNonEmptyString(body.email) ? body.email.trim() : null;
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const rawSource = isNonEmptyString(body.source) ? body.source.trim() : "website";
    // Allowlist source values to prevent arbitrary strings.
    const allowedSources = ["website", "quick-apply-modal", "exit-intent", "contact-form", "ai-assistant", "callback"];
    const source = allowedSources.includes(rawSource) ? rawSource : "website";

    const lead = await db.lead.create({
      data: {
        name,
        phone,
        email,
        city: isNonEmptyString(body.city) ? body.city.trim() : null,
        service,
        loanAmount: isNonEmptyString(body.loanAmount) ? body.loanAmount.trim() : null,
        employment: isNonEmptyString(body.employment) ? body.employment.trim() : null,
        income: isNonEmptyString(body.income) ? body.income.trim() : null,
        creditScore: isNonEmptyString(body.creditScore) ? body.creditScore.trim() : null,
        message: isNonEmptyString(body.message) ? body.message.trim() : null,
        source,
      },
    });

    return Response.json({ success: true, id: lead.id }, { status: 201 });
  } catch (err) {
    console.error("[api/leads POST] error:", err);
    return Response.json(
      { success: false, error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const key = url.searchParams.get("key");
    if (key !== ADMIN_KEY) {
      return Response.json(
        { success: false, error: "Unauthorized." },
        { status: 401 }
      );
    }

    const leads = await db.lead.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
    });

    return Response.json({ success: true, count: leads.length, leads });
  } catch (err) {
    console.error("[api/leads GET] error:", err);
    return Response.json(
      { success: false, error: "Something went wrong." },
      { status: 500 }
    );
  }
}
