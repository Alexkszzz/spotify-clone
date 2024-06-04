"use client"

import { Song } from '@/types'
import React, { useEffect, useState } from 'react'
import MediaItem from './MediaItem'
import LikeButton from './LikeButton';
import { BsPauseFill, BsPlayFill } from 'react-icons/bs';
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai';
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2';
import Slider from './Slider';
import usePlayer from '@/hooks/usePlayer';
import useSound from 'use-sound'

interface PlayerContentProps {
    song: Song;
    songUrl: string
}

const PlayerContent: React.FC<PlayerContentProps> = ({
    song,
    songUrl
}) => {
    const player = usePlayer();
    const [volume, setVolume] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false)
    const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave
    const Icon = true ? BsPauseFill : BsPlayFill

    const onPlayNext = () => {
        if (player.ids.length === 0) {
            return
        }
        const currentIndex = player.ids.findIndex((id) => id === player.activeId)
        const nextSong = player.ids[currentIndex + 1]
        if (!nextSong) {
            return player.setId(player.ids[0])
        }
        player.setId(nextSong)
    }

    const onPlayPrev = () => {
        if (player.ids.length === 0) {
            return
        }
        const currentIndex = player.ids.findIndex((id) => id === player.activeId)
        const prevSong = player.ids[currentIndex - 1]
        if (!prevSong) {
            return player.setId(player.ids[player.ids.length - 1])
        }
        player.setId(prevSong)
    }

    const [play, { pause, sound }] = useSound(songUrl, {
        volume: volume,
        onPlay: () => setIsPlaying(true),
        onend: () => {
            setIsPlaying(false)
            onPlayNext()
        },
        onpause: () => setIsPlaying(false),
        format: ['mp3']
    })
    useEffect(() => {
        sound?.play()
    }, [sound])

    const handlePlay = () => {
        if (!isPlaying) {
            play()
        }
        else {
            pause()
        }
    }

    const toggleMute = () => {
        if (volume === 0) {
            setVolume(1)
        }
        else {
            setVolume(0)
        }
    }

    return (
        <div className='grid grid-cols md:grid-cols-3 h-full'>
            <div className='flex w-full justify-start'>
                <div className='flex items-center gap-x-4'>
                    <MediaItem data={song} />
                    <LikeButton songId={song.id} />
                </div>
            </div>
            <div className='md:hidden flex col-auto w-full justify-end items-center'>
                <div onClick={handlePlay} className='
                    h-10
                    w-10
                    flex
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    p-1
                    cursor-pointer
                '>
                    <Icon size={30} className='text-black' />
                </div>

            </div>
            <div className='hidden h-full md:flex justify-center items-center max-w-[722px] w-full gap-x-6'>
                <AiFillStepBackward onClick={onPlayPrev} size={30} className='text-neutral-400 cursor-pointer hover:text-white transition' />
                <div onClick={handlePlay} className='
                    flex
                    items-center
                    justify-center
                    w-10
                    h-10
                    rounded-full
                    bg-white
                    p-1
                    cursor-pointer
                '>
                    <Icon size={30} className='text-black' />
                </div>
                <AiFillStepForward onClick={onPlayNext} size={30} className='text-neutral-400 cursor-pointer hover:text-white transition' />
            </div>
            <div className='hidden md:flex w-full justify-end p-2'>
                <div className='flex items-center gap-x-2 w-[120px] text-white'>
                    <VolumeIcon
                        onClick={toggleMute}
                        className='cursor-pointer'
                        size={30}
                    />
                    <Slider value={volume} onChange={(value) => setVolume(value)} />
                </div>
            </div>
        </div>
    )
}

export default PlayerContent