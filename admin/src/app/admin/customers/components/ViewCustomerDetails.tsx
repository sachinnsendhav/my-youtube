'use client'
import React, { useEffect, useState } from 'react'
import Sidenav from '../../Components/Sidenav'
import Header from '../../Components/Header'
import Title from '../../Components/Title'
import { Customers } from '@/services'
import { useRouter } from 'next/navigation'

function ViewCustomerDetails({ id }: any) {
  const router = useRouter()
  const [isDrowerOn, setIsDrowerOn] = useState(false)
  const [customerData, setCustomerData] = useState<any>()
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  useEffect(() => {
    getCustomerDetails(id)
  }, [id])
  console.log("id", id)
  const getCustomerDetails = async (id: string) => {
    try {
      const result: any = await Customers.getCustomersDetails(token, id)
      console.log("re", result)
      setCustomerData(result?.data)
    } catch (err: any) {
      if (err.response.data.message === 'Unauthorized') {
        router.push('/auth/signin');
      }
      console.error(err, 'error')
    }
  }
  console.log("customerData", customerData)
  return (
    <div className="flex bg-gray-200">
      <Sidenav isDrowerOn={isDrowerOn} />
      <div className='w-full  h-screen overflow-y-scroll'>
        <Header setIsDrowerOn={setIsDrowerOn} isDrowerOn={isDrowerOn} />
        <div className='px-5 py-3'>
          <Title title='Customer Details' />
          <div className='bg-white px-5 py-3 mt-3'>
            <div className='w-[80%] '>
              <div className='grid grid-cols-2'>
                <div className='py-2 col-span-1 mr-2'>
                  <p className='text-md py-1 text-gray-600'>First Name</p>
                  <input readOnly value={customerData?.parentData?.firstName} type='text' className='w-full text-black pl-3  h-10 border border-gray-300' />

                </div>
                <div className='py-2 col-span-1 ml-2'>
                  <p className='text-md py-1 text-gray-600'>Last Name</p>
                  <input readOnly value={customerData?.parentData?.lastName} type='text' className='w-full text-black pl-3  h-10 border border-gray-300' />

                </div>
              </div>

              <div className='grid grid-cols-2'>
                <div className='py-2 col-span-1 mr-2'>
                  <p className='text-md py-1 text-gray-600'>Email</p>
                  <input readOnly value={customerData?.parentData?.email} type='text' className='w-full text-black pl-3  h-10 border border-gray-300' />
                </div>
                <div className='py-2 col-span-1 ml-2'>
                  <p className='text-md py-1 text-gray-600'>Contact No.</p>
                  <input readOnly value={customerData?.parentData?.phoneNumber} type='text' className='w-full text-black pl-3  h-10 border border-gray-300' />
                </div>
              </div>
            </div>
            <p className='py-2 px-5 bg-zinc-200 text-gray-600 font-semibold my-5'>playlist</p>
            <section className="antialiased text-gray-600 rounded-lg">
              <div className="flex flex-col justify-center h-full">
                <div className="w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
                  <div className="p-3">
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
                              <div className="font-semibold text-center text-lg">Video</div>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-gray-100">
                          {customerData?.playlistData?.map((item: any, index: number) => (
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
                              <td className="p-2 whitespace-nowrap">
                                <div className="text-center font-medium text-green-500">
                                  {item.video.length}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <p className='py-2 px-5 bg-zinc-200 text-gray-600 font-semibold my-5'>Users</p>
            <section className="antialiased text-gray-600 rounded-lg">
              <div className="flex flex-col justify-center h-full">
                <div className="w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
                  <div className="p-3">
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
                              <div className="font-semibold text-left text-lg">Username</div>
                            </th>
                            <th className="p-2 whitespace-nowrap">
                              <div className="font-semibold text-left text-lg">Password</div>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-gray-100">
                          {customerData?.userData.map((item: any, index: number) => (
                            <tr key={index}>

                              <td className="p-2 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="font-medium text-gray-800">{index + 1}</div>
                                </div>
                              </td>
                              <td className="p-2 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="font-medium text-gray-800">{item.firstName} {item.lastName}</div>
                                </div>
                              </td>
                              <td className="p-2 whitespace-nowrap">
                                <div className="text-left font-medium text-green-500">
                                  {item.userName}
                                </div>
                              </td>
                              <td className="p-2 whitespace-nowrap">
                                <div className="text-left font-medium text-green-500">
                                  {item.password}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewCustomerDetails