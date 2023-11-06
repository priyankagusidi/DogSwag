

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// import { FaGlobeAsia } from 'react-icons/fa';
import Link from 'next/link'
import {Modal} from '@mantine/core'
import { Tabs,Menu,Popover ,Stepper} from '@mantine/core';
import EditModal from './editModal'
import axios from 'axios'
import { blobToURL, fromBlob } from 'image-resize-compress';
// import { convertToBlob } from 'image-conversion';
import AvatarEditor from 'react-avatar-editor'
import CustomSchedules from '@/components/schedule/customschedule'
import ScheduleView from '@/components/schedule/scheduleView'
import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'

import { HoverCard, Button, Text, Group } from '@mantine/core';

// import NotificationRequest from './notification';
import {toast,Toaster} from 'react-hot-toast'
import socket from '@/utils/socket';

dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)


const appointmentlist = [
    {
    name:'Bapun Hansdah',
    status:'pending',
    slot:' 14 sep 23, 6:30 - 7:00'
    },
    {
    name:'Barun Hansdah',
    status:'pending',
    slot:' 14 sep 23, 6:30 - 7:00'
    },
      {
    name:'Sourav pal',
    status:'pending',
    slot:' 14 sep 23, 6:30 - 7:00'
    },
      {
    name:'Michel',
    status:'pending',
    slot:' 14 sep 23, 6:30 - 7:00'
    }
]

const VetChatDoctorsProfile = ({notified,setIsNotified,openSchedule,setOpenSchedule,Schedule,userdata,doctordata,isEditing,button_title,handleStartChat,setIsChatModalOpen}) => {
  
  const [doctor,setDoctor] = useState(doctordata ? doctordata.profile : {} )
  const router = useRouter()
  const [isOpen,setOpen] =useState(false)
  const [type,setType] = useState("")
     const [selectedImage,setSelectedImage] = useState(null)
    const [pic,setPic] = useState("")

     const [selectedImageDoc,setSelectedImageDoc] = useState(null)
   const [picDoc,setPicDoc] = useState("")
      const [resizerDoc,setResizerDoc] = useState(false)


    const [imageDoc, setImageDoc] = useState(null);
    const [editorDoc, setEditorDoc] = useState(null);
    const [scaleDoc, setScaleDoc] = useState(1);



    const [loading,setLoading] = useState(false)
    const [resizer,setResizer] = useState(false)

    const [image, setImage] = useState(null);
    const [editor, setEditor] = useState(null);
    const [scale, setScale] = useState(1);
    const [videos,setVideos] = useState([])
    const [videoId,setVideoId] = useState("") 
    // const [openSchedule,setOpenSchedule] = useState(false)
    const [appointments,setAppointments] = useState(appointmentlist)
    const [status,setStatus] = useState()
    const [isScheduling,setIsScheduling] = useState(false)
    const [index,setIndex] = useState(null)
    
    const [dayIndex,setDayIndex] = useState(null)
    const [currentDate, setCurrentDate] = useState(dayjs().startOf('day'));
   const [slotId,setSlotId] = useState(null)
   const [messages,setMessages] = useState(null)
   const [bookId,setBookId] = useState(null)
  const [timeSlots,setTimeSlots] = useState([])
  const [dateRange,setDateRange] = useState(14)
  const [today ,setToday ] = useState(dayjs())
  const [showDog,setShowDog] = useState(0)
  const [dogProfile,setDogProfile] = useState({_id:"1",name:"N/A",breed:"N/A",weight:"N/A",age:"N/A"})
  const [doctorList,setDoctorList] = useState([])
  const [openAddDoctorModal,setOpenAddDoctorModal] = useState(false)
  const [doctorInfo,setDoctorInfo] = useState({})
  const [doctorIndex,setDoctorIndex] = useState(0)

  const [chatOption,setChatOption] = useState(true)
  const [scheduleOption,setScheduleOption] = useState(true)
  const [active,setActive] = useState(0)
  const [eductionText,setEducationText] = useState("")
  const [educationList,setEducationList] = useState([
          "Doctor of Veterinary Medicine (DVM): University of Veterinary Sciences 2010",
"Certification in Advanced Small Animal Surgery, 2012"
])

  // const [notified,setIsNotified] = useState(false)

  const [slot,setSlot] = useState({})

   useEffect(()=>{

    socket.on("notify", (id) => {
      console.log('notified')
      setIsNotified(true)
      getBookings()
    });

  })


    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setImage(URL.createObjectURL(selectedFile));
    };

    const handleScaleChange = (e) => {
        const newScale = parseFloat(e.target.value);
        setScale(newScale);
    };


     const handleCrop = () => {

      setResizer(false)
        if (editor) {
            const canvas = editor.getImageScaledToCanvas();
            canvas.toBlob((blob) => {
                // Now you have the cropped and resized blob ready for uploading
                // You can use this blob for further processing or upload it

                // Example: Uploading the cropped and resized image using your function
                const quality = 5;
                const width = 0;
                const height = 0;
                const format = 'webp';

                fromBlob(blob, quality, width, height, format).then((processedBlob) => {
                    console.log(processedBlob);
                    updateImage(blob)

                    // Call your updateImage function here
                });
            });
        }
    };


  function editInfo(type){
    setOpen(true)
    setType(type)
  }


   useEffect(()=>{
    

     socket.emit("setup",userdata && userdata.user);
     getDoctors()
    

  },[])


  async function getDoctorData(){
    setLoading(true)
    try {
       await axios.get(`/api/doctor/profile/one`,{
            credentials: 'include'
      }).then(res=>{
         console.log(res.data.profile)
         setDoctor(res.data.profile)
    setLoading(false)

      })
    } catch(e) {
      // statements
      console.log(e);
    setLoading(false)

    }
  }


  const handleNotificationPermission = () => {
    if (!('Notification' in window)) {
      console.log('This browser does not support Web Notifications.');
    } else if (Notification.permission === 'granted') {
      console.log('You already have permission to send notifications.');
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('You now have permission to send notifications.');
        }
      });
    }
  };



  useEffect(()=>{
     handleNotificationPermission()
  },[])

