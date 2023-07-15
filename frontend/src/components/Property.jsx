import { BackGround } from "./Backgroud"
import Carousel from "./Carousel"

export const Property = () => {
    return (
        <div className="w-full h-full">
            <BackGround>
            <div className="flex flex-col justify-center items-center w-full h-full bg-gray-100 bg-opacity-30 backdrop-filter backdrop-blur-lg p-4">
                <div className="w-full">
                    <Carousel />
                </div>
                <div className="flex flex-col justify-between items-center md:flex-row gap-10 w-full md:w-[80%]">
                    <div className="flex flex-col gap-5 text-left w-full">
                        <h3 className="text-4xl text-indigo-600 font-medium">Title</h3>
                        <p className="text-xl text-gray-500 font-medium">Created By X</p>
                        <p className="text-xl text-gray-500 font-medium">Lorem ispsum sldgjsl slgjsgjl sglkskjlsgl agljsgl slkjsglj lsglksg jlkshlksglkj lkshlkjsglk lksghljksglk lkshljksglkjs lksglkjgs </p>
                        <p className="text-xl text-gray-500 font-medium">Location</p>
                        
                    </div>
                    <div className="flex flex-col gap-4 justify-end items-end text-right w-full">
                        <a><button className="text-white text-xl font-medium bg-indigo-500 hover:bg-indigo-600 rounded-md p-2"> Contact On Whatsapp  </button></a>
                        <p className="text-xl text-gray-500 font-medium">CreatedAT</p>
                        <h6 className="text-xl font-medium  rounded-md w-[50%] text-gray-500 text-right"> Price </h6>
                    </div>
                </div>
        </div>
            </BackGround>
        </div>
    )
}
