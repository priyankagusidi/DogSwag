import SideNavbar from '@/components/sidenavbar';
import MobileNavBar from '@/components/mobilenav';
import Terms from '@/components/terms';
import React from 'react';
import Link from 'next/link'
const index = () => {

  return (
      <div className="flex flex-col w-full h-screen items-center bg-white">
           <h1 className="mt-16 text-2xl font-bold">Only Doctors are allowed.</h1>
           <Link href="/" className="text-blue-500 underline">Go Back to home</Link>
      </div>
  );
};

export default index;


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