function onSelectedFile(e){
         // alert("hello")
        const maxSize = 1024 * 1024
       
        const selectedArray = Array.from(e.target.files)

        const imageArray = selectedArray.map((file)=>{
            return URL.createObjectURL(file)
        })

        const quality = 5;
        const width = 0;
        const height = 0;
        const format = 'webp';
    
        console.log(e.target.files[0])

         fromBlob(e.target.files[0], quality, width, height, format).then((blob) => {
           console.log(blob);
           updateImage(blob)
         });

        setSelectedImage(imageArray[0])
}

async function updateImage(blob){
         
        console.log(blob)
         
        const formData = new FormData();
        formData.append("profilePic", blob)
        formData.append("education",JSON.stringify(doctor.education))
        setLoading(true)
      
      try {
          await axios.put('/api/doctor/profile/edit',formData).then(async res=>{
              // fetchDogProfile()
            await getDoctorData()
            setLoading(false)
          })
        } catch(e) {
            console.log(e);
            setLoading(false)
        }
    }


function handleVideos(e){
   setVideoId(e.target.value)
}
function addVideo() {
    setVideos([...videos,{id:videoId}])
}




useEffect(()=>{
    getBookings()
    getAvail()
},[])

async function Action(index,action,slotId){
            
            setMessages(``)

    try{
        await axios.put(`/api/schedule/booking/${slotId}/${userdata?.user?._id}`,{status:action}).then(res=>{
          console.log(res.data)
          toast.success(`Your Appointment is ${action}. A sms will be sent to the user.`)
          socket.emit("notify",res?.data?.booking?.userId)

        })
      } catch(err){
        console.log(err)
      }

    const status = appointments.map((m,i)=>{
        if(index === i){

            // setMessages(`Your Appointment is ${action}. A sms will be sent to the user.`)
            return {...m,status:action}
        }else{
            return {...m}
        }
    })
    
    setTimeout(()=>{
            setMessages(null)
    },10000 )

    setAppointments(status)
}


function Reschedule(id,index) {
   setIndex(index)
   setIsScheduling(true)
   setBookId(id)
}

async function SaveChange(){
     setIsScheduling(false)
     console.log(slotId,slot)
     // return
     try{
        await axios.put(`/api/schedule/reschedule/${bookId}/${userdata?.user?._id}`,{date:currentDate.add(dayIndex, 'day').format('YYYY-MM-DD'),slot}).then(res=>{
          socket.emit("notify",res?.data?.booking?.userId)
        })
        
        toast.success(`Your Appointment is rescheduled. A sms will be sent to the user.`)

      // const status = appointments.map((m,i)=>{
      //   if(bookId === m._id){
      //       toast.success(`Your Appointment is rescheduled. A sms will be sent to the user.`)
      //       setMessages(`Your Appointment is rescheduled. A sms will be sent to the user.`)
      //       return {...m,status:'pending',slot:`${currentDate.add(dayIndex, 'day').format('DD MMM YY')}, ${slot.start} - ${slot.end}`}
      //   }else{
      //       return {...m}
      //   }
      //  })

        getBookings()

    // setAppointments(status)



     }catch(err){
        console.log(err)
     }




    setTimeout(()=>{
            setMessages(null)
    },5000 )

}

console.log(videos)


 async function getBookings(){
   try{
      await axios.get(`/api/schedule/booking/doctor`).then(res=>{
        console.log(res.data)
        setAppointments(res.data.bookings)
      })
   }catch(err){
      console.log(err)
   }
 }


  async function getAvail(){
   try{
      await axios.get(`/api/schedule/availbility/one/${userdata?.user?._id}`).then(res=>{
        console.log(res.data.availability.schedule)
        setTimeSlots(res.data.availability.schedule)
      })
   }catch(err){
      console.log(err)
   }
 }


function shareOnWhatsapp(argument) {

    const isMobile = navigator.userAgentData.mobile;
    const link = 'http://localhost:3000/doctor/doctorid'
    window.open(
                `${isMobile ? `whatsapp://send/?text=${link}` :`https://web.whatsapp.com/send/?text=${link}`}`,
                "_target"
              );
}

console.log(dayjs(today)?.format("DD MMM YY"))

// const filters = [0, 7, 14, -7, -14, -21]; // 0 for today, positive for future, negative for past

// const filteredAppointments = filters.map((days) =>
//   appointments.filter((a) =>
//     dayjs(a.date).isSameOrAfter(today.add(days, 'day'), 'day')
//   )
// );
let filteredObjects = []

if(dateRange === 0 || dateRange >1 ){

 filteredObjects = appointments.filter((obj) => {
  const objDate = dayjs(obj.date);
  return objDate.isSameOrAfter(today, 'day') && objDate.isSameOrBefore(today.add(dateRange, 'day'), 'day');
});
}
else{
  filteredObjects = appointments.filter((obj) => {
  const objDate = dayjs(obj.date);
  return objDate.isSameOrAfter(today.subtract( Math.abs(dateRange), 'day'), 'day') && objDate.isSameOrBefore(today, 'day');
});


}


