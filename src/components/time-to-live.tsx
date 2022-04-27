// Hooks
import { useTimeToLive } from '../hooks/useTimeToLive'

type TimeToLiveProps = {
	batchId: string
}

export const TimeToLive = ({ batchId }: TimeToLiveProps) => {
	const ttl = useTimeToLive(batchId)
	if (!ttl.data) {
		return
	}

	return <div>Time to live: {ttl.data.toString()}</div>
}
