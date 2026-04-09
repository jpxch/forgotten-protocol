interface CliArgs {
  wallet: string;
}

export function parseArgs(argv: string[]): CliArgs {
  const args = argv.slice(2);

  let wallet: string | undefined;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--wallet') {
      wallet = args[i + 1];
    }
  }

  if (!wallet) {
    throw new Error('Missing required argument: --wallet <address>');
  }

  if (!isValidAddress(wallet)) {
    throw new Error('Invalid wallet address provided');
  }

  return { wallet };
}

function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}
