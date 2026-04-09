export interface TokenBalanceResult {
  chain: string;
  chainId: number;
  tokenAddress: string;
  symbol: string;
  decimals: number;
  rawBalance: bigint;
  formattedBalance: string;
}

export interface WalletTokenScanResult {
  wallet: string;
  timestamp: string;
  tokens: TokenBalanceResult[];
}
