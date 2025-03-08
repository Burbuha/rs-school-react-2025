import type { Metadata } from 'next';
import { AppProviders } from '../context/AppProviders';

import { ErrorBoundary } from '../components/ErrorBoundary/ErrorBoundary';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Star Wars',
  description: 'Star Wars characters',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppProviders>
          <ErrorBoundary>{children}</ErrorBoundary>
        </AppProviders>
      </body>
    </html>
  );
}
