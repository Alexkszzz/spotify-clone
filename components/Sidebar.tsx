"use client"

import SidebarItem from './SidebarItem';
import Library from './Library';
import Link from 'next/link';
import { IoHome } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { Song } from '@/types';

interface SidebarProps {
    children: React.ReactNode;
    songs: Song[]
}

const Sidebar: React.FC<SidebarProps> = ({ children, songs }) => {
    const pathname = usePathname();
    const routes = useMemo(() => [
        {
            icon: IoHome,
            label: 'Home',
            active: pathname !== "/search",
            href: '/'
        },
        {
            icon: FiSearch,
            label: 'Search',
            active: pathname === "/search",
            href: '/search'
        }
    ], [pathname])

    return (
        <div className='flex h-full'>
            <div className="hidden md:flex text-gray-100 w-custom flex-col gap-y-2 mt-2 h-screen">
                <div className="bg-neutral-900 rounded-md p-5 mx-2">
                    <h1 className="text-2xl font-bold mb-5">Spityfot</h1>
                    <div className='
                    flex
                    flex-col
                    my-2
                '>
                        {routes.map((item) => (
                            <SidebarItem
                                key={item.label}
                                {...item}
                            />
                        ))}
                    </div>
                </div>
                <div className="bg-neutral-900 rounded-md p-5 mx-2 mb-2 h-full overflow-y-auto">
                    <Library songs={songs} />
                </div>
            </div >
            <main className='h-screen flex-1 py-2'>
                {children}
            </main>
        </div >
    );
};

export default Sidebar;