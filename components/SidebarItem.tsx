import React from 'react'
import { IconType } from 'react-icons'
import { twMerge } from 'tailwind-merge'
import Link from 'next/link'

interface SidebarItemProps {
    icon: IconType,
    label: string,
    active?: boolean,
    href: string,
}

const SidebarItem: React.FC<SidebarItemProps> = ({
    icon: Icon,
    label,
    active,
    href
}) => {
    return (
        <Link
            href={href}
            className={twMerge(`
                flex
                flex-row
                h-auto
                items-center
                text-md
                font-md
                cursor-pointer
                text-neutral-400
                hover:text-white
                duration-300
                py-3
            `, active && "text-white"

            )}
        >
            <Icon size={25} />
            <p className='
                mx-5
                font-bold
                text-lg
            '>{label}</p>
        </Link>
    )
}

export default SidebarItem