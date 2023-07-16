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
    const [search, setSearch] = useState("");
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
        if(data.loginRequired){
            navigate('/login')
            localStorage.removeItem('jwt_token')
            localStorage.removeItem('user_id')
        }
        setItems(data.data);
    }
    const handleSearch = async (e)=>{
        e.preventDefault();
        if(search!=""){
            const {data} = await axios.post(
                'http://localhost:5000/api/property/nearest',
                {search},
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
            setItems(data.data);
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
            <nav className="border-b-2 mb-4 border-x-2 flex  sm:flex-row items-center justify-between py-4 px-6 bg-gray-200 w-full rounded-lg backdrop-filter backdrop-blur-sm bg-clip-text bg-opacity-80 ">
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
            <div>
                <form>
                    <div className="relative rounded">
                        <div className="flex absolute inset-y-0  items-center pl-3 pointer-events-none">
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
                            className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50  border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-opacity-30 rounded-3xl "
                            placeholder="Search"
                            required=""
                            value={search}
                            onChange={(e)=>{setSearch(e.target.value)}}
                        />
                        <button
                            onClick={handleSearch}
                            className="text-white absolute right-2.5 bottom-2.5 bg-indigo-500 hover:bg-indigo-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 rounded-3xl"
                        >
                            Search
                        </button>
                    </div>
                </form>
            </div>
            <div className='px-4 mt-4'>
            {
                (items.length===0)? <h1>No PGs found</h1> : 
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
