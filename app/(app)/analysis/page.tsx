"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Sparkles, ChevronDown, Loader2, CheckCircle2, AlertTriangle,
  HelpCircle, BookOpen, MessageSquare, FileText, Zap,
} from "lucide-react";
import {
  SEED_CANDIDATES, SEED_ROLES, SEED_CLIENTS,
  SEED_FIT_ANALYSES, SEED_OUTREACH_DRAFTS, SEED_TECHNICAL_BRIEF,
} from "@/data/seed";
import { FIT_TIER_CONFIG, cn } from "@/lib/utils";

type TaskType = "fit_analysis" | "technical_brief" | "outreach_draft" | "call_notes";

const TASK_CONFIG: Record<TaskType, { label: string; icon: any; description: string; color: string }> = {
  fit_analysis: {
    label: "Fit Analysis",
    icon: Sparkles,
    description: "Score candidate fit against a role with structured reasoning",
    color: "text-violet-400",
  },
  technical_brief: {
    label: "Technical Brief",
    icon: BookOpen,
    description: "Plain-English summary of tech stack relevance for this candidate",
    color: "text-blue-400",
  },
  outreach_draft: {
    label: "Outreach Draft",
    icon: MessageSquare,
    description: "Personalized outreach message with talking points and hooks",
    color: "text-emerald-400",
  },
  call_notes: {
    label: "Ingest Call Notes",
    icon: FileText,
    description: "Summarize call transcript into structured takeaways",
    color: "text-amber-400",
  },
};

