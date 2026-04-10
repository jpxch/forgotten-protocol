import { JsonRpcProvider } from 'ethers';
import { env } from '../../config/env.js';
import { ChainKey, CHAINS } from '../chains/chains.js';

interface ProviderSet {
  primary: JsonRpcProvider;
  fallback: JsonRpcProvider;
}

export class ProviderFactory {
  private providers: Map<ChainKey, ProviderSet> = new Map();

  constructor() {
    this.initialize();
  }

  private initialize(): void {
    for (const chainKey of Object.keys(CHAINS) as ChainKey[]) {
      const primaryUrl = this.getPrimaryRpc(chainKey);
      const fallbackUrl = this.getFallbackRpc(chainKey);

      const primary = new JsonRpcProvider(primaryUrl);
      const fallback = new JsonRpcProvider(fallbackUrl);

      this.providers.set(chainKey, { primary, fallback });
    }
  }

  private getPrimaryRpc(chain: ChainKey): string {
    switch (chain) {
      case 'ethereum':
        return env.RPC_URL_ETHEREUM_PRIMARY;
      case 'arbitrum':
        return env.RPC_URL_ARBITRUM_PRIMARY;
      case 'base':
        return env.RPC_URL_BASE_PRIMARY;
      case 'optimism':
        return env.RPC_URL_OPTIMISM_PRIMARY;
      case 'polygon':
        return env.RPC_URL_POLYGON_PRIMARY;
    }
  }

  private getFallbackRpc(chain: ChainKey): string {
    switch (chain) {
      case 'ethereum':
        return env.RPC_URL_ETHEREUM_FALLBACK;
      case 'arbitrum':
        return env.RPC_URL_ARBITRUM_FALLBACK;
      case 'base':
        return env.RPC_URL_BASE_FALLBACK;
      case 'optimism':
        return env.RPC_URL_OPTIMISM_FALLBACK;
      case 'polygon':
        return env.RPC_URL_POLYGON_FALLBACK;
    }
  }

  public getProvider(chain: ChainKey): JsonRpcProvider {
    const providerSet = this.providers.get(chain);

    if (!providerSet) {
      throw new Error(`Provider not found for chain: ${chain}`);
    }

    return providerSet.primary;
  }

  public getFallbackProvider(chain: ChainKey): JsonRpcProvider {
    const providerSet = this.providers.get(chain);

    if (!providerSet) {
      throw new Error(`Provider not found for chain: ${chain}`);
    }

    return providerSet.fallback;
  }
}
