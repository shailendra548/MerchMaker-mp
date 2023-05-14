import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../main/Navbar'
import Footer from './Footer'

const User = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer/>
    </div>
  )
}

export default User