export default function AnalysisPage() {
  const searchParams = useSearchParams();
  const preselectedCandidate = searchParams.get("candidate") ?? "";
  const preselectedRole = searchParams.get("role") ?? "";

  const [selectedTask, setSelectedTask] = useState<TaskType>("fit_analysis");
  const [selectedCandidateId, setSelectedCandidateId] = useState(preselectedCandidate);
  const [selectedRoleId, setSelectedRoleId] = useState(preselectedRole);
  const [callNotes, setCallNotes] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [resultType, setResultType] = useState<TaskType | null>(null);

  const selectedCandidate = SEED_CANDIDATES.find((c) => c.id === selectedCandidateId);
  const selectedRole = SEED_ROLES.find((r) => r.id === selectedRoleId);

  const handleRun = async () => {
    setIsRunning(true);
    setResult(null);

    // Simulate API call with 1.5s delay, then return seed data
    await new Promise((r) => setTimeout(r, 1500));

    if (selectedTask === "fit_analysis") {
      const existing = SEED_FIT_ANALYSES.find(
        (a) => a.candidateId === selectedCandidateId && a.roleId === selectedRoleId
      );
      setResult(existing ?? SEED_FIT_ANALYSES[0]);
    } else if (selectedTask === "technical_brief") {
      setResult(SEED_TECHNICAL_BRIEF);
    } else if (selectedTask === "outreach_draft") {
      const existing = SEED_OUTREACH_DRAFTS.find(
        (d) => d.candidateId === selectedCandidateId
      );
      setResult(existing ?? SEED_OUTREACH_DRAFTS[0]);
    } else {
      setResult({
        summary: "Call covered compensation expectations ($290–320K), interest in the platform challenge, and timeline (available in 6 weeks). Candidate is motivated by the scale problem but wants to understand the roadmap before committing.",
        actionItems: ["Send role overview doc", "Schedule follow-up with Priya", "Share Meridian Series B announcement"],
        keyInsights: ["Open to hybrid if role is compelling", "Strong interest in developer tooling mission", "Evaluating 2 other offers"],
      });
    }

    setResultType(selectedTask);
    setIsRunning(false);
  };

  const canRun = selectedTask === "call_notes"
    ? callNotes.trim().length > 10
    : selectedCandidateId && (selectedTask === "fit_analysis" || selectedTask === "technical_brief" || selectedTask === "outreach_draft")
      ? selectedCandidateId && selectedRoleId
      : selectedCandidateId;

  return (
    <div className="flex h-full animate-fade-in">
      {/* Left panel — task config */}
      <div className="w-80 flex-shrink-0 border-r border-border flex flex-col">
        <div className="px-6 pt-8 pb-4 border-b border-border">
          <h1 className="text-lg font-bold text-foreground tracking-tight flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" /> Analysis
          </h1>
          <p className="text-xs text-muted-foreground mt-1">Run AI tasks on candidates and roles</p>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
          {/* Task selector */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-2 block">Task</label>
            <div className="space-y-1.5">
              {(Object.entries(TASK_CONFIG) as [TaskType, typeof TASK_CONFIG[TaskType]][]).map(([key, cfg]) => (
                <button
                  key={key}
                  onClick={() => { setSelectedTask(key); setResult(null); }}
                  className={cn(
                    "w-full text-left p-3 rounded-lg border transition-all",
                    selectedTask === key
                      ? "border-primary/40 bg-primary/5"
                      : "border-border bg-card hover:border-border/80"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <cfg.icon className={cn("w-3.5 h-3.5", selectedTask === key ? cfg.color : "text-muted-foreground")} />
                    <span className={cn("text-xs font-medium", selectedTask === key ? "text-foreground" : "text-muted-foreground")}>
                      {cfg.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Candidate selector */}
          {selectedTask !== "call_notes" && (
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-2 block">Candidate</label>
              <div className="relative">
                <select
                  value={selectedCandidateId}
                  onChange={(e) => setSelectedCandidateId(e.target.value)}
                  className="w-full appearance-none bg-card border border-border rounded-lg px-3 py-2 text-xs text-foreground pr-8 focus:outline-none focus:border-primary/60 transition-colors"
                >
                  <option value="">Select a candidate...</option>
                  {SEED_CANDIDATES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} · {c.currentTitle}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-2.5 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          )}

          {/* Role selector */}
          {(selectedTask === "fit_analysis" || selectedTask === "technical_brief" || selectedTask === "outreach_draft") && (
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-2 block">Role</label>
              <div className="relative">
                <select
                  value={selectedRoleId}
                  onChange={(e) => setSelectedRoleId(e.target.value)}
                  className="w-full appearance-none bg-card border border-border rounded-lg px-3 py-2 text-xs text-foreground pr-8 focus:outline-none focus:border-primary/60 transition-colors"
                >
                  <option value="">Select a role...</option>
                  {SEED_ROLES.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.title}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-2.5 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          )}

          {/* Call notes textarea */}
          {selectedTask === "call_notes" && (
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-2 block">
                Call Transcript / Notes
              </label>
              <textarea
                value={callNotes}
                onChange={(e) => setCallNotes(e.target.value)}
                placeholder="Paste raw call transcript, Fathom notes, or your own notes here..."
                rows={10}
                className="w-full bg-card border border-border rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors resize-none"
              />
            </div>
          )}

          {/* Run button */}
          <button
            onClick={handleRun}
            disabled={!canRun || isRunning}
            className={cn(
              "w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all",
              canRun && !isRunning
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-secondary border border-border text-muted-foreground cursor-not-allowed opacity-50"
            )}
          >
            {isRunning ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Running…
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Run {TASK_CONFIG[selectedTask].label}
              </>
            )}
          </button>

          {/* Context preview */}
          {(selectedCandidate || selectedRole) && (
            <div className="p-3 rounded-lg bg-muted/30 border border-border/40 space-y-1.5">
              {selectedCandidate && (
                <div>
                  <div className="text-[10px] font-semibold text-muted-foreground">CANDIDATE</div>
                  <div className="text-xs text-foreground">{selectedCandidate.name}</div>
                  <div className="text-[10px] text-muted-foreground">
                    {selectedCandidate.currentTitle} · {selectedCandidate.currentCompany}
                  </div>
                </div>
              )}
              {selectedRole && (
                <div className={selectedCandidate ? "pt-1.5 border-t border-border/40" : ""}>
                  <div className="text-[10px] font-semibold text-muted-foreground">ROLE</div>
                  <div className="text-xs text-foreground">{selectedRole.title}</div>
                  <div className="text-[10px] text-muted-foreground">{selectedRole.level}</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right panel — results */}
      <div className="flex-1 overflow-y-auto">
        {!result && !isRunning && (
          <div className="flex flex-col items-center justify-center h-full text-center px-8">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
              <Sparkles className="w-7 h-7 text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-foreground mb-2">Ready to analyze</h2>
            <p className="text-sm text-muted-foreground max-w-xs">
              Select a task, candidate, and role on the left — then hit Run to generate AI-powered insights.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 max-w-sm w-full">
              {(Object.entries(TASK_CONFIG) as [TaskType, typeof TASK_CONFIG[TaskType]][]).map(([key, cfg]) => (
                <button
                  key={key}
                  onClick={() => setSelectedTask(key)}
                  className={cn(
                    "p-3 rounded-xl border text-left transition-all",
                    selectedTask === key
                      ? "border-primary/40 bg-primary/5"
                      : "border-border bg-card hover:border-border/80"
                  )}
                >
                  <cfg.icon className={cn("w-4 h-4 mb-1.5", cfg.color)} />
                  <div className="text-xs font-medium text-foreground">{cfg.label}</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5 leading-snug">{cfg.description}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {isRunning && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Loader2 className="w-8 h-8 text-primary animate-spin mb-3" />
            <p className="text-sm text-muted-foreground">Running {TASK_CONFIG[selectedTask].label}…</p>
          </div>
        )}

        {result && resultType && !isRunning && (
          <div className="px-8 py-6 max-w-3xl">
            {resultType === "fit_analysis" && <FitAnalysisResult result={result} candidate={selectedCandidate} role={selectedRole} />}
            {resultType === "technical_brief" && <TechnicalBriefResult result={result} />}
            {resultType === "outreach_draft" && <OutreachResult result={result} role={selectedRole} />}
            {resultType === "call_notes" && <CallNotesResult result={result} />}
          </div>
        )}
      </div>
    </div>
  );
}

function FitAnalysisResult({ result, candidate, role }: { result: any; candidate: any; role: any }) {
  const tierCfg = FIT_TIER_CONFIG[result.fitTier as keyof typeof FIT_TIER_CONFIG];
  return (
    <div className="space-y-5">
      <div className={cn("p-5 rounded-xl border", tierCfg.bgColor)}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-sm font-semibold text-foreground">
              {candidate?.name ?? "Candidate"} → {role?.title ?? "Role"}
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">{result.model}</div>
          </div>
          <div className="text-right">
            <div className={cn("text-4xl font-bold", tierCfg.scoreColor)}>{result.fitScore}</div>
            <span className={cn("text-xs px-2 py-0.5 rounded-full border font-medium", tierCfg.bgColor, tierCfg.color)}>
              {tierCfg.label}
            </span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{result.summary}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 mb-3">
            <CheckCircle2 className="w-3.5 h-3.5" /> Top Match Reasons
          </div>
          <ul className="space-y-2">
            {result.topMatchReasons.map((r: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                <span className="text-emerald-400/60 flex-shrink-0">✓</span> {r}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-red-400 mb-3">
            <AlertTriangle className="w-3.5 h-3.5" /> Risks
          </div>
          <ul className="space-y-2">
            {result.risks.map((r: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                <span className="text-red-400/60 flex-shrink-0">!</span> {r}
              </li>
            ))}
          </ul>
          {result.unknowns.length > 0 && (
            <>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 mt-3 mb-2">
                <HelpCircle className="w-3.5 h-3.5" /> Unknowns
              </div>
              <ul className="space-y-2">
                {result.unknowns.map((u: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <span className="text-amber-400/60 flex-shrink-0">?</span> {u}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-4">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-400 mb-3">
          <BookOpen className="w-3.5 h-3.5" /> Technical Concepts to Know
        </div>
        <div className="space-y-2">
          {result.technicalConceptsToLearn.map((c: string, i: number) => (
            <p key={i} className="text-xs text-muted-foreground p-2 rounded bg-blue-400/5 border border-blue-400/10">{c}</p>
          ))}
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-4">
        <div className="text-xs font-semibold text-foreground mb-3">Suggested Screening Questions</div>
        <ol className="space-y-2">
          {result.suggestedQuestions.map((q: string, i: number) => (
            <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
              <span className="text-primary/60 font-bold flex-shrink-0">{i + 1}.</span> {q}
            </li>
          ))}
        </ol>
      </div>

      <div className="flex gap-2">
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-secondary border border-border text-secondary-foreground text-xs font-medium hover:bg-secondary/80 transition-colors">
          Save to Candidate
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors">
          <MessageSquare className="w-3.5 h-3.5" /> Draft Outreach Next
        </button>
      </div>
    </div>
  );
}

function TechnicalBriefResult({ result }: { result: any }) {
  return (
    <div className="space-y-5">
      <div className="p-4 rounded-xl bg-violet-400/5 border border-violet-400/10">
        <div className="text-xs font-semibold text-violet-400 mb-2">Plain-English Summary</div>
        <p className="text-sm text-muted-foreground leading-relaxed">{result.plainEnglishSummary}</p>
      </div>

      <div className="bg-card border border-border rounded-xl p-4">
        <div className="text-xs font-semibold text-foreground mb-3">Key Technologies</div>
        <div className="space-y-3">
          {result.keyTechnologies.map((t: any, i: number) => (
            <div key={i} className="flex items-start gap-3">
              <span className={cn("text-[10px] px-1.5 py-0.5 rounded border font-medium mt-0.5 flex-shrink-0",
                t.relevance === "core" ? "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" :
                t.relevance === "supporting" ? "text-blue-400 bg-blue-400/10 border-blue-400/20" :
                "text-zinc-400 bg-zinc-400/10 border-zinc-400/20"
              )}>
                {t.relevance}
              </span>
              <div>
                <div className="text-xs font-medium text-foreground">{t.name}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{t.explanation}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="text-xs font-semibold text-emerald-400 mb-2">Candidate Strengths</div>
          <ul className="space-y-1.5">
            {result.candidateStrengths.map((s: string, i: number) => (
              <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                <span className="text-emerald-400/60 flex-shrink-0">✓</span> {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="text-xs font-semibold text-amber-400 mb-2">Candidate Gaps</div>
          <ul className="space-y-1.5">
            {result.candidateGaps.map((g: string, i: number) => (
              <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                <span className="text-amber-400/60 flex-shrink-0">△</span> {g}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function OutreachResult({ result, role }: { result: any; role: any }) {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-5">
      <div className="p-4 rounded-xl bg-emerald-400/5 border border-emerald-400/10">
        <div className="text-xs font-semibold text-emerald-400 mb-1.5">Short Angle</div>
        <p className="text-sm text-foreground italic">"{result.shortAngle}"</p>
      </div>

      <div className="bg-card border border-border rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-semibold text-foreground">Full Message</div>
          <button onClick={() => copy(result.longDraft, "long")} className="text-xs text-muted-foreground hover:text-primary transition-colors">
            {copied === "long" ? "Copied!" : "Copy"}
          </button>
        </div>
        <div className="p-3 rounded-lg bg-muted/30 border border-border/40">
          <p className="text-xs text-muted-foreground whitespace-pre-wrap leading-relaxed">{result.longDraft}</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-4">
        <div className="text-xs font-semibold text-foreground mb-2">Talking Points</div>
        <ul className="space-y-1.5">
          {result.talkingPoints.map((p: string, i: number) => (
            <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
              <span className="text-primary/60 flex-shrink-0">→</span> {p}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-card border border-border rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-semibold text-foreground">Follow-Up</div>
          <button onClick={() => copy(result.followUpMessage, "followup")} className="text-xs text-muted-foreground hover:text-primary transition-colors">
            {copied === "followup" ? "Copied!" : "Copy"}
          </button>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">{result.followUpMessage}</p>
      </div>

      <div className="flex gap-2">
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors">
          <CheckCircle2 className="w-3.5 h-3.5" /> Approve Draft
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-secondary border border-border text-secondary-foreground text-xs font-medium hover:bg-secondary/80 transition-colors">
          Edit
        </button>
      </div>
    </div>
  );
}

function CallNotesResult({ result }: { result: any }) {
  return (
    <div className="space-y-5">
      <div className="bg-card border border-border rounded-xl p-4">
        <div className="text-xs font-semibold text-foreground mb-2">Summary</div>
        <p className="text-sm text-muted-foreground leading-relaxed">{result.summary}</p>
      </div>
      <div className="bg-card border border-border rounded-xl p-4">
        <div className="text-xs font-semibold text-foreground mb-2">Key Insights</div>
        <ul className="space-y-1.5">
          {result.keyInsights.map((k: string, i: number) => (
            <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
              <span className="text-violet-400/60 flex-shrink-0">•</span> {k}
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-card border border-border rounded-xl p-4">
        <div className="text-xs font-semibold text-foreground mb-2">Action Items</div>
        <ul className="space-y-1.5">
          {result.actionItems.map((a: string, i: number) => (
            <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
              <span className="text-emerald-400/60 flex-shrink-0">□</span> {a}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
