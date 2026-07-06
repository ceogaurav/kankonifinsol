"use client";

import * as React from "react";
import {
  DndContext, DragOverlay, PointerSensor, useSensor, useSensors,
  closestCorners, type DragEndEvent, type DragStartEvent,
  useDroppable,
} from "@dnd-kit/core";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MapPin, GripVertical, Loader2, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  city: string | null;
  service: string;
  loanAmount: string | null;
  source: string;
  status: string;
  promoCode: string | null;
  assignedTo: string | null;
  createdAt: string;
}

const COLUMNS = [
  { id: "new", label: "New", accent: "border-t-blue-500", dot: "bg-blue-500" },
  { id: "contacted", label: "Contacted", accent: "border-t-amber-500", dot: "bg-amber-500" },
  { id: "qualified", label: "Qualified", accent: "border-t-purple-500", dot: "bg-purple-500" },
  { id: "disbursed", label: "Disbursed", accent: "border-t-green-500", dot: "bg-green-500" },
  { id: "rejected", label: "Rejected", accent: "border-t-red-500", dot: "bg-red-500" },
] as const;

interface KanbanBoardProps {
  leads: Lead[];
  adminKey: string;
  onUpdateStatus: (leadId: string, newStatus: string) => Promise<void>;
  onOpenDrawer?: (lead: Lead) => void;
}

function LeadCard({ lead, onOpen }: { lead: Lead; onOpen?: (lead: Lead) => void }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: lead.id,
  });
  const style = {
    transform: transform ? CSS.Translate.toString(transform) : undefined,
    opacity: isDragging ? 0.4 : 1,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="group relative cursor-grab touch-none rounded-xl border border-border/60 bg-card p-3 shadow-sm transition-all hover:shadow-premium active:cursor-grabbing"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-royal/10 text-[10px] font-bold text-royal">
            {lead.name.slice(0, 2).toUpperCase()}
          </span>
          <p className="truncate text-xs font-semibold">{lead.name}</p>
        </div>
        <div className="flex items-center gap-1">
          {onOpen && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onOpen(lead); }}
              aria-label="View details"
              className="grid h-6 w-6 place-items-center rounded-md text-muted-foreground/50 opacity-0 transition-opacity hover:bg-muted hover:text-royal group-hover:opacity-100"
            >
              <Info className="h-3.5 w-3.5" />
            </button>
          )}
          <GripVertical className="h-3.5 w-3.5 shrink-0 text-muted-foreground/40 opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
      </div>
      <p className="mt-1.5 text-[11px] font-medium text-gold">{lead.service}</p>
      <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] text-muted-foreground">
        <span className="inline-flex items-center gap-0.5"><Phone className="h-2.5 w-2.5" />{lead.phone}</span>
        {lead.city && <span className="inline-flex items-center gap-0.5"><MapPin className="h-2.5 w-2.5" />{lead.city}</span>}
      </div>
      {lead.loanAmount && <p className="mt-0.5 text-[10px] text-muted-foreground">{lead.loanAmount}</p>}
      {lead.promoCode && (
        <span className="mt-1.5 inline-block rounded-full bg-gold/15 px-1.5 py-0.5 text-[9px] font-bold text-gold">{lead.promoCode}</span>
      )}
    </div>
  );
}

function Column({
  column,
  leads,
  isOver,
  onOpen,
}: {
  column: { id: string; label: string; accent: string; dot: string };
  leads: Lead[];
  isOver: boolean;
  onOpen?: (lead: Lead) => void;
}) {
  const { setNodeRef } = useDroppable({ id: column.id });
  return (
    <div className="flex min-w-[15rem] flex-1 flex-col">
      <div className={cn("mb-2 flex items-center justify-between rounded-t-xl border-t-2 bg-card/60 px-3 py-2 backdrop-blur", column.accent)}>
        <div className="flex items-center gap-2">
          <span className={cn("h-2 w-2 rounded-full", column.dot)} />
          <span className="text-xs font-semibold">{column.label}</span>
        </div>
        <span className="grid h-5 min-w-5 place-items-center rounded-full bg-muted px-1 text-[10px] font-bold text-muted-foreground">
          {leads.length}
        </span>
      </div>
      <div
        ref={setNodeRef}
        className={cn(
          "flex flex-1 flex-col gap-2 rounded-b-xl border border-border/40 bg-background/30 p-2 transition-colors min-h-[8rem]",
          isOver && "bg-royal/5 border-royal/30"
        )}
      >
        <AnimatePresence>
          {leads.map((lead) => (
            <motion.div
              key={lead.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <LeadCard lead={lead} onOpen={onOpen} />
            </motion.div>
          ))}
        </AnimatePresence>
        {leads.length === 0 && (
          <div className="grid flex-1 place-items-center py-6 text-center">
            <p className="text-[10px] text-muted-foreground/50">Drop leads here</p>
          </div>
        )}
      </div>
    </div>
  );
}

export function KanbanBoard({ leads, adminKey: _adminKey, onUpdateStatus, onOpenDrawer }: KanbanBoardProps) {
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [overCol, setOverCol] = React.useState<string | null>(null);
  const [updating, setUpdating] = React.useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  );

  const activeLead = activeId ? leads.find((l) => l.id === activeId) : null;

  function onDragStart(e: DragStartEvent) {
    setActiveId(String(e.active.id));
  }

  async function onDragEnd(e: DragEndEvent) {
    setActiveId(null);
    const overId = e.over?.id ? String(e.over.id) : null;
    setOverCol(null);
    if (!overId) return;
    const leadId = String(e.active.id);
    const lead = leads.find((l) => l.id === leadId);
    if (!lead) return;
    // If dropped on a column id (not a card), move there
    const colIds = COLUMNS.map((c) => c.id);
    let newStatus = overId;
    if (!colIds.includes(overId as never)) {
      // Dropped on a card — use that card's column
      const overLead = leads.find((l) => l.id === overId);
      if (!overLead) return;
      newStatus = overLead.status;
    }
    if (newStatus === lead.status) return;
    setUpdating(true);
    await onUpdateStatus(leadId, newStatus);
    setUpdating(false);
  }

  // Track which column is being hovered
  function onDragOver(e: { over?: { id: string | number } | null }) {
    const overId = e.over?.id ? String(e.over.id) : null;
    if (!overId) { setOverCol(null); return; }
    const colIds = COLUMNS.map((c) => c.id);
    let col = overId;
    if (!colIds.includes(overId as never)) {
      const overLead = leads.find((l) => l.id === overId);
      col = overLead?.status || overId;
    }
    setOverCol(col);
  }

  return (
    <div className="relative">
      {updating && (
        <div className="absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-royal/10 px-3 py-1 text-[11px] font-medium text-royal">
          <Loader2 className="h-3 w-3 animate-spin" /> Updating…
        </div>
      )}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
      >
        <div className="flex gap-3 overflow-x-auto premium-scrollbar pb-2">
          {COLUMNS.map((col) => (
            <Column
              key={col.id}
              column={col}
              leads={leads.filter((l) => l.status === col.id)}
              isOver={overCol === col.id}
              onOpen={onOpenDrawer}
            />
          ))}
        </div>
        <DragOverlay>
          {activeLead ? (
            <div className="rotate-3 opacity-90">
              <LeadCard lead={activeLead} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
