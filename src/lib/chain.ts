import {
  bytesToHex,
  bytesToString,
  decodeFunctionData,
  decodeFunctionResult,
  encodeFunctionData,
  getAddress,
  hexToBytes,
  isAddress,
  isHex,
  stringToBytes,
  type Address,
  type Hex,
} from "viem";
import { registryAbi, registryBytecode } from "@/lib/registry";

export const BOT_CHAIN_ID = 968;
export const BOT_CHAIN_ID_HEX = "0x3c8" as Hex;
export const BOT_RPC = "https://rpc.bohr.life";
export const BOT_EXPLORER = "https://scan.bohr.life";
export const BOT_FAUCET = "https://faucet.botchain.ai/basic";
export const BOT_DOCS = "https://dev-docs.botchain.ai/docs/Developers/quick-guide/";

export const botChainParams = {
  chainId: BOT_CHAIN_ID_HEX,
  chainName: "BOT Chain Testnet",
  nativeCurrency: { name: "BOT", symbol: "BOT", decimals: 18 },
  rpcUrls: [BOT_RPC],
  blockExplorerUrls: [BOT_EXPLORER],
};

const MAGIC = [0x41, 0x47, 0x50, 0x31];

export type { Address, Hex };
export { registryBytecode, isAddress, getAddress };

export function isBotChainId(chainId: string | null | undefined): boolean {
  if (!chainId) return false;
  try {
    return BigInt(chainId) === BigInt(BOT_CHAIN_ID);
  } catch {
    return false;
  }
}

export function isBytes32(value: string): value is Hex {
  return /^0x[0-9a-fA-F]{64}$/.test(value.trim());
}

async function rpc<T>(method: string, params: unknown[]): Promise<T> {
  let response: Response;
  try {
    response = await fetch(BOT_RPC, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
    });
  } catch {
    throw new Error("BOT Chain Testnet RPC is unreachable.");
  }
  if (!response.ok) throw new Error(`BOT Chain RPC returned ${response.status}.`);
  const body = (await response.json()) as { result?: T; error?: { message?: string } };
  if (body.error) throw new Error(body.error.message || "BOT Chain RPC error.");
  return body.result as T;
}

export function encodeDirectAnchor(contentHash: Hex, label: string): Hex {
  const hashBytes = hexToBytes(contentHash);
  const labelBytes = stringToBytes(label);
  if (hashBytes.length !== 32) throw new Error("Digest must be 32 bytes.");
  if (labelBytes.length === 0 || labelBytes.length > 80) {
    throw new Error("Label must be 1–80 bytes.");
  }
  const out = new Uint8Array(4 + 32 + labelBytes.length);
  out.set(MAGIC, 0);
  out.set(hashBytes, 4);
  out.set(labelBytes, 36);
  return bytesToHex(out);
}

export function encodeRegistryAnchor(contentHash: Hex, label: string): Hex {
  return encodeFunctionData({
    abi: registryAbi,
    functionName: "anchor",
    args: [contentHash, label],
  });
}

export function decodeAnchorData(
  data: Hex,
): { mode: "direct" | "registry"; contentHash: Hex; label: string } | null {
  if (!isHex(data) || data === "0x") return null;
  const bytes = hexToBytes(data);
  if (
    bytes.length >= 36 &&
    bytes[0] === MAGIC[0] &&
    bytes[1] === MAGIC[1] &&
    bytes[2] === MAGIC[2] &&
    bytes[3] === MAGIC[3]
  ) {
    let label = "";
    try {
      label = bytesToString(bytes.slice(36));
    } catch {
      label = "";
    }
    return { mode: "direct", contentHash: bytesToHex(bytes.slice(4, 36)), label };
  }
  try {
    const decoded = decodeFunctionData({ abi: registryAbi, data });
    if (decoded.functionName !== "anchor") return null;
    const [contentHash, label] = decoded.args;
    return { mode: "registry", contentHash, label };
  } catch {
    return null;
  }
}

type RpcTx = {
  from: Hex;
  to: Hex | null;
  input?: Hex;
  blockNumber: Hex | null;
  chainId?: Hex;
};

type RpcReceipt = {
  status: Hex;
  blockNumber: Hex;
  contractAddress: Address | null;
};

