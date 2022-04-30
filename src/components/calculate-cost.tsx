type CalculateCostProps = {
	amount: number
}

const BUCKET_CHUNKZ = 524288 //2^19 since 19 is the bucket depth
const BZZ_DECIMALZ_INVERTED = 10000000000000000

export const CalculateCost = ({ amount }: CalculateCostProps) => {
	return (
		<div>
			<ul>
				<li>
					{amount * BUCKET_CHUNKZ} <em>plur</em>
				</li>
				<li>
					{(amount * BUCKET_CHUNKZ) / BZZ_DECIMALZ_INVERTED}{' '}
					<strong>BZZ</strong>
				</li>
			</ul>
		</div>
	)
}
