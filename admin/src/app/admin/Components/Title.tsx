import React from 'react'
interface Props {
    title: string
}
function Title({ title }: Props) {
    return (
        <p className='text-xl text-gray-700'>{title}</p>
    )
}

export default Title