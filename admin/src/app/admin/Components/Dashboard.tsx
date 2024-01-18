'use client'
import React, { useState } from 'react'
import Sidenav from './Sidenav'
import Header from './Header'
import Title from './Title'

function Dashboard() {
    const [isDrowerOn, setIsDrowerOn] = useState(false)

    return (
        <div className="flex bg-gray-200">
            <Sidenav isDrowerOn={isDrowerOn} />
            <div className='w-full  h-screen overflow-y-scroll'>
                <Header setIsDrowerOn={setIsDrowerOn} isDrowerOn={isDrowerOn} />
                <div className='px-5 py-3'>
                    <Title title='Dashboard' />
                    <div className='p-5 mt-5 flex items-center bg-white shadow-lg border border-gray-300 h-36 w-48 rounded-xl'>
                        <div className='w-full'>
                            <p className='text-gray-600 text-center font-semibold'>Customer</p>
                            <p className='text-3xl text-gray-600 text-center pt-3 font-bold'>1001</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard