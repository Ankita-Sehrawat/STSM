import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Component/common/Header'
import AsideBar from '../Component/common/AsideBar'

const Layout = () => {
  return (
    <div className='flex'>
      <div className='w-1/6 sticky top-0 bg-[#3D464D] min-h-screen '  >
        <AsideBar />
      </div>
      <div className='w-5/6'>
        <Header />
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
