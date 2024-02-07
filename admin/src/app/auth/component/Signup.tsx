'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Auth } from '@/services'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
function Signup() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassord] = useState('')
    const [phone, setPhone] = useState('')
    const [otp, setOtp] = useState('')
    const [errors, setErrors] = useState<any>({});
    const [loading, setLoading] = useState(false)
    const [eyeOpen, setEyeOpen] = useState(false)

    const router = useRouter()

    const validateForm = () => {
        const error: any = {};
        if (firstName === "") {
            error.firstName = "Please enter First Name";
        }
        if (lastName === "") {
            error.lastName = "Please enter Last Name";
        }
        if (phone === "") {
            error.phone = "Please enter Contact Number";
        }
        if (email === "") {
            error.email = "Please enter Email Address";
        }
        if (password === "") {
            error.password = "Please enter password";
        }
        if (otp === "") {
            error.otp = "Please enter otp";
        }
        setErrors(error);
        return Object.keys(error).length === 0;
    };

    const RegisterParrents = async () => {
        setLoading(true)
        if (validateForm()) {
            const data: any = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                userPassword: password,
                phoneNumber: phone,
                otp:Number(otp)
            }
            try {
                const result: any = await Auth.register(data)
                if (result?.status === 200) {
                    localStorage.setItem('token', result?.data?.token)
                    localStorage.setItem('name', result?.data?.userData?.firstName)
                    router.push('/')
                }
            } catch (err: any) {
                console.log(err, 'error')
            }
        }
        setLoading(false)
    }
    const SendOtp = async () => {
        setLoading(true)
        if (email !== "") {
            const data: any = {
                email: email
            }
            try {
                const result: any = await Auth.generateOtp(data)

            } catch (err: any) {
                console.log(err, 'error')
            }
        } else {
            alert("please enter Email Address")
        }
        setLoading(false)
    }
    return (
        <div className='h-screen py-5 flex items-center transition duration-500 ease-in-out bg-gradient-to-r from-[#e61e78] via-[#ffc34a] to-[#e61e78] shadow-xl justify-center'>
            <div className='w-[50%] bg-white rounded p-5'>
                <p className='text-3xl font-bold text-gray-600'> Parents - Sign Up</p>
                <div className='grid grid-cols-2 mt-3 text-gray-600'>
                    <div className='p-2 col-span-1'>
                        <p className='text-md py-1 text-gray-600 font-bold'>First Name</p>
                        <input onChange={(e) => setFirstName(e.target.value)} type='text' className='w-full px-2 h-10 border border-gray-300' />
                        {errors.firstName && (
                            <p className="text-red-500 text-sm">{errors.firstName}</p>
                        )}
                    </div>
                    <div className='p-2 col-span-1'>
                        <p className='text-md py-1 text-gray-600 font-bold'>Last Name</p>
                        <input onChange={(e) => setLastName(e.target.value)} type='text' className='w-full px-2 h-10 border border-gray-300' />
                        {errors.lastName && (
                            <p className="text-red-500 text-sm">{errors.lastName}</p>
                        )}
                    </div>
                    <div className='p-2 col-span-1 '>
                        <p className='text-md py-1 text-gray-600 font-bold'>Email</p>
                        <input onChange={(e) => setEmail(e.target.value)} type='text' className='w-full px-2 h-10 border border-gray-300' />
                        {errors.email && (
                            <p className="text-red-500 text-sm">{errors.email}</p>
                        )}
                    </div>
                    <div className='p-2 col-span-1'>
                        <p className='text-md py-1 text-gray-600 font-bold'>Password</p>
                  <div className='flex text-black pl-3  h-10 border border-gray-300'>
                        <input onChange={(e) => setPassord(e.target.value)} type={eyeOpen ? 'text' : 'password'} className='w-full focus:outline-none' />
                        {eyeOpen ?
                            <FaEye className="text-gray-500 text-xl mt-2 mx-2" onClick={() => setEyeOpen(false)} /> :
                            <FaEyeSlash className="text-gray-500 text-xl mt-2 mx-2" onClick={() => setEyeOpen(true)} />}
                    </div>
                        {errors.password && (
                            <p className="text-red-500 text-sm">{errors.password}</p>
                        )}
                    </div>
                    <div className='p-2 col-span-1'>
                        <p className='text-md py-1 text-gray-600 font-bold'>Phone Number</p>
                        <input onChange={(e) => setPhone(e.target.value)} type='text' className='w-full px-2 h-10 border border-gray-300' />
                        {errors.phone && (
                            <p className="text-red-500 text-sm">{errors.phone}</p>
                        )}
                    </div>
                    <div className='p-2 col-span-1'>

                        <p className='text-md py-1 text-gray-600 font-bold'>Otp</p>
                        <div className='flex'>
                            <div className='w-[60%] pr-5'>
                                <input onChange={(e) => setOtp(e.target.value)} type='number' className='w-full px-2 h-10 border border-gray-300' />
                                {errors.otp && (
                                    <p className="text-red-500 text-sm">{errors.otp}</p>
                                )}
                            </div>
                            <button
                                onClick={() => SendOtp()}
                                className='w-[40%] h-10 font-semibold rounded transition duration-500 ease-in-out bg-gradient-to-r from-[#ffc34a] via-[#e61e78] to-[#f593fa] hover:to-[#fc0303] hover:from-[#e61e78] text-white transform transition-transform hover:scale-105'>
                                Send OTP
                            </button>
                        </div>
                    </div>
                </div>
                <div className='flex py-2'>
                    <input type='checkbox' className='h-4 w-4 mt-1' />
                    <p className='text-md text-gray-500 pl-2'>I agree to the <span className='text-blue-600'>terms and conditions</span>.</p>
                </div>
                <button
                    onClick={() => RegisterParrents()}
                    disabled={loading ? true : false}
                    className='w-full font-semibold rounded transition duration-500 ease-in-out bg-gradient-to-r from-[#ffc34a] via-[#e61e78] to-[#f593fa] hover:to-[#fc0303] hover:from-[#e61e78] text-white py-2 px-3 my-2 transform transition-transform hover:scale-105'
                > Sign Up</button>
                <p className='text-md text-gray-500 pt-5 text-center'>Already have an account? <Link href='/auth/signin'><span className='text-blue-600'>Sign in </span></Link></p>
            </div>
        </div>
    )
}

export default Signup