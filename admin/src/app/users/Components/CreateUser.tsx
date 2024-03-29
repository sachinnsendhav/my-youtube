'use client'
import { Button, Header, Sidenav, Title } from '@/app/components'
import { Users } from '@/services';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function CreateUser() {
  const router = useRouter()
  const [isDrowerOn, setIsDrowerOn] = useState(false)
  const [menu, setMenu] = useState('');
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [gender, setGender] = useState('')
  const [errors, setErrors] = useState<any>({});
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const validateForm = () => {
    const error: any = {};
    if (firstName === "") {
      error.firstName = "Please enter first name";
    }
    if (lastName === "") {
      error.lastName = "Please enter last name";
    }
    if (userName === "") {
      error.userName = "Please enter username";
    }
    if (password === "") {
      error.password = "Please enter paswword";
    }
    if (gender === "") {
      error.gender = "Please select Gender";
    }
    setErrors(error);
    return Object.keys(error).length === 0;
  };
  const createNewUser = async () => {
    if (validateForm()) {
      const data: any = {
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        password: password,
        gender:gender
      }
      try {
        const result: any = await Users.createUSer(token, data)
        if (result?.status === 200) {
          alert(result?.message)
          router.push('/users/list')
        }
      } catch (err: any) {
        if (err.response.data.message === 'Unauthorized') {
          router.push('/auth/signin');
        }
        console.error(err, 'error')
      }
    }
  }

  return (
    <div className="flex bg-gray-200">
      <Sidenav isDrowerOn={isDrowerOn} menu={menu} setMenu={setMenu} />
      <div className='w-full  h-screen overflow-y-scroll'>
        <Header setIsDrowerOn={setIsDrowerOn} isDrowerOn={isDrowerOn} />
        <div className='px-5 py-3'>
          <Title title='Create User - (Children)' />
          <div className='w-[60%] bg-white border border-gray-200 p-5 mt-5 rounded'>
            <div className='grid grid-cols-2'>
              <div className='py-2 col-span-1 mr-2'>
                <p className='text-md py-1 text-gray-600'>First Name</p>
                <input onChange={(e) => setFirstName(e.target.value)} type='text' className='w-full text-black pl-3  h-10 border border-gray-300' />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">{errors.firstName}</p>
                )}
              </div>
              <div className='py-2 col-span-1 ml-2'>
                <p className='text-md py-1 text-gray-600'>Last Name</p>
                <input onChange={(e) => setLastName(e.target.value)} type='text' className='w-full text-black pl-3  h-10 border border-gray-300' />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className='grid grid-cols-2'>
              <div className='py-2 col-span-1 mr-2'>
                <p className='text-md py-1 text-gray-600'>Username</p>
                <input onChange={(e) => setUserName(e.target.value)} type='text' className='w-full text-black pl-3  h-10 border border-gray-300' />
                {errors.userName && (
                  <p className="text-red-500 text-sm">{errors.userName}</p>
                )}
              </div>
              <div className='py-2 col-span-1 ml-2'>
                <p className='text-md py-1 text-gray-600'>password</p>
                <input onChange={(e) => setPassword(e.target.value)} type='text' className='w-full text-black pl-3  h-10 border border-gray-300' />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>
            </div>
            <div className='grid grid-cols-2'>
              <div className='py-2 col-span-1 mr-2'>
                <p className='text-md py-1 text-gray-600'>Gender</p>
                <div className='flex'>
                  <input onChange={(e) => setGender(e.target.value)} value='male' type='radio' name='gender' className='h-4 w-4 mt-2 text-black pl-3 border border-gray-300' />
                  <label className='text-md py-1 text-gray-600 pl-2'>Male</label>
                </div>
                <div className='flex'>
                  <input onChange={(e) => setGender(e.target.value)} value='female' type='radio' name='gender' className='h-4 w-4 mt-2 text-black pl-3 border border-gray-300' />
                  <label className='text-md py-1 text-gray-600 pl-2'>Female</label>
                </div>
                {errors.gender && (
                  <p className="text-red-500 text-sm">{errors.gender}</p>
                )}
              </div>
            </div>
            <div className='pt-3'>
              <Button text='Add User' functionName={createNewUser} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateUser