'use client'
import { Button, Header, Sidenav, Title } from '@/app/components'
import { Video } from '@/services';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player';
import './video.css'


function ViewPlayListById({ id }: any) {
  const router = useRouter()
  const [isDrowerOn, setIsDrowerOn] = useState(false)
  const [menu, setMenu] = useState('');
  const [videos, setVideos] = useState<any>()
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  useEffect(() => {
    getVideosByPlaylist(id)
  }, [id])
  console.log("id", id)
  const getVideosByPlaylist = async (id: string) => {
    try {
      const result: any = await Video.getVideosByPlaylist(token, id)
      console.log("re", result)
      setVideos(result?.data?.video)
    } catch (err: any) {
      if (err.response.data.message === 'Unauthorized') {
        router.push('/auth/signin');
      }
      console.error(err, 'error')
    }
  }
  const deleteVideo = async (videoId: string) => {
    try {
      const result: any = await Video.deleteVideo(token, videoId, id)
      const newArray = videos.filter((item: any) => item._id !== videoId);
      setVideos(newArray)
      console.log(newArray);
      alert('video Deleted..!')
    } catch (err: any) {
      if (err.response.data.message === 'Unauthorized') {
        router.push('/auth/signin');
      }
      console.error(err, 'error')
    }
  }
  return (
    <div className="flex bg-gray-200">
      <Sidenav isDrowerOn={isDrowerOn} menu={menu} setMenu={setMenu} />
      <div className='w-full  h-screen overflow-y-scroll'>
        <Header setIsDrowerOn={setIsDrowerOn} isDrowerOn={isDrowerOn} />
        <div className='px-5 py-3 flex justify-between'>
          <Title title='View Playlist' />

        </div>
        <div className='bg-white mx-5 my-5 py-3 px-3 rounded shadow-xl'>
          {videos?.map((item: any) => {
            return (
              <div className='my-5 border border-gray-500 p-2'>
                <ReactPlayer
                  url={item?.videoUrl}
                  className="react-player"
                  controls
                />
                <p className='text-gray-600 px-2'>{item.videoName}</p>
                <div className='flex justify-between py-2'>
                  <div className='flex'>
                    <Button text='Move Up' />
                    <div className='pl-5'>
                      <Button text='Move Down' />
                    </div>
                  </div>
                  <Button text='Delete' functionName={() => deleteVideo(item._id)} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
export default ViewPlayListById