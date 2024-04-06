import Link from 'next/link';
import HamburgerMenu from './HamburgerMenu';
import DarkModeToggle from './DarkModeToggle';

async function Header() {
  return (
    <header className="sm:flex sm:justify-between py-3 px-4 border-b bg-secondary">
      <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between w-full">
        <div className="flex items-center">
          <Link href="/">
            <h1 className="text-2xl font-bold text-primary">Velago</h1>
          </Link>
        </div>
        <nav className="space-x-6 hidden max-w-400px justify-end md:flex ml-auto"></nav>
        <div className="flex items-center justify-end">
          <div className="hidden md:inline-flex mx-6">
            <DarkModeToggle />
          </div>
          <HamburgerMenu />
        </div>
      </div>
    </header>
  );
}

export default Header;
