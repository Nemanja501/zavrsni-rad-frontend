import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AllGalleries from './pages/AllGalleries'
import Login from './pages/Login'
import Register from './pages/Register'
import MyGalleries from './pages/MyGalleries'
import CreateNewGallery from './pages/CreateNewGallery'
import SingleGallery from './pages/SingleGallery'
import SingleAuthor from './pages/SingleAuthor'

function AppRouter() {
  return (
    <Routes>
        <Route path='/' element={<AllGalleries/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/my-galleries' element={<MyGalleries/>} />
        <Route path='/create' element={<CreateNewGallery/>} />
        <Route path='/galleries/:id' element={<SingleGallery/>} />
        <Route path='/authors/:id' element={<SingleAuthor/>} />
    </Routes>
  )
}

export default AppRouter