import { useEffect, useState } from "react";
import logo from "../assets/pflogo.png"
import { BackGround } from "./Backgroud"

import { useNavigate } from "react-router-dom";
import CustomModal from "./CustomModal";
import { SendOtp } from "./SendOtp";
import toast, { Toaster } from 'react-hot-toast';

import axios from "axios";
import { getToastOptions } from "../assets/toastOptions";

import { Link } from "react-router-dom"


export const Login = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('jwt_token');
    const [showModal, setShowModal] = useState(false);
    const [loginState, setLoginState] = useState(null);
    const [toastId, setToastId] = useState(null);
    const [loginUser, setLoginUser] = useState({
        email: '',
        password:''
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

    const handleValidate = ({email:Email, password: Password})=>{

        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        if(isEmptyUserField(loginUser)){
            toast.error("All Fields are mandatory", getToastOptions);
            return false;
        }
        else if (!emailRegex.test(Email)) {
            toast.error("Email format should be right", getToastOptions);
            return false;
        }
        return true;
    }
    const handleLogin = async(e)=>{
        e.preventDefault();
        if(handleValidate(loginUser))
        {
            setLoginState("Pending")
            const {data} = await axios.post("http://localhost:5000/api/auth/login", loginUser);
            setLoginState("Success")
            if(data.hasOwnProperty("errors")){
                toast.error(data.errors, getToastOptions);
            }
            else if(data.status=="Pending"){
                setVerify({
                    ...verify,userId:data.data.userId
                })
                toast.success("Please proceed with OTP verification", getToastOptions);
                setTimeout(() => {
                    setShowModal(true);
                }, 2000);
            }
            else{
                console.log(data);
                localStorage.setItem('jwt_token', data.userAuthToken);
                localStorage.setItem('user_id', data.data._id);
                navigate('/search')
            }
        }
    };

    useEffect(()=>{
        if(token){
            navigate("/search");
        }
        if(loginState!==null){
            if(loginState=="Pending")
            {
                const toastuniqukey = toast.loading('Please Wait');
                setToastId(toastuniqukey);
            }
            else{
                toast.dismiss(toastId);
            }
        }
    }, [loginState])

    return (
        <>
            <BackGround>
                <CustomModal visible={showModal}>
                    <SendOtp userEmail={loginUser.email} userverify={verify}  />
                </CustomModal>
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 rounded-lg">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img
                            className="mx-auto h-10 w-auto"
                            src={logo}
                            alt="Your Company"
                        />
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Sign in to your account
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" >
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
                                        value={loginUser.email}
                                        onChange={(e)=>setLoginUser({...loginUser,[e.target.name]:e.target.value})}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 input-field"
                                    />
                                </div>
                            </div>


                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                        Password
                                    </label>
                                    <div className="text-sm">
                                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                            Forgot password?
                                        </a>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={loginUser.password}
                                        onChange={(e)=>setLoginUser({...loginUser,[e.target.name]:e.target.value})}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 input-field"
                                    />
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    onClick={handleLogin}
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>
                        <p className="mt-10 text-center text-sm text-gray-500">
                            Not a user?{' '}
                            <Link to="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                Sign up now
                            </Link>
                        </p>
                    </div>
                </div>
            </BackGround>
            <Toaster />
        </>
    )
}
