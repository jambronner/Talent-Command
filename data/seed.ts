import type {
  Client,
  Team,
  Role,
  Candidate,
  CandidateRoleMatch,
  FitAnalysis,
  OutreachDraft,
  MeetingNote,
  Document,
  ActionItem,
  TechnicalBrief,
} from "@/types";

export const SEED_CLIENTS: Client[] = [
  {
    id: "client-1",
    name: "Meridian AI",
    industry: "Enterprise AI / Data Infrastructure",
    website: "https://meridian.ai",
    description:
      "Series B AI company building the next-generation data infrastructure layer for enterprise AI workloads. They help Fortune 500 companies move from prototype to production AI at scale.",
    stage: "Series B ($48M raised)",
    headcount: "120–140",
    techStack: [
      "Python",
      "Rust",
      "Kubernetes",
      "Apache Flink",
      "Kafka",
      "Postgres",
      "dbt",
      "Ray",
      "PyTorch",
    ],
    notes:
      "Very engineering-driven culture. CEO is ex-Databricks. They value depth over breadth. Hiring bar is high — they want people who've operated at scale before, not just built things.",
    createdAt: "2024-11-01T09:00:00Z",
    updatedAt: "2025-01-15T14:30:00Z",
  },
];

export const SEED_TEAMS: Team[] = [
  {
    id: "team-1",
    clientId: "client-1",
    name: "Platform Engineering",
    description:
      "Owns the core data pipeline orchestration layer, developer experience tooling, and the internal deployment platform. Supports 50+ ML engineers.",
    focus: "Developer tooling, pipeline orchestration, internal platform",
    headcount: 18,
    hiringGoals:
      "Adding 3–4 senior/staff ICs this quarter. Need people who've built internal developer platforms, ideally at a company with 200+ engineers. Strong systems thinking required.",
    techStack: [
      "Python",
      "Rust",
      "Kubernetes",
      "Terraform",
      "ArgoCD",
      "Apache Flink",
      "Kafka",
    ],
  },
  {
    id: "team-2",
    clientId: "client-1",
    name: "ML Infrastructure",
    description:
      "Responsible for training infrastructure, model serving, experiment tracking, and the feature store. Heavy collaboration with research and product teams.",
    focus: "Training infra, model serving, feature store, experiment tracking",
    headcount: 12,
    hiringGoals:
      "Looking for 2 senior ML Engineers with strong infra instincts. Ray, Triton, or vLLM experience a strong plus. Need people who can straddle the infra/research boundary.",
    techStack: [
      "Python",
      "Ray",
      "PyTorch",
      "CUDA",
      "Triton",
      "vLLM",
      "MLflow",
      "Postgres",
    ],
  },
];

