const MAJOR_TOKENS = new Set([
    "USDT",
    "USDC",
    "WETH",
    "ETH",
    "DAI",
    "LINK",
]);

export function classifyToken(symbol: string, balance: number): string {
    if (MAJOR_TOKENS.has(symbol)) {
        return "MAJOR";
    }

    if (balance === 0) {
        return "DUST";
    }

    if (balance < 1) {
        return "POTENTIAL_AIRDROP";
    }

    return "UNKNOWN";
}