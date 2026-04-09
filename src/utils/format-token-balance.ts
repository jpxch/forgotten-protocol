import { formatUnits } from 'ethers';

export function formatTokenBalance(rawBalance: bigint, decimals: number): string {
  return formatUnits(rawBalance, decimals);
}
