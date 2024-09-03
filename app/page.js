'use client'
import React, { useState, useEffect } from "react"
import Header from "../components/_header/header"
import { SearchBar } from "../components/_searchbar/searchbar"
import useGitHubSearch from "../lib/hooks/useGitHubSearch"
import { StatsCard } from "../components/_searchresult/card"
import SearchResultList from "../components/_searchresult/searchlist";
import { Filter } from "../components/Utility/filter";


export default function Home() {
  const [search, setSearch] = useState('')
  const { loading, error, result: searchResult } = useGitHubSearch(search)
  const [selectedFilters, setSelectedFilters] = useState(null)

  const handleSearch = (search) => {
    setSearch(search)    
  }


  const uniqueLanguages = searchResult
        .map(repo => repo.language)
        .filter((language, index, self) => 
          language != null && self.indexOf(language) === index
        )
        .sort();

  const handleApplyFilter = (filters) => {
    setSelectedFilters(filters);
  }

  useEffect(() => {
    setSelectedFilters(null)
  },[searchResult])

  return (
    <main className="px-10 mt-10">
      <div>
        <Header />
      </div>
      <div className={`flex flex-col p-4 lg:p-32`}>
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

        <div className={`flex items-center gap-4 justify-center p-4`}>
          <SearchBar onSearch={handleSearch} />
          <Filter languages={uniqueLanguages} onFilterApply={handleApplyFilter} />
        </div>

        <div>
          {search.length > 0 && error && <div className={`text-center text-base text-black font-medium`}>{error}</div>}
          
          <div className={`flex flex-row flex-wrap`}>
            <SearchResultList  result={searchResult} filters={selectedFilters} isLoading={loading} />
          </div>
        </div>

      
      </div>
     
    </main>
  )
}
