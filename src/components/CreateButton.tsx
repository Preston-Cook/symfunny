import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import CreateForm from './CreateForm';

export function CreateButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="ml-2 md:ml-4">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Sound</DialogTitle>
          <DialogDescription>
            Create a new sound here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <CreateForm />
      </DialogContent>
    </Dialog>
  );
}
