import logo from "../assets/pflogo.png"
import { BackGround } from "./Backgroud"
import { useEffect, useState } from "react";
import CustomModal from "./CustomModal";
import axios from 'axios';
import { getToastOptions } from "../assets/toastOptions";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { SendOtp } from "./SendOtp";
import { Link } from "react-router-dom";


export const Register = () => {
    const token = localStorage.getItem('jwt_token');
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [registerState, setRegisterState] = useState(null);
    const [toastId, setToastId] = useState(null);
    const [user, setUser] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
        confirmpassword: ''
    });
    const [verify, setVerify] = useState({
        userId: "",
        otp: ""
    })

    const isEmptyUserField = (obj) => {
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
        name: Name,
        phone: PhoneNumber,
        email: Email,
        password: Password,
        confirmpassword: ConfirmPassword,
    }) => {
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        if (isEmptyUserField(user)) {
            toast.error("All Fields are mandatory", getToastOptions);
            return false;
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
        } else if (PhoneNumber.toString().length !== 10) {
            toast.error("Phone muber should be 10 length.", getToastOptions);
            return false;
        }
        else if (!emailRegex.test(Email)) {
            toast.error("Email format should be right", getToastOptions);
            return false;
        }
        return true;
    };

    useEffect(() => {
        if (token) {
            navigate("/login");
        }
        if (registerState !== null) {
            if (registerState == "Pending") {
                const toastuniqukey = toast.loading('Processing');
                setToastId(toastuniqukey);
            }
            else {
                toast.dismiss(toastId);
            }
        }
    }, [registerState])

    const handleRegister = async () => {
        if (handleValidation(user)) {
            setRegisterState("Pending");
            const { data } = await axios.post(
                "http://localhost:5000/api/auth/register",
                user
            );
            console.log(data);
            setRegisterState("success");
            if (data.hasOwnProperty('errors')) {
                toast.error(data.errors, getToastOptions);
            }
            else {
                setVerify({
                    ...verify, userId: data.data.userId
                })
                toast.success("Registered Successfully", getToastOptions);
                setTimeout(() => {
                    setShowModal(true);
                }, 2000);
            }
        }
    }
    return (
        <>
            <BackGround>
                <CustomModal visible={showModal}>
                    <SendOtp userEmail={user.email} userverify={verify} />
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
                                        onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 input-field"
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
                                        onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 input-field"
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
                                        onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 input-field"
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
                                        onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 input-field"
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
                                        onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 input-field"
                                    />
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={handleRegister}
                                >
                                    Register
                                </button>
                            </div>
                        </div>
                        <p className="mt-10 text-center text-sm text-gray-500">
                            Already a User ?
                            <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">

                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </BackGround>
            <Toaster />
        </>
    )
}


