import { z } from 'zod';

export const OpportunityReviewSchema = z.object({
  opportunityId: z.string().min(1),
  priority: z.enum(['critical', 'high', 'medium', 'low']),
  recommendedAction: z.enum(['execute_now', 'rescan_soon', 'needs_manual_review', 'skip']),
  operatorSummary: z.string().min(1),
  riskFlags: z.array(z.string()),
  confidenceRationale: z.string().min(1),
  executionChecklist: z.array(z.string()),
});

export const opportunityReviewJsonSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    opportunityId: {
      type: 'string',
    },
    priority: {
      type: 'string',
      enum: ['critical', 'high', 'medium', 'low'],
    },
    recommendedAction: {
      type: 'string',
      enum: ['execute_now', 'rescan_soon', 'needs_manual_review', 'skip'],
    },
    operatorSummary: {
      type: 'string',
    },
    riskFlags: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    confidenceRationale: {
      type: 'string',
    },
    executionChecklist: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
  },
  required: [
    'opportunityId',
    'priority',
    'recommendedAction',
    'operatorSummary',
    'riskFlags',
    'confidenceRationale',
    'executionChecklist',
  ],
} as const;
