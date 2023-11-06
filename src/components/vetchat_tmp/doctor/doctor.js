// pages/[id].js

import React, { useEffect, useState,useRef } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios'
import Modal from './agreemodal'
import socket from '@/utils/socket';
import {FacebookShareButton ,LinkedinShareButton,WhatsappShareButton ,WhatsappIcon,FacebookIcon,LinkedinIcon} from 'react-share'


const VetChatDoctorsProfile = ({dogdata,doctorID,handleStartChat,isChatModalOpen, setIsChatModalOpen,link,button_title,isEditing,chatType}) => {
  const router = useRouter();
  const { id } = router.query; // Access the dynamic value from the URL

  console.log(id)

  const [reason,setReason] = useState("")
  const [doctor, setDoctor] = useState(null);
  const [selectedReason,setSelectedReason] = useState("Vomitting")
  const [isConnecting, setIsConnecting] = useState(false);

  console.log(selectedReason)
 const divRef = useRef();
    console.log(doctor)

  
async function fetchDoctorDatas(){
  alert('fetch')
  try {
    await axios.get(`/api/doctor/profile/one/${id}`).then(res=>{
      console.log(res)
      setDoctor(res.data.profile)
    })
  } catch(e) {
    // statements
    console.log(e);
  }
}
  
  useEffect(()=>{
    fetchDoctorDatas()
  },[id])


  const scrollToTop = () => {
    if (divRef.current) {
      divRef.current.scrollTop = 0;
    }
  };


function handleReasonInput(e){
   setReason(e.target.value)
}

function handleSelectReason(e) {
   setSelectedReason(e)
}


const createChatRoom =async () =>{


    if(!reason){
      alert("Add a note")
      return
    }

    if(!selectedReason){
      alert("select a reason")
      return
    }

    if(chatType === "normal"){
          try {
          const { data } = await axios.post(
              `/api/chat`,{
                userId:doctor.userID,content:`Reason:${selectedReason}\nNotes:${reason}`,new:true,mobile:doctor.mobile
              });
          console.log(data)
          setIsChatModalOpen(false)
          socket.emit("fetchchat",id)
          router.push(`/vetchat/${data._id}`)
        } catch(e) {
          console.log(e);
        }
      }
      

      // const text = "Bruno's prents would like to consult with Dr DogSwag \n Name - Bruno \n Gender-Male \n Age-11 years \n Weight -30 kg  \n Breed -German \n  Reason - Vomiting \n Notes - agag"

      if(chatType === "whatsapp"){
            const text = `Bruno's prents would like to consult with ${doctor.fullName} %0a🐶 Name - ${dogdata?.profile?.dogName} %0a🦴 Gender-${dogdata?.profile?.dogGender} %0a👉 Age-${dogdata?.profile?.dogAge} years %0a💪 Weight - ${dogdata?.profile?.dogAge} kg  %0a👻 Breed - ${dogdata?.profile?.dogBreed} %0a🤔  Reason - ${selectedReason} %0a📌 Notes - ${reason}`  
            setIsConnecting(true);

           const isMobile = navigator.userAgentData.mobile;

           setTimeout(() => {
              window.open(
                `${isMobile ? `http://wa.me/919611700874?text=${text}` :`https://web.whatsapp.com/send/?phone=919611700874&text=${text}&type=phone_number&app_absent=0`}`,
                "_target"
              );
              setIsConnecting(false);
            }, 5000); // 5000 milliseconds = 5 seconds
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
    return <div className="flex justify-center mt-20 h-screen"><img src="/gif/spinner.svg" className="w-20 h-20 "/></div>; // Show a loading state while fetching the data
  }

  return (
  <div ref={divRef}  className="p-4 flex flex-col w-full gap-10 justify-center border border-black bg-white">
    <Modal  isConnecting={isConnecting} handleSelectReason={handleSelectReason} dogdata={dogdata} reason={reason} handleReasonInput={handleReasonInput} createChatRoom={createChatRoom} isModalOpen={isChatModalOpen} setIsModalOpen={setIsChatModalOpen}/>
      {/* doctor name image and start chat button */}
    <div className="p-4 border border-gray-300 rounded-lg rounded-lg">

  <div className="flex items-center justify-between">
    <div className="flex items-center gap-4 ">
    <img className="w-20 h-20 object-cover rounded-full" src={doctor.profilePic} alt="" />
    <div>
    <h2 className="text-[#101010] font-medium text-xl">{doctor.fullName}</h2>
    <p className="text-sm  items-center font-normal flex gap-2 text-[#74747C]"> <img className="w-[16px]  h-[16px]" src="/earthSVG.svg" alt="" /> {doctor.country}, {doctor.city}</p>

    </div>
   </div>

  <div className="flex gap-2 ">
  
  <button className="ml-auto justify-end p-4 bg-green-500 hidden md:block text-white rounded-lg hover:after:content-['_↗']" onClick={()=>handleStartChat("whatsapp")}>Whatsapp Chat</button>
  <button className="ml-auto justify-end p-4 bg-[#FFCB07] hidden md:block text-white rounded-lg hover:after:content-['_↗']" onClick={()=>handleStartChat("normal")}>Start Chat</button>
  </div>


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
  <button onClick={scrollToTop} className="p-2 bg-amber-800">scrollTop</button>
  
</div>
</div>
    
  );
};

export default VetChatDoctorsProfile;
