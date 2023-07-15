import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BackGround } from './Backgroud'
import axios from 'axios'
import { Propertycard } from './Propertycard'

export const FinderDashboard = () => {
    const token = localStorage.getItem('jwt_token')
    const userId = localStorage.getItem('user_id')
    const navigate = useNavigate();
    const [latitude,setLatitude] = useState(null);
    const [longitude,setLongitude] = useState(null);
    const [items, setItems] = useState([]);
    const fetchNearData = async()=>{
        const {data} = await axios.post(
            'http://localhost:5000/api/property/nearest',
            {latitude, longitude, userId},
            {
                headers: {
                    Authorization: `${token}`,
                }
            }
        )
        setItems(data.data);
        if(data.loginRequired){
            navigate('/login')
            localStorage.removeItem('jwt_token')
            localStorage.removeItem('user_id')
        }
    }

    useEffect(()=>{
        if(!token){
            navigate('/login');
        }
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            console.log("Geolocation not supported");
        }
        
        function success(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            setLatitude(latitude)
            setLongitude(longitude)
        }
        function error() {
            console.log("Unable to retrieve your location");
        }
        if(latitude && longitude){
            fetchNearData();
        }
    }, [latitude,longitude])
    return (
      <BackGround>
          <>
            <nav className="font-sans border-b-2 mb-4 border-x-2 flex  sm:flex-row items-center justify-between py-4 px-6 bg-white shadow  w-full">
                <div className="mb-2 sm:mb-0">
                    <Link
                        to="/"
                        className="text-2xl no-underline text-grey-darkest hover:text-blue-dark"
                    >
                        Pg Finder
                    </Link>
                </div>
                <div>
                    <Link
                        to="/one"
                        className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2"
                    >
                        Your Pg
                    </Link>
                 
                </div>
            </nav>
            <div>
                <form>
                    <label
                        htmlFor="default-search"
                        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
                    >
                        Search
                    </label>
                    <div className="relative">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg
                                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                        <input
                            type="search"
                            id="default-search"
                            className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search"
                            required=""
                        />
                        <button
                            type="submit"
                            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Search
                        </button>
                    </div>
                </form>

            </div>
            <div className='px-4 mt-4'>
            {
                items.map((item, id)=>{
                    // console.log(item);
                    return(<Propertycard item={item} key={id} PropertyCardType={"Readable"}/>);
                })
            }
            </div>
        </>
      </BackGround>
    )
}
