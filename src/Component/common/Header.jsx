import React from 'react'
import { Menu, Notify, Search } from './Icon'

const Header = () => {
  return (
    <div>
      <div className='container py-[7px] px-[10px] '>
        <div className='flex items-center justify-between'>
        <div className='w-[75%] flex gap-3 items-center'>
          <div><Menu /></div>
          <div className='bg-[#EBEDF0] p-3 flex items-center gap-3 w-[360px] '>
            <div><Search/></div>
            <input className='bg-transparent text-xs focus:outline-none w-full' type="search" name="search" id="search" placeholder='Search in the admin panel' />
          </div>
        </div>
        <div><Notify/></div>
        </div>
      </div>
    </div>
  )
}

export default Header
