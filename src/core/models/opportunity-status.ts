export const OPPORTUNITY_STATUSES = [
  'ready',
  'skip',
  'stale',
  'needs_review',
  'unprofitable',
  'simulation_failed',
] as const;

export type OpportunityStatus = (typeof OPPORTUNITY_STATUSES)[number];
