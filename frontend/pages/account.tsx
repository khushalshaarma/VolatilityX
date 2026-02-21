import React from 'react'
import AppShell from '../components/AppShell'

export default function Account() {
  return (
    <AppShell>
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Account</h1>
      </header>

      <section className="card p-4">
        <h3 className="text-sm font-medium">Account</h3>
        <div className="mt-3 muted">Manage your account profile and environment (Demo / Local).</div>
      </section>
    </AppShell>
  )
}
