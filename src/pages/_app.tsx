import '../styles/globals.css';
import type { AppProps } from 'next/app';
import * as React from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../theme';
import createEmotionCache from '../createEmotionCache';
import { appWithTranslation } from 'next-i18next';
import { Provider } from 'react-redux';
import store from '../redux/store';
import NextThemeProvider from 'components/atoms/NextThemeProvider';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const MyApp = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  // console.log("MyAppCreate");

  return (
    <NextThemeProvider>
      <Provider store={store}>
        <CacheProvider value={emotionCache}>
          <Head>
            <title>Password manager</title>
            <meta name="viewport" content="initial-scale=1, width=device-width" />
            <meta name="description" content="password管理アプリケーション" />
            <link rel="icon" href="/favicon.ico" /> {/* 32*32 */}
            <link rel="apple-touch-icon" href="/" />{' '}
            {/* 180*180  This is displaying icon when it is registered home view as shortcut */}
          </Head>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </CacheProvider>
      </Provider>
    </NextThemeProvider>
  );
};

export default appWithTranslation(MyApp);
