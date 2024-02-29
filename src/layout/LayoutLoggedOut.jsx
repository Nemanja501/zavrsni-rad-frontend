import React from 'react'
import Navigation from '../components/Navigation'

function LayoutLoggedOut() {
  return (
    <>
        <Navigation isLoggedIn={false}/>
    </>
  )
}

export default LayoutLoggedOut