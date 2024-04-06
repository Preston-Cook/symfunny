import { Button } from './ui/button';
import Link from 'next/link';

export default async function Footer() {
  return (
    <footer className="border-t sm:flex sm:justify-between py-8 px-4 border-b bg-secondary mt-6">
      <div className="mx-auto max-w-screen-xl text-center">
        <Link href="/">
          <Button className="sm:pl-0 text-2xl font-semibold" variant="link">
            Symfunny
          </Button>
        </Link>
        <span className="text-sm sm:text-center ">
          © 2024 Symfunny™ All Rights Reserved
        </span>
      </div>
    </footer>
  );
}
