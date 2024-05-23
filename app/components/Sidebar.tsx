import Link from 'next/link';
import { IoHome } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { FaBookOpen } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";

const Sidebar = () => {
    return (
        <div className="bg-black text-gray-100 w-custom flex flex-col h-screen p-2">
            <div className="bg-gray-900 rounded-md p-5 m-1">
                <h1 className="text-2xl font-bold mb-5">Spityfot</h1>
                <nav>
                    <ul>
                        <li className="mb-3">
                            <Link legacyBehavior href="/">
                                <a className="flex items-center space-x-3 hover:text-white text-xl font-bold">
                                    <IoHome />
                                    <span>Home</span>
                                </a>
                            </Link>
                        </li>
                        <li className="mb-3">
                            <Link legacyBehavior href="/search">
                                <a className="flex items-center space-x-3 hover:text-white text-xl font-bold">
                                    <FiSearch />
                                    <span>Search</span>
                                </a>
                            </Link>
                        </li>

                    </ul>
                </nav>
            </div>
            <div className="bg-gray-900 rounded-md p-5 m-1 flex-1">
                <ul>
                    <li className="mb-3 flex items-center justify-between">
                        <Link legacyBehavior href="/library">
                            <a className="flex items-center space-x-3 hover:text-white text-xl font-bold">
                                <FaBookOpen />
                                <span>Your Library</span>
                            </a>
                        </Link>
                        <button className="p-3 rounded-full hover:bg-gray-800 relative group">
                            <FaPlus />
                            <span className="absolute left-full ml-2 whitespace-nowrap px-2 py-1 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                Create playlist or folder
                            </span>
                        </button>
                    </li>
                </ul>
            </div>


        </div >
    );
};

export default Sidebar;