let filterByStatus= [];

if(status){
   filterByStatus = filteredObjects.filter((obj) => {
      return obj.status === status; // Change "pending" to the status you want to filter by
   });
}else{
    filterByStatus = filteredObjects
}




let canceledCount = 0;
for (const appointment of appointments) {
  if (appointment.status === "canceled") {
    canceledCount++;
  }
}


console.log(doctorInfo)

function handleChangeDoctorInfo(e) {
  if (e.target.type === "checkbox") {
    setDoctorInfo({
      ...doctorInfo,
      [e.target.name]: e.target.checked,
    });
  } else {
    setDoctorInfo({
      ...doctorInfo,
      [e.target.name]: e.target.value,
    });
  }
}


async function saveDoctor(){
     // setDoctorList([...doctorList,doctorInfo])
     // setOpenAddDoctorModal(false)
     // console.log(doctorInfo)
     // return
       console.log(doctorInfo)
       // return
    // email,fullname,phoneno,profilePic,isChatAvailable,isScheduleAvailable

        const formData = new FormData();
        formData.append("fullname", doctorInfo.fullname)
        formData.append("email", doctorInfo.email)
        formData.append("phoneno", doctorInfo.phoneno)
        formData.append("location", doctorInfo.location)
        formData.append("city", doctorInfo.city)
        formData.append("country", doctorInfo.country)
        formData.append("isChatAvailable", doctorInfo.isChatAvailable)
        formData.append("isScheduleAvailable", doctorInfo.isScheduleAvailable)
        formData.append("experience", doctorInfo.experience)
        formData.append("availTimeStart", doctorInfo.availTimeStart)
        formData.append("availTimeEnd", doctorInfo.availTimeEnd)
        formData.append("profSummery", doctorInfo.profSummery)
        formData.append("education", JSON.stringify(educationList))
        formData.append("profilePic", picDoc)

     setOpenAddDoctorModal(false)
     try{
        await axios.post('/api/auth/doctor/signup',formData).then(res=>{
            console.log(res)
            toast.success("Doctor added successfully!")
            getDoctors()
        })
     }catch(err){
        console.log(err)
        toast.error(err?.response?.data?.msg)
     }
}


async function getDoctors(){
  setLoading(true)
    try{
        await axios.get(`/api/doctor/profile/byclinic/all`).then(res=>{
            console.log(res)
            setDoctorList(res.data.doctors)
            setLoading(false)
        })
    }catch(err){
        console.log(err)
        setLoading(false)
    }
}

async function deleteDoctor(id,i) {
   // const dele = doctorList.filter((m,i)=>i !== index)
   // setDoctorList(dele)

   if (!confirm("Are you sure?")) {
    // Code to execute if the user clicks "OK"
     return
    } 
   try{
      await axios.delete(`/api/auth/doctor/delete/${id}`).then(res=>{
        console.log(res.data)
        getDoctors()
      })
   }catch(err){
    console.log(err)
   }

}


   const nextStep = () => {


     //   if(active === 0){
     //    if(!pic){
     //      alert("profile pic Required")
     //      return
     //    }
     //    if(!info.fullName || !info.city || !info.country){
     //      alert("Fill required input !")
     //      return
     //    }
     // }

     if(!picDoc){
      alert("Profile picture required")
      return
    }

     // if (active === 1) {
     //     if(!info.experience || !info.location){
     //        alert("Fill required input !")
     //        return
     //     }
     // }



      setActive((current) => (current < 2 ? current + 1 : current));
  }


  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));


  const handleEducationChange = (e) =>{
    setEducationText(e.target.value)
  }

  const AddEducation = () =>{
    setEducationList([...educationList,eductionText])
  }


     const handleFileChangeDoc = (e) => {
        const selectedFile = e.target.files[0];
        setImageDoc(URL.createObjectURL(selectedFile));
    };

    const handleScaleChangeDoc = (e) => {
        const newScale = parseFloat(e.target.value);
        setScaleDoc(newScale);
    };


     const handleCropDoc = () => {

      setResizerDoc(false)
        if (editorDoc) {
            const canvas = editorDoc.getImageScaledToCanvas();
            canvas.toBlob((blob) => {
                // Now you have the cropped and resized blob ready for uploading
                // You can use this blob for further processing or upload it

                // Example: Uploading the cropped and resized image using your function
                const quality = 5;
                const width = 0;
                const height = 0;
                const format = 'webp';

                fromBlob(blob, quality, width, height, format).then((processedBlob) => {
                    console.log(processedBlob);
                    setSelectedImageDoc(URL.createObjectURL(processedBlob)); 
                    setPicDoc(blob)                    
                });
            });
        }
    };


async function getDocInfo(id,i){
    setDoctorIndex(i)
    try{
        await axios.get(`/api/doctor/profile/one/${id}`).then(res=>{
            setDoctor(res.data.profile)
        })
    }catch(err){
        console.log(err)
    }

}


 function deleteExp(index){
     const del = educationList.filter((e,i)=> i !== index)
     setEducationList(del)
  }


  function customerSupport(){
    const isMobile = navigator.userAgentData.mobile;

        window.open(
          `${isMobile ? `whatsapp://send/?phone=919611700874&text=${"Hi"}` :`https://web.whatsapp.com/send/?phone=919611700874&text=${"Hi"}&type=phone_number&app_absent=0`}`,
          "_target"
        );
}



console.log(doctor)

