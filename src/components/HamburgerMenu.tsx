'use client';

import { Separator } from '@radix-ui/react-separator';
import { Menu, Music } from 'lucide-react';
import { Sheet, SheetTrigger, SheetContent } from './ui/sheet';
import DarkModeToggle from './DarkModeToggle';
import { Cedarville_Cursive as FontCursive } from 'next/font/google';

const fontSans = FontCursive({
  subsets: ['latin'],
  weight: '400',
});

export default function HamburgerMenu() {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="md:hidden" />
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-secondary">
        <h2
          className={`px-2 py-2 text-2xl text-primary font-bold ${fontSans.className}`}
        >
          Symfunny
          <Music className="inline-block ml-2" />
        </h2>
        <nav className="flex flex-col gap-4"></nav>
        <Separator className="bg-primary h-[1px] my-4" />
        <DarkModeToggle />
      </SheetContent>
    </Sheet>
  );
}
