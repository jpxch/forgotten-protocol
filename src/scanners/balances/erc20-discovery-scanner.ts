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
const DEFAULT_BLOCK_WINDOW = 10_000;

export class Erc20DiscoveryScanner {
  private readonly erc20Interface = new Interface(ERC20_ABI);

  constructor(private readonly providerFactory: ProviderFactory) {}

  public async scan(wallet: string): Promise<WalletTokenScanResult> {
    const normalizedWallet = wallet.toLowerCase();
    const tokens: TokenBalanceResult[] = [];

    for (const chainKey of Object.keys(CHAINS) as ChainKey[]) {
      const chain = CHAINS[chainKey];
      const provider = this.providerFactory.getProvider(chainKey);

      try {
        const latestBlock = await provider.getBlockNumber();

        const startBlock = Math.max(latestBlock - 500_000, 0);

        const discoveredTokenAddresses = await this.discoverTokenContractsForWallet({
          provider,
          wallet: normalizedWallet,
          latestBlock,
          startBlock,
        });

        for (const tokenAddress of discoveredTokenAddresses) {
          try {
            const tokenContract = new Contract(tokenAddress, ERC20_ABI, provider);

            const [rawBalance, symbol, decimals] = await Promise.all([
              tokenContract.balanceOf(wallet) as Promise<bigint>,
              this.safeReadSymbol(tokenContract),
              this.safeReadDecimals(tokenContract),
            ]);

            if (rawBalance <= 0n) {
              continue;
            }

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
            console.error(`Failed token inspection on ${chain.name} for ${tokenAddress}:`, error);
          }
        }
      } catch (error) {
        console.error(`Failed ERC-20 discovery on ${chain.name}:`, error);
      }
    }

    return {
      wallet,
      timestamp: new Date().toISOString(),
      tokens,
    };
  }

  private async discoverTokenContractsForWallet(params: {
    provider: ReturnType<ProviderFactory['getProvider']>;
    wallet: string;
    latestBlock: number;
    startBlock: number;
  }): Promise<string[]> {
    const { provider, wallet, latestBlock } = params;
    const discovered = new Set<string>();
    const transferTopic = this.erc20Interface.getEvent(TRANSFER_EVENT_SIGNATURE)?.topicHash;

    if (!transferTopic) {
      throw new Error('Could not resolve ERC-20 Transfer topic hash');
    }

    let fromBlock = 0;

    while (fromBlock <= latestBlock) {
      const toBlock = Math.min(fromBlock + DEFAULT_BLOCK_WINDOW - 1, latestBlock);

      const incomingLogs = await provider.getLogs({
        fromBlock,
        toBlock,
        topics: [transferTopic, null, this.encodeAddressTopic(wallet)],
      });

      const outgoingLogs = await provider.getLogs({
        fromBlock,
        toBlock,
        topics: [transferTopic, this.encodeAddressTopic(wallet), null],
      });

      this.collectTokenAddresses(discovered, incomingLogs);
      this.collectTokenAddresses(discovered, outgoingLogs);

      fromBlock = toBlock + 1;

      await this.sleep(200);
    }

    discovered.delete(ZeroAddress.toLowerCase());

    return [...discovered];
  }

  private collectTokenAddresses(discovered: Set<string>, logs: Log[]): void {
    for (const log of logs) {
      if (!log.address) {
        continue;
      }

      discovered.add(log.address.toLowerCase());
    }
  }

  private encodeAddressTopic(address: string): string {
    const normalized = address.toLowerCase().replace(/^0x/, '');
    return `0x${normalized.padStart(64, '0')}`;
  }

  private async safeGetLogs(
    provider: ReturnType<ProviderFactory['getProvider']>,
    filter: any,
  ): Promise<Log[]> {
    try {
      return await provider.getLogs(filter);
    } catch (error: any) {
      if (error?.message?.includes('Too Many Requests')) {
        console.warn('Rate limited. Backing off...');
        await this.sleep(1000);
        return [];
      }

      console.error('getLogs failed:', error);
      return [];
    }
  }

  private async safeReadSymbol(tokenContract: Contract): Promise<string> {
    try {
      const symbol = await tokenContract.symbol();
      return typeof symbol === 'string' && symbol.length > 0 ? symbol : 'UNKNOWN';
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
