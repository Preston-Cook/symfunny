import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ArrowDownAZ, Filter } from 'lucide-react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from './ui/select';
import { Toggle } from '@/components/ui/toggle';

interface FilterButtonProps {
  creator: string;
  sortAscendingName: boolean;
  handleAscendingNameSortChange(): void;
  handleCreatorChange(e: string): void;
}

export function FilterButton({
  handleCreatorChange,
  handleAscendingNameSortChange,
  creator,
  sortAscendingName,
}: FilterButtonProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="mr-2 md:mr-4">
          <Filter />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Filters</h4>
            <p className="text-sm">Apply search criteria for sounds.</p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Creator</Label>
              <Select onValueChange={handleCreatorChange} value={creator}>
                <SelectTrigger className="col-span-2 bg-secondary">
                  <SelectValue placeholder="Choose Creator" />
                </SelectTrigger>
                <SelectContent className="place:text-blue-400">
                  <SelectItem value="both">Both</SelectItem>
                  <SelectItem value="David">David</SelectItem>
                  <SelectItem value="Jeremiah">Jeremiah</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label className="col-span-2" htmlFor="width">
                Sound Title
              </Label>
              <Toggle
                className="col-span-1"
                pressed={sortAscendingName}
                onPressedChange={handleAscendingNameSortChange}
              >
                <ArrowDownAZ />
              </Toggle>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
