"use client";

import { Settings, Key, Brain, Database, User, Moon, Sun, Palette } from "lucide-react";
import { useTheme } from "@/lib/theme";

const MODELS = [
  // OpenAI — current generation
  { id: "gpt-5.4",      label: "GPT-5.4",      provider: "OpenAI",    tier: "Best quality" },
  { id: "gpt-5.4-mini", label: "GPT-5.4 Mini", provider: "OpenAI",    tier: "Balanced" },
  { id: "gpt-5.4-nano", label: "GPT-5.4 Nano", provider: "OpenAI",    tier: "Fast & cheap" },
  // OpenAI — previous generation
  { id: "gpt-4o",       label: "GPT-4o",        provider: "OpenAI",    tier: "Previous gen" },
  { id: "gpt-4o-mini",  label: "GPT-4o Mini",   provider: "OpenAI",    tier: "Previous gen" },
  // Anthropic — current generation
  { id: "claude-opus-4-6",   label: "Claude Opus 4.6",   provider: "Anthropic", tier: "Best quality" },
  { id: "claude-sonnet-4-6", label: "Claude Sonnet 4.6", provider: "Anthropic", tier: "Balanced" },
  { id: "claude-haiku-4-5",  label: "Claude Haiku 4.5",  provider: "Anthropic", tier: "Fast & cheap" },
  // Anthropic — previous generation
  { id: "claude-3-5-sonnet", label: "Claude 3.5 Sonnet",  provider: "Anthropic", tier: "Previous gen" },
  { id: "claude-3-haiku",    label: "Claude 3 Haiku",     provider: "Anthropic", tier: "Previous gen" },
  // Google
  { id: "gemini-1.5-pro",   label: "Gemini 1.5 Pro",   provider: "Google", tier: "Best quality" },
  { id: "gemini-1.5-flash", label: "Gemini 1.5 Flash", provider: "Google", tier: "Fast & cheap" },
];

const AI_TASKS = [
  {
    key: "FIT_ANALYSIS_MODEL",
    label: "Fit Analysis",
    description: "Scores candidate-role fit with structured reasoning",
    default: "claude-opus-4-6",
    rationale: "Opus 4.6 default — this is your highest-stakes output. It requires careful multi-factor reasoning across skills, level, context, and risk. Worth the extra cost per run.",
  },
  {
    key: "TECHNICAL_BRIEF_MODEL",
    label: "Technical Brief",
    description: "Translates tech stack into recruiter-friendly language",
    default: "claude-sonnet-4-6",
    rationale: "Sonnet 4.6 default — fast enough for quick lookups, smart enough to accurately explain complex distributed systems concepts without hallucinating.",
  },
  {
    key: "OUTREACH_DRAFT_MODEL",
    label: "Outreach Draft",
    description: "Writes personalized outreach with hooks and talking points",
    default: "claude-sonnet-4-6",
    rationale: "Sonnet 4.6 default — Claude tends to write more natural, less GPT-ish outreach. Sonnet hits the right balance of warmth and speed. Swap to Opus if quality feels generic.",
  },
  {
    key: "DOCUMENT_PARSE_MODEL",
    label: "Document Parse",
    description: "Extracts structured data from JDs and call transcripts",
    default: "claude-haiku-4-5",
    rationale: "Haiku 4.5 default — structured extraction from well-formatted docs doesn't need frontier intelligence. Haiku is 5× cheaper and fast enough for batch parsing.",
  },
];

const THEMES = [
  {
    id: "dark",
    label: "Midnight",
    description: "Deep space aesthetic with violet accents",
    icon: Moon,
    preview: "from-slate-900 to-slate-800",
    accent: "bg-violet-500",
  },
  {
    id: "light",
    label: "Clean Slate",
    description: "Professional light theme with crisp contrasts",
    icon: Sun,
    preview: "from-slate-50 to-white",
    accent: "bg-violet-600",
  },
  {
    id: "warm",
    label: "Paper & Coffee",
    description: "Warm sepia tones, easy on the eyes",
    icon: Palette,
    preview: "from-amber-50 to-orange-50",
    accent: "bg-amber-600",
  },
] as const;

