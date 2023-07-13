import logo from "../assets/pflogo.png"
import { BackGround } from "./Backgroud"
import { useState } from "react";
import CustomModal from "./CustomModal";


export const Register = () => {
    const [showModal, setShowModal] = useState(false);


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
                            className="w-[70%] border border-gray-500 p-1 mt-2 rounded-md "
                        />
                        <button className="mt-2 py-2 px-5 bg-indigo-500 text-white rounded-md hover:bg-indigo-600">
                            Submit
                        </button>
                    </div>
                </CustomModal>

                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 rounded-lg">

                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img
                            className="mx-auto h-10 w-auto"
                            src={logo}
                            alt="Your Company"
                        />
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Create a Account
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <div className="space-y-6" >
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
                                        autoComplete="email"
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
                                        autoComplete="current-password"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={() => setShowModal(true)}
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
        </>
    )
}


