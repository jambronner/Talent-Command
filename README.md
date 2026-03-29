# Talent Command Center

A recruiter command center for high-touch technical recruiting. Centralize your clients, roles, and candidates in one place — then run AI tasks (fit analysis, technical briefs, outreach drafts, call note parsing) directly from the app.

Built with Next.js, TypeScript, Tailwind CSS, Supabase, and pluggable AI (OpenAI / Anthropic / Google — one model per task, swappable via env vars).

---

## What it does

- **Dashboard** — pipeline snapshot, action items, recent AI analyses
- **Client Workspace** — per-client tabs for Overview, Teams, Roles, Knowledge Base, Notes, Candidates
- **Candidate Detail** — profile, fit scores, outreach drafts, status history
- **Role Detail** — JD breakdown, required vs. nice-to-have skills, matched candidates
- **Analysis Workspace** — run AI tasks on any candidate × role pair: fit analysis, technical brief, outreach draft, call note ingestion
- **Settings** — configure which AI model handles which task, no code changes required

The app ships with seed data (1 client, 2 teams, 3 roles, 5 candidates) so you can walk every screen immediately without a live database.

---

## Prerequisites

- **Node.js 18+** — [nodejs.org](https://nodejs.org)
- **npm** (comes with Node)
- **A Supabase account** (free tier is fine) — [supabase.com](https://supabase.com)
- **At least one AI provider API key:**
  - Anthropic (recommended) — [console.anthropic.com](https://console.anthropic.com)
  - OpenAI — [platform.openai.com](https://platform.openai.com)
  - Google AI — [aistudio.google.com](https://aistudio.google.com)

---

## Quick start

### 1. Clone and install

```bash
git clone https://github.com/YOUR_USERNAME/dave_talent_tool.git
cd dave_talent_tool
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in your values:

```env
# Required — get these from your Supabase project dashboard under Settings → API
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Add at least one AI provider key
ANTHROPIC_API_KEY=sk-ant-...       # recommended
OPENAI_API_KEY=sk-...              # optional
GOOGLE_AI_API_KEY=AIza...          # optional
```

You don't need all three AI keys — just the one(s) matching the models you select in Settings.

### 3. Create your Supabase project

1. Go to [supabase.com](https://supabase.com) → New Project
2. Pick a name, set a database password, choose a region
3. Once it's ready, go to **Settings → API** and copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon / public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 4. Run the database migration

In your Supabase project, go to **SQL Editor** → **New query**, then paste the contents of:

```
supabase/migrations/001_initial_schema.sql
```

Click **Run**. This creates all tables (clients, teams, roles, candidates, fit analyses, outreach drafts, etc.) with Row Level Security enabled.

> **Alternatively**, if you have the Supabase CLI installed:
> ```bash
> supabase link --project-ref your-project-ref
> supabase db push
> ```

### 5. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll land on the Dashboard with seed data already populated.

---

## Walkthrough

Once running, here's the intended flow:

1. **Dashboard** — see your candidate pipeline, pending action items, and recent AI analyses at a glance
2. **Clients** (`/clients`) — click into a client to see their teams, open roles, knowledge base docs, and meeting notes
3. **Roles** — click any role to see the full JD breakdown and which candidates are matched
4. **Candidates** (`/candidates`) — click a candidate to see their profile, fit scores, outreach drafts, and status history
5. **Analysis** (`/analysis`) — pick a task, select a candidate + role, hit Run. The app simulates AI output using seed data. Wire up the real AI calls in `lib/ai/fit-analysis.ts` and `lib/ai/outreach.ts` when ready
6. **Settings** (`/settings`) — choose which model handles each AI task; rationale for each default is shown in-app

---

## Theme / Appearance

The app ships with three aesthetic themes. Your preference is saved to localStorage and persists across all pages and sessions.

| Theme | Vibe |
|-------|------|
| **Midnight** (default) | Deep space aesthetic with violet accents |
| **Clean Slate** | Professional light theme with crisp contrasts |
| **Paper & Coffee** | Warm sepia tones, easy on the eyes |

Change themes in **Settings → Appearance**. The switch happens instantly with smooth CSS transitions—no page reload required.

---

## AI Model Configuration

Each AI task uses a different model — configured independently so you can trade off cost vs. quality per task without touching code.

| Task | Default | Why |
|------|---------|-----|
| Fit Analysis | `claude-opus-4-6` | Highest-stakes output; needs careful multi-factor reasoning |
| Technical Brief | `claude-sonnet-4-6` | Fast enough for lookups, smart enough to avoid hallucinating tech concepts |
| Outreach Draft | `claude-sonnet-4-6` | Claude writes more natural outreach than GPT by default |
| Document Parse | `claude-haiku-4-5` | Structured extraction doesn't need frontier intelligence; 5× cheaper |

Override any default via environment variable — no redeploy needed if you use a platform like Vercel:

```env
NEXT_PUBLIC_FIT_ANALYSIS_MODEL=claude-opus-4-6
NEXT_PUBLIC_TECHNICAL_BRIEF_MODEL=claude-sonnet-4-6
NEXT_PUBLIC_OUTREACH_DRAFT_MODEL=claude-sonnet-4-6
NEXT_PUBLIC_DOCUMENT_PARSE_MODEL=claude-haiku-4-5
```

---

## Project structure

```
app/
  (app)/
    dashboard/        # Pipeline overview + action items
    clients/          # Client list + per-client workspace
    candidates/       # Candidate list + detail pages
    roles/[id]/       # Role detail with matched candidates
    analysis/         # AI task runner
    settings/         # Model config, API keys, profile
data/
  seed.ts             # Dummy data — swap for real DB queries when ready
lib/
  supabase/           # Supabase client (browser) + server utilities
  ai/
    config.ts         # Model defaults + MODEL_LABELS registry
    fit-analysis.ts   # Fit analysis prompt builder (stub — wire up AI call here)
    outreach.ts       # Outreach draft prompt builder (stub — wire up AI call here)
  utils.ts            # cn(), formatDate(), status/fit tier display config
types/
  index.ts            # All TypeScript interfaces and type aliases
supabase/
  migrations/
    001_initial_schema.sql   # Full schema with RLS policies
```

---

## What to build next

The boilerplate gives you the full UI shell with seed data. Here's what to wire up to make it production-ready:

### Must-do (to use with real data)
- **Replace seed data with Supabase queries** — each page imports from `@/data/seed`. Swap those for `createClient()` calls using the types already defined in `types/index.ts`
- **Wire up AI task calls** — `lib/ai/fit-analysis.ts` and `lib/ai/outreach.ts` have the prompt builders ready. Add the actual `fetch` / SDK call to your chosen provider
- **Add Supabase Auth** — the RLS policies are already set to `auth.role() = 'authenticated'`. Add a login page and wrap protected routes

### Nice to have
- **Candidate paste form** — a textarea where you paste a LinkedIn profile or resume and it extracts structured data via the Document Parse model
- **JD upload** — upload a PDF/doc job description; parse it into a `Role` record automatically
- **Real outreach status tracking** — mark drafts as approved/sent and log the date
- **Call note ingestion** — paste a Fathom/Granola transcript and extract action items + candidate insights

---

## Deploying to Vercel

```bash
npm i -g vercel
vercel
```

Then add your environment variables in the Vercel project dashboard under **Settings → Environment Variables**. The app will work immediately — seed data doesn't require a database connection.

To go fully live, point `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` at your production Supabase project.

---

## Tech stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | Supabase (PostgreSQL) |
| AI | OpenAI / Anthropic / Google (pluggable) |
| Icons | lucide-react |
| Fonts | Inter + JetBrains Mono |
