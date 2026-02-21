import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { DataProvider } from '../context/DataContext'
import { DataFeedProvider } from '../context/DataFeedContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DataProvider>
      <DataFeedProvider>
        <Component {...pageProps} />
      </DataFeedProvider>
    </DataProvider>
  )
}
