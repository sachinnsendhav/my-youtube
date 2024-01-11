"use client"
import { useEffect, useState } from 'react'
import { Header, Title } from './index'
import Sidenav from './Sidenav'
import { FaSearch } from 'react-icons/fa'
import { YoutubeApi } from '@/services'
import Link from 'next/link'

function Dashboard() {
    const [isDrowerOn, setIsDrowerOn] = useState(false)
    const [menu, setMenu] = useState('');
    const [videos, setVideos] = useState<any>();
    const [searchTaxt, setSearchText] = useState('cartoon')
    useEffect(() => {
        searchVideos()
    }, [])

    const searchVideos = async () => {
        try {
            const result: any = await YoutubeApi.getVideosBySearch(searchTaxt ? searchTaxt : 'cartoon')
            setVideos(result.items)
            console.log(result)
        } catch (err) {
            console.log(err, 'errrr-----')
        }
    }
    console.log(videos)
    return (
        <div className="flex bg-gray-200">
            <Sidenav isDrowerOn={isDrowerOn} menu={menu} setMenu={setMenu} />
            <div className='w-full  h-screen overflow-y-scroll'>
                <Header setIsDrowerOn={setIsDrowerOn} isDrowerOn={isDrowerOn} />
                <div className='px-5 py-3 flex justify-between'>
                    <Title title='Dashboard' />
                    <div className='flex border border-gray-300 rounded-xl'>
                        <input onChange={(e) => setSearchText(e.target.value)} type='text' placeholder='Search here...' className='text-gray-500 text-md py-1 px-2 rounded-l-xl focus:outline-none' />
                        <FaSearch className="mx-2 mt-2 text-gray-800 cursor-pointer" onClick={() => searchVideos()} />
                    </div>
                </div>
                <div className='grid grid-cols-12 bg-white mx-5 mb-5 px-3 rounded shadow-xl'>
                    {videos?.map((item: any) => {
                        return (
                            item?.id?.videoId &&
                            <div className='col-span-3 text-black p-1'>
                                <Link href={`video?id=${item?.id?.videoId}`}>
                                    <div className='border border-gray-200'>
                                        <img src={item?.snippet?.thumbnails?.medium?.url} className='w-full h-28 object-cover' />
                                        <div className='py-1 px-2'>
                                            <p className='line-clamp-2 text-xs text-gray-500'>{item?.snippet?.title}</p>
                                            <p className='line-clamp-1 text-sm text-gray-700'>{item?.snippet?.channelTitle}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Dashboard