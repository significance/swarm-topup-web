import { useContractRead } from 'wagmi'

// Config
import { POSTAGE_STAMP_CONTRACT_ADDRESS, WAGMI_CHAIN } from '../config'

// ABI
import abi from '../data/abis/postage-batch.json'

export const useRemainingBalance = (batchId: string, watch = true) => {
	return useContractRead(
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
}
