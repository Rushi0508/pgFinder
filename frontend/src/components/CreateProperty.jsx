import React, { useState } from 'react'
import {BackGround} from './Backgroud'
import axios from 'axios'

export default function CreateProperty() {
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
            'http://localhost:5000/api/property/create',
            data 
        )
        console.log(response);
    }
  return (
    <>
    <BackGround>
        Title : <input onChange={(e)=>{setTitle(e.target.value)}} value={title} type="text" name='title' />
        Price : <input onChange={(e)=>{setPrice(e.target.value)}} value={price} type="text" name='price' />
        Unit : <input onChange={(e)=>{setUnit(e.target.value)}} value={unit} type="text" name='unit' />
        Contact No : <input onChange={(e)=>{setContactNo(e.target.value)}} value={contactNo} type="text" name='contact' />
        Description : <input onChange={(e)=>{setDescription(e.target.value)}} value={description} type="text" name='description' />
        City : <input onChange={(e)=>{setLocation(e.target.value)}} value={location} type="text" name='city' />
        Click here for exact location: <button onClick={handleLocation}>Click</button>
        <button onClick={handleSubmit}>Submit</button>
    </BackGround>
    </>
  )
}
