'use client'
import { Button, Header, Sidenav, Title } from '@/app/components'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Playlist } from '@/services'
function AddPlayList() {
  const router = useRouter()
  const [isDrowerOn, setIsDrowerOn] = useState(false)
  const [menu, setMenu] = useState('');
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState<any>({});
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const validateForm = () => {
    const error: any = {};
    if (name === "") {
      error.name = "Please enter Playlist name";
    }
    if (description === "") {
      error.description = "Please enter Playlist description";
    }
    setErrors(error);
    return Object.keys(error).length === 0;
  };

  const createPlayList = async () => {
    if (validateForm()) {
      const data: any = {
        name: name,
        description: description
      }
      try {
        const result: any = await Playlist.createPlaylist(token, data)
        if (result?.status === 200) {
          alert(result?.message)
          router.push('/playlist/list')
        }
      } catch (err: any) {
        console.error(err, 'error')
      }
    }
  }

  return (
    <div className="flex bg-gray-200">
      <Sidenav isDrowerOn={isDrowerOn} menu={menu} setMenu={setMenu} />
      <div className='w-full  h-screen overflow-y-scroll'>
        <Header setIsDrowerOn={setIsDrowerOn} isDrowerOn={isDrowerOn} />
        <div className='px-5 py-3'>
          <Title title='Create Playlist' />
          <div className='w-[40%] bg-white border border-gray-200 p-5 mt-5 rounded'>
            <div className='py-2'>
              <p className='text-md py-1 text-gray-600'>Playlist Name</p>
              <input onChange={(e) => setName(e.target.value)} type='text' className='w-full text-black pl-3  h-10 border border-gray-300' />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>
            <div className='py-2'>
              <p className='text-md py-1 text-gray-600'>Description</p>
              <textarea onChange={(e) => setDescription(e.target.value)} className='w-full text-black pl-3  h-10 border border-gray-300' />
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description}</p>
              )}
            </div>
            <div className='pt-3'>
              <Button text='Add Playlist' functionName={createPlayList} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddPlayList