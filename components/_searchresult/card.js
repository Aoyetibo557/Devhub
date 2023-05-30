import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { GoLinkExternal } from 'react-icons/go'

export const StatsCard = (user) => {
    return (
        <Link target="_blank" href={user.html_url} className={`flex flex-row items-center justify-between p-2 bg-neutral-800 border-[1px]  rounded-md shadow-sm w-64 m-5 hover:border-none text-white hover:scale-110 transition-ease-in-out duration-200
        `}>
            <div>
                <img src={`${user.avatar_url}`} className={`w-12 h-12 rounded-full `} />
            </div>
                <div className={`text-base font-normal font-sans`}>
                    {user.login}
                </div>

                <GoLinkExternal className={`w-5 h-4`} />
        </Link>
    )
}