import React from 'react'
import ViewPlayListById from '../../Components/ViewPlayListById'

function page(slug:any) {
  const id = slug?.params?.slug
  return (
    <ViewPlayListById id={id} />
  )
}

export default page