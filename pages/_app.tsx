import '../styles/globals.scss'
import type {AppProps} from 'next/app'
import {setupAxios} from '../lib/setup-axios'
import axios from 'axios'

function MyApp({Component, pageProps}: AppProps) {
  setupAxios(axios)
  return <Component {...pageProps} />
}

export default MyApp
