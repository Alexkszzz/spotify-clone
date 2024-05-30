import React from 'react'
import { FaBookOpen } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';
import useUploadModal from '@/hooks/useUploadModal';

const Library = () => {

    const authModal = useAuthModal()
    const uploadModal = useUploadModal()
    const { user } = useUser()

    const onClick = () => {
        if (!user) {
            return authModal.onOpen()
        }
        // TODO: Check for subscription
        return uploadModal.onOpen()
    }
    return (
        <>
            <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center space-x-3 hover:text-white text-xl font-bold text-neutral-400 cursor-pointer duration-300">
                    <FaBookOpen size={25} />
                    <span>Your Library</span>
                </div>

                <button className="p-3 rounded-full hover:bg-gray-800 duration-200 relative group" onClick={onClick}>
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
            </div>
        </>
    )
}

export default Library
