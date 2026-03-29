import type { AIModel } from "@/types";

/**
 * AI task configuration — each task can use a different model,
 * enabling cheap-vs-smart trade-offs per operation.
 * All values are driven by environment variables so they can be
 * swapped without touching application code.
 */
export interface AITaskConfig {
  fitAnalysisModel: AIModel;
  technicalBriefModel: AIModel;
  outreachDraftModel: AIModel;
  documentParseModel: AIModel;
  callNoteParseModel: AIModel;
  provider: "openai" | "anthropic" | "google";
}

export function getAIConfig(): AITaskConfig {
  return {
    provider: (process.env.AI_PROVIDER as AITaskConfig["provider"]) ?? "anthropic",
    fitAnalysisModel:
      (process.env.AI_FIT_ANALYSIS_MODEL as AIModel) ?? "claude-opus-4-6",
    technicalBriefModel:
      (process.env.AI_TECHNICAL_BRIEF_MODEL as AIModel) ?? "claude-sonnet-4-6",
    outreachDraftModel:
      (process.env.AI_OUTREACH_DRAFT_MODEL as AIModel) ?? "claude-sonnet-4-6",
    documentParseModel:
      (process.env.AI_DOCUMENT_PARSE_MODEL as AIModel) ?? "claude-haiku-4-5",
    callNoteParseModel:
      (process.env.AI_CALL_NOTE_PARSE_MODEL as AIModel) ?? "claude-haiku-4-5",
  };
}

export const MODEL_LABELS: Record<AIModel, string> = {
  // OpenAI — current generation
  "gpt-5.4": "GPT-5.4",
  "gpt-5.4-mini": "GPT-5.4 Mini",
  "gpt-5.4-nano": "GPT-5.4 Nano",
  // OpenAI — previous generation (still widely used)
  "gpt-4o": "GPT-4o",
  "gpt-4o-mini": "GPT-4o Mini",
  // Anthropic — current generation
  "claude-opus-4-6": "Claude Opus 4.6",
  "claude-sonnet-4-6": "Claude Sonnet 4.6",
  "claude-haiku-4-5": "Claude Haiku 4.5",
  // Anthropic — previous generation (still in use)
  "claude-3-5-sonnet": "Claude 3.5 Sonnet",
  "claude-3-haiku": "Claude 3 Haiku",
  // Google
  "gemini-1.5-pro": "Gemini 1.5 Pro",
  "gemini-1.5-flash": "Gemini 1.5 Flash",
};
