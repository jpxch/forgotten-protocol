import { CHAINS, ChainKey } from '../core/chains/chains.js';
import { ProtocolOpportunityScanResult } from '../scanners/protocols/protocol-opportunity-scanner.js';

export async function runOpportunityScan(): Promise<void> {
  console.log('Opportunity scanning is not wired yet.\n');

  const supportedChains = Object.keys(CHAINS) as ChainKey[];

  console.log('supported chains for future protocol scans:');
  for (const chainKey of supportedChains) {
    const chain = CHAINS[chainKey];
    console.log(`- ${chain.name} (${chain.key})`);
  }

  const placeholderResult: ProtocolOpportunityScanResult = {
    protocol: 'placeholder',
    chain: 'ethereum',
    scannedAt: new Date().toISOString(),
    scannedBlock: 0,
    opportunities: [],
  };

  console.log('\nPlaceholder result shape ready:');
  console.log(JSON.stringify(placeholderResult, null, 2));
}
