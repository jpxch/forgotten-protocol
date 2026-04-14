import { ChainKey } from '../../../core/chains/chains.js';

export const AAVE_PROTOCOL_ID = 'aave-v3' as const;

export type AaveProtocolId = typeof AAVE_PROTOCOL_ID;

export interface AavePoolAddresses {
  pool: string;
  poolDataProvider?: string;
  poolAddressesProvider?: string;
  oracle?: string;
}

export interface AaveReserveConfig {
  symbol: string;
  assetAddress: string;
  decimals: number;
}

export interface AaveChainMarketConfig {
  chain: ChainKey;
  protocol: AaveProtocolId;
  label: string;
  addresses: AavePoolAddresses;
  reserves: AaveReserveConfig[];
}

export interface AaveLiquidationCandidate {
  chain: ChainKey;
  user: string;
  debtAssetAddress: string;
  collateralAssetAddress: string;
  healthFactor: string;
  blockNumber: number;
}

export interface AaveLiquidationEstimate {
  estimatedRepayAmmount: string;
  estimatedColleteralOut: string;
  estimatedGrossUsd: string;
  estimatedGasUsd: string;
  estimatedNetUsd: string;
  requiresFlashLoan: boolean;
  flashLoanSource?: string;
  Confidence: number;
  notes: string[];
}
