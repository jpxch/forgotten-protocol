import { env } from '../config/env.js';
import { Opportunity } from '../core/models/opportunity.js';
import { OpportunityReview } from '../core/models/opportunity-review.js';
import { OpportunityReviewEngine } from './review-opportunity.js';

let reviewEngine: OpportunityReviewEngine | null = null;

function getReviewEngine(): OpportunityReviewEngine {
  if (!reviewEngine) {
    reviewEngine = new OpportunityReviewEngine();
  }

  return reviewEngine;
}

export async function reviewOpportunityIfEnabled(
  opportunity: Opportunity,
): Promise<OpportunityReview | null> {
  if (!env.OPENAI_API_KEY) {
    return null;
  }

  return getReviewEngine().review(opportunity);
}
