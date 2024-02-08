// 'use client'
// import React, { useState } from 'react'
// import { Header, Sidenav, Title } from '../components'
// import paymentHelper from './paymentHelper';

// function SubscriptionPlan() {
//     const [isDrowerOn, setIsDrowerOn] = useState(false)
//     const [menu, setMenu] = useState('');

//     function handleClick(amount:Number,currency:any){
//         console.log("handleclicked")
//         paymentHelper(amount,currency)
//     }
//     return (
//         <div className="flex bg-gray-200">
//             <Sidenav isDrowerOn={isDrowerOn} menu={menu} setMenu={setMenu} />
//             <div className='w-full  h-screen overflow-y-scroll'>
//                 <Header setIsDrowerOn={setIsDrowerOn} isDrowerOn={isDrowerOn} />
//                 <div className='px-5 py-3 flex justify-between'>
//                     <Title title='Subscription Plan' />
//                 </div>
//                 <div>
//                     <button type="button" onClick={() => handleClick(29,'INR')} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Default</button>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default SubscriptionPlan

'use client'
import React, { useState, useEffect } from 'react'
import { Button, Header, Sidenav, Title } from '../components'
import paymentHelper from './paymentHelper';
import { Subscription } from '@/services'

function SubscriptionPlan() {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const [isDrowerOn, setIsDrowerOn] = useState(false)
    const [getSubscription, setSubscription] = useState([]);
    const [menu, setMenu] = useState('');

    useEffect(() => {
        async function getPlaylists(){
            const result: any = await Subscription.getSubscriptionPlans(token);
            console.log("my new data is", result);
            setSubscription(result.data);
        }
        getPlaylists();
    },[])

    function handleClick(amount: Number, currency: any, subscriptionId:any) {
        console.log("handleclicked", subscriptionId);
        paymentHelper(amount, currency, subscriptionId)
    }
    return (
        <div className="flex bg-gray-200">
            <Sidenav isDrowerOn={isDrowerOn} menu={menu} setMenu={setMenu} />
            <div className='w-full  h-screen overflow-y-scroll'>
                <Header setIsDrowerOn={setIsDrowerOn} isDrowerOn={isDrowerOn} />
                <div className='px-5 py-3 flex justify-between'>
                    <Title title='Subscription Plan' />
                </div>
                <div className='px-10 flex'>
                {getSubscription.map((item: any) => (
                    <div className='w-48 bg-white py-5 rounded shadow-xl mx-5 text-center' >
                        <p className='text-3xl text-gray-700 font-bold'>{item.subscriptionPrice} &#8377;</p>
                        <p className='text text-gray-700 font-semibold pt-5 uppercase tracking-wide'>{item.planType}</p>
                        <p className='text-sm tracking-wide text-gray-700'>{item.description}</p>
                        {/* <Button text='Pay' functionName={()=>handleClick(29,'INR')}/> */}
                        <button type="button" onClick={() => handleClick(item.subscriptionPrice, 'INR', item._id)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-2">Buy</button>
                    </div>
                ))}
                </div>

            </div>
        </div>
    )
}

export default SubscriptionPlan