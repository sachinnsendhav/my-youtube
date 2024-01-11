'use client'
import { Header, Sidenav, Title } from '@/app/components'
import { Playlist } from '@/services';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FaEdit, FaEye } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';


function ViewAllPlayList() {
  const router = useRouter()
  const [isDrowerOn, setIsDrowerOn] = useState(false)
  const [menu, setMenu] = useState('');
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
  console.log("playlist", playlist)
  const DeletePlaylist = async (id: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this playlist?');

    if (confirmDelete) {
      try {
        const result: any = await Playlist.deletePlaylist(token, id)
        const newArray = playlist.filter((item: any) => item._id !== id);
        setPlaylist(newArray)
        alert('Playlist deleted!')
      } catch (error: any) {
        if (error.response.data.message === 'Unauthorized') {
          router.push('/auth/signin');
        } else {
          alert(error.response.data.message);
        }
      }
    }
  }
  return (
    <div className="flex bg-gray-200">
      <Sidenav isDrowerOn={isDrowerOn} menu={menu} setMenu={setMenu} />
      <div className='w-full  h-screen overflow-y-scroll'>
        <Header setIsDrowerOn={setIsDrowerOn} isDrowerOn={isDrowerOn} />
        <div className='px-5 py-3 flex justify-between'>
          <Title title='Playlist' />
        </div>
        <section className="antialiased text-gray-600 rounded-lg p-2">
          <div className="flex flex-col justify-center h-full">
            <div className="w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
              <div className="p-3">
                {loading ? <>Loading...</> :
                  <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                      <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                        <tr>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-center text-lg"></div>
                          </th>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left text-lg">Name</div>
                          </th>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left text-lg">Description</div>
                          </th>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-center text-lg">Action</div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-sm divide-y divide-gray-100">
                        {playlist.map((item: any, index: number) => (
                          <tr key={index}>

                            <td className="p-2 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="font-medium text-gray-800">{index + 1}</div>
                              </div>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="font-medium text-gray-800">{item.name}</div>
                              </div>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div className="text-left font-medium text-green-500">
                                {item.description}
                              </div>
                            </td>
                            <td className="text-xs flex justify-center items-center h-full pt-4">
                              <Link href={`/playlist/view?id=${item?._id}`}>
                                <FaEye className="text-lg cursor-pointer text-gray-600 mr-5" />
                              </Link>
                              <Link href={`/playlist/update?id=${item?._id}`}>
                                <FaEdit className="text-lg cursor-pointer text-gray-600" />
                              </Link>

                              <MdDelete className="text-lg cursor-pointer text-gray-600 ml-5" onClick={() => DeletePlaylist(item?._id)} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {/* <div className="flex justify-center mt-4">
                      <button
                        className={`px-3 py-1 mx-1 ${currentPage === 1 && 'bg-gray-300 cursor-not-allowed'
                          }`}
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
                      <div className="flex space-x-2">
                        {Array.from({ length: pageCount }).map((_, index) => (
                          <button
                            key={index}
                            className={`px-3 py-1 ${currentPage === index + 1 && 'bg-blue-500 text-white'
                              }`}
                            onClick={() => handlePageChange(index + 1)}
                          >
                            {index + 1}
                          </button>
                        ))}
                      </div>
                      <button
                        className={`px-3 py-1 mx-1 ${currentPage === pageCount && 'bg-gray-300 cursor-not-allowed'
                          }`}
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === pageCount}
                      >
                        Next
                      </button>
                    </div> */}
                  </div>
                }
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
export default ViewAllPlayList