import React, { useEffect, useRef } from 'react'

type Props = { symbol?: string; small?: boolean }

// Lightweight Charts is a browser-only library; import inside useEffect
export default function PriceChart({ symbol = 'XAUUSD', small = false }: Props) {
  const chartRef = useRef<HTMLDivElement | null>(null)
  const chartApiRef = useRef<any>(null)

  useEffect(() => {
    let mounted = true

    async function setup() {
      const { createChart } = await import('lightweight-charts')
      if (!mounted || !chartRef.current) return

      const container = chartRef.current
      const height = small ? 220 : 420
      const chart = createChart(container, {
        width: container.clientWidth,
        height,
        layout: { background: { color: 'var(--bg)' }, textColor: 'var(--muted)' },
        grid: { vertLines: { color: 'rgba(255,255,255,0.02)' }, horzLines: { color: 'rgba(255,255,255,0.02)' } },
        rightPriceScale: { borderColor: 'rgba(255,255,255,0.03)' },
        timeScale: { borderColor: 'rgba(255,255,255,0.03)' },
      })

      const candleSeries = chart.addCandlestickSeries({
        upColor: '#16a34a',
        downColor: '#ef4444',
        borderVisible: false,
        wickUpColor: '#16a34a',
        wickDownColor: '#ef4444',
      })

      const lineSeries = chart.addLineSeries({ color: '#60a5fa', lineWidth: 2 })

      // starting bases to make symbols look sensible
      const baseMap: Record<string, number> = { XAUUSD: 1900, XAGUSD: 24, EURUSD: 1.08 }
      let base = baseMap[symbol] ?? 100

      // create initial candles (one per minute for last 60 minutes)
      const now = Date.now()
      const oneMin = 60 * 1000
      const candles: any[] = []
      for (let i = 60; i >= 0; i--) {
        const t = new Date(now - i * oneMin)
        const open = base + (Math.random() - 0.5) * (base * 0.002)
        const close = open + (Math.random() - 0.5) * (base * 0.003)
        const high = Math.max(open, close) + Math.random() * (base * 0.0015)
        const low = Math.min(open, close) - Math.random() * (base * 0.0015)
        const point = { time: Math.floor(t.getTime() / 1000), open, high, low, close }
        candles.push(point)
        base = close
      }

      candleSeries.setData(candles)
      lineSeries.setData(candles.map((c) => ({ time: c.time, value: c.close })))

      chartApiRef.current = { chart, candleSeries, lineSeries }

      // simulated live updates: append a new candle every second
      const interval = setInterval(() => {
        if (!chartApiRef.current) return
        const { candleSeries: cs, lineSeries: ls } = chartApiRef.current
        const last = candles[candles.length - 1]
        const nextTime = last.time + 60 // next minute (seconds)
        const open = last.close
        const close = open + (Math.random() - 0.5) * (open * 0.0015)
        const high = Math.max(open, close) + Math.random() * (open * 0.0008)
        const low = Math.min(open, close) - Math.random() * (open * 0.0008)
        const newBar = { time: nextTime, open, high, low, close }
        // rotate array to keep memory low
        candles.push(newBar)
        if (candles.length > 500) candles.shift()
        cs.update(newBar)
        ls.update({ time: newBar.time, value: newBar.close })
      }, 1000)

      chart.subscribeCrosshairMove(() => {})
      const ro = new ResizeObserver(() => {
        const w = container.clientWidth
        chart.applyOptions({ width: w })
      })
      ro.observe(container)

      return () => {
        clearInterval(interval)
        ro.disconnect()
        chart.remove()
      }
    }

    let cleanup: (() => void) | void = undefined
    setup().then((c) => { if (c) cleanup = c }).catch(console.error)

    return () => { mounted = false; if (cleanup) cleanup() }
  }, [symbol, small])

  return (
    <div className="w-full">
      <div className="text-xs muted mb-2">{symbol}</div>
      <div ref={chartRef} style={{ width: '100%', height: small ? 220 : 420 }} />
    </div>
  )
}
