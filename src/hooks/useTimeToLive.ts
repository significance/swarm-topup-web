import { useMemo } from 'preact/hooks'

// Lib
import { combineContractReads } from '../lib/wagmi'

// Hooks
import { useLastPrice } from './useLastPrice'
import { useRemainingBalance } from './useRemainingBalance'

export const useTimeToLive = (batchId: string, watch = true) => {
	const lastPrice = useLastPrice(watch)
	const balance = useRemainingBalance(batchId, watch)

	return useMemo(() => {
		return combineContractReads(
			(...[balance, lastPrice]) => {
				return lastPrice.data && balance.data?.div(lastPrice.data).mul(5)
			},
			balance,
			lastPrice
		)
	}, [balance, lastPrice])
}
