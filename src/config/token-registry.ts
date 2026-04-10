import { TokenRegistry } from "../core/models/tokens-registry.js";

export const TOKEN_REGISTRY: TokenRegistry = {
  ethereum: [
    {
      chain: 'ethereum',
      address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      symbol: 'USDC',
      decimals: 6
    },
    {
      chain: 'ethereum',
      address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      symbol: 'USDT',
      decimals: 6
    },
    {
      chain: 'ethereum',
      address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      symbol: 'WETH',
      decimals: 18
    },
    {
      chain: 'ethereum',
      address: '0x514910771af9ca656af840dff83e8264ecf986ca',
      symbol: 'LINK',
      decimals: 18
    }
  ],
  arbitrum: [
    {
      chain: 'arbitrum',
      address: '0xaf88d065e77c8cc2239327c5edb3a432268e5831',
      symbol: 'USDC',
      decimals: 6
    },
    {
      chain: 'arbitrum',
      address: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
      symbol: 'USDT',
      decimals: 6
    },
    {
      chain: 'arbitrum',
      address: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
      symbol: 'WETH',
      decimals: 18
    },
    {
      chain: 'arbitrum',
      address: '0x912ce59144191c1204e64559fe8253a0e49e6548',
      symbol: 'ARB',
      decimals: 18
    }
  ],
  optimism: [
    {
      chain: 'optimism',
      address: '0x0b2c639c533813f4aa9d7837caf62653d097ff85',
      symbol: 'USDC',
      decimals: 6
    },
    {
      chain: 'optimism',
      address: '0x94b008aa00579c1307b0ef2c499ad98a8ce58e58',
      symbol: 'USDT',
      decimals: 6
    },
    {
      chain: 'optimism',
      address: '0x4200000000000000000000000000000000000006',
      symbol: 'WETH',
      decimals: 18
    },
    {
      chain: 'optimism',
      address: '0x4200000000000000000000000000000000000042',
      symbol: 'OP',
      decimals: 18
    }
  ],
  base: [
    {
      chain: 'base',
      address: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913',
      symbol: 'USDC',
      decimals: 6
    },
    {
      chain: 'base',
      address: '0x4200000000000000000000000000000000000006',
      symbol: 'WETH',
      decimals: 18
    }
  ],
  polygon: [
    {
      chain: 'polygon',
      address: '0x3c499c542cef5e3811e1192ce70d8cc03d5c3359',
      symbol: 'USDC',
      decimals: 6
    },
    {
      chain: 'polygon',
      address: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
      symbol: 'USDT',
      decimals: 6
    },
    {
      chain: 'polygon',
      address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
      symbol: 'WETH',
      decimals: 18
    },
    {
      chain: 'polygon',
      address: '0x0000000000000000000000000000000000001010',
      symbol: 'POL',
      decimals: 18
    }
  ]
};