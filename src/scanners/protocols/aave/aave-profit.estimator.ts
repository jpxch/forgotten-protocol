import { AaveLiquidationCandidate, AaveLiquidationEstimate } from './aave-types.js';

export class AaveProfitEstimator {
  public estimate(candidate: AaveLiquidationCandidate): AaveLiquidationEstimate {
    const notes: string[] = [
      'Plaeholder estimate only.',
      'Real Aave reserve pricing is not wired yet.',
      'Real liquidation bonus math is not wired yet.',
      'Real gas estimation is not wired yet.',
      `Candidate inspected at block ${candidate.blockNumber}.`,
    ];

    return {
      estimatedRepayAmmount: '0',
      estimatedColleteralOut: '0',
      estimatedGrossUsd: '0',
      estimatedGasUsd: '0',
      estimatedNetUsd: '0',
      requiresFlashLoan: true,
      flashLoanSource: 'aave-v3',
      Confidence: 0.1,
      notes,
    };
  }
}