export const SEED_ROLES: Role[] = [
  {
    id: "role-1",
    clientId: "client-1",
    teamId: "team-1",
    title: "Staff Software Engineer – Platform",
    level: "Staff / IC6",
    status: "open",
    description:
      "Lead architect-level contributor on the Platform Engineering team. Own the design and delivery of foundational platform capabilities used by 50+ ML engineers. Drive technical strategy for the internal developer platform.",
    requiredSkills: [
      "Distributed systems",
      "Python",
      "Kubernetes",
      "System design at scale",
      "API design",
      "Mentorship",
    ],
    niceToHaveSkills: [
      "Rust",
      "Apache Flink",
      "Kafka",
      "Prior internal developer platform experience",
      "Open source contributions",
    ],
    softSkillNotes:
      "Hiring manager (Priya) values strong written communication, ability to influence without authority, and low ego. Has passed on candidates who are technically strong but overly opinionated about tech choices.",
    hiringManagerNotes:
      "Priya (VP Eng) is looking for someone with deep conviction who can work with ambiguity. She runs a tight process: phone screen → system design → values interview → offer. Typical timeline is 3 weeks.",
    salaryRange: "$280K–$340K OTE (SF-adjusted)",
    remote: "hybrid",
    createdAt: "2024-12-01T09:00:00Z",
    updatedAt: "2025-01-10T11:00:00Z",
  },
  {
    id: "role-2",
    clientId: "client-1",
    teamId: "team-1",
    title: "Senior Software Engineer – Backend Platform",
    level: "Senior / IC5",
    status: "open",
    description:
      "Build and maintain the core backend services and APIs that power Meridian's data pipeline orchestration layer. Work closely with the Staff Engineer and ML teams to ship high-quality, high-performance infrastructure.",
    requiredSkills: [
      "Python",
      "Distributed systems",
      "REST/gRPC API design",
      "Databases",
      "Cloud infrastructure (AWS/GCP)",
    ],
    niceToHaveSkills: [
      "Kafka",
      "Apache Flink",
      "Rust",
      "Kubernetes operator development",
    ],
    softSkillNotes:
      "Team works async-first. Need someone who communicates proactively in writing and can drive projects independently. Strong preference for candidates who've worked on 0→1 internal tools.",
    hiringManagerNotes:
      "Thomas (Eng Manager) is collaborative, low drama. Looking for doers who ship without needing detailed specs. Prefers candidates who have shipped something real — startup or at a large company but with real ownership.",
    salaryRange: "$220K–$265K OTE",
    remote: "remote",
    createdAt: "2024-12-15T09:00:00Z",
    updatedAt: "2025-01-12T14:00:00Z",
  },
  {
    id: "role-3",
    clientId: "client-1",
    teamId: "team-2",
    title: "Senior ML Engineer – Infrastructure",
    level: "Senior / IC5",
    status: "open",
    description:
      "Build and scale the model training and serving infrastructure that supports Meridian's core product. Work on training job orchestration, model optimization, and the feature store pipeline. Need someone who can operate at the intersection of research and systems engineering.",
    requiredSkills: [
      "Python",
      "PyTorch",
      "Distributed training",
      "Model serving",
      "MLOps",
    ],
    niceToHaveSkills: [
      "Ray",
      "vLLM",
      "Triton",
      "CUDA optimization",
      "Feature store design",
      "LLM fine-tuning",
    ],
    softSkillNotes:
      "Team culture is research-adjacent — intellectual curiosity matters. Needs to be comfortable with less-defined problems. Candidates who've been purely ops-focused (infra but no ML understanding) haven't worked well.",
    hiringManagerNotes:
      "Emily (ML Infra Lead) has a strong opinions on architecture and will push back in interviews. Treat it as collaborative — she wants to see how candidates think through trade-offs, not just recite answers.",
    salaryRange: "$230K–$275K OTE",
    remote: "hybrid",
    createdAt: "2025-01-05T09:00:00Z",
    updatedAt: "2025-01-15T10:00:00Z",
  },
];

