"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export function Header() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-8 flex items-center space-x-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              CASTQUEST
            </span>
          </Link>
        </div>
        <nav className="flex flex-1 items-center space-x-6 text-sm font-medium">
          <Link href="/casts" className="transition-colors hover:text-foreground/80">
            CASTs
          </Link>
          <Link href="/quests" className="transition-colors hover:text-foreground/80">
            Quests
          </Link>
          <Link href="/marketplace" className="transition-colors hover:text-foreground/80">
            Marketplace
          </Link>
          <Link href="/governance" className="transition-colors hover:text-foreground/80">
            Governance
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          {isConnected ? (
            <>
              <span className="text-sm text-muted-foreground">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </span>
              <Button variant="outline" onClick={() => disconnect()}>
                Disconnect
              </Button>
            </>
          ) : (
            <Button onClick={() => connect({ connector: connectors[0] })}>
              Connect Wallet
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
