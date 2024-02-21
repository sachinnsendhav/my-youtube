import React from 'react'
import Channel from '../Channel'


function page(slug:any) {
    const id = slug?.params?.slug
    return (
        <Channel id={id} />
    )
}

export default page