export const SEED_CANDIDATES: Candidate[] = [
  {
    id: "candidate-1",
    name: "Anya Sharma",
    email: "anya.sharma@gmail.com",
    linkedinUrl: "https://linkedin.com/in/anyasharma",
    currentTitle: "Staff Software Engineer",
    currentCompany: "Stripe",
    location: "San Francisco, CA",
    yearsOfExperience: 9,
    skills: [
      "Python",
      "Go",
      "Kubernetes",
      "Distributed systems",
      "API design",
      "Terraform",
      "Kafka",
      "PostgreSQL",
      "gRPC",
    ],
    experience: [
      {
        company: "Stripe",
        title: "Staff Software Engineer",
        startDate: "2021-03",
        description:
          "Tech lead for Stripe's internal developer platform team. Led design and delivery of the job orchestration system now used by 200+ engineers. Mentored 5 senior engineers.",
        technologies: ["Go", "Kubernetes", "Kafka", "Terraform", "PostgreSQL"],
      },
      {
        company: "Lyft",
        title: "Senior Software Engineer",
        startDate: "2018-06",
        endDate: "2021-03",
        description:
          "Backend engineer on the data infrastructure team. Built real-time event pipeline processing 4B+ events/day using Flink and Kafka.",
        technologies: ["Python", "Java", "Apache Flink", "Kafka", "AWS"],
      },
      {
        company: "Palantir",
        title: "Software Engineer",
        startDate: "2015-08",
        endDate: "2018-06",
        description:
          "Worked on data integration pipelines for government clients. Heavy Python and distributed systems work.",
        technologies: ["Python", "Java", "Spark", "Postgres"],
      },
    ],
    education: [
      {
        school: "Carnegie Mellon University",
        degree: "B.S. Computer Science",
        year: 2015,
      },
    ],
    recruiterNotes:
      "Strong technical fit for Staff Platform role. Motivated by technical challenge and team quality over comp. Currently exploring due to Stripe reorg. Prefers hybrid. Wants to be in a smaller company where she can have more impact. No hard deadline.",
    source: "linkedin",
    status: "outreach_drafted",
    createdAt: "2025-01-10T10:00:00Z",
    updatedAt: "2025-01-14T09:30:00Z",
  },
  {
    id: "candidate-2",
    name: "Marcus Webb",
    email: "mwebb@proton.me",
    linkedinUrl: "https://linkedin.com/in/marcuswebb",
    currentTitle: "Senior Software Engineer",
    currentCompany: "Databricks",
    location: "Remote (Austin, TX)",
    yearsOfExperience: 7,
    skills: [
      "Python",
      "Scala",
      "Spark",
      "Kubernetes",
      "Delta Lake",
      "Airflow",
      "dbt",
      "AWS",
      "Terraform",
    ],
    experience: [
      {
        company: "Databricks",
        title: "Senior Software Engineer",
        startDate: "2020-05",
        description:
          "Backend engineer on the Delta Lake team. Works on transaction log design and merge operations. Ships OSS contributions regularly.",
        technologies: ["Scala", "Python", "Spark", "Delta Lake", "AWS"],
      },
      {
        company: "Stitch Data (acq. by Talend)",
        title: "Software Engineer",
        startDate: "2017-09",
        endDate: "2020-05",
        description:
          "Built data connectors and the core ETL pipeline runtime. Worked on the job scheduler and retry logic.",
        technologies: ["Python", "PostgreSQL", "Airflow", "Docker"],
      },
    ],
    education: [
      {
        school: "University of Texas at Austin",
        degree: "B.S. Electrical Engineering",
        year: 2017,
      },
    ],
    recruiterNotes:
      "Solid data eng background. Less platform engineering DNA than Anya but strong data systems instinct. Good match for Senior Backend Platform role. Fully remote. Comp expectations around $240K total.",
    source: "gem",
    status: "interesting",
    createdAt: "2025-01-12T14:00:00Z",
    updatedAt: "2025-01-12T14:00:00Z",
  },
  {
    id: "candidate-3",
    name: "Priscila Fuentes",
    email: "pfuentes@mit.edu",
    linkedinUrl: "https://linkedin.com/in/prifuentes",
    currentTitle: "ML Engineer",
    currentCompany: "OpenAI",
    location: "San Francisco, CA",
    yearsOfExperience: 5,
    skills: [
      "Python",
      "PyTorch",
      "CUDA",
      "Triton",
      "Ray",
      "vLLM",
      "Distributed training",
      "Model optimization",
      "RLHF",
    ],
    experience: [
      {
        company: "OpenAI",
        title: "ML Engineer",
        startDate: "2022-07",
        description:
          "Worked on training infrastructure for GPT-4 and subsequent models. Focused on distributed training optimization and CUDA kernel performance. Co-authored internal paper on training efficiency.",
        technologies: ["Python", "PyTorch", "CUDA", "Triton", "Ray", "AWS"],
      },
      {
        company: "MIT CSAIL",
        title: "Research Engineer",
        startDate: "2020-09",
        endDate: "2022-06",
        description:
          "Research engineer on distributed ML systems. Co-authored two papers on efficient transformer training.",
        technologies: ["Python", "PyTorch", "MPI", "CUDA"],
      },
    ],
    education: [
      {
        school: "MIT",
        degree: "M.S. Computer Science (ML Systems)",
        year: 2022,
      },
      { school: "MIT", degree: "B.S. Computer Science", year: 2020 },
    ],
    recruiterNotes:
      "Exceptional ML infra background. Strong research pedigree. Exploring for the first time in 3 years — says she wants to build something that ships to customers vs. internal research infra. Warm on Meridian's mission. Salary expectations TBD.",
    source: "referral",
    status: "screening_booked",
    createdAt: "2025-01-08T11:00:00Z",
    updatedAt: "2025-01-15T08:00:00Z",
  },
  {
    id: "candidate-4",
    name: "Jordan Kim",
    email: "jkim.eng@gmail.com",
    linkedinUrl: "https://linkedin.com/in/jordankim-eng",
    currentTitle: "Senior Backend Engineer",
    currentCompany: "Figma",
    location: "New York, NY",
    yearsOfExperience: 6,
    skills: [
      "TypeScript",
      "Python",
      "Rust",
      "PostgreSQL",
      "Redis",
      "gRPC",
      "Kubernetes",
      "AWS",
    ],
    experience: [
      {
        company: "Figma",
        title: "Senior Backend Engineer",
        startDate: "2021-01",
        description:
          "Worked on the multiplayer sync backend — Figma's real-time collaboration engine. Owned Rust-based CRDT implementation and latency optimization work.",
        technologies: ["Rust", "TypeScript", "PostgreSQL", "Redis", "AWS"],
      },
      {
        company: "Robinhood",
        title: "Software Engineer",
        startDate: "2018-06",
        endDate: "2021-01",
        description:
          "Backend engineer on the trading platform. Worked on order routing and settlement systems with strict latency SLAs.",
        technologies: ["Python", "Django", "PostgreSQL", "Kafka", "Redis"],
      },
    ],
    education: [
      { school: "Cornell University", degree: "B.S. Computer Science", year: 2018 },
    ],
    recruiterNotes:
      "Very strong Rust + systems background. Not a data/ML systems person but excellent distributed systems fundamentals. Could work well for the Senior Backend Platform role. NYC-based — open to remote or occasional hybrid travel. Exploring passively.",
    source: "peoplegpt",
    status: "interesting",
    createdAt: "2025-01-13T16:00:00Z",
    updatedAt: "2025-01-13T16:00:00Z",
  },
  {
    id: "candidate-5",
    name: "Tariq Hassan",
    email: "tariq.hassan@gmail.com",
    linkedinUrl: "https://linkedin.com/in/tariqhassan-ml",
    currentTitle: "Machine Learning Engineer",
    currentCompany: "Meta (FAIR)",
    location: "Menlo Park, CA",
    yearsOfExperience: 8,
    skills: [
      "Python",
      "PyTorch",
      "CUDA",
      "Ray",
      "MLflow",
      "Feature engineering",
      "Model serving",
      "Distributed training",
      "C++",
    ],
    experience: [
      {
        company: "Meta (FAIR)",
        title: "Machine Learning Engineer",
        startDate: "2019-03",
        description:
          "ML Engineer embedded with the FAIR research team. Responsible for training infrastructure, experiment tracking, and model deployment for research models. Led migration from legacy training cluster to Ray-based distributed training.",
        technologies: ["Python", "PyTorch", "Ray", "CUDA", "C++", "MLflow"],
      },
      {
        company: "Twitter",
        title: "Senior ML Engineer",
        startDate: "2016-07",
        endDate: "2019-03",
        description:
          "Built the feature store and real-time prediction serving layer for Twitter's recommendation system.",
        technologies: ["Python", "Scala", "Kafka", "Cassandra", "TensorFlow"],
      },
    ],
    education: [
      {
        school: "Stanford University",
        degree: "M.S. Computer Science (AI track)",
        year: 2016,
      },
      {
        school: "UC San Diego",
        degree: "B.S. Computer Engineering",
        year: 2014,
      },
    ],
    recruiterNotes:
      "Excellent ML Infra candidate. Deep Ray experience and feature store background maps directly to Meridian ML Infra team. Has worked at research lab scale (FAIR) so understands the ambiguous problem space. Motivated by impact and team quality. Currently unhappy with Meta layoffs/reorg. Potentially fast mover.",
    source: "manual",
    status: "outreach_sent",
    createdAt: "2025-01-07T09:00:00Z",
    updatedAt: "2025-01-14T12:00:00Z",
  },
];

