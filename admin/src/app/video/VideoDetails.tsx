'use client'
import React, { useEffect, useState } from 'react'
import { Button, Header, Sidenav } from '../components'
import { YoutubeApi } from '@/services';
import ReactPlayer from 'react-player';
import './video.css'
import Link from 'next/link';
function VideoDetails() {
  const [isDrowerOn, setIsDrowerOn] = useState(false)
  const [menu, setMenu] = useState('');
  const [id, setId] = useState('');
  const [videoDetails, setVideoDetails] = useState<any>();
  const [relatedVideos, setRelatedVideos] = useState<any>();
  const [newRoute, setNewRoute] = useState(0)
  useEffect(() => {
    const id: string = typeof window !== 'undefined' ? window.location.search?.split('=')[1] : '';
    setId(id)
  }, [newRoute])

  useEffect(() => {
    getVideoDetails(id);
    getRelatedVideos(id);
  }, [id])

  const getVideoDetails = async (id: string) => {
    if (id) {
      try {
        const result: any = await YoutubeApi.getVideoDetails(id)
        setVideoDetails(result.items[0])
      } catch (err) {
        console.log(err, 'errrr-----')
      }
    }

  }
  const getRelatedVideos = async (id: string) => {
    if (id) {
      try {
        const result: any = await YoutubeApi.getRelatedVideos(id)
        setRelatedVideos(result.items)
      } catch (err) {
        console.log(err, 'errrr-----')
      }
    }
  }
  console.log(videoDetails, '--s-')
  return (
    <div className="flex bg-gray-200">
      <Sidenav isDrowerOn={isDrowerOn} menu={menu} setMenu={setMenu} />
      <div className='w-full h-screen overflow-y-scroll'>
        <Header setIsDrowerOn={setIsDrowerOn} isDrowerOn={isDrowerOn} />
        <div className='px-5 py-3'>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${id}`}
            className="react-player"
            controls
          />
          <div className='p-2 my-2 border border-gray-600 w-full flex justify-between'>
            <div className='text-gray-600'>
              <p className='text-sm font-semibold'>{videoDetails?.snippet?.title}</p>
              <p className='text-xs font-semibold'>{videoDetails?.snippet?.channelTitle}</p>
            </div>
            <div className=''>
              <Button text='Add Video' />
            </div>
          </div>
          <div className='grid grid-cols-12'>
            {
              relatedVideos?.map((item: any) => {
                return (
                  item.id.videoId &&
                  <div className='col-span-3 text-black p-1'>
                    <Link href={`video?id=${item?.id?.videoId}`} onClick={() => setNewRoute(newRoute + 1)}>
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
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoDetails