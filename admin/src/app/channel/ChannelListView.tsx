"use client"
import React, { useEffect, useState } from 'react'
import { Header, Sidenav, Title } from '../components'
import Link from 'next/link';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Channel } from '@/services';
import { useRouter } from 'next/navigation';

function ChannelListView() {
    const router = useRouter()
    const [isDrowerOn, setIsDrowerOn] = useState(false)
    const [menu, setMenu] = useState('');
    const [channelList, setChannelList] = useState<any>([])
    const [loading, setLoading] = useState(false)
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    useEffect(() => {
        getChannelList()
    }, [])

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
    const DeleteChannel = async (id: string) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this Channel?');
        if (confirmDelete) {
            try {
                const response = await Channel.deleteChannel(token, id)
                const newArray = channelList.filter((item: any) => item._id !== id);
                setChannelList(newArray)
                alert('Channel deleted!')
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
            <div className='w-full h-screen overflow-y-scroll'>
                <Header setIsDrowerOn={setIsDrowerOn} isDrowerOn={isDrowerOn} />
                <div className='px-5 py-3'>
                    <Title title="Channle List" />
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
                                                            <div className="font-semibold text-left text-lg">ID</div>
                                                        </th>
                                                        <th className="p-2 whitespace-nowrap">
                                                            <div className="font-semibold text-left text-lg">Name</div>
                                                        </th>
                                                        
                                                        <th className="p-2 whitespace-nowrap">
                                                            <div className="font-semibold text-center text-lg">Action</div>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="text-sm divide-y divide-gray-100">
                                                    {channelList.map((item: any, index: number) => (
                                                        <tr key={index}>

                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <div className="font-medium text-gray-800">{index + 1}</div>
                                                                </div>
                                                            </td>
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <div className="font-medium text-gray-800">{item.channelId}</div>
                                                                </div>
                                                            </td>
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="text-left font-medium text-green-500">
                                                                    {item.channelName}
                                                                </div>
                                                            </td>
                                                        
                                                            <td className="text-xs flex justify-center items-center h-full pt-4">
                                                               
                                                                <MdDelete className="text-lg cursor-pointer text-gray-600 ml-5"
                                                                    onClick={() => DeleteChannel(item?._id)}
                                                                />
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

export default ChannelListView