export const SEED_CANDIDATE_ROLE_MATCHES: CandidateRoleMatch[] = [
  { id: "match-1", candidateId: "candidate-1", roleId: "role-1", fitTier: "strong", fitScore: 92, createdAt: "2025-01-10T10:00:00Z" },
  { id: "match-2", candidateId: "candidate-2", roleId: "role-2", fitTier: "good", fitScore: 74, createdAt: "2025-01-12T14:00:00Z" },
  { id: "match-3", candidateId: "candidate-3", roleId: "role-3", fitTier: "strong", fitScore: 95, createdAt: "2025-01-08T11:00:00Z" },
  { id: "match-4", candidateId: "candidate-4", roleId: "role-2", fitTier: "good", fitScore: 78, createdAt: "2025-01-13T16:00:00Z" },
  { id: "match-5", candidateId: "candidate-5", roleId: "role-3", fitTier: "strong", fitScore: 89, createdAt: "2025-01-07T09:00:00Z" },
  { id: "match-6", candidateId: "candidate-1", roleId: "role-2", fitTier: "good", fitScore: 71, createdAt: "2025-01-10T10:00:00Z" },
];

export const SEED_FIT_ANALYSES: FitAnalysis[] = [
  {
    id: "analysis-1",
    candidateId: "candidate-1",
    roleId: "role-1",
    fitTier: "strong",
    fitScore: 92,
    topMatchReasons: [
      "Current Staff-level IC at Stripe working on internal developer platform — exact domain match",
      "Led delivery of job orchestration system at Stripe used by 200+ engineers — directly analogous to what Meridian's platform team needs to scale",
      "Apache Flink + Kafka experience at Lyft maps to Meridian's core pipeline stack",
      "9 years experience, 4 at Staff level — right seniority for this role",
      "Has mentored senior engineers — cultural fit with team's mentorship expectations",
    ],
    risks: [
      "Stripe is a larger, more mature engineering org — Meridian is earlier stage and less defined; may find the ambiguity frustrating",
      "Go-first at Stripe, Python-first at Meridian — minor but worth checking comfort level",
    ],
    unknowns: [
      "Comfort level with Rust (Meridian is moving some core services to Rust)",
      "Hybrid requirement — she prefers hybrid but SF-based so should be fine",
      "Actual comp expectations vs. posted range",
    ],
    technicalConceptsToLearn: [
      "Apache Flink stateful stream processing — Flink uses 'checkpointed state' for fault-tolerant streaming; Stripe uses Kafka Streams which is simpler",
      "Kubernetes Operators — a pattern for extending Kubernetes with custom controllers; Meridian uses this heavily",
      "ArgoCD — GitOps CD tool Meridian uses; different mental model than Stripe's internal deploy system",
    ],
    suggestedQuestions: [
      "Tell me about the Stripe job orchestration system — what were the hardest distributed systems problems you had to solve?",
      "How did you handle the tension between platform reliability and rapid feature development for your internal users?",
      "What's your experience with Kubernetes operator development?",
      "How do you approach technical influence without direct authority?",
    ],
    summary:
      "Anya is an exceptional match for the Staff Platform role. Her experience leading Stripe's internal developer platform at a similar scale is directly analogous. The main watch-outs are the earlier-stage ambiguity at Meridian and her current Go proficiency vs. Python/Rust. High conviction on moving her forward.",
    model: "claude-3-5-sonnet",
    createdAt: "2025-01-14T10:00:00Z",
  },
  {
    id: "analysis-2",
    candidateId: "candidate-5",
    roleId: "role-3",
    fitTier: "strong",
    fitScore: 89,
    topMatchReasons: [
      "Led migration from legacy training cluster to Ray at Meta FAIR — directly maps to Meridian ML Infra's Ray-first training infrastructure",
      "Built feature store at Twitter — Meridian ML team is actively building their feature store",
      "8 years experience across ML Infra at Twitter and Meta — right seniority",
      "Research-adjacent experience at FAIR means he understands how to work with less-defined, research-driven problems",
      "PyTorch + CUDA + distributed training trifecta is exactly what Emily (ML Infra Lead) is looking for",
    ],
    risks: [
      "Meta layoffs may make him eager to move fast — could also get competitive offers quickly; needs to be moved through process efficiently",
    ],
    unknowns: [
      "vLLM / Triton experience — not on LinkedIn but worth asking; he has CUDA depth so likely has exposure",
      "Salary expectations — Meta comp tends to be high; could push beyond posted range",
    ],
    technicalConceptsToLearn: [
      "vLLM — inference optimization framework for LLMs; uses PagedAttention for memory efficiency; Triton is used to write custom CUDA kernels for it",
      "Meridian's feature store architecture — worth asking about their current vs. Twitter's Cassandra-backed store",
      "The difference between FAIR-scale training (foundational research) vs. product ML (applied, with real-time constraints)",
    ],
    suggestedQuestions: [
      "Walk me through the Ray migration at Meta — what was the hardest part of the transition and how did you manage backward compatibility?",
      "How did you design the Twitter feature store — what were the latency requirements and how did you ensure consistency?",
      "What's your experience with vLLM or Triton for inference optimization?",
      "Meridian sits between research and product — how do you like operating in that in-between space?",
    ],
    summary:
      "Tariq is one of the strongest ML Infra candidates in the pipeline. His Ray migration work at Meta and feature store experience at Twitter map directly to Meridian's current build-out priorities. Given his motivation (Meta reorg) and strong background, prioritize scheduling the screen quickly before he gets competitive offers.",
    model: "claude-3-5-sonnet",
    createdAt: "2025-01-14T11:30:00Z",
  },
];

