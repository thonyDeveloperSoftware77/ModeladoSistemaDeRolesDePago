import '@/styles/globals.css'

import { UserProvider } from '../../controllers/useProvider'
export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  )
}
