import React from 'react'
import UpdateUser from '../../Components/UpdateUser'

function page(slug:any) {
  const id = slug?.params?.slug
  return (
    <UpdateUser id={id}/>
  )
}

export default page