export const SEED_OUTREACH_DRAFTS: OutreachDraft[] = [
  {
    id: "outreach-1",
    candidateId: "candidate-1",
    roleId: "role-1",
    clientId: "client-1",
    shortAngle:
      "Your Stripe dev platform work is a direct match for a Staff Platform role at a Series B AI company where you'd own the platform layer used by 50+ ML engineers.",
    longDraft: `Hi Anya,

I came across your work on Stripe's internal developer platform and wanted to reach out directly — what you've built there is exactly the problem space I'm looking for someone to own at one of my clients.

Meridian AI is a Series B company ($48M raised) building the data infrastructure layer for enterprise AI workloads. Their Platform Engineering team supports 50+ ML engineers and is at a pivotal moment — scaling from a scrappy internal platform to something more robust. The Staff Platform role would have you leading the design of foundational systems (think job orchestration, internal APIs, deployment infrastructure) with real technical ownership and architectural latitude.

Given your background leading Stripe's job orchestration system and your experience with Kafka/Flink at Lyft, you'd hit the ground running on both the technical and cultural dimensions here. The team is small, high-caliber, and engineering-driven — Priya (VP Eng) specifically wants someone who can influence without authority and operates with high autonomy.

Happy to share more context — including the hiring manager nuance and what's made candidates successful there so far. Would a 20-minute call this week work?`,
    talkingPoints: [
      "Meridian's platform team supports 50+ ML engineers — analogous scale to Stripe but earlier stage with more ownership",
      "CEO is ex-Databricks — engineering-first culture, high bar, moves deliberately",
      "Priya (VP Eng) values written communication and influence over authority — aligns with Anya's Stripe profile",
      "Apache Flink + Kafka stack is consistent with her Lyft background",
      "SF hybrid — no relocation, flexible schedule",
    ],
    whyThisTeamNow:
      "Meridian is at the inflection point where internal tooling either becomes a competitive moat or a liability. The Staff Platform hire is the person who decides which way it goes. Early enough to shape the architecture, funded enough to actually build it.",
    candidateHooks: [
      "The job orchestration work at Stripe is directly analogous — she'd be doing v2 of something she's already proven she can build",
      "Smaller company means her name is on the architecture, not buried in a team of 50",
      "Priya has a reputation for sponsoring technical leaders — growth path to Principal or Eng Director",
      "Team works hybrid in SF — no forced relocations or painful commutes",
    ],
    followUpMessage: `Hi Anya, just following up on my note from last week. Still think this is worth a quick conversation — the timing at Meridian is particularly good right now and I have some hiring manager context that isn't in the JD. Let me know if a 15-minute call works.`,
    status: "draft",
    model: "claude-3-5-sonnet",
    createdAt: "2025-01-14T10:30:00Z",
    updatedAt: "2025-01-14T10:30:00Z",
  },
];

