import { useContract } from 'wagmi'

// Types
import type { Signer, providers } from 'ethers'

// Config
import { BZZ_CONTRACT_ADDRESS } from '../config'

// ABI
import abi from '../data/abis/bzz.json'

type UseBzzContractProps = {
	signerOrProvider: Signer | providers.Provider
}

export const useBzzContract = ({ signerOrProvider }: UseBzzContractProps) => {
	return useContract({
		addressOrName: BZZ_CONTRACT_ADDRESS,
		contractInterface: abi,
		signerOrProvider,
	})
}
