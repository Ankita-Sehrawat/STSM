import React, { useEffect, useState } from 'react'
import { FilterIcon, InputAddIcon, MenuDots } from '../Component/common/Icon'
import { Link, Outlet, useLocation } from 'react-router-dom'
import CrudPopUp from '../Component/CrudPopUp'
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import { db } from '../Firebase2'

const CataProdList = () => {
  const location = useLocation()
  const [data, setData] = useState([])
  const [count, setCount] = useState(0)
  const [selectedItems, setSelectedItems] = useState([]);
  const [showButtons, setShowButtons] = useState(false)

  useEffect(() => {
    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, "ProductData"));
      const val = []
      querySnapshot.forEach((doc) => {
        val.push({ id: doc.id, ...doc.data() })
      });
      setData(val)
      setCount(val.length)
    }
    fetchData()
  }, [])
  // console.log(data, "data");

  const [crudPop, setCrudPop] = useState(null);

  function crudPopFunc(index) {
    setCrudPop(crudPop === index ? null : index);
  }
  // Handle "select all" checkbox
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(data.map(item => item.id)); // Select all items
    }
    else {
      setSelectedItems([]); // Deselect all items
    }
  };

  // Handle individual checkbox
  const handleSelectItem = (id) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  function handleOnChecked() {
    setShowButtons(true)
  }
  async function DeleteProduct(id) {
    // setSelectedItems(data.map(item => ));
    for (const id of selectedItems) {
      await deleteDoc(doc(db, "ProductData", id));}
    // await deleteDoc(doc(db, "ProductData", id));
    // let filteredData = data.filter((value) => {
    //   return id !== value.id
    // })
    // setData(filteredData)

     // Update local data state to remove deleted products
     const filteredData = data.filter(item => !selectedItems.includes(item.id));
     setData(filteredData);
     setSelectedItems([]); 
     setShowButtons(false); 
     setCount(filteredData.length); 
  }

  let productList = location.pathname === '/catalog/prodList';

  return (
    <div>
      {productList &&
        <div className='bg-[#F5F7FA] min-h-screen'>
          <div className=" p-5">
            <div className='flex justify-between'>
              <h1 className='text-[30px] font-medium '>Products</h1>
              <div className='flex gap-4 '>
                <button className='bg-[#B5B5B5] text-base font-normal p-[10px_15px] rounded-[10px] '>
                  <span className='flex gap-[10px] '>
                    <span> <FilterIcon /> </span>
                    Filter
                  </span>
                </button>
                <Link to={'newProduct'}>
                  <button className='bg-[#FFAE00] text-base font-normal p-[12px_15px] rounded-[10px]'>
                    <span className=' flex gap-[10px] '>
                      <span> <InputAddIcon /> </span>
                      Add New Product
                    </span>
                  </button>
                </Link>
              </div>
            </div>
            {showButtons && (
              <div className='flex gap-5 mt-5'>
                <button className='bg-[#B5B5B5] text-base font-normal p-[10px_15px] rounded-[10px] '>Change to Draft  </button>
                <button className='bg-[#54B435] text-base font-normal p-[10px_15px] rounded-[10px] '>Change To Live </button>
                <button onClick={DeleteProduct} className='bg-[#DD0000] text-base font-normal p-[10px_15px] rounded-[10px] text-white'>Delete Products  </button>
              </div>
            )}


            <div className='flex gap-5 my-5'>
              <div className='w-3/12'>
                <div className='bg-white p-5 rounded-[7px] '>
                  <p className='text-[#F27121] font-bold text-2xl  '>Total Products</p>
                  <p className='text-black text-base font-normal mt-2.5 '>Total ({count} items)</p>
                </div>
              </div>
              <div className='w-3/12'>
                <div className='bg-white p-5 rounded-[7px] '>
                  <p className='text-[#BD011A] font-bold text-2xl  '>Low in Stock</p>
                  <p className='text-black text-base font-normal mt-2.5 '>Total (8 items)</p>
                </div>
              </div>
            </div>

            <div className=' h-[734px] overflow-scroll'>
              <div className=' w-[1383px] shadow-[0px_1px_3px_0px_#00000033] bg-white pt-5 px-5 pb-0  '>
                <table className='w-full '>
                  <thead className='sticky top-0  z-50 bg-white border-b border-b-[#0000003D]'>
                    <tr>
                      <th className='p-[15px] text-start w-[54px] text-nowrap'>
                        <input className='w-[24px] h-[24px] accent-black border border-black ' type="checkbox" name="allSelect" id="allSelect" checked={selectedItems.length === data.length}
                          onChange={handleSelectAll}
                          onClick={handleOnChecked}
                        />
                      </th>
                      <th className='text-base font-normal p-[17px_20px_17px_7px] text-start w-[280px] text-nowrap '>Product</th>
                      <th className='text-base font-normal p-[17px_20px] text-start w-[300px] text-nowrap '>Short Description</th>
                      <th className='text-base font-normal p-[17px_20px] text-start w-[200px] text-nowrap '>Category</th>
                      <th className='text-base font-normal p-[17px_20px] text-start w-[130px] text-nowrap '>Stock</th>
                      <th className='text-base font-normal p-[17px_20px] text-start w-[130px] text-nowrap '>Status</th>
                      <th className='text-base font-normal p-[17px_20px] text-start w-[160px] text-nowrap '>Price</th>
                      <th className='text-base font-normal p-[17px_20px] text-start w-[90px] text-nowrap '>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, i) => {
                      return (
                        <tr key={i} >
                          <td className='p-[20px_15px] '>
                            <input className='w-[24px] h-[24px] accent-black border border-black ' type="checkbox"
                              checked={selectedItems.includes(item.id)}
                              onChange={() => handleSelectItem(item.id)}
                              onClick={handleOnChecked}
                            />
                          </td>

                          <td className=' p-[17px_20px_17px_7px] flex items-center gap-5 '>
                            <div className='w-[40px] h-[40px] '>
                              <img className='w-full object-cover' src={item.url} alt="img" />
                            </div>
                            <div>
                              <p className='text-base font-normal text-black'>{item.name}</p>
                              <p className='text-[#00000080] text-xs font-normal  '>
                                ID : {item.id} | SKU : {item.sku}
                              </p>
                            </div>
                          </td>

                          <td className='text-base font-normal   p-[17px_20px] '>
                            <p className='line-clamp-2'>{item.
                              short_descrip}</p> </td>
                          <td className='text-base font-normal   p-[17px_20px] '>{item.category} </td>

                          <td className='p-[17px_20px]'>
                            <div className={`p-[5px_10px] rounded-[5px] ${item.totalStock === "0" || !item.totalStock ? 'bg-[#DD000026]' : 'bg-[#54B43533]'}`}>
                              <p className={`text-sm font-normal text-center text-nowrap ${item.totalStock === "0" || !item.totalStock ? 'text-[#DD0000]' : ''}`}>
                                {item.totalStock === "0" || !item.totalStock ? 'Out of Stock' : `${item.totalStock} in Stock`}
                              </p>
                            </div>
                          </td>

                          <td className={`text-base font-normal p-[17px_20px] ${item.hidden ? 'text-[#DD0000]' : 'text-black'}`}> {item.publish ? "published" : item.hidden ? "draft" : ""} </td>

                          <td className='text-base font-normal  p-[17px_20px] '> ₹ {item.ogPrice} </td>

                          <td onClick={() => crudPopFunc(i)} className='p-[20px_33px] cursor-pointer relative '>
                            <span className='relative z-10'><MenuDots /></span>
                            <div className='absolute top-0 right-0 z-50'>
                              {crudPop === i && <CrudPopUp index={item.id} data={data} setData={setData} />}
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>}
      <Outlet />
    </div>
  )
}

export default CataProdList
