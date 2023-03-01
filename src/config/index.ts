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
		websocket: 'wss://rpc.gnosischain.com/wss',
		default: 'https://rpc.ankr.com/gnosis',
	},
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
	'0x30d155478eF27Ab32A1D578BE7b84BC5988aF381'
