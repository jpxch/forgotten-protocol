import 'dotenv/config';
import { ProviderFactory } from '../core/providers/provider-factory.js';

async function main(): Promise<void> {
  console.log('Forgotten Protocol CLI starting...');
  const providerFactory = new ProviderFactory();
  const ethProvider = providerFactory.getProvider('ethereum');
  const blockNumber = await ethProvider.getBlockNumber();
  console.log(`Ethereum latest block: ${blockNumber}`);
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
