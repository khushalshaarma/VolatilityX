import React from 'react'
import AppShell from '../components/AppShell'

export default function Models() {
  return (
    <AppShell>
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Models</h1>
      </header>

      <section className="card p-4">
        <h3 className="text-sm font-medium">Model Registry</h3>
        <div className="mt-3 muted">List, deploy, and version your predictive models here.</div>
      </section>
    </AppShell>
  )
}
