# Forgotten Protocols Roadmap

Last updated: 2026-04-13

## Purpose (Grounding Contract)

This file is the source-of-truth context for ongoing work on this project.

- `forgotten-protocols` is the multi-chain discovery and recovery intelligence system for locating wallet-held crypto value that is easy to miss, ignore, or forget.
- It is not a trading bot, a liquidation bot, or a generic portfolio dashboard.
- Scope includes:
  - multi-chain native and token balance discovery
  - wallet-level normalization of discovered assets across chains
  - protocol-aware detection of potentially recoverable value
- The project owns discovery, normalization, scoring, reporting, and operator-facing recovery workflows.
- Keep phase status aligned with real code, docs, and current working tree.

## Deployment Target (Current)

- Primary runtime target is a local TypeScript CLI running inside the Continuum development environment on Fedora.
- Runtime configuration remains environment-driven (`INFURA_API_KEY`, `RPC_URL_*`, `CHAIN_ENABLE_*`).
- Keep deployment docs environment-specific, but keep code paths portable where possible.
- Near-term execution target is local/manual CLI usage by the Builder, with future scheduled runs for the Operator.
- Long-term target is a repeatable scanner service that can run on a dedicated node and emit machine-readable reports.

## Verified Status Snapshot

Validated from project context and current known working behavior on 2026-04-13 unless otherwise noted:

- `git status --short` is `TO VERIFY IN REPO`.
- Active branch is `TO VERIFY IN REPO`.
- `git log -1 --oneline` reports `TO VERIFY IN REPO`.
- `.env.example` is `TO VERIFY IN REPO`, and the repo expects environment-driven RPC configuration for:
  - Ethereum
  - Arbitrum
  - Optimism
  - Base
  - Polygon
- A CLI entry surface exists and is currently invoked through `src/cli/index.ts`.
- A multi-chain scanning flow exists for:
  - native balance discovery
  - ERC-20 token discovery
- Current known runtime behavior confirms scanning across:
  - Ethereum
  - Arbitrum
  - Optimism
  - Base
  - Polygon
- Current docs status:
  - the roadmap template exists
  - architecture, contracts, operator runbooks, and recovery playbooks still need to be formalized
- Current runtime verification:
  - `pnpm dev -- --wallet <address>` succeeds and starts the CLI scanner
  - the current scanner prints native balances and discovered ERC-20 tokens across multiple chains
- Current local verification:
  - wallet scan execution is working for at least one known address
  - chain discovery currently reaches live RPC-backed data
- Remaining visible gaps:
  - no finalized recovery-classification layer yet
  - no persistent result model, scoring engine, or operator workflow contract yet

Implemented APIs / Interfaces:

- CLI wallet scan interface: `src/cli/index.ts --wallet <address>`
- Native balance reporting surface
- ERC-20 discovery reporting surface

Implemented core services / modules:

- CLI / Entry Surface:
  - `src/cli/index.ts`
  - `TO VERIFY: argument parsing module path`
- Chain Discovery Layer:
  - `TO VERIFY: chain registry path`
  - `TO VERIFY: provider / RPC client path`
- Asset Discovery Layer:
  - `TO VERIFY: native balance scanner path`
  - `TO VERIFY: token discovery scanner path`

Current system direction:
Forgotten Protocols already has a meaningful first vertical slice alive: it can accept a wallet, connect to multiple EVM chains, and report native balances plus discovered ERC-20 holdings. That proves the project is past pure scaffolding and into live discovery territory. The immediate gap is that it still behaves like a raw scanner rather than a true recovery intelligence system — the next milestone is to classify discovered assets into actionable categories such as worthless noise, active holdings, protocol-specific opportunities, and genuinely recoverable forgotten value.

## Git Status And Direction

Current git status:

- Active branch: `TO VERIFY IN REPO`
- Working tree: `TO VERIFY IN REPO`
- Latest commit before this roadmap refresh: `TO VERIFY IN REPO`

Required direction:

1. Formalize the scanner architecture into clean modules (`core`, `scanners`, `executors`, `utils`, `types`).
2. Add a normalized result contract so scans produce stable, typed machine-readable output.
3. Build the first recovery intelligence layer that distinguishes ordinary wallet balances from meaningful forgotten-value opportunities.
4. Add verification, fixtures, and operator-grade reporting so the project becomes runnable as a system instead of a script.

## Reality-Checked Phase Status

| Phase | Name | Status | Notes |
|---|---|---|---|
| 0 | Foundation | In Progress | CLI exists and multi-chain scanning is already producing live output. |
| 1 | Core Platform | In Progress | Provider wiring and chain scanning behavior exist, but architecture still needs formal modularization and contracts. |
| 2 | Main Product Surface | In Progress | Wallet scan output is visible, but classification and recovery intelligence are not finished. |
| 3 | Stabilization | Not Started | Retries, error taxonomy, structured observability, and deterministic scan behavior still need to be formalized. |
| 4 | Consumer Contracts | Not Started | No locked JSON/report contract has been documented yet. |
| 5 | Expansion Area A | Not Started | Protocol-aware recovery modules for claims, vesting, staking, LPs, and abandoned positions are not built yet. |
| 6 | Expansion Area B | Not Started | Scoring, ranking, and prioritization of recovery targets are not built yet. |
| 7 | Automation / Lifecycle | Not Started | Scheduled scans, diffing, alerts, and operator handoff flows are still future work. |
| 8 | Testing & Data Quality | Not Started | Snapshot tests, chain fixtures, and regression coverage need to be introduced. |
| 9 | Hardening & Operations | Not Started | Secrets handling, rate-limit strategy, RPC failover, and operational documentation are still missing. |
| 10 | Future / Advanced Work | Not Started | Dashboard, API service, historical scan memory, and automation loops remain future expansions. |

