import React, { useEffect, useState } from 'react';
// import Typed from 'react-typed';
import Link from 'next/link'
import {Modal} from '@mantine/core'

const Lander = () => {

  const [scrollPosition, setScrollPosition] = useState(0);
  const [blogModal,setBlogModal] = useState(true)

  useEffect(() => {
    function handleScroll() {
      setScrollPosition(window.pageYOffset);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const textElement = document.querySelector(".scroll-text");
    if (textElement) {
      const opacity = Math.max(0, 1 - scrollPosition / 700);
      textElement.style.opacity = opacity.toString();
    }
  }, [scrollPosition]);
  return (
    <div>
    {/* <Navbar/> */}
      <div className='flex flex-col md:flex-row scroll-text bg-[#EEE4E5] md:h-[550px] text-white font-[poppins] p-5'>
    {/* -------left section start----------------------------------- */}
      <div className='md:w-6/12 mt-10 md:mt-28 lg:mt-46 items-center flex flex-col gap-3'>
        
        <h1 className='md:tex-4xl text-center lg:text-7xl sm:text-4xl font-black text-3xl text-[#F64F73] drop-shadow-[2px_3px_0px_rgba(0,0,0,0.3)] z-10'>
        WOOF, WOOF
        </h1>
        <div className='flex justify-center items-center z-10'>
          {/* <p className='md:text-3xl sm:text-2xl text-xl font-bold py-4 '>
            We provide all form of 
          </p> */}
          {/*<Typed.default
          className='md:text-2xl sm:text-xl text-sm text-center font-semibold text-gray-500'
            strings={['"A microblog for pet parents, bloggers, and creators"', '"Share your knowledge about food, training, playtime, and health”', '"Keep it short and insightful, 250 words to 750 words."', '"As a bonus, earn for every unique view your blog gets"']}
            typeSpeed={120}
            backSpeed={20}
            loop
          />*/}
        </div>
        <p className='text-xs text-[#312121] sm:text-lg z-10 text-center'>Educate, Empower, Enrich, and Entertain PET PARENTS.</p>
         
         <Link  href="/write" className='bg-gradient-to-r from-rose-400 to-orange-300 flex items-center gap-2 hover:to-rose-700 duration-500 w-1/2 rounded-full shadow-xl hover:shadow-sm transition font-semibold my-6 mx-auto py-3 px-5 text-[#fff] md:text-2xl sm:text-xl text-lg flex justify-center'>
         <img src="/assets/icons/edit.svg" className="cursor-pointer text-[#5f2600] w-5 h-5 text-[#5f2600] invert" /> 
         <span>Write</span>
        </Link> 
       
       {/* <div>
          <input className="p-2 border mt-10 rounded-l-2xl bg-white"/>
          <button className="p-2 bg-[#312121] rounded-r-2xl">Subscribe</button>
        </div>*/}
      </div>

      <div className='w-full md:w-6/12  items-center justify-center flex'>
      <div className='flex justify-center items-center'>
      <img src="/gif/petparent.gif" alt="" className='w-80 sm:w-96 md:w-full'/>
      </div>
       
      </div>
    </div>
{/*    <Modal
                  opened={blogModal}
                  onClose={() => setBlogModal(false)}
                  size={"md"}
                  // title="Report a Bug"
        >
         <div className="flex flex-col gap-2">
         <img src="/assets/img/gdp.svg"/>
<h1 className="text-2xl font-semibold"> Write, Share, and Earn </h1> 
<p className="text-gray-500">
Everytime your Blog gets read by a subcribed user
</p>
<a className="text-blue-500 hover:text-blue-800">
Get Microblogging now!
</a>
         </div>
        </Modal>*/}
    </div>
    
  );
};

export default Lander;