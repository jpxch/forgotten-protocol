import { ProviderFactory } from '../core/providers/provider-factory.js';
import { ReviewedOpportunity } from '../core/models/reviewed-opportunity.js';
import { reviewOpportunityIfEnabled } from '../ai/review-opportunity-if-enabled.js';
import { AaveLiquidationScanner } from '../scanners/protocols/aave/aave-liquidation-scanner.js';
import { getSupportedAaveChains } from '../scanners/protocols/aave/aave-market-config.js';

export async function runOpportunityScan(): Promise<void> {
  console.log('Forgotten Protocol opportunity scan starting...\n');

  const providerFactory = new ProviderFactory();
  const aaveScanner = new AaveLiquidationScanner(providerFactory);

  const reviewedResults: ReviewedOpportunity[] = [];

  for (const chain of getSupportedAaveChains()) {
    const result = await aaveScanner.scan({ chain });

    console.log(
      `[${result.protocol}] ${result.chain} @ block ${result.scannedBlock} -> ${result.opportunities.length} opportunities`,
    );

    for (const opportunity of result.opportunities) {
      const review = await reviewOpportunityIfEnabled(opportunity);

      reviewedResults.push({
        opportunity,
        review,
      });
    }
  }

  console.log('');

  if (reviewedResults.length === 0) {
    console.log(
      'No opportunities returned yet. The Aave opportunity path is wired, but real detection logic is still placeholder.\n',
    );
    return;
  }

  printReviewedOpportunities(reviewedResults);
}

function printReviewedOpportunities(reviewedResults: ReviewedOpportunity[]): void {
  console.log('=== REVIEWED OPPORTUNITIES ===\n');

  for (const item of reviewedResults) {
    const { opportunity, review } = item;

    console.log(
      `[${opportunity.protocol}] ${opportunity.chain} ${opportunity.kind} -> ${opportunity.status}`,
    );
    console.log(` Opportunity ID: ${opportunity.id}`);
    console.log(` Estimated Net USD: ${opportunity.estimatedNetUsd}`);
    console.log(` Confidence: ${opportunity.confidence}`);

    if (review) {
      console.log(` AI Priority: ${review.priority}`);
      console.log(` AI Action: ${review.recommendedAction}`);
      console.log(` AI Summary: ${review.operatorSummary}`);
    } else {
      console.log(' AI Review: not available');
    }

    console.log('');
  }

  console.log('===============================\n');
}
