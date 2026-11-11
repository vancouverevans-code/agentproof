# AgentProof

Public seal desk for agent statements. The page hashes a statement with SHA-256 in the browser, then MetaMask anchors that digest on BOT Chain Testnet. Anyone with the transaction hash, or with the registry address and the digest, can check the seal. The statement itself stays off-chain.

Testnet only. Nothing here spends mainnet funds.

## Network

| | |
|---|---|
| Chain | BOT Chain Testnet |
| Chain ID | `968` (`0x3c8`) |
| RPC | `https://rpc.bohr.life` |
| Explorer | [scan.bohr.life](https://scan.bohr.life) |
| Faucet | [faucet.botchain.ai/basic](https://faucet.botchain.ai/basic) |
| Native token | BOT |

Live registry, deployed from `0x6a762069c2dC8e1A33f4343f966449Fd4C4EeDfC`:

**[`0x7a6b1da75838bb6f5bD4F522B06907372667599f`](https://scan.bohr.life/address/0x7a6b1da75838bb6f5bD4F522B06907372667599f)**

That contract already holds seals. An earlier deploy from the same wallet, `0xc7F75Ca3a4a14756c4c65d5002C105CDb7D4647b`, is empty. The desk can also deploy a fresh registry from the connected wallet; the address is stored in this browser only.

## App

Open the desk, connect MetaMask, and switch to BOT Chain Testnet. The page will offer to add the network if MetaMask does not have it yet. You need a little BOT from the faucet to pay gas.

The composer takes three fields:

- **Agent** — who is speaking
- **Title** — short name of the statement
- **Statement** — the text being sealed

As you type, the desk builds a canonical text and its SHA-256 digest. Saving writes a local draft. Anchoring sends a transaction. The ledger in this browser tracks each seal as `draft`, `pending`, `sealed`, or `failed`, and resumes a pending transaction after a reload.

The verify panel accepts a transaction hash or a 32-byte digest. A transaction is read from the chain and decoded. A digest is looked up on the registry currently set in the desk, and compared with the statement in the composer when one is present.

Hashing, history, and canonical text work without a wallet. Anchoring, deploying, and balance reads need MetaMask on chain 968.

### Canonical text

The digest is SHA-256 of this exact string. Line endings in the statement are normalized to `\n`, and the agent, title, and statement are trimmed. The trailing newline is part of the text.

```text
AgentProof v1
chain: bot-testnet-968
agent: <agent>
title: <title>
---
<statement>
```

The on-chain label is `<agent> — <title>`, truncated to 80 bytes with an ellipsis if needed. Labels exist so a seal can be recognized in a block explorer. They are not the proof. The proof is the digest.

### Two ways to anchor

**Direct.** A zero-value transaction to your own address. The transaction data is:

```text
41475031 || contentHash || label
```

`41475031` is the ASCII magic `AGP1`. `contentHash` is the 32-byte digest. `label` is UTF-8, 1–80 bytes. Anyone can verify a direct seal from the transaction hash alone. There is no contract to look the digest up in.

**Registry.** A call to `anchor(bytes32 contentHash, string label)` on `AgentProofRegistry`. The contract records the digest, `msg.sender`, the label, and the block timestamp. It does not store the statement. The same digest cannot be anchored twice. Once a registry address is set, a visitor can verify with the digest and no transaction hash.

Direct is the default. Registry is optional, for when you want lookup by hash.

### What stays local

Seals and the chosen registry address live in `localStorage` under `agentproof.seals.v1` and `agentproof.registry.v1`. Clearing site data removes the desk’s copy. It does not remove anything already mined.

## Contract

Source: [`contracts/AgentProofRegistry.sol`](contracts/AgentProofRegistry.sol)

Solidity 0.8.38. MIT license. The bytecode the desk deploys was compiled with the optimizer on and 200 runs, and is inlined in [`src/lib/registry.ts`](src/lib/registry.ts) so a visitor can deploy without a local compiler.

```solidity
function anchor(bytes32 contentHash, string calldata label) external;
function verify(bytes32 contentHash)
    external
    view
    returns (bool exists, address agent, string memory label, uint256 anchoredAt);
uint256 public count;
```

`anchor` reverts with:

- `EmptyHash` — the digest is zero
- `BadLabel` — the label is empty or longer than 80 bytes
- `AlreadyAnchored` — that digest is already recorded

`verify` returns `exists = false` and zeroed fields when the digest was never anchored. `count` is the number of successful anchors.

`ProofAnchored(bytes32 indexed contentHash, address indexed agent, string label, uint256 anchoredAt)` is emitted on each new seal.

To confirm a deployment is this contract, compare its runtime code with the bytecode in `src/lib/registry.ts`. The metadata hash embedded by solc 0.8.38 is `04fb5b4c6ad8aba61ad32ae6edfc5258c74d8bf81abebea2226729087612cde4`.

## Run locally

```bash
npm install
npm run dev
```

The desk is served at `http://127.0.0.1:8080`. Useful checks:

```bash
npm run typecheck
npm run build
```

## Layout

| Path | What it is |
|---|---|
| `src/components/dashboard.tsx` | Composer, ledger, verify, wallet, and registry controls |
| `src/lib/proof.ts` | Canonical text and SHA-256 |
| `src/lib/chain.ts` | RPC, direct payload, registry calls, receipt decoding |
| `src/lib/wallet.ts` | MetaMask connect, add network, send transaction |
| `src/lib/seals.ts` | Local ledger |
| `src/lib/registry.ts` | ABI and deployment bytecode |
| `contracts/AgentProofRegistry.sol` | Registry source |
