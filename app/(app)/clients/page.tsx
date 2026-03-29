import Link from "next/link";
import { Building2, Users, Briefcase, ArrowRight, Globe, ChevronRight } from "lucide-react";
import { SEED_CLIENTS, SEED_ROLES, SEED_CANDIDATES, SEED_TEAMS } from "@/data/seed";
import { formatRelativeDate } from "@/lib/utils";

export default function ClientsPage() {
  return (
    <div className="px-8 py-8 max-w-5xl space-y-6 animate-fade-in">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Clients</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {SEED_CLIENTS.length} active client{SEED_CLIENTS.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors border border-border">
          + Add Client
        </button>
      </div>

      <div className="space-y-4">
        {SEED_CLIENTS.map((client) => {
          const teams = SEED_TEAMS.filter((t) => t.clientId === client.id);
          const roles = SEED_ROLES.filter((r) => r.clientId === client.id && r.status === "open");
          const candidates = SEED_CANDIDATES.length;

          return (
            <Link
              key={client.id}
              href={`/clients/${client.id}`}
              className="block bg-card border border-border rounded-xl p-6 hover:border-primary/40 transition-all group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  {/* Logo placeholder */}
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                        {client.name}
                      </h2>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 font-medium">
                        Active
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">{client.industry}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-xs text-muted-foreground">{client.stage}</span>
                      <span className="text-muted-foreground/40 mx-1">·</span>
                      <span className="text-xs text-muted-foreground">{client.headcount} employees</span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors mt-1" />
              </div>

              <p className="text-sm text-muted-foreground mt-4 line-clamp-2">
                {client.description}
              </p>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {client.techStack.slice(0, 7).map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-0.5 rounded bg-secondary border border-border text-secondary-foreground"
                  >
                    {tech}
                  </span>
                ))}
                {client.techStack.length > 7 && (
                  <span className="text-xs px-2 py-0.5 rounded bg-secondary border border-border text-muted-foreground">
                    +{client.techStack.length - 7} more
                  </span>
                )}
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 mt-4 pt-4 border-t border-border/60">
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Users className="w-3.5 h-3.5" />
                  <span>{teams.length} teams</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>{roles.length} open roles</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Users className="w-3.5 h-3.5" />
                  <span>{candidates} candidates</span>
                </div>
                {client.website && (
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground ml-auto">
                    <Globe className="w-3.5 h-3.5" />
                    <span className="text-xs">{client.website.replace("https://", "")}</span>
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
