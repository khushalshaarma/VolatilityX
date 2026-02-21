import React, { PropsWithChildren } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDataMode } from '../context/DataContext'

const navItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Backtest', href: '/backtest' },
  { label: 'Models', href: '/models' },
  { label: 'Settings', href: '/settings' },
]

export default function AppShell({ children }: PropsWithChildren) {
  const { pathname } = useRouter()
  const { mode, setMode } = useDataMode()

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
          <div className="font-medium flex items-center justify-between">
            <Link href="/account">{mode === 'demo' ? 'Demo' : 'Local'}</Link>
            <select value={mode} onChange={(e) => setMode(e.target.value as any)} className="bg-transparent text-sm">
              <option value="demo">Demo</option>
              <option value="local">Local</option>
            </select>
          </div>
        </div>
      </aside>

      <main className="main-content">{children}</main>
    </div>
  )
}
