"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Building2, Users, Briefcase, FileText, MessageSquare,
  ArrowLeft, ChevronRight, MapPin, Clock, Sparkles,
  ExternalLink, BookOpen, Plus, Tag, AlertTriangle,
} from "lucide-react";
import {
  SEED_CLIENTS, SEED_TEAMS, SEED_ROLES, SEED_CANDIDATES,
  SEED_CANDIDATE_ROLE_MATCHES, SEED_MEETING_NOTES, SEED_DOCUMENTS,
} from "@/data/seed";
import { STATUS_CONFIG, FIT_TIER_CONFIG, formatDate, formatRelativeDate, cn } from "@/lib/utils";

type Tab = "overview" | "teams" | "roles" | "knowledge" | "notes" | "candidates";

const TABS: { key: Tab; label: string; icon: React.ElementType }[] = [
  { key: "overview", label: "Overview", icon: Building2 },
  { key: "teams", label: "Teams", icon: Users },
  { key: "roles", label: "Roles", icon: Briefcase },
  { key: "knowledge", label: "Knowledge Base", icon: BookOpen },
  { key: "notes", label: "Meeting Notes", icon: MessageSquare },
  { key: "candidates", label: "Candidates", icon: Users },
];

export default function ClientWorkspacePage() {
  const params = useParams();
  const clientId = params.id as string;
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const client = SEED_CLIENTS.find((c) => c.id === clientId);
  if (!client) return <div className="p-8 text-muted-foreground">Client not found</div>;

  const teams = SEED_TEAMS.filter((t) => t.clientId === clientId);
  const roles = SEED_ROLES.filter((r) => r.clientId === clientId);
  const openRoles = roles.filter((r) => r.status === "open");
  const notes = SEED_MEETING_NOTES.filter((n) => n.clientId === clientId);
  const documents = SEED_DOCUMENTS.filter((d) => d.clientId === clientId);
  const candidateMatches = SEED_CANDIDATE_ROLE_MATCHES.filter((m) =>
    roles.some((r) => r.id === m.roleId)
  );
  const candidateIds = [...new Set(candidateMatches.map((m) => m.candidateId))];
  const candidates = SEED_CANDIDATES.filter((c) => candidateIds.includes(c.id));

  return (
    <div className="flex flex-col h-full animate-fade-in">
      {/* Header */}
      <div className="px-8 pt-8 pb-0 border-b border-border">
        <Link
          href="/clients"
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-4 w-fit transition-colors"
        >
          <ArrowLeft className="w-3 h-3" /> All clients
        </Link>

        <div className="flex items-start justify-between pb-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
              <Building2 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-foreground">{client.name}</h1>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 font-medium">
                  Active
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">{client.industry}</p>
              <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                <span>{client.stage}</span>
                <span className="text-border">·</span>
                <span>{client.headcount} employees</span>
                {client.website && (
                  <>
                    <span className="text-border">·</span>
                    <a
                      href={client.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 hover:text-primary transition-colors"
                    >
                      {client.website.replace("https://", "")}
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/analysis"
              className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" /> Run Analysis
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-0">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-all",
                activeTab === tab.key
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
              )}
            >
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
              {tab.key === "roles" && openRoles.length > 0 && (
                <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded-full bg-primary/20 text-primary font-bold">
                  {openRoles.length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        {activeTab === "overview" && (
          <OverviewTab client={client} teams={teams} roles={openRoles} candidates={candidates} />
        )}
        {activeTab === "teams" && <TeamsTab teams={teams} />}
        {activeTab === "roles" && <RolesTab roles={roles} teams={teams} />}
        {activeTab === "knowledge" && <KnowledgeTab documents={documents} client={client} />}
        {activeTab === "notes" && <NotesTab notes={notes} />}
        {activeTab === "candidates" && (
          <CandidatesTab candidates={candidates} matches={candidateMatches} roles={roles} />
        )}
      </div>
    </div>
  );
}

function OverviewTab({ client, teams, roles, candidates }: any) {
  return (
    <div className="max-w-3xl space-y-6">
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="text-sm font-semibold text-foreground mb-3">About</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{client.description}</p>
        {client.notes && (
          <div className="mt-4 p-3 rounded-lg bg-amber-400/5 border border-amber-400/20">
            <p className="text-xs text-amber-400 font-medium mb-1">Recruiter Notes</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{client.notes}</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="text-2xl font-bold text-blue-400">{teams.length}</div>
          <div className="text-xs text-muted-foreground mt-0.5">Teams</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="text-2xl font-bold text-violet-400">{roles.length}</div>
          <div className="text-xs text-muted-foreground mt-0.5">Open Roles</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="text-2xl font-bold text-emerald-400">{candidates.length}</div>
          <div className="text-xs text-muted-foreground mt-0.5">Candidates</div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="text-sm font-semibold text-foreground mb-3">Tech Stack</h3>
        <div className="flex flex-wrap gap-2">
          {client.techStack.map((tech: string) => (
            <span
              key={tech}
              className="text-xs px-2.5 py-1 rounded-md bg-secondary border border-border text-secondary-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function TeamsTab({ teams }: any) {
  return (
    <div className="max-w-3xl space-y-4">
      {teams.map((team: any) => (
        <div key={team.id} className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-sm font-semibold text-foreground">{team.name}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{team.focus}</p>
            </div>
            <span className="text-xs text-muted-foreground">{team.headcount} members</span>
          </div>
          <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{team.description}</p>
          <div className="mt-4 p-3 rounded-lg bg-blue-400/5 border border-blue-400/20">
            <p className="text-xs text-blue-400 font-medium mb-1">Hiring Goals</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{team.hiringGoals}</p>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {team.techStack.map((tech: string) => (
              <span key={tech} className="text-xs px-2 py-0.5 rounded bg-secondary border border-border text-secondary-foreground">
                {tech}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function RolesTab({ roles, teams }: any) {
  const statusColors: Record<string, string> = {
    open: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    paused: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    filled: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    cancelled: "text-zinc-500 bg-zinc-500/10 border-zinc-500/20",
  };

  return (
    <div className="max-w-3xl space-y-4">
      {roles.map((role: any) => {
        const team = teams.find((t: any) => t.id === role.teamId);
        return (
          <Link
            key={role.id}
            href={`/roles/${role.id}`}
            className="block bg-card border border-border rounded-xl p-5 hover:border-primary/40 transition-all group"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    {role.title}
                  </h3>
                  <span className={cn("text-[10px] px-2 py-0.5 rounded-full border font-medium", statusColors[role.status])}>
                    {role.status.charAt(0).toUpperCase() + role.status.slice(1)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {team?.name} · {role.level}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {role.salaryRange && (
                  <span className="text-xs text-muted-foreground">{role.salaryRange}</span>
                )}
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{role.description}</p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {role.requiredSkills.slice(0, 5).map((skill: string) => (
                <span key={skill} className="text-xs px-2 py-0.5 rounded bg-secondary border border-border text-secondary-foreground">
                  {skill}
                </span>
              ))}
              {role.requiredSkills.length > 5 && (
                <span className="text-xs px-2 py-0.5 rounded bg-secondary border border-border text-muted-foreground">
                  +{role.requiredSkills.length - 5}
                </span>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}

function KnowledgeTab({ documents, client }: any) {
  const typeLabels: Record<string, { label: string; color: string }> = {
    jd: { label: "Job Description", color: "text-violet-400 bg-violet-400/10 border-violet-400/20" },
    pitch_book: { label: "Pitch Deck", color: "text-blue-400 bg-blue-400/10 border-blue-400/20" },
    org_chart: { label: "Org Chart", color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" },
    interview_guide: { label: "Interview Guide", color: "text-amber-400 bg-amber-400/10 border-amber-400/20" },
    other: { label: "Other", color: "text-zinc-400 bg-zinc-400/10 border-zinc-400/20" },
  };

  return (
    <div className="max-w-3xl space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{documents.length} documents</p>
        <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
          <Plus className="w-3.5 h-3.5" /> Upload document
        </button>
      </div>
      {documents.map((doc: any) => {
        const typeConfig = typeLabels[doc.type] || typeLabels.other;
        return (
          <div key={doc.id} className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-secondary border border-border flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground">{doc.name}</h3>
                  {doc.description && (
                    <p className="text-xs text-muted-foreground mt-0.5">{doc.description}</p>
                  )}
                  <p className="text-[10px] text-muted-foreground mt-1">{formatDate(doc.createdAt)}</p>
                </div>
              </div>
              <span className={cn("text-[10px] px-2 py-0.5 rounded-full border font-medium", typeConfig.color)}>
                {typeConfig.label}
              </span>
            </div>
          </div>
        );
      })}

      {/* Placeholder integrations */}
      <div className="mt-6 p-4 rounded-xl border border-dashed border-border/60">
        <p className="text-xs font-medium text-muted-foreground mb-2">Connect integrations</p>
        <div className="flex gap-2">
          {["Fathom", "Granola", "Google Drive", "Notion"].map((tool) => (
            <span key={tool} className="text-xs px-2.5 py-1 rounded-md bg-secondary/50 border border-border/60 text-muted-foreground opacity-60">
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function NotesTab({ notes }: any) {
  const sourceLabels: Record<string, string> = {
    fathom: "Fathom",
    granola: "Granola",
    manual: "Manual",
    other: "Other",
  };

  return (
    <div className="max-w-3xl space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{notes.length} meeting notes</p>
        <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
          <Plus className="w-3.5 h-3.5" /> Add note
        </button>
      </div>
      {notes.map((note: any) => (
        <div key={note.id} className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-sm font-semibold text-foreground">{note.title}</h3>
              <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>{formatDate(note.date)}</span>
                <span className="text-border">·</span>
                <span>{note.attendees.join(", ")}</span>
              </div>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full bg-secondary border border-border text-muted-foreground">
              {sourceLabels[note.source] || note.source}
            </span>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">{note.summary}</p>

          {note.keyInsights.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-medium text-foreground mb-2">Key Insights</p>
              <ul className="space-y-1.5">
                {note.keyInsights.map((insight: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <span className="text-violet-400 mt-0.5">•</span>
                    {insight}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {note.actionItems.length > 0 && (
            <div className="mt-4 p-3 rounded-lg bg-amber-400/5 border border-amber-400/20">
              <p className="text-xs font-medium text-amber-400 mb-2">Action Items</p>
              <ul className="space-y-1.5">
                {note.actionItems.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <span className="text-amber-400/60 mt-0.5">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function CandidatesTab({ candidates, matches, roles }: any) {
  return (
    <div className="max-w-3xl space-y-3">
      {candidates.map((candidate: any) => {
        const candidateMatches = matches.filter((m: any) => m.candidateId === candidate.id);
        const statusCfg = STATUS_CONFIG[candidate.status as keyof typeof STATUS_CONFIG];

        return (
          <Link
            key={candidate.id}
            href={`/candidates/${candidate.id}`}
            className="flex items-center justify-between p-4 bg-card border border-border rounded-xl hover:border-primary/40 transition-all group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-primary">
                  {candidate.name.split(" ").map((n: string) => n[0]).join("")}
                </span>
              </div>
              <div className="min-w-0">
                <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {candidate.name}
                </div>
                <div className="text-xs text-muted-foreground truncate">
                  {candidate.currentTitle} · {candidate.currentCompany}
                </div>
                <div className="flex gap-1.5 mt-1">
                  {candidateMatches.map((m: any) => {
                    const role = roles.find((r: any) => r.id === m.roleId);
                    const tierCfg = m.fitTier ? FIT_TIER_CONFIG[m.fitTier as keyof typeof FIT_TIER_CONFIG] : null;
                    return role ? (
                      <span key={m.id} className={cn("text-[10px] px-1.5 py-0.5 rounded border font-medium", tierCfg?.bgColor, tierCfg?.color)}>
                        {m.fitScore} · {role.title.split(" ").slice(0, 2).join(" ")}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
            <span className={cn("text-xs px-2 py-0.5 rounded-full border font-medium flex-shrink-0 ml-2", statusCfg.bgColor, statusCfg.color)}>
              {statusCfg.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
