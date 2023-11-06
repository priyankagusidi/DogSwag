import SideNavbar from '@/components/sidenavbar';
import Setting from '@/components/setting';
import React from 'react';
import Faq from '@/components/faqs'
import MobileNavBar from '@/components/mobilenav';


const index = (props) => {
    return (
         <div className="flex  w-full bg-white">
        <div className="relative md:w-2/12 border-r border-gray-300">
          <div className="hidden md:block">
            <SideNavbar/>
          </div>
        </div>
        <div className="w-full md:w-10/12 flex flex-col relative">
            <div className="p-4 fixed bg-white w-full border-b border-gray-300 z-10">
               <h3 className="text-lg font-semibold text-[#101010]">Faq</h3>
            </div>
            <div className="mt-16">
              <Faq userdata={props.userdata}/>
            </div>
        </div>
        <div className="block md:hidden">
           <MobileNavBar/>
        </div>
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
     
    if(!userdata.user){
        return {
          redirect: {
            permanent: false,
            destination: `/vetchatlogin`,
          }
        }
    }

    
     return {
        props : {userdata}
     }

       }catch(err){
         return {
           props : {error:true,status:503}
        }
    }
    
    

}