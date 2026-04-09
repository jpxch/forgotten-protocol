export type ChainKey = 'ethereum' | 'arbitrum' | 'optimism' | 'base' | 'polygon';

export interface ChainConfig {
  key: ChainKey;
  chainId: number;
  name: string;
  nativeCurrency: string;
}

export const CHAINS: Record<ChainKey, ChainConfig> = {
  ethereum: {
    key: 'ethereum',
    chainId: 1,
    name: 'Ethereum',
    nativeCurrency: 'ETH',
  },
  arbitrum: {
    key: 'arbitrum',
    chainId: 42161,
    name: 'Arbitrum',
    nativeCurrency: 'ETH',
  },
  optimism: {
    key: 'optimism',
    chainId: 10,
    name: 'Optimism',
    nativeCurrency: 'ETH',
  },
  base: {
    key: 'base',
    chainId: 8453,
    name: 'Base',
    nativeCurrency: 'ETH',
  },
  polygon: {
    key: 'polygon',
    chainId: 137,
    name: 'Polygon',
    nativeCurrency: 'MATIC',
  },
};
