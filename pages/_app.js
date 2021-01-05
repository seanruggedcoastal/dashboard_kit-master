import App from 'next/app'
import {ThemeProvider} from '../components/Shared/ThemeContext'
import {StoreProvider} from '../components/Shared/StoreContext'
import {AuthProvider} from '../components/Shared/AuthContext'
import GlobalStyle from '../styles/global'
import React from 'react'



class MyApp extends App {
  static async getInitialProps({Component, ctx}) {

    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

    return {pageProps};
  }
  render () {
    const { Component, pageProps, store } = this.props
    return (
      <AuthProvider>
        <ThemeProvider>
          <StoreProvider>
            <GlobalStyle />
            <Component {...pageProps} />
          </StoreProvider>
        </ThemeProvider>
      </AuthProvider>
    )
  }
}

export default MyApp