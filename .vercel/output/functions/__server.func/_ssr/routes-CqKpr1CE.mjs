import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as ExternalLink, c as BadgeCheck, i as LoaderCircle, o as Copy, r as ScrollText, s as CircleAlert, t as Wallet } from "../_libs/lucide-react.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { a as isAddress, c as stringToBytes, i as encodeFunctionData, l as bytesToHex, n as decodeFunctionResult, o as getAddress, r as bytesToString, s as hexToBytes, t as decodeFunctionData, u as isHex } from "../_libs/viem.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CqKpr1CE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var variants = {
	primary: "bg-brass text-ink hover:bg-brass-bright",
	ghost: "border border-line bg-transparent text-paper hover:border-brass",
	quiet: "bg-inset text-paper hover:bg-line"
};
function Button({ variant = "primary", className, type = "button", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type,
		className: cn("inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50", variants[variant], className),
		...props
	});
}
var fieldClass = "w-full rounded-lg border border-line bg-inset px-3 py-3 text-base text-paper placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass";
/** solc 0.8.38, optimizer 200 runs. Source: contracts/AgentProofRegistry.sol */
var registryAbi = [
	{
		type: "error",
		name: "AlreadyAnchored",
		inputs: []
	},
	{
		type: "error",
		name: "BadLabel",
		inputs: []
	},
	{
		type: "error",
		name: "EmptyHash",
		inputs: []
	},
	{
		type: "event",
		name: "ProofAnchored",
		anonymous: false,
		inputs: [
			{
				name: "contentHash",
				type: "bytes32",
				indexed: true
			},
			{
				name: "agent",
				type: "address",
				indexed: true
			},
			{
				name: "label",
				type: "string",
				indexed: false
			},
			{
				name: "anchoredAt",
				type: "uint256",
				indexed: false
			}
		]
	},
	{
		type: "function",
		name: "anchor",
		stateMutability: "nonpayable",
		inputs: [{
			name: "contentHash",
			type: "bytes32"
		}, {
			name: "label",
			type: "string"
		}],
		outputs: []
	},
	{
		type: "function",
		name: "count",
		stateMutability: "view",
		inputs: [],
		outputs: [{
			name: "count",
			type: "uint256"
		}]
	},
	{
		type: "function",
		name: "verify",
		stateMutability: "view",
		inputs: [{
			name: "contentHash",
			type: "bytes32"
		}],
		outputs: [
			{
				name: "exists",
				type: "bool"
			},
			{
				name: "agent",
				type: "address"
			},
			{
				name: "label",
				type: "string"
			},
			{
				name: "anchoredAt",
				type: "uint256"
			}
		]
	}
];
var registryBytecode = "0x6080604052348015600e575f5ffd5b506105ef8061001c5f395ff3fe608060405234801561000f575f5ffd5b506004361061003f575f3560e01c806306661abd146100435780631a8512ea1461005f57806375e3661614610074575b5f5ffd5b61004c60015481565b6040519081526020015b60405180910390f35b61007261006d366004610319565b610097565b005b610087610082366004610390565b610239565b60405161005694939291906103a7565b826100b557604051631c37cddf60e21b815260040160405180910390fd5b808015806100c35750605081115b156100e157604051636fc7075360e01b815260040160405180910390fd5b5f84815260208190526040902054600160a01b900467ffffffffffffffff161561011e5760405163a0094ce360e01b815260040160405180910390fd5b6040518060600160405280336001600160a01b031681526020014267ffffffffffffffff16815260200184848080601f0160208091040260200160405190810160405280939291908181526020018383808284375f9201829052509390945250508681526020818152604091829020845181549286015167ffffffffffffffff16600160a01b026001600160e01b03199093166001600160a01b03909116179190911781559083015190915060018201906101d9908261049e565b509050506001805f8282546101ee919061055d565b9091555050604051339085907f81f284d4b62941679ac22fc1b5e8afea526a474ed188d27fbbdf35041698c9559061022b90879087904290610582565b60405180910390a350505050565b5f818152602081905260408120805460018201805467ffffffffffffffff600160a01b8404161515946001600160a01b039093169360609392909161027d9061040f565b80601f01602080910402602001604051908101604052809291908181526020018280546102a99061040f565b80156102f45780601f106102cb576101008083540402835291602001916102f4565b820191905f5260205f20905b8154815290600101906020018083116102d757829003601f168201915b5050935497999698509196600160a01b900467ffffffffffffffff1695945050505050565b5f5f5f6040848603121561032b575f5ffd5b83359250602084013567ffffffffffffffff811115610348575f5ffd5b8401601f81018613610358575f5ffd5b803567ffffffffffffffff81111561036e575f5ffd5b86602082840101111561037f575f5ffd5b939660209190910195509293505050565b5f602082840312156103a0575f5ffd5b5035919050565b841515815260018060a01b0384166020820152608060408201525f8351806080840152806020860160a085015e5f60a0828501015260a0601f19601f83011684010191505082606083015295945050505050565b634e487b7160e01b5f52604160045260245ffd5b600181811c9082168061042357607f821691505b60208210810361044157634e487b7160e01b5f52602260045260245ffd5b50919050565b601f821115610499578282111561049957805f5260205f20601f840160051c602085101561047257505f5b90810190601f840160051c035f5b81811015610495575f83820155600101610480565b5050505b505050565b815167ffffffffffffffff8111156104b8576104b86103fb565b6104cc816104c6845461040f565b84610447565b6020601f8211600181146104fe575f83156104e75750848201515b5f19600385901b1c1916600184901b178455610556565b5f84815260208120601f198516915b8281101561052d578785015182556020948501946001909201910161050d565b508482101561054a57868401515f19600387901b60f8161c191681555b505060018360011b0184555b5050505050565b8082018082111561057c57634e487b7160e01b5f52601160045260245ffd5b92915050565b60408152826040820152828460608301375f606084830101525f6060601f19601f860116830101905082602083015294935050505056fea264697066735822122004fb5b4c6ad8aba61ad32ae6edfc5258c74d8bf81abebea2226729087612cde464736f6c63430008260033";
var BOT_CHAIN_ID_HEX = "0x3c8";
var BOT_RPC = "https://rpc.bohr.life";
var BOT_EXPLORER = "https://scan.bohr.life";
var BOT_FAUCET = "https://faucet.botchain.ai/basic";
var BOT_DOCS = "https://dev-docs.botchain.ai/docs/Developers/quick-guide/";
var botChainParams = {
	chainId: BOT_CHAIN_ID_HEX,
	chainName: "BOT Chain Testnet",
	nativeCurrency: {
		name: "BOT",
		symbol: "BOT",
		decimals: 18
	},
	rpcUrls: [BOT_RPC],
	blockExplorerUrls: [BOT_EXPLORER]
};
var MAGIC = [
	65,
	71,
	80,
	49
];
function isBotChainId(chainId) {
	if (!chainId) return false;
	try {
		return BigInt(chainId) === BigInt(968);
	} catch {
		return false;
	}
}
function isBytes32(value) {
	return /^0x[0-9a-fA-F]{64}$/.test(value.trim());
}
async function rpc(method, params) {
	let response;
	try {
		response = await fetch(BOT_RPC, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				jsonrpc: "2.0",
				id: 1,
				method,
				params
			})
		});
	} catch {
		throw new Error("BOT Chain Testnet RPC is unreachable.");
	}
	if (!response.ok) throw new Error(`BOT Chain RPC returned ${response.status}.`);
	const body = await response.json();
	if (body.error) throw new Error(body.error.message || "BOT Chain RPC error.");
	return body.result;
}
function encodeDirectAnchor(contentHash, label) {
	const hashBytes = hexToBytes(contentHash);
	const labelBytes = stringToBytes(label);
	if (hashBytes.length !== 32) throw new Error("Digest must be 32 bytes.");
	if (labelBytes.length === 0 || labelBytes.length > 80) throw new Error("Label must be 1–80 bytes.");
	const out = new Uint8Array(36 + labelBytes.length);
	out.set(MAGIC, 0);
	out.set(hashBytes, 4);
	out.set(labelBytes, 36);
	return bytesToHex(out);
}
function encodeRegistryAnchor(contentHash, label) {
	return encodeFunctionData({
		abi: registryAbi,
		functionName: "anchor",
		args: [contentHash, label]
	});
}
function decodeAnchorData(data) {
	if (!isHex(data) || data === "0x") return null;
	const bytes = hexToBytes(data);
	if (bytes.length >= 36 && bytes[0] === MAGIC[0] && bytes[1] === MAGIC[1] && bytes[2] === MAGIC[2] && bytes[3] === MAGIC[3]) {
		let label = "";
		try {
			label = bytesToString(bytes.slice(36));
		} catch {
			label = "";
		}
		return {
			mode: "direct",
			contentHash: bytesToHex(bytes.slice(4, 36)),
			label
		};
	}
	try {
		const decoded = decodeFunctionData({
			abi: registryAbi,
			data
		});
		if (decoded.functionName !== "anchor") return null;
		const [contentHash, label] = decoded.args;
		return {
			mode: "registry",
			contentHash,
			label
		};
	} catch {
		return null;
	}
}
async function readHead() {
	const hex = await rpc("eth_blockNumber", []);
	return Number(BigInt(hex));
}
async function readBalance(address) {
	const hex = await rpc("eth_getBalance", [address, "latest"]);
	return BigInt(hex);
}
async function readChainSeal(txHash) {
	const tx = await rpc("eth_getTransactionByHash", [txHash]);
	if (!tx) return null;
	const parsed = decodeAnchorData(tx.input ?? "0x");
	const receipt = tx.blockNumber ? await rpc("eth_getTransactionReceipt", [txHash]) : null;
	return {
		from: getAddress(tx.from),
		to: tx.to ? getAddress(tx.to) : null,
		mode: parsed?.mode ?? "other",
		contentHash: parsed?.contentHash,
		label: parsed?.label,
		pending: !tx.blockNumber,
		success: receipt ? receipt.status === "0x1" : false,
		blockNumber: receipt ? Number(BigInt(receipt.blockNumber)) : tx.blockNumber ? Number(BigInt(tx.blockNumber)) : void 0
	};
}
async function readRegistryProof(registry, contentHash) {
	const data = await rpc("eth_call", [{
		to: registry,
		data: encodeFunctionData({
			abi: registryAbi,
			functionName: "verify",
			args: [contentHash]
		})
	}, "latest"]);
	const [exists, agent, label, anchoredAt] = decodeFunctionResult({
		abi: registryAbi,
		functionName: "verify",
		data
	});
	return {
		exists: Boolean(exists),
		agent: getAddress(agent),
		label,
		anchoredAt: Number(anchoredAt)
	};
}
async function readRegistryCount(registry) {
	const data = await rpc("eth_call", [{
		to: registry,
		data: encodeFunctionData({
			abi: registryAbi,
			functionName: "count"
		})
	}, "latest"]);
	const decoded = decodeFunctionResult({
		abi: registryAbi,
		functionName: "count",
		data
	});
	return Number(decoded);
}
async function waitForReceipt(txHash, attempts = 24) {
	for (let i = 0; i < attempts; i += 1) {
		const receipt = await rpc("eth_getTransactionReceipt", [txHash]);
		if (receipt) return receipt;
		await new Promise((resolve) => setTimeout(resolve, 2e3));
	}
	return null;
}
function formatBot(wei) {
	const whole = wei / 10n ** 18n;
	const frac = (wei % 10n ** 18n).toString().padStart(18, "0").slice(0, 4);
	return `${whole.toLocaleString("en-US")}.${frac}`;
}
function shortAddr(address) {
	if (address.length < 12) return address;
	return `${address.slice(0, 6)}…${address.slice(-4)}`;
}
function shortHash(value) {
	if (value.length < 16) return value;
	return `${value.slice(0, 8)}…${value.slice(-6)}`;
}
function explorerTx(hash) {
	return `${BOT_EXPLORER}/tx/${hash}`;
}
function explorerAddress(address) {
	return `${BOT_EXPLORER}/address/${address}`;
}
function explorerBlock(block) {
	return `${BOT_EXPLORER}/block/${block}`;
}
function walletMessage(error) {
	const err = error;
	if (err?.code === 4001) return "Request declined in the wallet.";
	const message = err?.message ?? "The wallet request failed.";
	if (/insufficient funds/i.test(message)) return "Not enough testnet BOT for gas. Use the faucet, then try again.";
	const cleaned = message.replace(/^MetaMask Tx Signature:\s*/i, "");
	return cleaned.length > 220 ? `${cleaned.slice(0, 220)}…` : cleaned;
}
function formatWhen(ms) {
	return new Intl.DateTimeFormat("en", {
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit"
	}).format(new Date(ms));
}
var encoder = new TextEncoder();
function canonicalText(input) {
	return `AgentProof v1\nchain: bot-testnet-968\nagent: ${input.agentId.trim()}\ntitle: ${input.title.trim()}\n---\n${input.statement.replace(/\r\n/g, "\n").trim()}\n`;
}
function makeLabel(agentId, title) {
	const raw = `${agentId.trim()} — ${title.trim()}`;
	if (encoder.encode(raw).length <= 80) return raw;
	let out = raw;
	while (encoder.encode(`${out}…`).length > 80 && out.length > 0) out = out.slice(0, -1);
	return `${out.trimEnd()}…`;
}
async function sha256Hex(text) {
	const digest = await crypto.subtle.digest("SHA-256", encoder.encode(text));
	return `0x${Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("")}`;
}
function sameHash(a, b) {
	return a.toLowerCase() === b.toLowerCase();
}
var SEAL_KEY = "agentproof.seals.v1";
var REGISTRY_KEY = "agentproof.registry.v1";
function isSeal(value) {
	if (!value || typeof value !== "object") return false;
	const seal = value;
	return typeof seal.id === "string" && typeof seal.agentId === "string" && typeof seal.title === "string" && typeof seal.statement === "string" && typeof seal.canonical === "string" && typeof seal.contentHash === "string" && isBytes32(seal.contentHash) && typeof seal.label === "string" && typeof seal.createdAt === "number" && (seal.status === "draft" || seal.status === "pending" || seal.status === "sealed" || seal.status === "failed");
}
function loadSeals() {
	if (typeof localStorage === "undefined") return [];
	try {
		const raw = localStorage.getItem(SEAL_KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		if (!Array.isArray(parsed)) return [];
		return parsed.filter(isSeal).slice(0, 40);
	} catch {
		return [];
	}
}
function saveSeals(seals) {
	localStorage.setItem(SEAL_KEY, JSON.stringify(seals.slice(0, 40)));
}
function loadRegistry() {
	if (typeof localStorage === "undefined") return null;
	const value = localStorage.getItem(REGISTRY_KEY);
	if (!value || !isAddress(value)) return null;
	return value;
}
function saveRegistry(address) {
	if (!address) localStorage.removeItem(REGISTRY_KEY);
	else localStorage.setItem(REGISTRY_KEY, address);
}
var PAUSE_KEY = "agentproof.wallet-paused";
function walletPaused() {
	if (typeof localStorage === "undefined") return false;
	return localStorage.getItem(PAUSE_KEY) === "1";
}
function setWalletPaused(paused) {
	if (paused) localStorage.setItem(PAUSE_KEY, "1");
	else localStorage.removeItem(PAUSE_KEY);
}
function injectedProvider() {
	if (typeof window === "undefined") return null;
	const eth = window.ethereum;
	if (!eth) return null;
	if (Array.isArray(eth.providers) && eth.providers.length > 0) return eth.providers.find((provider) => provider.isMetaMask) ?? eth.providers[0] ?? eth;
	return eth;
}
var steps = [
	{
		n: "01",
		title: "Write",
		body: "Agent, title, and the statement you want sealed."
	},
	{
		n: "02",
		title: "Hash",
		body: "SHA-256 runs in this browser. The words never leave it."
	},
	{
		n: "03",
		title: "Anchor",
		body: "MetaMask writes the digest into a BOT Chain Testnet transaction."
	}
];
function SealMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className,
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "32",
				height: "32",
				rx: "8",
				fill: "var(--color-panel)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "16",
				cy: "16",
				r: "11",
				fill: "var(--color-clay)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "16",
				cy: "16",
				r: "7.6",
				fill: "none",
				stroke: "var(--color-brass)",
				strokeWidth: "1.7"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M11.1 16.5 L14.3 19.6 L21.1 12.5",
				fill: "none",
				stroke: "var(--color-paper)",
				strokeWidth: "2.3",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			})
		]
	});
}
function statusLabel(status) {
	if (status === "draft") return "Local";
	if (status === "pending") return "Pending";
	if (status === "sealed") return "Sealed";
	return "Failed";
}
function Dashboard() {
	const [agentId, setAgentId] = (0, import_react.useState)("");
	const [title, setTitle] = (0, import_react.useState)("");
	const [statement, setStatement] = (0, import_react.useState)("");
	const [digest, setDigest] = (0, import_react.useState)(null);
	const [seals, setSeals] = (0, import_react.useState)([]);
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	const [account, setAccount] = (0, import_react.useState)(null);
	const [chainId, setChainId] = (0, import_react.useState)(null);
	const [balance, setBalance] = (0, import_react.useState)(null);
	const [block, setBlock] = (0, import_react.useState)(null);
	const [rpcDown, setRpcDown] = (0, import_react.useState)(false);
	const [providerState, setProviderState] = (0, import_react.useState)("unknown");
	const [registry, setRegistry] = (0, import_react.useState)(null);
	const [registryInput, setRegistryInput] = (0, import_react.useState)("");
	const [registryCount, setRegistryCount] = (0, import_react.useState)(null);
	const [anchorMode, setAnchorMode] = (0, import_react.useState)("direct");
	const [busy, setBusy] = (0, import_react.useState)(null);
	const [note, setNote] = (0, import_react.useState)(null);
	const [registryNote, setRegistryNote] = (0, import_react.useState)(null);
	const [copied, setCopied] = (0, import_react.useState)(null);
	const [txInput, setTxInput] = (0, import_react.useState)("");
	const [digestInput, setDigestInput] = (0, import_react.useState)("");
	const [digestTouched, setDigestTouched] = (0, import_react.useState)(false);
	const [verifyError, setVerifyError] = (0, import_react.useState)(null);
	const [verifyResult, setVerifyResult] = (0, import_react.useState)(null);
	const canonical = (0, import_react.useMemo)(() => canonicalText({
		agentId,
		title,
		statement
	}), [
		agentId,
		title,
		statement
	]);
	const canSeal = agentId.trim().length > 0 && agentId.trim().length <= 42 && title.trim().length > 0 && title.trim().length <= 64 && statement.trim().length > 0 && statement.trim().length <= 4e3;
	const label = canSeal ? makeLabel(agentId, title) : "";
	const onBot = isBotChainId(chainId);
	(0, import_react.useEffect)(() => {
		const stored = loadSeals();
		const savedRegistry = loadRegistry();
		setSeals(stored);
		setRegistry(savedRegistry);
		setRegistryInput(savedRegistry ?? "");
		if (savedRegistry) setAnchorMode("registry");
		setHydrated(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!hydrated) return;
		saveSeals(seals);
	}, [seals, hydrated]);
	(0, import_react.useEffect)(() => {
		if (!hydrated) return;
		let cancel = false;
		for (const seal of seals) {
			if (seal.status !== "pending" || !seal.txHash) continue;
			const { id, txHash } = seal;
			readChainSeal(txHash).then((mined) => {
				if (cancel || !mined || mined.pending) return;
				if (!mined.success || !mined.contentHash) {
					patchSeal(id, {
						status: "failed",
						blockNumber: mined.blockNumber,
						error: "The transaction did not seal this digest."
					});
					return;
				}
				patchSeal(id, {
					status: "sealed",
					blockNumber: mined.blockNumber,
					from: mined.from,
					error: void 0
				});
			}).catch(() => void 0);
		}
		return () => {
			cancel = true;
		};
	}, [hydrated]);
	(0, import_react.useEffect)(() => {
		const provider = injectedProvider();
		if (!provider) {
			setProviderState("none");
			return;
		}
		setProviderState(provider.isMetaMask ? "metamask" : "injected");
		const onAccounts = (value) => {
			const first = (Array.isArray(value) ? value : [])[0];
			if (typeof first !== "string" || !isAddress(first)) {
				setAccount(null);
				setBalance(null);
				return;
			}
			setAccount(getAddress(first));
		};
		const onChain = (value) => {
			setChainId(typeof value === "string" ? value : null);
		};
		provider.on?.("accountsChanged", onAccounts);
		provider.on?.("chainChanged", onChain);
		if (!walletPaused()) provider.request({ method: "eth_accounts" }).then(async (result) => {
			const first = (Array.isArray(result) ? result : [])[0];
			if (typeof first !== "string" || !isAddress(first)) return;
			setAccount(getAddress(first));
			const id = await provider.request({ method: "eth_chainId" });
			setChainId(id);
		}).catch(() => void 0);
		return () => {
			provider.removeListener?.("accountsChanged", onAccounts);
			provider.removeListener?.("chainChanged", onChain);
		};
	}, []);
	(0, import_react.useEffect)(() => {
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
		tick();
		const id = window.setInterval(() => void tick(), 12e3);
		return () => {
			stop = true;
			window.clearInterval(id);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (!account || !onBot) {
			setBalance(null);
			return;
		}
		let cancel = false;
		readBalance(account).then((wei) => {
			if (!cancel) setBalance(wei);
		}).catch(() => {
			if (!cancel) setBalance(null);
		});
		return () => {
			cancel = true;
		};
	}, [account, onBot]);
	(0, import_react.useEffect)(() => {
		if (!registry) {
			setRegistryCount(null);
			return;
		}
		let cancel = false;
		readRegistryCount(registry).then((count) => {
			if (!cancel) setRegistryCount(count);
		}).catch(() => {
			if (!cancel) setRegistryCount(null);
		});
		return () => {
			cancel = true;
		};
	}, [registry, seals]);
	(0, import_react.useEffect)(() => {
		if (!canSeal) {
			setDigest(null);
			return;
		}
		let cancel = false;
		sha256Hex(canonical).then((hash) => {
			if (!cancel) setDigest(hash);
		});
		return () => {
			cancel = true;
		};
	}, [canonical, canSeal]);
	function patchSeal(id, partial) {
		setSeals((current) => current.map((seal) => seal.id === id ? {
			...seal,
			...partial
		} : seal));
	}
	function remember(seal) {
		setSeals((current) => {
			const index = current.findIndex((item) => item.id === seal.id);
			if (index === -1) return [seal, ...current].slice(0, 40);
			const next = current.slice();
			next[index] = seal;
			return next;
		});
	}
	async function copyText(value, key) {
		try {
			await navigator.clipboard.writeText(value);
			setCopied(key);
			window.setTimeout(() => {
				setCopied((current) => current === key ? null : current);
			}, 1400);
		} catch {
			setNote("Clipboard is blocked in this browser.");
		}
	}
	async function switchChain() {
		const provider = injectedProvider();
		if (!provider) return false;
		try {
			await provider.request({
				method: "wallet_switchEthereumChain",
				params: [{ chainId: BOT_CHAIN_ID_HEX }]
			});
		} catch (error) {
			const code = error.code;
			if (code !== 4902 && code !== -32603) {
				setNote(walletMessage(error));
				return false;
			}
			try {
				await provider.request({
					method: "wallet_addEthereumChain",
					params: [botChainParams]
				});
			} catch (addError) {
				setNote(walletMessage(addError));
				return false;
			}
		}
		const next = await provider.request({ method: "eth_chainId" });
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
			const first = (await provider.request({ method: "eth_requestAccounts" }))[0];
			if (!first || !isAddress(first)) throw new Error("No account returned.");
			setAccount(getAddress(first));
			setProviderState(provider.isMetaMask ? "metamask" : "injected");
			const id = await provider.request({ method: "eth_chainId" });
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
		const next = {
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
			error: existing?.status === "failed" ? void 0 : existing?.error
		};
		if (existing?.status === "failed") next.status = "draft";
		remember(next);
		setNote("Proof kept in this browser. Anchor it when the wallet is on BOT Chain Testnet.");
	}
	async function sendAnchor(payload) {
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
		const already = seals.find((seal) => sameHash(seal.contentHash, payload.contentHash) && seal.status === "sealed");
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
			const data = anchorMode === "registry" && registry ? encodeRegistryAnchor(payload.contentHash, payload.label) : encodeDirectAnchor(payload.contentHash, payload.label);
			const to = anchorMode === "registry" && registry ? registry : account;
			const txHash = await provider.request({
				method: "eth_sendTransaction",
				params: [{
					from: account,
					to,
					value: "0x0",
					data,
					chainId: BOT_CHAIN_ID_HEX
				}]
			});
			remember({
				...payload,
				id,
				createdAt: existing?.createdAt ?? Date.now(),
				status: "pending",
				txHash,
				from: account,
				mode: anchorMode,
				registry: anchorMode === "registry" ? registry ?? void 0 : void 0
			});
			setTxInput(txHash);
			const receipt = await waitForReceipt(txHash);
			if (!receipt) {
				patchSeal(id, { error: "Submitted. The receipt has not landed yet." });
				setNote("Transaction sent. It will show as sealed once the block is in.");
				return;
			}
			const blockNumber = Number(BigInt(receipt.blockNumber));
			if (receipt.status !== "0x1") {
				patchSeal(id, {
					status: "failed",
					blockNumber,
					error: "The transaction reverted."
				});
				setNote("The transaction was mined and reverted. Nothing was sealed.");
				return;
			}
			const mined = await readChainSeal(txHash);
			if (!mined?.contentHash || !sameHash(mined.contentHash, payload.contentHash)) {
				patchSeal(id, {
					status: "failed",
					blockNumber,
					error: "The mined transaction does not contain this digest."
				});
				setNote("The transaction mined, but the payload was not this digest.");
				return;
			}
			patchSeal(id, {
				status: "sealed",
				blockNumber,
				error: void 0,
				from: mined.from
			});
			setNote("Sealed on BOT Chain Testnet.");
		} catch (error) {
			const message = walletMessage(error);
			if (existing) patchSeal(existing.id, {
				status: "failed",
				error: message
			});
			setNote(message);
		} finally {
			setBusy(null);
		}
	}
	async function verify() {
		const txHash = txInput.trim();
		const pastedDigest = (digestTouched ? digestInput : digest ?? digestInput).trim();
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
			const facts = [];
			let tone = "found";
			let titleText = "Checked";
			let detail = "";
			let chainHash = null;
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
					facts.push({
						label: "From",
						value: mined.from,
						href: explorerAddress(mined.from)
					});
				} else if (!mined.success) {
					tone = "failed";
					titleText = "Transaction reverted";
					detail = "It was mined, but the seal was not kept.";
					if (mined.blockNumber) facts.push({
						label: "Block",
						value: String(mined.blockNumber),
						href: explorerBlock(mined.blockNumber)
					});
				} else if (!mined.contentHash) {
					tone = "mismatch";
					titleText = "Mined, but not an AgentProof seal";
					detail = "The transaction data has no AgentProof payload.";
					facts.push({
						label: "From",
						value: mined.from,
						href: explorerAddress(mined.from)
					});
				} else {
					chainHash = mined.contentHash;
					tone = "found";
					titleText = mined.mode === "registry" ? "Registry seal found" : "Personal seal found";
					detail = mined.mode === "direct" ? "The digest is stored in a transaction this wallet sent to itself." : "The digest was written by calling AgentProofRegistry.anchor.";
					facts.push({
						label: "From",
						value: mined.from,
						href: explorerAddress(mined.from)
					}, {
						label: "Digest",
						value: mined.contentHash
					}, {
						label: "Label",
						value: mined.label || "—"
					});
					if (mined.blockNumber) facts.push({
						label: "Block",
						value: String(mined.blockNumber),
						href: explorerBlock(mined.blockNumber)
					});
					facts.push({
						label: "Transaction",
						value: shortHash(txHash),
						href: explorerTx(txHash)
					});
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
					facts.push({
						label: "Registry",
						value: registry,
						href: explorerAddress(registry)
					}, {
						label: "Recorded by",
						value: proof.agent,
						href: explorerAddress(proof.agent)
					}, {
						label: "On-chain label",
						value: proof.label || "—"
					}, {
						label: "Anchored",
						value: proof.anchoredAt ? formatWhen(proof.anchoredAt * 1e3) : "—"
					});
				} else if (!isBytes32(txHash)) {
					tone = "missing";
					titleText = "Digest is not in this registry";
					detail = "The contract has no record for that hash.";
					facts.push({
						label: "Registry",
						value: registry,
						href: explorerAddress(registry)
					});
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
				facts.unshift({
					label: "Composer digest",
					value: localHash
				});
			} else if (!localHash && tone === "found") detail = `${detail} Fill in the original statement to check the words.`;
			setVerifyResult({
				tone,
				title: titleText,
				detail,
				facts
			});
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
			if (!await switchChain()) return;
		}
		setBusy("deploy");
		setRegistryNote(null);
		try {
			const txHash = await provider.request({
				method: "eth_sendTransaction",
				params: [{
					from: account,
					data: registryBytecode,
					value: "0x0",
					chainId: BOT_CHAIN_ID_HEX
				}]
			});
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
	function loadSeal(seal) {
		setAgentId(seal.agentId);
		setTitle(seal.title);
		setStatement(seal.statement);
		setTxInput(seal.txHash ?? "");
		setDigestTouched(false);
		setDigestInput("");
		document.getElementById("composer")?.scrollIntoView({
			behavior: "smooth",
			block: "start"
		});
	}
	const shownDigest = digestTouched ? digestInput : digest ?? "";
	const walletName = providerState === "metamask" ? "MetaMask" : "Wallet";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-ink text-paper",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1 bg-clay" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-20 border-b border-line bg-ink/95 backdrop-blur",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-0 items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SealMark, { className: "size-10 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-serif text-xl leading-none",
								children: "AgentProof"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 font-mono text-xs text-muted",
								children: ["BOT Chain Testnet · ", 968]
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 sm:ml-auto",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: cn("inline-flex min-h-11 items-center rounded-lg border px-3 font-mono text-xs", rpcDown ? "border-line text-muted" : "border-line text-paper"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("mr-2 size-2 rounded-full", rpcDown ? "bg-muted" : "bg-brass"),
								"aria-hidden": "true"
							}), rpcDown ? "RPC down" : block === null ? "Linking" : `#${block.toLocaleString("en-US")}`]
						}), account ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "inline-flex min-h-11 min-w-0 items-center gap-2 rounded-lg border border-line px-3 font-mono text-xs text-paper hover:border-brass",
							onClick: () => void copyText(account, "account"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, {
								className: "size-4 shrink-0 text-brass",
								"aria-hidden": "true"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate",
								children: copied === "account" ? "Copied" : shortAddr(account)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "quiet",
							onClick: disconnect,
							children: "Disconnect"
						})] }) : providerState === "none" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "inline-flex min-h-11 flex-1 items-center justify-center rounded-lg bg-brass px-4 text-sm font-medium text-ink sm:flex-none",
							href: "https://metamask.io/download/",
							target: "_blank",
							rel: "noreferrer",
							children: "Install MetaMask"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "flex-1 sm:flex-none",
							onClick: () => void connect(),
							disabled: busy === "connect",
							children: [
								busy === "connect" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : null,
								"Connect ",
								providerState === "unknown" ? "wallet" : walletName
							]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-6xl px-4 pb-16 pt-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs uppercase tracking-widest text-brass",
						children: "Public seal desk"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 max-w-2xl font-serif text-4xl text-paper sm:text-5xl",
						children: "Proofs an agent can show, and anyone can check."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-2xl text-base text-muted",
						children: "Write a statement. This page hashes it with SHA-256 in your browser, then MetaMask anchors that digest on BOT Chain Testnet. The words stay with you. The chain keeps the seal."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-6 grid gap-3 sm:grid-cols-3",
						children: steps.map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-xl border border-line bg-panel px-4 py-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-xs text-brass",
									children: step.n
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 font-serif text-lg",
									children: step.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted",
									children: step.body
								})
							]
						}, step.n))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-4 grid grid-cols-3 overflow-hidden rounded-xl border border-line bg-line",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-panel px-3 py-4 sm:px-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-xs text-muted",
									children: "Saved here"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "mt-1 font-mono text-base tabular-nums sm:text-xl",
									children: hydrated ? seals.length : "—"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-panel px-3 py-4 sm:px-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-xs text-muted",
									children: "Testnet block"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "mt-1 font-mono text-base tabular-nums sm:text-xl",
									children: block === null ? "—" : block.toLocaleString("en-US")
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-panel px-3 py-4 sm:px-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-xs text-muted",
									children: "Wallet BOT"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "mt-1 font-mono text-base tabular-nums sm:text-xl",
									children: balance === null ? "—" : formatBot(balance)
								})]
							})
						]
					}),
					account && chainId && !onBot ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-col gap-3 rounded-xl border border-brass bg-panel px-4 py-4 sm:flex-row sm:items-center sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm",
							children: [
								"MetaMask is on another network. Seals belong on chain ",
								968,
								"."
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => void switchChain(),
							children: "Switch to BOT Testnet"
						})]
					}) : null,
					account && onBot && balance === 0n ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 text-sm text-muted",
						children: [
							"Balance is 0 BOT. Anchoring needs a little testnet gas.",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								className: "text-paper underline decoration-line underline-offset-4 hover:decoration-brass",
								href: BOT_FAUCET,
								target: "_blank",
								rel: "noreferrer",
								children: "Open the faucet"
							}),
							"."
						]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 grid items-start gap-4 lg:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							id: "composer",
							className: "rounded-xl border border-line bg-panel p-5 sm:p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-serif text-2xl",
									children: "Compose"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted",
									children: "The digest is SHA-256 of a fixed text block: version, chain, agent, title, statement."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									className: "mt-5 grid gap-4",
									onSubmit: (event) => {
										event.preventDefault();
										if (!canSeal || !digest || busy === "anchor") return;
										sendAnchor({
											agentId: agentId.trim(),
											title: title.trim(),
											statement: statement.trim(),
											canonical,
											contentHash: digest,
											label
										});
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "grid gap-2 text-sm",
											children: ["Agent", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												id: "agent",
												className: fieldClass,
												value: agentId,
												maxLength: 42,
												placeholder: "cipher",
												autoComplete: "off",
												onChange: (event) => setAgentId(event.target.value)
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "grid gap-2 text-sm",
											children: ["Title", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												id: "title",
												className: fieldClass,
												value: title,
												maxLength: 64,
												placeholder: "A claim worth keeping",
												onChange: (event) => setTitle(event.target.value)
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "grid gap-2 text-sm",
											children: [
												"Statement",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
													id: "statement",
													className: cn(fieldClass, "min-h-36 resize-y"),
													value: statement,
													maxLength: 4e3,
													placeholder: "What the agent asserts, in its own words.",
													onChange: (event) => setStatement(event.target.value)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "font-mono text-xs text-muted",
													children: [statement.trim().length, "/4000"]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-lg border border-line bg-inset p-4",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between gap-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "font-mono text-xs uppercase tracking-widest text-muted",
														children: "SHA-256"
													}), digest ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
														type: "button",
														className: "inline-flex min-h-11 items-center gap-2 text-sm text-paper",
														onClick: () => void copyText(digest, "digest"),
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
															className: "size-4",
															"aria-hidden": "true"
														}), copied === "digest" ? "Copied" : "Copy"]
													}) : null]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("output", {
													id: "digest",
													className: "mt-2 block break-all font-mono text-sm text-paper",
													children: digest ?? "Fill in agent, title, and statement."
												}),
												label.endsWith("…") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-2 text-xs text-muted",
													children: "The on-chain label is shortened to 80 bytes."
												}) : null
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-2 gap-2",
											role: "radiogroup",
											"aria-label": "Where to anchor",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												role: "radio",
												"aria-checked": anchorMode === "direct",
												className: cn("min-h-11 rounded-lg border px-3 text-sm", anchorMode === "direct" ? "border-brass bg-inset text-paper" : "border-line text-muted"),
												onClick: () => setAnchorMode("direct"),
												children: "This wallet"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												role: "radio",
												"aria-checked": anchorMode === "registry",
												disabled: !registry,
												className: cn("min-h-11 rounded-lg border px-3 text-sm disabled:opacity-50", anchorMode === "registry" ? "border-brass bg-inset text-paper" : "border-line text-muted"),
												onClick: () => setAnchorMode("registry"),
												children: "Registry"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-muted",
											children: anchorMode === "registry" ? "Calls the registry contract so the digest can be looked up without a transaction hash." : "Sends a zero-value transaction to your own address. The digest sits in the transaction data."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col gap-2 sm:flex-row",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												type: "submit",
												disabled: !canSeal || !digest || busy === "anchor",
												className: "sm:flex-1",
												children: [busy === "anchor" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : null, !account ? `Connect to anchor` : !onBot && chainId ? "Switch to BOT Testnet" : anchorMode === "registry" ? "Anchor in registry" : "Anchor on testnet"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "ghost",
												disabled: !canSeal || !digest,
												onClick: saveLocal,
												children: "Save locally"
											})]
										}),
										note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-paper",
											role: "status",
											children: note
										}) : null,
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
											className: "text-sm text-muted",
											children: "Canonical text that gets hashed"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
											className: "mt-3 overflow-x-auto whitespace-pre-wrap break-words rounded-lg border border-line bg-inset p-3 font-mono text-xs text-paper",
											children: canonical
										})] })
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "rounded-xl border border-line bg-panel p-5 sm:p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-serif text-2xl",
									children: "Verify"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted",
									children: "Read a transaction back from the testnet, or ask a registry if it has the digest. If the composer is filled in, the page recomputes SHA-256 and compares."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-5 grid gap-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "grid gap-2 text-sm",
											children: ["Transaction hash", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												id: "tx-hash",
												className: cn(fieldClass, "font-mono text-sm"),
												value: txInput,
												placeholder: "0x…",
												spellCheck: false,
												onChange: (event) => setTxInput(event.target.value)
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "grid gap-2 text-sm",
											children: ["Digest", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												id: "verify-digest",
												className: cn(fieldClass, "font-mono text-sm"),
												value: shownDigest,
												placeholder: "Uses the composer digest until you edit it",
												spellCheck: false,
												onChange: (event) => {
													setDigestTouched(true);
													setDigestInput(event.target.value);
												}
											})]
										}),
										digestTouched ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "justify-self-start text-sm text-brass underline decoration-line underline-offset-4",
											onClick: () => {
												setDigestTouched(false);
												setDigestInput("");
											},
											children: "Use the composer digest"
										}) : null,
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											id: "verify-btn",
											onClick: () => void verify(),
											disabled: busy === "verify",
											children: [busy === "verify" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : null, "Verify"]
										}),
										verifyError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-paper",
											role: "alert",
											children: verifyError
										}) : null,
										verifyResult ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifyCard, { result: verifyResult }) : null
									]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-4 rounded-xl border border-line bg-panel",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-end justify-between gap-3 border-b border-line px-5 py-4 sm:px-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-serif text-2xl",
								children: "Ledger"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted",
								children: "Proofs kept in this browser, with their chain status."
							})] })
						}), seals.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "px-5 py-8 text-sm text-muted sm:px-6",
							children: "Nothing saved yet. A digest stays on this device until you anchor it."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: seals.map((seal) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "border-b border-line px-5 py-4 last:border-b-0 sm:px-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate font-medium",
											children: seal.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate text-sm text-muted",
											children: seal.agentId
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("inline-flex shrink-0 items-center rounded-md border px-2 py-1 font-mono text-xs", seal.status === "sealed" && "border-brass bg-brass text-ink", seal.status === "pending" && "border-brass text-brass", seal.status === "draft" && "border-line text-muted", seal.status === "failed" && "border-line text-paper"),
										children: statusLabel(seal.status)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 break-all font-mono text-xs text-muted",
									children: seal.contentHash
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-muted",
									children: formatWhen(seal.createdAt)
								}),
								seal.error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-paper",
									children: seal.error
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex flex-wrap gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "quiet",
											onClick: () => loadSeal(seal),
											children: "Open"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "quiet",
											onClick: () => void copyText(seal.contentHash, seal.id),
											children: copied === seal.id ? "Copied" : "Copy digest"
										}),
										seal.status !== "sealed" && seal.status !== "pending" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											disabled: busy === "anchor",
											onClick: () => void sendAnchor({
												agentId: seal.agentId,
												title: seal.title,
												statement: seal.statement,
												canonical: seal.canonical,
												contentHash: seal.contentHash,
												label: seal.label
											}),
											children: "Anchor"
										}) : null,
										seal.txHash ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											className: "inline-flex min-h-11 items-center gap-2 rounded-lg border border-line px-3 text-sm text-paper hover:border-brass",
											href: explorerTx(seal.txHash),
											target: "_blank",
											rel: "noreferrer",
											children: ["Explorer", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
												className: "size-4",
												"aria-hidden": "true"
											})]
										}) : null,
										seal.status === "draft" || seal.status === "failed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "quiet",
											onClick: () => setSeals((current) => current.filter((item) => item.id !== seal.id)),
											children: "Remove"
										}) : null
									]
								})
							]
						}, seal.id)) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-4 rounded-xl border border-line bg-panel p-5 sm:p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-serif text-2xl",
								children: "Registry"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 max-w-3xl text-sm text-muted",
								children: "Optional. A personal anchor is enough to prove a transaction. Deploy AgentProofRegistry if you want any visitor to look a digest up by hash. The contract stores the digest, your address, a short label, and the time — not the statement."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
								className: "mt-4 grid gap-3 text-sm sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted",
									children: "Address in this browser"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "mt-1 break-all font-mono text-xs",
									children: registry ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										className: "underline decoration-line underline-offset-4 hover:decoration-brass",
										href: explorerAddress(registry),
										target: "_blank",
										rel: "noreferrer",
										children: registry
									}) : "None yet"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted",
									children: "Seals in the contract"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "mt-1 font-mono tabular-nums",
									children: registryCount === null ? "—" : registryCount
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex flex-col gap-2 sm:flex-row",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: cn(fieldClass, "font-mono text-sm"),
										value: registryInput,
										placeholder: "0x registry address",
										spellCheck: false,
										onChange: (event) => setRegistryInput(event.target.value),
										"aria-label": "Registry address"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										onClick: keepRegistry,
										children: "Save"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "quiet",
										onClick: clearRegistry,
										disabled: !registry && !registryInput,
										children: "Clear"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									onClick: () => void deployRegistry(),
									disabled: busy === "deploy",
									children: [busy === "deploy" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : null, "Deploy from MetaMask"]
								})
							}),
							registryNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-paper",
								role: "status",
								children: registryNote
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
						className: "mt-8 flex flex-col gap-3 text-sm text-muted sm:flex-row sm:items-center sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"Testnet only. Chain ",
							968,
							", native token BOT. Nothing here spends mainnet funds."
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex flex-wrap gap-x-4 gap-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									className: "underline decoration-line underline-offset-4 hover:decoration-brass",
									href: BOT_FAUCET,
									target: "_blank",
									rel: "noreferrer",
									children: "Faucet"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									className: "underline decoration-line underline-offset-4 hover:decoration-brass",
									href: BOT_EXPLORER,
									target: "_blank",
									rel: "noreferrer",
									children: "Explorer"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									className: "underline decoration-line underline-offset-4 hover:decoration-brass",
									href: BOT_DOCS,
									target: "_blank",
									rel: "noreferrer",
									children: "Network guide"
								})
							]
						})]
					})
				]
			})
		]
	});
}
function VerifyCard({ result }) {
	const Icon = result.tone === "match" ? BadgeCheck : result.tone === "mismatch" || result.tone === "failed" ? CircleAlert : ScrollText;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("rise rounded-lg border p-4", result.tone === "match" ? "border-brass" : "border-line"),
		role: "status",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				className: cn("mt-1 size-5 shrink-0", result.tone === "match" ? "text-brass" : "text-muted"),
				"aria-hidden": "true"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-serif text-lg",
					children: result.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: result.detail
				})]
			})]
		}), result.facts.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
			className: "mt-4 grid gap-3",
			children: result.facts.map((fact) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
				className: "text-xs text-muted",
				children: fact.label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
				className: "break-all font-mono text-xs text-paper",
				children: fact.href ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					className: "underline decoration-line underline-offset-4 hover:decoration-brass",
					href: fact.href,
					target: "_blank",
					rel: "noreferrer",
					children: fact.value
				}) : fact.value
			})] }, `${fact.label}-${fact.value}`))
		}) : null]
	});
}
var SplitComponent = Dashboard;
//#endregion
export { SplitComponent as component };
