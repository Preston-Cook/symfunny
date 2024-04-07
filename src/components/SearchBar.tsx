'use client';

import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { FilterButton } from './FilterButton';
import { CreateButton } from './CreateButton';
import { ChangeEvent } from 'react';

interface SearchBarProps {
  query: string;
  placeholder: string;
  creator: string;
  sortAscendingCreation: boolean;
  sortAscendingName: boolean;
  handleChange(e: ChangeEvent<HTMLInputElement>): void;
  handleAscendingNameSortChange(): void;
  handleAscendingCreationSortChange(): void;
}

export default function SearchBar({
  handleAscendingNameSortChange,
  handleAscendingCreationSortChange,
  sortAscendingCreation,
  sortAscendingName,
  creator,
  query,
  placeholder,
  handleChange,
}: SearchBarProps) {
  return (
    <div className="flex max-w-md lg:max-w-lg items-center mx-auto mt-10">
      <FilterButton
        handleAscendingCreationSortChange={handleAscendingCreationSortChange}
        handleAscendingNameSortChange={handleAscendingNameSortChange}
        sortAscendingName={sortAscendingName}
        sortAscendingCreation={sortAscendingCreation}
        creator={creator}
      />
      <Input
        placeholder={`${placeholder}...`}
        onChange={handleChange}
        value={query}
        name="q"
        className="bg-secondary rounded-tr-none rounded-br-none focus-visible:ring-offset-0"
        type="text"
      />
      <Button className="rounded-tl-none rounded-bl-none hover:bg-primary cursor-default">
        <Search />
      </Button>
      <CreateButton />
    </div>
  );
}
