import React, { createContext, useContext, useState, PropsWithChildren } from 'react'

type Mode = 'demo' | 'local'
type DataContextType = { mode: Mode; setMode: (m: Mode) => void }

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: PropsWithChildren) {
  const [mode, setMode] = useState<Mode>('demo')
  return <DataContext.Provider value={{ mode, setMode }}>{children}</DataContext.Provider>
}

export function useDataMode() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useDataMode must be used within DataProvider')
  return ctx
}

export default DataContext
