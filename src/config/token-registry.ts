import { TokenRegistry } from "../core/models/tokens-registry.js";

export const TOKEN_REGISTRY: TokenRegistry = {
  ethereum: [
    {
      chain: 'ethereum',
      address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      symbol: 'USDC',
      decimals: 6
    },
    {
      chain: 'ethereum',
      address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      symbol: 'USDT',
      decimals: 6
    },
    {
      chain: 'ethereum',
      address: '0xC02aaA39b223FE8D0A0E5C4F27eAD9083C756Cc2',
      symbol: 'WETH',
      decimals: 18
    },
    {
      chain: 'ethereum',
      address: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
      symbol: 'LINK',
      decimals: 18
    }
  ],
  arbitrum: [
    {
      chain: 'arbitrum',
      address: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
      symbol: 'USDC',
      decimals: 6
    },
    {
      chain: 'arbitrum',
      address: '0xFd086bC7CD5C481DCC9C85ebe478A1C0b69FCbb9',
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
      address: '0x912CE59144191C1204E64559FE8253a0e49E6548',
      symbol: 'ARB',
      decimals: 18
    }
  ],
  optimism: [
    {
      chain: 'optimism',
      address: '0x0b2C639c533813f4Aa9D7837CaF62653d097Ff85',
      symbol: 'USDC',
      decimals: 6
    },
    {
      chain: 'optimism',
      address: '0x94b008aA00579c1307B0EF2c499ad98a8ce58e58',
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
      address: '0x833589fCD6EDB6E08f4c7C32D4f71b54bdA02913',
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
      address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
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