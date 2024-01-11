'use client'
import Image from 'next/image'
import React, { useEffect } from 'react'
import logo from '../../../public/MY YOUTUBE.png'
import { RiDashboard3Fill } from "react-icons/ri";
import { FaDatabase } from "react-icons/fa";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Props {
    isDrowerOn: any,
    setMenu: any,
    menu: string
}
function Sidenav({ isDrowerOn, menu, setMenu }: Props) {
    const router = useRouter()
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    useEffect(() => {
        if (!token) {
            router.push('/auth/signin')
        }
    }, [token])
    return (
        <div className={`w-60 bg-gray-800 h-screen p-0 m-0 ${isDrowerOn ? 'hidden' : 'block'}`}>
            <div className='h-14 bg-red-500 flex jusify-center p-0 m-0'>
                <Image src={logo} alt='logo' className='object-contain' />
            </div>
            <div className='px-5'>
                <Link href='/'>
                    <div className='flex py-2 cursor-pointer' onClick={() => setMenu('')}>
                        <RiDashboard3Fill className="text-white mt-1" />
                        <p className='text-md text-white pl-3'>Dashboard</p>
                    </div>
                </Link>
                <div className='flex justify-between py-2 cursor-pointer' onClick={() => setMenu('playlist')}>
                    <div className='flex'>
                        <FaDatabase className="text-white mt-1" />
                        <p className='text-md text-white pl-3'>
                            Playlist
                        </p>
                    </div>
                    {menu === 'playlist' ? <MdKeyboardArrowDown className="text-white mt-1" /> : <MdKeyboardArrowLeft className="text-white mt-1" />}
                </div>
                {menu === 'playlist' ? <div className='pl-7'>
                    <Link href='/playlist/list'>
                        <p className='text-sm text-white py-1 cursor-pointer'>
                            View playlist
                        </p>
                    </Link>
                    <Link href='/playlist/add'>
                        <p className='text-sm text-white py-1 cursor-pointer'>
                            Create playlist
                        </p>
                    </Link>
                </div> : ""}
                <div className='flex justify-between py-2 cursor-pointer' onClick={() => setMenu('users')}>
                    <div className='flex'>
                        <FaUserFriends className="text-white mt-1" />
                        <p className='text-md text-white pl-3'>
                            Users
                        </p>
                    </div>
                    {menu === 'users' ? <MdKeyboardArrowDown className="text-white mt-1" /> : <MdKeyboardArrowLeft className="text-white mt-1" />}
                </div>
                {menu === 'users' ? <div className='pl-7'>
                    <Link href='/users/list'>
                        <p className='text-sm text-white py-1 cursor-pointer'>
                            Users List
                        </p>
                    </Link>
                    <Link href='/users/add'>
                        <p className='text-sm text-white py-1 cursor-pointer'>
                            Create User
                        </p>
                    </Link>
                </div> : ""}
            </div>
        </div>
    )
}

export default Sidenav