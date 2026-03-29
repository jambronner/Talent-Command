import Link from "next/link";
import { Users, MapPin, Briefcase, ArrowRight, Filter } from "lucide-react";
import { SEED_CANDIDATES, SEED_CANDIDATE_ROLE_MATCHES, SEED_ROLES } from "@/data/seed";
import { STATUS_CONFIG, FIT_TIER_CONFIG, SOURCE_LABELS, formatRelativeDate } from "@/lib/utils";

export default function CandidatesPage() {
  return (
    <div className="px-8 py-8 max-w-5xl space-y-6 animate-fade-in">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Candidates</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {SEED_CANDIDATES.length} candidates in pipeline
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-secondary border border-border text-secondary-foreground text-sm hover:bg-secondary/80 transition-colors">
            <Filter className="w-3.5 h-3.5" /> Filter
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-secondary border border-border text-secondary-foreground text-sm hover:bg-secondary/80 transition-colors">
            + Add Candidate
          </button>
        </div>
      </div>

      {/* Pipeline overview */}
      <div className="grid grid-cols-8 gap-2">
        {Object.entries(STATUS_CONFIG).map(([key, cfg]) => {
          const count = SEED_CANDIDATES.filter((c) => c.status === key).length;
          return (
            <div
              key={key}
              className={`rounded-lg border p-2.5 text-center ${count > 0 ? cfg.bgColor : "bg-card border-border"}`}
            >
              <div className={`text-lg font-bold ${count > 0 ? cfg.color : "text-muted-foreground"}`}>
                {count}
              </div>
              <div className="text-[9px] text-muted-foreground mt-0.5 leading-tight">
                {cfg.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Candidate list */}
      <div className="space-y-3">
        {SEED_CANDIDATES.map((candidate) => {
          const statusCfg = STATUS_CONFIG[candidate.status];
          const matches = SEED_CANDIDATE_ROLE_MATCHES.filter(
            (m) => m.candidateId === candidate.id
          );

          return (
            <Link
              key={candidate.id}
              href={`/candidates/${candidate.id}`}
              className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-primary/40 transition-all group"
            >
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-primary">
                  {candidate.name.split(" ").map((n) => n[0]).join("")}
                </span>
              </div>

              {/* Main info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    {candidate.name}
                  </span>
                  <span className="text-xs text-muted-foreground bg-secondary border border-border px-1.5 py-0.5 rounded text-[10px]">
                    {SOURCE_LABELS[candidate.source]}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground">
                  <Briefcase className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">
                    {candidate.currentTitle} · {candidate.currentCompany}
                  </span>
                  <span className="text-border hidden sm:inline">·</span>
                  <MapPin className="w-3 h-3 flex-shrink-0 hidden sm:inline" />
                  <span className="hidden sm:inline truncate">{candidate.location}</span>
                </div>
                {/* Matched roles */}
                {matches.length > 0 && (
                  <div className="flex gap-1.5 mt-1.5">
                    {matches.map((m) => {
                      const role = SEED_ROLES.find((r) => r.id === m.roleId);
                      const tierCfg = m.fitTier ? FIT_TIER_CONFIG[m.fitTier] : null;
                      return role && tierCfg ? (
                        <span
                          key={m.id}
                          className={`text-[10px] px-1.5 py-0.5 rounded border font-medium ${tierCfg.bgColor} ${tierCfg.color}`}
                        >
                          {m.fitScore} · {role.title.split("–")[1]?.trim() ?? role.title.split(" ").slice(0, 3).join(" ")}
                        </span>
                      ) : null;
                    })}
                  </div>
                )}
              </div>

              {/* Skills snippet */}
              <div className="hidden lg:flex gap-1.5 flex-shrink-0 max-w-[200px] flex-wrap">
                {candidate.skills.slice(0, 3).map((skill) => (
                  <span
                    key={skill}
                    className="text-[10px] px-1.5 py-0.5 rounded bg-secondary border border-border text-secondary-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Status + arrow */}
              <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                <div className="text-right hidden sm:block">
                  <div className="text-[10px] text-muted-foreground">
                    {candidate.yearsOfExperience}y exp
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    {formatRelativeDate(candidate.updatedAt)}
                  </div>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full border font-medium ${statusCfg.bgColor} ${statusCfg.color}`}
                >
                  {statusCfg.label}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
