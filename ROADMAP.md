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
- Runtime configuration remains environment-driven:
  - `RPC_URL`
  - `PRIVATE_KEY`
  - `CHAIN_ID`
- Code must remain portable across VM, mini PC, and future cloud deployment.

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

This project is starting from zero with a clear goal: build a modular scanning and execution system capable of discovering and extracting value from blockchain activity. The immediate focus is establishing a clean architecture with scanners, executors, and shared infrastructure.

## Git Status And Direction

Current git status:

- Active branch: `main`
- Working tree: clean (expected for fresh start)
- Latest commit before this roadmap refresh: `[TO BE FILLED]`

Required direction:

1. Initialize project structure (core / scanners / executors / utils)
2. Build wallet scanner (detect ETH + ERC20 balances)
3. Add airdrop detection logic
4. Implement execution engine for claiming value

## Reality-Checked Phase Status

| Phase | Name | Status | Notes |
|---|---|---|---|
| 0 | Foundation | In Progress | Project initialization + architecture setup |
| 1 | Core Platform | Not Started | Base scanning + RPC integration |
| 2 | Main Product Surface | Not Started | Airdrop + reward detection |
| 3 | Stabilization | Not Started | Error handling + retries |
| 4 | Consumer Contracts | Not Started | Execution + claiming |
| 5 | Expansion Area A | Not Started | Multi-chain support |
| 6 | Expansion Area B | Not Started | MEV / advanced extraction |
| 7 | Automation / Lifecycle | Not Started | Scheduled scans + automation |
| 8 | Testing & Data Quality | Not Started | Validation + correctness |
| 9 | Hardening & Operations | Not Started | Logging + monitoring |
| 10 | Future / Advanced Work | Not Started | AI-assisted scanning |

## Next Milestone Checklist

### Suggested Immediate Next Step

- [ ] Initialize project folder structure
- [ ] Create `.env.example`
- [ ] Setup TypeScript + Ethers.js
- [ ] Build first wallet scanner
- [ ] Log detected balances
- [ ] Output results for operator

### Phase 1 Kickoff (Core Platform)

- [ ] RPC connection layer (Infura)
- [ ] Wallet scanning module
- [ ] Token balance detection
- [ ] CLI entry point

### Phase 2 Closure (Main Product Surface)

- [ ] Airdrop detection engine
- [ ] Known protocol scanning (Uniswap, ENS, etc.)
- [ ] Reward eligibility detection
- [ ] Output structured results

### Phase 3 Stabilization (Reliability Layer)

- [ ] Retry logic
- [ ] Rate limiting
- [ ] Error classification
- [ ] Logging system

### Phase 4 Kickoff (Execution Engine)

- [ ] Transaction builder
- [ ] Claim execution logic
- [ ] Gas estimation
- [ ] Safe execution checks

### Phase N Gate (System Integrity)

- [ ] Test coverage for scanners
- [ ] Deterministic outputs
- [ ] Logging validation
- [ ] End-to-end execution test

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