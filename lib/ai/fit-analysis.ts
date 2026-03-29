import type { Candidate, Role, Client, Team, FitAnalysis, AIModel } from "@/types";
import { getAIConfig } from "./config";

export interface FitAnalysisInput {
  candidate: Candidate;
  role: Role;
  client: Client;
  team: Team;
  additionalContext?: string;
}

/**
 * Generates a fit analysis for a candidate against a role.
 *
 * In production, this calls an LLM (model determined by AI_FIT_ANALYSIS_MODEL env var).
 * The prompt should include: candidate profile, role requirements, client/team context.
 * Returns structured output parsed from the model response.
 */
export async function runFitAnalysis(
  input: FitAnalysisInput
): Promise<Omit<FitAnalysis, "id" | "createdAt">> {
  const config = getAIConfig();

  // TODO: Replace with actual LLM call
  // Suggested prompt structure:
  //   System: "You are an expert technical recruiter evaluating candidate-role fit..."
  //   User: `Candidate: ${JSON.stringify(input.candidate)}
  //          Role: ${JSON.stringify(input.role)}
  //          Team context: ${JSON.stringify(input.team)}
  //          Client context: ${JSON.stringify(input.client)}
  //          ${input.additionalContext ?? ''}`
  // Expected output: JSON matching FitAnalysis schema

  throw new Error(
    `Fit analysis not yet implemented. Configure ${config.provider} API key and implement LLM call in lib/ai/fit-analysis.ts`
  );
}

export function buildFitAnalysisPrompt(input: FitAnalysisInput): string {
  return `You are an expert technical recruiter evaluating candidate-role fit. 
Analyze the following candidate against the role and return a structured JSON fit analysis.

CANDIDATE:
Name: ${input.candidate.name}
Current: ${input.candidate.currentTitle} at ${input.candidate.currentCompany}
Experience: ${input.candidate.yearsOfExperience} years
Skills: ${input.candidate.skills.join(", ")}
Experience Summary:
${input.candidate.experience.map((e) => `- ${e.title} at ${e.company}: ${e.description}`).join("\n")}
Recruiter Notes: ${input.candidate.recruiterNotes ?? "None"}

ROLE: ${input.role.title} (${input.role.level})
Team: ${input.team.name}
Required Skills: ${input.role.requiredSkills.join(", ")}
Nice-to-haves: ${input.role.niceToHaveSkills.join(", ")}
Soft Skill Notes: ${input.role.softSkillNotes}
Hiring Manager Notes: ${input.role.hiringManagerNotes}

CLIENT: ${input.client.name}
Stack: ${input.client.techStack.join(", ")}
Stage: ${input.client.stage}

${input.additionalContext ? `ADDITIONAL CONTEXT:\n${input.additionalContext}` : ""}

Return JSON with: fitTier ("strong"|"good"|"possible"|"weak"), fitScore (0-100), 
topMatchReasons[], risks[], unknowns[], technicalConceptsToLearn[], suggestedQuestions[], summary.`;
}

export type { AIModel };
