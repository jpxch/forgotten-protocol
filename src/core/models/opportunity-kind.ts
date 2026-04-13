export const OPPORTUNITY_KINDS = [
  'liquidation',
  'discounted_collateral',
  'keeper_reward',
  'settlement_reward',
  'claim_helper_fee',
] as const;

export type OpportunityKind = (typeof OPPORTUNITY_KINDS)[number];
