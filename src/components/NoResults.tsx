import { CircleOff } from 'lucide-react';

interface NoResultsProps {
  query: string;
  creator: string;
}

export default function NoResults({ query, creator }: NoResultsProps) {
  return (
    <section>
      <div className="px-4 bg-secondary border rounded-md py-4 w-[60%] mx-auto">
        <div className="text-center">
          <h1 className="mb-4 text-4xl tracking-tight font-bold lg:text-9xl text-primary flex items-center justify-center gap-4">
            <p className="">No Results Found</p>{' '}
            <CircleOff size={30} className="" />
          </h1>
          <p className="mb-4 text-lg font-light my-4 w-[80%] mx-auto">
            No sounds matching query {query !== '' && `"${query}"`} by{' '}
            {creator === 'both' ? 'either creator' : creator}
          </p>
        </div>
      </div>
    </section>
  );
}