## Next Milestone Checklist

### Suggested Immediate Next Step

- [ ] Refresh this roadmap after verifying actual repo state
- [ ] Document the current scanner behavior and output schema
- [ ] Lock folder structure for the production-grade rewrite
- [ ] Add a typed normalized scan result contract
- [ ] Add structured logging and error boundaries
- [ ] Publish the first stable “scan report” output

### Phase 1 Kickoff (Core Platform)

- [ ] Create final project structure:
  - `src/core`
  - `src/scanners`
  - `src/executors`
  - `src/utils`
  - `src/types`
- [ ] Introduce a canonical chain registry and provider factory
- [ ] Introduce a canonical `ScanResult` type shared across all scanners
- [ ] Verify that every supported chain can run through the same scan pipeline

### Phase 2 Closure (Main Product Surface)

- [ ] Normalize native and token results into a single wallet report
- [ ] Add token metadata enrichment and decimal-safe formatting
- [ ] Add classification buckets:
  - active holding
  - dust / low-signal holding
  - unknown token
  - protocol opportunity
  - recovery candidate
- [ ] Verify that one wallet scan produces both console output and machine-readable structured output

### Phase 3 Stabilization (Reliability Layer)

- [ ] Add structured logs for every chain scan and token enrichment step
- [ ] Add retry / timeout / partial-failure handling for RPC instability
- [ ] Add deterministic exit codes for CLI success, degraded success, and failure
- [ ] Verify degraded behavior when one or more chain RPCs fail

### Phase 4 Kickoff (Consumer Contracts)

- [ ] Define a versioned JSON output schema
- [ ] Add saved report output to disk for operator review
- [ ] Document report fields and classification meanings
- [ ] Verify schema compatibility across multiple sample wallets

### Phase 5 Expansion (Protocol Recovery Modules)

- [ ] Add protocol detector interfaces for:
  - unclaimed rewards
  - staking positions
  - vesting / escrow
  - LP / farming residues
- [ ] Introduce chain-specific protocol adapters
- [ ] Add recoverability notes per opportunity
- [ ] Verify at least one real protocol-specific recovery path end-to-end

### Phase 6 Expansion (Scoring & Prioritization)

- [ ] Add value scoring and confidence scoring
- [ ] Rank opportunities by estimated recoverable value
- [ ] Add false-positive reduction rules
- [ ] Verify ranking output on a wallet with mixed-quality findings

### Phase 7 Automation / Lifecycle

- [ ] Add batch wallet scanning support
- [ ] Add diffing against previous reports
- [ ] Add scheduled scan entrypoint for operator execution
- [ ] Verify repeat runs produce stable, comparable artifacts

### Phase 8 Testing & Data Quality

- [ ] Add unit tests for formatting, normalization, and classification
- [ ] Add integration tests for provider and chain scan flows
- [ ] Add golden-file snapshot reports for known wallets
- [ ] Verify regression coverage before adding new protocol adapters

### Phase 9 Hardening & Operations

- [ ] Add secret-loading policy and environment validation
- [ ] Add RPC fallback policy and provider health checks
- [ ] Add operator runbook and failure handling guide
- [ ] Verify recovery from provider failure without corrupting output artifacts

### Phase 10 Future / Advanced Work

- [ ] Add API/server surface for on-demand scans
- [ ] Add dashboard or operator review UI
- [ ] Add historical persistence and trend comparison
- [ ] Add recovery execution planning for high-confidence opportunities

## Git Workflow Guardrails

Use this workflow for every roadmap item unless explicitly overridden:

- [ ] Create work only on topic branches (`feature/*`, `fix/*`, `chore/*`, `docs/*`).
- [ ] Keep branch scope aligned to one roadmap unit.
- [ ] Rebase or merge `main` before finalizing work.
- [ ] Open a PR for every branch with purpose, verification, and deferred follow-ups.
- [ ] Require passing checks before merge.
- [ ] Prefer squash merge unless there is a reason not to.
- [ ] Delete merged branches after merge.
- [ ] Tag significant milestones on `main`.
- [ ] If scope changes mid-branch, cut a new branch for unrelated work.

## Definition Of Done For The Current Rewrite

A roadmap item is not complete unless all of the following are true:

- the code path is implemented
- the behavior is verified locally
- the output contract is documented
- the logs are understandable by the Operator
- the working tree reflects the claimed phase status
- the roadmap, README, and architecture docs all agree

## Near-Term Product Thesis

Forgotten Protocols becomes valuable when it stops merely listing balances and starts answering a harder question:

**“Which pieces of wallet-held value are actually worth attention, and why?”**

That means the project’s next identity jump is from:
- wallet scanner

to:
- wallet recovery intelligence system

The scanner is already proving connectivity and discovery. The next phase must prove judgment, prioritization, and operator usefulness.