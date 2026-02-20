import React, { useEffect, useRef } from 'react'

// Lightweight Charts is a browser-only library; import inside useEffect
export default function PriceChart() {
  const chartRef = useRef<HTMLDivElement | null>(null)
  const chartApiRef = useRef<any>(null)

  useEffect(() => {
    let mounted = true

    async function setup() {
      const { createChart } = await import('lightweight-charts')
      if (!mounted || !chartRef.current) return

      const container = chartRef.current
      const chart = createChart(container, {
        width: container.clientWidth,
        height: 420,
        layout: { background: { color: 'var(--bg)' }, textColor: 'var(--muted)' },
        grid: { vertLines: { color: 'rgba(255,255,255,0.02)' }, horzLines: { color: 'rgba(255,255,255,0.02)' } },
        rightPriceScale: { borderColor: 'rgba(255,255,255,0.03)' },
        timeScale: { borderColor: 'rgba(255,255,255,0.03)' },
      })

      // example candlestick series
      const candleSeries = chart.addCandlestickSeries({
        upColor: '#16a34a',
        downColor: '#ef4444',
        borderVisible: false,
        wickUpColor: '#16a34a',
        wickDownColor: '#ef4444',
      })

      // example line series
      const lineSeries = chart.addLineSeries({ color: '#60a5fa', lineWidth: 2 })

      // mock data (recent synthetic candles)
      const now = Date.now()
      const oneHour = 60 * 60 * 1000
      const candles = [] as any[]
      let base = 100
      for (let i = 60; i >= 0; i--) {
        const t = new Date(now - i * oneHour)
        const open = base + (Math.random() - 0.5) * 2
        const close = open + (Math.random() - 0.5) * 4
        const high = Math.max(open, close) + Math.random() * 2
        const low = Math.min(open, close) - Math.random() * 2
        candles.push({ time: Math.floor(t.getTime() / 1000), open, high, low, close })
        base = close
      }

      const lineData = candles.map((c) => ({ time: c.time, value: c.close }))

      candleSeries.setData(candles)
      lineSeries.setData(lineData)

      chartApiRef.current = { chart, candleSeries, lineSeries }

      // resize handling and simple crosshair
      chart.subscribeCrosshairMove((param: any) => {
        // could show tooltip based on param
      })
      const ro = new ResizeObserver(() => {
        const w = container.clientWidth
        chart.applyOptions({ width: w })
      })
      ro.observe(container)

      // cleanup
      return () => {
        ro.disconnect()
        chart.remove()
      }
    }

    let cleanup: (() => void) | void = undefined
    setup().then((c) => { if (c) cleanup = c }).catch(console.error)

    return () => { mounted = false; if (cleanup) cleanup() }
  }, [])

  return (
    <div className="w-full">
      <div ref={chartRef} style={{ width: '100%', height: 420 }} />
    </div>
  )
}
