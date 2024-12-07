import React, { useState } from 'react'
import { Cata_icon, Commun_icon, Dash_icon, Down_arrow, FaqIcon, Mkt_icon, Privacy_icon, Setting_icon, Sip_icon, Term_icon, Transaction_icon, User_icon } from './Icon'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/png/logo.png'



const catalog = [
    { id: 1, options: 'Option1', redirect: '/cata1' },
    { id: 2, options: 'Option2', redirect: '/cata2' },
    { id: 3, options: 'Option3', redirect: '/cata3' },
]


const AsideBar = () => {

    let [toggle, setToggle] = useState(false);

    let toggle_dropdown = (value) => {
        setToggle(toggle == value ? null : value)
    }

    return (
        <div>
            <div className='py-[10px] px-11 bg-[#FFAE00] flex gap-[10px] '>
                <div> <img src={logo} alt="logo" /> </div>
                <button className='text-xs font-normal py-[3px] px-[10px] bg-white '>ADMIN</button>
            </div>

            <div className='px-0'>

                <Link to='/' className='flex gap-[10px] items-center py-3 px-5 aside_icon_hover '>
                    <span> <Dash_icon /></span>
                    <p className='text-sm font-normal text-[#fff] '>Dashboard</p>
                </Link>

                {/* catalog */}
                <Link>
                    <div onClick={() => { toggle_dropdown("catalog") }} className='aside_icon_hover flex justify-between items-center pe-5'>
                        <div className='flex gap-[10px] items-center py-3 px-5'>
                            <span> <Cata_icon /></span>
                            <p className='text-sm font-normal text-[#fff] '>Catalog</p>
                        </div>
                        <div className=' downArrHover'><Down_arrow /> </div>
                    </div>

                    {toggle == "catalog" && <div className='dropdown bg-transparent flex flex-col gap-2 pb-2 '>
                        <Link to=''><button className='text-white hover:text-[#FFAE00] text-sm font-normal py-3 ps-[46px]'>Category List</button></Link>
                        <Link>  <button className='text-white hover:text-[#FFAE00] text-sm font-normal py-3 ps-[46px]'>Add Category</button></Link>
                        <Link to='catalog/prodList'>  <button className='text-white hover:text-[#FFAE00] text-sm font-normal py-3 ps-[46px]'>Product List</button></Link>
                        <Link to='catalog/addProduct'> <button className='text-white hover:text-[#FFAE00] text-sm font-normal py-3 ps-[46px]'>Add Product</button></Link>
                    </div>}
                </Link>

                {/* customer  */}
                <Link>
                    <div onClick={() => { toggle_dropdown("customer") }} className=' flex justify-between items-center aside_icon_hover pe-5 '>
                        <div className='flex gap-[10px] items-center py-3 px-5 '>
                            <span> <User_icon /></span>
                            <p className='text-sm font-normal text-[#fff] '>Customers</p>
                        </div>
                        <div className='downArrHover'><Down_arrow /> </div>
                    </div>

                    {toggle == "customer" && <div className='dropdown bg-transparent flex flex-col gap-2 pb-2 '>
                        <Link to='/cata1'><button className='text-white hover:text-[#FFAE00] text-sm font-normal py-3 ps-[46px] '>option1</button></Link>
                        <Link>  <button className='text-white hover:text-[#FFAE00] text-sm font-normal py-3 ps-[46px] '>option2</button></Link>
                    </div>}
                </Link>

                {/* order  */}
                <Link>
                    <div onClick={() => { toggle_dropdown("order") }} className=' flex justify-between items-center aside_icon_hover pe-5'>
                        <div className='flex gap-[10px] items-center py-3 px-5'>
                            <span> <Sip_icon /></span>
                            <p className='text-sm font-normal text-[#fff] '>Orders</p>
                        </div>
                        <div className=' downArrHover'><Down_arrow /> </div>
                    </div>

                    {toggle == "order" && <div className='dropdown bg-transparent flex flex-col gap-2 pb-2 '>
                        <Link to='/cata1'><button className='text-white hover:text-[#FFAE00] text-sm font-normal py-3 ps-[46px] '>option1</button></Link>
                        <Link>  <button className='text-white hover:text-[#FFAE00] text-sm font-normal py-3 ps-[46px] '>option2</button></Link>
                    </div>}
                </Link>

                {/* marketing */}
                <Link>
                    <div onClick={() => { toggle_dropdown("mkt") }} className=' flex justify-between items-center aside_icon_hover pe-5'>
                        <div className='flex gap-[10px] items-center py-3 px-5 '>
                            <span> <Cata_icon /></span>
                            <p className='text-sm font-normal text-[#fff] '>Marketing</p>
                        </div>
                        <div className=' downArrHover'><Down_arrow /> </div>
                    </div>

                    {toggle == "mkt" && <div className='dropdown bg-transparent flex flex-col gap-2 pb-2 '>
                        <Link to='/mkt1'> <button className='text-white hover:text-[#FFAE00] text-sm font-normal py-3 ps-[46px]  '>mkt1</button></Link>
                        <Link> <button className='text-white hover:text-[#FFAE00] text-sm font-normal py-3 ps-[46px]  '>mkt2</button></Link>
                    </div>}
                </Link>


                {/* communication  */}
                <Link>
                    <div onClick={() => { toggle_dropdown("communication") }} className=' flex justify-between items-center aside_icon_hover pe-5'>
                        <div className='flex gap-[10px] items-center py-3 px-5 '>
                            <span> <Sip_icon /></span>
                            <p className='text-sm font-normal text-[#fff] '>Communication</p>
                        </div>
                        <div className=' downArrHover'><Down_arrow /> </div>
                    </div>

                    {toggle == "communication" && <div className='dropdown bg-transparent flex flex-col gap-2 pb-2 '>
                        <Link to='/com'><button className='text-white hover:text-[#FFAE00] text-sm font-normal py-3 ps-[46px] '>option1</button></Link>
                        <Link>  <button className='text-white hover:text-[#FFAE00] text-sm font-normal py-3 ps-[46px] '>option2</button></Link>
                    </div>}
                </Link>

                <Link to='/transaction' className='flex gap-[10px] items-center aside_icon_hover py-3 px-5'>
                    <span> <Transaction_icon /></span>
                    <p className='text-sm font-normal text-[#fff] '>Invoices</p>
                </Link>


                <Link to='/Faq' className='flex gap-[10px] items-center py-3 px-5 aside_icon_hover'>
                    <span> <FaqIcon /></span>
                    <p className='text-sm font-normal text-[#fff] '>FAQs</p>
                </Link>

                <Link to='/privacy' className='flex gap-[10px] items-center py-3 px-5 aside_icon_hover'>
                    <span> <Privacy_icon /></span>
                    <p className='text-sm font-normal text-[#fff] '>Privacy Policy</p>
                </Link>

                <Link to='/term' className='flex gap-[10px] items-center py-3 px-5 aside_icon_hover'>
                    <span> <Term_icon /></span>
                    <p className='text-sm font-normal text-[#fff] text-nowrap'>Terms and Conditions</p>
                </Link>

                {/* setting */}
                <Link>
                    <div onClick={() => { toggle_dropdown("set") }} className=' flex justify-between items-center aside_icon_hover pe-5 '>
                        <div className='flex gap-[10px] items-center py-3 px-5'>
                            <span> <Setting_icon /></span>
                            <p className='text-sm font-normal text-[#fff] '>Setting</p>
                        </div>
                        <div className='downArrHover'><Down_arrow /> </div>
                    </div>

                    {toggle == "set" && <div className='dropdown bg-transparent flex flex-col gap-2 pb-2 '>
                        <Link to='/set1'> <button className='text-white hover:text-[#FFAE00] text-sm font-normal py-3 ps-[46px]  '>set1</button></Link>
                        <Link>  <button className='text-white hover:text-[#FFAE00] text-sm font-normal py-3 ps-[46px]'>set2</button></Link>
                    </div>}
                </Link>


            </div>
        </div>

    )
}

export default AsideBar