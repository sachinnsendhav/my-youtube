import React from 'react'
interface Props {
    text: string,
    functionName?: any
}
function index({ text, functionName }: Props) {
    return (
        <button onClick={() => functionName ? functionName() : ''} className='rounded bg-[#005ebe] text-white py-2 px-3 transform transition-transform hover:scale-105'>{text}</button>
    )
}

export default index