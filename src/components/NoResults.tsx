import { CircleOff } from 'lucide-react';

interface NoResultsProps {
  query: string;
  creator: string;
  isEmpty: boolean;
}

export default function NoResults({ query, creator, isEmpty }: NoResultsProps) {
  const description = `No sounds matching query ${
    query !== '' && `"${query}"`
  } by ${creator === 'both' ? 'either creator' : creator}`;

  return (
    <section>
      <div className="px-4 bg-secondary border rounded-md py-4 w-[60%] lg:w-[40%] mx-auto">
        <div className="text-center">
          <h1 className="mb-4 text-xl md:text-2xl lg:text-3xl tracking-tight font-bold text-primary flex items-center justify-center gap-4">
            {isEmpty ? 'No Sounds in Database' : 'No Results Found'}
            <CircleOff className="hidden sm:inline-block" />
          </h1>
          <p className="mb-4 text-lg font-light my-4 w-[80%] mx-auto">
            {isEmpty ? 'Be the First to Upload' : description}
          </p>
        </div>
      </div>
    </section>
  );
}
