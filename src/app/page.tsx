import SearchBar from '@/components/SearchBar';
import { Cedarville_Cursive as FontCursive } from 'next/font/google';

const fontSans = FontCursive({
  subsets: ['latin'],
  weight: '400',
});

export default function Home() {
  return (
    <div className="py-3 px-4">
      <div className="sm:px-6 lg:px-8 py-8 flex flex-col justify-around gap-10">
        <div className="py-4 px-4 mx-auto max-w-screen-xl text-center lg:pt-16 lg:px-12 lg:pb-10">
          <h1 className="mb-12 text-4xl font-bold tracking-tight leading-none  md:text-5xl lg:text-5xl text-primary">
            Browse a Collection of Exquisite Sounds
          </h1>
          <p className="mb-12 text-lg font-normal lg:text-xl sm:px-16 xl:px-48 "></p>
          <SearchBar />
        </div>
      </div>
    </div>
  );
}
