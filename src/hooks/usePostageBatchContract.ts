import { useContract } from "wagmi";

// Types
import type { Signer, providers } from "ethers";

// Config
import { POSTAGE_STAMP_CONTRACT_ADDRESS } from "../config";

// ABI
import abi from "../data/abis/postage-batch.json";

type UsePostageBatchContractProps = {
  signerOrProvider: Signer | providers.Provider;
};

export const useTopusePostageBatchContractUp = ({
  signerOrProvider,
}: UsePostageBatchContractProps) => {
  return useContract({
    addressOrName: POSTAGE_STAMP_CONTRACT_ADDRESS,
    contractInterface: abi,
    signerOrProvider,
  });
};
