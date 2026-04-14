import { ChainKey } from '../../../core/chains/chains.js';
import { AAVE_PROTOCOL_ID, AaveChainMarketConfig } from './aave-types.js';

const AAVE_MARKETS: Partial<Record<ChainKey, AaveChainMarketConfig>> = {
  ethereum: {
    chain: 'ethereum',
    protocol: AAVE_PROTOCOL_ID,
    label: 'Aave V3 Ethereum',
    addresses: {
      pool: '',
      poolDataProvider: '',
      poolAddressesProvider: '',
      oracle: '',
    },
    reserves: [],
  },
  arbitrum: {
    chain: 'arbitrum',
    protocol: AAVE_PROTOCOL_ID,
    label: 'Aave V3 Arbitrum',
    addresses: {
      pool: '',
      poolDataProvider: '',
      poolAddressesProvider: '',
      oracle: '',
    },
    reserves: [],
  },
  optimism: {
    chain: 'optimism',
    protocol: AAVE_PROTOCOL_ID,
    label: 'Aave V3 Optimism',
    addresses: {
      pool: '',
      poolDataProvider: '',
      poolAddressesProvider: '',
      oracle: '',
    },
    reserves: [],
  },
  base: {
    chain: 'base',
    protocol: AAVE_PROTOCOL_ID,
    label: 'Aave V3 Base',
    addresses: {
      pool: '',
      poolDataProvider: '',
      poolAddressesProvider: '',
      oracle: '',
    },
    reserves: [],
  },
  polygon: {
    chain: 'polygon',
    protocol: AAVE_PROTOCOL_ID,
    label: 'Aave V3 Polygon',
    addresses: {
      pool: '',
      poolDataProvider: '',
      poolAddressesProvider: '',
      oracle: '',
    },
    reserves: [],
  },
};

export function getAaveMarketConfig(chain: ChainKey): AaveChainMarketConfig {
  const config = AAVE_MARKETS[chain];

  if (!config) {
    throw new Error(`No Aave market config found for chain: ${chain}`);
  }

  return config;
}

export function getSupportedAaveChains(): ChainKey[] {
  return Object.keys(AAVE_MARKETS) as ChainKey[];
}
