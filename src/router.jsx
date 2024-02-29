import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AllGalleries from './pages/AllGalleries'
import Login from './pages/Login'
import Register from './pages/Register'
import MyGalleries from './pages/MyGalleries'
import CreateNewGallery from './pages/CreateNewGallery'

function AppRouter() {
  return (
    <Routes>
        <Route path='/' element={<AllGalleries/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/my-galleries' element={<MyGalleries/>} />
        <Route path='/create' element={<CreateNewGallery/>} />
    </Routes>
  )
}

export default AppRouter