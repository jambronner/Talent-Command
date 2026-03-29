"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft, Briefcase, Users, Sparkles, ChevronRight,
  MapPin, DollarSign, Clock, AlertTriangle, CheckCircle2,
} from "lucide-react";
import {
  SEED_ROLES, SEED_TEAMS, SEED_CLIENTS, SEED_CANDIDATE_ROLE_MATCHES, SEED_CANDIDATES,
} from "@/data/seed";
import { FIT_TIER_CONFIG, STATUS_CONFIG, formatDate, cn } from "@/lib/utils";

export default function RoleDetailPage() {
  const params = useParams();
  const roleId = params.id as string;

  const role = SEED_ROLES.find((r) => r.id === roleId);
  if (!role) return <div className="p-8 text-muted-foreground">Role not found</div>;

  const team = SEED_TEAMS.find((t) => t.id === role.teamId);
  const client = SEED_CLIENTS.find((c) => c.id === role.clientId);
  const matches = SEED_CANDIDATE_ROLE_MATCHES.filter((m) => m.roleId === roleId);
  const candidates = matches
    .map((m) => ({
      match: m,
      candidate: SEED_CANDIDATES.find((c) => c.id === m.candidateId),
    }))
    .filter((x) => x.candidate != null);

  const statusColors: Record<string, string> = {
    open: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    paused: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    filled: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    cancelled: "text-zinc-500 bg-zinc-500/10 border-zinc-500/20",
  };

  return (
    <div className="px-8 py-8 max-w-5xl space-y-6 animate-fade-in">
      <Link
        href={`/clients/${client?.id}`}
        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground w-fit transition-colors"
      >
        <ArrowLeft className="w-3 h-3" /> {client?.name}
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl font-bold text-foreground tracking-tight">{role.title}</h1>
            <span className={cn("text-xs px-2 py-0.5 rounded-full border font-medium", statusColors[role.status])}>
              {role.status.charAt(0).toUpperCase() + role.status.slice(1)}
            </span>
          </div>
          <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" /> {team?.name}
            </span>
            <span className="text-border">·</span>
            <span>{role.level}</span>
            {role.location && (
              <>
                <span className="text-border">·</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> {role.location}
                </span>
              </>
            )}
            {role.salaryRange && (
              <>
                <span className="text-border">·</span>
                <span className="flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5" /> {role.salaryRange}
                </span>
              </>
            )}
          </div>
          {role.targetStartDate && (
            <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" /> Target start: {formatDate(role.targetStartDate)}
            </div>
          )}
        </div>

        <Link
          href={`/analysis?role=${roleId}`}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5" /> Analyze Candidates
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Main column */}
        <div className="col-span-2 space-y-5">
          {/* Description */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h2 className="text-sm font-semibold text-foreground mb-3">Role Overview</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{role.description}</p>

            {(role.responsibilities ?? []).length > 0 && (
              <div className="mt-4">
                <h3 className="text-xs font-semibold text-foreground mb-2">Responsibilities</h3>
                <ul className="space-y-1.5">
                  {(role.responsibilities ?? []).map((r, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <span className="text-primary/60 mt-0.5 flex-shrink-0">→</span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Skills */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Required Skills
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {role.requiredSkills.map((skill) => (
                    <span key={skill} className="text-xs px-2 py-0.5 rounded bg-emerald-400/10 border border-emerald-400/20 text-emerald-400">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> Nice-to-Have
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {role.niceToHaveSkills.map((skill) => (
                    <span key={skill} className="text-xs px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/20 text-amber-400">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Hiring context */}
          {(role.hiringManagerNotes || (role.successMetrics ?? []).length > 0 || (role.dealBreakers ?? []).length > 0) && (
            <div className="bg-card border border-border rounded-xl p-5 space-y-4">
              {role.hiringManagerNotes && (
                <div>
                  <h3 className="text-xs font-semibold text-foreground mb-2">Hiring Manager Context</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{role.hiringManagerNotes}</p>
                </div>
              )}
              {(role.successMetrics ?? []).length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-foreground mb-2">Success Metrics (90-day)</h3>
                  <ul className="space-y-1.5">
                    {(role.successMetrics ?? []).map((m, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <span className="text-blue-400/60 mt-0.5 flex-shrink-0">✓</span>
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {(role.dealBreakers ?? []).length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-foreground mb-2">Deal Breakers</h3>
                  <ul className="space-y-1.5">
                    {(role.dealBreakers ?? []).map((d, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <span className="text-red-400/60 mt-0.5 flex-shrink-0">✗</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Team context */}
          {team && (
            <div className="bg-card border border-border rounded-xl p-4">
              <h3 className="text-xs font-semibold text-foreground mb-3">Team</h3>
              <div className="text-sm font-medium text-foreground">{team.name}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{team.focus}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{team.headcount} members</div>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{team.description}</p>
            </div>
          )}

          {/* Matched candidates */}
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold text-foreground">Candidates</h3>
              <span className="text-xs text-muted-foreground">{candidates.length}</span>
            </div>
            <div className="space-y-2">
              {candidates.length === 0 ? (
                <p className="text-xs text-muted-foreground">No candidates matched yet.</p>
              ) : (
                candidates.map(({ match, candidate }) => {
                  if (!candidate) return null;
                  const tierCfg = match.fitTier ? FIT_TIER_CONFIG[match.fitTier] : null;
                  const statusCfg = STATUS_CONFIG[candidate.status];
                  return (
                    <Link
                      key={candidate.id}
                      href={`/candidates/${candidate.id}`}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-muted/30 border border-border/40 hover:border-primary/30 transition-colors group"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-[10px] font-bold text-primary">
                            {candidate.name.split(" ").map((n: string) => n[0]).join("")}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-medium text-foreground group-hover:text-primary truncate">
                            {candidate.name}
                          </div>
                          {tierCfg && (
                            <div className={cn("text-[10px] font-bold", tierCfg.scoreColor)}>
                              {match.fitScore} · {tierCfg.label}
                            </div>
                          )}
                        </div>
                      </div>
                      <ChevronRight className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                    </Link>
                  );
                })
              )}
            </div>
            {candidates.length === 0 && (
              <Link
                href={`/analysis?role=${roleId}`}
                className="mt-3 flex items-center justify-center gap-1.5 text-xs text-primary hover:underline"
              >
                <Sparkles className="w-3.5 h-3.5" /> Match candidates
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
