'use client';

import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { FilterButton } from './FilterButton';
import { CreateButton } from './CreateButton';

export default function SearchBar() {
  return (
    <div className="flex max-w-md items-center mx-auto mt-10">
      <FilterButton />
      <Input
        className="bg-secondary rounded-tr-none rounded-br-none focus-visible:ring-offset-0"
        type="text"
      />
      <Button className="rounded-tl-none rounded-bl-none" type="submit">
        <Search />
      </Button>
      <CreateButton />
    </div>
  );
}
