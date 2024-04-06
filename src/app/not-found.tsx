'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
export default function NotFound() {
  return (
    <section className="px-4">
      <div className="px-8 mx-auto w-fit mt-[24vh] bg-secondary border rounded-md py-8">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-bold lg:text-9xl text-primary">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold  md:text-4xl text-primary">
            Something&apos;s Missing
          </p>
          <p className="mb-4 text-lg font-light my-14 w-[80%] mx-auto">
            Sorry, we can&apos;t find that page. You&apos;ll find lots to
            explore on the home page.
          </p>
          <Link
            href="/"
            className="inline-flex font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4"
          >
            <Button variant="link">
              Back to Homepage
              <ArrowRight className="text-primary ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
