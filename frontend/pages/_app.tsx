<<<<<<< HEAD
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
=======
import '../styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
>>>>>>> 1cc9902aedeaf29e2ad58d7772cdd2e05088d92d
