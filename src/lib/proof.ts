import type { Hex } from "viem";

const encoder = new TextEncoder();

export function canonicalText(input: {
  agentId: string;
  title: string;
  statement: string;
}): string {
  const agent = input.agentId.trim();
  const title = input.title.trim();
  const statement = input.statement.replace(/\r\n/g, "\n").trim();
  return `AgentProof v1\nchain: bot-testnet-968\nagent: ${agent}\ntitle: ${title}\n---\n${statement}\n`;
}

export function makeLabel(agentId: string, title: string): string {
  const raw = `${agentId.trim()} — ${title.trim()}`;
  if (encoder.encode(raw).length <= 80) return raw;
  let out = raw;
  while (encoder.encode(`${out}…`).length > 80 && out.length > 0) {
    out = out.slice(0, -1);
  }
  return `${out.trimEnd()}…`;
}

export async function sha256Hex(text: string): Promise<Hex> {
  const digest = await crypto.subtle.digest("SHA-256", encoder.encode(text));
  const hex = Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
  return `0x${hex}`;
}

export function sameHash(a: string, b: string): boolean {
  return a.toLowerCase() === b.toLowerCase();
}
