import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import Head from 'next/head';

import { store } from '../store/store';
import '../styles/globals.css';
import { ThemeProvider } from '../context/ThemeProvider';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ErrorBoundary>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <title>Star Wars</title>
          </Head>
          <Component {...pageProps} />
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
