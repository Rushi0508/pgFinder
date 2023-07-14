import logo from "../assets/pflogo.png"
import { BackGround } from "./Backgroud"
import { useState } from "react";
import CustomModal from "./CustomModal";
import "react-toastify/dist/ReactToastify.css";
import {  toast } from "react-toastify";
import axios from 'axios';
import { ToastContainer } from "react-toastify";
import { getToastOptions } from "../assets/toastOptions";
import { useNavigate } from "react-router-dom";

export const Register = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [user, setUser] = useState({
        name:'',
        phone:'',
        email: '',
        password:'',
        confirmpassword:''
    });
    const [verify, setVerify] = useState({
        userId: "",
        otp: ""
    })

      const isEmptyUserField = (obj)=>{
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
              if (obj[key] === '') {
                return true;
              }
            }
          }
          return false;
      }
    
      const handleValidation = ({
        name:Name,
        phone:PhoneNumber,
        email: Email,
        password: Password,
        confirmpassword: ConfirmPassword,
      }) => {
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

        if(isEmptyUserField(user)){
            toast.error("All Fields are mandatory", getToastOptions);
        }
        else if (Password !== ConfirmPassword) {
          toast.error("Password didn't match", getToastOptions);
          return false;
        } else if (Password.length <= 4) {
          toast.error("Password Length should be greater than 4", getToastOptions);
          return false;
        } else if (Name.length <= 3) {
            toast.error("Name should be greater than 3 characters.", toastOptions);
            return false; 
        } else if (PhoneNumber.toString().length !== 10 ) {
            toast.error("Phone muber should be 10 length.", getToastOptions);
            return false; 
        }
        else if (!emailRegex.test(Email)) {
          toast.error("Email format should be right", getToastOptions);
          return false;
        }
        return true;
      };

    const handleRegister = async ()=>{
        if(handleValidation(user)){
            const {data} = await axios.post(
                "http://localhost:5000/api/auth/register",
                user
            );
            if(data.status == "Pending"){
                setShowModal(true)
                setVerify({
                    ...verify,userId:data.data.userId
                })
            }
        }
    }
    const handleOTP = async ()=>{

        const {data} = await axios.post(
            "http://localhost:5000/api/auth/verifyOTP",
            verify
        )
        if(data.status){
            navigate('/home')
        }
    }
    return (
        <>
            <BackGround>
                <CustomModal visible={showModal} onClose={() => setShowModal(false)}>
                    <div className="bg-white w-96 h-[50%] p-5 rounded flex flex-col justify-center items-center gap-10">
                        <h1 className="font-bold text-3xl text-indigo-500">
        Enter OTP
                        </h1>
                        <input
                            placeholder="OTP"
                            type="text"
                            value={verify.otp} onChange={(e)=>setVerify({...verify,[e.target.name]:e.target.value})} name="otp"
                            className="w-[70%] border border-gray-500 p-1 mt-2 rounded-md "
                        />
                        <button onClick={handleOTP}  className="mt-2 py-2 px-5 bg-indigo-500 text-white rounded-md hover:bg-indigo-600">
                            Submit
                        </button>
                    </div>
                </CustomModal>

                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-2 rounded-lg">

                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img
                            className="mx-auto h-10 w-auto"
                            src={logo}
                            alt="Your Company"
                        />
                        <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Create a Account
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <div className="space-y-6" >
                            <div>
                                <div className="flex ">
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                        Name
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={user.name}
                                        onChange={(e)=>setUser({...user, [e.target.name]:e.target.value})}
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex ">
                                    <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                        Phone number
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="text"
                                        value={user.phone}
                                        onChange={(e)=>setUser({...user, [e.target.name]:e.target.value})}
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex ">
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                        Email address
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={user.email}
                                        onChange={(e)=>setUser({...user, [e.target.name]:e.target.value})}
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                        Password
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={user.password}
                                        onChange={(e)=>setUser({...user, [e.target.name]:e.target.value})}
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="confirmpassword" className="block text-sm font-medium leading-6 text-gray-900">
                                        Confirm Password
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="confirmpassword"
                                        name="confirmpassword"
                                        type="password"
                                        value={user.confirmpassword}
                                        onChange={(e)=>setUser({...user, [e.target.name]:e.target.value})}
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={handleRegister}
                                >
                                    Register
                                </button>
                            </div>
                        </div>
                        <p className="mt-10 text-center text-sm text-gray-500">
                            Already a User ?
                            <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                Login
                            </a>
                        </p>
                    </div>
                </div>
            </BackGround>
            <ToastContainer />
        </>
    )
}


