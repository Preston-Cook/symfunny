import Content from '@/components/Content';
import prisma from '@/lib/db';

export default async function Home() {
  const sounds = await prisma.sound.findMany();

  return (
    <div className="py-3 px-4">
      <Content sounds={sounds} />
    </div>
  );
}
