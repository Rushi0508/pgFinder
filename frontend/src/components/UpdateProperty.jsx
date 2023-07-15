import React, { useState } from 'react'
import {BackGround} from './Backgroud'
import axios from 'axios'
import { Link } from 'react-router-dom';

export default function UpdateProperty() {
    const [title,setTitle] = useState("");
    const [price,setPrice] = useState("");
    const [unit,setUnit] = useState("");
    const [contactNo,setContactNo] = useState("");
    const [description,setDescription] = useState("");
    const [location,setLocation] = useState("");
    const [coordinates, setCoordinates] = useState([])
    const handleLocation = ()=>{
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
        console.log("Geolocation not supported");
        }
        
        function success(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            setCoordinates([longitude,latitude])
        }
        function error() {
            console.log("Unable to retrieve your location");
        }
    }
    const handleSubmit = async ()=>{
        const userId = "64b21bba20f3ad08f4e1641a";
        const data = {
            userId,title,price,unit,location,description,contactNo,coordinates
        }
        const response = await axios.post(
            'http://localhost:5000/api/property/update',
            data 
        )
        console.log(response);
    }
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
                        to="/one"
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
                                        name="name"
                                        type="text"
                                        required
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
                                        id="phone"
                                        name="phone"
                                        type="text"
                                        required
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
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 input-field"
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">
                                       Location 
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="location"
                                        name="location"
                                        type="text"
                                        required
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
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 input-field"
                                    />
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
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
    </>
  )
}

