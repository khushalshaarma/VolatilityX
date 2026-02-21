import React from 'react'
import AppShell from '../components/AppShell'
import dynamic from 'next/dynamic'

const PriceChart = dynamic(() => import('../components/PriceChart'), { ssr: false })

export default function Dashboard() {
  return (
    <AppShell>
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="muted">Live · <span className="accent">Mock</span></div>
      </header>

      <section className="grid grid-cols-3 gap-4 mb-4">
        <div className="col-span-3 grid grid-cols-3 gap-4">
          <div className="card p-4">
            <PriceChart symbol="XAUUSD" />
          </div>
          <div className="card p-4">
            <PriceChart symbol="XAGUSD" />
          </div>
          <div className="card p-4">
            <PriceChart symbol="EURUSD" />
          </div>
        </div>
      </section>

      <section className="grid grid-cols-3 gap-4">
        <div className="col-span-1 card p-4">
          <h3 className="text-sm font-medium">Order Book (mock)</h3>
          <div className="mt-2 muted text-xs">Top bids/asks</div>
        </div>
        <div className="col-span-2 card p-4">
          <h3 className="text-sm font-medium">Trades</h3>
          <div className="mt-2 muted text-xs">Recent trades will appear here</div>
        </div>
      </section>
    </AppShell>
  )
}
