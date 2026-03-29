import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { CandidateStatus, FitTier } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatRelativeDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return formatDate(dateStr);
}

export const STATUS_CONFIG: Record<
  CandidateStatus,
  { label: string; color: string; bgColor: string }
> = {
  interesting: {
    label: "Interesting",
    color: "text-blue-400",
    bgColor: "bg-blue-400/10 border-blue-400/20",
  },
  outreach_drafted: {
    label: "Draft Ready",
    color: "text-amber-400",
    bgColor: "bg-amber-400/10 border-amber-400/20",
  },
  outreach_sent: {
    label: "Outreach Sent",
    color: "text-violet-400",
    bgColor: "bg-violet-400/10 border-violet-400/20",
  },
  replied: {
    label: "Replied",
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/10 border-cyan-400/20",
  },
  screening_booked: {
    label: "Screen Booked",
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10 border-emerald-400/20",
  },
  screened: {
    label: "Screened",
    color: "text-green-400",
    bgColor: "bg-green-400/10 border-green-400/20",
  },
  not_a_fit: {
    label: "Not a Fit",
    color: "text-zinc-500",
    bgColor: "bg-zinc-500/10 border-zinc-500/20",
  },
  keep_warm: {
    label: "Keep Warm",
    color: "text-orange-400",
    bgColor: "bg-orange-400/10 border-orange-400/20",
  },
};

export const FIT_TIER_CONFIG: Record<
  FitTier,
  { label: string; color: string; bgColor: string; scoreColor: string }
> = {
  strong: {
    label: "Strong Fit",
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10 border-emerald-400/20",
    scoreColor: "text-emerald-400",
  },
  good: {
    label: "Good Fit",
    color: "text-blue-400",
    bgColor: "bg-blue-400/10 border-blue-400/20",
    scoreColor: "text-blue-400",
  },
  possible: {
    label: "Possible Fit",
    color: "text-amber-400",
    bgColor: "bg-amber-400/10 border-amber-400/20",
    scoreColor: "text-amber-400",
  },
  weak: {
    label: "Weak Fit",
    color: "text-zinc-500",
    bgColor: "bg-zinc-500/10 border-zinc-500/20",
    scoreColor: "text-zinc-500",
  },
};

export const SOURCE_LABELS: Record<string, string> = {
  gem: "GEM",
  peoplegpt: "PeopleGPT",
  pin: "PIN",
  referral: "Referral",
  manual: "Manual",
  linkedin: "LinkedIn",
};
