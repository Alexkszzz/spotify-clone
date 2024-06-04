import './globals.css';
import { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';
import SupabaseProvider from '@/providers/SupabaseProvider';
import UserProvider from '@/providers/UserProvider';
import ModalProvider from '@/providers/ModalProvider';
import ToasterProvider from '@/providers/ToasterProvider';
import Player from '@/components/Player';
import getSongsByUserId from '@/actions/getSongsByUserId';

export const metadata = {
  title: 'Spotify Clone',
  description: 'A Spotify clone built with Next.js and Tailwind CSS',
};

export const revalidate = 0;
export default async function RootLayout({ children }: { children: ReactNode }) {
  const userSongs = await getSongsByUserId()
  return (
    <html lang="en">
      <body className='bg-black'>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <Sidebar songs={userSongs}>
              {children}
            </Sidebar>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}