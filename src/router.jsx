import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import AllGalleries from './pages/AllGalleries'
import Login from './pages/Login'
import Register from './pages/Register'
import MyGalleries from './pages/MyGalleries'
import CreateNewGallery from './pages/CreateNewGallery'
import SingleGallery from './pages/SingleGallery'
import SingleAuthor from './pages/SingleAuthor'
import NotFound from './pages/NotFound'
import { tokenContext } from './contexts/tokenContext'

function AppRouter() {
  const {token, setToken} = useContext(tokenContext);

  return (
    <Routes>
        <Route path='/' element={<AllGalleries/>} />
        <Route path='/galleries/:id' element={<SingleGallery/>} />
        <Route path='/authors/:id' element={<SingleAuthor/>} />
        {token ? <>
        <Route path='/my-galleries' element={<MyGalleries/>} />
        <Route path='/create' element={<CreateNewGallery/>} />
        <Route path='/edit-gallery/:id' element={<CreateNewGallery/>} />
        </> : <>
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        </>}
        <Route path='*' element={<NotFound/>} />
    </Routes>
  )
}

export default AppRouter