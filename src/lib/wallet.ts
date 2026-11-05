export type Eip1193 = {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on?: (event: string, listener: (...args: unknown[]) => void) => void;
  removeListener?: (event: string, listener: (...args: unknown[]) => void) => void;
  isMetaMask?: boolean;
  providers?: Eip1193[];
};

type EthereumWindow = Window & { ethereum?: Eip1193 };

export function injectedProvider(): Eip1193 | null {
  if (typeof window === "undefined") return null;
  const eth = (window as EthereumWindow).ethereum;
  if (!eth) return null;
  if (Array.isArray(eth.providers) && eth.providers.length > 0) {
    return eth.providers.find((provider) => provider.isMetaMask) ?? eth.providers[0] ?? eth;
  }
  return eth;
}
