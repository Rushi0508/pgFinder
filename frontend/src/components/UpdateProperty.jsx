import React, { useEffect, useState } from 'react';
import {BackGround} from './Backgroud';
import axios from 'axios';
import { getToastOptions } from "../assets/toastOptions";
import toast, { Toaster } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function UpdateProperty() {

    const token = localStorage.getItem('jwt_token')
    const userId = localStorage.getItem('user_id')
    const navigate = useNavigate();

    const Location = useLocation();
    const getItem = Location.state.item;
    const {title, price, contactNo, unit,location, description ,images } = getItem;
    const ItemId = getItem._id;
    const UpdatePgObject = {title, price, contactNo, description ,location,unit, images};

    const [UpdatePg, setUpdatePg] = useState(UpdatePgObject);

    const handleUpdate = async (e)=>{
        e.preventDefault();
        const bodyObject = {...UpdatePg, userId:userId};
        const {data} = await axios.put(
            `http://localhost:5000/api/property/edit/${ItemId}`,
            bodyObject,
            {
                headers: {
                    Authorization: `${token}`,
                }
            }
        )
        if(data.loginRequired){
            navigate('/login')
            localStorage.removeItem('jwt_token')
            localStorage.removeItem('user_id')
        }
        else if(data.status){
            toast.success("Your New Pg successfully updated", getToastOptions);
            setTimeout(() => {
                navigate("/pg/my");
            }, 2000);
        }
        else{
            toast.error("Please try again", getToastOptions);
        }
        console.log(response);
    }
    useEffect(()=>{
        if(!token){
            navigate('/login');
        }
    })
  return (
    <>
    <BackGround>
                <div className='bg-gray-100 bg-opacity-40 w-full h-full p-4 rounded-md shadow-gray-500 shadow-sm'>
                <nav className="mb-4  flex  sm:flex-row items-center justify-between py-4 px-6 bg-gray-200 w-full rounded-lg backdrop-filter backdrop-blur-sm bg-clip-text bg-opacity-80 ">
                <div className="mb-2 sm:mb-0 rounded-lg">
                    <Link
                        to="/"
                        className="text-2xl no-underline text-indigo-600 hover:text-blue-dark font-bold"
                    >
                    pgFinder
                    </Link>
                </div>
                <div>
                    <Link
                        to="/pg"
                        className="font-medium text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2"
                    >
                        Your PGs
                    </Link>
                 
                </div>
            </nav>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-2 rounded-lg">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Create Property
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <div className="space-y-6" >
                            <div>
                                <div className="flex ">
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                        Title
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="title"
                                        name="title"
                                        type="text"
                                        value={UpdatePg.title}
                                        onChange={(e)=>setUpdatePg({...UpdatePg,[e.target.name]:e.target.value})}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 input-field"
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex ">
                                    <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                        Price
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="price"
                                        name="price"
                                        type="text"
                                        value={UpdatePg.price}
                                        onChange={(e)=>setUpdatePg({...UpdatePg,[e.target.name]:e.target.value})}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 input-field"
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex ">
                                    <label htmlFor="unit" className="block text-sm font-medium leading-6 text-gray-900">
                                        Unit
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="unit"
                                        name="unit"
                                        type="text"
                                        value={UpdatePg.unit}
                                        onChange={(e)=>setUpdatePg({...UpdatePg,[e.target.name]:e.target.value})}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 input-field"
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex ">
                                    <label htmlFor="contactNo" className="block text-sm font-medium leading-6 text-gray-900">
                                    contactNo
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="contactNo"
                                        name="contactNo"
                                        type="text"
                                        value={UpdatePg.contactNo}
                                        onChange={(e)=>setUpdatePg({...UpdatePg,[e.target.name]:e.target.value})}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 input-field"
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                                       Location 
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="location"
                                        name="location"
                                        type="text"
                                        value={UpdatePg.location}
                                        onChange={(e)=>setUpdatePg({...UpdatePg,[e.target.name]:e.target.value})}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 input-field"
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="confirmpassword" className="block text-sm font-medium leading-6 text-gray-900">
                                        Description 
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <textarea
                                        id="description"
                                        name="description"
                                        type="text"
                                        value={UpdatePg.description}
                                        onChange={(e)=>setUpdatePg({...UpdatePg,[e.target.name]:e.target.value})}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 input-field"
                                    />
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    onClick={handleUpdate}
                                    className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </BackGround>
    <Toaster />
    </>
  )
}
