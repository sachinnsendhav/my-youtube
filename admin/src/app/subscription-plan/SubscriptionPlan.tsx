'use client'
import React, { useState } from 'react'
import { Header, Sidenav, Title } from '../components'

function SubscriptionPlan() {
    const [isDrowerOn, setIsDrowerOn] = useState(false)
    const [menu, setMenu] = useState('');
    return (
        <div className="flex bg-gray-200">
            <Sidenav isDrowerOn={isDrowerOn} menu={menu} setMenu={setMenu} />
            <div className='w-full  h-screen overflow-y-scroll'>
                <Header setIsDrowerOn={setIsDrowerOn} isDrowerOn={isDrowerOn} />
                <div className='px-5 py-3 flex justify-between'>
                    <Title title='Subscription Plan' />
                </div>
                <div>

                    you can write your code here...
                </div>
            </div>
        </div>
    )
}

export default SubscriptionPlan