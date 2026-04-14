export const OPPORTUNITY_PRIORITIES = ['critical', 'high', 'medium', 'low'] as const;

export type OpportunityPriority = (typeof OPPORTUNITY_PRIORITIES)[number];

export const OPPORTUNITY_RECOMMENDED_ACTIONS = [
  'exexute_now',
  'rescan_soon',
  'needs_manual_review',
  'skip',
] as const;

export type OpportunityRecommendedAction = (typeof OPPORTUNITY_RECOMMENDED_ACTIONS)[number];

export interface OpportunityReview {
  opportunityId: string;
  priority: OpportunityPriority;
  recommendedAction: OpportunityRecommendedAction;
  operatorSummary: string;
  riskFlags: string[];
  confidenceRationale: string;
  executionChecklist: string[];
}
