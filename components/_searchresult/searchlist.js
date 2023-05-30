import React from 'react'
import { StatsCard } from './card';
import { RepoCard } from './repocard'; 
import { Spin } from 'antd';


const SearchResultList = ({result, isLoading}) => {
    const [showMore, setShowMore] = React.useState(false)
    const [showMoreRepo, setShowMoreRepo] = React.useState(false)
    const [resultLimit, setResultLimit] = React.useState(10)


    return isLoading ? (
        <div className={`w-full flex flex-row justify-center mt-10 gap-3  flex-wrap`}>
            <Spin size="large" />
            {isLoading === false && result.length === 0 && (
                <div className={`text-center text-base text-gray-800 font-ight`}>No result found!</div>
            )}
        </div>
    ): (
        <div className={`flex flex-row flex-wrap`}>
            {/* {resultType === 'user' && result?.map((item) => (
                <StatsCard key={item.id} {...item} />
            ))} */}
            { result?.map((item) => (
                <RepoCard key={item.id} {...item} />
            ))}
        </div>
    )
}

export default SearchResultList