import React from 'react'
import ViewUser from '../../Components/ViewUser'

function page(slug:any) {
  const id = slug?.params?.slug
  return (
    <ViewUser  id={id}/>
  )
}

export default page