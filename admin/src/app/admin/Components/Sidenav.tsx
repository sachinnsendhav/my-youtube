'use client'
import Image from 'next/image'
import React, { useEffect } from 'react'
import logo from '../../../../public/MY-YOUTUBE-2.png'
import { RiDashboard3Fill } from "react-icons/ri";
import { FaDatabase } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Props {
    isDrowerOn: any
}
function Sidenav({ isDrowerOn}: Props) {
    const router = useRouter()
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    useEffect(() => {
        if (!token) {
            router.push('/admin/auth/signin')
        }
    }, [token])
    return (
        <div className={`w-60 transition duration-500 ease-in-out bg-gradient-to-t from-[#e61e78] to-[#ac02b5] h-screen p-0 m-0 ${isDrowerOn ? 'hidden' : 'block'}`}>
            <div className='h-14 bg-[#fc0303] flex jusify-center p-0 m-0'>
                <Image src={logo} alt='logo' className='object-contain' />
            </div>
            <div className='px-5'>
                <Link href='/admin/dashboard'>
                    <div className='flex py-2 cursor-pointer'>
                        <RiDashboard3Fill className="text-white mt-1" />
                        <p className='text-md text-white pl-3'>Dashboard</p>
                    </div>
                </Link>
                <div className='flex justify-between py-2 cursor-pointer'>
                    <div className='flex'>
                        <FaDatabase className="text-white mt-1" />
                        <p className='text-md text-white pl-3'>
                            Customers
                        </p>
                    </div><MdKeyboardArrowDown className="text-white mt-1" />
                </div> <div className='pl-7'>
                    <Link href='/admin/customers/list'>
                        <p className='text-sm text-white py-1 cursor-pointer'>
                            Customer List
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Sidenav