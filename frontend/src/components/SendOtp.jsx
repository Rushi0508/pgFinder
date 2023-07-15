import axios from 'axios';
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const SendOtp = ({userEmail, userverify}) => {

    const [otp, setOtp] = useState([0,0,0,0,0]);
    const [resendotp, setResendOtp] = useState(null);
    const navigate = useNavigate();

    const updateOtp = (e)=>{
        
        const currTag = e.target;
        let updatedOtp = otp;
        updatedOtp[parseInt(e.target.id)-1] = parseInt(e.target.value);
        // console.log(updatedOtp);
        setOtp(updatedOtp);

        if(currTag.id!=="5"){
            const nextTagId = parseInt(currTag.id)+1;
            const nextTag = document.getElementById(nextTagId.toString());
            nextTag.focus();
        }
    }

    const handleOTP = async (e)=>{
        e.preventDefault();

        if(resendotp==null || resendotp==true){
            console.log("otp");
            if(resendotp==null){
                setResendOtp(true);
            }else{
                setResendOtp(false);
            }
            const userotp = otp.join('');
            const sendVerifyOtp = {...userverify, otp:userotp};
            const {data} = await axios.post("http://localhost:5000/api/auth/verifyOTP",sendVerifyOtp);
            console.log(data);
            if(data.status){
                localStorage.setItem('jwt_token', data.userAuthToken);
                localStorage.setItem('user_id', data.data._id);
                navigate('/search');
            }
            else{
                toast.error("Invalid code",{ position: "top-center",
                duration: 5000});
            }
        }
    }
    const handleresendotp = ()=>{
        // toast.error("sending otp again..",{ position: "top-center",
        //         duration: 2000});
        // resendotp
    }

    return (
        <div className="bg-white  shadow-xl mx-auto w-3/4 max-w-xl rounded-2xl">
            <div className="my-4 mx-auto flex w-full max-w-md flex-col space-y-16">
                <div className="flex flex-col items-center justify-center text-center space-y-2">
                    <div className="font-semibold text-3xl">
                        <p>Email Verification</p>
                    </div>
                    <div className="flex flex-row text-sm font-medium text-gray-400">
                        <p>We have sent a code to your email {userEmail}</p>
                    </div>
                </div>
                <div>
                    <form action="" method="post">
                        <div className="flex flex-col space-y-16">
                            <div className="flex flex-row items-center justify-between mx-auto w-full px-4 sm:px-0  gap-x-1 max-w-xl ">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 ">
                                    <input
                                        className="w-full h-full flex flex-col items-center justify-center text-center px-2 sm:px-5 outline-none rounded-xl border-2 border-gray-500 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                        type="text"
                                        maxLength="1"
                                        onChange={updateOtp}
                                        id="1"
                                    />
                                </div>
                                <div className="w-12 h-12 sm:w-16 sm:h-16">
                                    <input
                                        className="w-full h-full flex flex-col items-center justify-center text-center px-2 sm:px-5 outline-none rounded-xl border-2 border-gray-500 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                        type="text"
                                        maxLength="1"
                                        onChange={updateOtp}
                                        id="2"
                                    />
                                </div>
                                <div className="w-12 h-12 sm:w-16 sm:h-16 ">
                                    <input
                                        className="w-full h-full flex flex-col items-center justify-center text-center px-2 sm:px-5 outline-none rounded-xl border-2 border-gray-500 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                        type="text"
                                        maxLength="1"
                                        onChange={updateOtp}
                                        id="3"
                                    />
                                </div>
                                <div className="w-12 h-12 sm:w-16 sm:h-16 ">
                                    <input
                                        className="w-full h-full flex flex-col items-center justify-center text-center px-2 sm:px-5 outline-none rounded-xl border-2 border-gray-500 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                        type="text"
                                        maxLength="1"
                                        onChange={updateOtp}
                                        id="4"
                                    />
                                </div>
                                <div className="w-12 h-12 sm:w-16 sm:h-16 ">
                                    <input
                                        className="w-full h-full flex flex-col items-center justify-center text-center px-2 sm:px-5 outline-none rounded-xl border-2 border-gray-500 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                        type="text"
                                        maxLength="1"
                                        onChange={updateOtp}
                                        id="5"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col px-4 space-y-5">
                                <div>
                                    <button onClick={handleOTP} className="flex flex-row items-center justify-center text-center  w-full border rounded-xl outline-none py-5 bg-indigo-500 hover:bg-indigo-600 border-none text-white text-sm shadow-sm">
                                        Verify Account
                                    </button>
                                </div>
                                <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                                    <p>Didn't recieve code?</p>{" "}
                                    <button
                                        className="flex flex-row items-center text-blue-600"
                                    >
                                        Resend
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
