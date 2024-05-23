import './globals.css';
import { ReactNode } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

export const metadata = {
  title: 'Spotify Clone',
  description: 'A Spotify clone built with Next.js and Tailwind CSS',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 bg-gray-800 text-gray-100 p-10">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}