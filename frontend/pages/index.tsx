<<<<<<< HEAD
import dynamic from 'next/dynamic'
import AppShell from '../components/AppShell'

const PriceChart = dynamic(() => import('../components/PriceChart'), { ssr: false })

export default function Home() {
  return (
    <AppShell>
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">AI Quant Trading Intelligence</h1>
        <div className="muted">Live · <span className="accent">Mock</span></div>
      </header>

      <section className="grid grid-cols-3 gap-4 mb-4">
        <div className="col-span-2 card p-4">
          <PriceChart />
        </div>
        <div className="card p-4">
          <h3 className="text-sm font-medium">Summary</h3>
          <div className="mt-3">
            <div className="flex justify-between muted"><span>Portfolio</span><span>$10,000</span></div>
            <div className="flex justify-between muted"><span>Unreal P/L</span><span className="accent">+1.2%</span></div>
            <div className="flex justify-between muted"><span>Win Rate</span><span>62%</span></div>
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
=======
import Head from 'next/head'
import dynamic from 'next/dynamic'

const PriceChart = dynamic(() => import('../components/PriceChart'), { ssr: false })

const Home = () => {
  return (
    <div className="app-shell">
      <Head>
        <title>AI Quant Trading Intelligence Dashboard</title>
      </Head>

      <aside className="p-6" style={{ background: 'var(--surface)' }}>
        <h2 className="text-xl font-semibold mb-4">TradAI</h2>
        <nav className="text-sm muted">
          <div className="mb-3">Dashboard</div>
          <div className="mb-3">Backtest</div>
          <div className="mb-3">Models</div>
          <div className="mb-3">Settings</div>
        </nav>
        <div className="mt-6 card p-4">
          <div className="text-xs muted">Account</div>
          <div className="font-medium">Demo / Local</div>
        </div>
      </aside>

      <main className="main-content">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">AI Quant Trading Intelligence</h1>
          <div className="muted">Live · <span className="accent">Mock</span></div>
        </header>

        <section className="grid grid-cols-3 gap-4 mb-4">
          <div className="col-span-2 card p-4">
            <PriceChart />
          </div>
          <div className="card p-4">
            <h3 className="text-sm font-medium">Summary</h3>
            <div className="mt-3">
              <div className="flex justify-between muted"><span>Portfolio</span><span>$10,000</span></div>
              <div className="flex justify-between muted"><span>Unreal P/L</span><span className="accent">+1.2%</span></div>
              <div className="flex justify-between muted"><span>Win Rate</span><span>62%</span></div>
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
      </main>
    </div>
  )
}

export default Home
>>>>>>> 1cc9902aedeaf29e2ad58d7772cdd2e05088d92d
