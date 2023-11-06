import Link from "next/link"
import { useState } from "react";

const Navbar = () =>{

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navListOptions =
     <>
        <li>
            <Link
                href='/'
                aria-label='Home'
                title='Home'
            >
                Home
            </Link>
        </li>

        <li>
            <Link
                href='/aboutUs'
                aria-label='aboutUs'
                title='aboutUs'
            >
                About Us
            </Link>
        </li>



        <li>
            <Link
                href='/contactUs'
                aria-label='contactUs'
                title='contactUs'
            >
                Contact Us
            </Link>
        </li>




      
    </>

    return (
<div className='relative px-2  bg-white border-b-slate-300 py-2 border-b-2 text-black flex items-center justify-around'>

        <Link
            href='/'
            aria-label='dogSwag'
            tittle="dogSwag"
            className='inline-flex items-center'
        >
            <div data-tooltip="dogSwag" className='flex items-center  '>
                <img className="w-16 h-16" src="logo.png" alt="" />
                <h3 className="text-[#5F2600] text-3xl font-semibold ">DogSwag</h3>

            </div>
        </Link>
        <ul className='items-center mx-auto text-[#101010] text-base font-medium hidden space-x-8 lg:flex'>
            {navListOptions}
        </ul>
        <ul className='items-center  text-base font-medium hidden space-x-8 lg:flex'>
           <li>
           <Link href="/vetchatlogin">
             <button className="bg-slate-50  hover:after:content-['_↗'] border-4  hover:bg-[#FFCB07] px-10 py-4 rounded-full flex items-center  ">Login</button>
           </Link>
           </li>
           {/* <li>
<Link href="/vetchatsignup"> <button  className="bg-[#FFCB07] border-4 gap-2 px-10 py-4 rounded-full flex items-center text-white hover:text-black ">Sign Up</button></Link>           </li> */}
        </ul>
        <div className='lg:hidden'>
            <button
                aria-label='Open Menu'
                title='Open Menu'
                className='p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50'
                onClick={() => setIsMenuOpen(true)}
            >
                <svg className='w-5 text-gray-600' viewBox='0 0 24 24'>
                    <path
                        fill='currentColor'
                        d='M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z'
                    />
                    <path
                        fill='currentColor'
                        d='M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z'
                    />
                    <path
                        fill='currentColor'
                        d='M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z'
                    />
                </svg>
            </button>
            {isMenuOpen && (
                <div className='absolute z-10 top-0 left-0 w-full'>
                    <div className='p-5 bg-white border rounded shadow-sm'>
                        <div className='flex items-center justify-between mb-4'>

                            <Link
                                href='/'
                                aria-label='dogSwag'
                                title="dogSwag"
                                className='inline-flex items-center'
                            >
                                <div data-tooltip="dogSwag" className='flex  tooltip items-center justify-center '>
                                    <img className="w-16 h-16" src="logo.png" alt="" />
                                </div>

                            </Link>
                            <div>
                            </div>
                            <div>
                                <button
                                    aria-label='Close Menu'
                                    title='Close Menu'
                                    className='p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline'
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <svg className='w-5 text-gray-600' viewBox='0 0 24 24'>
                                        <path
                                            fill='currentColor'
                                            d='M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z'
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <nav>
                            <ul className='space-y-4'>
                                {navListOptions}
                            </ul>

                        </nav>
                    </div>
                </div>
            )}
        </div>
    </div>
    )
}

export default Navbar