# AGENTS.md

## Commands

- Run the CLI (TypeScript, tsx): `pnpm dev -- --wallet 0x...`
- Build JS output: `pnpm build` (writes to `dist/`)
- Run built CLI: `pnpm start -- --wallet 0x...`
- Typecheck only (no emit): `pnpm exec tsc --noEmit`

## Environment

- CLI loads env via `dotenv/config` in `src/cli/index.ts`, so a root `.env` is required.
- Required vars are defined in `src/config/env.ts` and mirrored in `.env.example`:
  `PRIVATE_KEY`, plus primary/fallback RPC URLs for Ethereum, Arbitrum, Optimism, Base, Polygon.

## Runtime entrypoints

- CLI entrypoint: `src/cli/index.ts` (requires `--wallet`, validates `0x` + 40 hex chars).
- Chain registry: `src/core/chains/chains.ts` (source of supported chains).
- Providers: `src/core/providers/provider-factory.ts` (initializes primary + fallback RPC providers; `getProvider` currently returns primary only).

## Tests

- No test runner or test files yet (`tests/` is empty).
