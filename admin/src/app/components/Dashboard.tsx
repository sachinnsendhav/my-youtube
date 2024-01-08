"use client"
import { useState } from 'react'
import { Header, Title } from './index'
import Sidenav from './Sidenav'

function Dashboard() {
    const [isDrowerOn, setIsDrowerOn] = useState(false)
    const [menu, setMenu] = useState('')
    return (
        <div className="flex bg-gray-200">
            <Sidenav isDrowerOn={isDrowerOn} menu={menu} setMenu={setMenu} />
            <div className='w-full  h-screen overflow-y-scroll'>
                <Header setIsDrowerOn={setIsDrowerOn} isDrowerOn={isDrowerOn} />
                <div className='px-5 py-3'>
                    <Title title='Dashboard' />
                </div>
            </div>
        </div>
    )
}

export default Dashboard