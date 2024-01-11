'use client'
import { Header, Sidenav, Title } from '@/app/components'
import React, { useState } from 'react'

function ViewUser() {
  const [isDrowerOn, setIsDrowerOn] = useState(false)
  const [menu, setMenu] = useState('');
  return (
    <div className="flex bg-gray-200">
      <Sidenav isDrowerOn={isDrowerOn} menu={menu} setMenu={setMenu} />
      <div className='w-full  h-screen overflow-y-scroll'>
        <Header setIsDrowerOn={setIsDrowerOn} isDrowerOn={isDrowerOn} />
        <div className='px-5 py-3 flex justify-between'>
          <Title title='View User Details' />
        </div>
      </div>
    </div>
  )
}

export default ViewUser