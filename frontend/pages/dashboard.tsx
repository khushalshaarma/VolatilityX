import React from 'react'
import AppShell from '../components/AppShell'
import dynamic from 'next/dynamic'
const ChartGrid = dynamic(() => import('../components/ChartGrid'), { ssr: false })

export default function Dashboard() {
  return (
    <AppShell>
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="muted">Live · <span className="accent">Market View</span></div>
      </header>

      <ChartGrid />
    </AppShell>
  )
}
