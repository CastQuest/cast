# ui-bootstrap.ps1
# CASTQUEST V3 — Full UI/UX scaffolding for apps/web
# - User dashboard
# - Admin dashboard
# - Dev dashboard
# - Shared UI components
# - V3 architecture SVG

$ErrorActionPreference = "Stop"

$webRoot = "apps/web"
$appRoot = Join-Path $webRoot "app"
$componentsRoot = Join-Path $webRoot "components"
$publicRoot = Join-Path $webRoot "public"

function Ensure-Dir($path) {
  if (-not (Test-Path $path)) {
    New-Item -ItemType Directory -Path $path | Out-Null
  }
}

function Write-File($path, $content) {
  $dir = Split-Path $path
  Ensure-Dir $dir
  $content | Set-Content -Path $path -Encoding UTF8
  Write-Host "Wrote $path" -ForegroundColor Green
}

Write-Host "CASTQUEST V3 — UI Bootstrap starting..." -ForegroundColor Cyan

# -------------------------------------------------
# 1. Ensure base folders
# -------------------------------------------------
Ensure-Dir $webRoot
Ensure-Dir $appRoot
Ensure-Dir $componentsRoot
Ensure-Dir (Join-Path $componentsRoot "ui")
Ensure-Dir (Join-Path $componentsRoot "charts")
Ensure-Dir (Join-Path $componentsRoot "layout")
Ensure-Dir (Join-Path $componentsRoot "flows")
Ensure-Dir (Join-Path $publicRoot)
Ensure-Dir (Join-Path $publicRoot "assets")
Ensure-Dir (Join-Path $publicRoot "assets/diagrams")
Ensure-Dir (Join-Path $publicRoot "assets/ui-templates")

# -------------------------------------------------
# 2. Shared layout components
# -------------------------------------------------
$layoutShell = @"
"use client";

import React from "react";
import { Sidebar } from "../ui/Sidebar";
import { Topbar } from "../ui/Topbar";

export function ShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="cq-shell flex h-screen bg-slate-950 text-slate-50">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
"@
Write-File (Join-Path $componentsRoot "layout/ShellLayout.tsx") $layoutShell

