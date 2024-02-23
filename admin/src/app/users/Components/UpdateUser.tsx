'use client'
import { Header, Sidenav, Title } from '@/app/components'
import { Channel, Playlist, Users } from '@/services';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

function UpdateUser({ id }: any) {
  const router = useRouter()
  const [isDrowerOn, setIsDrowerOn] = useState(false)
  const [menu, setMenu] = useState('');
  const [playlist, setPlaylist] = useState<any>([])
  const [channel, setChannel] = useState<any>([])
  const [playlistIds, setPlaylistIds] = useState([])
  const [userData, setUserData] = useState<any>()
  const [channelList, setChannelList] = useState<any>([])
  const [loading, setLoading] = useState(false)
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  useEffect(() => {
    getPlaylist()
    getUserDetails(id)
    getChannelList()
  }, [id])

  useEffect(() => {
    setPlaylist((prevPlaylist: any) =>
      prevPlaylist.map((secondItem: any) => {
        const matchingFirstItem = playlistIds.find((firstItem: any) => firstItem._id === secondItem._id);
        return { ...secondItem, exisit: Boolean(matchingFirstItem) };
      })
    );
  }, [playlistIds]);

  useEffect(() => {
    setChannelList((prevPlaylist: any) =>
      prevPlaylist.map((secondItem: any) => {
        const matchingFirstItem = channel.find((firstItem: any) => firstItem.channelId === secondItem.channelId);
        return { ...secondItem, exisit: Boolean(matchingFirstItem) };
      })
    );
  }, [channel]);
  const getUserDetails = async (id: string) => {
    try {
      const result: any = await Users.getUserDetails(token, id)
      setPlaylistIds(result?.data?.playList)
      setChannel(result?.data?.channel)
      setUserData(result?.data)
    } catch (err: any) {
      if (err.response.data.message === 'Unauthorized') {
        router.push('/auth/signin');
      }
      console.error(err, 'error')
    }
  }
  const getPlaylist = async () => {
    setLoading(true)
    try {
      const result: any = await Playlist.getAllPlaylist(token)
      setPlaylist(result?.data)
    } catch (err: any) {
      if (err.response.data.message === 'Unauthorized') {
        router.push('/auth/signin');
      }
      console.error(err, 'error')
    }
    setLoading(false)
  }
  const alotPlaylistToUser = async (playlistid: string) => {
    try {
      const data = {
        playlistId: [playlistid]
      }
      const result: any = await Users.alotPlaylistToUser(token, data, id)
      getUserDetails(id)
      alert('playlist added')
    } catch (err: any) {
      if (err.response.data.message === 'Unauthorized') {
        router.push('/auth/signin');
      }
      console.error(err, 'error')
    }
  }

  const removePlaylistFromUser = async (playlistId: string) => {
    const confirmDelete = window.confirm('Are you sure you want to remove playlist from this user?');
    if (confirmDelete) {
      try {
        const result: any = await Users.removePlaylistFromUser(token, id, playlistId)
        getUserDetails(id)
        alert('Playlist removed from this user!')
      } catch (error: any) {
        if (error.response.data.message === 'Unauthorized') {
          router.push('/auth/signin');
        } else {
          alert(error.response.data.message);
        }
      }
    }
  }
  const getChannelList = async () => {
    setLoading(true)
    try {
      const result: any = await Channel.getChannelList(token)
      console.log(result)
      setChannelList(result?.data)
    } catch (err: any) {
      if (err.response.data.message === 'Unauthorized') {
        router.push('/auth/signin');
      }
      console.error(err, 'error')
    }
    setLoading(false)
  }
  const alotChannelToUser = async (channelName: string, channelId: string) => {
    try {
      const data = {
        channelName: channelName,
        channelId: channelId
      }
      const result: any = await Channel.alotChannelToUser(token, id, data)
      getUserDetails(id)
      alert('Channel added')
    } catch (err: any) {
      if (err.response.data.message === 'Unauthorized') {
        router.push('/auth/signin');
      }
      console.error(err, 'error')
    }
  }

  const removeChannelToUser = async (channelId: string) => {
    try {
      const result: any = await Channel.removeChannelToUser(token, id, channelId)
      getUserDetails(id)
      alert('Channel removed successfully')
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
        <div className='px-5 py-3'>
          <div className='w-full bg-white rounded-lg py-3 px-8'>
            <Title title='Update User' />
            <div className='w-[60%] bg-white'>
              <div className='grid grid-cols-2'>
                <div className='py-2 col-span-1 mr-2'>
                  <p className='text-md py-1 text-gray-600'>First Name</p>
                  <input readOnly value={userData?.firstName} type='text' className='w-full text-black pl-3  h-10 border border-gray-300' />

                </div>
                <div className='py-2 col-span-1 ml-2'>
                  <p className='text-md py-1 text-gray-600'>Last Name</p>
                  <input readOnly value={userData?.lastName} type='text' className='w-full text-black pl-3  h-10 border border-gray-300' />

                </div>
              </div>

              <div className='grid grid-cols-2'>
                <div className='py-2 col-span-1 mr-2'>
                  <p className='text-md py-1 text-gray-600'>Username</p>
                  <input readOnly value={userData?.userName} type='text' className='w-full text-black pl-3  h-10 border border-gray-300' />
                </div>
                <div className='py-2 col-span-1 ml-2'>
                  <p className='text-md py-1 text-gray-600'>password</p>
                  <input readOnly value={userData?.password} type='text' className='w-full text-black pl-3  h-10 border border-gray-300' />
                </div>
              </div>

            </div>
            <div className='grid grid-cols-12'>
              <div className='col-span-6'>
                <p className='text-md py-1 text-gray-600'>Playlist</p>
                <div className='flex py-2'>
                  {playlistIds.map((item: any) => {
                    return (
                      <div className='bg-pink-600 mx-2 text-white flex rounded'>
                        <Link href={`/playlist/view/${item._id}`}>
                          <p className='text-md px-2 py-1'>{item?.name}</p></Link>
                        <div className='px-2 bg-pink-700 rounded-r cursor-pointer' onClick={() => removePlaylistFromUser(item._id)} >
                          <MdDelete className='mt-2 text-sm mx-1 ' />
                        </div>
                      </div>
                    )
                  })}
                </div>
                <p className='py-2 px-5 bg-zinc-200 text-gray-600 font-semibold'>Assign playlist</p>
                <div className='flex py-3'>
                  {playlist?.map((item: any) => {
                    return (
                      <div className='bg-pink-600 mx-2 text-white flex rounded'>
                        <Link href={`/playlist/view/${item._id}`}>
                          <p className='px-2 py-1'>{item.name}</p>
                        </Link>
                        {item.exisit ? '' :
                          <div className='px-2 bg-pink-700 rounded-r cursor-pointer' onClick={() => alotPlaylistToUser(item._id)}>
                            <FaPlus className='mt-2 text-sm mx-1 ' />

                          </div>
                        }
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className='col-span-6 pl-2'>
                <p className='text-md py-1 text-gray-600'>Channel List</p>
                <div className='flex flex-wrap py-2'>
                  {channel.map((item: any) => {
                    return (
                      <div className='bg-pink-600 mx-2 my-1 text-white flex rounded'>
                        <Link href={`/playlist/view/${item._id}`}>
                          <p className='text-md px-2 py-1'>{item?.channelName}</p></Link>
                        <div className='px-2 bg-pink-700 rounded-r cursor-pointer' onClick={() => removeChannelToUser(item.channelId)} >
                          <MdDelete className='mt-2 text-sm mx-1 ' />
                        </div>
                      </div>
                    )
                  })}
                </div>
                <p className='py-2 px-5 bg-zinc-200 text-gray-600 font-semibold'>Assign Channel</p>
                <div className='flex flex-wrap py-2'>
                  {channelList?.map((item: any) => {
                    return (
                      <div className='bg-pink-600 mx-2 my-1 text-white flex rounded'>
                        {/* <Link href={`/playlist/view/${item._id}`}> */}
                        <p className='px-2 py-1'>{item.channelName}</p>
                        {/* </Link> */}
                        {item.exisit ? '' :
                          <div className='px-2 bg-pink-700 rounded-r cursor-pointer'
                            onClick={() => alotChannelToUser(item.channelName, item.channelId)}
                          >
                            <FaPlus className='mt-2 text-sm mx-1 ' />

                          </div>
                        }
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateUser