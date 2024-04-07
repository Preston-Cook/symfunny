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
  description: 'A Soundboard App by Preston Cook',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-music"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
  },
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
