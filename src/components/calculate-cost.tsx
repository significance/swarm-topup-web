type CalculateCostProps = {
	amount: number
}

const BUCKET_CHUNKS = 524288 //2^19 since 19 is the bucket depth
const BZZ_DECIMALS_INVERTED = 10000000000000000

export const CalculateCost = ({ amount }: CalculateCostProps) => {
	return (
		<div>
			<ul>
				<li>
					{amount * BUCKET_CHUNKS} <em>plur</em>
				</li>
				<li>
					{(amount * BUCKET_CHUNKS) / BZZ_DECIMALS_INVERTED}{' '}
					<strong>BZZ</strong>
				</li>
			</ul>
		</div>
	)
}
