import { useEffect, useMemo, useState } from "react";
import {
  BadgeCheck,
  CircleAlert,
  Copy,
  ExternalLink,
  LoaderCircle,
  ScrollText,
  Wallet,
} from "lucide-react";
import { Button, fieldClass } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import {
  BOT_CHAIN_ID,
  BOT_CHAIN_ID_HEX,
  BOT_DOCS,
  BOT_EXPLORER,
  BOT_FAUCET,
  botChainParams,
  encodeDirectAnchor,
  encodeRegistryAnchor,
  explorerAddress,
  explorerBlock,
  explorerTx,
  formatBot,
  formatWhen,
  getAddress,
  isAddress,
  isBotChainId,
  isBytes32,
  readBalance,
  readChainSeal,
  readHead,
  readRegistryCount,
  readRegistryProof,
  registryBytecode,
  shortAddr,
  shortHash,
  waitForReceipt,
  walletMessage,
  type Address,
  type Hex,
} from "@/lib/chain";
import { canonicalText, makeLabel, sameHash, sha256Hex } from "@/lib/proof";
import {
  loadRegistry,
  loadSeals,
  saveRegistry,
  saveSeals,
  setWalletPaused,
  walletPaused,
  type AnchorMode,
  type Seal,
  type SealStatus,
} from "@/lib/seals";
import { injectedProvider } from "@/lib/wallet";

type Busy = "connect" | "anchor" | "verify" | "deploy" | null;

type Fact = { label: string; value: string; href?: string };

type VerifyTone = "match" | "mismatch" | "found" | "missing" | "failed" | "pending";

type VerifyResult = {
  tone: VerifyTone;
  title: string;
  detail: string;
  facts: Fact[];
};

const steps = [
  {
    n: "01",
    title: "Write",
    body: "Agent, title, and the statement you want sealed.",
  },
  {
    n: "02",
    title: "Hash",
    body: "SHA-256 runs in this browser. The words never leave it.",
  },
  {
    n: "03",
    title: "Anchor",
    body: "MetaMask writes the digest into a BOT Chain Testnet transaction.",
  },
];

function SealMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="var(--color-panel)" />
      <circle cx="16" cy="16" r="11" fill="var(--color-clay)" />
      <circle cx="16" cy="16" r="7.6" fill="none" stroke="var(--color-brass)" strokeWidth="1.7" />
      <path
        d="M11.1 16.5 L14.3 19.6 L21.1 12.5"
        fill="none"
        stroke="var(--color-paper)"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function statusLabel(status: SealStatus): string {
  if (status === "draft") return "Local";
  if (status === "pending") return "Pending";
  if (status === "sealed") return "Sealed";
  return "Failed";
}

