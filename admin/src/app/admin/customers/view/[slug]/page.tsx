import React from 'react'
import ViewCustomerDetails from '../../components/ViewCustomerDetails'
function page(slug:any) {
    const id = slug?.params?.slug
    return (
        <ViewCustomerDetails id={id} />
    )
}

export default page