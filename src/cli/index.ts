import 'dotenv/config';
import { WalletScanResult } from '../core/models/balance-result.js';
import { WalletTokenScanResult } from '../core/models/token-balance-result.js';
import { ProviderFactory } from '../core/providers/provider-factory.js';
import { NativeBalanceScanner } from '../scanners/balances/native-balance-scanner.js';
import { Erc20DiscoveryScanner } from '../scanners/balances/erc20-discovery-scanner.js';
import { parseArgs } from './parse-args.js';

async function main(): Promise<void> {
  console.log('Forgotten Protocol CLI starting...');

  const { wallet } = parseArgs(process.argv);

  console.log(`Scanning wallet: ${wallet}\n`);

  const providerFactory = new ProviderFactory();

  const nativeScanner = new NativeBalanceScanner(providerFactory);
  const erc20Scanner = new Erc20DiscoveryScanner(providerFactory);

  const [nativeResult, tokenResult] = await Promise.all([
    nativeScanner.scan(wallet),
    erc20Scanner.scan(wallet),
  ]);

  printNativeResults(nativeResult);
  printTokenResults(tokenResult);
}

function printNativeResults(result: WalletScanResult): void {
  console.log('=== NATIVE BALANCES ===\n');

  for (const balance of result.balances) {
    console.log(`${balance.chain} (${balance.nativeSymbol}) → ${balance.balance}`);
  }

  console.log('\n=======================\n');
}

function printTokenResults(result: WalletTokenScanResult): void {
  console.log('=== DISCOVERED ERC-20 TOKENS ===\n');

  if (result.tokens.length === 0) {
    console.log('No non-zero ERC-20 balances discovered.\n');
    console.log('================================\n');
    return;
  }

  const groupedByChain = groupTokensByChain(result);

  for (const [chain, tokens] of Object.entries(groupedByChain)) {
    console.log(`${chain}`);
    for (const token of tokens) {
      console.log(`  ${token.symbol} (${token.tokenAddress}) → ${token.formattedBalance}`);
    }
    console.log('');
  }

  console.log('================================\n');
}

function groupTokensByChain(
  result: WalletTokenScanResult,
): Record<string, WalletTokenScanResult['tokens']> {
  const grouped: Record<string, WalletTokenScanResult['tokens']> = {};

  for (const token of result.tokens) {
    if (!grouped[token.chain]) {
      grouped[token.chain] = [];
    }

    grouped[token.chain].push(token);
  }

  return grouped;
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
