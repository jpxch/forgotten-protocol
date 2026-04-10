import { ChainKey } from "../chains/chains.js";

export interface TokenRegistryEntry {
    chain: ChainKey;
    address: string;
    symbol: string;
    decimals: number;
}

export type TokenRegistry = Record<ChainKey, TokenRegistryEntry[]>;