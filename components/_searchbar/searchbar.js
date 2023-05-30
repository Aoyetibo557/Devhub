'use client'
import React, { useState, useEffect } from 'react'
import { useDebounce } from '../../lib/hooks/useDebounce'

export const SearchBar = ({ onSearch }) => {
    const [search, setSearch] = useState('')

    const debouncedSearchTerm = useDebounce(search, 400);

    const handleInputChange = (e) => {
        setSearch(e.target.value)
    }


 
    useEffect(() => {
        onSearch(debouncedSearchTerm) 
    }, [debouncedSearchTerm, search ])

    return (
        <div className={`flex flex-col items-center lg:flex-row justify-center gap-3`}>
           
            <input 
                className={`border-[1px] border-gray-300 rounded-full text-base p-2 w-52 lg:w-96 focus-within:outline-blue-300 `}
                placeholder={`Search GitHub profiles by username, repos...`}
                value={search}
                onChange={handleInputChange}
            />

            <button className={`bg-blue-300 w-32 rounded-full p-2 ml-2 flex flex-row items-center justify-center 
                hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2
            `}>
                <svg className={`w-6 h-6`} viewBox="0 0 16 16" version="1.1" aria-hidden="true">
                    <path fillRule="evenodd" 
                        d="M10.5 8a2.5 2.5 0 11-5 0 2.5 2.5
                        0 015 0zm2.47 5.53a1 1 0 01-1.414
                        1.414l-3.182-3.182a4.5 4.5 0 111.414-1.414l3.182
                        3.182z">
                    </path>
                </svg> 
                <span className={`font-medium  `}>
                    Search
                </span>
            </button>

        </div>
    )
}
