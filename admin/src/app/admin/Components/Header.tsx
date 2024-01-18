'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa';
import { HiLogout, HiMenuAlt1 } from "react-icons/hi";
interface Props {
    isDrowerOn: any,
    setIsDrowerOn: any,
}

function Header({ isDrowerOn, setIsDrowerOn }: Props) {
    const router = useRouter()
    const [name, setName] = useState<any>('')
    useEffect(() => {
        const name = typeof window !== 'undefined' ? localStorage.getItem('name') : "";
        setName(name)
    }, [])


    const LogoutHandler = () => {
        const confirmLogout = window.confirm('Are you sure you want to log out as admin?');
        if (confirmLogout) {
            localStorage.clear();
            router.push('/admin/auth/signin')
        }
    };
    return (
        <div className='h-14 w-full flex justify-between transition duration-500 ease-in-out bg-gradient-to-l from-[#e61e78] to-[#ac02b5] shadow-md'>
            <HiMenuAlt1 className="text-white text-4xl ml-2 mt-2 cursor-pointer" onClick={() => setIsDrowerOn(isDrowerOn ? false : true)} />
            <div className='pr-5 flex pt-4'>
                <div className='flex text-white'>
                    <FaUser className=" mt-1 mr-2" />
                    <p className=''>Hi {name}</p>
                </div>
                <div className='flex pl-8 cursor-pointer' onClick={() => LogoutHandler()}>
                    <HiLogout className=" mt-1 mr-2" />
                    <p className=''>Logout</p>
                </div>
            </div>
        </div>
    )
}
export default Header