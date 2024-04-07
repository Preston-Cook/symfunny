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

const ACCEPTED_MIME_TYPES = [
  'audio/wav',
  'audio/mpeg',
  'audio/webm',
  'video/webm',
];

export default function CreateForm() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { startRecording, stopRecording, isRecording, recordingBlob } =
    useAudioRecorder();

  const form = useForm<z.infer<typeof createSoundSchemaClient>>({
    resolver: zodResolver(createSoundSchemaClient),
    defaultValues: {
      name: undefined,
      creator: undefined,
      soundFile: undefined,
    },
  });

  const {
    handleSubmit,
    setValue,
    setError,
    reset,
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

    const { name, creator } = values;
    const url = signedUrl.split('?')[0];
    console.log(url);

    // post remaining data to server
    const res3 = await fetch('/api/sounds', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
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
    reset();

    setIsLoading(false);
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
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
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
                <FormLabel>Creator</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
                <FormLabel>Sound File</FormLabel>
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
            <Button className="w-[80px]" type="submit">
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
