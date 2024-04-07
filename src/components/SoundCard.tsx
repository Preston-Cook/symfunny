import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AudioLines } from 'lucide-react';
import { useState, useEffect } from 'react';

interface SoundCardProps {
  id: number;
  name: string;
  creator: string;
  description: string | null;
  url: string;
  createdAt: Date;
}

export default function SoundCard({
  name,
  description,
  creator,
  url,
  createdAt,
}: SoundCardProps) {
  const [audio] = useState(new Audio(url));

  useEffect(() => {
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio]);

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

  console.log(description);

  // Convert date to "month day, year at hour:minute" format
  const formattedDate = `${createdAt.toLocaleDateString(
    'en-US',
    dateFormatOptions,
  )} at ${createdAt.toLocaleTimeString('en-US', timeFormatOptions)}`;

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
        <Button
          className="w-[80%]"
          onClick={() => audio.play()}
          disabled={audio.duration > 0 && !audio.paused}
        >
          Play Sound <AudioLines className="ml-2" />
        </Button>
      </CardContent>
      <CardFooter className="flex justify-between">
        <CardDescription>
          {`Created by ${creator} at ${formattedDate}`}
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
