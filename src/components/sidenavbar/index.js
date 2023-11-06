import React, { useState, useEffect } from 'react';
import Link from 'next/link';
// import { FaSnapchat } from 'react-icons/fa';
import axios from 'axios'
import {useRouter} from 'next/router'
const SideNavbar = () => {
  const router = useRouter()
  const [pathname,setPathname] = useState(router.pathname)


  console.log(router)
  
    async function logout() {
        try {
            router.push("/")
            await axios.get(`/api/auth/logout`)
            return router.push("/vetchatlogin")
        } catch (err) {
            console.log(err)
        }
    }

  const Tabs = [
     {
       pathname:"/blog",
       title:"Blog",
       logo:"/organizerLogo.png",
       csoon:true,
       id:"blog_sidebar"
     },
     // {
     //   pathname:"/vettalk/landing",
     //   title:"N'Rich Zone",
     //   logo:"/vettalkLogo.svg",
     //   csoon:true,
     //   id:"nrich_sidebar_sidebar"
     // },
     {
       pathname:"/vetchat",
       title:"Vet Chat",
       logo:"/vetchatLogo.png",
       id:"vetchat_sidebar"
     },
    //  {
    //    pathname:"/dogprofile",
    //    title:"Dog Profile",
    //    logo:"/dogprofileLogo.png",
    //    id:"dogprofile_sidebar"
    //  },
    //  {
    //    pathname:"/setting",
    //    title:"Setting",
    //    logo:"/settngsLogo.png",
    //    id:"setting_sidebar"
    //  },
     {
      pathname:"/faq",
      title:"Faq",
      logo:"/settngsLogo.png",
      id:"setting_sidebar"
    },
     
  ]

  return (
    <div className="flex  h-screen fixed lg:w-2/12 bg-white z-50 border-r border-gray-300">
      <div className="relative flex flex-col w-full">
        
        <div className="flex flex-col gap-2">
        <Link href={'/'}>
        <div className="flex gap-2 items-center justify-center p-4">
          <img src="/logo.png" alt="Logo" className="h-14 xl:h-16 h-14 xl:w-16" />
          <span className="text-lg xl:text-2xl text-[#5F2600] hidden lg:block font-semibold">DogSwag</span>
        </div>
        </Link>

        <nav className="flex flex-col">
          <ul className="flex-grow my-auto">
            {
              Tabs.map((t,i)=>{
                return(
                  <Link key={i} href={t.pathname}>
                    <li id={t.id} className={`flex gap-4 rounded-md items-center py-4 px-6 ${t.pathname === pathname || pathname === `${t.pathname}/[id]` ? "border-l-4 border-[#9747FF] bg-gradient-to-l from-white via-white to-[#8840E526]":""}`}>
                      <img src={t.logo} alt="Logo" className="h-8 w-8" />
                      <span className="hidden lg:block">{t.title}</span>
                    </li>
                  </Link>
                  )
              })
            }
          </ul>
        </nav>
          </div>


        {/* Logout Button */}
          <div onClick={logout} className="flex gap-4 items-end border py-4 px-6 mt-auto">
            <img src="/logoutLogo.png" alt="Logo" className="h-8 w-8" />
            <button className="text-lg hidden lg:block">Logout</button>
          </div>


      </div>
    </div>
  );
};

export default SideNavbar;
