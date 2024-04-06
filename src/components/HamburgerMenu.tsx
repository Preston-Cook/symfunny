'use client';

import Link from 'next/link';
import { Separator } from '@radix-ui/react-separator';
import { Menu } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Sheet, SheetTrigger, SheetContent } from './ui/sheet';
import DarkModeToggle from './DarkModeToggle';

export default function HamburgerMenu() {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="md:hidden" />
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-secondary">
        <h2 className="px-2 py-4 text-2xl text-primary font-bold">Velago</h2>
        <nav className="flex flex-col gap-4"></nav>
        <Separator className="bg-primary h-[1px] my-4" />
        <DarkModeToggle />
      </SheetContent>
    </Sheet>
  );
}
