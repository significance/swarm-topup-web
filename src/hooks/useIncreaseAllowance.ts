import { Signer } from 'ethers'
import { useBzzContract } from './useBzzContract'

type UseIncreaseAllowanceProps = {
	signer: Signer
}

export const useIncreaseAllowance = ({ signer }: UseIncreaseAllowanceProps) => {
	const contract = useBzzContract({
		signerOrProvider: signer,
	})
	return contract.increaseAllowance
}
