import React, { useEffect, useState } from 'react'
import {BackGround} from './Backgroud'
import axios from 'axios'
import { getToastOptions } from "../assets/toastOptions";
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { CloudinaryContext, Image } from 'cloudinary-react';


export default function CreateProperty() {
 
    const token = localStorage.getItem('jwt_token')
    const userId = localStorage.getItem('user_id')
    const navigate = useNavigate();
    const [pgDetail, setPgDetail] = useState({
        title:"", price:"", unit:"", contactNo:"", description:"", location:""
    })
    const [pgImages, setPgImages] = useState([]);

    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'e1ocsquo');
        formData.append("cloud_name", "dbev6vdma");
      
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dbev6vdma/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );
      
        const data = await response.json();
        setPgImages([...pgImages,data.secure_url]);
      };
      
    const  handleImageUpload = async (event)=>{
        // event.preventDefault();
        const file = event.target.files[0];
        const imageUrl = await uploadImage(file);
        console.log('Image URL:', imageUrl);
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const bodyObject = {...pgDetail, userId:userId, images:pgImages};
        const {data} = await axios.post(
            'http://localhost:5000/api/property/create',
            bodyObject,
            {
                headers: {
                    Authorization: `${token}`,
                }
            }
        )
        console.log(data);
        if(data.loginRequired){
            navigate('/login')
            localStorage.removeItem('jwt_token')
            localStorage.removeItem('user_id')
        }
        else if(data.status){
            toast.success("Your New Pg successfully added", getToastOptions);
            setTimeout(() => {
                navigate("/pg/my");
            }, 2000);
        }
        else{
            toast.error("Please try again", getToastOptions);
        }
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
                        to="/pg/my"

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
                                        value={pgDetail.title}
                                        onChange={(e)=>setPgDetail({...pgDetail,[e.target.name]:e.target.value})}
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
                                        value={pgDetail.price}
                                        onChange={(e)=>setPgDetail({...pgDetail,[e.target.name]:e.target.value})}
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

                                        value={pgDetail.unit}
                                        onChange={(e)=>setPgDetail({...pgDetail,[e.target.name]:e.target.value})}
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
                                        value={pgDetail.contactNo}
                                        onChange={(e)=>setPgDetail({...pgDetail,[e.target.name]:e.target.value})}
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

                                        value={pgDetail.location}
                                        onChange={(e)=>setPgDetail({...pgDetail,[e.target.name]:e.target.value})}

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
                                        value={pgDetail.description}
                                        onChange={(e)=>setPgDetail({...pgDetail,[e.target.name]:e.target.value})}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 input-field"
                                    />
                                </div>
                            </div>

                            <div className='space-y-3'>
                                <div className='block'> 
                                    <h1 className='text-left text-lg font-medium leading-6 text-gray-900'> Total Updloaded Pic : {pgImages.length}</h1>
                                </div>
                                <div className="flex flex-wrap gap-2">

                                    {
                                        pgImages ? pgImages.map((imageurl, index)=>{
                                            return (
                                                <img className='w-28 h-28 object-cover' key={index} src={imageurl} alt="" />
                                            )
                                        }):<h1>No images Selected</h1>

                                    }                         
                                </div>
                                <div className=''>
                                <input className='' type="file" onChange={handleImageUpload} />    
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    onClick={handleSubmit}
                                    className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Create
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