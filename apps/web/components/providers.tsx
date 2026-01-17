"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet, sepolia, base, arbitrum } from "wagmi/chains";
import { useState } from "react";

const config = createConfig({
  chains: [mainnet, sepolia, base, arbitrum],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [base.id]: http(),
    [arbitrum.id]: http(),
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