export const SEED_MEETING_NOTES: MeetingNote[] = [
  {
    id: "note-1",
    clientId: "client-1",
    title: "Kickoff call with Priya (VP Eng) + Thomas (EM, Platform)",
    date: "2025-01-06",
    attendees: ["Priya Mehta (VP Eng)", "Thomas Andersson (EM)", "Recruiter"],
    summary:
      "Kickoff for Q1 hiring. Meridian is moving fast on their platform scaling effort. Priya was direct: they've had two failed hires in the Staff Platform role in the past year — both technically strong but couldn't navigate the ambiguity. She wants someone who's operated in a scrappy environment before, not just big-tech polish. Thomas echoed that — he wants people who write good docs and communicate proactively.",
    actionItems: [
      "Source Staff Platform candidates with internal dev platform experience (NOT just big-tech infra)",
      "Identify candidates with Apache Flink or Kafka backgrounds from data companies",
      "Send Priya 3–5 profiles by Jan 15",
      "Schedule debrief after first batch of screens",
    ],
    keyInsights: [
      "Priya has passed on 2 previous Staff candidates for being 'too corporate' — need scrappier profiles",
      "Written communication is a non-negotiable — they do async design reviews",
      "Rust is listed as nice-to-have but Priya said 'anyone hired at Staff level should want to learn it within 6 months'",
      "Process is tight: phone screen → system design (2hr) → values interview → offer. No committee review.",
      "Budget is flexible for the right Staff candidate — the $280–340K range can stretch",
    ],
    source: "fathom",
    createdAt: "2025-01-06T17:00:00Z",
  },
  {
    id: "note-2",
    clientId: "client-1",
    title: "Emily intro call – ML Infra team context",
    date: "2025-01-09",
    attendees: ["Emily Tran (ML Infra Lead)", "Recruiter"],
    summary:
      "Emily runs the ML Infra team and is leading the search for 2 Senior ML Engineers. She was very specific about what hasn't worked: ops-focused infrastructure engineers who don't understand ML concepts. She wants people who have shipped model training pipelines, not just managed Kubernetes clusters for model serving.",
    actionItems: [
      "Focus ML Infra sourcing on people who've done hands-on distributed training work (not just MLOps tooling)",
      "Ask candidates about specific training jobs they've owned — size, frequency, failure modes",
      "Deprioritize pure MLOps/platform candidates for this role",
    ],
    keyInsights: [
      "Emily has a rigorous technical interview — she will ask candidates to design a distributed training system from scratch",
      "She values intellectual honesty — candidates who say 'I don't know' do better than those who bullshit",
      "Ray is a genuine differentiator — she said 'I can teach the rest, I can't teach someone to think in distributed abstractions'",
      "vLLM experience is a bonus but not required — she mentioned it twice so it's clearly aspirational",
      "Culture note: the ML Infra team is tight-knit, collaborative, low-drama. No rock stars.",
    ],
    source: "fathom",
    createdAt: "2025-01-09T15:30:00Z",
  },
];

