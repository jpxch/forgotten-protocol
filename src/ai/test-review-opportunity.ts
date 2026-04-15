import { OpportunityReviewEngine } from './review-opportunity.js';
import { Opportunity } from '../core/models/opportunity.js';

async function main(): Promise<void> {
  const engine = new OpportunityReviewEngine();

  const sampleOpportunity: Opportunity = {
    id: 'opp_test_aave_eth_001',
    detectedAt: new Date().toISOString(),
    chain: 'ethereum',
    protocol: 'aave-v3',
    kind: 'liquidation',
    status: 'needs_review',
    targetAccount: '0x1111111111111111111111111111111111111111',
    targetMarket: 'Aave V3 Ethereum',
    debtAssetSymbol: 'USDC',
    debtAssetAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    collateralAssetSymbol: 'WETH',
    collateralAssetAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    estimatedRepayAmount: '25000',
    estimatedCollateralOut: '14.18',
    estimatedGrossUsd: '615.42',
    estimatedGasUsd: '48.13',
    estimatedNetUsd: '567.29',
    requiredFlashLoan: true,
    flashLoanSource: 'aave-v3',
    confidence: 0.72,
    lastCheckedBlock: 22345678,
    notes: [
      'health factor below threshold',
      'placeholder simulation only',
      'oracle freshness not verified',
    ],
  };

  const review = await engine.review(sampleOpportunity);

  console.log(JSON.stringify(review, null, 2));
}

main().catch((error) => {
  console.error('AI review smoke test failed:', error);
  process.exit(1);
});
