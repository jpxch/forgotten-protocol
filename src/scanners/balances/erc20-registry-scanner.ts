import { Contract } from 'ethers';
import { TOKEN_REGISTRY } from '../../config/token-registry.js';
import { ERC20_ABI } from '../../core/abi/erc20.js';
import { CHAINS, ChainKey } from '../../core/chains/chains.js';
import {
  TokenBalanceResult,
  WalletTokenScanResult
} from '../../core/models/token-balance-result.js';
import { ProviderFactory } from '../../core/providers/provider-factory.js';
import { formatTokenBalance } from '../../utils/format-token-balance.js';

export class Erc20RegistryScanner {
  constructor(private readonly providerFactory: ProviderFactory) {}

  public async scan(wallet: string): Promise<WalletTokenScanResult> {
    const tokens: TokenBalanceResult[] = [];

    for (const chainKey of Object.keys(CHAINS) as ChainKey[]) {
      const chain = CHAINS[chainKey];
      const provider = this.providerFactory.getProvider(chainKey);
      const registryEntries = TOKEN_REGISTRY[chainKey];

      for (const entry of registryEntries) {
        try {
          const tokenContract = new Contract(entry.address, ERC20_ABI, provider);
          const rawBalance = (await tokenContract.balanceOf(wallet)) as bigint;

          if (rawBalance <= 0n) {
            continue;
          }

          tokens.push({
            chain: chain.name,
            chainId: chain.chainId,
            tokenAddress: entry.address,
            symbol: entry.symbol,
            decimals: entry.decimals,
            rawBalance,
            formattedBalance: formatTokenBalance(rawBalance, entry.decimals)
          });
        } catch (error) {
          console.error(
            `Failed token balance lookup on ${chain.name} for ${entry.symbol} (${entry.address}):`,
            error
          );
        }
      }
    }

    return {
      wallet,
      timestamp: new Date().toISOString(),
      tokens
    };
  }
}