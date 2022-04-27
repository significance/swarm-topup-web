import { formatDuration, intervalToDuration } from 'date-fns'

// Hooks
import { useTimeToLive } from '../hooks/useTimeToLive'

type TimeToLiveProps = {
	batchId: string
}

export const TimeToLive = ({ batchId }: TimeToLiveProps) => {
	const ttl = useTimeToLive(batchId)
	if (!ttl.data) {
		return null
	}

	const duration = intervalToDuration({
		start: new Date(0),
		end: new Date(1000 * Number(ttl.data)),
	})

	return <div>Time to live: {formatDuration(duration)}</div>
}