export const SEED_DOCUMENTS: Document[] = [
  {
    id: "doc-1",
    clientId: "client-1",
    roleId: "role-1",
    name: "Staff Platform Engineer – Full JD",
    type: "jd",
    description: "Full job description as shared by Thomas",
    content:
      "Staff Software Engineer, Platform Engineering\n\nMeridian AI is looking for a Staff Software Engineer to join our Platform Engineering team...\n[Full JD content would be stored here]",
    createdAt: "2025-01-06T10:00:00Z",
  },
  {
    id: "doc-2",
    clientId: "client-1",
    name: "Meridian AI – Company Pitch Deck (Series B)",
    type: "pitch_book",
    description: "Investor pitch deck — useful for explaining company mission and traction to candidates",
    content: "[Pitch deck content would be extracted and stored here]",
    createdAt: "2025-01-06T10:30:00Z",
  },
];

export const SEED_ACTION_ITEMS: ActionItem[] = [
  {
    id: "action-1",
    clientId: "client-1",
    candidateId: "candidate-1",
    text: "Send Anya Sharma outreach draft for review before sending",
    dueDate: "2025-01-16",
    completed: false,
    priority: "high",
    createdAt: "2025-01-14T10:30:00Z",
  },
  {
    id: "action-2",
    clientId: "client-1",
    candidateId: "candidate-5",
    text: "Schedule screening call with Tariq Hassan — move fast, competitive market",
    dueDate: "2025-01-16",
    completed: false,
    priority: "high",
    createdAt: "2025-01-14T11:30:00Z",
  },
  {
    id: "action-3",
    clientId: "client-1",
    candidateId: "candidate-3",
    text: "Prep screening questions for Priscila Fuentes call — confirmed for Jan 17",
    dueDate: "2025-01-17",
    completed: false,
    priority: "high",
    createdAt: "2025-01-15T08:00:00Z",
  },
  {
    id: "action-4",
    clientId: "client-1",
    text: "Send Priya (VP Eng) second batch of Staff Platform profiles by Jan 20",
    dueDate: "2025-01-20",
    completed: false,
    priority: "medium",
    createdAt: "2025-01-06T17:00:00Z",
  },
  {
    id: "action-5",
    clientId: "client-1",
    candidateId: "candidate-2",
    text: "Run fit analysis for Marcus Webb against Senior Backend Platform role",
    dueDate: "2025-01-18",
    completed: false,
    priority: "medium",
    createdAt: "2025-01-12T14:00:00Z",
  },
];

