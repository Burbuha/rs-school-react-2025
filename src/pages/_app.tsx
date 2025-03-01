import { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import { store } from '../store/store';
import '../styles/globals.css';
import { ThemeProvider } from '../context/ThemeProvider';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ErrorBoundary>
          <Component {...pageProps} />
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
