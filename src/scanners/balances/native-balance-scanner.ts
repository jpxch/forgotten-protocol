import { formatEther } from 'ethers';
import { ProviderFactory } from '../../core/providers/provider-factory.js';
import { CHAINS, ChainKey } from '../../core/chains/chains.js';
import { ChainBalanceResult, WalletScanResult } from '../../core/models/balance-result.js';

export class NativeBalanceScanner {
  constructor(private providerFactory: ProviderFactory) {}

  public async scan(wallet: string): Promise<WalletScanResult> {
    const balances: ChainBalanceResult[] = [];

    for (const chainKey of Object.keys(CHAINS) as ChainKey[]) {
      const chain = CHAINS[chainKey];
      const provider = this.providerFactory.getProvider(chainKey);

      try {
        const rawBalance = await provider.getBalance(wallet);
        const formatted = formatEther(rawBalance);

        balances.push({
          chain: chain.name,
          chainId: chain.chainId,
          nativeSymbol: chain.nativeCurrency,
          balance: formatted,
          rawBalance,
        });
      } catch (error) {
        console.error(`Error scanning ${chain.name}:`, error);
      }
    }

    return {
      wallet,
      timestamp: new Date().toISOString(),
      balances,
    };
  }
}
