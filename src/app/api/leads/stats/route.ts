import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

const ADMIN_KEY = process.env.ADMIN_KEY || "kankoni-admin";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const key = url.searchParams.get("key");
    if (key !== ADMIN_KEY) {
      return Response.json({ success: false, error: "Unauthorized." }, { status: 401 });
    }

    const [total, byStatus, bySource, byService, last7] = await Promise.all([
      db.lead.count(),
      db.lead.groupBy({ by: ["status"], _count: { _all: true } }),
      db.lead.groupBy({ by: ["source"], _count: { _all: true } }),
      db.lead.groupBy({ by: ["service"], _count: { _all: true } }),
      db.lead.findMany({
        where: { createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
        select: { createdAt: true, service: true, status: true, source: true },
        orderBy: { createdAt: "asc" },
      }),
    ]);

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
      last7Days: days,
    });
  } catch (err) {
    console.error("[api/leads/stats GET] error:", err);
    return Response.json({ success: false, error: "Something went wrong." }, { status: 500 });
  }
}
