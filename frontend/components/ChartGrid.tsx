import React, { useState } from 'react'
import PriceChart from './PriceChart'
import LeftTools from './LeftTools'

const MAJOR_SYMBOLS = [
  'EURUSD', 'GBPUSD', 'USDJPY', 'USDCAD', 'AUDUSD',
  'XAUUSD', 'XAGUSD', 'BTCUSD', 'ETHUSD', 'SPX'
]

export default function ChartGrid() {
  const [active, setActive] = useState('EURUSD')
  const [timeframe, setTimeframe] = useState('1m')

  return (
    <div className="tv-container">
      <div className="tv-toolbar card p-2 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="font-medium">Symbol</div>
          <select
            value={active}
            onChange={(e) => setActive(e.target.value)}
            className="bg-transparent border rounded px-2 py-1 text-sm"
          >
            {MAJOR_SYMBOLS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>

          <div className="ml-4 font-medium">Timeframe</div>
          <div className="flex gap-2 ml-2">
            {['1m','5m','15m','1h','1d'].map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2 py-1 rounded text-sm ${timeframe===tf? 'bg-white/6' : 'bg-transparent'}`}
              >{tf}</button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-3 py-1 border rounded text-sm">Compare</button>
          <button className="px-3 py-1 border rounded text-sm">Indicators</button>
          <button className="px-3 py-1 border rounded text-sm">Share</button>
        </div>
      </div>

      <div className="tv-main grid grid-cols-12 gap-4">
        <div className="col-span-1">
          <LeftTools />
        </div>
        <div className="col-span-8 card p-3">
          <div className="mb-2 text-sm muted">Market — {active} · {timeframe}</div>
          <PriceChart symbol={active} />
        </div>

        <aside className="col-span-3">
          <div className="card p-3 mb-4">
            <h3 className="text-sm font-medium mb-2">Watchlist</h3>
            <div className="grid gap-2">
              {MAJOR_SYMBOLS.map((s) => (
                <div key={s} className={`p-2 rounded hover:bg-white/3 cursor-pointer flex items-center justify-between ${s===active? 'bg-white/5' : ''}`} onClick={() => setActive(s)}>
                  <div>{s}</div>
                  <div className="text-xs muted">—</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-3">
            <h3 className="text-sm font-medium mb-2">Mini Charts</h3>
            <div className="grid gap-3">
              {MAJOR_SYMBOLS.slice(0,6).map((s) => (
                <div key={s} className="w-full h-28">
                  <PriceChart symbol={s} small />
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
