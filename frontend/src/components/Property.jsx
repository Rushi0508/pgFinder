import { BackGround } from "./Backgroud"
import Carousel from "./Carousel"
import { IoLogoWhatsapp } from "react-icons/io5";
import { BiArrowBack } from "react-icons/bi";

import React from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Property = () => {

    const token = localStorage.getItem('jwt_token')
    const userId = localStorage.getItem('user_id')
    const navigate = useNavigate();

    const Location = useLocation();
    const getItem = Location.state.item;
    const {title, price, contactNo, unit,location, description ,images, createdAt} = getItem;
    const ItemId = getItem._id;

    useEffect(()=>{
        if(!token){
            navigate('/login');
        }
    })

  return (
    <div className="w-full h-full">
    <BackGround>
        <div className="flex flex-col justify-center items-center w-full h-full bg-gray-100 bg-opacity-40 backdrop-filter backdrop-blur-sm p-4 rounded-xl">
            <div className="flex flex-col w-full items-start ml-10 mt-3 ">
                <Link to='/search'>
                <button className="inline-flex items-center w-15 h-15"> <BiArrowBack /> </button>
                </Link>
            </div>

            <div className="w-full">
                {/* <Carousel images={images} />
                 */}
                 <img src={images[0]} className="w-full h-48" alt="" />
            </div>
            <div className="flex flex-col justify-between items-center md:flex-row gap-10 w-full md:w-[90%]">
                <div className="flex flex-col gap-5 text-left w-full ">
                    <h3 className="text-4xl text-indigo-600 font-medium ">{title}</h3>
                    {/* <div className="flex flex-col gap ">
                        <p className="text-xl text-gray-700  font-semibold">Created By </p>
                        <p className="text-xl text-gray-500 font-normal">Dhruv Dabhi</p>
                    </div> */}
                    <div className="flex flex-col gap ">
                        <p className="text-xl text-gray-700  font-semibold">Description</p>
                        <p className="text-xl text-gray-500 font-normal">{description} </p>
                    </div>
                    <div className="flex flex-col gap ">
                        <p className="text-xl text-gray-700  font-semibold">Location</p>
                        <p className="text-xl text-gray-500 font-normal">{location}</p>
                    </div>

                </div>
                <div className="flex flex-col gap-5 justify-end items-end text-right w-full ">
                    <button className="text-white text-xl font-medium bg-indigo-500 hover:bg-indigo-600 rounded-md p-2 inline-flex gap-2 items-center"> Contact <IoLogoWhatsapp /> </button>
                    <div className="flex flex-col gap ">
                        <p className="text-xl text-gray-700  font-semibold">Created On</p>
                        <p className="text-xl text-gray-500 font-normal">{createdAt}</p>
                    </div>
                    <div className="flex flex-col gap ">
                        <p className="text-xl text-gray-700  font-semibold">Estimate Rent</p>
                        <p className="text-xl text-gray-500 font-normal">₹{price}</p>
                    </div>
                </div>
            </div>
        </div>
    </BackGround>
</div>
  )
}

export default Property
