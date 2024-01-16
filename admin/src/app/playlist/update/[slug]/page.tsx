import React from 'react'
import UpdatePlayList from '../../Components/UpdatePlayList'

function page(slug:any) {
  const id = slug?.params?.slug
  return (
    <UpdatePlayList id={id}/>
  )
}

export default page