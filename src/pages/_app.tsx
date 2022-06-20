import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'

import '../../styles/globals.css'
import { Background } from '../components/Background'
import store from '../store'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Background />
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
