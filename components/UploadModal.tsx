import React, { useState } from 'react'
import uniqid from "uniqid"
import Modal from './Modal'
import useUploadModal from '@/hooks/useUploadModal'
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'
import Input from './Input'
import toast from 'react-hot-toast'
import { useUser } from '@/hooks/useUser'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'

const UploadModal = () => {
    const uploadModal = useUploadModal()
    const [isLoading, setIsLoading] = useState(false)
    const { user } = useUser()
    const supabaseClient = useSupabaseClient()
    const router = useRouter()

    const {
        register,
        handleSubmit,
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            author: '',
            title: '',
            song: null,
            image: null
        }
    })
    const onChange = (open: boolean) => {
        if (!open) {
            reset()
            uploadModal.onClose()
        }
    }

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        //upload to Supabase
        try {
            setIsLoading(true)
            const imageFile = values.image?.[0];
            const songFile = values.song?.[0];
            if (!imageFile || !songFile || !user) {
                toast.error("missing fields")
                return
            }
            const uniqueId = uniqid();

            //Upload song
            const {
                data: songData,
                error: songError
            } = await supabaseClient.storage.from('songs').upload(`song-${values.title}-${uniqueId}`, songFile, {
                cacheControl: '3600',
                upsert: false
            })
            if (songError) {
                setIsLoading(false)
                toast.error("Song upload FAILED!")
            }

            //Upload image
            const {
                data: imageData,
                error: imageError
            } = await supabaseClient.storage.from('images').upload(`image-${values.title}-${uniqueId}`, imageFile, {
                cacheControl: '3600',
                upsert: false
            })
            if (imageError) {
                setIsLoading(false)
                toast.error("Image upload FAILED!")
            }

            const {
                error: supabaseError
            } = await supabaseClient.from('Songs').insert({
                user_id: user.id,
                title: values.title,
                author: values.author,
                image_path: imageData?.path,
                song_path: songData?.path
            })
            if (supabaseError) {
                setIsLoading(false)
                return toast.error(supabaseError.message)
            }
            setIsLoading(false)
            console.log('disabled is false')
            router.refresh()
            toast.success("Song is successfully uploaded")
            reset()
            uploadModal.onClose()
        }
        catch (error) {
            toast.error("Something went wrong")
        }
        finally {
            setIsLoading(false)
        }
    }

    return (
        <Modal
            title="Add a song to your library"
            description='Upload an mp3 file'
            isOpen={uploadModal.isOpen}
            onChange={onChange}
        >
            <form onSubmit={handleSubmit(onSubmit)} className='
                flex
                flex-col
                gap-3
            '>
                <Input
                    id="title"
                    disabled={isLoading}
                    {...register('title', { required: true })}
                    placeholder="Song Title"
                />
                <Input
                    id="author"
                    disabled={isLoading}
                    {...register('author', { required: true })}
                    placeholder="Song Author"
                />
                <div>
                    <div className='pb-2 text-md text-white'>
                        Select a song file
                    </div>
                    <Input
                        id="song"
                        type='file'
                        disabled={isLoading}
                        accept='.mp3'
                        {...register('song', { required: true })}
                    />
                </div>
                <div>
                    <div className='pb-2 text-md text-white'>
                        Select an image
                    </div>
                    <Input
                        id="image"
                        type='file'
                        disabled={isLoading}
                        accept='image/*'
                        {...register('image', { required: true })}
                    />
                </div>
                <button disabled={isLoading} type='submit' className='bg-green-500 py-3 rounded-full text-medium font-bold hover:bg-green-600 duration-300'>
                    Create
                </button>
            </form>
        </Modal>
    )
}

export default UploadModal