export type ChainSeal = {
  from: Address;
  to: Address | null;
  mode: "direct" | "registry" | "other";
  contentHash?: Hex;
  label?: string;
  pending: boolean;
  success: boolean;
  blockNumber?: number;
};

export async function readHead(): Promise<number> {
  const hex = await rpc<Hex>("eth_blockNumber", []);
  return Number(BigInt(hex));
}

export async function readBalance(address: Address): Promise<bigint> {
  const hex = await rpc<Hex>("eth_getBalance", [address, "latest"]);
  return BigInt(hex);
}

export async function readChainSeal(txHash: Hex): Promise<ChainSeal | null> {
  const tx = await rpc<RpcTx | null>("eth_getTransactionByHash", [txHash]);
  if (!tx) return null;
  const input = (tx.input ?? "0x") as Hex;
  const parsed = decodeAnchorData(input);
  const receipt = tx.blockNumber
    ? await rpc<RpcReceipt | null>("eth_getTransactionReceipt", [txHash])
    : null;
  return {
    from: getAddress(tx.from),
    to: tx.to ? getAddress(tx.to) : null,
    mode: parsed?.mode ?? "other",
    contentHash: parsed?.contentHash,
    label: parsed?.label,
    pending: !tx.blockNumber,
    success: receipt ? receipt.status === "0x1" : false,
    blockNumber: receipt
      ? Number(BigInt(receipt.blockNumber))
      : tx.blockNumber
        ? Number(BigInt(tx.blockNumber))
        : undefined,
  };
}

export type RegistryProof = {
  exists: boolean;
  agent: Address;
  label: string;
  anchoredAt: number;
};

export async function readRegistryProof(
  registry: Address,
  contentHash: Hex,
): Promise<RegistryProof> {
  const data = await rpc<Hex>("eth_call", [
    {
      to: registry,
      data: encodeFunctionData({
        abi: registryAbi,
        functionName: "verify",
        args: [contentHash],
      }),
    },
    "latest",
  ]);
  const [exists, agent, label, anchoredAt] = decodeFunctionResult({
    abi: registryAbi,
    functionName: "verify",
    data,
  });
  return {
    exists: Boolean(exists),
    agent: getAddress(agent),
    label,
    anchoredAt: Number(anchoredAt),
  };
}

export async function readRegistryCount(registry: Address): Promise<number> {
  const data = await rpc<Hex>("eth_call", [
    {
      to: registry,
      data: encodeFunctionData({ abi: registryAbi, functionName: "count" }),
    },
    "latest",
  ]);
  const decoded = decodeFunctionResult({ abi: registryAbi, functionName: "count", data });
  return Number(decoded as bigint);
}

export async function waitForReceipt(txHash: Hex, attempts = 24): Promise<RpcReceipt | null> {
  for (let i = 0; i < attempts; i += 1) {
    const receipt = await rpc<RpcReceipt | null>("eth_getTransactionReceipt", [txHash]);
    if (receipt) return receipt;
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
  return null;
}

export function formatBot(wei: bigint): string {
  const whole = wei / 10n ** 18n;
  const frac = (wei % 10n ** 18n).toString().padStart(18, "0").slice(0, 4);
  return `${whole.toLocaleString("en-US")}.${frac}`;
}

export function shortAddr(address: string): string {
  if (address.length < 12) return address;
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

export function shortHash(value: string): string {
  if (value.length < 16) return value;
  return `${value.slice(0, 8)}…${value.slice(-6)}`;
}

export function explorerTx(hash: string): string {
  return `${BOT_EXPLORER}/tx/${hash}`;
}

export function explorerAddress(address: string): string {
  return `${BOT_EXPLORER}/address/${address}`;
}

export function explorerBlock(block: number): string {
  return `${BOT_EXPLORER}/block/${block}`;
}

export function walletMessage(error: unknown): string {
  const err = error as { code?: number; message?: string };
  if (err?.code === 4001) return "Request declined in the wallet.";
  const message = err?.message ?? "The wallet request failed.";
  if (/insufficient funds/i.test(message)) {
    return "Not enough testnet BOT for gas. Use the faucet, then try again.";
  }
  const cleaned = message.replace(/^MetaMask Tx Signature:\s*/i, "");
  return cleaned.length > 220 ? `${cleaned.slice(0, 220)}…` : cleaned;
}

export function formatWhen(ms: number): string {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(ms));
}
