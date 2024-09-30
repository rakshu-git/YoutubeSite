import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleMenu } from '../utils/appSlice'
import { YOUTUBE_SEARCH_API } from '../utils/constants'
import { cacheResults } from '../utils/searchSlice'

const Head = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const [suggestions, setSuggestions] = useState([])
    const [showSuggestions, setShowSuggestions] = useState(false)

    const dispatch = useDispatch()

    const searchCache = useSelector((store) => store.search)

    useEffect(() => {
        //if the difference between 2 API calls is <200ms  decline the api call
        const timer = setTimeout(() => {
            if (searchCache[searchQuery]) {
                setSuggestions(searchCache[searchQuery])
            } else {
                getSearchSuggestions()
            }
        }, 200)
        return () => {
            clearTimeout(timer)
        }
    }, [searchQuery])

  
    const getSearchSuggestions = async () => {
        const data = await fetch(YOUTUBE_SEARCH_API + searchQuery)
        const json = await data.json()
        console.log('jsom12',json)
        setSuggestions(json[1])
        dispatch(cacheResults({
            [searchQuery] : json[1]
        }))
    }

    const toggleMenuHandler = () => {
        dispatch(toggleMenu())
    }

    return (
        <div className='grid grid-flow-col pl-3 shadow '>
            <div className='flex  col-span-1'>
                <svg onClick={toggleMenuHandler} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mt-3 cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                <a href='/'>
                    <img className="h-12 mx-2" src="https://cdn.mos.cms.futurecdn.net/8gzcr6RpGStvZFA2qRt4v6.jpg" alt="youtube-logo" />
                </a>
            </div>
            <div className='mt-2 col-span-10 text-center'>
                <div>
                    <input className='px-5 w-1/2 border border-gray-400 rounded-l-lg p-1 ' type='text' placeholder='Search here' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onFocus={() => setShowSuggestions(true)} onBlur={() => setShowSuggestions(false)} />
                    <button className='border border-l-0 border-gray-400 px-2 bg-gray-100 rounded-r-lg p-1'> 🔍</button>
                </div>
                {showSuggestions && <div className='fixed bg-white py-2 px-5 w-[37rem] shadow-lg rounded ml-[273px] border border-gray-100'>
                    <ul>
                        {suggestions.map(s => <li key={s} className='shadow-sm py-2 flex justify-start hover:bg-gray-100'>🔍{s}</li>)}
                    </ul>
                </div>}
            </div>
            <div className='col-span-1'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mt-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>

            </div>

        </div>
    )
}

export default Head