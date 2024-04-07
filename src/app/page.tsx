import Content from '@/components/Content';
import SearchBar from '@/components/SearchBar';
import SoundCard from '@/components/SoundCard';
import prisma from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

export default async function Home() {
  const sounds = await prisma.sound.findMany();

  return (
    <div className="py-3 px-4">
      <Content sounds={sounds} />
    </div>
  );
}