export const SEED_TECHNICAL_BRIEF: TechnicalBrief = {
  id: "brief-1",
  candidateId: "candidate-1",
  roleId: "role-1",
  keyTechnologies: [
    {
      name: "Apache Flink",
      relevance: "core",
      explanation:
        "Flink is a stateful stream processing engine. Unlike Kafka Streams (which Anya used at Stripe), Flink operates on a distributed runtime with checkpointed state — think of it like a database that processes continuous streams. Meridian uses it for their core data pipeline orchestration. Anya's Lyft experience with Flink is highly relevant here.",
    },
    {
      name: "Kubernetes Operators",
      relevance: "core",
      explanation:
        "Kubernetes Operators extend K8s with custom controllers for application-specific logic. Instead of manually managing deployments, an Operator watches for custom resource definitions and reconciles state. Meridian uses operators to orchestrate Flink jobs and pipeline components. Anya has K8s experience but may not have built operators — worth probing.",
    },
    {
      name: "ArgoCD",
      relevance: "supporting",
      explanation:
        "ArgoCD is a GitOps continuous delivery tool for Kubernetes. It syncs application state in K8s with what's defined in a Git repo. Meridian uses this for all deployments. Different mental model from Stripe's internal deploy system but Anya should pick it up quickly.",
    },
    {
      name: "Kafka",
      relevance: "supporting",
      explanation:
        "Distributed event streaming platform. Anya has direct Kafka experience from Lyft (4B+ events/day). Meridian uses it as the backbone of their real-time data pipeline. This is a strength, not a gap.",
    },
  ],
  stackAlignmentSummary:
    "Anya's background aligns strongly with Meridian's stack. She has direct experience with Kafka and K8s at scale, and prior Flink experience from Lyft. The main technical gap is Kubernetes Operator development and Rust — both can be learned on the job.",
  candidateStrengths: [
    "Kafka expertise from Lyft — 4B events/day pipeline work is exactly the scale Meridian operates at",
    "Kubernetes administration and architecture at Stripe and Lyft",
    "Job orchestration system design — her Stripe work is the most direct analog to what Meridian is building",
  ],
  candidateGaps: [
    "Kubernetes Operator development (her K8s experience is as a user/admin, not an operator author)",
    "Rust — listed as nice-to-have but Staff-level candidates are expected to ramp within 6 months",
    "No direct ArgoCD experience mentioned — minor, it's learnable",
  ],
  plainEnglishSummary:
    "Anya understands the core building blocks of Meridian's stack. She's used Kafka at serious scale (bigger than Meridian today), she's run Kubernetes infrastructure, and she's built the type of job orchestration system that Meridian needs to scale. The gap is in Kubernetes Operators — a more advanced K8s pattern — and Rust. Neither is a dealbreaker at hire; they're ramp items. You can confidently tell her this is a 'build on what you know' role, not a 'learn from scratch' role.",
  model: "claude-3-5-sonnet",
  createdAt: "2025-01-14T10:15:00Z",
};
