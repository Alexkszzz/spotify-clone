import React from 'react'
import * as Dialog from "@radix-ui/react-dialog"
import { IoMdClose } from 'react-icons/io'

interface ModalProps {
    isOpen: boolean;
    onChange: (open: boolean) => void;
    title: string;
    description: string;
    children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onChange,
    title,
    description,
    children
}) => {
    return (
        <Dialog.Root
            open={isOpen}
            defaultOpen={isOpen}
            onOpenChange={onChange}
        >
            <Dialog.Portal>
                <Dialog.Overlay className="
                    bg-neutral-900/90
                    backdrop-blur-sm
                    inset-0
                    fixed
                "/>
                <Dialog.Content className='
                    fixed
                    border
                    border-neutral-700
                    top-[50%]
                    left-[50%]
                    h-full
                    max-h-full
                    md:h-auto
                    md:max-h-[85vh]
                    w-full
                    md:w-[90vw]
                    md:max-w-[450px]
                    translate-x-[-50%]
                    translate-y-[-50%]
                    p-[25px]
                    bg-neutral-800
                    rounded-md  
                '>
                    <Dialog.Title className='
                        text-xl
                        text-bold
                        text-center
                        mb-4
                        text-white
                    '>
                        {title}
                    </Dialog.Title>
                    <Dialog.Description className='
                        text-white
                        mb-4
                        text-center
                    '>
                        {description}
                    </Dialog.Description>
                    <div>
                        {children}
                    </div>
                    <Dialog.Close asChild className='
                        text-neutral-400
                        hover:text-white
                        absolute
                        top-[10px]
                        right-[10px]
                    '>
                        <button><IoMdClose size={20} /></button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>

        </Dialog.Root>
    )
}

export default Modal;