'use client';

import SearchBar from './SearchBar';
import { v4 as uuidv4 } from 'uuid';
import SoundCard from './SoundCard';
import { ChangeEvent, useState } from 'react';

interface ContentProps {
  sounds: Sound[];
}

interface Sound {
  id: number;
  name: string;
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

  // randomly select search placeholder
  const titles = sounds.map((sound) => sound.name);
  const randomTitle = titles[Math.floor(Math.random() * titles.length)];

  // create filtered sounds

  return (
    <div className="sm:px-6 lg:px-8 py-8 flex flex-col justify-around gap-10">
      <div className="py-4 px-4 mx-auto max-w-screen-xl text-center lg:pt-16 lg:px-12 lg:pb-10">
        <h1 className="mb-12 text-4xl font-bold tracking-tight leading-none  md:text-5xl lg:text-5xl text-primary">
          Browse a Collection of Exquisite Sounds
        </h1>
        <p className="mb-12 text-lg font-normal lg:text-xl sm:px-16 xl:px-48 "></p>
        <SearchBar
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 place-items-center mx-auto">
        {sounds.map((sound) => (
          <SoundCard key={uuidv4()} />
        ))}
      </div>
    </div>
  );
}
