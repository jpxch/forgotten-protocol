import { ChainKey } from '../../core/chains/chains.js';
import { Opportunity } from '../../core/models/opportunity.js';

export interface ProtocolOpportunityScanRequest {
  chain: ChainKey;
  blockTag?: number;
}

export interface ProtocolOpportunityScanResult {
  protocol: string;
  chain: ChainKey;
  scannedAt: string;
  scannedBlock: number;
  opportunities: Opportunity[];
}

export interface ProtocolOpportunityScanner {
  scan(request: ProtocolOpportunityScanRequest): Promise<ProtocolOpportunityScanResult>;
}
