import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router'

const SideNavbar = () => {

  const router = useRouter()
  const [pathname,setPathname] = useState(router.pathname)


const Tabs = [
     {
       pathname:"/",
       title:"Blog",
       logo:"/m_home.svg"
     },
     // {
     //   pathname:"/vettalk/landing",
     //   title:"Vet Talk",
     //   logo:"/m_talk.svg"
     // },
     {
       pathname:"/vetchat",
       title:"Vet Chat",
       logo:"/m_chat.svg"
     },
    //  {
    //    pathname:"/dogprofile",
    //    title:"Dog Profile",
    //    logo:"/m_dog.svg"
    //  },
     {
       pathname:"/setting",
       title:"Setting",
       logo:"/m_setting.svg"
     },
     
  ]

  return (
    <div className="flex bg-white w-full z-50 fixed bottom-0 left-0">
          <ul className="flex items-center justify-between w-full">
            
            {
              Tabs.map((t,i)=>{
                return(
                   <li key={i} className={`flex gap-4 items-center py-2 px-4 ${t.pathname === pathname || pathname === `${t.pathname}/[id]` ? "bg-gradient-to-t from-white to-indigo-400":""}`}>
                      <Link href={t.pathname}><img src={t.logo} alt="Logo" className="" /></Link>
                   </li>
                  )
              })
            }

            {/*<li className="flex gap-4 items-center py-2 px-4">
              <Link href="/"><img src="/m_home.svg" alt="Logo" className="" /></Link>
            </li>
            <li className="flex gap-4 items-center py-2 px-4 border-t-4 border-t-purple-400">
              <Link href="/vetchat"> <img src="/m_chat.svg" alt="Logo" className="" /></Link>
            </li>
            <li  className="flex gap-4 rounded-md items-center py-2 px-4">
             <Link href="/users">
              <img src="/m_talk.svg" alt="Logo" className="" />
             </Link>
            </li>
            <li className="flex gap-4 items-center py-2 px-4">
             
              <Link href="/dogprofile"> <img src="/m_dog.svg" alt="Logo" className="" /></Link>
            </li>
            <li className="flex gap-4 items-center py-2 px-4">
             
              <Link href="/setting"> <img src="/m_setting.svg" alt="Logo" className="" /></Link>
            </li>*/}
          </ul>
    </div>
  );
};

export default SideNavbar;