type ThemeId = typeof THEMES[number]["id"];

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="px-8 py-8 max-w-3xl space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground tracking-tight flex items-center gap-2">
          <Settings className="w-5 h-5" /> Settings
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Configure AI models, API keys, and preferences</p>
      </div>

      {/* Theme */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Sun className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-semibold text-foreground">Appearance</h2>
        </div>
        <p className="text-xs text-muted-foreground">
          Choose a theme that fits your workspace. Your preference is saved automatically.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {THEMES.map((t) => {
            const Icon = t.icon;
            const isActive = theme === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTheme(t.id as ThemeId)}
                className={`relative group text-left p-3 rounded-xl border transition-all duration-200 ${
                  isActive
                    ? "bg-card border-primary/60 ring-1 ring-primary/40"
                    : "bg-card border-border hover:border-primary/30 hover:bg-secondary/30"
                }`}
              >
                {/* Preview gradient */}
                <div className={`h-12 rounded-lg bg-gradient-to-br ${t.preview} border border-border/50 mb-3 relative overflow-hidden`}>
                  <div className={`absolute top-2 right-2 w-2 h-2 rounded-full ${t.accent}`} />
                  {isActive && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-primary text-primary-foreground text-[10px] font-medium px-2 py-0.5 rounded-full shadow-sm">
                        Active
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex items-start gap-2">
                  <Icon className={`w-4 h-4 mt-0.5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                  <div>
                    <div className={`text-sm font-medium ${isActive ? "text-foreground" : "text-foreground/80"}`}>
                      {t.label}
                    </div>
                    <div className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                      {t.description}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        <p className="text-[11px] text-muted-foreground/70">
          Theme preference persists across all pages and sessions via localStorage.
        </p>
      </section>

      {/* AI Models */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-semibold text-foreground">AI Model Configuration</h2>
        </div>
        <p className="text-xs text-muted-foreground">
          Each AI task can use a different model. Set via environment variables or override here.
        </p>
        <div className="space-y-3">
          {AI_TASKS.map((task) => (
            <div key={task.key} className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground">{task.label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{task.description}</div>
                  <div className="text-[10px] text-muted-foreground/60 mt-1 font-mono">
                    NEXT_PUBLIC_{task.key}
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <select
                    defaultValue={task.default}
                    className="appearance-none bg-secondary border border-border rounded-lg px-3 py-1.5 text-xs text-foreground pr-8 focus:outline-none focus:border-primary/60 transition-colors"
                  >
                    {MODELS.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <p className="mt-2.5 text-[11px] text-muted-foreground/70 leading-relaxed border-t border-border/40 pt-2.5">
                {task.rationale}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* API Keys */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Key className="w-4 h-4 text-amber-400" />
          <h2 className="text-sm font-semibold text-foreground">API Keys</h2>
        </div>
        <div className="bg-amber-400/5 border border-amber-400/20 rounded-xl p-4">
          <p className="text-xs text-amber-400 font-medium mb-1">Set via environment variables</p>
          <p className="text-xs text-muted-foreground">
            API keys should never be stored in the UI. Add them to your <code className="text-xs bg-secondary px-1 py-0.5 rounded">.env.local</code> file.
          </p>
        </div>
        <div className="space-y-2">
          {[
            { key: "OPENAI_API_KEY", label: "OpenAI API Key", hint: "sk-..." },
            { key: "ANTHROPIC_API_KEY", label: "Anthropic API Key", hint: "sk-ant-..." },
            { key: "GOOGLE_AI_API_KEY", label: "Google AI API Key", hint: "AIza..." },
            { key: "NEXT_PUBLIC_SUPABASE_URL", label: "Supabase URL", hint: "https://xxx.supabase.co" },
            { key: "NEXT_PUBLIC_SUPABASE_ANON_KEY", label: "Supabase Anon Key", hint: "eyJ..." },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
              <div>
                <div className="text-xs font-medium text-foreground">{item.label}</div>
                <div className="text-[10px] text-muted-foreground/60 font-mono">{item.key}</div>
              </div>
              <div className="text-xs text-muted-foreground font-mono bg-secondary px-2 py-1 rounded border border-border">
                {item.hint}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Supabase */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-blue-400" />
          <h2 className="text-sm font-semibold text-foreground">Database</h2>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-foreground">Supabase Connection</div>
              <div className="text-xs text-muted-foreground mt-0.5">PostgreSQL via Supabase</div>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-zinc-600" />
              <span className="text-xs text-muted-foreground">Not configured</span>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-muted/30 border border-border/40">
            <p className="text-xs text-muted-foreground">
              Run the migration at <code className="bg-secondary px-1 py-0.5 rounded text-[10px]">supabase/migrations/001_initial_schema.sql</code> to set up the database schema.
            </p>
          </div>
        </div>
      </section>

      {/* Profile */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-muted-foreground" />
          <h2 className="text-sm font-semibold text-foreground">Profile</h2>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
              <span className="text-lg font-bold text-primary">D</span>
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground">Dave</div>
              <div className="text-xs text-muted-foreground">Senior Technical Recruiter</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Name</label>
              <input
                defaultValue="Dave"
                className="w-full bg-secondary border border-border rounded-lg px-3 py-1.5 text-sm text-foreground focus:outline-none focus:border-primary/60 transition-colors"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Title</label>
              <input
                defaultValue="Senior Technical Recruiter"
                className="w-full bg-secondary border border-border rounded-lg px-3 py-1.5 text-sm text-foreground focus:outline-none focus:border-primary/60 transition-colors"
              />
            </div>
          </div>
          <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors">
            Save Changes
          </button>
        </div>
      </section>
    </div>
  );
}
