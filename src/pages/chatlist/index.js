import SideNavbar from '@/components/sidenavbar';
import Chatlist from '@/components/chatlist';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
const index = (props) => {
   
    
    return (
        <div className="flex  h-screen bg-white justify-center">
        <div className="w-full md:w-5/12 relative">
            <div className='flex gap-2 items-center'>
               <Link href={"/doctor/profile"}>
                  <img className='w-5' src='/assets/icons/back-arrow.svg'/>
               </Link>
               <h1 className="p-2 text-2xl">Chat List</h1>
            </div>
            <Chatlist long={true} userdata={props.userdata} showOnline={true}/>
        </div>
      </div>
    );
};


export default index


export async function getServerSideProps({req,params}) {

try{
     const url = `${process.env.NODE_ENV === "development" ? "http://localhost:4000" : process.env.PROD_URI }`
     const res = await fetch(`${url}/api/auth/login/success`, {
        withCredentials: true,
        headers: {
            Cookie: req.headers.cookie
        }
    });
     const userdata = await res.json()
     

     return {
        props : {userdata}
     }
      }catch(err){
         return {
           props : {error:true,status:503}
        }
    }
    

}