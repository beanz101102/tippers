import { createConfig, fallback, http } from "wagmi";

import { base } from "wagmi/chains";

export const wagmiConfig = createConfig({
  chains: [base],
  transports: {
    [base.id]: fallback([
      http("https://mainnet.base.org"),
      http("https://base.llamarpc.com"),
      http("https://endpoints.omniatech.io/v1/base/mainnet/public"),
      http("https://base.drpc.org"),
    ]),
  },
});
