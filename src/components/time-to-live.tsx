import { useContractRead } from "wagmi";
import { ethers } from "ethers";

// Config
import { CHAIN_ID, POSTAGE_STAMP_CONTRACT_ADDRESS } from "../config";

// ABI
import abi from "../data/abis/postage-batch.json";

type TimeToLiveProps = {
  batchId: string;
};

export const TimeToLive = ({ batchId }: TimeToLiveProps) => {
  const contractRead = useContractRead(
    {
      addressOrName: POSTAGE_STAMP_CONTRACT_ADDRESS,
      contractInterface: abi,
    },
    "remainingBalance",
    {
      watch: true,
      chainId: CHAIN_ID,
      args: batchId,
      enabled: !!batchId,
    }
  );
  console.log(contractRead);
  return null;
};
