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
		'0x9da3a7813977b7722e59de8826077a44736116c4aa5c9f31676da812870a9039'
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
			<h1>Fund the Hacker Manifesto Stamp</h1>
			<p>
				In the <a href="https://ethswarm.org">Swarm Network</a>, storage in the
				network is paid for by attaching <em>postage stamps</em> to the{' '}
				<em>chunks</em> that comprise the file's content. It is possible for
				anyone to contribute BZZ towards a postage stamp, without permission.
			</p>
			<p>
				The Hacker Manifesto has been uploaded to the Swarm network using
				postage stamp batch ID <a href="#postage-stamp-batch-id">9da3...9039</a>{' '}
				and is available to view or reference using the Swarm address{' '}
				<a href="#hacker-manifesto-address">d755...f06f</a>.{' '}
			</p>
			<p>
				You may retrieve and view it directly from the p2p network using a Swarm
				node using the Bee software for which you can find installation and
				usage directions at{' '}
				<a href="https://ethswarm.org">https://ethswarm.org</a>, or view it
				using the <em>bzz.link</em> service{' '}
				<a href="https://bah5acgza25k2uhs3fycz64at3pow4eju7paas5wfevgbo2tu54spdtta6bxq.bzz.link/">
					by clicking here.
				</a>
			</p>
			<h2>Stamp Status</h2>
			<p>
				The Hacker Manifesto Stamp will expire unless it is topped up. It's
				current time to live is:{' '}
			</p>{' '}
			<TimeToLive batchId={batchId} />
			<p>
				Like minded individuals are encouraged to contribute BZZ to the Hacker
				Manifesto Stamp so that it will remain alive in the Swarm network.
			</p>
			<h2>Send BZZ to Top Up the Batch</h2>
			<p>
				In order to add funds to the stamp, you may operate the postage stamp
				contract which resides on the Gnosis Chain network at address{' '}
				<em>0x6a1A21ECA3aB28BE85C7Ba22b2d6eAE5907c900E</em>. You must first
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
				(there are currently XXX chunks stampable by the postage batch) into the
				"Amount" field below, and click "Top Up" to send your transactions to
				the network.
			</p>
			<h3>Create and Send Transactions</h3>
			<hr />
			<form onSubmit={(event) => topUp(event)}>
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
					<button type="submit">Top up</button>
				</p>
			</form>
			<hr />
			<p>
				Once you have pressed the "Top up" button you will be asked to authorise
				two transactions.
			</p>
			<p>Thank you for supporting the Hacker Manifesto!</p>
			<h2>More Info</h2>
			<ul>
				<li id="postage-stamp-batch-id">
					Postage Stamp Batch Id:{' '}
					<strong>
						7813977b7722e59de8826077a44736116c4aa5c9f31676da812870a
					</strong>
				</li>
				<li>
					<a id="hacker-manifesto-address">
						Hacker Manifesto Swarm Address:{' '}
						<strong>
							d755aa1e5b2e059f7013dbdd6e1134fbc00976c5254c176a74ef24f1ce60f06f
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
