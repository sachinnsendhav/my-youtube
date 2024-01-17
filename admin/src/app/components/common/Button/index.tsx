import React from 'react'
interface Props {
    text: string,
    functionName?: any
}
function index({ text, functionName }: Props) {
    return (
        <button onClick={() => functionName ? functionName() : ''} className='px-2 h-10 font-semibold rounded transition duration-500 ease-in-out bg-gradient-to-r from-[#ffc34a] via-[#e61e78] to-[#f593fa] hover:to-[#fc0303] hover:from-[#e61e78] text-white transform transition-transform hover:scale-105'>{text}</button>
    )
}

export default index