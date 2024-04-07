'use client';
import { useAudioRecorder } from 'react-audio-voice-recorder';
import { useForm } from 'react-hook-form';
import { createSoundSchemaClient } from '@/schemas/CreateSoundSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from './ui/input';
import Spinner from './Spinner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from './ui/select';
import { DialogFooter } from './ui/dialog';
import { Mic, Disc, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useToast } from './ui/use-toast';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { Textarea } from './ui/textarea';

const ACCEPTED_MIME_TYPES = [
  'audio/wav',
  'audio/mpeg',
  'audio/webm',
  'video/webm',
];

export default function CreateForm() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();

  const [selectKey, setSelectKey] = useState<string>(uuidv4());
  const { startRecording, stopRecording, isRecording, recordingBlob } =
    useAudioRecorder();

  const form = useForm<z.infer<typeof createSoundSchemaClient>>({
    resolver: zodResolver(createSoundSchemaClient),
    defaultValues: {
      name: '',
      creator: '',
      soundFile: '',
      description: '',
    },
  });

  const {
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = form;

  useEffect(
    function () {
      if (!recordingBlob) return;
      const file = new File([recordingBlob], 'new-sound.webm', {
        type: 'audio/webm',
      });

      setFile(file);
    },
    [recordingBlob],
  );

  async function onSubmit(values: z.infer<typeof createSoundSchemaClient>) {
    if (!file) {
      setError('soundFile', {
        message: 'Sound File Required',
      });
      return;
    }
    setIsLoading(true);

    if (file.size > 5242880) {
      setError('soundFile', {
        message: 'File Exceeds 5mb',
      });
      return;
    }

    // get presigned URL
    const res1 = await fetch('/api/upload');

    if (!res1.ok) {
      setIsLoading(false);
      setError('root', {
        message: 'Something Went Wrong',
      });
      return;
    }

    const data = await res1.json();

    const { signedUrl }: { signedUrl: string } = data;

    // post to AWS
    const res2 = await fetch(signedUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: file,
    });

    if (!res2.ok) {
      setIsLoading(false);
      setError('root', {
        message: 'Something Went Wrong',
      });
      return;
    }

    const { name, creator, description } = values;
    const url = signedUrl.split('?')[0];

    // post remaining data to server
    const res3 = await fetch('/api/sounds', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        description,
        creator,
        url,
      }),
    });

    if (!res3.ok) {
      setIsLoading(false);
      setError('root', {
        message: 'Something Went Wrong',
      });
      return;
    }

    // reset fields
    setFile(null);
    setSelectKey(uuidv4());
    setValue('name', '');
    setValue('description', '');
    setValue('creator', '');

    toast({
      title: 'Success!',
      description: 'Sound Created',
    });

    setIsLoading(false);
    router.refresh();
  }

  function handleClick(_e: React.MouseEvent<HTMLButtonElement>) {
    isRecording ? stopRecording() : startRecording();
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="my-2">
                <FormLabel>Sound Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="my-2">
                <FormLabel>Sound Description (Optional)</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="creator"
            render={({ field }) => (
              <FormItem className="my-2">
                <FormLabel>Sound Creator</FormLabel>
                <Select key={selectKey} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose Creator" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="place:text-blue-400">
                    <SelectItem value="David">David</SelectItem>
                    <SelectItem value="Jeremiah">Jeremiah</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="soundFile"
            render={({ field }) => (
              <FormItem className="my-2">
                <FormLabel>{'Sound File (< 5mb)'}</FormLabel>
                <FormControl className="cursor-pointer">
                  {file ? (
                    <div className="flex items-center justify-between gap-2">
                      <Button
                        className="mx-auto"
                        type="button"
                        onClick={() => setFile(null)}
                      >
                        <Trash />
                      </Button>
                      <div className="flex-1">
                        <audio
                          className="w-[100%]"
                          controls
                          src={URL.createObjectURL(file)}
                        />
                      </div>
                    </div>
                  ) : (
                    <Input
                      className="cursor-pointer data-[placeholder]:text-muted-foreground"
                      type="file"
                      placeholder="Sound File"
                      {...field}
                      onChange={(e) => {
                        if (
                          !e.target?.files?.[0] ||
                          !ACCEPTED_MIME_TYPES.includes(
                            e.target?.files?.[0].type,
                          )
                        ) {
                          setValue('soundFile', '');
                          return;
                        }

                        if (e.target?.files?.[0] !== file) {
                          setFile(e.target?.files?.[0]);
                        }
                      }}
                    />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter className="mt-4 flex flex-col gap-2">
            <Button
              disabled={file !== null}
              onClick={handleClick}
              type="button"
            >
              {isRecording ? <Disc color="red" /> : <Mic />}
            </Button>
            <Button className="lg:w-[80px]" type="submit">
              {isLoading ? <Spinner /> : 'Create'}
            </Button>
          </DialogFooter>
          <p className="text-right text-sm mt-2 font-medium text-destructive">
            {errors.root?.message}
          </p>
        </form>
      </Form>
    </div>
  );
}
