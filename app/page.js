'use client'
import React, { useState } from "react"
import Header from "../components/_header/header"
import { SearchBar } from "../components/_searchbar/searchbar"
import useGihubSearch from "../lib/hooks/useGihubSearch"
import { StatsCard } from "../components/_searchresult/card"
import SearchResultList from "../components/_searchresult/searchlist";


export default function Home() {
  const [search, setSearch] = useState('')
  const { loading, error, result: searchResult } = useGihubSearch(search)

  const handleSearch = (search) => {
    setSearch(search)    
  }


  return (
    <main className="px-10 mt-10">
      <div>
        <Header />
      </div>
      <div className={`p-4 lg:p-32`}>
        <div className={` flex flex-col items-center text-center `}>
          <div className={` flex flex-col font-sans font-bold text-3xl lg:text-6xl`}>{`
              Discover GitHub repositories like never before 
              and explore the world of open source`}
          </div>
          <div className={`font-medium md:text-[22px] text-gray-600 mt-7`}>{`
            Search, explore, and stay connected with the 
            world's largest community of developers `}
          </div>
        </div>

        <div className={`p-4`}>
          <SearchBar onSearch={handleSearch} />
        </div>

        <div>
          {search.length > 0 && error && <div className={`text-center text-base text-blue-800 font-bold`}>{error}</div>}
          
          <div className={`flex flex-row flex-wrap`}>
            <SearchResultList  result={searchResult} isLoading={loading} />
          </div>
        </div>

      
      </div>
     
    </main>
  )
}
