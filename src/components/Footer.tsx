import { Button } from './ui/button';
import Link from 'next/link';
import { Cedarville_Cursive as FontCursive } from 'next/font/google';
import { Music } from 'lucide-react';

const fontSans = FontCursive({
  subsets: ['latin'],
  weight: '400',
});

export default async function Footer() {
  return (
    <footer className="border-t sm:flex sm:justify-between py-8 px-4 border-b bg-secondary mt-6">
      <div className="mx-auto max-w-screen-xl text-center">
        <Link href="/">
          <Button
            className={`sm:pl-0 text-2xl font-semibold ${fontSans.className}`}
            variant="link"
          >
            <p>Symfunny</p>
            <p className="ml-3">
              <Music />
            </p>
          </Button>
        </Link>
        <div className="text-sm sm:text-center mt-3">
          © 2024 Symfunny™ All Rights Reserved
        </div>
      </div>
    </footer>
  );
}
