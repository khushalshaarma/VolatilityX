import React, { PropsWithChildren } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

const navItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Backtest', href: '/backtest' },
  { label: 'Models', href: '/models' },
  { label: 'Settings', href: '/settings' },
]

export default function AppShell({ children }: PropsWithChildren) {
  const { pathname } = useRouter()

  return (
    <div className="app-shell">
      <Head>
        <title>TradAI — AI Quant Trading Intelligence</title>
      </Head>

      <aside className="p-6" style={{ background: 'var(--surface)' }}>
        <h2 className="text-xl font-semibold mb-4">TradAI</h2>
        <nav className="text-sm muted">
          {navItems.map((it) => (
            <div key={it.href} className={`mb-3 ${pathname === it.href ? 'font-medium' : ''}`}>
              <Link href={it.href}>{it.label}</Link>
            </div>
          ))}
        </nav>
        <div className="mt-6 card p-4">
          <div className="text-xs muted">Account</div>
          <div className="font-medium"><Link href="/account">Demo / Local</Link></div>
        </div>
      </aside>

      <main className="main-content">{children}</main>
    </div>
  )
}
