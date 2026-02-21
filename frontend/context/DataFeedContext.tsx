import React, { createContext, useContext, useEffect, useRef, useState, PropsWithChildren } from 'react'

type Candle = { time: number; open: number; high: number; low: number; close: number }
type Subscriber = (c: Candle) => void

const SYMBOLS = ['EURUSD','GBPUSD','USDJPY','USDCAD','AUDUSD','XAUUSD','XAGUSD','BTCUSD','ETHUSD','SPX']

const baseMap: Record<string, number> = { EURUSD: 1.08, GBPUSD: 1.25, USDJPY: 142, USDCAD: 1.35, AUDUSD: 0.68, XAUUSD: 1900, XAGUSD: 24, BTCUSD: 30000, ETHUSD: 1800, SPX: 4500 }

type FeedApi = {
  getHistory: (symbol: string, count?: number) => Promise<Candle[]>
  subscribe: (symbol: string, cb: Subscriber) => () => void
  symbols: string[]
}

const DataFeedContext = createContext<FeedApi | undefined>(undefined)

export function DataFeedProvider({ children }: PropsWithChildren) {
  const storeRef = useRef<Record<string, Candle[]>>({})
  const subsRef = useRef<Record<string, Subscriber[]>>({})
  const timersRef = useRef<Record<string, number>>({})

  // initialize historical data
  useEffect(() => {
    const now = Date.now()
    const oneMin = 60 * 1000
    for (const s of SYMBOLS) {
      const candles: Candle[] = []
      let base = baseMap[s] ?? 100
      for (let i = 300; i >= 0; i--) {
        const t = new Date(now - i * oneMin)
        const open = base + (Math.random() - 0.5) * (base * 0.002)
        const close = open + (Math.random() - 0.5) * (base * 0.003)
        const high = Math.max(open, close) + Math.random() * (base * 0.0015)
        const low = Math.min(open, close) - Math.random() * (base * 0.0015)
        candles.push({ time: Math.floor(t.getTime() / 1000), open, high, low, close })
        base = close
      }
      storeRef.current[s] = candles
      subsRef.current[s] = []
    }

    // start simulation timers
    for (const s of SYMBOLS) {
      const id = window.setInterval(() => {
        const arr = storeRef.current[s]
        const last = arr[arr.length - 1]
        const nextTime = last.time + 60
        const open = last.close
        const close = open + (Math.random() - 0.5) * (open * 0.0015)
        const high = Math.max(open, close) + Math.random() * (open * 0.0008)
        const low = Math.min(open, close) - Math.random() * (open * 0.0008)
        const newBar = { time: nextTime, open, high, low, close }
        arr.push(newBar)
        if (arr.length > 2000) arr.shift()
        // notify subscribers
        for (const cb of subsRef.current[s] || []) cb(newBar)
      }, 1000)
      timersRef.current[s] = id
    }

    return () => {
      for (const k in timersRef.current) window.clearInterval(timersRef.current[k])
    }
  }, [])

  const getHistory = async (symbol: string, count = 500) => {
    const arr = storeRef.current[symbol] || []
    return arr.slice(Math.max(0, arr.length - count))
  }

  const subscribe = (symbol: string, cb: Subscriber) => {
    subsRef.current[symbol] = subsRef.current[symbol] || []
    subsRef.current[symbol].push(cb)
    return () => {
      subsRef.current[symbol] = (subsRef.current[symbol] || []).filter((c) => c !== cb)
    }
  }

  const api: FeedApi = { getHistory, subscribe, symbols: SYMBOLS }

  return <DataFeedContext.Provider value={api}>{children}</DataFeedContext.Provider>
}

export function useDataFeed() {
  const ctx = useContext(DataFeedContext)
  if (!ctx) throw new Error('useDataFeed must be used within DataFeedProvider')
  return ctx
}

export default DataFeedContext
