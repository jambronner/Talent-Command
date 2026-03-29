export type CandidateStatus =
  | "interesting"
  | "outreach_drafted"
  | "outreach_sent"
  | "replied"
  | "screening_booked"
  | "screened"
  | "not_a_fit"
  | "keep_warm";

export type FitTier = "strong" | "good" | "possible" | "weak";

export type SourceType =
  | "gem"
  | "peoplegpt"
  | "pin"
  | "referral"
  | "manual"
  | "linkedin";

export type AIModel =
  | "gpt-5.4"
  | "gpt-5.4-mini"
  | "gpt-5.4-nano"
  | "gpt-4o"
  | "gpt-4o-mini"
  | "claude-opus-4-6"
  | "claude-sonnet-4-6"
  | "claude-haiku-4-5"
  | "claude-3-5-sonnet"
  | "claude-3-haiku"
  | "gemini-1.5-pro"
  | "gemini-1.5-flash";

export interface Client {
  id: string;
  name: string;
  industry: string;
  website?: string;
  logoUrl?: string;
  description: string;
  stage: string;
  headcount: string;
  techStack: string[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Team {
  id: string;
  clientId: string;
  name: string;
  description: string;
  focus: string;
  headcount: number;
  hiringGoals: string;
  techStack: string[];
}

export interface Role {
  id: string;
  clientId: string;
  teamId: string;
  title: string;
  level: string;
  status: "open" | "paused" | "filled" | "cancelled";
  description: string;
  requiredSkills: string[];
  niceToHaveSkills: string[];
  softSkillNotes: string;
  hiringManagerNotes: string;
  salaryRange?: string;
  remote: "remote" | "hybrid" | "onsite";
  location?: string;
  targetStartDate?: string;
  responsibilities?: string[];
  successMetrics?: string[];
  dealBreakers?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CandidateExperience {
  company: string;
  title: string;
  startDate: string;
  endDate?: string;
  description: string;
  technologies: string[];
}

export interface Candidate {
  id: string;
  name: string;
  email?: string;
  linkedinUrl?: string;
  currentTitle: string;
  currentCompany: string;
  location: string;
  yearsOfExperience: number;
  skills: string[];
  experience: CandidateExperience[];
  education: { school: string; degree: string; year: number }[];
  rawProfile?: string;
  recruiterNotes?: string;
  source: SourceType;
  status: CandidateStatus;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CandidateRoleMatch {
  id: string;
  candidateId: string;
  roleId: string;
  fitTier?: FitTier;
  fitScore?: number;
  createdAt: string;
}

export interface FitAnalysis {
  id: string;
  candidateId: string;
  roleId: string;
  fitTier: FitTier;
  fitScore: number;
  topMatchReasons: string[];
  risks: string[];
  unknowns: string[];
  technicalConceptsToLearn: string[];
  suggestedQuestions: string[];
  summary: string;
  model: AIModel;
  createdAt: string;
}

export interface TechnicalBrief {
  id: string;
  candidateId: string;
  roleId: string;
  keyTechnologies: { name: string; relevance: "core" | "supporting" | "adjacent"; explanation: string }[];
  stackAlignmentSummary: string;
  candidateStrengths: string[];
  candidateGaps: string[];
  plainEnglishSummary: string;
  model: AIModel;
  createdAt: string;
}

export interface OutreachDraft {
  id: string;
  candidateId: string;
  roleId?: string;
  clientId?: string;
  shortAngle: string;
  longDraft: string;
  talkingPoints: string[];
  whyThisTeamNow: string;
  candidateHooks: string[];
  followUpMessage: string;
  status: "draft" | "approved" | "sent";
  model: AIModel;
  createdAt: string;
  updatedAt: string;
}

export interface MeetingNote {
  id: string;
  clientId: string;
  title: string;
  date: string;
  attendees: string[];
  rawTranscript?: string;
  summary: string;
  actionItems: string[];
  keyInsights: string[];
  source: "fathom" | "granola" | "manual" | "other";
  createdAt: string;
}

export interface Document {
  id: string;
  clientId: string;
  roleId?: string;
  name: string;
  type: "jd" | "pitch_book" | "org_chart" | "interview_guide" | "other";
  description?: string;
  content?: string;
  fileUrl?: string;
  createdAt: string;
}

export interface ActionItem {
  id: string;
  clientId?: string;
  candidateId?: string;
  roleId?: string;
  text: string;
  dueDate?: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
  createdAt: string;
}

export interface CandidateStatusEvent {
  id: string;
  candidateId: string;
  roleId?: string;
  status: CandidateStatus;
  note?: string;
  createdAt: string;
}

export interface AIConfig {
  fitAnalysisModel: AIModel;
  technicalBriefModel: AIModel;
  outreachDraftModel: AIModel;
  documentParseModel: AIModel;
  provider: "openai" | "anthropic" | "google";
}
