import { Contract, Interface, Log, ZeroAddress } from 'ethers';
import { ERC20_ABI } from '../../core/abi/erc20.js';
import { CHAINS, ChainKey } from '../../core/chains/chains.js';
import {
  TokenBalanceResult,
  WalletTokenScanResult,
} from '../../core/models/token-balance-result.js';
import { ProviderFactory } from '../../core/providers/provider-factory.js';
import { formatTokenBalance } from '../../utils/format-token-balance.js';

const TRANSFER_EVENT_SIGNATURE = 'Transfer(address,address,uint256)';
const DEFAULT_BLOCK_WINDOW = 2_000;

export class Erc20DiscoveryScanner {
  private readonly erc20Interface = new Interface(ERC20_ABI);

  constructor(private readonly providerFactory: ProviderFactory) {}

  public async scan(wallet: string): Promise<WalletTokenScanResult> {
    const normalizedWallet = wallet.toLowerCase();
    const tokens: TokenBalanceResult[] = [];

    for (const chainKey of Object.keys(CHAINS) as ChainKey[]) {
      const chain = CHAINS[chainKey];

      const providerPrimary = this.providerFactory.getProvider(chainKey);
      const providerFallback = this.providerFactory.getFallbackProvider(chainKey);

      try {
        const latestBlock = await providerPrimary.getBlockNumber();

        const startBlock = Math.max(latestBlock - 50_000, 0);

        const discoveredTokenAddresses =
          await this.discoverTokenContractsForWallet({
            providerPrimary,
            providerFallback,
            wallet: normalizedWallet,
            latestBlock,
            startBlock,
          });

        for (const tokenAddress of discoveredTokenAddresses) {
          try {
            const tokenContract = new Contract(
              tokenAddress,
              ERC20_ABI,
              providerPrimary
            );

            const [rawBalance, symbol, decimals] = await Promise.all([
              tokenContract.balanceOf(wallet) as Promise<bigint>,
              this.safeReadSymbol(tokenContract),
              this.safeReadDecimals(tokenContract),
            ]);

            if (rawBalance <= 0n) continue;

            tokens.push({
              chain: chain.name,
              chainId: chain.chainId,
              tokenAddress,
              symbol,
              decimals,
              rawBalance,
              formattedBalance: formatTokenBalance(rawBalance, decimals),
            });
          } catch (error) {
            console.error(
              `Failed token inspection on ${chain.name} for ${tokenAddress}:`,
              error
            );
          }
        }
      } catch (error) {
        console.error(`Failed ERC-20 discovery on ${chain.name}:`, error);
      }

      // 🔥 Chain-level delay (VERY IMPORTANT)
      await this.sleep(1500);
    }

    return {
      wallet,
      timestamp: new Date().toISOString(),
      tokens,
    };
  }

  private async discoverTokenContractsForWallet(params: {
    providerPrimary: ReturnType<ProviderFactory['getProvider']>;
    providerFallback: ReturnType<ProviderFactory['getProvider']>;
    wallet: string;
    latestBlock: number;
    startBlock: number;
  }): Promise<string[]> {
    const { providerPrimary, providerFallback, wallet, latestBlock, startBlock } = params;

    const discovered = new Set<string>();

    const transferTopic =
      this.erc20Interface.getEvent(TRANSFER_EVENT_SIGNATURE)?.topicHash;

    if (!transferTopic) {
      throw new Error('Could not resolve ERC-20 Transfer topic hash');
    }

    let fromBlock = startBlock;

    while (fromBlock <= latestBlock) {
      const toBlock = Math.min(
        fromBlock + DEFAULT_BLOCK_WINDOW - 1,
        latestBlock
      );

      const incomingLogs = await this.safeGetLogsWithFallback(
        providerPrimary,
        providerFallback,
        {
          fromBlock,
          toBlock,
          topics: [
            transferTopic,
            null,
            this.encodeAddressTopic(wallet),
          ],
        }
      );

      const outgoingLogs = await this.safeGetLogsWithFallback(
        providerPrimary,
        providerFallback,
        {
          fromBlock,
          toBlock,
          topics: [
            transferTopic,
            this.encodeAddressTopic(wallet),
            null,
          ],
        }
      );

      this.collectTokenAddresses(discovered, incomingLogs);
      this.collectTokenAddresses(discovered, outgoingLogs);

      fromBlock = toBlock + 1;

      // 🔥 Request-level delay
      await this.sleep(500);
    }

    discovered.delete(ZeroAddress.toLowerCase());

    return [...discovered];
  }

  private collectTokenAddresses(
    discovered: Set<string>,
    logs: Log[]
  ): void {
    for (const log of logs) {
      if (!log.address) continue;
      discovered.add(log.address.toLowerCase());
    }
  }

  private encodeAddressTopic(address: string): string {
    const normalized = address.toLowerCase().replace(/^0x/, '');
    return `0x${normalized.padStart(64, '0')}`;
  }

  private async safeGetLogsWithFallback(
    primary: ReturnType<ProviderFactory['getProvider']>,
    fallback: ReturnType<ProviderFactory['getProvider']>,
    filter: any
  ): Promise<Log[]> {
    try {
      return await primary.getLogs(filter);
    } catch (error: any) {
      if (error?.message?.includes('Too Many Requests')) {
        console.warn('⚠️ Primary rate limited → switching to fallback');
        await this.sleep(500);

        try {
          return await fallback.getLogs(filter);
        } catch (fallbackError) {
          console.error('Fallback also failed:', fallbackError);
          return [];
        }
      }

      console.error('getLogs failed:', error);
      return [];
    }
  }

  private async safeReadSymbol(tokenContract: Contract): Promise<string> {
    try {
      const symbol = await tokenContract.symbol();
      return typeof symbol === 'string' && symbol.length > 0
        ? symbol
        : 'UNKNOWN';
    } catch {
      return 'UNKNOWN';
    }
  }

  private async safeReadDecimals(tokenContract: Contract): Promise<number> {
    try {
      const decimals = await tokenContract.decimals();
      return Number(decimals);
    } catch {
      return 18;
    }
  }

  private async sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}