import "styles/global.scss"; // Global styles
import type { AppProps } from "next/app"; // Types
import { Web3OnboardProvider, init } from "@web3-onboard/react";
import injectedModule from "@web3-onboard/injected-wallets";
import StateProvider from "state";
import walletConnectModule from "@web3-onboard/walletconnect";

const fantom = {
  id: "0xfa",
  token: "FTM",
  label: "Fantom",
  rpcUrl: "https://rpc.ftm.tools",
};
const chains = [fantom];
const walletConnect = walletConnectModule({
  version: 2,
  // handleUri: (uri) => console.log(uri),
  projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID ?? "",
  requiredChains: [250],
});

const wallets = [injectedModule(), walletConnect];
const web3Onboard = init({
  wallets,
  chains,
});

// Export application
export default function MerkleAirdropStarter({
  Component,
  pageProps,
}: AppProps) {
  return (
    <Web3OnboardProvider web3Onboard={web3Onboard}>
      <StateProvider>
        <Component {...pageProps} />
      </StateProvider>
    </Web3OnboardProvider>
  );
}
