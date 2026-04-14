import { ChainKey } from '../../../core/chains/chains.js';
import { ProviderFactory } from '../../../core/providers/provider-factory.js';
import { getAaveMarketConfig } from './aave-market-config.js';

export interface AaveHealthCheckResult {
  chain: ChainKey;
  checkedAt: string;
  blockNumber: number;
  isConfigComplete: boolean;
  reserveCount: number;
  missingFields: string[];
  notes: string[];
}

export class AaveHealthCheck {
  constructor(private readonly providerFactory: ProviderFactory) {}

  public async inspectChain(chain: ChainKey): Promise<AaveHealthCheckResult> {
    const provider = this.providerFactory.getProvider(chain);
    const config = getAaveMarketConfig(chain);
    const blockNumber = await provider.getBlockNumber();

    const missingFields: string[] = [];

    if (!config.addresses.pool) {
      missingFields.push('addresses.pool');
    }

    if (!config.addresses.poolDataProvider) {
      missingFields.push('addresses.poolDataProvider');
    }

    if (!config.addresses.poolAddressesProvider) {
      missingFields.push('addresses.poolAddressesProvider');
    }

    if (!config.addresses.oracle) {
      missingFields.push('addresses.oracle');
    }

    if (config.reserves.length === 0) {
      missingFields.push('reserves');
    }

    const notes: string[] = [];

    if (missingFields.length > 0) {
      notes.push('Aave market config is incomplete.');
    } else {
      notes.push('Aave market config is structually complete.');
    }

    return {
      chain,
      checkedAt: new Date().toISOString(),
      blockNumber,
      isConfigComplete: missingFields.length === 0,
      reserveCount: config.reserves.length,
      missingFields,
      notes,
    };
  }
}
