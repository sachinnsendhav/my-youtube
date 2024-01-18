'use client'
import React, { useEffect, useState } from 'react'
import Title from '../../Components/Title'
import Header from '../../Components/Header'
import Sidenav from '../../Components/Sidenav'
import Link from 'next/link'
import { FaEdit, FaEye } from 'react-icons/fa'
import { Customers } from '@/services'
import { useRouter } from 'next/navigation'

function customersList() {
  const router = useRouter()
  const [isDrowerOn, setIsDrowerOn] = useState(false)
  const [loading, setLoading] = useState(false);
  const [customersList, setCustomersList] = useState<any>([])
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  useEffect(() => {
    getCustomerslist()
  }, [])

  const getCustomerslist = async () => {
    setLoading(true)
    try {
      const result: any = await Customers.getCustomersList(token)
      console.log(result)
      setCustomersList(result?.data)
    } catch (err: any) {
      if (err.response.data.message === 'Unauthorized') {
        router.push('/admin/auth/signin');
      }
      console.error(err, 'error')
    }
    setLoading(false)
  }
  return (
    <div className="flex bg-gray-200">
      <Sidenav isDrowerOn={isDrowerOn} />
      <div className='w-full  h-screen overflow-y-scroll'>
        <Header setIsDrowerOn={setIsDrowerOn} isDrowerOn={isDrowerOn} />
        <div className='px-5 py-3'>
          <Title title='Customer List' />
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
                              <div className="font-semibold text-left text-lg">Email</div>
                            </th>
                            <th className="p-2 whitespace-nowrap">
                              <div className="font-semibold text-left text-lg">Number</div>
                            </th>
                            <th className="p-2 whitespace-nowrap">
                              <div className="font-semibold text-center text-lg">Action</div>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-gray-100">
                          {customersList.map((item: any, index: number) => (
                            <tr key={index}>

                              <td className="p-2 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="font-medium text-gray-800">{index + 1}</div>
                                </div>
                              </td>
                              <td className="p-2 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="font-medium text-gray-800">{item.firstName}</div>
                                </div>
                              </td>
                              <td className="p-2 whitespace-nowrap">
                                <div className="text-left font-medium text-green-500">
                                  {item.email}
                                </div>
                              </td>
                              <td className="p-2 whitespace-nowrap">
                                <div className="text-left font-medium text-green-500">
                                  {item.phone}
                                </div>
                              </td>
                              <td className="text-xs flex justify-center items-center h-full pt-4">
                                <Link href={`/playlist/view/${item?._id}`}>
                                  <FaEye className="text-lg cursor-pointer text-gray-600 mr-5" />
                                </Link>
                                <Link href={`/playlist/update/${item?._id}`}>
                                  <FaEdit className="text-lg cursor-pointer text-gray-600" />
                                </Link>
                                {/* <MdDelete className="text-lg cursor-pointer text-gray-600 ml-5" onClick={() => DeletePlaylist(item?._id)} /> */}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  }
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
export default customersList