"use client"

import useLoadImage from '@/hooks/useLoadImage'
import { Song } from '@/types'
import React from 'react'
import Image from 'next/image'
import PlayButton from './PlayButton'

interface SongItemProps {
    data: Song;
    onClick: (id: string) => void
}

const SongItem: React.FC<SongItemProps> = ({
    data,
    onClick
}) => {
    const imagePath = useLoadImage(data)
    return (
        <div
            onClick={() => onClick(data.id)}
            className='
                relative 
                group
                flex
                flex-col
                items-center
                justify-center
                rounded-md
                overflow-hidden
                gap-x-6
                bg-neutral-400/5
                cursor-pointer
                hover:bg-neutral-400/10
                transition
                p-3
            '
        >
            <div className='
                relative
                aspect-square
                w-full
                h-full
                rounded-md
                overflow-hidden
            '>
                <Image
                    className="object-cover"
                    src={imagePath || ""}
                    fill
                    alt="Image"
                />
            </div>
            <div className='flex flex-col items-start w-full mt-3 gap-y-2'>
                <p className='text-md font-semibold'>{data.title}</p>
                <p className='text-md text-neutral-400'>By {data.author}</p>
            </div>
            <div className='absolute bottom-5 right-5'>
                <PlayButton />
            </div>

        </div>
    )
}

export default SongItem