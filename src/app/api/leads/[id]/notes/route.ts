import { db } from "@/lib/db";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

const ADMIN_KEY = process.env.ADMIN_KEY || "kankoni-admin";

interface NotePayload {
  author?: unknown;
  type?: unknown;
  content?: unknown;
}

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

/** GET /api/leads/[id]/notes?key=ADMIN_KEY — list notes for a lead */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const url = new URL(req.url);
    const key = url.searchParams.get("key");
    if (key !== ADMIN_KEY) {
      return Response.json({ success: false, error: "Unauthorized." }, { status: 401 });
    }

    const notes = await db.leadNote.findMany({
      where: { leadId: id },
      orderBy: { createdAt: "desc" },
      take: 100,
    });

    return Response.json({ success: true, count: notes.length, notes });
  } catch (err) {
    console.error("[api/leads/[id]/notes GET] error:", err);
    return Response.json({ success: false, error: "Something went wrong." }, { status: 500 });
  }
}

/** POST /api/leads/[id]/notes?key=ADMIN_KEY — add a note to a lead */
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const url = new URL(req.url);
    const key = url.searchParams.get("key");
    if (key !== ADMIN_KEY) {
      return Response.json({ success: false, error: "Unauthorized." }, { status: 401 });
    }

    const ip = getClientIp(req);
    if (!rateLimit(`notes:${ip}`, 30, 60_000)) {
      return Response.json(
        { success: false, error: "Too many requests. Please try again shortly." },
        { status: 429 }
      );
    }

    let body: NotePayload;
    try {
      body = (await req.json()) as NotePayload;
    } catch {
      return Response.json({ success: false, error: "Invalid JSON body." }, { status: 400 });
    }

    const content = isNonEmptyString(body.content) ? body.content.trim().slice(0, 1000) : "";
    if (!content) {
      return Response.json({ success: false, error: "content is required." }, { status: 400 });
    }

    const allowedTypes = ["note", "status_change", "assignment"];
    const type = isNonEmptyString(body.type) && allowedTypes.includes(body.type.trim())
      ? body.type.trim()
      : "note";
    const author = isNonEmptyString(body.author) ? body.author.trim().slice(0, 60) : "Admin";

    // Verify lead exists
    const lead = await db.lead.findUnique({ where: { id }, select: { id: true } });
    if (!lead) {
      return Response.json({ success: false, error: "Lead not found." }, { status: 404 });
    }

    const note = await db.leadNote.create({
      data: { leadId: id, author, type, content },
    });

    return Response.json({ success: true, id: note.id, note }, { status: 201 });
  } catch (err) {
    console.error("[api/leads/[id]/notes POST] error:", err);
    return Response.json({ success: false, error: "Something went wrong." }, { status: 500 });
  }
}
