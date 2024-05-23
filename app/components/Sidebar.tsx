"use client"

import SidebarItem from './SidebarItem';
import Library from './Library';
import Link from 'next/link';
import { IoHome } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

interface SidebarProps {
    children: React.ReactNode
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
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
        <div className="bg-black text-gray-100 w-custom flex flex-col h-screen p-2">
            <div className="bg-gray-900 rounded-md p-5 m-1">
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
            <div className="bg-gray-900 rounded-md p-5 m-1 flex-1">
                <Library />
                {/* <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center space-x-3 hover:text-white text-xl font-bold">
                        <FaBookOpen />
                        <span>Your Library</span>
                    </div>

                    <button className="p-3 rounded-full hover:bg-gray-800 relative group">
                        <FaPlus />
                        <span className="absolute left-full ml-2 whitespace-nowrap px-2 py-1 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Create playlist or folder
                        </span>
                    </button>
                </div>
                <div className='
                    flex
                    flex-col
                    gap-y-2
                    mt-4
                    px-3
                '>
                    List of Songs!
                </div> */}
            </div>


        </div >
    );
};

export default Sidebar;