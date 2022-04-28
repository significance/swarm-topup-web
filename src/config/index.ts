const BLOCK_EXPLORER = {
	name: 'BlockScount',
	url: 'https://blockscout.com/xdai/mainnet/',
}

export const WAGMI_CHAIN = {
	id: 100,
	name: 'Gnosis Chain',
	nativeCurrency: {
		name: 'xDAI',
		symbol: 'xDAI',
		decimals: 18,
	},
	rpcUrls: {
		default: 'https://rpc.ankr.com/gnosis',
	},
	blockTime: 15,
	blockExplorers: {
		etherscan: BLOCK_EXPLORER,
		default: BLOCK_EXPLORER,
	},
}

export const WAGMI_NETWORK = {
	chainId: WAGMI_CHAIN.id,
	name: WAGMI_CHAIN.name,
}

export const BZZ_CONTRACT_ADDRESS = '0xdBF3Ea6F5beE45c02255B2c26a16F300502F68da'
export const POSTAGE_STAMP_CONTRACT_ADDRESS =
	'0x6a1A21ECA3aB28BE85C7Ba22b2d6eAE5907c900E'
