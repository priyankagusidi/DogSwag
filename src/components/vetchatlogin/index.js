import {useState,useEffect} from 'react'
import { useRouter } from 'next/router'
import { useRef } from 'react';
// import Autoplay from 'embla-carousel-autoplay';
// import { Carousel } from '@mantine/carousel';
import Link from 'next/link';


export default function Login({userdata}){

  // const autoplay = useRef(Autoplay({ delay: 5000 }));
  const [user,setuser] = useState()
  const router = useRouter()
  
    const [isSignUpMode, setIsSignUpMode] = useState(false);

  const handleSignUpClick = () => {
    setIsSignUpMode(true);
  };

  const handleSignInClick = () => {
    setIsSignUpMode(false);
  };

  const googleAuth = (e) => {
    e.preventDefault()
    if(userdata?.user){
      router.push('/vetchat')
      return
    }
      window.open(
        `/api/auth/google/callback/vetchat`,
        "_self"
      );

  };


  function vetButton(){


    router.push('/vet/landing')

    // if(userdata?.user){
    //       router.push('/doctor')
    //       return
    // }
    
    //  window.open(
    //           `/api/auth/google/callback/doctor`,
    //           "_self"
    // );

  }



	return (

    <div className="flex flex-col  h-screen relative text-Inter">
    <Link href="/"> 
    <div className="flex items-center  absolute  top-2">
      <img src="/logo.png" className="w-12"/>
      <span className="text-[#5F2600] font-bold text-xl">DogSwag</span>
    </div>
    </Link>
    <div className="max-w-lg w-full mx-auto text-center flex flex-col gap-10 mt-40">
      <h3  className="text-3xl font-semibold text-[#3C3C3C]">Login</h3>
      <div className="flex justify-center">
          <button onClick={(e)=>googleAuth(e)} className=" flex items-center justify-center gap-3 text-xl px-10 py-5 text-blue-500 border-2 border-gray-300 rounded-xl font-semibold"> <img src="/googleSVG.svg" className="w-7" alt="" /> Google</button>
      </div>
      <p className="text-sm text-gray-500">By signing in to DogSwag, you agree to our Terms and Privacy Policy. </p>
      
    </div>
      <div className='w-full  text-center absolute bottom-20'>
         <button onClick={vetButton} className="px-10 py-4 border-2 border-gray-300 rounded-xl text-gray-500">I am a Veterinarian</button>
      </div>
    </div>
		)
}