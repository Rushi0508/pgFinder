import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { getToastOptions } from "../assets/toastOptions";
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

export const Propertycard = ({ item, PropertyCardType }) => {
    // console.log(item.title);
    const { title, price, contactNo, unit, location, images, description, _id:itemId } = item;
    const userId = localStorage.getItem('user_id')
    const token = localStorage.getItem('jwt_token')
    const navigate = useNavigate();

    const handleEditProperty = ()=>{
        navigate("/pg/update",{
            state:{
                item
            }
        })
    };
    const handleRemoveProperty = async (e)=>{
        e.preventDefault();
        const {data} = axios.delete(
            `http://localhost:5000/api/property/delete/${itemId}`,
            {
                headers: {
                    Authorization: `${token}`,
                }
            }
        );
        if(data.loginRequired){
            navigate('/login')
            localStorage.removeItem('jwt_token')
            localStorage.removeItem('user_id')
        }
        else if(data.status){
            toast.success("Your  Pg successfully removed", getToastOptions);
            setTimeout(() => {
                navigate("/pg/my");
            }, 2000);
        }
        else{
            toast.error("Please try again", getToastOptions);
        }
    };

    const handlePropertyDetail = ()=>{
        navigate(`/pg/${itemId}`,{
            state:{
                item
            }
        })
    }

    return (
        <>
        <div className='bg-gray-100 py-2 gap-x-4 rounded-md flex flex-col space-y-4 sm:flex-row sm:justify-start bg-opacity-30'>
            <div className='sm:w-2/5 lg:w-1/3 flex items-center justify-center p-3'>
                <img className='rounded-md h-48 object-cover' src={images[0]} alt="" />
            </div>
            <ul className=' sm:space-y-2'>
                <li className='flex justify-between'>
                    <span className='text-lg sm:text-xl font-semibold'>{title}</span>
                    <span className='text-md font-medium'>{price}$/{unit}</span>
                </li>
                <li className='text-left  text-lg'>{description}</li>
                <li className='text-left  text-lg'>{location}</li>

                 {
                    PropertyCardType === "Readable" ?
                    <li className='text-left sm:text-right'>
                        <button 
                        onClick={handlePropertyDetail}
                        className='bg-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-700 text-white text-xl'>
                            view Pg Details
                        </button>
                    </li> :               
                    <li className='flex justify-end gap-x-5 px-4'>
                        <button 
                        onClick={handleEditProperty}
                        className='bg-indigo-500 p-3 font-medium rounded-md hover:bg-indigo-600 text-white '>
                            Edit Property
                        </button>
                        <button 
                        onClick={handleRemoveProperty}
                        className='bg-red-500 p-3 rounded-md hover:bg-red-600 text-white  font-medium'>
                            Remove Property
                        </button>
                    </li>
                    } 
            </ul>

        </div>
        <Toaster />
        </>
    )
}
