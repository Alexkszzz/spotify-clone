import { FC } from 'react';

export default function Home() {
  return (
    <div className="mt-10">
      <Section title="Popular Artists">
        {/* Popular Artists Content */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Placeholder for popular artists */}
          <ArtistCard name="Artist 1" />
          <ArtistCard name="Artist 2" />
          <ArtistCard name="Artist 3" />
          <ArtistCard name="Artist 4" />
          {/* Add more ArtistCard components as needed */}
        </div>
      </Section>
      <Section title="Popular Albums" className="mt-10">
        {/* Popular Albums Content */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Placeholder for popular albums */}
          <AlbumCard title="Album 1" />
          <AlbumCard title="Album 2" />
          <AlbumCard title="Album 3" />
          <AlbumCard title="Album 4" />
          {/* Add more AlbumCard components as needed */}
        </div>
      </Section>
    </div>
  );
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const Section: FC<SectionProps> = ({ title, children, className }) => {
  return (
    <section className={className}>
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      {children}
    </section>
  );
};

interface ArtistCardProps {
  name: string;
}

const ArtistCard: FC<ArtistCardProps> = ({ name }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg text-center">
      <div className="bg-gray-600 h-24 w-24 mx-auto mb-2 rounded-full"></div>
      <h3 className="text-lg font-semibold">{name}</h3>
    </div>
  );
};

interface AlbumCardProps {
  title: string;
}

const AlbumCard: FC<AlbumCardProps> = ({ title }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg text-center">
      <div className="bg-gray-600 h-24 w-24 mx-auto mb-2 rounded-lg"></div>
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
  );
};