// return null

  return (
    <div className="p-4 flex flex-col w-full gap-10 justify-center  bg-white">

    
      {/* doctor name image and start chat button */}
    <div className="p-4 border border-gray-300 rounded-lg rounded-lg">

  <div className="flex items-center justify-between">
<div className="flex items-center  gap-4 relative ">
{/*<img className="w-20 h-20 object-cover rounded-full" src={doctor.profilePic} alt="" />*/}
 <div className="flex justify-center">
     <span className="relative" onClick={()=>setResizer(true)}>
     {/*<input id="profilePicture" accept="image/*" type="file" onChange={onSelectedFile} className="hidden" />*/}

     <label htmlFor="profilePicture"className="flex h-24 absolute w-full justify-center items-center hover:opacity-50 cursor-pointer">
       {/*<BsCamera size={20}/>           */}
       <img src="/assets/icons/mode-portrait.svg" className="w-4 h-4"/>       
     </label>
        {
          loading && <img src="/gif/spinner.svg" className="absolute"/>
        }
        <img  className="h-24 w-24 rounded-full object-cover  border border-gray-200 bg-gray-100" src={doctor?.profilePic || "/doguser.png"} />
     </span>
     <Modal
        opened={resizer}
        onClose={()=>setResizer(false)}
     >
     <div className="flex flex-col gap-5">
            <input type="file" onChange={handleFileChange} />
            {image && (
                <div className="flex flex-col gap-2">
                    <AvatarEditor
                        ref={(editorRef) => setEditor(editorRef)}
                        image={image}
                        width={250}
                        height={250}
                        border={50}
                        scale={scale}
                    />
                    <div className="flex gap-2 items-center text-sm">
                    <label>Zoom</label>
                    <input
                        type="range"
                        min="1"
                        max="2"
                        step="0.01"
                        value={scale}
                        onChange={handleScaleChange}
                    />
                    </div>
                    <button className="p-2 bg-yellow-500 rounded-xl" onClick={handleCrop}>Crop & Upload</button>
                </div>
            )}
        </div>
      </Modal>
  </div>
<div>

<h2 className="text-[#101010] font-medium text-xl">{userdata?.user?.clinicName}</h2>
<p className="text-sm items-center font-normal flex gap-2 text-[#74747C]"> <img className="w-[16px]  h-[16px]" src="/earthSVG.svg" alt="" /> {doctor.country}, {doctor.city}</p>

</div>

{
      isEditing ? 
     <div onClick={()=>editInfo("profile")} className="p-2 absolute -right-10 border border-gray-300 rounded-full w-fit">
      <img src="/pencil.svg" className="w-5 h-5"/>
    </div>
    :
    <></>
     }


</div>
<div className="flex gap-2 justify-end">
{
   scheduleOption &&  
   <button onClick={Schedule} className={`ml-auto ${notified ? "animate-pulse":""} justify-end  bg-blue-500 text-white rounded-lg p-4 hidden md:block hover:after:content-['_↗']`}>Schedule</button>
}
{/* {
  chatOption && 
  <button onClick={handleStartChat} className={`ml-auto ${notified ? "animate-pulse":""} justify-end  bg-yellow-500 text-white rounded-lg p-4 hidden md:block hover:after:content-['_↗']`}>Start Chat</button>
} */}
 <HoverCard width={280} shadow="md">
        <HoverCard.Target>
           <button  className={`  ml-auto justify-end p-4 bg-[#FFCB07] hidden md:block text-white rounded-lg hover:after:content-['_↗']`} onClick={()=>handleStartChat("normal",doctor)}>Start Chat</button>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Text size="sm">
            Live chat with pet parent is optional. Chat is free for the Pet Parents but DogSwag will Share 50% revenue generated through Google Ads. For more information contact Sunder Raman or founders@dogswag.club
          </Text>
        </HoverCard.Dropdown>
      </HoverCard>
</div>
</div>
</div>


<div className="flex flex-col md:flex-row gap-10">
<div className="w-full md:w-4/12 flex flex-col gap-5">

<div className="flex border h-fit rounded-lg flex-col border-x border-gray-300 p-3 relative">

   <Modal 
     opened={openAddDoctorModal}
     onClose={()=>setOpenAddDoctorModal(false)}
   >
      <Stepper  color="yellow" size="xs" active={active} onStepClick={setActive}>
          <Stepper.Step >
        <h2 className="text-2xl font-bold mb-4">Step 1: Basic</h2>

   <div className="flex flex-col gap-5 w-full gap-5">

       <label htmlFor="profilePic" className="block mb-2">
              Profile Picture:
            </label>
            <div onClick={()=>setResizerDoc(true)} className="flex justify-center">
             <span className="relative">
             {/*<input id="profilePicture" accept="image/*" type="file" onChange={onSelectedFile} className="hidden" />*/}
             <label htmlFor="profilePicture"className="flex h-24 absolute w-full justify-center items-center hover:opacity-50 cursor-pointer">
               {/*<BsCamera size={20}/>           */}
               <img src="/assets/icons/mode-portrait.svg" className="w-4 h-4"/>       
             </label>
                <img className="h-24 w-24 rounded-full object-cover  border border-gray-200 bg-gray-100" src={selectedImageDoc || "/img/defaultprofile.jpg"} />
             </span>
            </div>


       <div className="flex w-full flex-col gap-2">
           <input value={doctorInfo.fullname} onChange={handleChangeDoctorInfo} className="p-2 border border-gray-300 rounded-lg w-full" name="fullname" placeholder="Full name" />
           <input value={doctorInfo.email} onChange={handleChangeDoctorInfo} className="p-2 border border-gray-300 rounded-lg w-full" name="email" placeholder="Email" />
           <input value={doctorInfo.phoneno} onChange={handleChangeDoctorInfo} className="p-2 border border-gray-300 rounded-lg w-full" name="phoneno" placeholder="Phone no" />
       </div>
      
       <div className="flex border h-fit rounded-lg flex-col border-x border-gray-300 p-3 relative">

             <p className="mt-2">Choose options</p>
             <label className="p-2 flex items-center gap-3">
             <input checked={doctorInfo.isChatAvailable} name={"isChatAvailable"} onChange={handleChangeDoctorInfo} type="checkbox"/>
               Chat
             </label>

              <label className="p-2 flex items-center gap-3">
               <input checked={doctorInfo.isScheduleAvailable} name={"isScheduleAvailable"} onChange={handleChangeDoctorInfo}  type="checkbox"/>
               Schedule
             </label>
        </div>


   </div>
        </Stepper.Step>
    <Stepper.Step>
        <h2 className="text-2xl font-bold mb-4">Step 2: Details</h2>
            <label htmlFor="experience" className="block mb-2">
              Experience:
            </label>
            <input
              type="number"
              id="experience"
              name="experience"
              value={doctorInfo.experience}
              onChange={handleChangeDoctorInfo}
              className="border border-gray-300 px-4 py-2 rounded-md w-full mb-4"
            />
  <label htmlFor="location" className="block mb-2">
              Location:
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={doctorInfo.location}
              onChange={handleChangeDoctorInfo}
              required
              className="border border-gray-300 px-4 py-2 rounded-md w-full mb-4"
            />
<label htmlFor="location" className="block mb-2">
              City:
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={doctorInfo.city}
              onChange={handleChangeDoctorInfo}
              required
              className="border border-gray-300 px-4 py-2 rounded-md w-full mb-4"
            />
            <label htmlFor="location" className="block mb-2">
              Country:
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={doctorInfo.country}
              onChange={handleChangeDoctorInfo}
              required
              className="border border-gray-300 px-4 py-2 rounded-md w-full mb-4"
            />
            <label htmlFor="availTimeStart" className="block mb-2">
              Available Time:
            </label>
            <div className="grid grid-cols-2 gap-2">
            <input
              type="time"
              id="availTimeStart"
              name="availTimeStart"
              value={doctorInfo.availTimeStart}
              onChange={handleChangeDoctorInfo}
              className="border border-gray-300 px-4 py-2 rounded-md w-full mb-4"
            />
            <input
              type="time"
              id="availTimeEnd"
              name="availTimeEnd"
              value={doctorInfo.availTimeEnd}
              onChange={handleChangeDoctorInfo}
              className="border border-gray-300 px-4 py-2 rounded-md w-full mb-4"
            />
            </div>
    </Stepper.Step>

     <Stepper.Step>
          <div>
            <h2 className="text-2xl font-bold mb-4">Step 3: Profession Experience & Education</h2>
            <label htmlFor="profSummery" className="block mb-2">
              Profession Experience:
            </label>
            <textarea
              type="text"
              id="profSummery"
              name="profSummery"
              value={doctorInfo.profSummery}
              onChange={handleChangeDoctorInfo}
              className="border border-gray-300 px-4 py-2 rounded-md w-full mb-4 h-40"
            />
            <label htmlFor="profSummery" className="block mb-2">
              Education:
            </label>
            <div className="flex gap-1">
            <input
              type="text"
              id="education"
              name="education"
              value={doctorInfo.eduction}
              onChange={handleEducationChange}
              className="border border-gray-300 px-4 py-2 rounded-md w-10/12"
            />
             <button className="p-2 bg-[#FFCB07] w-2/12 rounded-md" onClick={AddEducation}>Add</button>
            </div>
            <ul className="p-2 flex flex-col gap-2">
            {
                educationList.map((e,i)=>{
                    return(
                    
                        <li  key={i} className="rounded-xl text-start items-center relative p-1 flex gap-2  bg-white">
                        <div className="w-11/12 p-1">{e}</div>
                        <div onClick={()=>deleteExp(i)} className="w-1/12 flex justify-center absolute bg-red-500 right-0 p-2 cursor-pointer"><img src={"/assets/icons/cross.svg"} className="w-4"/></div>
                      </li>
                        )
                })

            }
            </ul>
          </div>
          </Stepper.Step>        

    </Stepper>

    {/*<button className="p-2 bg-amber-500 w-32 rounded-xl" onClick={saveDoctor}>Save</button>*/}
      <div className="flex w-full justify-center gap-4">
        {
           active < 2 ?
            <button className="p-2 bg-yellow-500 w-32" onClick={nextStep}>Next</button>  
            :
            <button className="p-2 bg-yellow-500 w-32" onClick={saveDoctor}>Submit</button>  
        }
        </div>


   </Modal>
   <h2 className="font-semibold">Doctors</h2>
 

   <ul className="flex flex-col gap-3  mt-4">
     {
        doctorList.map((d,i)=>{
            return(
                   <li key={i}  className={`${doctorIndex === i ? "bg-gray-100":"" } cursor-pointer flex justify-between items-center  p-2 rounded-xl`}>
                        <div onClick={()=>getDocInfo(d._id,i)} className="flex gap-2 items-center  w-full">
                        <img className="w-6 h-6 rounded-full" src={d.profilePic || "/img/defaultprofile.jpg"}/>
                        <h3>{d.displayName}</h3>
                        </div>
                        <div>
                          
                        </div>
                        <div className="flex gap-4 items-center">
                        <div className='p-2 bg-amber-500 animate-pulse rounded-full'></div>
                        <button onClick={()=>deleteDoctor(d._id,i)}><img src="/assets/icons/cross.svg" className="w-4"/></button>
                        </div>
                    </li>
                )
        })
     }
   
    </ul> 
 
    <div className='flex gap-2  flex-col mt-5'>
      <h3 className="text-sm text-gray-800">Add doctors by clicking on the button below.</h3>
      <button onClick={()=>setOpenAddDoctorModal(true)} className="flex items-center w-32 gap-2 cursor-pointer bg-amber-300 p-2 rounded-xl">
       <img src="/assets/icons/plus.svg" className="w-4"/>
       <h4 className="text-sm">Add Doctors</h4>
      </button>
    </div>
</div>

{/*<div className="flex border h-fit rounded-lg flex-col border-x border-gray-300 p-3 relative">
 <h2 className="font-semibold">Settings</h2>

 <p className="mt-2">Choose one option</p>
 
 <label className="p-2 flex items-center gap-3">
 <input onChange={()=>setChatOption(!chatOption)} checked={chatOption} type="checkbox"/>
   Chat
 </label>

  <label className="p-2 flex items-center gap-3 opacity-40">
 <input disabled={true} onChange={()=>setScheduleOption(true)} checked={true} type="checkbox"/>
   Schedule
 </label>
</div>*/}

{
  loading ?
  <>loading...</>
  :
  <div className="flex border h-fit rounded-lg flex-col border-x border-gray-300 p-4 relative">
<div className="flex gap-2 items-center relative w-fit my-2">
   <img src="/doctorSVG.svg" className="w-6 h-6" alt="" /> 
   <h3 className="text-md font-bold">General</h3>
   {
      isEditing ? 
     <div onClick={()=>editInfo("details")} className="p-2 absolute -right-10 border border-gray-300 rounded-full w-fit">
      <img src="/pencil.svg" className="w-5 h-5 "/>
    </div>
    :
    <></>
     }
  </div>
  <div className="py-3 border-b">
    <div className="flex gap-8 items-center  ">
    <img src="/hospitalSVG.svg" alt="" />
    <div>
      <p className="text-xs text-[#74747C] font-normal">Hospital / Clinic</p>
      <h3 className="text-[#101010] text-sm font-medium">{doctor?.location}</h3>
    </div>
    </div>
  </div>
  <div className="py-3 border-b">
  <div className=" flex gap-8 items-center ">
  <img src="/starSVG.svg" alt="" />
    <div>
      <p className="text-xs text-[#74747C] font-normal">Years Of Experience</p>
      <h3 className="text-[#101010] text-sm font-medium">{doctor?.experience}</h3>
    </div>
  </div>
  </div>
  <div className="py-3 ">
   <div  className="flex gap-8 items-center  ">
   <img src="/clockSVG.svg" alt="" />
    <div>
      <p className="text-xs text-[#74747C] font-normal">Available Time </p>
      <h3 className="text-[#101010] text-sm font-medium">{doctor?.availTimeStart} - {doctor?.availTimeEnd}</h3>
    </div>
   </div>
  </div>
  {/* {
      isEditing ? 
     <div onClick={()=>editInfo("details")} className="p-2 absolute -top-5 -right-5 border border-gray-300 rounded-full w-fit">
      <img src="/pencil.svg" className="w-5 h-5"/>
    </div>
    :
    <></>
     } */}

<div onClick={()=>customerSupport()} className={`flex mt-4 gap-2 bg-amber-400 cursor-pointer w-full py-4 justify-center items-center rounded-lg`}>
            <img src="/customer-support.svg" className="w-10" alt="" />
            <span className="text-white">
              Customer support
            </span>
          </div>

</div>
}


{/*   <div className="flex border h-fit rounded-lg flex-col border-x border-gray-300 p-4 relative mt-5">
    <div className="p-2 flex">
      <input onChange={handleVideos} className="p-2 w-8/12 border border-gray-300"/>
      <button onClick={addVideo} className="p-2 w-4/12 text-white bg-yellow-500">Add Videos</button>
    </div>
    <div className="flex gap-2 flex-wrap">
      {
        videos.map((m,i)=>{
            return(
                  <div key={i} className="bg-blue-500 rounded-xl text-sm p-1 text-white">{m.id}</div>
                )
        })
      }
    </div>
   </div>*/}



</div>


{
  loading ?
  <>loading...</>
  :
<div className="w-full md:w-8/12 border flex flex-col gap-5  border-gray-300 p-4 rounded-lg h-fit" >
<div className="flex flex-col gap-5 border-b py-3">
  <div className="flex gap-2 items-center relative w-fit">
   <img src="/doctorSVG.svg" className="w-6 h-6" alt="" /> 
   <h3 className="text-md font-bold">Professional Summary</h3>
   {
      isEditing ? 
     <div onClick={()=>editInfo("profSummery")} className="p-2 absolute -right-10 border border-gray-300 rounded-full w-fit">
      <img src="/pencil.svg" className="w-5 h-5 "/>
    </div>
    :
    <></>
     }
  </div>
   <p className="text-sm text-gray-500">{doctor?.profSummery}</p>
</div>

<div className="flex flex-col gap-5 py-3">
  <div onClick={()=>editInfo("education")} className="flex gap-2 items-center relative w-fit">
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
     doctor?.education?.map((e,i)=>{
      return(
           <li  key={i} className="list-items text-sm text-gray-500">{e}</li> 
        )
     })
    }
  </ul>
</div>
</div>
}

