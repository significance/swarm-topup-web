import { useState } from "preact/hooks";
import { Provider, createClient, useSigner } from "wagmi";

// Config
import { POSTAGE_STAMP_CONTRACT_ADDRESS } from "./config";

// Types
import { ethers, Signer } from "ethers";

// Components
import { Profile } from "./components/profile";
import { TimeToLive } from "./components/time-to-live";

// Hooks
import { useTopUp } from "./hooks/useTopUp";
import { useIncreaseAllowance } from "./hooks/useIncreaseAllowance";

const client = createClient({ autoConnect: true });

const TopUp = () => {
  const [batchId, setBatchId] = useState<string>(
    "0x9da3a7813977b7722e59de8826077a44736116c4aa5c9f31676da812870a9039"
  );
  const [amount, setAmount] = useState<number>(1_000_000);

  const { data: signerResult } = useSigner();
  const signer = signerResult as Signer;

  const doTopUp = useTopUp({ signer });
  const doIncreaseAllowance = useIncreaseAllowance({ signer });

  console.log({ doTopUp, doIncreaseAllowance });

  // TODO: Type the event
  const topUp = async (event: any) => {
    event.preventDefault();
    await doIncreaseAllowance(
      POSTAGE_STAMP_CONTRACT_ADDRESS,
      1000n * 10n ** 16n
    );
    await doTopUp(batchId, amount);
  };

  return (
    <>
      <h1>Fund the Hacker Manifest Swarm Stamp</h1>
      <p>
        The Hacker Manifesto has been uploaded to the swarm using stamp batch id{" "}
        <em>
          9da3a7813977b7722e59de8826077a44736116c4aa5c9f31676da812870a9039
        </em>{" "}
        and is available to view or reference in Swarm at address{" "}
        <em>
          bzz://d755aa1e5b2e059f7013dbdd6e1134fbc00976c5254c176a74ef24f1ce60f06f
        </em>{" "}
        or using CID{" "}
        <em>bah5acgza25k2uhs3fycz64at3pow4eju7paas5wfevgbo2tu54spdtta6bxq</em>.
        You may retrieve and view it directly from the network using a Swarm
        node for which you may find directions to install at{" "}
        <a href="https://ethswarm.org">https://ethswarm.org</a>, or using using
        the "bzz.link" service at{" "}
        <a href="https://bah5acgza25k2uhs3fycz64at3pow4eju7paas5wfevgbo2tu54spdtta6bxq.bzz.link/">
          https://bah5acgza25k2uhs3fycz64at3pow4eju7paas5wfevgbo2tu54spdtta6bxq.bzz.link/
        </a>
      </p>
      <h2>Stamp Status</h2>
      <p>
        The Hacker Manifest stamp will expire in XXX Seconds (xxx days), we
        enourage like minded individuals to contribute BZZ to the Hacker
        Manifesto Stamp so that will remain alive in the Swarm network.
      </p>
      <h2>Send BZZ to Top Up the Batch</h2>
      <p>
        In order to add funds to the stamp, may operate the postage stamp
        contract at which resides on the "Gnosis Chain" network at address{" "}
        <em>0x6a1A21ECA3aB28BE85C7Ba22b2d6eAE5907c900E</em>. You must first
        authorise your BZZ fund using the bridged ERC20 contract which can be
        found at address <em>0x6a1A21ECA3aB28BE85C7Ba22b2d6eAE5907c900E</em> on
        the "Gnosis Chain" network.
      </p>
      <p>
        For your convenience, the following form is provided which can be used
        to create the needed transactions, which can then be signed and sent to
        a Gnosis Chain RPC endpoint using the "MetaMask" browser extension.
      </p>
      <h2>Create Transactions</h2>
      <p>
        First, you must connect your "Metamask" wallet by pressing the following
        interface.
      </p>
      <hr />
      <Profile />
      <hr />
      <p>
        Once connected, enter your chosen amount to top up per chunk, per block
        (there are currently XXX chunks stampable by the postage batch) into the
        "Amount" field below, and click "Top Up" to send your transactions to
        the network.
      </p>
      <form onSubmit={(event) => topUp(event)}>
        <p>
          <input
            type="hidden"
            value={batchId}
            onChange={(event) => setBatchId(event.currentTarget.value)}
          />
          <label>Topup Amount Per Chunk Per Block</label>
        </p>
        <p>
          <input
            type="number"
            value={amount}
            onChange={(event) => setAmount(Number(event.currentTarget.value))}
          />
        </p>
        <p>
          <button type="submit">Top up</button>
        </p>
      </form>
      <TimeToLive batchId={batchId} />
    </>
  );
};

export const App = () => {
  return (
    <Provider client={client}>
      <TopUp />
    </Provider>
  );
};
