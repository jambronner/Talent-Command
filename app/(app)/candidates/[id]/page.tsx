"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft, Briefcase, MapPin, Linkedin, Mail, Clock,
  ChevronRight, Sparkles, MessageSquare, FileText,
  CheckCircle2, AlertTriangle, HelpCircle, BookOpen, Copy, Send,
} from "lucide-react";
import {
  SEED_CANDIDATES, SEED_CANDIDATE_ROLE_MATCHES, SEED_ROLES,
  SEED_FIT_ANALYSES, SEED_OUTREACH_DRAFTS, SEED_TECHNICAL_BRIEF,
} from "@/data/seed";
import { STATUS_CONFIG, FIT_TIER_CONFIG, SOURCE_LABELS, formatDate, formatRelativeDate, cn } from "@/lib/utils";
import type { CandidateStatus } from "@/types";

type Tab = "profile" | "fit" | "outreach" | "history";

export default function CandidateDetailPage() {
  const params = useParams();
  const candidateId = params.id as string;
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  const candidate = SEED_CANDIDATES.find((c) => c.id === candidateId);
  if (!candidate) return <div className="p-8 text-muted-foreground">Candidate not found</div>;

  const matches = SEED_CANDIDATE_ROLE_MATCHES.filter((m) => m.candidateId === candidateId);
  const analyses = SEED_FIT_ANALYSES.filter((a) => a.candidateId === candidateId);
  const outreachDrafts = SEED_OUTREACH_DRAFTS.filter((o) => o.candidateId === candidateId);
  const technicalBrief = SEED_TECHNICAL_BRIEF.candidateId === candidateId ? SEED_TECHNICAL_BRIEF : null;

  const statusCfg = STATUS_CONFIG[candidate.status];

  const TABS = [
    { key: "profile" as Tab, label: "Profile", icon: FileText },
    { key: "fit" as Tab, label: `Fit Analysis${analyses.length > 0 ? ` (${analyses.length})` : ""}`, icon: Sparkles },
    { key: "outreach" as Tab, label: `Outreach${outreachDrafts.length > 0 ? ` (${outreachDrafts.length})` : ""}`, icon: MessageSquare },
    { key: "history" as Tab, label: "Status History", icon: Clock },
  ];

  return (
    <div className="flex flex-col h-full animate-fade-in">
      {/* Header */}
      <div className="px-8 pt-8 pb-0 border-b border-border">
        <Link
          href="/candidates"
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-4 w-fit transition-colors"
        >
          <ArrowLeft className="w-3 h-3" /> All candidates
        </Link>

        <div className="flex items-start justify-between pb-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
              <span className="text-xl font-bold text-primary">
                {candidate.name.split(" ").map((n) => n[0]).join("")}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-bold text-foreground">{candidate.name}</h1>
                <span className={cn("text-xs px-2 py-0.5 rounded-full border font-medium", statusCfg.bgColor, statusCfg.color)}>
                  {statusCfg.label}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-secondary border border-border text-secondary-foreground">
                  {SOURCE_LABELS[candidate.source]}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                <Briefcase className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{candidate.currentTitle} · {candidate.currentCompany}</span>
              </div>
              <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {candidate.location}
                </span>
                <span>{candidate.yearsOfExperience}y experience</span>
                {candidate.email && (
                  <a href={`mailto:${candidate.email}`} className="flex items-center gap-1 hover:text-primary transition-colors">
                    <Mail className="w-3 h-3" /> {candidate.email}
                  </a>
                )}
                {candidate.linkedinUrl && (
                  <a href={candidate.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors">
                    <Linkedin className="w-3 h-3" /> LinkedIn
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/analysis?candidate=${candidateId}`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" /> Analyze
            </Link>
          </div>
        </div>

        {/* Matched roles summary */}
        {matches.length > 0 && (
          <div className="flex gap-2 pb-3">
            {matches.map((m) => {
              const role = SEED_ROLES.find((r) => r.id === m.roleId);
              const tierCfg = m.fitTier ? FIT_TIER_CONFIG[m.fitTier] : null;
              return role && tierCfg ? (
                <Link
                  key={m.id}
                  href={`/roles/${role.id}`}
                  className={cn("flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg border font-medium transition-colors hover:opacity-80", tierCfg.bgColor, tierCfg.color)}
                >
                  <span className="font-bold">{m.fitScore}</span>
                  <span className="opacity-60">·</span>
                  <span>{role.title}</span>
                  <ChevronRight className="w-3 h-3" />
                </Link>
              ) : null;
            })}
          </div>
        )}

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
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        {activeTab === "profile" && <ProfileTab candidate={candidate} />}
        {activeTab === "fit" && <FitTab analyses={analyses} technicalBrief={technicalBrief} candidate={candidate} />}
        {activeTab === "outreach" && <OutreachTab drafts={outreachDrafts} />}
        {activeTab === "history" && <HistoryTab candidate={candidate} />}
      </div>
    </div>
  );
}

function ProfileTab({ candidate }: { candidate: any }) {
  return (
    <div className="max-w-3xl space-y-5">
      {/* Recruiter notes */}
      {candidate.recruiterNotes && (
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="text-sm font-semibold text-foreground mb-2">Recruiter Notes</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{candidate.recruiterNotes}</p>
        </div>
      )}

      {/* Skills */}
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="text-sm font-semibold text-foreground mb-3">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {candidate.skills.map((skill: string) => (
            <span key={skill} className="text-xs px-2.5 py-1 rounded-md bg-secondary border border-border text-secondary-foreground">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">Experience</h3>
        <div className="space-y-5">
          {candidate.experience.map((exp: any, i: number) => (
            <div key={i} className="relative pl-4 border-l-2 border-border">
              <div className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-primary/20 border-2 border-primary/40" />
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-sm font-semibold text-foreground">{exp.title}</div>
                  <div className="text-xs text-muted-foreground">{exp.company}</div>
                </div>
                <div className="text-xs text-muted-foreground flex-shrink-0">
                  {exp.startDate} – {exp.endDate ?? "Present"}
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{exp.description}</p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {exp.technologies.map((tech: string) => (
                  <span key={tech} className="text-[10px] px-1.5 py-0.5 rounded bg-secondary border border-border text-secondary-foreground">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="text-sm font-semibold text-foreground mb-3">Education</h3>
        <div className="space-y-2">
          {candidate.education.map((edu: any, i: number) => (
            <div key={i} className="flex items-start justify-between">
              <div>
                <div className="text-sm font-medium text-foreground">{edu.school}</div>
                <div className="text-xs text-muted-foreground">{edu.degree}</div>
              </div>
              <div className="text-xs text-muted-foreground">{edu.year}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FitTab({ analyses, technicalBrief, candidate }: { analyses: any[]; technicalBrief: any; candidate: any }) {
  if (analyses.length === 0 && !technicalBrief) {
    return (
      <div className="max-w-2xl">
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Sparkles className="w-10 h-10 text-muted-foreground/40 mb-3" />
          <p className="text-sm text-muted-foreground">No analyses run yet.</p>
          <Link
            href={`/analysis?candidate=${candidate.id}`}
            className="mt-4 flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Sparkles className="w-4 h-4" /> Run Fit Analysis
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-5">
      {analyses.map((analysis) => {
        const role = SEED_ROLES.find((r) => r.id === analysis.roleId);
        const tierCfg = FIT_TIER_CONFIG[analysis.fitTier as keyof typeof FIT_TIER_CONFIG];

        return (
          <div key={analysis.id} className="bg-card border border-border rounded-xl overflow-hidden">
            {/* Header */}
            <div className={cn("px-5 py-3 border-b border-border flex items-center justify-between", tierCfg.bgColor)}>
              <div>
                <div className="text-sm font-semibold text-foreground">{role?.title}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{formatDate(analysis.createdAt)} · {analysis.model}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className={cn("text-3xl font-bold", tierCfg.scoreColor)}>{analysis.fitScore}</span>
                <span className={cn("text-xs px-2 py-0.5 rounded-full border font-medium", tierCfg.bgColor, tierCfg.color)}>
                  {tierCfg.label}
                </span>
              </div>
            </div>

            <div className="p-5 space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">{analysis.summary}</p>

              <div className="grid grid-cols-2 gap-4">
                {/* Reasons */}
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 mb-2">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Top Match Reasons
                  </div>
                  <ul className="space-y-1.5">
                    {analysis.topMatchReasons.map((r: string, i: number) => (
                      <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                        <span className="text-emerald-400/60 mt-0.5 flex-shrink-0">✓</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Risks */}
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-red-400 mb-2">
                    <AlertTriangle className="w-3.5 h-3.5" /> Risks
                  </div>
                  <ul className="space-y-1.5">
                    {analysis.risks.map((r: string, i: number) => (
                      <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                        <span className="text-red-400/60 mt-0.5 flex-shrink-0">!</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                  {analysis.unknowns.length > 0 && (
                    <>
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 mt-3 mb-2">
                        <HelpCircle className="w-3.5 h-3.5" /> Unknowns
                      </div>
                      <ul className="space-y-1.5">
                        {analysis.unknowns.map((u: string, i: number) => (
                          <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                            <span className="text-amber-400/60 mt-0.5 flex-shrink-0">?</span>
                            {u}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>

              {/* Technical concepts */}
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-400 mb-2">
                  <BookOpen className="w-3.5 h-3.5" /> Technical Concepts to Know
                </div>
                <div className="space-y-2">
                  {analysis.technicalConceptsToLearn.map((concept: string, i: number) => (
                    <div key={i} className="p-2.5 rounded-lg bg-blue-400/5 border border-blue-400/10">
                      <p className="text-xs text-muted-foreground">{concept}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suggested questions */}
              <div>
                <div className="text-xs font-semibold text-foreground mb-2">Suggested Screening Questions</div>
                <ul className="space-y-1.5">
                  {analysis.suggestedQuestions.map((q: string, i: number) => (
                    <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                      <span className="text-primary/60 font-bold flex-shrink-0">{i + 1}.</span>
                      {q}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}

      {/* Technical Brief */}
      {technicalBrief && (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-border bg-violet-400/5">
            <div className="text-sm font-semibold text-foreground">Technical Brief</div>
            <div className="text-xs text-muted-foreground mt-0.5">{formatDate(technicalBrief.createdAt)} · {technicalBrief.model}</div>
          </div>
          <div className="p-5 space-y-4">
            <div className="p-3 rounded-lg bg-violet-400/5 border border-violet-400/10">
              <p className="text-xs font-medium text-violet-400 mb-1">Plain-English Summary</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{technicalBrief.plainEnglishSummary}</p>
            </div>
            <div>
              <div className="text-xs font-semibold text-foreground mb-2">Key Technologies</div>
              <div className="space-y-2">
                {technicalBrief.keyTechnologies.map((t: any, i: number) => (
                  <div key={i} className="p-3 rounded-lg bg-muted/30 border border-border/40">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-foreground">{t.name}</span>
                      <span className={cn("text-[10px] px-1.5 py-0.5 rounded border font-medium",
                        t.relevance === "core" ? "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" :
                        t.relevance === "supporting" ? "text-blue-400 bg-blue-400/10 border-blue-400/20" :
                        "text-zinc-400 bg-zinc-400/10 border-zinc-400/20"
                      )}>
                        {t.relevance}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{t.explanation}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function OutreachTab({ drafts }: { drafts: any[] }) {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  if (drafts.length === 0) {
    return (
      <div className="max-w-2xl flex flex-col items-center justify-center py-16 text-center">
        <MessageSquare className="w-10 h-10 text-muted-foreground/40 mb-3" />
        <p className="text-sm text-muted-foreground">No outreach drafts yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-5">
      {drafts.map((draft) => {
        const role = SEED_ROLES.find((r) => r.id === draft.roleId);
        const statusColors: Record<string, string> = {
          draft: "text-amber-400 bg-amber-400/10 border-amber-400/20",
          approved: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
          sent: "text-blue-400 bg-blue-400/10 border-blue-400/20",
        };

        return (
          <div key={draft.id} className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-border flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-foreground">
                  {role ? `Outreach for ${role.title}` : "General Outreach"}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {formatDate(draft.createdAt)} · {draft.model}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={cn("text-xs px-2 py-0.5 rounded-full border font-medium", statusColors[draft.status])}>
                  {draft.status.charAt(0).toUpperCase() + draft.status.slice(1)}
                </span>
              </div>
            </div>

            <div className="p-5 space-y-4">
              {/* Short angle */}
              <div>
                <div className="text-xs font-semibold text-muted-foreground mb-1.5">Short Angle</div>
                <p className="text-sm text-foreground italic leading-relaxed">"{draft.shortAngle}"</p>
              </div>

              {/* Long draft */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="text-xs font-semibold text-muted-foreground">Full Outreach Message</div>
                  <button
                    onClick={() => copyToClipboard(draft.longDraft, draft.id)}
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Copy className="w-3 h-3" />
                    {copied === draft.id ? "Copied!" : "Copy"}
                  </button>
                </div>
                <div className="p-3 rounded-lg bg-muted/30 border border-border/40">
                  <p className="text-xs text-muted-foreground whitespace-pre-wrap leading-relaxed">{draft.longDraft}</p>
                </div>
              </div>

              {/* Talking points */}
              <div>
                <div className="text-xs font-semibold text-muted-foreground mb-1.5">First Call Talking Points</div>
                <ul className="space-y-1.5">
                  {draft.talkingPoints.map((point: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <span className="text-primary/60 font-bold flex-shrink-0">→</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Why this team */}
              <div className="p-3 rounded-lg bg-emerald-400/5 border border-emerald-400/10">
                <div className="text-xs font-semibold text-emerald-400 mb-1">Why This Team / Why Now</div>
                <p className="text-xs text-muted-foreground leading-relaxed">{draft.whyThisTeamNow}</p>
              </div>

              {/* Candidate hooks */}
              <div>
                <div className="text-xs font-semibold text-muted-foreground mb-1.5">Candidate-Specific Hooks</div>
                <ul className="space-y-1.5">
                  {draft.candidateHooks.map((hook: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <span className="text-violet-400/60 flex-shrink-0">•</span>
                      {hook}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Follow up */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="text-xs font-semibold text-muted-foreground">Follow-up Message</div>
                  <button
                    onClick={() => copyToClipboard(draft.followUpMessage, `${draft.id}-followup`)}
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Copy className="w-3 h-3" />
                    {copied === `${draft.id}-followup` ? "Copied!" : "Copy"}
                  </button>
                </div>
                <div className="p-3 rounded-lg bg-muted/30 border border-border/40">
                  <p className="text-xs text-muted-foreground leading-relaxed">{draft.followUpMessage}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2 border-t border-border">
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Approve Draft
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-secondary border border-border text-secondary-foreground text-xs font-medium hover:bg-secondary/80 transition-colors">
                  Edit Draft
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function HistoryTab({ candidate }: { candidate: any }) {
  const statuses: CandidateStatus[] = [
    "interesting", "outreach_drafted", "outreach_sent", "replied",
    "screening_booked", "screened",
  ];
  const currentIdx = statuses.indexOf(candidate.status as CandidateStatus);

  return (
    <div className="max-w-2xl space-y-4">
      {/* Status progression */}
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">Status Progress</h3>
        <div className="space-y-2">
          {statuses.map((status, i) => {
            const cfg = STATUS_CONFIG[status];
            const isPast = i < currentIdx;
            const isCurrent = i === currentIdx;
            return (
              <div key={status} className={cn(
                "flex items-center gap-3 p-2.5 rounded-lg border transition-colors",
                isCurrent ? `${cfg.bgColor}` : isPast ? "border-border/40 bg-muted/20 opacity-60" : "border-border/20 opacity-30"
              )}>
                <div className={cn(
                  "w-2 h-2 rounded-full flex-shrink-0",
                  isCurrent ? cfg.color.replace("text-", "bg-") : isPast ? "bg-muted-foreground" : "bg-border"
                )} />
                <span className={cn("text-xs font-medium", isCurrent ? cfg.color : "text-muted-foreground")}>
                  {cfg.label}
                </span>
                {isCurrent && (
                  <span className="ml-auto text-[10px] text-muted-foreground">Current</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Status change actions */}
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="text-sm font-semibold text-foreground mb-3">Update Status</h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
            <button
              key={key}
              className={cn(
                "text-xs px-2.5 py-1.5 rounded-lg border font-medium transition-colors",
                candidate.status === key
                  ? `${cfg.bgColor} ${cfg.color}`
                  : "bg-secondary border-border text-muted-foreground hover:bg-secondary/80"
              )}
            >
              {cfg.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
