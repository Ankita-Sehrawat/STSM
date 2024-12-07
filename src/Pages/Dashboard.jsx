import React, { useEffect, useState } from 'react'
import { Dots, MenuDots } from '../Component/common/Icon'
import { Recent_regist_table, Sml_table_data } from '../Component/common/Helper'
import graph from '../assets/images/png/Graph.png'
import roundGraph from '../assets/images/png/roundGraph.png'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../Firebase2'


const Dashboard = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, "ProductData"));
      const val = []
      querySnapshot.forEach((doc) => {
        val.push({ id: doc.id, ...doc.data() })
      });
      setData(val)
    }
    fetchData()
  }, [])

  return (
    <div className='bg-[#F5F7FA] '>
      <div className=" p-5">
        <div className='flex justify-between'>
          <h1 className='text-[30px] font-medium '>Dashboard</h1>
          <button className='export_btn text-base text-white font-normal p-[12px_15px] rounded-[10px]'>Export</button>
        </div>

        {/* cards of total sells ..... : */}
        <div className='flex flex-wrap mt-5 -mx-[15px] ' >
          <div className='w-4/12 px-[15px]  '>
            <div className="px-2 py-3 xl:p-5 bg-[#fff] h-full rounded-[10px] shadow-[0px_1px_3px_0px_#00000033] ">
              <div className='flex justify-between '>
                <p className='text-sm font-normal text-[#00000080]  '>Total Sells</p>
                <div> <MenuDots /> </div>
              </div>
              <div className='mt-5 flex justify-between items-center '>
                <p className='text-[23px] text-nowrap min-[1120px]:text-[30px] font-medium  '>₹ 50680.00</p>
                <div className='text-right'>
                  <p className='text-[#54B435] text-sm font-normal  '>15.3%</p>
                  <p className='text-[10px] font-normal text-[#00000080] w-[70px] min-[1120px]:w-[80px] mt-1'>Compared to Last Month</p>
                </div>
              </div>
            </div>
          </div>

          <div className='w-4/12 px-[15px]  '>
            <div className="px-2 py-3 xl:p-5 bg-[#fff] h-full rounded-[10px] shadow-[0px_1px_3px_0px_#00000033] ">
              <div className='flex justify-between '>
                <p className='text-sm font-normal text-[#00000080]  '>Average Order Value</p>
                <div> <MenuDots /> </div>
              </div>
              <div className='mt-5 flex justify-between items-center '>
                <p className='text-[23px] text-nowrap min-[1120px]:text-[30px] font-medium  '>₹ 1234.00</p>
                <div className='text-right'>
                  <p className='text-[#DD0000] text-sm font-normal  '>15.3%</p>
                  <p className='text-[10px] font-normal text-[#00000080] w-[70px] min-[1120px]:w-[80px] mt-1'>Compared to Last Month</p>
                </div>
              </div>
            </div>
          </div>

          <div className='w-4/12 px-[15px]  '>
            <div className=" px-2 py-3 xl:p-5 bg-[#fff] h-full  rounded-[10px] shadow-[0px_1px_3px_0px_#00000033] ">
              <div className='flex justify-between '>
                <p className='text-sm font-normal text-[#00000080]  '>Total Sells</p>
                <div> <MenuDots /> </div>
              </div>
              <div className='mt-5 flex justify-between items-center '>
                <p className='text-[23px] text-nowrap min-[1120px]:text-[30px] font-medium  '>238</p>
                <div className='text-right'>
                  <p className='text-[#54B435] text-sm font-normal  '>15.3%</p>
                  <p className='text-[10px] font-normal text-[#00000080] w-[70px] min-[1120px]:w-[80px] mt-1 '>Compared to Last Month</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* table and graph : */}
        <div className='mt-5 flex gap-[20px]'>
          {/* table  */}
          <div className='w-3/12 p-2.5 shadow-[0px_1px_3px_0px_#00000033] rounded-[10px] bg-white h-[290px] overflow-y-scroll overflow-x-hidden '>
            <div className='flex justify-between'>
              <p className='text-base font-normal py-[14px] text-nowrap '>Recent Transaction</p>
              <p className='py-[14px] ps-14'><Dots /></p>
            </div>

            <div className='bg-[#EBEDF0] p-2.5 w-full '>
              <p className='text-[30px] font-medium text-black text-center'>34</p>
            </div>
            <table className='w-full'>
              <thead className='sticky top-0 bg-white '>
                <tr>
                  <th className='text-sm font-normal text-[#00000080] text-start ' >City</th>
                  <th className='text-sm font-normal text-[#00000080] text-end ' >Users</th>
                </tr>
              </thead>

              <tbody className=''>
                {data.map((item, i) => {
                  return (
                    <tr key={i} className='border-t-[.5px] border-[#00000026] '>
                      <td className='text-sm font-normal text-start py-[1.5px] '>{item.area} </td>
                      <td className='text-base font-normal text-end py-[1.5px] '>78 </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Graph  */}
          <div className='w-9/12'>
            <img className='w-full h-[290px] ' src={graph} alt="graph_img" />
          </div>

        </div>

        {/* footer  */}
        <div className='mt-5 flex -mx-2.5 '>
          {/* Recent Orders  */}
          <div className='w-9/12 px-2.5'>
            <div className='bg-white p-2.5 shadow-[0px_1px_3px_0px_#00000033] rounded-[10px]  '>
              <div className='flex justify-between py-5'>
                <h1 className='text-base font-bold  text-nowrap '>Recent Orders</h1>
                <div> <MenuDots /> </div>
              </div>
              <div className=' h-[407px] overflow-y-auto'>
                <table className='w-full '>
                  <thead className='sticky top-0 bg-white z-50'>
                    <tr className=' border-b border-b-[#0000003D]  '>
                      <th className='text-base p-[7px_20px] font-normal text-start w-[50px] text-nowrap '>No.</th>
                      <th className='text-base p-[7px_20px] font-normal text-start w-[70px] text-nowrap '>Status</th>
                      <th className='text-base p-[7px_20px] font-normal text-start w-[100px] text-nowrap '>City</th>
                      <th className='text-base p-[7px_20px] font-normal text-start w-[250px] text-nowrap '>Customer</th>
                      <th className='text-base p-[7px_20px] font-normal text-start w-[82px] text-nowrap '>Date</th>
                      <th className='text-base p-[7px_20px] font-normal text-start w-[70px] text-nowrap '>Total</th>
                    </tr>
                  </thead>


                  <tbody>
                    {data.map((item, i) => {
                      return (
                        <tr key={i} className=' border-t-[.5px] border-[#00000026]'>
                          <td className='text-base p-[10px_20px] font-normal text-nowrap opacity-85  '>{item.id} </td>

                          <td className='p-[17px_20px]'>
                            <div className={`p-[3px_5px] rounded-[3px] ${item.hidden ? 'bg-[#FFDCDC]' : item.publish ? 'bg-[#DEF2D0]' : 'bg-[#D9ECFF]'} `}>
                              <p className={`text-xs font-normal text-nowrap ${item.hidden ? 'text-[#990000]' : 'text-[#245900]'} `}>{item.publish ? "Completed" : item.hidden ? "Cancelled" : "Pending"}</p>
                            </div>
                          </td>

                          <td className='text-base p-[10px_20px] font-normal text-nowrap opacity-85  '>{item.area} </td>
                          <td className='text-base p-[10px_20px] font-normal text-nowrap opacity-85  '>John doe </td>
                          <td className='text-base p-[10px_20px] font-normal text-nowrap opacity-85  '>{item.datePurchase} </td>
                          <td className='text-base p-[10px_20px] font-normal text-nowrap opacity-85  '>₹  {item.purchaseValue} </td>
                        </tr>
                      )
                    })}
                  </tbody>

                </table>
              </div>

            </div>
          </div>

          {/* Sales by source  */}
          <div className='w-3/12 px-2.5'>
            <div className='bg-white p-5 rounded-[10px] shadow-[0px_1px_3px_0px_#00000033] h-full  '>
              <div className='flex justify-between'>
                <p className='text-base font-normal text-black'>Sales by source</p>
                <div><MenuDots /> </div>
              </div>

              <div className='my-5'>
                <img src={roundGraph} alt="img" />
              </div>

              <table className='w-full'>
                <thead className='sticky top-0 bg-white '>
                  <tr>
                    <th className='w-[88px] text-xs font-normal py-[5px] text-[#00000080] text-start'>Source</th>
                    <th className='w-[50px] text-xs font-normal py-[5px] text-[#00000080] text-center'>Orders</th>
                    <th className='w-[70px] text-xs font-normal py-[5px] text-[#00000080] text-end'>Amount</th>
                  </tr>
                </thead>

                <tbody >
                  <tr className='border-t-[.5px] border-[#00000026] '>
                    <td className='text-xs font-normal py-[5px] text-black text-start '>Direct </td>
                    <td className='text-xs font-normal py-[5px] text-black text-center '> 110</td>
                    <td className='text-xs font-normal py-[5px] text-black text-end '>₹45,368.00 </td>
                  </tr>
                  <tr className='border-t-[.5px] border-[#00000026] '>
                    <td className='text-xs font-normal py-[5px] text-black text-start '>Direct</td>
                    <td className='text-xs font-normal py-[5px] text-black text-center '> 110</td>
                    <td className='text-xs font-normal py-[5px] text-black text-end '>₹45,368.00 </td>
                  </tr>
                </tbody>
              </table>

            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Dashboard
