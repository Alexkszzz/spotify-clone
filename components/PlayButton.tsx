"use client"
import React from 'react'
import { FaPlay } from 'react-icons/fa'

const PlayButton = () => {
    return (
        <button className='
            transition
            opacity-0
            bg-green-500
            flex
            items-center
            translate
            drop-shadow-md
            translate-y-1/4
            group-hover:opacity-100
            group-hover:translate-y-0
            hover:scale-110
            rounded-full
            p-3
        '>
            <FaPlay />
        </button>
    )
}

export default PlayButton