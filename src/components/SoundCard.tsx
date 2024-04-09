'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AudioLines, Trash } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from './ui/use-toast';

interface SoundCardProps {
  id: number;
  name: string;
  creator: string;
  description: string | null;
  url: string;
  createdAt: Date;
}

const dateFormatOptions: Intl.DateTimeFormatOptions = {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
};
const timeFormatOptions: Intl.DateTimeFormatOptions = {
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
};

export default function SoundCard({
  id,
  name,
  description,
  creator,
  url,
  createdAt,
}: SoundCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const cleanup = () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('ended', handleAudioEnded);
      }
    };

    return cleanup;
  }, []);

  const playSound = () => {
    if (!audioRef.current) {
      console.log(url);

      audioRef.current = new Audio(url);
      audioRef.current.addEventListener('ended', handleAudioEnded);
    }

    setIsPlaying(true);
    audioRef.current.play();
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const formattedDate = `${createdAt.toLocaleDateString(
    'en-US',
    dateFormatOptions,
  )} at ${createdAt.toLocaleTimeString('en-US', timeFormatOptions)}`;

  async function deleteSound() {
    await fetch(`/api/sounds/${id}`, {
      method: 'DELETE',
    });

    toast({
      title: 'Success!',
      description: 'Sound Deleted',
    });

    router.refresh();
  }

  return (
    <Card className="w-[400px] bg-secondary">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          {description !== ''
            ? `Description: ${description}`
            : 'No Description'}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <Button className="w-[80%]" onClick={playSound}>
          {isPlaying ? (
            <>
              Playing...
              <div className="playing ml-2">
                <span className="playing__bar playing__bar1"></span>
                <span className="playing__bar playing__bar2"></span>
                <span className="playing__bar playing__bar3"></span>
              </div>
            </>
          ) : (
            <>
              Play Sound
              <AudioLines className="ml-2" />
            </>
          )}
        </Button>
      </CardContent>
      <CardFooter className="flex justify-between">
        <CardDescription className="text-xs">
          {`Created by ${creator} at ${formattedDate}`}
        </CardDescription>
        <Button onClick={deleteSound} variant="secondary">
          <Trash />
        </Button>
      </CardFooter>
    </Card>
  );
}
