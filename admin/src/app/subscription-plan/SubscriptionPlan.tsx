'use client'
import React, { useState } from 'react'
import { Header, Sidenav, Title } from '../components'
import paymentHelper from './paymentHelper';

function SubscriptionPlan() {
    const [isDrowerOn, setIsDrowerOn] = useState(false)
    const [menu, setMenu] = useState('');

    function handleClick(amount:Number,currency:any){
        console.log("handleclicked")
        paymentHelper(amount,currency)
    }
    return (
        <div className="flex bg-gray-200">
            <Sidenav isDrowerOn={isDrowerOn} menu={menu} setMenu={setMenu} />
            <div className='w-full  h-screen overflow-y-scroll'>
                <Header setIsDrowerOn={setIsDrowerOn} isDrowerOn={isDrowerOn} />
                <div className='px-5 py-3 flex justify-between'>
                    <Title title='Subscription Plan' />
                </div>
                <div>
                    <button type="button" onClick={() => handleClick(29,'INR')} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Default</button>
                </div>
            </div>
        </div>
    )
}

export default SubscriptionPlan