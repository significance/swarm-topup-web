import { formatDuration, intervalToDuration } from 'date-fns'

// Hooks
import { useTimeToLive } from '../hooks/useTimeToLive'
import { useLastPrice } from '../hooks/useLastPrice'
import { BigNumber } from 'ethers'

type TimeToLiveProps = {
	batchId: string,
	amount?: number
}

export const TimeToLive = ({ batchId, amount = 0 }: TimeToLiveProps) => {
	const ttl = useTimeToLive(batchId)
	const lastPrice = useLastPrice()

	if (!ttl.data) {
		return null
	}

	const additionalTtl = Math.floor(BigNumber.from(amount)/lastPrice.data)*5
	const projectedTtl = ttl.data.add(additionalTtl)

	const duration = intervalToDuration({
		start: new Date(0),
		end: new Date(1000 * Number(projectedTtl)),
	})

	return <div>{formatDuration(duration)}</div>
}
