import type { Candidate, Role, Client, Team, OutreachDraft } from "@/types";
import { getAIConfig } from "./config";

export interface OutreachInput {
  candidate: Candidate;
  role?: Role;
  client: Client;
  team?: Team;
  fitAnalysisSummary?: string;
  additionalContext?: string;
}

/**
 * Generates a tailored outreach draft for a candidate.
 * Produces short angle, long draft, talking points, hooks, and follow-up message.
 *
 * In production, calls an LLM (model set via AI_OUTREACH_DRAFT_MODEL env var).
 * Outputs are always returned as a draft — never auto-sent.
 */
export async function generateOutreachDraft(
  input: OutreachInput
): Promise<Omit<OutreachDraft, "id" | "createdAt" | "updatedAt">> {
  const config = getAIConfig();

  // TODO: Replace with actual LLM call
  throw new Error(
    `Outreach draft generation not yet implemented. Configure ${config.provider} API key in lib/ai/outreach.ts`
  );
}

export function buildOutreachPrompt(input: OutreachInput): string {
  return `You are an expert technical recruiter crafting personalized outreach for a high-value candidate.
The tone should be direct, specific, and non-generic. Reference concrete details from the candidate's background.

CANDIDATE: ${input.candidate.name}
Current: ${input.candidate.currentTitle} at ${input.candidate.currentCompany}
Key experience: ${input.candidate.experience.map((e) => `${e.title} at ${e.company}`).join(", ")}
Notes: ${input.candidate.recruiterNotes ?? "None"}

${input.role ? `ROLE: ${input.role.title} at ${input.client.name}` : `CLIENT: ${input.client.name}`}
${input.team ? `TEAM: ${input.team.name} — ${input.team.description}` : ""}
${input.fitAnalysisSummary ? `FIT CONTEXT: ${input.fitAnalysisSummary}` : ""}

Return JSON with:
- shortAngle: 1-2 sentence hook (why this candidate / why this role)
- longDraft: full personalized outreach message (200-300 words)
- talkingPoints: 4-5 bullets for first call prep
- whyThisTeamNow: 2-3 sentences on why the timing and team are compelling
- candidateHooks: 3-5 specific hooks tailored to this candidate's background
- followUpMessage: short follow-up if no response after 5 days`;
}
