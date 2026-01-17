import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CASTQUEST V3 - Autonomous Multi-Chain Creative Economy",
  description: "AI builders, agents, L3 chains, global marketplace, and sponsorship economy",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'CASTQUEST V3',
  description: 'Autonomous multi-chain creative economy'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en' className='dark'>
      <body className='bg-cq-bg text-slate-100'>
        <div className='min-h-screen flex flex-col'>
          <header className='h-14 border-b border-slate-800 bg-slate-900/70 backdrop-blur flex items-center justify-between px-4'>
            <div className='flex items-center gap-2'>
              <span className='font-semibold tracking-wide'>CASTQUEST V3</span>
              <span className='text-xs text-slate-400'>Autonomous Creative Economy</span>
            </div>
            <div className='flex items-center gap-3 text-sm text-slate-300'>
              <span>Network: Base</span>
              <span>Wallet: 0x…</span>
            </div>
          </header>
          <div className='flex flex-1'>
            <aside className='w-60 border-r border-slate-800 bg-slate-950/80'>
              <nav className='p-3 text-sm space-y-1'>
                <a href='/dashboard' className='block px-3 py-2 rounded-md bg-slate-800 text-slate-100'>
                  Dashboard
                </a>
                <a href='/marketplace' className='block px-3 py-2 rounded-md text-slate-300 hover:bg-slate-800'>
                  Marketplace
                </a>
                <a href='/builders/code' className='block px-3 py-2 rounded-md text-slate-300 hover:bg-slate-800'>
                  Builders
                </a>
                <a href='/dao' className='block px-3 py-2 rounded-md text-slate-300 hover:bg-slate-800'>
                  DAO
                </a>
                <a href='/tokens' className='block px-3 py-2 rounded-md text-slate-300 hover:bg-slate-800'>
                  Tokens
                </a>
                <a href='/dev' className='block px-3 py-2 rounded-md text-slate-300 hover:bg-slate-800'>
                  Dev Tools
                </a>
              </nav>
            </aside>
            <main className='flex-1 p-6 overflow-y-auto'>
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