</div>



<EditModal getDoctorData={getDoctorData} doctor={doctor} setOpen={setOpen} isOpen={isOpen} type={type}/>
<Modal
 opened={openSchedule}
 onClose={()=>setOpenSchedule(false)}
 size={"lg"}
 height={"500px"}
>

 <Tabs defaultValue="Slots" >
      <Tabs.List>
        <Tabs.Tab value="Slots" onClick={()=>setIsNotified(false)} rightSection={<div className={`object-cover p-1 rounded-full ${notified ? "bg-red-500" : ""}`}></div>} ><span className="flex gap-2 items-center"> <img src="/calender-2.svg" className="w-5 h-5"/> <p className="hidden md:block">Appointments</p></span></Tabs.Tab>
        <Tabs.Tab value="Schedule" ><span className="flex gap-2 items-center"> <img src="/time.svg" className="w-5 h-5"/> <p className="hidden md:block">Set Availbility</p></span></Tabs.Tab>
        <Tabs.Tab value="Advance" ><span className="flex gap-2 items-center"> <img src="/money.svg" className="w-5 h-5"/> <p className="hidden md:block">Earning</p></span></Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="Slots" pt="xs" >
        {

            isScheduling ?

            <div className="h-96 overflow-y-auto">
               <div className="flex justify-end">
                <button className="p-2 bg-yellow-500 w-32 rounded-xl text-sm" onClick={SaveChange}>Save</button>
               </div>
               <ScheduleView timeSlots={timeSlots} setTimeSlots ={setTimeSlots} userID={userdata?.user?._id} slot={slot} setSlot={setSlot} slotId={slotId} setSlotId={setSlotId} dayIndex={dayIndex} setDayIndex={setDayIndex} currentDate={currentDate} setCurrentDate={setCurrentDate}/>
            </div>

            :
            <div className="h-96 overflow-y-auto">
            {messages && <div className="text-sm text-amber-800 text-center">{messages}</div>}
         <div className="flex justify-between items-center max-w-xl mx-auto">
           <div className="flex items-center gap-4">
           <select
              className="p-2 border border-gray-300 my-2 text-xs"
              onChange={(e) => setDateRange(parseInt(e.target.value))}
              value={dateRange}
            >
              <option value={30}>Next 30 Days</option>
              <option value={21}>Next 3 Weeks</option>
              <option value={14}>Next 2 Weeks</option>
              <option value={7}>Next 1 Week</option>
              <option value={0}>Today</option>
              <option value={-7}>Last 1 Week</option>
              <option value={-14}>Last 2 Weeks</option>
              <option value={-21}>Last 3 Weeks</option>
              <option value={-30}>Last 30 Days</option>
            </select>
            <div>

               <Popover width={320} position="bottom" withArrow shadow="md">
                              <Popover.Target>
                                    <img  src="/assets/icons/share.svg" className="w-5 h-5 cursor-pointer"/>
                              </Popover.Target>
                              <Popover.Dropdown>
                               <div className="flex flex-col ">
                                <div className="text-xs p-2 rounded-full bg-gray-100 border">http://localhost:3000/doctor/doctorid</div>
                                  <div className="flex mt-2 text-sm gap-2 items-center justify-center">
                                  Share with whatsapp <img className="w-5 cursor-pointer" src="/whatsapp.svg" onClick={shareOnWhatsapp}/>
                                  </div>
                                </div>
                              </Popover.Dropdown>
            </Popover>


             </div>
             </div>
             <div>
                
                <Menu shadow="md" radius={"md"} width={150} withArrow position={'left'}>
                        <Menu.Target>
                             <img src="/filter.svg" className="w-5 cursor-pointer"/>
                        </Menu.Target>
                        <Menu.Dropdown>
                          <Menu.Item onClick={()=>setStatus()} >All</Menu.Item>
                          <Menu.Item onClick={()=>setStatus("pending")} >Pending</Menu.Item>
                          <Menu.Item onClick={()=>setStatus("confirmed")} >Confirmed</Menu.Item>
                          <Menu.Item onClick={()=>setStatus("rescheduled")} >Rescheduled</Menu.Item>
                          <Menu.Item onClick={()=>setStatus("canceled")} >Canceled</Menu.Item>
                        </Menu.Dropdown>
                </Menu>
             </div>
         </div>


{
    filterByStatus.map((a,i)=>{
        return(
             <div key={i} className="grid  md:grid-cols-3 text-xs gap-5 border rounded-xl shadow-md  p-2 text-sm font-medium text-gray-800 mt-2">
                         <div className="flex justify-between   text-gray-500">
                          <div className=" flex justify-start">Name</div> <div className=" text-semibold text-gray-800">{a?.userId?.displayName}</div>
                         </div>

                         <div className="flex justify-between text-gray-500  ">
                           <div className="">Slot</div> <div className="text-semibold text-gray-800">{ dayjs(a?.date).format('DD MMM YY')} , {a?.start} - {a?.end}</div>
                         </div>
                        
                         <div className="flex justify-between text-gray-500 ">
                          <div>Reason</div><div className="text-semibold text-gray-800">{a?.reason ||  "N/A"}</div>
                         </div>

                         <div className="flex justify-between text-gray-500 ">
                            <div>Dog Profile</div>
                            <Popover width={300} position="bottom" withArrow shadow="md">
                              <Popover.Target>
                                 <button className="bg-yellow-500 px-2 rounded-lg text-white">
                                    View profile
                                    </button>
                              </Popover.Target>
                              <Popover.Dropdown>
                               <div className="flex gap-2 ">
                                  {
                                      a?.dogId?.dogs?.map((d,i)=>{
                                        return <img key={i} onClick={()=>setShowDog(i)} src="/assets/img/puppy.png" className={`${showDog ===i  ? "border border-amber-800":"" } w-8 rounded-xl`}/>
                                      })
                                  }
                                   
                               </div>
                                 <div className="flex flex-col items-center">
                                       <img src={"/assets/img/puppy.png"} className="w-32 h-32 rounded-xl object-cover "/>
                                       <div className="grid grid-cols-2 mt-2 w-full">
                                        <div className="text-start text-xs">Dog Name : </div><div className="text-start font-semibold text-md"> {a?.dogId?.dogs?.[showDog]?.name}</div>
                                        <div className="text-start text-xs">Dog Weight : </div><div className="text-start font-semibold text-md"> {a?.dogId?.dogs?.[showDog]?.weight} kg</div>
                                        <div className="text-start text-xs">Dog Breed : </div><div className="text-start font-semibold text-md"> {a?.dogId?.dogs?.[showDog]?.breed}</div>
                                        <div className="text-start text-xs">Dog Age : </div><div className="text-start font-semibold text-md"> {a?.dogId?.dogs?.[showDog]?.age}</div>
                                        <div className="text-start text-xs">Phone No : </div><div className="text-start font-semibold text-md"> {a?.dogId?.phoneno}</div>
                                        </div>
                                 </div>
                               
                              </Popover.Dropdown>
                            </Popover>
                           
                         </div>
                         
                          <div className="flex justify-between text-gray-500  ">
                           <div className="">Status</div>
                           <div className="font-semibold">
                           <button className={` ${a.status === "confirmed" ? "bg-green-500": a.status === "canceled"? "bg-red-500" : "bg-orange-500"}  px-2 rounded-lg text-white`}>
                              {a.status}
                            </button>
                            </div>
                         </div>
                         <div className="flex justify-between text-gray-500 ">
                           <div>Action</div>
                           <Menu shadow="md" radius={"md"} width={150} withArrow position={'left'}>
                                    <Menu.Target>
                                        <button  disabled={a.status === "canceled" ? true : false} className={` ${a.status ==="canceled" ? "bg-gray-100" : "bg-gray-500"} text-white px-2 rounded-lg text-white`}>
                                          Action
                                        </button>
                                    </Menu.Target>
                                    <Menu.Dropdown>
                                     {
                                            a.rescheduledBy ==='user' || a.rescheduledBy === undefined?
                                            <Menu.Item onClick={()=>Action(i,"confirmed",a._id)}>Confirm</Menu.Item>
                                            :
                                            <></>
                                     }
                                      {
                                        a.status !== "reschedule" ?
                                        <Menu.Item onClick={()=>Reschedule(a._id,i,"rescheduled")}>Reschedule</Menu.Item>
                                        :
                                        <></>
                                      }
                                      <Menu.Item onClick={()=>Action(i,"canceled",a._id)}>Cancel</Menu.Item>
                                    </Menu.Dropdown>
                                  </Menu>
                            
                         </div>
                     </div>
            )
    })
}
        



        </div>

          }


        
      </Tabs.Panel>


      <Tabs.Panel value="Schedule" pt="xs">
         <div className="h-96 overflow-y-auto">
            <CustomSchedules/>
         </div>
      </Tabs.Panel>

      <Tabs.Panel value="Advance" pt="xs">
         <div className="h-96">
         <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-100 shadow-md p-5 rounded-xl ">
            <div className="font-semibold text-lg">{appointments?.length || 0}</div>
            <div className="text-sm">Total Appointment</div>
            </div> 
             <div className="bg-gray-100 shadow-md p-5 rounded-xl ">
            <div className="font-semibold text-lg">{canceledCount}</div>
            <div className="text-sm">Canceled</div>
            </div> 
             <div className="bg-gray-100 shadow-md p-5 rounded-xl ">
            <div className="font-semibold text-lg">75</div>
            <div className="text-sm">Revenue per appointment</div>
            </div> 
             <div className="bg-gray-100 shadow-md p-5 rounded-xl ">
            <div className="font-semibold text-lg">N/A</div>
            <div className="text-sm">Net Earnings</div>
            </div> 
         </div>
         </div>
      </Tabs.Panel>

    </Tabs>
 </Modal>

   <Modal
        opened={resizerDoc}
        onClose={()=>setResizerDoc(false)}
     >
     <div className="flex flex-col gap-5">
            <input type="file" onChange={handleFileChangeDoc} />
            {imageDoc && (
                <div className="flex flex-col gap-2">
                    <AvatarEditor
                        ref={(editorRef) => setEditorDoc(editorRef)}
                        image={imageDoc}
                        width={250}
                        height={250}
                        border={50}
                        scale={scaleDoc}
                    />
                    <div className="flex gap-2 items-center text-sm">
                    <label>Zoom</label>
                    <input
                        type="range"
                        min="1"
                        max="2"
                        step="0.01"
                        value={scaleDoc}
                        onChange={handleScaleChangeDoc}
                    />
                    </div>
                    <button className="p-2 bg-yellow-500 rounded-xl" onClick={handleCropDoc}>Crop & Upload</button>
                </div>
            )}
        </div>
      </Modal>


 <Toaster
      position="top-center"
     reverseOrder={false}
    />


</div>
    
  );
};

export default VetChatDoctorsProfile;
