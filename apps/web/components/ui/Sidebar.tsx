"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "User Dashboard" },
  { href: "/admin", label: "Admin Dashboard" },
  { href: "/dev", label: "Dev Dashboard" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/builders/code", label: "Code Builder" },
  { href: "/builders/frame", label: "Frame Builder" },
  { href: "/builders/game", label: "Game Builder" },
  { href: "/builders/ui", label: "UI Builder" },
  { href: "/dao", label: "DAO" },
  { href: "/farcaster/timeline", label: "Farcaster Timeline" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="cq-sidebar w-64 border-r border-slate-800 bg-slate-950/80">
      <div className="px-4 py-4 text-lg font-semibold tracking-tight">
        CASTQUEST V3
      </div>
      <nav className="flex flex-col gap-1 px-2 pb-4">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={ounded-md px-3 py-2 text-sm }
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
