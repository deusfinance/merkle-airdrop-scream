import Image from "next/image"; // Images
import { eth } from "state/eth"; // State container
import Layout from "components/Layout"; // Layout wrapper
import { useRouter } from "next/router"; // Routing
import styles from "styles/pages/Home.module.scss"; // Page styles
import { useConnectWallet } from "@web3-onboard/react";
import { useMemo } from "react";

// const tokenName: string = process.env.NEXT_PUBLIC_TOKEN_NAME ?? "Token Name";
const heading: string = process.env.NEXT_PUBLIC_HEADING ?? "Some heading";
// const description: string = process.env.NEXT_PUBLIC_DESCRIPTION ?? "Some description";
const disclaimer: string =
  process.env.NEXT_PUBLIC_DISCLAIMER ?? "Some disclaimer";

const bDEI_LINK: string =
  process.env.NEXT_PUBLIC_bDEI ?? "https://bdei.scream.sh/";
const SCREAM_LINK: string =
  process.env.NEXT_PUBLIC_SCREAM ?? "http://scream.scream.sh/";
const FUSD_LINK: string =
  process.env.NEXT_PUBLIC_FUSD ?? "https://fusd.scream.sh/";

export default function Home() {
  const { push } = useRouter();
  const [{ wallet }] = useConnectWallet();
  const address = useMemo(
    () => wallet?.accounts[0].address,
    [wallet?.accounts]
  );

  return (
    <Layout>
      <div className={styles.home}>
        <div>
          <Image src="/logo.png" alt="Logo" width={250} height={250} priority />
        </div>

        {process.env.NEXT_PUBLIC_ARTICLE ? (
          <a
            href={process.env.NEXT_PUBLIC_ARTICLE}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read more about the Scream v1 compensation plan{" "}
            <Image src="/icons/arrow.svg" alt="Arrow" height={12} width={12} />
          </a>
        ) : null}

        <h1>{heading}</h1>

        <p>
          Scream v1 debt holders can claim their proportional share of 400k
          SCREAM (additionally to a proportional share of ~4.5m{" "}
          <a
            href={FUSD_LINK}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#0000FF" }}
          >
            fUSD{" "}
          </a>
          and 1{" "}
          <a
            href={bDEI_LINK}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#0000FF" }}
          >
            bDEI
          </a>
          ) for every dollar of net assets they held in Scream v1, using
          Chainlink prices.
        </p>

        <p>{disclaimer}</p>

        <div></div>

        {!address ? (
          // If not authenticated, disabled
          <button disabled>Connect Wallet to Claim Tokens</button>
        ) : (
          // Else, reroute to /claim
          <button onClick={() => push("/claim")}>Claim Tokens</button>
        )}
      </div>
    </Layout>
  );
}
