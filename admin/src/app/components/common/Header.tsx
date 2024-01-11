'use client'
import { useRouter } from 'next/navigation';
import React from 'react'
import { FaUser } from 'react-icons/fa';
import { HiLogout, HiMenuAlt1 } from "react-icons/hi";

interface Props {
    isDrowerOn: any,
    setIsDrowerOn: any,
}

function Header({ isDrowerOn, setIsDrowerOn }: Props) {
    const router = useRouter()
    const name = typeof window !== 'undefined' ? localStorage.getItem('name') : null;

    const LogoutHandler = () => {
        const confirmLogout = window.confirm('Are you sure you want to log out?');
        if (confirmLogout) {
            localStorage.clear();
            router.push('/auth/signin')
        }
    };
    return (
        <div className='h-14 w-full flex justify-between bg-white shadow-md'>
            <HiMenuAlt1 className="text-black text-4xl ml-2 mt-2 cursor-pointer" onClick={() => setIsDrowerOn(isDrowerOn ? false : true)} />
            <div className='pr-5 flex pt-4'>
                <div className='flex'>
                    <FaUser className="text-gray-600 mt-1 mr-2" />
                    <p className='text-gray-600'>Hi {name}</p>
                </div>
                <div className='flex pl-8 cursor-pointer' onClick={() => LogoutHandler()}>
                    <HiLogout className="text-gray-600 mt-1 mr-2" />
                    <p className='text-gray-600'>Logout</p>
                </div>
            </div>
        </div>
    )
}
export default Header