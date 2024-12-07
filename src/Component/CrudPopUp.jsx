import React from 'react'
import { DeleteIcon, EditIcon, HiddenIcon, ViewIcon } from './common/Icon'
import { doc, deleteDoc, setDoc, documentId, updateDoc } from "firebase/firestore";
import { db } from '../Firebase2';
import { Link } from 'react-router-dom';

const CrudPopUp = ({ index, setData, data }) => {

    async function deleteData(id) {
        await deleteDoc(doc(db, "ProductData", id));
        let filteredData = data.filter((value) => {
            return id !== value.id
        })
        setData(filteredData)
    }
    async function changeToHidden(id) {
        // Update the status in Firestore
        const productRef = doc(db, "ProductData", id);
        await updateDoc(productRef, {
            publish: false,
            hidden: true
        });

        // Update the local state to reflect the change
        const updatedData = data.map(item => 
            item.id === id ? { ...item, publish: false, hidden: true } : item
        );
        setData(updatedData);
    }

    // async function EditData(id) {
    //     console.log(id)
    // }



    return (
        <div>
            <div className='w-[190px] bg-white shadow-[0px_1px_3px_0px_#00000033]  '>
                <button className='p-2.5 flex gap-2.5 items-center '>
                    <span><ViewIcon /> </span>
                    <p className='text-base font-normal text-black '>View Details</p>
                </button>
                <Link to={`update-product/${index}`}
                    // onClick={() => EditData(index)}
                    className='p-2.5 flex gap-2.5 items-center '>
                    <span><EditIcon /> </span>
                    <p className='text-base font-normal text-black '>Edit Product</p>
                </Link>
                <button onClick={() => changeToHidden(index)} className='p-2.5 flex gap-2.5 items-center '>
                    <span><HiddenIcon /> </span>
                    <p className='text-base font-normal text-[#54B435] '>Change to Hidden</p>
                </button>
                <button onClick={() => deleteData(index)} className='p-2.5 flex gap-2.5 items-center '>
                    <span><DeleteIcon /> </span>
                    <p className='text-base font-normal text-[#DD0000] '>Delete</p>
                </button>
            </div>
        </div>
    )
}

export default CrudPopUp
