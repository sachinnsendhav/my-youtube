import React from 'react'
interface Props {
    title: string
}
function index({ title }: Props) {
    return (
        <p className='text-xl text-gray-700'>{title}</p>
    )
}

export default index