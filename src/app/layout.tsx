import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import '@/styles/globals.css';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '../context/ThemeProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Head from 'next/head';
import { Toaster } from '@/components/ui/toaster';

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
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon-16x16.png"
        />
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
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
