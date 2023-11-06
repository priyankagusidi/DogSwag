// pages/[id].js

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FaGlobeAsia } from 'react-icons/fa';
import { StartChatModal } from './index2';
import axios from 'axios'
import Modal from './index2'

const VetChatDoctorsProfile = ({handleStartChat,isChatModalOpen, setIsChatModalOpen,link,button_title,isEditing}) => {
  const router = useRouter();
  const { id } = router.query; // Access the dynamic value from the URL
  const [reason,setReason] = useState(null)
  const [doctor, setDoctor] = useState(null);

async function fetchDoctorDatas(){
  try {
    await axios.get(`/api/doctor/profile/one/${id}`).then(res=>{
      setDoctor(res.data.profile)
    })
  } catch(e) {
    // statements
    console.log(e);
  }
}
  
  useEffect(()=>{
    fetchDoctorDatas()
  },[])


function handleReasonInput(e){
   setReason(e.target.value)
}


const createChatRoom =async () =>{

    if(!reason){
      alert("Add a reason")
    }

    
    try {
      const { data } = await axios.post(
          `/api/chat`,{
            userId:doctor.userID,content:reason
          });
      console.log(data)
      setIsChatModalOpen(false)
      router.push(`/vetchat/${data._id}`)
    } catch(e) {
      console.log(e);
    }

 }  


 function accessChat(chat) {
    // fetchMessages(chat)
    // const pic = getSenderProfilePic(userdata.user , chat.users)
    // setSenderProfilePic(pic)
    // const name = getSenderName(userdata.user , chat.users)
    // setSenderProfileName(name)
    // setSelectedChat(chat)
    // socket.emit("join chat", chat._id);
}



  if (!doctor) {
    return <div className="flex justify-center items-center mt-32"><img src="/gif/spinner.svg" className="w-20"/></div>; // Show a loading state while fetching the data
  }
 

  // Function to handle "Start Chat" button click


  return (
  <div className="p-4 flex flex-col w-full gap-10 justify-center  bg-white">
    <Modal handleReasonInput={handleReasonInput} createChatRoom={createChatRoom} isModalOpen={isChatModalOpen} setIsModalOpen={setIsChatModalOpen}/>
      {/* doctor name image and start chat button */}
    <div className="p-4 border border-gray-300 rounded-lg rounded-lg">

  <div className="flex items-center">
<div className="flex items-center gap-4 ">
<img className="w-20 h-20 object-cover rounded-full" src={doctor.profilePic} alt="" />
<div>
<h2 className="text-[#101010] font-medium text-xl">{doctor.fullName}</h2>
<p className="text-sm  items-center font-normal flex gap-2 text-[#74747C]"> <img className="w-[16px]  h-[16px]" src="/earthSVG.svg" alt="" /> {doctor.country}, {doctor.city}</p>

</div>
</div>
<button className="ml-auto justify-end p-4 bg-yellow-500 hidden md:block text-white rounded-lg hover:after:content-['_↗']" onClick={()=>setIsChatModalOpen(true)}>Start Chat</button>
</div>
</div>


<div className="flex flex-col md:flex-row gap-10">

<div className="w-full md:w-4/12 flex border h-fit rounded-lg flex-col border-x border-gray-300 p-4 relative">
  <div className="py-3 border-b">
    <div className="flex gap-8 items-center  ">
    <img src="/hospitalSVG.svg" alt="" />
    <div>
      <p className="text-xs text-[#74747C] font-normal">Hospital / Clinic</p>
      <h3 className="text-[#101010] text-sm font-medium">{doctor.location}</h3>
    </div>
    </div>
  </div>
  <div className="py-3 border-b">
  <div className=" flex gap-8 items-center ">
  <img src="/starSVG.svg" alt="" />
    <div>
      <p className="text-xs text-[#74747C] font-normal">Years Of Experience</p>
      <h3 className="text-[#101010] text-sm font-medium">{doctor.experience}</h3>
    </div>
  </div>
  </div>
  <div className="py-3 ">
   <div  className="flex gap-8 items-center  ">
   <img src="/clockSVG.svg" alt="" />
    <div>
      <p className="text-xs text-[#74747C] font-normal">Available Time </p>
      <h3 className="text-[#101010] text-sm font-medium">{doctor.availTimeStart} - {doctor.availTimeEnd}</h3>
    </div>
   </div>
  </div>
  {
      isEditing ? 
     <div className="p-2 absolute -top-5 -right-5 border border-gray-300 rounded-full w-fit">
      <img src="/pencil.svg" className="w-5 h-5"/>
    </div>
    :
    <></>
     }
</div>



<div className="w-full md:w-8/12 border flex flex-col gap-5  border-gray-300 p-4 rounded-lg h-fit" >
<div className="flex flex-col gap-5 border-b py-3">
  <div className="flex gap-2 items-center relative w-fit">
   <img src="/doctorSVG.svg" className="w-6 h-6" alt="" /> 
   <h3 className="text-md font-bold">Professional Summary</h3>
   {
      isEditing ? 
     <div className="p-2 absolute -right-10 border border-gray-300 rounded-full w-fit">
      <img src="/pencil.svg" className="w-5 h-5 "/>
    </div>
    :
    <></>
     }
  </div>
   <p className="text-sm text-gray-500">{doctor.profSummery}</p>
</div>

<div className="flex flex-col gap-5 py-3">
  <div className="flex gap-2 items-center relative w-fit">
     <img src="/educationSVG.svg" className="w-6 h-6" alt=""/> 
     <h3 className="text-md font-bold">Education</h3>
     {
      isEditing ? 
     <div className="p-2 absolute -right-10 border border-gray-300 rounded-full w-fit">
      <img src="/pencil.svg" className="w-5 h-5 "/>
    </div>
    :
    <></>
     }
  </div>
  <ul className="list-disc list-inside px-[20px] mb-6">
    {
     doctor.education?.map((e,i)=>{
      return(
           <li key={i} className="list-items text-sm text-gray-500">{e}</li> 
        )
     })
    }
  </ul>
  
</div>
</div>
</div>

<div className="mb-10">
  
</div>
</div>
    
  );
};

export default VetChatDoctorsProfile;
