'use client'
import React, { useEffect, useState } from 'react'
import { Button, Header, Sidenav } from '../components'
import { Playlist, Video, YoutubeApi } from '@/services';
import ReactPlayer from 'react-player';
import './video.css'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function VideoDetails({ id }: any) {
  const router = useRouter()
  const [isDrowerOn, setIsDrowerOn] = useState(false)
  const [menu, setMenu] = useState('');
  const [videoDetails, setVideoDetails] = useState<any>();
  const [relatedVideos, setRelatedVideos] = useState<any>();
  const [playlist, setPlaylist] = useState<any>([])
  const [playlistId, setPlaylistId] = useState('')
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    getVideoDetails(id);
    getRelatedVideos(id);
    getPlaylist()
  }, [id])

  const getVideoDetails = async (id: string) => {
    if (id) {
      try {
        const result: any = await YoutubeApi.getVideoDetails(id)
        setVideoDetails(result.items[0])
      } catch (err) {
        console.error(err, 'errrr-----')
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
  const getPlaylist = async () => {
    try {
      const result: any = await Playlist.getAllPlaylist(token)
      setPlaylist(result?.data)
    } catch (err: any) {
      if (err.response.data.message === 'Unauthorized') {
        router.push('/auth/signin');
      }
      console.error(err, 'error')
    }
  }
  const addVideoToPlaylist = async () => {
    if (playlistId === "") {
      alert('Please Select Playlist')
    } else {
      const data = {
        videoName: videoDetails?.snippet?.title,
        videoDescription: videoDetails?.snippet?.description,
        videoUrl: id,
        playListId: playlistId
      }
      try {
        const resp = await Video.addVideoToPlaylist(token, data)
        alert('video added!')
        console.log("first", resp)

      } catch (err) {
        console.error(err)
      }
    }
  }
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
            {playlist.length > 0 ?
            <div className='flex'>
                <select
                  onChange={(e) => setPlaylistId(e.target.value)}
                  className='focus:outline-none mr-3 bg-white rounded-sm border border-gray-500 text-gray-600'>
                  <option disabled selected>please Select Playlist</option>
                  {playlist.map((item: any, index: number) => {
                    return (
                      <option key={index} value={item._id}>{item.name}</option>
                    )
                  })}
                </select> 
              <Button text='Add Video' functionName={addVideoToPlaylist} />
            </div>
            : <Link href='/playlist/add'><Button text='Create New Playlist' /></Link>}
          </div>
          <div className='grid grid-cols-12'>
            {
              relatedVideos?.map((item: any) => {
                return (
                  item.id.videoId &&
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
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoDetails