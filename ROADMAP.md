# Forgotten Protocol Roadmap

Last updated: 2026-04-09

## Purpose (Grounding Contract)

This file is the source-of-truth context for ongoing work on this project.

- `forgotten-protocol` is a blockchain value-extraction system focused on discovering and claiming unclaimed assets across EVM chains.
- It is not a trading bot, not a wallet, and not a general DeFi dashboard.
- Scope includes:
  - scanning wallets for unclaimed airdrops, dust, and forgotten balances
  - detecting claimable rewards across protocols
  - executing safe claim transactions
- The project owns ingestion, normalization, scanning logic, execution pipelines, and operator-facing outputs.
- Keep phase status aligned with real code, docs, and current working tree.

## Deployment Target (Current)

- Primary runtime target is a Node.js + TypeScript CLI system running inside the Continuum vault.
- Runtime is environment-driven and chain-aware.
- Current configuration shape requires:
  - `PRIVATE_KEY`
  - `RPC_URL_ETHEREUM_PRIMARY`
  - `RPC_URL_ETHEREUM_FALLBACK`
  - `RPC_URL_ARBITRUM_PRIMARY`
  - `RPC_URL_ARBITRUM_FALLBACK`
  - `RPC_URL_OPTIMISM_PRIMARY`
  - `RPC_URL_OPTIMISM_FALLBACK`
  - `RPC_URL_BASE_PRIMARY`
  - `RPC_URL_BASE_FALLBACK`
  - `RPC_URL_POLYGON_PRIMARY`
  - `RPC_URL_POLYGON_FALLBACK`
- Initial chain scope is multi-chain from day 1 across selected EVM networks.
- Code should remain portable across local development, operator hardware, and future hosted deployment.

## Supported Chains (Current v1 Scope)

- Ethereum
- Arbitrum
- Optimism
- Base
- Polygon

Selection criteria:

- strong airdrop / rewards ecosystem
- practical claiming costs
- broad wallet activity and protocol overlap
- shared EVM execution model
- accessible RPC infrastructure

Non-goals for v1:

- non-EVM chains
- bridge automation
- cross-chain messaging
- Solana-specific or Cosmos-specific protocol logic

## Operator Model

This is a two-person system.

### Builder Responsibilities

- design architecture
- implement scanners
- implement execution logic
- define result schemas
- maintain protocol adapters
- maintain safety checks
- maintain documentation and chain support

### Operator Responsibilities

- run scans
- review outputs
- validate wallets and opportunities
- trigger approved execution flows
- monitor logs and failures
- report protocol changes and broken claim paths

### Shared Responsibility

- maintain wallet lists
- decide protocol priorities
- review profitable opportunities
- track claimed value and failed attempts

## Verified Status Snapshot

Validated from the repo and current working tree on 2026-04-09:

- `git status --short`: `M src/cli/index.ts`, `?? src/config/token-registry.ts`, `?? src/core/models/tokens-registry.ts`, `?? src/scanners/balances/erc20-registry-scanner.ts`
- Active branch: `feature/foundation-multichain-core`
- Latest commit: `201a63c feat: enhance ERC-20 discovery scanner with fallback provider support and improve scanning efficiency`
- `.env.example` exists and matches the current multi-chain RPC layout
- No test runner or test files exist yet

Current docs status:

- `ROADMAP.md` exists and is now aligned to the current codebase
- `AGENTS.md` exists
- `README.md` is missing
- Architecture and operator docs are still missing

Current runtime verification:

- CLI bootstrap exists at `src/cli/index.ts`
- CLI requires `--wallet` and validates the address format
- Native balance scanner iterates the supported chains and prints balances
- ERC-20 registry scanner exists and is wired into the CLI output
- ERC-20 discovery scanner exists but is not wired into the CLI
- End-to-end runtime against live RPC endpoints was not verified in this review

Implemented APIs / Interfaces:

- `ChainKey` union for supported chains
- `ChainConfig` interface
- `CHAINS` registry with chain IDs, names, and native currencies
- `ProviderFactory` for per-chain primary and fallback `JsonRpcProvider` construction
- Zod-based env schema parsing in `src/config/env.ts`
- `WalletScanResult` and `ChainBalanceResult` in `src/core/models/balance-result.ts`
- `TokenBalanceResult` and `WalletTokenScanResult` in `src/core/models/token-balance-result.ts`
- `TokenRegistryEntry` and `TokenRegistry` in `src/core/models/tokens-registry.ts`
- `ERC20_ABI` in `src/core/abi/erc20.ts`

Implemented core services / modules:

- chain registry in `src/core/chains/chains.ts`
- environment validation in `src/config/env.ts`
- provider bootstrap in `src/core/providers/provider-factory.ts`
- CLI entry point in `src/cli/index.ts`
- CLI arg parsing in `src/cli/parse-args.ts`
- native balance scanner in `src/scanners/balances/native-balance-scanner.ts`
- ERC-20 discovery scanner in `src/scanners/balances/erc20-discovery-scanner.ts`
- ERC-20 registry scanner in `src/scanners/balances/erc20-registry-scanner.ts`
- token registry in `src/config/token-registry.ts`
- token balance formatting helper in `src/utils/format-token-balance.ts`

Remaining visible gaps:

- ERC-20 discovery is not wired into the CLI or operator flow
- no protocol adapters yet
- no claim execution engine yet
- no structured logging usage yet, even though `pino` is installed
- fallback selection is limited; most scans still use the primary provider only
- no tests, fixtures, or CI validation yet

