'use client'
import { Header, Sidenav, Title } from '@/app/components'
import { Playlist } from '@/services';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

function UpdateUser({ id }: any) {
  const router = useRouter()
  const [isDrowerOn, setIsDrowerOn] = useState(false)
  const [menu, setMenu] = useState('');
  console.log("id----------", id)
  const [playlist, setPlaylist] = useState<any>([])
  const [loading, setLoading] = useState(false)
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  useEffect(() => {
    getPlaylist()
  }, [])

  const getPlaylist = async () => {
    setLoading(true)
    try {
      const result: any = await Playlist.getAllPlaylist(token)
      console.log(result)
      setPlaylist(result?.data)
    } catch (err: any) {
      if (err.response.data.message === 'Unauthorized') {
        router.push('/auth/signin');
      }
      console.error(err, 'error')
    }
    setLoading(false)
  }
  return (
    <div className="flex bg-gray-200">
      <Sidenav isDrowerOn={isDrowerOn} menu={menu} setMenu={setMenu} />
      <div className='w-full  h-screen overflow-y-scroll'>
        <Header setIsDrowerOn={setIsDrowerOn} isDrowerOn={isDrowerOn} />
        <div className='px-5 py-3'>
          <Title title='Update User' />

          <div className='w-full bg-white rounded-lg p-3'>
            <p className='py-2 px-5 bg-zinc-200 text-gray-600 font-semibold'>Assign playlist</p>
            <div className='flex py-3'>
              {playlist?.map((item: any) => {
                return (
                  <div className='bg-pink-700 mx-2 px-2 py-1 text-white flex'>
                    <p className=''>{item.name}</p>
                    <FaPlus className='mt-1 text-sm mx-1'/>
                    <MdDelete className='mt-1 text-sm mx-1'/>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateUser