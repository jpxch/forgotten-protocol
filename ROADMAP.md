# Forgotten Protocols Roadmap

Last updated: 2026-04-09

## Purpose (Grounding Contract)

This file is the source-of-truth context for ongoing work on this project.

- `forgotten-protocols` is a blockchain value-extraction system focused on discovering and claiming unclaimed assets across EVM chains.
- It is not a trading bot, not a wallet, and not a general DeFi dashboard.
- Scope includes:
  - scanning wallets for unclaimed airdrops, dust, and forgotten balances
  - detecting claimable rewards across protocols
  - executing safe claim transactions
- The project owns ingestion, normalization, scanning logic, execution pipelines, and operator-facing outputs.
- Keep phase status aligned with real code, docs, and current working tree.

## Deployment Target (Current)

- Primary runtime target is a Node.js + TypeScript CLI system running inside the Continuum vault.
- Execution happens on:
  - Builder machine (development + deployment)
  - Operator machine (monitoring + execution triggers)
- Runtime configuration remains environment-driven and chain-aware:
  - `RPC_URL_ETHEREUM`
  - `RPC_URL_ARBITRUM`
  - `RPC_URL_BASE`
  - `RPC_URL_OPTIMISM`
  - `RPC_URL_POLYGON`
  - `PRIVATE_KEY`
- Initial chain scope is multi-chain from day 1 across selected EVM networks.
- Code must remain portable across VM, mini PC, and future cloud deployment.
- The system must support:
  - chain-specific providers
  - chain-specific protocol support
  - normalized cross-chain output

## Supported Chains (v1 Target)

Initial supported chains for v1:

- Ethereum
- Arbitrum
- Base
- Optimism
- Polygon

Selection criteria:

- strong airdrop / rewards ecosystem
- low enough cost for practical claiming
- broad wallet activity and protocol overlap
- compatible EVM execution model
- accessible RPC infrastructure

Non-goals for v1:

- non-EVM chains
- bridge automation
- cross-chain message execution
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

Validated from the repo and current working tree on 2026-04-09 unless otherwise noted:

- `git status --short` is [TO BE VERIFIED]
- Active branch is `[main]`
- `git log -1 --oneline` reports `[TO BE FILLED]`
- `.env.example` does not yet exist and must be created
- No core modules are implemented yet (fresh start)
- No shared services exist yet
- No tests exist yet

Current docs status:
- ROADMAP.md initialized
- All other docs missing (README, ARCHITECTURE, etc.)

Current runtime verification:
- No runnable system yet

Current local verification:
- No tests configured

Remaining visible gaps:
- Entire system architecture not implemented
- No scanner logic
- No execution engine
- No logging or operator interface

Implemented APIs / Interfaces:

- None yet

Implemented core services / modules:

- None yet

Current system direction:

This project is starting from zero with a clear goal: build a modular, chain-aware scanning and execution system capable of discovering and extracting value from blockchain activity across multiple EVM networks from day 1.

The immediate focus is establishing a clean architecture with:

- shared core infrastructure
- per-chain provider management
- scanner modules that can execute across multiple chains
- normalized result models for operator review
- execution pipelines that remain chain-aware and safety-checked

The first implementation target is not a single-chain prototype. The first implementation target is a production-grade multi-chain base that can scan wallets across selected EVM chains using a unified interface.

## Git Status And Direction

Current git status:

- Active branch: `main`
- Working tree: clean (expected for fresh start)
- Latest commit before this roadmap refresh: `[TO BE FILLED]`

Required direction:

1. Initialize project structure (core / scanners / executors / utils / config / cli)
2. Implement chain registry and provider factory
3. Build multi-chain wallet scanner (native balance + token balance support)
4. Add protocol adapters for claim/reward discovery
5. Implement execution engine for safe multi-chain claiming

## Reality-Checked Phase Status

| Phase | Name | Status | Notes |
|---|---|---|---|
| 0 | Foundation | In Progress | Project initialization + multi-chain architecture setup |
| 1 | Core Platform | Not Started | Chain registry, provider factory, wallet scanning, normalized outputs |
| 2 | Main Product Surface | Not Started | Multi-chain airdrop + reward detection |
| 3 | Stabilization | Not Started | Error handling, retries, RPC fallback, chain failure isolation |
| 4 | Consumer Contracts | Not Started | Execution + claiming across supported chains |
| 5 | Expansion Area A | Not Started | More protocols, more chains, richer adapters |
| 6 | Expansion Area B | Not Started | MEV / advanced extraction |
| 7 | Automation / Lifecycle | Not Started | Scheduled scans + recurring execution workflows |
| 8 | Testing & Data Quality | Not Started | Validation + correctness + chain-specific test coverage |
| 9 | Hardening & Operations | Not Started | Logging + monitoring + operator controls |
| 10 | Future / Advanced Work | Not Started | AI-assisted scanning + opportunity ranking |

## Next Milestone Checklist

### Suggested Immediate Next Step

- [ ] Initialize project folder structure
- [ ] Create `.env.example`
- [ ] Setup TypeScript + Ethers.js
- [ ] Define supported chain list for v1
- [ ] Build chain registry
- [ ] Build provider factory
- [ ] Build first multi-chain wallet scanner
- [ ] Log normalized detected balances
- [ ] Output chain-grouped results for operator

### Phase 1 Kickoff (Core Platform)

- [ ] Chain registry
- [ ] Provider factory
- [ ] RPC configuration validation
- [ ] Multi-chain wallet scanning module
- [ ] Native token balance detection per chain
- [ ] ERC20 token balance detection per chain
- [ ] Normalized result schema
- [ ] CLI entry point
- [ ] Operator-readable output formatter

### Phase 2 Closure (Main Product Surface)

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
- [ ] Structured logging system
- [ ] RPC fallback support
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

### Phase N Gate (System Integrity)

- [ ] Test coverage for chain registry
- [ ] Test coverage for provider factory
- [ ] Test coverage for scanners
- [ ] Deterministic normalized outputs
- [ ] Logging validation
- [ ] End-to-end multi-chain execution test

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