import { useMemo } from 'preact/hooks'
import { useContractRead } from 'wagmi'

// Lib
import { combineContractReads } from '../lib/wagmi'

// Config
import { POSTAGE_STAMP_CONTRACT_ADDRESS, WAGMI_CHAIN } from '../config'

// ABI
import abi from '../data/abis/postage-batch.json'

// Hooks
import { useLastPrice } from './useLastPrice'

export const useTimeToLive = (batchId: string, watch = true) => {
	const lastPrice = useLastPrice(watch)
	const result = useContractRead(
		{
			addressOrName: POSTAGE_STAMP_CONTRACT_ADDRESS,
			contractInterface: abi,
		},
		'remainingBalance',
		{
			watch,
			chainId: WAGMI_CHAIN.id,
			args: batchId,
			enabled: !!batchId,
		}
	)

	return useMemo(() => {
		return combineContractReads(
			(...[result, lastPrice]) => {
				return lastPrice.data && result.data?.div(lastPrice.data).div(5)
			},
			result,
			lastPrice
		)
	}, [result, lastPrice])
}
