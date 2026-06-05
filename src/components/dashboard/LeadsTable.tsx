"use client";

import { useState, useMemo } from "react";
import { format, parseISO } from "date-fns";
import { Eye, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { SERVICE_OPTIONS } from "@/lib/constants/services";
import { getBudgetScore, getLeadScoreLabel } from "@/lib/lead-score";
import { deleteLead } from "@/actions/leads";
import type { Contact } from "@/types/contact";

interface LeadsTableProps {
  initialLeads: Contact[];
}

export function LeadsTable({ initialLeads }: LeadsTableProps) {
  const [leads, setLeads] = useState(initialLeads);
  const [search, setSearch] = useState("");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [selectedLead, setSelectedLead] = useState<Contact | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const filtered = useMemo(() => {
    const now = new Date();
    return leads.filter((lead) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        lead.name.toLowerCase().includes(q) ||
        lead.email.toLowerCase().includes(q) ||
        lead.message.toLowerCase().includes(q);

      const matchesService =
        serviceFilter === "all" || lead.service === serviceFilter;

      let matchesDate = true;
      const created = parseISO(lead.created_at);
      if (dateFilter === "7d") {
        matchesDate =
          created >= new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      } else if (dateFilter === "30d") {
        matchesDate =
          created >= new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      } else if (dateFilter === "90d") {
        matchesDate =
          created >= new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
      }

      return matchesSearch && matchesService && matchesDate;
    });
  }, [leads, search, serviceFilter, dateFilter]);

  async function handleDelete() {
    if (!deleteId) return;
    setIsDeleting(true);
    const result = await deleteLead(deleteId);
    if (result.success) {
      setLeads((prev) => prev.filter((l) => l.id !== deleteId));
      toast.success("Lead deleted");
    } else {
      toast.error(result.error);
    }
    setIsDeleting(false);
    setDeleteId(null);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search leads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select
          value={serviceFilter}
          onValueChange={(v) => v && setServiceFilter(v)}
        >
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filter by service" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Services</SelectItem>
            {SERVICE_OPTIONS.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={dateFilter}
          onValueChange={(v) => v && setDateFilter(v)}
        >
          <SelectTrigger className="w-full sm:w-[160px]">
            <SelectValue placeholder="Date range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-border bg-card py-16 text-center">
          <p className="text-muted-foreground">No leads found.</p>
          {(search || serviceFilter !== "all" || dateFilter !== "all") && (
            <Button
              variant="link"
              className="mt-2"
              onClick={() => {
                setSearch("");
                setServiceFilter("all");
                setDateFilter("all");
              }}
            >
              Clear filters
            </Button>
          )}
        </div>
      ) : (
        <div className="rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-[88px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((lead) => {
                const score = getBudgetScore(lead.budget);
                const scoreLabel = getLeadScoreLabel(score);
                return (
                <TableRow
                  key={lead.id}
                  className="cursor-pointer"
                  onClick={() => setSelectedLead(lead)}
                >
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>{lead.service}</TableCell>
                  <TableCell>{lead.budget}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        score >= 4
                          ? "default"
                          : score >= 3
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {score}/5 · {scoreLabel}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {format(parseISO(lead.created_at), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedLead(lead);
                        }}
                        aria-label={`View inquiry from ${lead.name}`}
                      >
                        <Eye className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteId(lead.id);
                        }}
                        aria-label={`Delete lead from ${lead.name}`}
                      >
                        <Trash2 className="size-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
              })}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog
        open={!!selectedLead}
        onOpenChange={(open) => !open && setSelectedLead(null)}
      >
        <DialogContent className="sm:max-w-lg">
          {selectedLead && (
            <>
              <DialogHeader>
                <DialogTitle>Inquiry from {selectedLead.name}</DialogTitle>
                <DialogDescription>
                  Submitted{" "}
                  {format(parseISO(selectedLead.created_at), "MMMM d, yyyy")}
                </DialogDescription>
              </DialogHeader>
              <dl className="grid gap-4 text-sm">
                <div className="grid gap-1 sm:grid-cols-[120px_1fr]">
                  <dt className="text-muted-foreground">Email</dt>
                  <dd>
                    <a
                      href={`mailto:${selectedLead.email}`}
                      className="text-foreground underline-offset-4 hover:underline"
                    >
                      {selectedLead.email}
                    </a>
                  </dd>
                </div>
                <div className="grid gap-1 sm:grid-cols-[120px_1fr]">
                  <dt className="text-muted-foreground">Service</dt>
                  <dd>{selectedLead.service}</dd>
                </div>
                <div className="grid gap-1 sm:grid-cols-[120px_1fr]">
                  <dt className="text-muted-foreground">Budget</dt>
                  <dd>{selectedLead.budget}</dd>
                </div>
                <div className="grid gap-1 sm:grid-cols-[120px_1fr]">
                  <dt className="text-muted-foreground">Score</dt>
                  <dd>
                    {getBudgetScore(selectedLead.budget)}/5 ·{" "}
                    {getLeadScoreLabel(getBudgetScore(selectedLead.budget))}
                  </dd>
                </div>
                <div className="grid gap-2">
                  <dt className="text-muted-foreground">Message</dt>
                  <dd className="rounded-lg border border-border bg-muted/30 p-3 whitespace-pre-wrap">
                    {selectedLead.message}
                  </dd>
                </div>
              </dl>
              <DialogFooter showCloseButton />
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Lead</DialogTitle>
            <DialogDescription>
              This action cannot be undone. The lead will be permanently removed.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
