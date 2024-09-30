import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { closeMenu } from '../utils/appSlice'
import { useParams, useSearchParams } from 'react-router-dom'
import CommentsContainer from './CommentsContainer'
import LiveChat from './LiveChat'


const WatchPage = () => {
    const [searchParams] = useSearchParams()
    const dispatch = useDispatch()

    const params = useParams()

    useEffect(() => {
        dispatch(closeMenu())
    }, [])

    return (
        <div className='flex flex-col w-full'>
        <div className='px-5 flex w-full'>
            <div className=''>
            <iframe
                width="1100"
                height="600"
                src={`https://www.youtube.com/embed/${searchParams.get("v")}`}
                title="11 Free Windows 11 Apps You Must Try in 2024!"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen>
            </iframe>
            </div>
            <div className='w-full'>
<LiveChat/>
            </div>
           
        </div>
        <CommentsContainer/>
        </div>
    )
}

export default WatchPage