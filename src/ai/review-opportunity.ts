import OpenAI from 'openai';
import { env } from '../config/env.js';
import { Opportunity } from '../core/models/opportunity.js';
import { OpportunityReview } from '../core/models/opportunity-review.js';
import {
  OpportunityReviewSchema,
  opportunityReviewJsonSchema,
} from './opportunity-review-schema.js';

const REVIEW_INSTRUCTIONS = `
You are the operator analyst for Forgotten Protocols.

You review only permissionless onchain opportunities.
Do not treat user-owned dormant funds as valid targets.
You are not the source of truth for onchain state.
The source of truth is the deterministic scanner payload you receive.

Your job:
- assign priority
- recommend an action
- summarize the opportunity for a human operator
- list risk flags
- explain your reasoning
- produce a concise execution checklist

Be skeptical.
If the opportunity looks incomplete, fragile, stale, unprofitable, or underspecified, downgrade it.
Do not invent protocol facts that are not present in the payload.
`;

export class OpportunityReviewEngine {
  private readonly client: OpenAI;

  constructor(client?: OpenAI) {
    if (!env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is required to use OpportunityReviewEngine');
    }

    this.client =
      client ??
      new OpenAI({
        apiKey: env.OPENAI_API_KEY,
      });
  }

  public async review(opportunity: Opportunity): Promise<OpportunityReview> {
    const response = await this.client.responses.create({
      model: env.OPENAI_REVIEW_MODEL,
      instructions: REVIEW_INSTRUCTIONS,
      input: this.buildReviewInput(opportunity),
      text: {
        format: {
          type: 'json_schema',
          name: 'opportunity_review',
          strict: true,
          schema: opportunityReviewJsonSchema,
        },
      },
    });

    if (!response.output_text) {
      throw new Error('OpenAI returned empty output_text');
    }

    const parsed = JSON.parse(response.output_text);

    return OpportunityReviewSchema.parse(parsed);
  }

  private buildReviewInput(opportunity: Opportunity): string {
    return [
      'Review the following permissionless opportunity payload.',
      'Return a structured operator review.',
      '',
      JSON.stringify(opportunity, null, 2),
    ].join('\n');
  }
}
