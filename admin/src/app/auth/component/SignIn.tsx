'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { Auth } from '@/services';

function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState<any>({});
    const router = useRouter()

    const validateForm = () => {
        const error: any = {};
        if (email === "") {
            error.email = "Please enter Email Address";
        }
        if (password === "") {
            error.password = "Please enter password";
        }
        setErrors(error);
        return Object.keys(error).length === 0;
    };
    const loginHandler = async () => {
        setLoading(true)
        if (validateForm()) {
            const data: any = {
                email: email,
                password: password
            }
            try {
                const result: any = await Auth.login(data)
                if (result?.status === 200) {
                    localStorage.setItem('token', result?.data?.token)
                    localStorage.setItem('name', result?.data?.userData?.firstName)
                    router.push('/')
                }
            } catch (err: any) {
                if(err?.response?.data?.status ==="401"){
                alert("Incorrect email or password")
                }else{
                    alert("somthing went wrong!")
                }
                console.log(err, 'error')
            }
        }
        setLoading(false)
    }

    return (
        <div className='h-screen py-5 flex items-center transition duration-500 ease-in-out bg-gradient-to-r from-[#e61e78] via-[#ffc34a] to-[#e61e78] shadow-xl justify-center'>
        <div className='w-[30%] bg-white rounded p-5'>
                <p className='text-3xl font-bold text-gray-600'>Parents - Sign In</p>
                <p className='text-md text-gray-500'>Log in to your account to continue.</p>
                <div className='py-2 mt-5'>
                    <p className='text-md py-1 text-gray-600 font-bold'>Email</p>
                    <input onChange={(e) => setEmail(e.target.value)} type='text' className='w-full text-black pl-3 h-10 border border-gray-300' />
                    {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                </div>
                <div className='py-2'>
                    <p className='text-md py-1 text-gray-600 font-bold'>Password</p>
                    <input onChange={(e) => setPassword(e.target.value)} type='text' className='w-full text-black pl-3  h-10 border border-gray-300' />
                    {errors.password && (
                        <p className="text-red-500 text-sm">{errors.password}</p>
                    )}
                </div>
                <div className='flex justify-between py-4'>
                    <div className='flex'>
                        <input type='checkbox' className='h-4 w-4 mt-1' />
                        <p className='text-lg pl-2 text-gray-600'>Remember Me</p>
                    </div>
                    <p className='text-blue-600 cursor-pointer'>Forgot password?</p>
                </div>
                <button
                    onClick={() => loginHandler()}
                    disabled={loading ? true : false}
                    className='w-full font-semibold rounded transition duration-500 ease-in-out bg-gradient-to-r from-[#ffc34a] via-[#e61e78] to-[#f593fa] hover:to-[#fc0303] hover:from-[#e61e78] text-white py-2 px-3 my-2 transform transition-transform hover:scale-105'>
                    Login
                </button>
                <p className='text-md text-gray-500 pt-5 text-center'>Don&apos;t have an account?<Link href='/auth/signup'> <span className='text-blue-600'>Sign up</span></Link></p>
            </div>
        </div>
    )
}

export default SignIn