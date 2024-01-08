import React from 'react'
import Link from 'next/link'
function Signup() {
    return (
        <div className='flex bg-gray-300 justify-center'>
            <div className='w-[30%] bg-white my-10 rounded py-10 px-5'>
                <p className='text-3xl font-bold text-gray-600'>Sign Up</p>
                <p className='text-md text-gray-500 pt-2'>Fill out the form to create a new account.</p>
                <div className='py-2 mt-3'>
                    <p className='text-md py-1 text-gray-600 font-bold'>First Name</p>
                    <input type='text' className='w-full h-10 border border-gray-300' />
                </div>
                <div className='py-2'>
                    <p className='text-md py-1 text-gray-600 font-bold'>Last Name</p>
                    <input type='text' className='w-full h-10 border border-gray-300' />
                </div>
                <div className='py-2'>
                    <p className='text-md py-1 text-gray-600 font-bold'>Email</p>
                    <input type='text' className='w-full h-10 border border-gray-300' />
                </div>
                <div className='py-2'>
                    <p className='text-md py-1 text-gray-600 font-bold'>Password</p>
                    <input type='text' className='w-full h-10 border border-gray-300' />
                </div>
                <div className='py-2'>
                    <p className='text-md py-1 text-gray-600 font-bold'>Role</p>
                    <select className='w-full h-10 border border-gray-300 text-black'>

                        <option value='' disabled selected>Please Select Role</option>
                        <option value='admin'>Admin</option>
                        <option value='sub-admin'>Sub-admin</option>
                        <option value='user'>User</option>
                    </select>
                </div>
                <div className='flex py-4'>
                    <input type='checkbox' className='h-4 w-4 mt-1' />
                    <p className='text-md text-gray-500 pl-2'>I agree to the <span className='text-blue-600'>terms and conditions</span>.</p>
                </div>
                <button className='w-full rounded bg-[#005ebe] text-white py-2 px-3 my-2 transform transition-transform hover:scale-105'> Sign Up</button>
                <p className='text-md text-gray-500 pt-5 text-center'>Already have an account? <Link href='/auth/signin'><span className='text-blue-600'>Sign in </span></Link></p>
            </div>
        </div>
    )
}

export default Signup