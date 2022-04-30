import { formatDuration, intervalToDuration } from 'date-fns'

// Hooks
import { useTimeToLive } from '../hooks/useTimeToLive'

type TimeToLiveProps = {
	batchId: string,
	amount?: number
}

export const TimeToLive = ({ batchId, amount = 0 }: TimeToLiveProps) => {
	const ttl = useTimeToLive(batchId, amount)

	if (!ttl.data) {
		return null
	}

	const projectedTtl = ttl.data.add(amount)

	const duration = intervalToDuration({
		start: new Date(0),
		end: new Date(1000 * Number(projectedTtl)),
	})

	return <div>{formatDuration(duration)}</div>
}