export function Dashboard() {
  const [agentId, setAgentId] = useState("");
  const [title, setTitle] = useState("");
  const [statement, setStatement] = useState("");
  const [digest, setDigest] = useState<Hex | null>(null);
  const [seals, setSeals] = useState<Seal[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [account, setAccount] = useState<Address | null>(null);
  const [chainId, setChainId] = useState<string | null>(null);
  const [balance, setBalance] = useState<bigint | null>(null);
  const [block, setBlock] = useState<number | null>(null);
  const [rpcDown, setRpcDown] = useState(false);
  const [providerState, setProviderState] = useState<"unknown" | "metamask" | "injected" | "none">(
    "unknown",
  );
  const [registry, setRegistry] = useState<Address | null>(null);
  const [registryInput, setRegistryInput] = useState("");
  const [registryCount, setRegistryCount] = useState<number | null>(null);
  const [anchorMode, setAnchorMode] = useState<AnchorMode>("direct");
  const [busy, setBusy] = useState<Busy>(null);
  const [note, setNote] = useState<string | null>(null);
  const [registryNote, setRegistryNote] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [txInput, setTxInput] = useState("");
  const [digestInput, setDigestInput] = useState("");
  const [digestTouched, setDigestTouched] = useState(false);
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const [verifyResult, setVerifyResult] = useState<VerifyResult | null>(null);

  const canonical = useMemo(
    () => canonicalText({ agentId, title, statement }),
    [agentId, title, statement],
  );
  const canSeal =
    agentId.trim().length > 0 &&
    agentId.trim().length <= 42 &&
    title.trim().length > 0 &&
    title.trim().length <= 64 &&
    statement.trim().length > 0 &&
    statement.trim().length <= 4000;
  const label = canSeal ? makeLabel(agentId, title) : "";
  const onBot = isBotChainId(chainId);

  useEffect(() => {
    const stored = loadSeals();
    const savedRegistry = loadRegistry();
    setSeals(stored);
    setRegistry(savedRegistry);
    setRegistryInput(savedRegistry ?? "");
    if (savedRegistry) setAnchorMode("registry");
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveSeals(seals);
  }, [seals, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    let cancel = false;
    for (const seal of seals) {
      if (seal.status !== "pending" || !seal.txHash) continue;
      const { id, txHash } = seal;
      void readChainSeal(txHash)
        .then((mined) => {
          if (cancel || !mined || mined.pending) return;
          if (!mined.success || !mined.contentHash) {
            patchSeal(id, {
              status: "failed",
              blockNumber: mined.blockNumber,
              error: "The transaction did not seal this digest.",
            });
            return;
          }
          patchSeal(id, {
            status: "sealed",
            blockNumber: mined.blockNumber,
            from: mined.from,
            error: undefined,
          });
        })
        .catch(() => undefined);
    }
    return () => {
      cancel = true;
    };
    // Resume once, after the ledger has been read from this browser.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated]);

  useEffect(() => {
    const provider = injectedProvider();
    if (!provider) {
      setProviderState("none");
      return;
    }
    setProviderState(provider.isMetaMask ? "metamask" : "injected");
    const onAccounts = (value: unknown) => {
      const accounts = Array.isArray(value) ? value : [];
      const first = accounts[0];
      if (typeof first !== "string" || !isAddress(first)) {
        setAccount(null);
        setBalance(null);
        return;
      }
      setAccount(getAddress(first));
    };
    const onChain = (value: unknown) => {
      setChainId(typeof value === "string" ? value : null);
    };
    provider.on?.("accountsChanged", onAccounts);
    provider.on?.("chainChanged", onChain);
    if (!walletPaused()) {
      void provider
        .request({ method: "eth_accounts" })
        .then(async (result) => {
          const accounts = Array.isArray(result) ? result : [];
          const first = accounts[0];
          if (typeof first !== "string" || !isAddress(first)) return;
          setAccount(getAddress(first));
          const id = (await provider.request({ method: "eth_chainId" })) as string;
          setChainId(id);
        })
        .catch(() => undefined);
    }
    return () => {
      provider.removeListener?.("accountsChanged", onAccounts);
      provider.removeListener?.("chainChanged", onChain);
    };
  }, []);

  useEffect(() => {
    let stop = false;
    const tick = async () => {
      try {
        const head = await readHead();
        if (!stop) {
          setBlock(head);
          setRpcDown(false);
        }
      } catch {
        if (!stop) setRpcDown(true);
      }
    };
    void tick();
    const id = window.setInterval(() => void tick(), 12000);
    return () => {
      stop = true;
      window.clearInterval(id);
    };
  }, []);

  useEffect(() => {
    if (!account || !onBot) {
      setBalance(null);
      return;
    }
    let cancel = false;
    void readBalance(account)
      .then((wei) => {
        if (!cancel) setBalance(wei);
      })
      .catch(() => {
        if (!cancel) setBalance(null);
      });
    return () => {
      cancel = true;
    };
  }, [account, onBot]);

  useEffect(() => {
    if (!registry) {
      setRegistryCount(null);
      return;
    }
    let cancel = false;
    void readRegistryCount(registry)
      .then((count) => {
        if (!cancel) setRegistryCount(count);
      })
      .catch(() => {
        if (!cancel) setRegistryCount(null);
      });
    return () => {
      cancel = true;
    };
  }, [registry, seals]);

  useEffect(() => {
    if (!canSeal) {
      setDigest(null);
      return;
    }
    let cancel = false;
    void sha256Hex(canonical).then((hash) => {
      if (!cancel) setDigest(hash);
    });
    return () => {
      cancel = true;
    };
  }, [canonical, canSeal]);

  function patchSeal(id: string, partial: Partial<Seal>) {
    setSeals((current) =>
      current.map((seal) => (seal.id === id ? { ...seal, ...partial } : seal)),
    );
  }

  function remember(seal: Seal) {
    setSeals((current) => {
      const index = current.findIndex((item) => item.id === seal.id);
      if (index === -1) return [seal, ...current].slice(0, 40);
      const next = current.slice();
      next[index] = seal;
      return next;
    });
  }

  async function copyText(value: string, key: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      window.setTimeout(() => {
        setCopied((current) => (current === key ? null : current));
      }, 1400);
    } catch {
      setNote("Clipboard is blocked in this browser.");
    }
  }

  async function switchChain(): Promise<boolean> {
    const provider = injectedProvider();
    if (!provider) return false;
    try {
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: BOT_CHAIN_ID_HEX }],
      });
    } catch (error) {
      const code = (error as { code?: number }).code;
      if (code !== 4902 && code !== -32603) {
        setNote(walletMessage(error));
        return false;
      }
      try {
        await provider.request({
          method: "wallet_addEthereumChain",
          params: [botChainParams],
        });
      } catch (addError) {
        setNote(walletMessage(addError));
        return false;
      }
    }
    const next = (await provider.request({ method: "eth_chainId" })) as string;
    setChainId(next);
    return isBotChainId(next);
  }

  async function connect() {
    const provider = injectedProvider();
    if (!provider) {
      setProviderState("none");
      setNote("MetaMask is not installed in this browser.");
      return;
    }
    setBusy("connect");
    setNote(null);
    try {
      setWalletPaused(false);
      const accounts = (await provider.request({ method: "eth_requestAccounts" })) as string[];
      const first = accounts[0];
      if (!first || !isAddress(first)) throw new Error("No account returned.");
      setAccount(getAddress(first));
      setProviderState(provider.isMetaMask ? "metamask" : "injected");
      const id = (await provider.request({ method: "eth_chainId" })) as string;
      setChainId(id);
      if (!isBotChainId(id)) await switchChain();
    } catch (error) {
      setNote(walletMessage(error));
    } finally {
      setBusy(null);
    }
  }

  function disconnect() {
    setWalletPaused(true);
    setAccount(null);
    setBalance(null);
    setChainId(null);
  }

  function saveLocal() {
    if (!canSeal || !digest) return;
    const existing = seals.find((seal) => sameHash(seal.contentHash, digest));
    const next: Seal = {
      id: existing?.id ?? crypto.randomUUID(),
      agentId: agentId.trim(),
      title: title.trim(),
      statement: statement.trim(),
      canonical,
      contentHash: digest,
      label,
      createdAt: existing?.createdAt ?? Date.now(),
      status: existing?.status === "sealed" || existing?.status === "pending" ? existing.status : "draft",
      txHash: existing?.txHash,
      from: existing?.from,
      mode: existing?.mode,
      registry: existing?.registry,
      blockNumber: existing?.blockNumber,
      error: existing?.status === "failed" ? undefined : existing?.error,
    };
    if (existing?.status === "failed") next.status = "draft";
    remember(next);
    setNote("Proof kept in this browser. Anchor it when the wallet is on BOT Chain Testnet.");
  }

  async function sendAnchor(payload: {
    agentId: string;
    title: string;
    statement: string;
    canonical: string;
    contentHash: Hex;
    label: string;
  }) {
    const provider = injectedProvider();
    if (!provider) {
      setNote("Install MetaMask to put this digest on BOT Chain Testnet.");
      return;
    }
    if (!account) {
      await connect();
      return;
    }
    if (!isBotChainId(chainId)) {
      await switchChain();
      return;
    }
    if (anchorMode === "registry" && !registry) {
      setNote("Deploy or paste a registry, or anchor from this wallet.");
      return;
    }
    const already = seals.find(
      (seal) => sameHash(seal.contentHash, payload.contentHash) && seal.status === "sealed",
    );
    if (already) {
      setNote("This digest is already sealed in your ledger.");
      setTxInput(already.txHash ?? "");
      return;
    }

    const existing = seals.find((seal) => sameHash(seal.contentHash, payload.contentHash));
    const id = existing?.id ?? crypto.randomUUID();
    setBusy("anchor");
    setNote(null);
    try {
      const data =
        anchorMode === "registry" && registry
          ? encodeRegistryAnchor(payload.contentHash, payload.label)
          : encodeDirectAnchor(payload.contentHash, payload.label);
      const to = anchorMode === "registry" && registry ? registry : account;
      const txHash = (await provider.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: account,
            to,
            value: "0x0",
            data,
            chainId: BOT_CHAIN_ID_HEX,
          },
        ],
      })) as Hex;
      const pending: Seal = {
        ...payload,
        id,
        createdAt: existing?.createdAt ?? Date.now(),
        status: "pending",
        txHash,
        from: account,
        mode: anchorMode,
        registry: anchorMode === "registry" ? (registry ?? undefined) : undefined,
      };
      remember(pending);
      setTxInput(txHash);
      const receipt = await waitForReceipt(txHash);
      if (!receipt) {
        patchSeal(id, {
          error: "Submitted. The receipt has not landed yet.",
        });
        setNote("Transaction sent. It will show as sealed once the block is in.");
        return;
      }
      const blockNumber = Number(BigInt(receipt.blockNumber));
      if (receipt.status !== "0x1") {
        patchSeal(id, { status: "failed", blockNumber, error: "The transaction reverted." });
        setNote("The transaction was mined and reverted. Nothing was sealed.");
        return;
      }
      const mined = await readChainSeal(txHash);
      if (!mined?.contentHash || !sameHash(mined.contentHash, payload.contentHash)) {
        patchSeal(id, {
          status: "failed",
          blockNumber,
          error: "The mined transaction does not contain this digest.",
        });
        setNote("The transaction mined, but the payload was not this digest.");
        return;
      }
      patchSeal(id, { status: "sealed", blockNumber, error: undefined, from: mined.from });
      setNote("Sealed on BOT Chain Testnet.");
    } catch (error) {
      const message = walletMessage(error);
      if (existing) patchSeal(existing.id, { status: "failed", error: message });
      setNote(message);
    } finally {
      setBusy(null);
    }
  }

  async function verify() {
    const txHash = txInput.trim();
    const pastedDigest = (digestTouched ? digestInput : (digest ?? digestInput)).trim();
    if (!isBytes32(txHash) && !isBytes32(pastedDigest)) {
      setVerifyError("Paste a transaction hash, or a 32-byte digest.");
      setVerifyResult(null);
      return;
    }
    setBusy("verify");
    setVerifyError(null);
    setVerifyResult(null);
    try {
      const localHash = canSeal ? await sha256Hex(canonical) : null;
      const facts: Fact[] = [];
      let tone: VerifyTone = "found";
      let titleText = "Checked";
      let detail = "";
      let chainHash: Hex | null = null;

      if (isBytes32(txHash)) {
        const mined = await readChainSeal(txHash);
        if (!mined) {
          tone = "missing";
          titleText = "Not on BOT Chain Testnet";
          detail = "The testnet RPC has no transaction with that hash.";
        } else if (mined.pending) {
          tone = "pending";
          titleText = "Transaction is still pending";
          detail = "It has been broadcast, but it is not in a block yet.";
          facts.push({ label: "From", value: mined.from, href: explorerAddress(mined.from) });
        } else if (!mined.success) {
          tone = "failed";
          titleText = "Transaction reverted";
          detail = "It was mined, but the seal was not kept.";
          if (mined.blockNumber) {
            facts.push({
              label: "Block",
              value: String(mined.blockNumber),
              href: explorerBlock(mined.blockNumber),
            });
          }
        } else if (!mined.contentHash) {
          tone = "mismatch";
          titleText = "Mined, but not an AgentProof seal";
          detail = "The transaction data has no AgentProof payload.";
          facts.push({ label: "From", value: mined.from, href: explorerAddress(mined.from) });
        } else {
          chainHash = mined.contentHash;
          tone = "found";
          titleText = mined.mode === "registry" ? "Registry seal found" : "Personal seal found";
          detail =
            mined.mode === "direct"
              ? "The digest is stored in a transaction this wallet sent to itself."
              : "The digest was written by calling AgentProofRegistry.anchor.";
          facts.push(
            { label: "From", value: mined.from, href: explorerAddress(mined.from) },
            { label: "Digest", value: mined.contentHash },
            { label: "Label", value: mined.label || "—" },
          );
          if (mined.blockNumber) {
            facts.push({
              label: "Block",
              value: String(mined.blockNumber),
              href: explorerBlock(mined.blockNumber),
            });
          }
          facts.push({ label: "Transaction", value: shortHash(txHash), href: explorerTx(txHash) });
        }
      }

      if (registry && isBytes32(pastedDigest)) {
        const proof = await readRegistryProof(registry, pastedDigest);
        if (proof.exists) {
          chainHash = chainHash ?? pastedDigest;
          if (tone === "missing" || tone === "found") {
            tone = "found";
            if (!isBytes32(txHash)) {
              titleText = "Digest is in the registry";
              detail = "The contract records this hash. The original statement is not stored on chain.";
            }
          }
          facts.push(
            { label: "Registry", value: registry, href: explorerAddress(registry) },
            { label: "Recorded by", value: proof.agent, href: explorerAddress(proof.agent) },
            { label: "On-chain label", value: proof.label || "—" },
            {
              label: "Anchored",
              value: proof.anchoredAt ? formatWhen(proof.anchoredAt * 1000) : "—",
            },
          );
        } else if (!isBytes32(txHash)) {
          tone = "missing";
          titleText = "Digest is not in this registry";
          detail = "The contract has no record for that hash.";
          facts.push({ label: "Registry", value: registry, href: explorerAddress(registry) });
        }
      }

      if (localHash && chainHash) {
        if (sameHash(localHash, chainHash)) {
          tone = "match";
          titleText = "Statement matches the chain";
          detail = "Recomputed SHA-256 of the composer text is the digest anchored on testnet.";
        } else if (tone !== "failed" && tone !== "pending") {
          tone = "mismatch";
          titleText = "On chain, but the statement does not match";
          detail = "The composer text hashes to a different digest. One changed character is enough.";
        }
        facts.unshift({ label: "Composer digest", value: localHash });
      } else if (!localHash && tone === "found") {
        detail = `${detail} Fill in the original statement to check the words.`;
      }

      setVerifyResult({ tone, title: titleText, detail, facts });
    } catch (error) {
      setVerifyError(error instanceof Error ? error.message : "Verification failed.");
    } finally {
      setBusy(null);
    }
  }

  async function deployRegistry() {
    const provider = injectedProvider();
    if (!provider || !account) {
      setRegistryNote("Connect MetaMask on BOT Chain Testnet first.");
      return;
    }
    if (!isBotChainId(chainId)) {
      const switched = await switchChain();
      if (!switched) return;
    }
    setBusy("deploy");
    setRegistryNote(null);
    try {
      const txHash = (await provider.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: account,
            data: registryBytecode,
            value: "0x0",
            chainId: BOT_CHAIN_ID_HEX,
          },
        ],
      })) as Hex;
      setRegistryNote("Deploy sent. Waiting for the contract address.");
      const receipt = await waitForReceipt(txHash);
      if (!receipt || receipt.status !== "0x1" || !receipt.contractAddress) {
        setRegistryNote("Deploy did not produce a contract.");
        return;
      }
      const address = getAddress(receipt.contractAddress);
      setRegistry(address);
      setRegistryInput(address);
      saveRegistry(address);
      setAnchorMode("registry");
      setRegistryNote("Registry is live. New anchors can be looked up by digest.");
    } catch (error) {
      setRegistryNote(walletMessage(error));
    } finally {
      setBusy(null);
    }
  }

  function keepRegistry() {
    const value = registryInput.trim();
    if (!isAddress(value)) {
      setRegistryNote("Paste a 0x contract address.");
      return;
    }
    const address = getAddress(value);
    setRegistry(address);
    setRegistryInput(address);
    saveRegistry(address);
    setAnchorMode("registry");
    setRegistryNote("Registry saved in this browser.");
  }

  function clearRegistry() {
    setRegistry(null);
    setRegistryInput("");
    setRegistryCount(null);
    saveRegistry(null);
    setAnchorMode("direct");
    setRegistryNote("Registry cleared from this browser. Chain data is unchanged.");
  }

  function loadSeal(seal: Seal) {
    setAgentId(seal.agentId);
    setTitle(seal.title);
    setStatement(seal.statement);
    setTxInput(seal.txHash ?? "");
    setDigestTouched(false);
    setDigestInput("");
    document.getElementById("composer")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const shownDigest = digestTouched ? digestInput : (digest ?? "");
  const walletName = providerState === "metamask" ? "MetaMask" : "Wallet";

  return (
    <div className="min-h-screen bg-ink text-paper">
      <div className="h-1 bg-clay" />
      <header className="sticky top-0 z-20 border-b border-line bg-ink/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center">
          <div className="flex min-w-0 items-center gap-3">
            <SealMark className="size-10 shrink-0" />
            <div className="min-w-0">
              <p className="font-serif text-xl leading-none">AgentProof</p>
              <p className="mt-1 font-mono text-xs text-muted">BOT Chain Testnet · {BOT_CHAIN_ID}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:ml-auto">
            <p
              className={cn(
                "inline-flex min-h-11 items-center rounded-lg border px-3 font-mono text-xs",
                rpcDown ? "border-line text-muted" : "border-line text-paper",
              )}
            >
              <span
                className={cn("mr-2 size-2 rounded-full", rpcDown ? "bg-muted" : "bg-brass")}
                aria-hidden="true"
              />
              {rpcDown ? "RPC down" : block === null ? "Linking" : `#${block.toLocaleString("en-US")}`}
            </p>
            {account ? (
              <>
                <button
                  type="button"
                  className="inline-flex min-h-11 min-w-0 items-center gap-2 rounded-lg border border-line px-3 font-mono text-xs text-paper hover:border-brass"
                  onClick={() => void copyText(account, "account")}
                >
                  <Wallet className="size-4 shrink-0 text-brass" aria-hidden="true" />
                  <span className="truncate">{copied === "account" ? "Copied" : shortAddr(account)}</span>
                </button>
                <Button variant="quiet" onClick={disconnect}>
                  Disconnect
                </Button>
              </>
            ) : providerState === "none" ? (
              <a
                className="inline-flex min-h-11 flex-1 items-center justify-center rounded-lg bg-brass px-4 text-sm font-medium text-ink sm:flex-none"
                href="https://metamask.io/download/"
                target="_blank"
                rel="noreferrer"
              >
                Install MetaMask
              </a>
            ) : (
              <Button className="flex-1 sm:flex-none" onClick={() => void connect()} disabled={busy === "connect"}>
                {busy === "connect" ? <LoaderCircle className="size-4 animate-spin" /> : null}
                Connect {providerState === "unknown" ? "wallet" : walletName}
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-16 pt-8">
        <p className="font-mono text-xs uppercase tracking-widest text-brass">Public seal desk</p>
        <h1 className="mt-3 max-w-2xl font-serif text-4xl text-paper sm:text-5xl">
          Proofs an agent can show, and anyone can check.
        </h1>
        <p className="mt-4 max-w-2xl text-base text-muted">
          Write a statement. This page hashes it with SHA-256 in your browser, then MetaMask anchors
          that digest on BOT Chain Testnet. The words stay with you. The chain keeps the seal.
        </p>

        <ol className="mt-6 grid gap-3 sm:grid-cols-3">
          {steps.map((step) => (
            <li key={step.n} className="rounded-xl border border-line bg-panel px-4 py-4">
              <p className="font-mono text-xs text-brass">{step.n}</p>
              <p className="mt-2 font-serif text-lg">{step.title}</p>
              <p className="mt-1 text-sm text-muted">{step.body}</p>
            </li>
          ))}
        </ol>

        <dl className="mt-4 grid grid-cols-3 overflow-hidden rounded-xl border border-line bg-line">
          <div className="bg-panel px-3 py-4 sm:px-4">
            <dt className="text-xs text-muted">Saved here</dt>
            <dd className="mt-1 font-mono text-base tabular-nums sm:text-xl">{hydrated ? seals.length : "—"}</dd>
          </div>
          <div className="bg-panel px-3 py-4 sm:px-4">
            <dt className="text-xs text-muted">Testnet block</dt>
            <dd className="mt-1 font-mono text-base tabular-nums sm:text-xl">
              {block === null ? "—" : block.toLocaleString("en-US")}
            </dd>
          </div>
          <div className="bg-panel px-3 py-4 sm:px-4">
            <dt className="text-xs text-muted">Wallet BOT</dt>
            <dd className="mt-1 font-mono text-base tabular-nums sm:text-xl">
              {balance === null ? "—" : formatBot(balance)}
            </dd>
          </div>
        </dl>

        {account && chainId && !onBot ? (
          <div className="mt-4 flex flex-col gap-3 rounded-xl border border-brass bg-panel px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm">MetaMask is on another network. Seals belong on chain {BOT_CHAIN_ID}.</p>
            <Button onClick={() => void switchChain()}>Switch to BOT Testnet</Button>
          </div>
        ) : null}

        {account && onBot && balance === 0n ? (
          <p className="mt-4 text-sm text-muted">
            Balance is 0 BOT. Anchoring needs a little testnet gas.{" "}
            <a className="text-paper underline decoration-line underline-offset-4 hover:decoration-brass" href={BOT_FAUCET} target="_blank" rel="noreferrer">
              Open the faucet
            </a>
            .
          </p>
        ) : null}

        <div className="mt-6 grid items-start gap-4 lg:grid-cols-2">
          <section id="composer" className="rounded-xl border border-line bg-panel p-5 sm:p-6">
            <h2 className="font-serif text-2xl">Compose</h2>
            <p className="mt-1 text-sm text-muted">
              The digest is SHA-256 of a fixed text block: version, chain, agent, title, statement.
            </p>
            <form
              className="mt-5 grid gap-4"
              onSubmit={(event) => {
                event.preventDefault();
                if (!canSeal || !digest || busy === "anchor") return;
                void sendAnchor({
                  agentId: agentId.trim(),
                  title: title.trim(),
                  statement: statement.trim(),
                  canonical,
                  contentHash: digest,
                  label,
                });
              }}
            >
              <label className="grid gap-2 text-sm">
                Agent
                <input
                  id="agent"
                  className={fieldClass}
                  value={agentId}
                  maxLength={42}
                  placeholder="cipher"
                  autoComplete="off"
                  onChange={(event) => setAgentId(event.target.value)}
                />
              </label>
              <label className="grid gap-2 text-sm">
                Title
                <input
                  id="title"
                  className={fieldClass}
                  value={title}
                  maxLength={64}
                  placeholder="A claim worth keeping"
                  onChange={(event) => setTitle(event.target.value)}
                />
              </label>
              <label className="grid gap-2 text-sm">
                Statement
                <textarea
                  id="statement"
                  className={cn(fieldClass, "min-h-36 resize-y")}
                  value={statement}
                  maxLength={4000}
                  placeholder="What the agent asserts, in its own words."
                  onChange={(event) => setStatement(event.target.value)}
                />
                <span className="font-mono text-xs text-muted">{statement.trim().length}/4000</span>
              </label>

              <div className="rounded-lg border border-line bg-inset p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-mono text-xs uppercase tracking-widest text-muted">SHA-256</p>
                  {digest ? (
                    <button
                      type="button"
                      className="inline-flex min-h-11 items-center gap-2 text-sm text-paper"
                      onClick={() => void copyText(digest, "digest")}
                    >
                      <Copy className="size-4" aria-hidden="true" />
                      {copied === "digest" ? "Copied" : "Copy"}
                    </button>
                  ) : null}
                </div>
                <output id="digest" className="mt-2 block break-all font-mono text-sm text-paper">
                  {digest ?? "Fill in agent, title, and statement."}
                </output>
                {label.endsWith("…") ? (
                  <p className="mt-2 text-xs text-muted">The on-chain label is shortened to 80 bytes.</p>
                ) : null}
              </div>

              <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Where to anchor">
                <button
                  type="button"
                  role="radio"
                  aria-checked={anchorMode === "direct"}
                  className={cn(
                    "min-h-11 rounded-lg border px-3 text-sm",
                    anchorMode === "direct" ? "border-brass bg-inset text-paper" : "border-line text-muted",
                  )}
                  onClick={() => setAnchorMode("direct")}
                >
                  This wallet
                </button>
                <button
                  type="button"
                  role="radio"
                  aria-checked={anchorMode === "registry"}
                  disabled={!registry}
                  className={cn(
                    "min-h-11 rounded-lg border px-3 text-sm disabled:opacity-50",
                    anchorMode === "registry" ? "border-brass bg-inset text-paper" : "border-line text-muted",
                  )}
                  onClick={() => setAnchorMode("registry")}
                >
                  Registry
                </button>
              </div>
              <p className="text-sm text-muted">
                {anchorMode === "registry"
                  ? "Calls the registry contract so the digest can be looked up without a transaction hash."
                  : "Sends a zero-value transaction to your own address. The digest sits in the transaction data."}
              </p>

              <div className="flex flex-col gap-2 sm:flex-row">
                <Button type="submit" disabled={!canSeal || !digest || busy === "anchor"} className="sm:flex-1">
                  {busy === "anchor" ? <LoaderCircle className="size-4 animate-spin" /> : null}
                  {!account
                    ? `Connect to anchor`
                    : !onBot && chainId
                      ? "Switch to BOT Testnet"
                      : anchorMode === "registry"
                        ? "Anchor in registry"
                        : "Anchor on testnet"}
                </Button>
                <Button variant="ghost" disabled={!canSeal || !digest} onClick={saveLocal}>
                  Save locally
                </Button>
              </div>
              {note ? (
                <p className="text-sm text-paper" role="status">
                  {note}
                </p>
              ) : null}

              <details>
                <summary className="text-sm text-muted">Canonical text that gets hashed</summary>
                <pre className="mt-3 overflow-x-auto whitespace-pre-wrap break-words rounded-lg border border-line bg-inset p-3 font-mono text-xs text-paper">
                  {canonical}
                </pre>
              </details>
            </form>
          </section>

          <section className="rounded-xl border border-line bg-panel p-5 sm:p-6">
            <h2 className="font-serif text-2xl">Verify</h2>
            <p className="mt-1 text-sm text-muted">
              Read a transaction back from the testnet, or ask a registry if it has the digest. If the
              composer is filled in, the page recomputes SHA-256 and compares.
            </p>
            <div className="mt-5 grid gap-4">
              <label className="grid gap-2 text-sm">
                Transaction hash
                <input
                  id="tx-hash"
                  className={cn(fieldClass, "font-mono text-sm")}
                  value={txInput}
                  placeholder="0x…"
                  spellCheck={false}
                  onChange={(event) => setTxInput(event.target.value)}
                />
              </label>
              <label className="grid gap-2 text-sm">
                Digest
                <input
                  id="verify-digest"
                  className={cn(fieldClass, "font-mono text-sm")}
                  value={shownDigest}
                  placeholder="Uses the composer digest until you edit it"
                  spellCheck={false}
                  onChange={(event) => {
                    setDigestTouched(true);
                    setDigestInput(event.target.value);
                  }}
                />
              </label>
              {digestTouched ? (
                <button
                  type="button"
                  className="justify-self-start text-sm text-brass underline decoration-line underline-offset-4"
                  onClick={() => {
                    setDigestTouched(false);
                    setDigestInput("");
                  }}
                >
                  Use the composer digest
                </button>
              ) : null}
              <Button id="verify-btn" onClick={() => void verify()} disabled={busy === "verify"}>
                {busy === "verify" ? <LoaderCircle className="size-4 animate-spin" /> : null}
                Verify
              </Button>
              {verifyError ? (
                <p className="text-sm text-paper" role="alert">
                  {verifyError}
                </p>
              ) : null}
              {verifyResult ? <VerifyCard result={verifyResult} /> : null}
            </div>
          </section>
        </div>

        <section className="mt-4 rounded-xl border border-line bg-panel">
          <div className="flex items-end justify-between gap-3 border-b border-line px-5 py-4 sm:px-6">
            <div>
              <h2 className="font-serif text-2xl">Ledger</h2>
              <p className="mt-1 text-sm text-muted">Proofs kept in this browser, with their chain status.</p>
            </div>
          </div>
          {seals.length === 0 ? (
            <p className="px-5 py-8 text-sm text-muted sm:px-6">
              Nothing saved yet. A digest stays on this device until you anchor it.
            </p>
          ) : (
            <ul>
              {seals.map((seal) => (
                <li key={seal.id} className="border-b border-line px-5 py-4 last:border-b-0 sm:px-6">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-medium">{seal.title}</p>
                      <p className="truncate text-sm text-muted">{seal.agentId}</p>
                    </div>
                    <span
                      className={cn(
                        "inline-flex shrink-0 items-center rounded-md border px-2 py-1 font-mono text-xs",
                        seal.status === "sealed" && "border-brass bg-brass text-ink",
                        seal.status === "pending" && "border-brass text-brass",
                        seal.status === "draft" && "border-line text-muted",
                        seal.status === "failed" && "border-line text-paper",
                      )}
                    >
                      {statusLabel(seal.status)}
                    </span>
                  </div>
                  <p className="mt-2 break-all font-mono text-xs text-muted">{seal.contentHash}</p>
                  <p className="mt-1 text-xs text-muted">{formatWhen(seal.createdAt)}</p>
                  {seal.error ? <p className="mt-2 text-sm text-paper">{seal.error}</p> : null}
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button variant="quiet" onClick={() => loadSeal(seal)}>
                      Open
                    </Button>
                    <Button variant="quiet" onClick={() => void copyText(seal.contentHash, seal.id)}>
                      {copied === seal.id ? "Copied" : "Copy digest"}
                    </Button>
                    {seal.status !== "sealed" && seal.status !== "pending" ? (
                      <Button
                        variant="ghost"
                        disabled={busy === "anchor"}
                        onClick={() =>
                          void sendAnchor({
                            agentId: seal.agentId,
                            title: seal.title,
                            statement: seal.statement,
                            canonical: seal.canonical,
                            contentHash: seal.contentHash,
                            label: seal.label,
                          })
                        }
                      >
                        Anchor
                      </Button>
                    ) : null}
                    {seal.txHash ? (
                      <a
                        className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-line px-3 text-sm text-paper hover:border-brass"
                        href={explorerTx(seal.txHash)}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Explorer
                        <ExternalLink className="size-4" aria-hidden="true" />
                      </a>
                    ) : null}
                    {seal.status === "draft" || seal.status === "failed" ? (
                      <Button
                        variant="quiet"
                        onClick={() => setSeals((current) => current.filter((item) => item.id !== seal.id))}
                      >
                        Remove
                      </Button>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="mt-4 rounded-xl border border-line bg-panel p-5 sm:p-6">
          <h2 className="font-serif text-2xl">Registry</h2>
          <p className="mt-2 max-w-3xl text-sm text-muted">
            Optional. A personal anchor is enough to prove a transaction. Deploy AgentProofRegistry if
            you want any visitor to look a digest up by hash. The contract stores the digest, your
            address, a short label, and the time — not the statement.
          </p>
          <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-muted">Address in this browser</dt>
              <dd className="mt-1 break-all font-mono text-xs">
                {registry ? (
                  <a className="underline decoration-line underline-offset-4 hover:decoration-brass" href={explorerAddress(registry)} target="_blank" rel="noreferrer">
                    {registry}
                  </a>
                ) : (
                  "None yet"
                )}
              </dd>
            </div>
            <div>
              <dt className="text-muted">Seals in the contract</dt>
              <dd className="mt-1 font-mono tabular-nums">{registryCount === null ? "—" : registryCount}</dd>
            </div>
          </dl>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <input
              className={cn(fieldClass, "font-mono text-sm")}
              value={registryInput}
              placeholder="0x registry address"
              spellCheck={false}
              onChange={(event) => setRegistryInput(event.target.value)}
              aria-label="Registry address"
            />
            <Button variant="ghost" onClick={keepRegistry}>
              Save
            </Button>
            <Button variant="quiet" onClick={clearRegistry} disabled={!registry && !registryInput}>
              Clear
            </Button>
          </div>
          <div className="mt-3">
            <Button onClick={() => void deployRegistry()} disabled={busy === "deploy"}>
              {busy === "deploy" ? <LoaderCircle className="size-4 animate-spin" /> : null}
              Deploy from MetaMask
            </Button>
          </div>
          {registryNote ? (
            <p className="mt-3 text-sm text-paper" role="status">
              {registryNote}
            </p>
          ) : null}
        </section>

        <footer className="mt-8 flex flex-col gap-3 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>Testnet only. Chain {BOT_CHAIN_ID}, native token BOT. Nothing here spends mainnet funds.</p>
          <p className="flex flex-wrap gap-x-4 gap-y-2">
            <a className="underline decoration-line underline-offset-4 hover:decoration-brass" href={BOT_FAUCET} target="_blank" rel="noreferrer">
              Faucet
            </a>
            <a className="underline decoration-line underline-offset-4 hover:decoration-brass" href={BOT_EXPLORER} target="_blank" rel="noreferrer">
              Explorer
            </a>
            <a className="underline decoration-line underline-offset-4 hover:decoration-brass" href={BOT_DOCS} target="_blank" rel="noreferrer">
              Network guide
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
}

function VerifyCard({ result }: { result: VerifyResult }) {
  const Icon =
    result.tone === "match" ? BadgeCheck : result.tone === "mismatch" || result.tone === "failed" ? CircleAlert : ScrollText;
  return (
    <div
      className={cn(
        "rise rounded-lg border p-4",
        result.tone === "match" ? "border-brass" : "border-line",
      )}
      role="status"
    >
      <div className="flex items-start gap-3">
        <Icon className={cn("mt-1 size-5 shrink-0", result.tone === "match" ? "text-brass" : "text-muted")} aria-hidden="true" />
        <div className="min-w-0">
          <p className="font-serif text-lg">{result.title}</p>
          <p className="mt-1 text-sm text-muted">{result.detail}</p>
        </div>
      </div>
      {result.facts.length > 0 ? (
        <dl className="mt-4 grid gap-3">
          {result.facts.map((fact) => (
            <div key={`${fact.label}-${fact.value}`}>
              <dt className="text-xs text-muted">{fact.label}</dt>
              <dd className="break-all font-mono text-xs text-paper">
                {fact.href ? (
                  <a className="underline decoration-line underline-offset-4 hover:decoration-brass" href={fact.href} target="_blank" rel="noreferrer">
                    {fact.value}
                  </a>
                ) : (
                  fact.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}
    </div>
  );
}
