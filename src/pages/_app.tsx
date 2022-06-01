import Script from 'next/script'
import type { AppProps } from 'next/app'

import GlobalStyles from 'styles/global'
import StyledContainer from 'styles/toastify-default'
import { SessionProvider } from 'next-auth/react'
import 'bootstrap/dist/css/bootstrap.css'
import NavBar from 'components/NavBar'

import 'react-toastify/dist/ReactToastify.css'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <Script src="https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js" />
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
        crossOrigin="anonymous"
      />
      <SessionProvider session={session}>
        <NavBar />
        <GlobalStyles />
        <StyledContainer />
        <Component {...pageProps} />
        <footer className="bg-light text-center text-lg-start mt-4 bg-dark">
          {/* Copyright */}
          <div className="text-light text-center p-3">
            © 2022 Copyright - PROFITEAM
            <a className="text-light" href=""></a>
          </div>
          {/* Copyright */}
        </footer>
      </SessionProvider>
    </>
  )
}
export default MyApp