$sidebar = @"
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
              className={`rounded-md px-3 py-2 text-sm ${
                active
                  ? "bg-slate-800 text-slate-50"
                  : "text-slate-400 hover:bg-slate-900 hover:text-slate-50"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
"@
Write-File (Join-Path $componentsRoot "ui/Sidebar.tsx") $sidebar

$topbar = @"
"use client";

import React from "react";

export function Topbar() {
  return (
    <header className="cq-topbar flex items-center justify-between border-b border-slate-800 bg-slate-950/60 px-4 py-3">
      <div className="text-sm font-medium text-slate-200">
        CASTQUEST V3 — Autonomous Creative Economy
      </div>
      <div className="flex items-center gap-3 text-xs text-slate-400">
        <span>Network: Base + L2s + L3s + Solana</span>
        <span className="h-1 w-1 rounded-full bg-emerald-400" />
        <span>PR48–PR66 aligned</span>
      </div>
    </header>
  );
}
"@
Write-File (Join-Path $componentsRoot "ui/Topbar.tsx") $topbar

# -------------------------------------------------
# 3. Shared UI primitives
# -------------------------------------------------
$card = @"
import React from "react";

export function Card({
  title,
  children,
  className = "",
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`cq-card rounded-xl border border-slate-800 bg-slate-950/60 p-4 ${className}`}
    >
      {title && (
        <h2 className="mb-2 text-sm font-semibold tracking-tight text-slate-100">
          {title}
        </h2>
      )}
      <div className="text-xs text-slate-300">{children}</div>
    </section>
  );
}
"@
Write-File (Join-Path $componentsRoot "ui/Card.tsx") $card

$metric = @"
import React from "react";

export function Metric({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="cq-metric flex flex-col gap-1">
      <span className="text-[11px] uppercase tracking-wide text-slate-400">
        {label}
      </span>
      <span className="text-lg font-semibold text-slate-50">{value}</span>
      {hint && (
        <span className="text-[11px] text-slate-500">
          {hint}
        </span>
      )}
    </div>
  );
}
"@
Write-File (Join-Path $componentsRoot "ui/Metric.tsx") $metric

# -------------------------------------------------
# 4. Charts + flows placeholders
# -------------------------------------------------
$mcGraph = @"
import React from "react";
import { Card } from "../ui/Card";

export function McGraph() {
  return (
    <Card title="Market Cap (MC) — V1 → V2 → V3">
      <div className="h-40 rounded-md border border-dashed border-slate-700 bg-slate-950/40 p-3 text-[11px] text-slate-400">
        [MC chart placeholder]  
        MC = Σ(MEDIA + FRAM + GAME + CODE + SubDAO + L3) + buyback_multiplier  
        • V1: MEDIA-only, Base-only  
        • V2: Multi-chain, multi-asset  
        • V3: Adds sponsorship, AI DAO, treasury yield
      </div>
    </Card>
  );
}
"@
Write-File (Join-Path $componentsRoot "charts/McGraph.tsx") $mcGraph

$tokenBalances = @"
import React from "react";
import { Card } from "../ui/Card";

const tokens = [
  { symbol: "CAST", label: "Governance" },
  { symbol: "QUEST", label: "Fees + Buybacks" },
  { symbol: "MEDIA", label: "Content" },
  { symbol: "FRAM", label: "Frames / UI" },
  { symbol: "GAME", label: "Games" },
  { symbol: "CODE", label: "Code Modules" },
  { symbol: "SPONSOR", label: "Sponsorship" },
];

export function TokenBalances() {
  return (
    <Card title="Token Balances">
      <div className="grid grid-cols-2 gap-2 text-[11px]">
        {tokens.map((t) => (
          <div
            key={t.symbol}
            className="flex items-center justify-between rounded-md border border-slate-800 bg-slate-950/40 px-2 py-1"
          >
            <div className="flex flex-col">
              <span className="font-semibold text-slate-100">
                {t.symbol}
              </span>
              <span className="text-[10px] text-slate-500">
                {t.label}
              </span>
            </div>
            <span className="text-[11px] text-slate-300">
              0.00
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
"@
Write-File (Join-Path $componentsRoot "charts/TokenBalances.tsx") $tokenBalances

$activityStream = @"
import React from "react";
import { Card } from "../ui/Card";

const events = [
  "[Farcaster] Frame minted → FRAM",
  "[Marketplace] MEDIA listed on Base",
  "[DAO] Proposal #12: Adjust buyback multiplier",
  "[Treasury] Yield strategy rebalanced",
  "[Social] X bot posted auction summary",
];

export function ActivityStream() {
  return (
    <Card title="Activity Stream (On-chain + Social)">
      <ul className="flex flex-col gap-1 text-[11px] text-slate-300">
        {events.map((e, idx) => (
          <li
            key={idx}
            className="rounded-md border border-slate-800 bg-slate-950/40 px-2 py-1"
          >
            {e}
          </li>
        ))}
      </ul>
    </Card>
  );
}
"@
Write-File (Join-Path $componentsRoot "charts/ActivityStream.tsx") $activityStream

$buybackFlow = @"
import React from "react";
import { Card } from "../ui/Card";

export function BuybackFlowDiagram() {
  return (
    <Card title="Buyback Flow — V3">
      <pre className="whitespace-pre-wrap text-[10px] text-slate-300">
{`User Action
  → FeeManager (QUEST)
    → BuybackRouter
      → CAST buybacks (multi-chain)
        → Treasury + pools
          → MC update via indexers
            → Dashboards + agents`}
      </pre>
    </Card>
  );
}
"@
Write-File (Join-Path $componentsRoot "flows/BuybackFlowDiagram.tsx") $buybackFlow

$builderFlow = @"
import React from "react";
import { Card } from "../ui/Card";

export function BuilderToProtocolMap() {
  return (
    <Card title="Builder → Protocol Integration Map">
      <pre className="whitespace-pre-wrap text-[10px] text-slate-300">
{`AI Builder (Code / Frame / Game / UI)
  → SDK (media / fram / game / code)
    → Contracts (MediaToken / FramToken / GameToken / CodeToken)
      → Marketplace (listings, auctions, sponsors)
        → MC + SubDAO + L3
          → Dashboards + agents + social automation`}
      </pre>
    </Card>
  );
}
"@
Write-File (Join-Path $componentsRoot "flows/BuilderToProtocolMap.tsx") $builderFlow

$govFlow = @"
import React from "react";
import { Card } from "../ui/Card";

export function GovernanceFlowDiagram() {
  return (
    <Card title="Governance + AI DAO Flow">
      <pre className="whitespace-pre-wrap text-[10px] text-slate-300">
{`CAST holders
  → GovernanceV2
    → Proposals (parameters, agents, treasury)
      → AI DAO (advisory, analysis)
        → Execution (timelock, contracts)
          → Indexers + dashboards`}
      </pre>
    </Card>
  );
}
"@
Write-File (Join-Path $componentsRoot "flows/GovernanceFlowDiagram.tsx") $govFlow

$socialFlow = @"
import React from "react";
import { Card } from "../ui/Card";

export function SocialAutomationFlow() {
  return (
    <Card title="Social Automation Flow">
      <pre className="whitespace-pre-wrap text-[10px] text-slate-300">
{`On-chain events
  → SocialAutomationAgent
    → Bots (Farcaster / Reddit / X / Discord / Telegram)
      → Timeline + dashboards
        → Feedback into agents + governance`}
      </pre>
    </Card>
  );
}
"@
Write-File (Join-Path $componentsRoot "flows/SocialAutomationFlow.tsx") $socialFlow

# -------------------------------------------------
# 5. Dashboard pages
# -------------------------------------------------
$dashboardPage = @"
import { ShellLayout } from "../../components/layout/ShellLayout";
import { McGraph } from "../../components/charts/McGraph";
import { TokenBalances } from "../../components/charts/TokenBalances";
import { ActivityStream } from "../../components/charts/ActivityStream";
import { BuybackFlowDiagram } from "../../components/flows/BuybackFlowDiagram";
import { BuilderToProtocolMap } from "../../components/flows/BuilderToProtocolMap";

export default function DashboardPage() {
  return (
    <ShellLayout>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <McGraph />
          <ActivityStream />
        </div>
        <div className="space-y-4">
          <TokenBalances />
          <BuybackFlowDiagram />
          <BuilderToProtocolMap />
        </div>
      </div>
    </ShellLayout>
  );
}
"@
Write-File (Join-Path $appRoot "dashboard/page.tsx") $dashboardPage

# -------------------------------------------------
# 6. Admin page
# -------------------------------------------------
$adminPage = @"
import { ShellLayout } from "../../components/layout/ShellLayout";
import { Card } from "../../components/ui/Card";
import { GovernanceFlowDiagram } from "../../components/flows/GovernanceFlowDiagram";

export default function AdminPage() {
  return (
    <ShellLayout>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Card title="System Health (PR48–PR66)">
            <ul className="text-[11px] text-slate-300">
              <li>• Contracts compiled</li>
              <li>• SDK built</li>
              <li>• Agents registered</li>
              <li>• Docs-site generated</li>
              <li>• Dependency health (Issue #66) — surfaced via CI</li>
            </ul>
          </Card>
          <Card title="Agent Control">
            <p className="text-[11px] text-slate-300">
              Placeholder for enabling/disabling agents (Creation, Frame, Game, Pricing, Auction, Curation, Fraud, Sync, UI, Portfolio, SocialAutomation).
            </p>
          </Card>
          <GovernanceFlowDiagram />
        </div>
        <div className="space-y-4">
          <Card title="Treasury + Yield Strategies">
            <p className="text-[11px] text-slate-300">
              Placeholder for autonomous treasury strategies, yield allocations, and sponsor overlays.
            </p>
          </Card>
          <Card title="DAO + SubDAOs">
            <p className="text-[11px] text-slate-300">
              Placeholder for DAO metrics, SubDAO list, and governance status.
            </p>
          </Card>
        </div>
      </div>
    </ShellLayout>
  );
}
"@
Write-File (Join-Path $appRoot "admin/page.tsx") $adminPage

# -------------------------------------------------
# 7. Dev page
# -------------------------------------------------
$devPage = @"
import { ShellLayout } from "../../components/layout/ShellLayout";
import { Card } from "../../components/ui/Card";

export default function DevPage() {
  return (
    <ShellLayout>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card title="Contract Map">
          <p className="text-[11px] text-slate-300">
            Placeholder for mapping contracts (core, economy, governance, marketplace, L3, social) to networks and addresses.
          </p>
        </Card>
        <Card title="SDK Playground">
          <p className="text-[11px] text-slate-300">
            Placeholder for interactive SDK calls (wallet, media, fram, game, code, marketplace, agents, l3, bridge, governance, profile).
          </p>
        </Card>
        <Card title="Docs Links">
          <ul className="text-[11px] text-slate-300">
            <li>• docs-site/index.md</li>
            <li>• overview/architecture.md</li>
            <li>• protocol/constitution.md</li>
            <li>• protocol/ai-dao-constitution.md</li>
            <li>• marketplace/cross-chain-marketplace.md</li>
          </ul>
        </Card>
        <Card title="CI / Workflow Status">
          <p className="text-[11px] text-slate-300">
            Placeholder for surfacing buildui.yaml status, dependency health, and orchestration scripts.
          </p>
        </Card>
      </div>
    </ShellLayout>
  );
}
"@
Write-File (Join-Path $appRoot "dev/page.tsx") $devPage

# -------------------------------------------------
# 8. V3 architecture SVG
# -------------------------------------------------
$svg = @"
<svg viewBox="0 0 1200 900" xmlns="http://www.w3.org/2000/svg">
  <style>
    text { font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
  </style>
  <text x="600" y="60" text-anchor="middle" font-size="28" font-weight="bold">
    CASTQUEST V3 — AUTONOMOUS CREATIVE ECONOMY
  </text>

  <rect x="150" y="100" width="900" height="80" fill="#111827" stroke="#4B5563"/>
  <text x="600" y="145" text-anchor="middle" fill="#F9FAFB" font-size="18">
    INTERFACE LAYER — Web, L3 UIs, Bots (User / Admin / Dev Dashboards)
  </text>

  <rect x="150" y="200" width="900" height="80" fill="#1F2937" stroke="#4B5563"/>
  <text x="600" y="245" text-anchor="middle" fill="#F9FAFB" font-size="18">
    AI BUILDER LAYER — Code / Frame / Game / UI Builders
  </text>

  <rect x="150" y="300" width="900" height="80" fill="#111827" stroke="#4B5563"/>
  <text x="600" y="345" text-anchor="middle" fill="#F9FAFB" font-size="18">
    AGENT LAYER — Creation / Pricing / Auction / Curation / Fraud / Sync / UI / Portfolio / Social
  </text>

  <rect x="150" y="400" width="900" height="80" fill="#1F2937" stroke="#4B5563"/>
  <text x="600" y="445" text-anchor="middle" fill="#F9FAFB" font-size="18">
    PROTOCOL LAYER — CAST / QUEST / MEDIA / FRAM / GAME / CODE / UserProfile / SubDAOs
  </text>

  <rect x="150" y="500" width="900" height="80" fill="#111827" stroke="#4B5563"/>
  <text x="600" y="545" text-anchor="middle" fill="#F9FAFB" font-size="18">
    MULTI-CHAIN + L3 LAYER — Base / L2s / Solana / Creator L3s
  </text>

  <rect x="150" y="600" width="900" height="80" fill="#1F2937" stroke="#4B5563"/>
  <text x="600" y="645" text-anchor="middle" fill="#F9FAFB" font-size="18">
    MARKETPLACE LAYER — Global / L3 / Solana / Sponsor (PR #58)
  </text>

  <rect x="150" y="700" width="900" height="80" fill="#111827" stroke="#4B5563"/>
  <text x="600" y="745" text-anchor="middle" fill="#F9FAFB" font-size="18">
    GOVERNANCE + TREASURY LAYER — DAO / AI DAO / SubDAOs / Autonomous Treasury + Yield
  </text>
</svg>
"@
Write-File (Join-Path $publicRoot "assets/diagrams/v3-architecture.svg") $svg

Write-Host "CASTQUEST V3 — UI Bootstrap complete." -ForegroundColor Cyan
