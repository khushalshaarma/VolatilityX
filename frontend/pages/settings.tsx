import React from 'react'
import AppShell from '../components/AppShell'

export default function Settings() {
  return (
    <AppShell>
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Settings</h1>
      </header>

      <section className="card p-4">
        <h3 className="text-sm font-medium">Application Settings</h3>
        <div className="mt-3 muted">Theme, API keys, and other preferences.</div>
      </section>
    </AppShell>
  )
}
