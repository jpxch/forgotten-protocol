import { Opportunity } from './opportunity.js';
import { OpportunityReview } from './opportunity-review.js';

export interface ReviewedOpportunity {
  opportunity: Opportunity;
  review: OpportunityReview | null;
}
