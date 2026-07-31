import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

const ADMIN_KEY = process.env.ADMIN_KEY || "Dayanandam_Kankoni";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const key = url.searchParams.get("key");
    if (key !== ADMIN_KEY) {
      return Response.json({ success: false, error: "Unauthorized." }, { status: 401 });
    }

    const [total, byStatus, bySource, byService, allForAgg, last7] = await Promise.all([
      db.lead.count(),
      db.lead.groupBy({ by: ["status"], _count: { _all: true } }),
      db.lead.groupBy({ by: ["source"], _count: { _all: true } }),
      db.lead.groupBy({ by: ["service"], _count: { _all: true } }),
      db.lead.findMany({
        select: { promoCode: true, assignedTo: true, status: true, service: true },
      }),
      db.lead.findMany({
        where: { createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
        select: { createdAt: true, service: true, status: true, source: true },
        orderBy: { createdAt: "asc" },
      }),
    ]);

    // Aggregate promo codes (filter in JS for nullable-field compatibility)
    const promoMap = new Map<string, { count: number; disbursed: number; services: Set<string> }>();
    for (const l of allForAgg) {
      if (!l.promoCode) continue;
      const code = l.promoCode;
      if (!promoMap.has(code)) promoMap.set(code, { count: 0, disbursed: 0, services: new Set() });
      const entry = promoMap.get(code)!;
      entry.count++;
      if (l.status === "disbursed") entry.disbursed++;
      entry.services.add(l.service);
    }
    const byPromoCode = Array.from(promoMap.entries())
      .map(([code, v]) => ({ code, count: v.count, disbursed: v.disbursed, services: v.services.size }))
      .sort((a, b) => b.count - a.count);

    // Aggregate assignees
    const assigneeMap = new Map<string, { count: number; disbursed: number; contacted: number }>();
    for (const l of allForAgg) {
      if (!l.assignedTo) continue;
      const name = l.assignedTo;
      if (!assigneeMap.has(name)) assigneeMap.set(name, { count: 0, disbursed: 0, contacted: 0 });
      const entry = assigneeMap.get(name)!;
      entry.count++;
      if (l.status === "disbursed") entry.disbursed++;
      if (l.status === "contacted" || l.status === "qualified") entry.contacted++;
    }
    const byAssigneeAgg = Array.from(assigneeMap.entries())
      .map(([name, v]) => ({ name, ...v }))
      .sort((a, b) => b.count - a.count);

    // bucket last 7 days
    const days: { date: string; count: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setHours(0, 0, 0, 0);
      d.setDate(d.getDate() - i);
      const next = new Date(d);
      next.setDate(next.getDate() + 1);
      const count = last7.filter(
        (l) => l.createdAt >= d && l.createdAt < next
      ).length;
      days.push({
        date: d.toLocaleDateString("en-IN", { weekday: "short" }),
        count,
      });
    }

    return Response.json({
      success: true,
      total,
      byStatus: byStatus.map((s) => ({ status: s.status, count: s._count._all })),
      bySource: bySource.map((s) => ({ source: s.source, count: s._count._all })),
      byService: byService
        .map((s) => ({ service: s.service, count: s._count._all }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 8),
      byPromoCode,
      byAssignee: byAssigneeAgg,
      last7Days: days,
    });
  } catch (err) {
    console.error("[api/leads/stats GET] error:", err);
    return Response.json({ success: false, error: "Something went wrong." }, { status: 500 });
  }
}
