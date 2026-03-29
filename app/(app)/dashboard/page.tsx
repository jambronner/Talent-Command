import {
  Building2,
  Users,
  Briefcase,
  AlertCircle,
  TrendingUp,
  Clock,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import {
  SEED_CLIENTS,
  SEED_CANDIDATES,
  SEED_ROLES,
  SEED_ACTION_ITEMS,
  SEED_FIT_ANALYSES,
} from "@/data/seed";
import { STATUS_CONFIG, FIT_TIER_CONFIG, formatRelativeDate, formatDate } from "@/lib/utils";

const PIPELINE_STAGES = [
  { key: "interesting", count: 2 },
  { key: "outreach_drafted", count: 1 },
  { key: "outreach_sent", count: 1 },
  { key: "screening_booked", count: 1 },
];

export default function DashboardPage() {
  const openRoles = SEED_ROLES.filter((r) => r.status === "open").length;
  const pendingActions = SEED_ACTION_ITEMS.filter((a) => !a.completed).length;
  const highPriorityActions = SEED_ACTION_ITEMS.filter(
    (a) => !a.completed && a.priority === "high"
  );
  const recentAnalyses = SEED_FIT_ANALYSES;

  return (
    <div className="px-8 py-8 max-w-7xl space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            Command Center
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <Link
          href="/analysis"
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <Sparkles className="w-4 h-4" />
          Run Analysis
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          label="Active Clients"
          value={SEED_CLIENTS.length}
          icon={Building2}
          color="violet"
          href="/clients"
        />
        <StatCard
          label="Open Roles"
          value={openRoles}
          icon={Briefcase}
          color="blue"
          href="/clients/client-1"
        />
        <StatCard
          label="Candidates"
          value={SEED_CANDIDATES.length}
          icon={Users}
          color="emerald"
          href="/candidates"
        />
        <StatCard
          label="Pending Actions"
          value={pendingActions}
          icon={AlertCircle}
          color="amber"
          href="/dashboard"
          urgent={pendingActions > 0}
        />
      </div>

      {/* Pipeline + Actions row */}
      <div className="grid grid-cols-3 gap-6">
        {/* Pipeline */}
        <div className="col-span-2 bg-card border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <h2 className="text-sm font-semibold text-foreground">
                Candidate Pipeline
              </h2>
            </div>
            <Link
              href="/candidates"
              className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Pipeline stages */}
          <div className="grid grid-cols-4 gap-3 mb-5">
            {PIPELINE_STAGES.map((stage) => {
              const cfg = STATUS_CONFIG[stage.key as keyof typeof STATUS_CONFIG];
              return (
                <div
                  key={stage.key}
                  className={`rounded-lg border p-3 ${cfg.bgColor}`}
                >
                  <div className={`text-xl font-bold ${cfg.color}`}>
                    {stage.count}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {cfg.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Candidate list */}
          <div className="space-y-2">
            {SEED_CANDIDATES.map((c) => {
              const cfg = STATUS_CONFIG[c.status];
              return (
                <Link
                  key={c.id}
                  href={`/candidates/${c.id}`}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/60 border border-border/40 transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-primary">
                        {c.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                        {c.name}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        {c.currentTitle} · {c.currentCompany}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full border font-medium ${cfg.bgColor} ${cfg.color}`}
                    >
                      {cfg.label}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Action Items */}
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-amber-400" />
            <h2 className="text-sm font-semibold text-foreground">
              Follow-ups Due
            </h2>
          </div>
          <div className="space-y-3">
            {SEED_ACTION_ITEMS.filter((a) => !a.completed)
              .sort((a, b) => (a.priority === "high" ? -1 : 1))
              .map((action) => (
                <div
                  key={action.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border/40"
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                      action.priority === "high"
                        ? "bg-red-400"
                        : action.priority === "medium"
                        ? "bg-amber-400"
                        : "bg-muted-foreground"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-foreground leading-relaxed">
                      {action.text}
                    </p>
                    {action.dueDate && (
                      <p className="text-[10px] text-muted-foreground mt-1">
                        Due {formatDate(action.dueDate)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Recent Analyses */}
      <div className="bg-card border border-border rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-semibold text-foreground">
              Recent Analyses
            </h2>
          </div>
          <Link
            href="/analysis"
            className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"
          >
            New analysis <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {recentAnalyses.map((analysis) => {
            const candidate = SEED_CANDIDATES.find(
              (c) => c.id === analysis.candidateId
            );
            const role = SEED_ROLES.find((r) => r.id === analysis.roleId);
            const tierCfg = FIT_TIER_CONFIG[analysis.fitTier];

            return (
              <Link
                key={analysis.id}
                href={`/candidates/${analysis.candidateId}`}
                className="p-4 rounded-lg bg-muted/30 border border-border/40 hover:border-primary/30 hover:bg-muted/50 transition-all group"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {candidate?.name}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {role?.title}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
                    <span
                      className={`text-xs font-bold ${tierCfg.scoreColor}`}
                    >
                      {analysis.fitScore}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full border font-medium ${tierCfg.bgColor} ${tierCfg.color}`}
                    >
                      {tierCfg.label}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {analysis.summary}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {analysis.topMatchReasons.slice(0, 2).map((reason, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded px-1.5 py-0.5"
                    >
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      {reason.split(" ").slice(0, 5).join(" ")}…
                    </span>
                  ))}
                </div>
                <div className="text-[10px] text-muted-foreground mt-2">
                  {formatRelativeDate(analysis.createdAt)} · {analysis.model}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  color,
  href,
  urgent,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
  color: "violet" | "blue" | "emerald" | "amber";
  href: string;
  urgent?: boolean;
}) {
  const colorMap = {
    violet: {
      icon: "text-violet-400",
      bg: "bg-violet-400/10",
      border: "border-violet-400/20",
      value: "text-violet-400",
    },
    blue: {
      icon: "text-blue-400",
      bg: "bg-blue-400/10",
      border: "border-blue-400/20",
      value: "text-blue-400",
    },
    emerald: {
      icon: "text-emerald-400",
      bg: "bg-emerald-400/10",
      border: "border-emerald-400/20",
      value: "text-emerald-400",
    },
    amber: {
      icon: "text-amber-400",
      bg: "bg-amber-400/10",
      border: "border-amber-400/20",
      value: "text-amber-400",
    },
  };
  const c = colorMap[color];

  return (
    <Link
      href={href}
      className="bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-all group"
    >
      <div className="flex items-start justify-between">
        <div
          className={`w-9 h-9 rounded-lg ${c.bg} border ${c.border} flex items-center justify-center`}
        >
          <Icon className={`w-4.5 h-4.5 ${c.icon}`} />
        </div>
        {urgent && (
          <span className="text-[10px] text-red-400 bg-red-400/10 border border-red-400/20 rounded-full px-1.5 py-0.5 font-medium">
            Urgent
          </span>
        )}
      </div>
      <div className={`text-3xl font-bold mt-3 ${c.value}`}>{value}</div>
      <div className="text-xs text-muted-foreground mt-0.5 font-medium">{label}</div>
    </Link>
  );
}
