'use client';

import { CartProvider } from '@/context/cartContext';
import '@/styles/globals.scss';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from 'react-query';

export default function RootLayout({ children }: React.PropsWithChildren) {
  const queryClient = new QueryClient();
  return (
    <SessionProvider>
      <CartProvider>
        <QueryClientProvider client={queryClient}>
          <html lang='fr'>
            <body suppressHydrationWarning={true}>
              <link rel='icon' href='../favicon.ico' sizes='any' />
              <main className='container'>{children}</main>
            </body>
          </html>
        </QueryClientProvider>
      </CartProvider>
    </SessionProvider>
  );
}
