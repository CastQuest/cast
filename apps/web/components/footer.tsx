import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-sm font-semibold">Platform</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/casts">CASTs</Link>
              </li>
              <li>
                <Link href="/quests">Quests</Link>
              </li>
              <li>
                <Link href="/marketplace">Marketplace</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">Governance</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/governance">Proposals</Link>
              </li>
              <li>
                <Link href="/governance/daos">SubDAOs</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">Developers</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/docs">Documentation</Link>
              </li>
              <li>
                <Link href="/api">API</Link>
              </li>
              <li>
                <Link href="https://github.com/castquest">GitHub</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">Community</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/discord">Discord</Link>
              </li>
              <li>
                <Link href="/twitter">Twitter</Link>
              </li>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 CASTQUEST V3. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
