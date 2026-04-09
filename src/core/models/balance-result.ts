export interface ChainBalanceResult {
  chain: string;
  chainId: number;
  nativeSymbol: string;
  balance: string;
  rawBalance: bigint;
}

export interface WalletScanResult {
  wallet: string;
  timestamp: string;
  balances: ChainBalanceResult[];
}
