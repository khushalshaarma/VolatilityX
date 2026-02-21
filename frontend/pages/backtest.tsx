import React from 'react'
import AppShell from '../components/AppShell'

export default function Backtest() {
  return (
    <AppShell>
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Backtest</h1>
      </header>

      <section className="card p-4">
        <h3 className="text-sm font-medium">Run Backtests</h3>
        <div className="mt-3 muted">Upload strategy or choose a model to run historical simulations.</div>
      </section>
    </AppShell>
  )
}
