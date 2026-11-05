import type { Address, Hex } from "viem";
import { isAddress, isBytes32 } from "@/lib/chain";

export type SealStatus = "draft" | "pending" | "sealed" | "failed";
export type AnchorMode = "direct" | "registry";

export type Seal = {
  id: string;
  agentId: string;
  title: string;
  statement: string;
  canonical: string;
  contentHash: Hex;
  label: string;
  createdAt: number;
  status: SealStatus;
  txHash?: Hex;
  from?: Address;
  mode?: AnchorMode;
  registry?: Address;
  blockNumber?: number;
  error?: string;
};

const SEAL_KEY = "agentproof.seals.v1";
const REGISTRY_KEY = "agentproof.registry.v1";

function isSeal(value: unknown): value is Seal {
  if (!value || typeof value !== "object") return false;
  const seal = value as Seal;
  return (
    typeof seal.id === "string" &&
    typeof seal.agentId === "string" &&
    typeof seal.title === "string" &&
    typeof seal.statement === "string" &&
    typeof seal.canonical === "string" &&
    typeof seal.contentHash === "string" &&
    isBytes32(seal.contentHash) &&
    typeof seal.label === "string" &&
    typeof seal.createdAt === "number" &&
    (seal.status === "draft" ||
      seal.status === "pending" ||
      seal.status === "sealed" ||
      seal.status === "failed")
  );
}

export function loadSeals(): Seal[] {
  if (typeof localStorage === "undefined") return [];
  try {
    const raw = localStorage.getItem(SEAL_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isSeal).slice(0, 40);
  } catch {
    return [];
  }
}

export function saveSeals(seals: Seal[]) {
  localStorage.setItem(SEAL_KEY, JSON.stringify(seals.slice(0, 40)));
}

export function loadRegistry(): Address | null {
  if (typeof localStorage === "undefined") return null;
  const value = localStorage.getItem(REGISTRY_KEY);
  if (!value || !isAddress(value)) return null;
  return value;
}

export function saveRegistry(address: Address | null) {
  if (!address) localStorage.removeItem(REGISTRY_KEY);
  else localStorage.setItem(REGISTRY_KEY, address);
}

const PAUSE_KEY = "agentproof.wallet-paused";

export function walletPaused(): boolean {
  if (typeof localStorage === "undefined") return false;
  return localStorage.getItem(PAUSE_KEY) === "1";
}

export function setWalletPaused(paused: boolean) {
  if (paused) localStorage.setItem(PAUSE_KEY, "1");
  else localStorage.removeItem(PAUSE_KEY);
}
