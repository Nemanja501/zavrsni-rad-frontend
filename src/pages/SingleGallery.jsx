import React from 'react'
import { useParams } from 'react-router-dom'

function SingleGallery() {
  const {id} = useParams();  

  return (
    <div>SingleGallery {id}</div>
  )
}

export default SingleGallery