import { db } from "@/lib/db";
import { testimonials } from "@/lib/site-data";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

interface ReviewPayload {
  name?: unknown;
  rating?: unknown;
  title?: unknown;
  message?: unknown;
  city?: unknown;
  service?: unknown;
}

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

async function ensureSeeded() {
  try {
    const count = await db.review.count();
    if (count === 0 && testimonials.length > 0) {
      await db.review.createMany({
        data: testimonials.map((t) => ({
          name: t.name,
          city: t.city,
          service: t.service,
          rating: t.rating,
          title: t.title,
          message: t.message,
          verified: true,
          approved: true,
        })),
      });
    }
  } catch (err) {
    console.error("[api/reviews seed] error:", err);
  }
}

export async function GET() {
  try {
    await ensureSeeded();
    const reviews = await db.review.findMany({
      where: { approved: true },
      orderBy: { createdAt: "desc" },
    });
    return Response.json({ success: true, count: reviews.length, reviews });
  } catch (err) {
    console.error("[api/reviews GET] error:", err);
    return Response.json(
      { success: false, error: "Something went wrong." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    if (!rateLimit(`reviews:${ip}`, 15, 60_000)) {
      return Response.json(
        { success: false, error: "Too many requests. Please try again shortly." },
        { status: 429 }
      );
    }

    let body: ReviewPayload;
    try {
      body = (await req.json()) as ReviewPayload;
    } catch {
      return Response.json(
        { success: false, error: "Invalid JSON body." },
        { status: 400 }
      );
    }

    const name = isNonEmptyString(body.name) ? body.name.trim() : "";
    const title = isNonEmptyString(body.title) ? body.title.trim() : "";
    const message = isNonEmptyString(body.message) ? body.message.trim() : "";
    const ratingRaw =
      typeof body.rating === "number"
        ? body.rating
        : typeof body.rating === "string"
          ? parseInt(body.rating, 10)
          : NaN;
    const rating = Number.isFinite(ratingRaw)
      ? Math.min(5, Math.max(1, Math.round(ratingRaw)))
      : 5;

    if (!name || !title || !message) {
      return Response.json(
        { success: false, error: "name, title and message are required." },
        { status: 400 }
      );
    }

    if (message.length > 2000) {
      return Response.json(
        { success: false, error: "Review is too long (max 2000 characters)." },
        { status: 400 }
      );
    }

    const review = await db.review.create({
      data: {
        name,
        title,
        message,
        rating,
        city: isNonEmptyString(body.city) ? body.city.trim() : null,
        service: isNonEmptyString(body.service) ? body.service.trim() : null,
        verified: false,
        approved: false,
      },
    });

    return Response.json(
      {
        success: true,
        id: review.id,
        message:
          "Thank you! Your review has been submitted and will appear once approved by our team.",
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("[api/reviews POST] error:", err);
    return Response.json(
      { success: false, error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
