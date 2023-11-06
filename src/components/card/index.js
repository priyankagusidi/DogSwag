import React from 'react'
import Link from 'next/link'

const Card = () => {
  return (
    <div className="bg-white p-10">
   
    <div className='w-fit mx-auto'>
    <h2 className='mx-auto md:text-5xl sm:text-4xl text-3xl font-[poppins] font-semibold text-gray-700'>What We <span className='text-amber-400 border-b-4 border-blue-600'>Offer</span>?</h2>
    </div>

       <div className='min-h-screen w-full flex justify-center items-center'>

       <div className='grid md:grid-cols-2 grid-rows-1 md:gap-32 gap-14'>
       <div>
        <h1 className='text-2xl font-semibold text-gray-600 mx-auto w-fit mb-4'>DogSwag <span className='text-amber-400'>Organizer</span> </h1>
       <div class="card sm:h-[400px] sm:w-[460px] h-[380px] w-[370px] mx-auto">
      
     <img src="/assets/img/calenderImg.jpeg" className="card-img" alt=""/>
    
     <div class="card-body sm:p-[30px] px-10">
       <h1 class="card-title sm:text-[50px] text-[45px]">DogSwag</h1>
       <p class="card-sub-title sm:text-[36px] text-[30px]">Organizer</p>
       <p class="card-info sm:text-[16px] text-[13px]">Pet schedule management, Reminders, Behavior tracking and analytics.</p>
 <Link href="/do">
       <button className='card-btn'>Get DO</button>
     </Link>

     </div>
   </div>
       </div>
      
 <div>

 <h1 className='text-2xl mb-4 w-fit mx-auto font-semibold text-gray-600'>DogSwag <span className='text-amber-400'>Blog</span> </h1>
 <div class="card sm:h-[400px] sm:w-[460px] h-[380px] w-[370px] mx-auto">
   
     <img src="/assets/img/blogImg.jpeg" className="card-img" alt=""/>
     <div class="card-body  sm:p-[30px] px-10 ">
       <h1 class="card-title">DogSwag</h1>
       <p class="card-sub-title sm:text-[36px] text-[30px]">Blogs</p>
       <p class="card-info">Dog Stories, Training, Fresh Food for Dogs, Mental Well-Being, and Health Management.</p>
 <Link href="/blog">
       <button className='card-btn'>Read</button>
     </Link>

     </div>
   </div>
 </div>
   
       </div>
       
     
    </div>
    </div>
   
    
  )
}

export default Card