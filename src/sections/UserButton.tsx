import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useWalletAddress } from "gamba-react-v2";
import { GambaUi } from "gamba-react-ui-v2";
import React from "react";
import { Modal } from "../components/Modal";
import { truncateString } from "../utils";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect } from "wagmi";

function ConnectedButton() {
  const [modal, setModal] = React.useState(false);
  const wallet = useWallet();
  const ref = React.useRef<HTMLDivElement>(null!);
  const address = useWalletAddress();
  const { address: wagmiAddress } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <>
      {modal && (
        <Modal onClose={() => setModal(false)}>
          <h1>{truncateString(wagmiAddress ?? "", 6, 3)}</h1>
          <GambaUi.Button onClick={() => disconnect()}>
            Disconnect
          </GambaUi.Button>
        </Modal>
      )}
      <div style={{ position: "relative" }} ref={ref}>
        <GambaUi.Button onClick={() => setModal(true)}>
          <div style={{ display: "flex", gap: ".5em", alignItems: "center" }}>
            <img src={wallet.wallet?.adapter.icon} height="20px" />
            {truncateString(wagmiAddress ?? "", 3)}
          </div>
        </GambaUi.Button>
      </div>
    </>
  );
}

export function UserButton() {
  const walletModal = useWalletModal();
  const wallet = useWallet();

  const connect = () => {
    if (wallet.wallet) {
      wallet.connect();
    } else {
      walletModal.setVisible(true);
    }
  };

  const { openConnectModal } = useConnectModal();
  const { address } = useAccount();

  return (
    <>
      {address ? (
        <ConnectedButton />
      ) : (
        <GambaUi.Button onClick={openConnectModal}>Connect</GambaUi.Button>
      )}
    </>
  );
}
