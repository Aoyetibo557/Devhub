import { useState, useEffect, useMemo } from 'react';

const getApiUrl = {
    org: `https://api.github.com/orgs/`,
}

const useGihubSearch = (search, searchType) => {
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const userLimit = 0;
    const repoLimit = 100;

    const apiUrl = useMemo(() => {
        return search ? `https://api.github.com/orgs/${search}/repos?per_page=${repoLimit}&sort=stars&order=desc` : null
    },[search])

    useEffect(() => {
        if(!apiUrl) {
            setResult([])
            return;
        };
       
        const fetchResult = async () => {
            setLoading(true)
            setError(null)
            try {
            //    const res = await fetch(`https://api.github.com/orgs/${search}/repos?per_page=${repoLimit}&sort=stars&order=desc`)
                const res = await fetch(apiUrl)
                if(!res.ok) {
                    if(res.status === 403) {
                        throw Error('API rate limit exceeded! Try again later')
                    }
                    if(res.status === 404) {
                        throw Error('No result found!')
                    }
                    throw Error('Something went wrong!');
                }             
                const json = await res.json()
                setResult(json)
            }catch(err) {
                setError(err.message)
            }
            setLoading(false)
        }
        fetchResult()
    }, [search])

    return {loading, error, result}
}

export default useGihubSearch;