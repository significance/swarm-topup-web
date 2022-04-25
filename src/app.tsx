import { JsonRpcSigner } from "@ethersproject/providers";
import { useState } from "preact/hooks";
import { Provider, createClient, useContract, useSigner } from "wagmi";

// Components
import { Profile } from "./components/profile";

// Config
import { POSTAGE_STAMP_CONTRACT_ADDRESS } from "./config";

// ABI
import abi from "./data/abi.json";

const client = createClient();

const TopUp = () => {
  const [batchId, setBatchId] = useState<string>(
    "0x9da3a7813977b7722e59de8826077a44736116c4aa5c9f31676da812870a9039"
  );
  const [amount, setAmount] = useState<number>(524288000000);

  const { data: signer } = useSigner();
  const contract = useContract({
    addressOrName: POSTAGE_STAMP_CONTRACT_ADDRESS,
    contractInterface: abi,
    signerOrProvider: signer as JsonRpcSigner,
  });

  // TODO: Type the event
  const topUp = async (event: any) => {
    event.preventDefault();
    console.log(await contract.topUp(batchId, amount));
  };

  return (
    <>
      Top up batch:
      <form onSubmit={(event) => topUp(event)}>
        Batch id:
        <input
          type="text"
          value={batchId}
          onChange={(event) => setBatchId(event.currentTarget.value)}
        />
        <br />
        Amount:
        <input
          type="number"
          value={amount}
          onChange={(event) => setAmount(Number(event.currentTarget.value))}
        />
        <br />
        <button type="submit">Top up</button>
      </form>
    </>
  );
};

export const App = () => {
  return (
    <Provider client={client}>
      <Profile />
      <TopUp />
    </Provider>
  );
};
