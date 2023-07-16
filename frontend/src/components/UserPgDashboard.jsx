import React, { useEffect, useState } from 'react'
import { Propertycard } from './Propertycard';
import { Link, useNavigate } from 'react-router-dom';
import { BackGround } from './Backgroud';
import axios from 'axios';

export  default function UserPgDashboard (){
    const token = localStorage.getItem('jwt_token')
    const userId = localStorage.getItem('user_id')
    const navigate = useNavigate();
    const [items, setItems] = useState([]);

    const fetchAllPg = async ()=>{
        const {data} = await axios.get(
            `http://localhost:5000/api/property/user/${userId}`,
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
            setItems(data.data);
        }
    }
    useEffect(()=>{
        if(!token){
            navigate('/login');
        }
        else{
            fetchAllPg();
        }
    })
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
                  to="/pg/create"
                  className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2"
              >
                  Add Pg
              </Link>
          </div>
      </nav>
  
      <div className='px-4 mt-4 space-y-2'>
      {
          items.map((item, id)=>{
              return(<Propertycard item={item} key={id} PropertyCardType={"Editable"}/>);
          })
      }
      </div>
  </>
</BackGround>
  )
}
