import React from 'react'
import Navigation from '../components/Navigation'

function LayoutLoggedIn() {
  return (
    <>
        <Navigation isLoggedIn={true}/>
    </>
  )
}

export default LayoutLoggedIn