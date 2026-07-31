import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

const ADMIN_KEY = process.env.ADMIN_KEY || "Dayanandam_Kankoni";

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

    // Fetch the current lead to know the "before" values for activity notes
    const before = await db.lead.findUnique({ where: { id }, select: { status: true, assignedTo: true } });

    const lead = await db.lead.update({
      where: { id },
      data,
    });

    // Auto-create activity notes for status/assignment changes
    const notesToCreate: { leadId: string; author: string; type: string; content: string }[] = [];
    if (data.status && before && before.status !== data.status) {
      notesToCreate.push({
        leadId: id,
        author: "System",
        type: "status_change",
        content: `Status changed from "${before.status}" to "${data.status}"`,
      });
    }
    if (data.assignedTo !== undefined && before) {
      const oldA = before.assignedTo || "Unassigned";
      const newA = data.assignedTo || "Unassigned";
      if (oldA !== newA) {
        notesToCreate.push({
          leadId: id,
          author: "System",
          type: "assignment",
          content: `Assignment changed from "${oldA}" to "${newA}"`,
        });
      }
    }
    if (notesToCreate.length > 0) {
      await db.leadNote.createMany({ data: notesToCreate });
    }

    return Response.json({ success: true, lead });
  } catch (err) {
    console.error("[api/leads/[id] PATCH] error:", err);
    return Response.json({ success: false, error: "Something went wrong." }, { status: 500 });
  }
}
