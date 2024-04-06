import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import '@/styles/globals.css';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '../context/ThemeProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Head from 'next/head';

export const metadata: Metadata = {
  title: 'Symfunny',
  description: 'A soundboard app by Preston Cook',
};

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html suppressHydrationWarning>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <body
        className={cn(
          'min-h-screen flex flex-col bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system">
          <Header />
          <main className="flex-1 min-h-[90vh]">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
