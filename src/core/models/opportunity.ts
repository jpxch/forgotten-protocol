import { ChainKey } from '../chains/chains.js';
import { OpportunityKind } from './opportunity-kind.js';
import { OpportunityStatus } from './opportunity-status.js';

export interface Opportunity {
  id: string;
  detectedAt: string;

  chain: ChainKey;
  protocol: string;

  kind: OpportunityKind;
  status: OpportunityStatus;

  targetAccount?: string;
  targetMarket?: string;

  debtAssetSymbol?: string;
  debtAssetAddress?: string;

  collateralAssetSymbol?: string;
  collateralAssetAddress?: string;

  estimatedRepayAmount?: string;
  estimatedCollateralOut?: string;

  estimatedGrossUsd: string;
  estimatedGasUsd: string;
  estimatedNetUsd: string;

  requiredFlashLoan: boolean;
  flashLoanSource?: string;

  confidence: number;
  lastCheckedBlock: number;

  notes: string[];
}
