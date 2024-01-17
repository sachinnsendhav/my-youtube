import React from 'react'
import VideoDetails from '../VideoDetails'

function page(slug:any) {
    const id = slug?.params?.slug
    return (
        <VideoDetails id={id} />
    )
}

export default page