import React, { useState } from 'react'
import { DeleteIcon, Down_arrowBlk, ImgDeleteIcon, InputAddIcon, SaveCheckIcon, Search, VerifiedIcon } from '../Component/common/Icon'
import Phone_img1 from '../assets/images/png/Phone_img1.png'
import { FilterDropDown } from '../Component/FilterDropDown'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../Firebase2'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'


const CataAddNew = () => {
    const [searchCatgPopup, setSearchCatgPopup] = useState(false)
    const [isChecked, setIsChecked] = useState({
        publish: false,
        hidden: false,
    })
    const [freeIsChecked, setFreeIsChecked] = useState({
        yess: false,
        noo: false,
    })

    function inputChecked(e) {
        setIsChecked({
            publish: e.target.name === "publish",
            hidden: e.target.name === "hidden",
        })
        setFreeIsChecked({
            yess: e.target.name === "yess",
            noo: e.target.name === "noo",
        })
        // doubt ??? ??????????????????
        // setFreeIsChecked({
        //     ...freeIsChecked,
        //     [e.target.name]: e.target.checked,
        // })
    }

    function categoryPopup() {
        setSearchCatgPopup(true)
    }
    const optionsArr = ["Electronics", "Footwear", "Animal Suppliments", "Grocery"];
    const areaOpt = ["Hisar", "Hansi", "Rohtak", "Bhiwani"];
    const discountType = ["Amount", "Percentage"]

    const [updateImg, setUpdateImg] = useState(null);


    const [newProd, setNewProd] = useState({
        name: "",
        short_descrip: "",
        description: "",
        pin: "",
        area: "",
        ogPrice: "",
        discountType: "",
        discount: "",
        delvCharge: "",
        serviceCharge: "",
        commission: "",
        sku: "",
        totalStock: "",
        stockAlert: "",
        hidden: false,
        publish: false
    })
    function onchangeFunc(e) {
        setNewProd({ ...newProd, [e.target.name]: e.target.value })
    }
    async function SubmitData(e) {
        e.preventDefault()
        // console.log(newProd, "New Product")  // just to see if data is being saved.

        // // simple data upload :-
        // await addDoc(collection(db, "ProductData"), newProd);

        // // image upload + data add :-
        const storage = getStorage();
        const storageRef = ref(storage, `images/${updateImg.name}`);
        await uploadBytes(storageRef, updateImg)
        const downloadImg = await getDownloadURL(storageRef)
        const docRef = await addDoc(collection(db, "ProductData"), {
            newProd,
            url: downloadImg
        });

        setNewProd({
            name: " ",
            short_descrip: " ",
            description: " ",
            pin: "",
            area: "",
            ogPrice: "",
            discountType: "",
            discount: "",
            delvCharge: "",
            serviceCharge: "",
            commission: "",
            sku: "",
            totalStock: "",
            stockAlert: "",
            hidden: true,
            publish: true,
        })
    }

    function resetData() {
        setNewProd({
            name: " ",
            short_descrip: " ",
            description: " ",
            pin: "",
            area: "",
            ogPrice: "",
            discountType: "",
            discount: "",
            delvCharge: "",
            serviceCharge: "",
            commission: "",
            sku: "",
            totalStock: "",
            stockAlert: "",
            hidden: false,
            publish: false,
        })
    }



    return (
        <div>
            <div className='bg-[#F5F7FA] min-h-screen'>
                <div className="container p-5">
                    <div className='flex justify-between'>
                        <h1 className='text-[30px] font-medium '>New Product</h1>
                        <div className='flex gap-4 '>
                            {/* hover:bg-[#FFAE00] */}
                            <button onClick={resetData} className='reset_save_btn text-base font-normal p-[12px_15px] rounded-[10px]'><span className='gradient_clr'>Reset</span></button>
                            <button type='submit' onClick={SubmitData} className='reset_save_btn text-base font-normal p-[10px_15px] rounded-[10px] '>
                                <span className='gradient_clr flex gap-[10px] '>
                                    <span> <SaveCheckIcon /> </span>
                                    Save
                                </span>
                            </button>
                        </div>
                    </div>

                    <div className='flex flex-wrap -mx-2.5 mt-5'>
                        <section className='w-7/12 px-2.5 '>
                            {/* basic information  */}
                            <div className='bg-white p-5 shadow-[0px_1px_3px_0px_#00000033] '>
                                <p className='text-lg font-normal text-black '>Basic Information</p>
                                <form >
                                    <div className='mt-5'>
                                        <label className='text-sm font-normal text-black ' htmlFor="name">Name</label>
                                        <input onChange={onchangeFunc} value={newProd.name} className='p-[10px_15px] text-sm font-normal placeholder:text-[#00000080] w-full border-[.5px] border-[#0000004D] mt-2.5 focus:outline-none ' type="text" name='name' id='name' placeholder='Enter Product Name' />
                                    </div>
                                    <div className='mt-5'>
                                        <label className='text-sm font-normal text-black ' htmlFor="short_descrip">Short Description</label>
                                        <input onChange={onchangeFunc} value={newProd.short_descrip} className='p-[10px_15px] text-sm font-normal placeholder:text-[#00000080] w-full border-[.5px] border-[#0000004D] mt-2.5 focus:outline-none ' type="text" name='short_descrip' id='short_descrip' placeholder='Enter Short Description' />
                                    </div>
                                    <div className='mt-5'>
                                        <label className='text-sm font-normal text-black ' htmlFor="description">Description</label>
                                        <textarea onChange={onchangeFunc} value={newProd.
                                            description
                                        } className='p-[10px_15px] text-sm font-normal placeholder:text-[#00000080] w-full border-[.5px] border-[#0000004D] mt-2.5 focus:outline-none h-[114px]' type="text" name='description' id='description' placeholder='Enter more Detail'></textarea>

                                    </div>
                                </form>

                            </div>

                            {/* Availablity  */}
                            <div className='bg-white p-5 shadow-[0px_1px_3px_0px_#00000033] mt-5'>
                                <p className='text-lg font-normal text-black '>Availablity</p>
                                <p className='text-xs font-normal mt-1 '>Choose the areas where the product will be shown</p>
                                <div className='text-end my-5 '>
                                    <button className='text-lg font-normal text-[#54B435] '>+ Add More</button>
                                </div>

                                <form className='flex -mx-2.5 items-end mt-5'>
                                    <div className='w-5/12  px-2.5'>
                                        <label htmlFor="pin">Enter Pin Code</label>
                                        <input onChange={onchangeFunc} value={newProd.pin} className='p-[10px_15px] text-sm font-normal placeholder:text-[#00000080] w-full border-[.5px] border-[#0000004D] mt-2.5 focus:outline-none ' type="text" name='pin' id='pin' placeholder='125001' />
                                    </div>
                                    <div className='w-6/12  px-2.5'>
                                        <label htmlFor="area">Select area</label>
                                        {/* <select name="area" id="area" multiple >
                                            <option value="hisar">Hisar</option>
                                            <option value="jind">Jind</option>
                                            <option value="rohtak">Rohtak</option>
                                            <option value="hansi">Hansi</option>
                                        </select> */}
                                        <div className='flex items-center p-[10px_15px] border-[.5px] justify-between mt-2.5 border-[#0000004D]'>
                                            <FilterDropDown name="area"
                                                func={onchangeFunc}
                                                placeholder="Dabra Chowk" options={areaOpt} />
                                            <span><Down_arrowBlk /></span>
                                        </div>
                                    </div>
                                    <div className='w-1/12 px-2.5'>
                                        <div className='w-[36px] h-[36px] bg-[#FF00001A] p-2.5 '>
                                            <DeleteIcon />
                                        </div>
                                    </div>
                                </form>
                            </div>

                            {/* Pricing */}
                            <div className='bg-white p-5 shadow-[0px_1px_3px_0px_#00000033] mt-5'>
                                <p className='text-lg font-normal text-black my-5'>Pricing</p>

                                <form className='flex -mx-2.5 items-end mt-5'>
                                    <div className='w-4/12  px-2.5'>
                                        <label htmlFor="ogPrice">Original Price</label>
                                        <input onChange={onchangeFunc} value={newProd.ogPrice} className='p-[10px_15px] text-sm font-normal placeholder:text-[#00000080] w-full border-[.5px] border-[#0000004D] mt-2.5 focus:outline-none ' type="text" name='ogPrice' id='ogPrice' placeholder='₹ 0.00' />
                                    </div>
                                    <div className='w-4/12 px-2.5'>
                                        <label htmlFor="discountType">Discount Type</label>
                                        <div className='flex items-center p-[10px_15px] border-[.5px] justify-between mt-2.5 border-[#0000004D]'>
                                            <FilterDropDown name="discountType" func={onchangeFunc} placeholder="Amount" options={discountType} />
                                            <span><Down_arrowBlk /></span>
                                        </div>
                                    </div>
                                    <div className='w-4/12  px-2.5'>
                                        <label htmlFor="discount">Discount </label>
                                        <input onChange={onchangeFunc} value={newProd.discount} className='p-[10px_15px] text-sm font-normal placeholder:text-[#00000080] w-full border-[.5px] border-[#0000004D] mt-2.5 focus:outline-none ' type="text" name='discount' id='discount' placeholder='₹ 0.00' />
                                    </div>

                                </form>
                            </div>

                            {/* images  */}
                            <div className='bg-white p-5 shadow-[0px_1px_3px_0px_#00000033] mt-5'>
                                <p className='text-lg font-normal text-black '>Images</p>
                                <div className='mt-[26px] flex gap-5 '>

                                    <div className='relative '>
                                        {updateImg && <div>
                                            <span onClick={() => setUpdateImg(null)} className='absolute top-0 right-0 cursor-pointer'> <ImgDeleteIcon /> </span>
                                            <img src={updateImg && URL.createObjectURL(updateImg)} alt="img" /></div>}
                                    </div>
                                    <div className='border border-dashed border-[#50B848] rounded-[5px] bg-[#50B8481A] w-[121px] flex items-center justify-center cursor-pointer'>
                                        <label htmlFor="uploadImg" className='font-medium text-base text-[#50B848] tracking-[1px]  '>
                                            + Add Media
                                            <input onChange={(e) => setUpdateImg(e.target.files[0])} hidden type="file" name="" id="uploadImg" />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* side content  */}
                        <aside className='w-5/12 px-2.5  '>
                            {/* status  */}
                            <div className='bg-white p-5 shadow-[0px_1px_3px_0px_#00000033]'>
                                <p className='text-lg font-normal text-black '>Status</p>
                                <div className='my-5'>
                                    <div className='flex gap-5 items-center py-2.5 px-[15px] '>
                                        <input onChange={inputChecked} className='w-[24px] h-[24px] accent-black border border-black  ' checked={isChecked.publish} type="checkbox" name="publish" id="publish" />
                                        <label htmlFor="publish">Published</label>
                                    </div>
                                    <div className='flex gap-5 items-center py-2.5 ps-[15px] '>
                                        <input onChange={inputChecked} className='w-[24px] h-[24px] accent-black border border-black  ' checked={isChecked.hidden} type="checkbox" name="hidden" id="hidden" />
                                        <label htmlFor="hidden">Hidden</label>
                                    </div>
                                </div>
                                <div className='border-b-[.5px] border-[#00000033] '></div>
                                <div>

                                    {/* free Delivery */}
                                    <p className='text-lg font-normal text-black my-5'>Free Delivery</p>
                                    <div className='flex gap-2.5'>
                                        <div className='w-6/12 flex gap-5 items-center py-2.5 px-[15px] '>
                                            <input onChange={inputChecked} className='w-[24px] h-[24px] accent-black border border-black  ' checked={freeIsChecked.yess} type="checkbox" name="yess" id="yess" />
                                            <label htmlFor="yess">Yes</label>
                                        </div>
                                        <div className='w-6/12 flex gap-5 items-center py-2.5 ps-[15px] '>
                                            <input onChange={inputChecked} className='w-[24px] h-[24px] accent-black border border-black  ' checked={freeIsChecked.noo} type="checkbox" name="noo" id="noo" />
                                            <label htmlFor="noo">No</label>
                                        </div>
                                    </div>
                                    <form >
                                        <div className='mt-5'>
                                            <label className='text-sm font-normal text-black ' htmlFor="delvCharge">Delivery Charges</label>
                                            <input onChange={onchangeFunc} value={newProd.delvCharge} className='p-[10px_15px] text-sm font-normal placeholder:text-[#00000080] w-full border-[.5px] border-[#0000004D] mt-2.5 focus:outline-none ' type="text" name='delvCharge' id='delvCharge' placeholder='₹ 0.00' />
                                        </div>
                                        <div className='mt-5'>
                                            <label className='text-sm font-normal text-black ' htmlFor="serviceCharge">Service charge</label>
                                            <input onChange={onchangeFunc} value={newProd.serviceCharge} className='p-[10px_15px] text-sm font-normal placeholder:text-[#00000080] w-full border-[.5px] border-[#0000004D] mt-2.5 focus:outline-none ' type="text" name='serviceCharge' id='serviceCharge' placeholder='Amount' />
                                        </div>
                                        <div className='mt-5'>
                                            <label className='text-sm font-normal text-black ' htmlFor="commission">Sales man Commission</label>
                                            <input onChange={onchangeFunc} value={newProd.commission} className='p-[10px_15px] text-sm font-normal placeholder:text-[#00000080] w-full border-[.5px] border-[#0000004D] mt-2.5 focus:outline-none ' type="text" name='commission' id='commission' placeholder='₹ 0.00' />
                                        </div>
                                    </form>
                                </div>

                            </div>

                            {/* inventory */}
                            <div className='bg-white p-5 shadow-[0px_1px_3px_0px_#00000033] mt-5'>
                                <p className='text-lg font-normal text-black '>Inventory</p>
                                <form >
                                    <div className='mt-5'>
                                        <label className='text-sm font-normal text-black ' htmlFor="sku">SKU Charges</label>
                                        <input onChange={onchangeFunc} value={newProd.sku} className='p-[10px_15px] text-sm font-normal placeholder:text-[#00000080] w-full border-[.5px] border-[#0000004D] mt-2.5 focus:outline-none ' type="text" name='sku' id='sku' placeholder='6HK3I5' />
                                    </div>
                                    <div className='mt-5'>
                                        <label className='text-sm font-normal text-black ' htmlFor="totalStock">Total Stock <span className='text-[#00000080]'>( Purchase Value : ₹ 8000.00 )</span>
                                        </label>
                                        <div className='flex p-[10px_15px] border-[.5px] border-[#0000004D] mt-2.5'>
                                            <input onChange={onchangeFunc} value={newProd.totalStock} className=' text-sm font-bold placeholder:text-[#000] w-full focus:outline-none ' type="text" name='totalStock' id='totalStock' placeholder='50' />
                                            <span> <InputAddIcon /> </span>
                                        </div>
                                    </div>
                                    <div className='mt-5'>
                                        <label className='text-sm font-normal text-black ' htmlFor="stockAlert">Stock Alert Count</label>
                                        <input onChange={onchangeFunc} value={newProd.stockAlert} className='p-[10px_15px] text-sm font-normal placeholder:text-[#00000080] w-full border-[.5px] border-[#0000004D] mt-2.5 focus:outline-none ' type="text" name='stockAlert' id='stockAlert' placeholder='2' />
                                    </div>
                                </form>
                            </div>

                            {/* category  */}
                            <div className='bg-white p-5 shadow-[0px_1px_3px_0px_#00000033] mt-5'>
                                <p className='text-lg font-normal text-black '>Categories</p>
                                <div className='p-[10px_15px] border-[.5px] border-[#0000004D] mt-5'>
                                    <FilterDropDown name="category" func={onchangeFunc} placeholder="Search for Category" options={optionsArr} />

                                </div>

                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default CataAddNew

// category part 

{/* <div className='bg-white p-5 shadow-[0px_1px_3px_0px_#00000033] mt-5'>
                                <p className='text-lg font-normal text-black '>Categories</p>
                                <input onClick={categoryPopup} className='p-[10px_15px] text-sm font-normal placeholder:text-[#00000080] w-full border-[.5px] border-[#0000004D] mt-5 focus:outline-none ' type="search" name='searchCatg' id='searchCatg' placeholder='Search for Category' />
                            </div> */}

{/* category popup  */ }
{/* {searchCatgPopup && (
                                <div className='w-[300px] rounded-[5px] p-2.5 bg-white '>
                                    <div className='bg-[#EBEDF0]  p-3 flex items-center gap-3 rounded-[5px] '>
                                        <div><Search /></div>
                                        <input className='bg-transparent text-xs focus:outline-none w-full placeholder:text-[#0000004D] ' type="search" name="search" id="search" placeholder='Catel Feed' />
                                    </div>
                                    {CatalFeed.map((item, i) => {
                                        return (
                                            <div key={i} className='flex justify-between items-center p-[5px_10px]  '>
                                                <p className='text-black font-normal text-sm '>{item.product}</p>
                                                <span>{item.img} </span>
                                            </div>
                                        )
                                    })}
                                </div>
                            )} */}