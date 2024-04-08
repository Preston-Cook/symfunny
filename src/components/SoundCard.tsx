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
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface SoundCardProps {
  id: number;
  name: string;
  creator: string;
  description: string | null;
  url: string;
  createdAt: Date;
}

export default function SoundCard({
  id,
  name,
  description,
  creator,
  url,
  createdAt,
}: SoundCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== 'undefined' ? new Audio(url) : undefined,
  );
  const router = useRouter();

  const playSound = () => {
    // Access the audio object from the useRef
    const audio = audioRef.current;
    // Reset audio playback to the beginning
    if (audio) {
      audio.currentTime = 0;
      audio.play();
      setIsPlaying(true);
      audio.addEventListener('ended', () => {
        setIsPlaying(false);
      });
    }
  };

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

  // Convert date to "month day, year at hour:minute" format
  const formattedDate = `${createdAt.toLocaleDateString(
    'en-US',
    dateFormatOptions,
  )} at ${createdAt.toLocaleTimeString('en-US', timeFormatOptions)}`;

  async function deleteSound() {
    await fetch(`/api/sounds/${id}`, {
      method: 'DELETE',
    });

    router.refresh();
  }

  return (
    <Card className="w-[400px] bg-secondary">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          {description !== null
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
        <CardDescription>
          {`Created by ${creator} at ${formattedDate}`}
        </CardDescription>
        <Button onClick={deleteSound} variant="secondary">
          <Trash />
        </Button>
      </CardFooter>
    </Card>
  );
}
