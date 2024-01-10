'use client'
import { Header, Sidenav, Title } from '@/app/components'
import { Playlist } from '@/services';
import React, { useState } from 'react'


function ViewAllPlayList() {
  const [isDrowerOn, setIsDrowerOn] = useState(false)
  const [menu, setMenu] = useState('');
  const [playlist, setPlaylist] = useState<any>([])
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const getPlaylist = async () => {
 
      try {
        const result: any = await Playlist.getAllPlaylist(token)
        console.log(result)
       setPlaylist(result?.data)
      } catch (err: any) {
        console.error(err, 'error')
      }
  }
  console.log("playlist", playlist)
  return (
    <div className="flex bg-gray-200">
      <Sidenav isDrowerOn={isDrowerOn} menu={menu} setMenu={setMenu} />
      <div className='w-full  h-screen overflow-y-scroll'>
        <Header setIsDrowerOn={setIsDrowerOn} isDrowerOn={isDrowerOn} />
        <div className='px-5 py-3 flex justify-between'>
          <Title title='Playlist' />
        </div>
      </div>
    </div>
  )
}
export default ViewAllPlayList