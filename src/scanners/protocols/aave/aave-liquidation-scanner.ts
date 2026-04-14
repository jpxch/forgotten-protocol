import { ProviderFactory } from '../../../core/providers/provider-factory.js';
import { ChainKey } from '../../../core/chains/chains.js';
import { Opportunity } from '../../../core/models/opportunity.js';
import { AAVE_PROTOCOL_ID } from './aave-types.js';
import {
  ProtocolOpportunityScanRequest,
  ProtocolOpportunityScanResult,
  ProtocolOpportunityScanner,
} from '../protocol-opportunity-scanner.js';

export class AaveLiquidationScanner implements ProtocolOpportunityScanner {
  constructor(private readonly providerFactory: ProviderFactory) {}

  public async scan(
    request: ProtocolOpportunityScanRequest,
  ): Promise<ProtocolOpportunityScanResult> {
    this.assertSupportedChain(request.chain);

    const provider = this.providerFactory.getProvider(request.chain);
    const scannedBlock = request.blockTag ?? (await provider.getBlockNumber());

    const opportunities: Opportunity[] = [];

    return {
      protocol: AAVE_PROTOCOL_ID,
      chain: request.chain,
      scannedAt: new Date().toISOString(),
      scannedBlock,
      opportunities,
    };
  }

  private assertSupportedChain(chain: ChainKey): void {
    const supportedChains: ChainKey[] = ['ethereum', 'arbitrum', 'optimism', 'base', 'polygon'];

    if (!supportedChains.includes(chain)) {
      throw new Error(`Aave liquidation scanner does not support chain: ${chain}`);
    }
  }
}
