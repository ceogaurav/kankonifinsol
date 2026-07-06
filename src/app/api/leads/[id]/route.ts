import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

const ADMIN_KEY = process.env.ADMIN_KEY || "kankoni-admin";

const VALID_STATUSES = ["new", "contacted", "qualified", "disbursed", "rejected"];

interface UpdatePayload {
  status?: unknown;
  assignedTo?: unknown;
}

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

/** PATCH /api/leads/[id]?key=ADMIN_KEY — update lead status / assignment */
export async function PATCH(
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

    let body: UpdatePayload;
    try {
      body = (await req.json()) as UpdatePayload;
    } catch {
      return Response.json({ success: false, error: "Invalid JSON body." }, { status: 400 });
    }

    const data: { status?: string; assignedTo?: string | null } = {};
    if (isNonEmptyString(body.status)) {
      const status = body.status.trim();
      if (!VALID_STATUSES.includes(status)) {
        return Response.json(
          { success: false, error: `Invalid status. Allowed: ${VALID_STATUSES.join(", ")}` },
          { status: 400 }
        );
      }
      data.status = status;
    }
    if (body.assignedTo === null) {
      data.assignedTo = null;
    } else if (isNonEmptyString(body.assignedTo)) {
      data.assignedTo = body.assignedTo.trim();
    }

    if (Object.keys(data).length === 0) {
      return Response.json({ success: false, error: "No updatable fields provided." }, { status: 400 });
    }

    const lead = await db.lead.update({
      where: { id },
      data,
    });

    return Response.json({ success: true, lead });
  } catch (err) {
    console.error("[api/leads/[id] PATCH] error:", err);
    return Response.json({ success: false, error: "Something went wrong." }, { status: 500 });
  }
}
