"use client"
import React, { useEffect, useState } from 'react'
import { Button, Header, Sidenav, Title } from '../components'
import { YoutubeApi, Channel } from '@/services';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Snippet } from 'next/font/google';

function ChannelVideos({ id }: any) {
    const router = useRouter()
    const [isDrowerOn, setIsDrowerOn] = useState(false)
    const [menu, setMenu] = useState('');
    const [videos, setVideos] = useState<any>([])
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    useEffect(() => {
        getVideosByChannelId(id)
    }, [id])
    const getVideosByChannelId = async (id: string) => {
        if (id) {
            try {
                const result: any = await YoutubeApi.getVideosByChannelId(id)
                setVideos(result.items)
                console.log("resrserf", result)
            } catch (err) {
                console.error(err, 'errrr-----')
            }
        }
    }
    const addChannel = async () => {
        const data: any = {
            channelId: videos[0]?.snippet?.channelId,
            channelName: videos[0]?.snippet?.channelTitle,
        }
        try {
            const result: any = await Channel.addChannel(token, data)
            if (result?.status == 200) {
                alert("channel added!")
                router.push('/channel/list')
            }
        } catch (err: any) {
            if (err.response.data.message === 'Unauthorized') {
                router.push('/auth/signin');
            } else if (err.response?.status === 400) {
                alert('channel already exist')
            }
            console.error(err, 'error')
        }
    }
    return (
        <div className="flex bg-gray-200">
            <Sidenav isDrowerOn={isDrowerOn} menu={menu} setMenu={setMenu} />
            <div className='w-full h-screen overflow-y-scroll'>
                <Header setIsDrowerOn={setIsDrowerOn} isDrowerOn={isDrowerOn} />
                <div className='px-5 py-3'>
                    <div className='flex justify-between py-4 mx-5'>
                        <Title title={videos?.length > 0 ? videos[0]?.snippet?.channelTitle : ''} />
                        <Button text='Add Channel' functionName={addChannel} />
                    </div>
                    <div className='grid grid-cols-12 bg-white mx-5 mb-5 px-3 rounded shadow-xl'>
                        {videos?.map((item: any) => {
                            return (
                                item?.id?.videoId &&
                                <div className='col-span-3 text-black p-1'>
                                    <Link href={`/video/${item?.id?.videoId}`}>
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
        </div>
    )
}

export default ChannelVideos