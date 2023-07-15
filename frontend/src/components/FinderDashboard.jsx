import { Link } from 'react-router-dom'
import { BackGround } from './Backgroud'
import StarIcon from '../assets/icons/star.png'

export const FinderDashboard = () => {
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
                        to="/one"
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
                        />
                        <button
                            type="submit"
                            className="text-white absolute right-2.5 bottom-2.5 bg-indigo-500 hover:bg-indigo-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 rounded-3xl"
                        >
                            Search
                        </button>
                    </div>
                </form>

            </div>
            <div className='px-4 mt-4'>
                <div className='w-full bg-gray-100 p-4 gap-x-4 rounded-md flex flex-col space-y-4 sm:flex-row backdrop-filter-blur bg-opacity-30 '>
                    <div className='sm:w-full lg:w-2/5 flex items-center justify-center'>
                        <img className='rounded-md h-48 object-cover' src="https://c.ndtvimg.com/2023-07/nqtgiefo_virat-kohli-afp_625x300_14_July_23.jpg?im=FeatureCrop,algorithm=dnn,width=806,height=605" alt="" />
                    </div>
                    <ul className='px-4 space-y-3 sm:space-y-2'>
                        <li className='flex justify-between'>
                            <span className='text-lg sm:text-xl font-semibold'>Virat Kohli</span>
                            <span className='text-lg font-medium'>50$/Room</span>
                        </li>
                        <li className='text-left'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo voluptatum ipsa delectus excepturi labore inventore voluptas nemo ea perspiciatis laudantium!</li>
                        <li className='text-left font-medium'>spitvallley, Gujarat</li>
                        <li className='flex items-center gap-x-4'>
                            <span className='flex'>
                                <img src={StarIcon} className='w-10 h-10' alt="" />
                                <img src={StarIcon} className='w-10 h-10' alt="" />
                                <img src={StarIcon} className='w-10 h-10' alt="" />
                            </span>
                            <span>Review: 4.5</span>
                        </li>
                        <li className='text-left sm:text-right'>
                            <button className='bg-indigo-500 p-2 rounded-md hover:bg-indigo-500 text-white text-xl font-medium'>
                                View PG Details
                            </button>
                        </li>
                    </ul>

                </div>
            </div>
        </>
      </BackGround>
    )
}
