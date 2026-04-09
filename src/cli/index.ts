import 'dotenv/config';
import { ProviderFactory } from '../core/providers/provider-factory.js';
import { NativeBalanceScanner } from '../scanners/balances/native-balance-scanner.js';
import { parseArgs } from './parse-args.js';

async function main(): Promise<void> {
  console.log('Forgotten Protocol CLI starting...');

  const { wallet } = parseArgs(process.argv);

  console.log(`Scanning wallet: ${wallet}\n`);

  const providerFactory = new ProviderFactory();
  const scanner = new NativeBalanceScanner(providerFactory);

  const result = await scanner.scan(wallet);

  printResults(result);
}

function printResults(result: any): void {
  console.log('=== WALLET SCAN RESULT ===\n');

  for (const balance of result.balances) {
    console.log(`${balance.chain} (${balance.nativeSymbol}) → ${balance.balance}`);
  }

  console.log('\n==========================\n');
}

main().catch((error) => {
  console.error('Fatal error:', error.message);
  process.exit(1);
});
