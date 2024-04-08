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
  sortAscendingName: boolean;
  handleChange(e: ChangeEvent<HTMLInputElement>): void;
  handleCreatorChange(e: string): void;
  handleAscendingNameSortChange(): void;
}

export default function SearchBar({
  handleCreatorChange,
  handleAscendingNameSortChange,
  sortAscendingName,
  creator,
  query,
  placeholder,
  handleChange,
}: SearchBarProps) {
  return (
    <div className="flex max-w-md lg:max-w-lg items-center mx-auto mt-10">
      <FilterButton
        handleCreatorChange={handleCreatorChange}
        handleAscendingNameSortChange={handleAscendingNameSortChange}
        sortAscendingName={sortAscendingName}
        creator={creator}
      />
      <Input
        placeholder={`${placeholder ?? 'Search'}...`}
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
