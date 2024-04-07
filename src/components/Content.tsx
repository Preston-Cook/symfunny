'use client';

import SearchBar from './SearchBar';
import { v4 as uuidv4 } from 'uuid';
import SoundCard from './SoundCard';
import { ChangeEvent, useState } from 'react';
import SmithWatermanGotoh from '@/lib/smithWatermanGotoh';
import { CircleOff } from 'lucide-react';
import NoResults from './NoResults';

interface ContentProps {
  sounds: Sound[];
}

interface Sound {
  id: number;
  name: string;
  description: string | null;
  creator: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}

interface FilterProps {
  q: string;
  creator: string | undefined;
  sortAscendingCreation: boolean;
  sortAscendingName: boolean;
}

const swg = new SmithWatermanGotoh(-2, 1, -1);

function sortByNameAndCreatedAt(
  sounds: Sound[],
  nameOrder: string = 'asc',
  createdAtOrder: string = 'asc',
) {
  return [...sounds].sort((a, b) => {
    let soundComparison = a.name.localeCompare(b.name);
    if (nameOrder === 'desc') {
      soundComparison *= -1; // Reverse order for descending
    }
    if (soundComparison !== 0) {
      return soundComparison;
    }

    // If names are equal, compare by createdAt
    let createdAtComparison = a.createdAt.getTime() - b.createdAt.getTime();
    if (createdAtOrder === 'desc') {
      createdAtComparison *= -1; // Reverse order for descending
    }
    return createdAtComparison;
  });
}

export default function Content({ sounds }: ContentProps) {
  const [{ q, creator, sortAscendingCreation, sortAscendingName }, setFilters] =
    useState<FilterProps>({
      q: '',
      creator: 'both',
      sortAscendingCreation: false,
      sortAscendingName: true,
    });

  function handleFilterChange(e: ChangeEvent<HTMLInputElement>) {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleAscendingCreationSortChange() {
    setFilters((prev) => ({
      ...prev,
      sortAscendingCreation: !prev.sortAscendingCreation,
    }));
  }

  function handleAscendingNameSortChange() {
    setFilters((prev) => ({
      ...prev,
      sortAscendingName: !prev.sortAscendingName,
    }));
  }

  function handleCreatorChange(c: string) {
    setFilters((prev) => ({
      ...prev,
      creator: c,
    }));
  }

  function filterSounds(sound: Sound) {
    // filter by query
    const cleanedQuery = q.toLowerCase().replace(' ', '');
    const cleanedTitle = sound.name.toLowerCase().replace(' ', '');

    // threshold for algo
    const highSimilarity =
      q === '' || swg.align(cleanedQuery, cleanedTitle) > q.length * (3 / 5);

    // filter by creator
    const includesCreator = creator === 'both' || sound.creator === creator;

    return highSimilarity && includesCreator;
  }

  // randomly select search placeholder
  const titles = sounds.map((sound) => sound.name);
  const randomTitle = titles[Math.floor(Math.random() * titles.length)];

  // create filtered sounds
  let filteredSounds = sounds.filter(filterSounds);
  filteredSounds = sortByNameAndCreatedAt(
    filteredSounds,
    sortAscendingName ? 'asc' : 'desc',
    sortAscendingCreation ? 'asc' : 'desc',
  );

  return (
    <div className="sm:px-6 lg:px-8 py-8 flex flex-col justify-around gap-10">
      <div className="py-4 px-4 mx-auto max-w-screen-xl text-center lg:pt-16 lg:px-12 lg:pb-10">
        <h1 className="mb-12 text-4xl font-bold tracking-tight leading-none  md:text-5xl lg:text-5xl text-primary">
          Browse a Collection of Exquisite Sounds
        </h1>
        <p className="mb-12 text-lg font-normal lg:text-xl sm:px-16 xl:px-48 "></p>
        <SearchBar
          handleCreatorChange={handleCreatorChange}
          handleAscendingCreationSortChange={handleAscendingCreationSortChange}
          handleAscendingNameSortChange={handleAscendingNameSortChange}
          sortAscendingCreation={sortAscendingCreation}
          sortAscendingName={sortAscendingName}
          creator={creator ?? 'both'}
          placeholder={randomTitle}
          query={q}
          handleChange={handleFilterChange}
        />
      </div>
      {filteredSounds.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-14 place-items-center mx-auto">
          {filteredSounds.map(
            ({ id, name, description, url, createdAt, creator }) => (
              <SoundCard
                id={id}
                name={name}
                description={description}
                url={url}
                createdAt={createdAt}
                creator={creator}
                key={uuidv4()}
              />
            ),
          )}
        </div>
      ) : (
        <NoResults
          isEmpty={sounds.length === 0}
          query={q}
          creator={creator ?? 'Both'}
        />
      )}
    </div>
  );
}
