import { useState } from 'preact/hooks'
import { Provider, createClient, useSigner } from 'wagmi'

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
import { useTopUp } from './hooks/useTopUp'
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
	const [batchId, setBatchId] = useState<string>(
		'0x7892d29daeb228f8e8122823c505237e03ec519a93a1ca834032ae4de4945239'
	)
	const [amount, setAmount] = useState<number>(1_000_000)

	const { data: signerResult } = useSigner()
	const signer = signerResult as Signer

	const doTopUp = useTopUp({ signer })
	const doIncreaseAllowance = useIncreaseAllowance({ signer })

	// TODO: Type the event
	const topUp = async (event: any) => {
		event.preventDefault()
		await doIncreaseAllowance(POSTAGE_STAMP_CONTRACT_ADDRESS, 1000000000000000)
		await doTopUp(batchId, amount)
	}
	const currentTimeToLive = useTimeToLive(batchId, amount)

	return (
		<>
			<h1>Fund the Stamp for "A Declaration of Independence of Cyberspace"</h1>
			<p>
				In the <a href="https://ethswarm.org">Swarm Network</a>, storage in the
				network is paid for by attaching <em>postage stamps</em> to the{' '}
				<em>chunks</em> that comprise the file's content. It is possible for
				anyone to contribute BZZ towards a postage stamp, without permission.
			</p>
			<p>
				"A Declaration of Independence of Cyberspace" has been uploaded to the Swarm network using
				postage stamp batch ID <a href="#postage-stamp-batch-id">7892....5239</a>{' '}
				and is available to view or reference using the Swarm address{' '}
				<a href="#hacker-manifesto-address">d755...f06f</a>.{' '}
			</p>
			<p>
				You may retrieve and view it directly from the p2p network using a Swarm
				node using the Bee software for which you can find installation and
				usage directions at{' '}
				<a target="_blank" href="https://ethswarm.org">https://ethswarm.org</a>, or view it
				using the <em>bzz.link</em> service{' '}
				<a target="_blank" href="https://bah5acgzalf5lrn3dcamukmw27q4evvagcmcazu7th5mxqhlvedwmfarhjopa.bzz.link/">
					by clicking here.
				</a>
			</p>
			<h2>Stamp Status</h2>
			<p>
				The postage batch for "A Declaration of Independence of Cyberspace" will expire unless it is topped up. It's
				current time to live is:{' '}
			</p>{' '}
			<TimeToLive batchId={batchId} />
			<p>
				Like minded individuals are encouraged to contribute BZZ to the postage batch so that it will remain alive in the Swarm network.
			</p>
			<h2>Send BZZ to Top Up the Batch</h2>
			<p>
				In order to add funds to the stamp, you may operate the postage stamp
				contract which resides on the Gnosis Chain network at address{' '}
				<em>0x30d155478eF27Ab32A1D578BE7b84BC5988aF381</em>. You must first
				authorise your BZZ fund using the bridged ERC20 contract which can be
				found at address <em>0xdBF3Ea6F5beE45c02255B2c26a16F300502F68da</em> on
				the Gnosis Chain network. BZZ can be acquired by sending ETH to the
				Bonding Curve contract which can be found at address{' '}
				<em>0x4f32ab778e85c4ad0cead54f8f82f5ee74d46904</em> on the Ethereum
				network.
			</p>
			<p>
				For your convenience, a tool is provided below which can be used to
				create the needed transactions, which can then be signed and sent to a
				Gnosis Chain RPC endpoint using the "MetaMask" browser extension.
			</p>
			<p>
				First, you must connect your "Metamask" wallet by pressing the following
				interface.
			</p>
			<h3>Connect to "MetaMask"</h3>
			<hr />
			<Profile />
			<hr />
			<p>
				Once connected, enter your chosen amount to top up per chunk, per block
				(there are currently 131072 chunks stampable by the postage batch) into the
				"Amount" field below, and click "Top Up" to send your transactions to
				the network.
			</p>
			<h3>Create and Send Transactions</h3>
			<hr />
			<form>
				<p>
					<input
						type="hidden"
						value={batchId}
						onChange={(event) => setBatchId(event.currentTarget.value)}
					/>
					<label>
						<strong>Topup Amount</strong>
					</label>
				</p>
				<p>
					<input
						type="number"
						value={amount}
						onChange={(event) => setAmount(Number(event.currentTarget.value))}
					/>
					<span>
						{' '}
						<em>plur per chunk</em>
					</span>
					<CalculateCost amount={amount} />
					<TimeToLive batchId={batchId} amount={amount} />
				</p>
				<p>
					<button type="submit" onClick={(event) => topUp(event)}>Top up</button>
				</p>
			</form>
			<hr />
			<p>
				Once you have pressed the "Top up" button you will be asked to authorise
				two transactions.
			</p>
			<p>Thank you for supporting A Declaration of Independence of Cyberspace!</p>
			<h2>More Info</h2>
			<ul>
				<li id="postage-stamp-batch-id">
					Postage Stamp Batch Id:{' '}
					<strong>
							7892d29daeb228f8e8122823c505237e03ec519a93a1ca834032ae4de4945239
					</strong>
				</li>
				<li>
					<a id="hacker-manifesto-address">
						A Declaration of Independence of Cyberspace Swarm Address:{' '}
						<strong>
							597ab8b76310194532dafc384ad40613040cd3f33f59781d7520ecc282274b9e
						</strong>
					</a>
				</li>
			</ul>
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
