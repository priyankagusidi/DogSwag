import React, { useState, useEffect } from 'react';
import Link from 'next/link';
// import { FaSnapchat } from 'react-icons/fa';
import axios from 'axios'
import {useRouter} from 'next/router'
import socket from '@/utils/socket';

const SideNavbar = ({userdata,long,showOnline}) => {

  const [chats,setChats] = useState([])
   const router = useRouter()  
   const {id} = router.query
   const [roomList,setRoomList] = useState([])


   async function logout() {
    try {
        router.push("/")
        await axios.get(`/api/auth/logout`)
        return router.push("/vetchatlogin")
    } catch (err) {
        console.log(err)
    }
}

  const fetchChats = async (id) =>{
     try{
        await axios.get('/api/chat').then(res=>{
          console.log(res.data)
          setChats(res.data)
        })
     }catch(e){

     }
   }

   useEffect(()=>{


   	
    fetchChats()
    socket.emit("setup",userdata && userdata.user);
    socket.emit("activeroom",null)
    // Clean up the event listener when component unmounts
    // return () => {
    //   socket.off("userList");
    // };
   socket.on("roomList", (updatedUserList) => {
        console.log("roomList",updatedUserList)
        setRoomList(updatedUserList);
   });

   return () => {
    socket.disconnect();
  };

   },[])

   useEffect(()=>{
      socket.on("fetchchat", (id) => {
       console.log("fetchChats")
       fetchChats()
      });
   })


 
    
 // var clients = socket.clients();

 // console.log(clients)


console.log(roomList)

const getSenderName = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1].displayName : users[0].displayName;
};

const getSenderProfilePic = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1].profilePic : users[0].profilePic;
};

  return (
    <div className={`flex flex-col h-screen justify-between bg-white rounded-xl z-50 border ${!long ?'w-56':'w-full'}`}>
      <div>

      {
       	!long?
       	 <div onClick={()=>router.push('/doctor/profile')} className="p-4 bg-white gap-2 cursor-pointer  border-b flex justify-center items-center border-gray-300 z-10">
               <img src="/logo.png" alt="Logo" className="h-10 w-10 absolute left-6" />
               <span className="text-xl text-[#5F2600] font-semibold">DogSwag</span>
          </div>
          :
          <div>
          	
          </div>
       }
         
       {/*
        <div className="flex border gap-2 p-4">
          <img src="/logo.png" alt="Logo" className="h-10 w-10" />
          <span className="text-2xl text-[#5F2600] font-semibold">DogSwag</span>
        </div>*/}
       {
       	 chats.map((c,i)=>{
       	 	return(
       	 		  <a target={c._id} key={c._id} href={`/vetchat/${c._id}`} className="w-full border-b relative">
       	 		    <div className={`flex gap-2 p-4  ${c._id === id ? "bg-gray-100":""} w-full items-center`}>
				       <div className="">
				       	  <img src={getSenderProfilePic(userdata.user , c.users)} className="w-10 h-10 rounded-full object-cover border border-gray-300"/>
				       </div>
				       <div className="flex flex-col">
				          <h1 className="text-xs text-gray-500">{getSenderName(userdata.user , c.users)}</h1>
				          <p className="text-sm">{c.latestMessage && c.latestMessage.content.substring(0,10)}...</p>
				       </div>
				    </div>
            {
            showOnline && roomList.includes(c._id) ?
            <div className="rounded-full absolute bg-purple-500 p-1 top-7 right-10 animate-ping"></div>
            :
            <></>
            }
				    </a>
       	 		)
       	 })
       }  


      </div>
       
      

      <div onClick={logout} className="flex gap-4 items-end border py-4 px-6 mt-auto">
            <img src="/logoutLogo.png" alt="Logo" className="h-8 w-8" />
            <button className="text-lg hidden lg:block">Logout</button>
          </div>

    </div>
  );
};

export default SideNavbar;
