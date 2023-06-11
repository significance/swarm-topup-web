import { useState } from 'preact/hooks'
import { Provider, createClient, useSigner } from 'wagmi'

import './assets/css/app.css'
import logo from './assets/images/logo.svg'

// Config
import {
	POSTAGE_STAMP_CONTRACT_ADDRESS,
	WAGMI_CHAIN,
	WAGMI_NETWORK,
} from './config'

// Types
import { Signer, providers } from 'ethers'

// Components
import { Profile } from './components/profile'
import { TimeToLive } from './components/time-to-live'
import { CalculateCost } from './components/calculate-cost'

// Hooks
import { useCreateBatch } from './hooks/useCreateBatch'
import { useIncreaseAllowance } from './hooks/useIncreaseAllowance'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { useTimeToLive } from './hooks/useTimeToLive'

const client = createClient({
	autoConnect: true,
	connectors: [
		new InjectedConnector({
			chains: [WAGMI_CHAIN],
		}),
	],
	provider: new providers.JsonRpcProvider(
		WAGMI_CHAIN.rpcUrls.default,
		WAGMI_NETWORK
	),
	webSocketProvider: new providers.WebSocketProvider(
		WAGMI_CHAIN.rpcUrls.websocket,
		WAGMI_NETWORK
	),
})

const TopUp = () => {
	const [pasteState, setPasteState] = useState<string>('new')

	const [batchId, setBatchId] = useState<string>('')

	const [amount, setAmount] = useState<number>(1_000_000)

	const { data: signerResult } = useSigner()
	const signer = signerResult as Signer

	const doIncreaseAllowance = useIncreaseAllowance({ signer })
	const doCreateBatch = useCreateBatch({ signer })

	// // TODO: Type the event
	const paste = async (event: any) => {
		event.preventDefault()
		const allowance = 1000000000000000;
		// await doIncreaseAllowance(POSTAGE_STAMP_CONTRACT_ADDRESS, allowance)
		console.log(signer)
		const _owner = await signer.getAddress()
		const _initialBalancePerChunk = ""
		const _depth = "17"
		const _bucketDepth = "16"
		const _nonce = "0"
		const _immutable = "true"

		console.log(_owner)

		await doCreateBatch(_owner, _initialBalancePerChunk, _depth, _bucketDepth, _nonce, _immutable)
	}

	// const currentTimeToLive = useTimeToLive(batchId, amount)

	// const [batchId, setBatchId] = useState<string>(
	// 	'0x65c3e96155df9d057a3edfca2ed6e23a745f6c10fc64102b80d9e2983a135219'
	// )
	// const [amount, setAmount] = useState<number>(1_000_000)

	// const { data: signerResult } = useSigner()
	// const signer = signerResult as Signer

	// const doTopUp = useTopUp({ signer })

	// // TODO: Type the event
	// const topUp = async (event: any) => {
	// 	event.preventDefault()
	// 	await doIncreaseAllowance(POSTAGE_STAMP_CONTRACT_ADDRESS, 1000000000000000)
	// 	await doTopUp(batchId, amount)
	// }
	// const currentTimeToLive = useTimeToLive(batchId, amount)

	return (
		<>
			<div id="wrap">
				<div class="container">
					<div id="header">
						{/* onclick="resetPaste"  */}
						<button id="new"></button>
						{/* onclick="showAbout" */}
						<div id="about"></div>

						<img alt="logo" id="logo" src={logo} />
						<a
							class="desktop-only"
							id="powered-by-swarm"
							href="https://www.ethswarm.org/"
							target="_blank"
						></a>
					</div>

					{/* v-show="hasPaste" */}
					<div class="show-paste" style="display:none">
						{/* <h3>Paste {{hash}}</h3> */}
						<input class="copy-input" id="copy-input-1" value="url" readonly />
						{/* v-on:click="copyUrl" */}
						<button id="copy"></button>

						<div>
							{/* <div contentEditable="true" id="texteditor" placeholder="Paste text here..." @input="onInput"></div> */}
							{/* v-model="pasteText" */}
							<textarea id="bin">pasteText</textarea>
							{/* v-on:click="createPaste" */}
						</div>
					</div>

					<div class="add-paste" v-show="!hasPaste">
						<div>
							{/* <div contentEditable="true" id="texteditor" placeholder="Paste text here..." @input="onInput"></div> */}
							{/* v-model="pasteText"  */}
							<textarea placeholder="Paste text here..."></textarea>
							<div id="stamp-status">
								<ul>
									<li>1. Buy Stamp (Cost BZZ X) ☑️</li>
									<li>2. Wait for Batch Propogation (180 seconds) ☑️</li>
									<li>
										3. Stamp and Upload Chunk ☑️ (store batch info alongside
										payload)
									</li>
								</ul>
							</div>
							<button onClick={(event) => paste(event)} id="paste"></button>
						</div>
					</div>

					<div>
						<h3>Connect to "MetaMask"</h3>
						<hr />
						<Profile />
					</div>
				</div>
				<div id="footer">
					<a
						class="mobile-only"
						id="powered-by-swarm"
						href="https://www.ethswarm.org/"
						target="_blank"
					></a>
				</div>

				{/* v-show="showingAbout" */}
				<div
					id="about-page"
					class="overlay bounce-in-top rotate-out-center"
					style="display:none"
				>
					{/* v-on:click="hideAbout" */}
					<button id="close">X</button>
					<div class="va-outer">
						<div class="va-inner">
							<div class="container">
								<div id="about-content">
									<a
										id="about-1up"
										href="https://1up.digital"
										target="_blank"
									></a>
									<a
										id="about-swarm"
										href="https://www.ethswarm.org/"
										target="_blank"
									></a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export const App = () => {
	return (
		<Provider client={client}>
			<TopUp />
		</Provider>
	)
}