## Current System Direction

The project is no longer at a blank-slate stage. It has a real multi-chain foundation plus a first native-balance scan pipeline:

- TypeScript CLI scaffolding is set up
- environment validation is strict and fail-fast
- supported chains are explicitly modeled
- provider bootstrap is centralized
- native balance scanning across chains is working
- ERC-20 balance scanning exists via registry and discovery modes

What is still missing is the actual product surface:

- protocol-specific discovery
- safe execution flows
- reliability and observability layers

The next milestone should extend the existing scan pipeline (ERC-20, protocol adapters) and harden it with logging, retries, and provider failover.

## Git Status And Direction

Current git status:

- Active branch: `feature/foundation-multichain-core`
- Working tree: `M src/cli/index.ts`, `?? src/config/token-registry.ts`, `?? src/core/models/tokens-registry.ts`, `?? src/scanners/balances/erc20-registry-scanner.ts`
- Latest commit before this roadmap refresh: `201a63c feat: enhance ERC-20 discovery scanner with fallback provider support and improve scanning efficiency`

Direction from here:

1. Extend scanning to ERC-20 balances and claim targets
2. Add logging, retry handling, and meaningful operator output
3. Add provider failover and failure isolation
4. Build protocol adapters and execution safeguards on top of the scan layer

## Reality-Checked Phase Status

| Phase | Name                   | Status      | Notes                                                                                                                |
| ----- | ---------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------- |
| 0     | Foundation             | Complete    | Project scaffold, TypeScript setup, env validation, CLI bootstrap, chain registry, and provider factory are in place |
| 1     | Core Platform          | In Progress | Native balance scanning and result schema exist; ERC-20 scanning exists but needs validation and wiring choices      |
| 2     | Main Product Surface   | Not Started | No airdrop detection, rewards discovery, or claimability logic yet                                                   |
| 3     | Stabilization          | Not Started | No retry, rate limiting, fallback failover logic, or structured runtime logging yet                                  |
| 4     | Execution Engine       | Not Started | No transaction builder, gas checks, or claim execution pipeline yet                                                  |
| 5     | Expansion Area A       | Not Started | No additional protocols or chain expansion work yet                                                                  |
| 6     | Expansion Area B       | Not Started | No advanced extraction or prioritization systems yet                                                                 |
| 7     | Automation / Lifecycle | Not Started | No scheduling or recurring operations workflow yet                                                                   |
| 8     | Testing & Data Quality | Not Started | No tests or fixtures exist                                                                                           |
| 9     | Hardening & Operations | Not Started | No monitoring, operator controls, or production logging yet                                                          |
| 10    | Future / Advanced Work | Not Started | No AI-assisted ranking or opportunity scoring yet                                                                    |

## Next Milestone Checklist

### Immediate Next Step

- [x] Initialize project folder structure
- [x] Create `.env.example`
- [x] Set up TypeScript + Ethers.js
- [x] Define supported chain list for v1
- [x] Build chain registry
- [x] Build provider factory
- [x] Build first multi-chain wallet scanner
- [x] Add normalized scan result schema
- [x] Log operator-readable scan output
- [x] Add ERC-20 registry + discovery scanners
- [ ] Verify scans across all supported chains

### Phase 1 Completion (Core Platform)

- [x] Chain registry
- [x] Provider factory
- [x] RPC configuration validation
- [x] CLI entry point
- [ ] Wallet input model
- [x] Multi-chain wallet scanning module
- [x] Native token balance detection per chain
- [x] ERC-20 token balance detection per chain
- [x] Normalized result schema
- [x] Operator-readable output formatter

### Phase 2 Kickoff (Main Product Surface)

- [ ] Multi-chain airdrop detection engine
- [ ] Known protocol scanning adapters
- [ ] Reward eligibility detection
- [ ] Claimability classification
- [ ] Chain-aware gas-cost estimation
- [ ] Output structured results grouped by wallet / chain / protocol

### Phase 3 Stabilization (Reliability Layer)

- [ ] Retry logic
- [ ] Rate limiting
- [ ] Error classification
- [ ] Structured logging integration
- [ ] Primary/fallback provider failover behavior
- [ ] Chain failure isolation
- [ ] Partial-success scan handling

### Phase 4 Kickoff (Execution Engine)

- [ ] Transaction builder
- [ ] Chain-aware claim execution logic
- [ ] Gas estimation
- [ ] Profitability checks
- [ ] Safe execution checks
- [ ] Dry-run mode
- [ ] Operator approval flow

### Quality Gate

- [ ] Test coverage for chain registry
- [ ] Test coverage for provider factory
- [ ] Test coverage for scanners
- [ ] Deterministic normalized outputs
- [ ] Logging validation
- [ ] End-to-end multi-chain scan test

## Git Workflow Guardrails

Use this workflow for every roadmap item unless explicitly overridden:

- [ ] Create work only on topic branches (`feature/*`, `fix/*`, `chore/*`, `docs/*`)
- [ ] Keep branch scope aligned to one roadmap unit
- [ ] Rebase or merge `main` before finalizing work
- [ ] Open a PR for every branch with purpose, verification, and follow-ups
- [ ] Require passing checks before merge
- [ ] Prefer squash merge
- [ ] Delete merged branches after merge
- [ ] Tag significant milestones
- [ ] Split unrelated work into separate branches
