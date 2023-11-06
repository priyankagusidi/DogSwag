import axios from 'axios'
import { useRouter } from 'next/router'
import { Menu } from '@mantine/core';
import {useState} from 'react'

export default function Index({notificationdata}){
    const [notifications,setNotifications] = useState(notificationdata ? notificationdata.notification :[])

   console.log(notifications)

    const router = useRouter();


	  async function onRead(id,link){

        const read = notifications.map((m,i)=>{
            if(m._id === id){
                return {...m,read:true}
            }else {
                return {...m}
            }
        }) 

        await axios.put(`/api/notifications/read/${id}`,null).then(res=>{
            console.log(res.data)
            router.push(link)
        })
        setNotifications(read)
      }

      async function markAllAsRead(){
        const readall = notifications.map((m,i)=>{
            if(m.read === false){
               return {...m,read:true}                
            }else {
                return {...m}
            }
        })
        setNotifications(readall)

        await axios.put(`/api/notifications/readall`,null).then(res=>{
            console.log(res.data)
        })
      }
	return(
		  <div className="flex items-center font-[poppins]">
                    <Menu shadow="md" width={300} position = "bottom-end" withArrow transition="pop-bottom-right">
                    <Menu.Target>
                     <div className="relative">
                      <img src="/img/notification.svg" className='h-5 w-5 hover:opacity-60 transition cursor-pointer' alt="" />

                      {notifications && notifications.some(obj => obj.hasOwnProperty('read') && obj.read === false) ?<span className="absolute bg-red-600 w-2 h-2 rounded-full top-0 "></span>:""}
                     </div>
                    </Menu.Target>

                    <Menu.Dropdown >
                     <div className="h-40 p-2 text-xs overflow-y-auto cursor-pointer">
                       <div className="border-b border-gray-300 flex justify-between">
                         <h1 className="font-bold p-1">Notifications</h1>
                         <span className="flex items-center gap-1" onClick={markAllAsRead}><img src={"/assets/icons/double-check.svg"} className="w-4"/>Mark all as read</span>
                       </div>
                       <div className="mt-1">
                        {
                            notifications && notifications.map((m,i)=>{
                                return (
                                      <div key={i} className="p-1 border-b font-[poppins] hover:bg-gray-100">
                                         <div onClick={()=>onRead(m._id,m.link)} className={`${m.read===false ?"font-semibold":"font-normal"} flex gap-2`}> <img src={m.sender.profilePic} className="w-4 rounded-full bg-gray-100"/>{m.message}</div>
                                      </div>
                                    )
                            }).sort((a,b)=>b-a)
                        }
                        </div>
                     </div>    
                    </Menu.Dropdown>
                    </Menu>
                </div>
		)
}