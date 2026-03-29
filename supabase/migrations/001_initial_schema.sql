-- ============================================================
-- Dave Talent Tool — Initial Schema
-- ============================================================

create extension if not exists "uuid-ossp";

-- Clients
create table clients (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  industry text,
  website text,
  logo_url text,
  description text,
  stage text,
  headcount text,
  tech_stack text[] default '{}',
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Teams
create table teams (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid references clients(id) on delete cascade,
  name text not null,
  description text,
  focus text,
  headcount integer default 0,
  hiring_goals text,
  tech_stack text[] default '{}'
);

-- Roles
create table roles (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid references clients(id) on delete cascade,
  team_id uuid references teams(id) on delete set null,
  title text not null,
  level text,
  status text check (status in ('open','paused','filled','cancelled')) default 'open',
  description text,
  required_skills text[] default '{}',
  nice_to_have_skills text[] default '{}',
  soft_skill_notes text,
  hiring_manager_notes text,
  salary_range text,
  remote text check (remote in ('remote','hybrid','onsite')) default 'hybrid',
  location text,
  target_start_date date,
  responsibilities text[] default '{}',
  success_metrics text[] default '{}',
  deal_breakers text[] default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Candidates
create table candidates (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text,
  linkedin_url text,
  current_title text,
  current_company text,
  location text,
  years_of_experience integer,
  skills text[] default '{}',
  experience jsonb default '[]',
  education jsonb default '[]',
  raw_profile text,
  recruiter_notes text,
  source text,
  status text default 'interesting',
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Candidate ↔ Role matches
create table candidate_role_matches (
  id uuid primary key default uuid_generate_v4(),
  candidate_id uuid references candidates(id) on delete cascade,
  role_id uuid references roles(id) on delete cascade,
  fit_tier text check (fit_tier in ('strong','good','possible','weak')),
  fit_score integer check (fit_score between 0 and 100),
  created_at timestamptz default now(),
  unique (candidate_id, role_id)
);

-- Fit analyses (AI output)
create table fit_analyses (
  id uuid primary key default uuid_generate_v4(),
  candidate_id uuid references candidates(id) on delete cascade,
  role_id uuid references roles(id) on delete cascade,
  fit_tier text,
  fit_score integer,
  top_match_reasons text[] default '{}',
  risks text[] default '{}',
  unknowns text[] default '{}',
  technical_concepts_to_learn text[] default '{}',
  suggested_questions text[] default '{}',
  summary text,
  model text,
  created_at timestamptz default now()
);

-- Technical briefs (AI output)
create table technical_briefs (
  id uuid primary key default uuid_generate_v4(),
  candidate_id uuid references candidates(id) on delete cascade,
  role_id uuid references roles(id) on delete cascade,
  key_technologies jsonb default '[]',
  stack_alignment_summary text,
  candidate_strengths text[] default '{}',
  candidate_gaps text[] default '{}',
  plain_english_summary text,
  model text,
  created_at timestamptz default now()
);

-- Outreach drafts (AI output)
create table outreach_drafts (
  id uuid primary key default uuid_generate_v4(),
  candidate_id uuid references candidates(id) on delete cascade,
  role_id uuid references roles(id),
  client_id uuid references clients(id),
  short_angle text,
  long_draft text,
  talking_points text[] default '{}',
  why_this_team_now text,
  candidate_hooks text[] default '{}',
  follow_up_message text,
  status text check (status in ('draft','approved','sent')) default 'draft',
  model text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Meeting notes
create table meeting_notes (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid references clients(id) on delete cascade,
  title text not null,
  date date,
  attendees text[] default '{}',
  raw_transcript text,
  summary text,
  action_items text[] default '{}',
  key_insights text[] default '{}',
  source text,
  created_at timestamptz default now()
);

-- Documents
create table documents (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid references clients(id) on delete cascade,
  role_id uuid references roles(id),
  name text not null,
  type text,
  description text,
  content text,
  file_url text,
  created_at timestamptz default now()
);

-- Action items
create table action_items (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid references clients(id),
  candidate_id uuid references candidates(id),
  role_id uuid references roles(id),
  text text not null,
  due_date date,
  completed boolean default false,
  priority text check (priority in ('high','medium','low')) default 'medium',
  created_at timestamptz default now()
);

-- Candidate status history
create table candidate_status_events (
  id uuid primary key default uuid_generate_v4(),
  candidate_id uuid references candidates(id) on delete cascade,
  role_id uuid references roles(id),
  status text not null,
  note text,
  created_at timestamptz default now()
);

-- ============================================================
-- RLS: enable on all tables, simple owner policy scaffold
-- ============================================================
alter table clients enable row level security;
alter table teams enable row level security;
alter table roles enable row level security;
alter table candidates enable row level security;
alter table candidate_role_matches enable row level security;
alter table fit_analyses enable row level security;
alter table technical_briefs enable row level security;
alter table outreach_drafts enable row level security;
alter table meeting_notes enable row level security;
alter table documents enable row level security;
alter table action_items enable row level security;
alter table candidate_status_events enable row level security;

-- Permissive dev policy (lock down per-user in production)
create policy "Allow all for authenticated" on clients for all using (auth.role() = 'authenticated');
create policy "Allow all for authenticated" on teams for all using (auth.role() = 'authenticated');
create policy "Allow all for authenticated" on roles for all using (auth.role() = 'authenticated');
create policy "Allow all for authenticated" on candidates for all using (auth.role() = 'authenticated');
create policy "Allow all for authenticated" on candidate_role_matches for all using (auth.role() = 'authenticated');
create policy "Allow all for authenticated" on fit_analyses for all using (auth.role() = 'authenticated');
create policy "Allow all for authenticated" on technical_briefs for all using (auth.role() = 'authenticated');
create policy "Allow all for authenticated" on outreach_drafts for all using (auth.role() = 'authenticated');
create policy "Allow all for authenticated" on meeting_notes for all using (auth.role() = 'authenticated');
create policy "Allow all for authenticated" on documents for all using (auth.role() = 'authenticated');
create policy "Allow all for authenticated" on action_items for all using (auth.role() = 'authenticated');
create policy "Allow all for authenticated" on candidate_status_events for all using (auth.role() = 'authenticated');
