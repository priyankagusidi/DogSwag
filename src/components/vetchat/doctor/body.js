// pages/[id].js
import DogList from '@/components/doglist'
import React, { useEffect, useState,useRef } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios'
import AgreeModal from './agreemodal'
import socket from '@/utils/socket';
import {FacebookShareButton ,LinkedinShareButton,WhatsappShareButton ,WhatsappIcon,FacebookIcon,LinkedinIcon} from 'react-share'
import Organiser from '@/components/calender/index'
import {Badge, Modal,Popover} from '@mantine/core'
import Prescription from '@/components/vetchatconvo/prescription/view'
import ScheduleView from '@/components/schedule/scheduleView'
import dayjs from 'dayjs'
import { Tabs,Menu ,ScrollArea,Stepper} from '@mantine/core';
import {toast,Toaster} from 'react-hot-toast'
import dynamic from 'next/dynamic'
import L1 from './L1'
import L2 from './L2'


// import "@lottiefiles/lottie-player";
const PhoneInput = dynamic(() => import('react-phone-number-input'), {
    ssr: false,
});
import { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import OtpInput from 'react-verify-otp';
import '/node_modules/react-verify-otp/dist/style.css';

const youtubeVideos = ['https://www.youtube.com/watch?v=k4EqD6o6DGI','https://www.youtube.com/watch?v=_ReMMUxau-g','https://www.youtube.com/watch?v=_ReMMUxau-g']

import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Link from 'next/link';
const VetChatDoctorsProfile = ({doctor,setDoctor,showAppointments,setShowAppointments,scheduleAgreed,setscheduleAgreed,openSchedule,setOpenSchedule,notified,isPaid,setIsNotified,Schedule,userdata,isTimeInRange,dogdata,doctorID,handleStartChat,isChatModalOpen, setIsChatModalOpen,link,button_title,isEditing,chatType}) => {
  const router = useRouter();
  const { id } = router.query; // Access the dynamic value from the URL
  const [reason,setReason] = useState("")
  const [selectedReason,setSelectedReason] = useState("Vomitting")
  const [isConnecting, setIsConnecting] = useState(false);
  const [openOrganiser,setOpenOrganiser] = useState(false)
  const [openpresc,setOpenPresc] = useState(false)
  const [dayIndex,setDayIndex] = useState(null)
  const [currentDate, setCurrentDate] = useState(dayjs().startOf('day'));
  const [organiserSubscribed,setOrganiserSubscribed] = useState(false)
  const [chatID,setChatID] = useState(null)
  const [slotId,setSlotId] = useState(null)
  const [slot,setSlot] = useState({})
  const [messages,setMessages] = useState(null)
  const [appointments,setAppointments] = useState([])
  const [isScheduling,setIsScheduling] = useState(false)
  const [index,setIndex] = useState(null)
  const [bookId,setBookId] = useState(null)
  const [timeSlots,setTimeSlots] = useState([])
  const [mobileTab,setMobileTab] = useState(false)
  const [paymentTab,setPaymentTab] = useState(false)
  const [reasonTab,setReasonTab] = useState(false)
  const [phone,setPhone] = useState({})
  const [phoneNumbers,setPhoneNumbers] = useState([])
  const otpRef = useRef(null);
  const [otp, setOtp] = useState('');
  const [phoneValue, setPhoneValue] = useState("")
  const [timer, setTimer] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [sendCount, setSendCount] = useState(0) 
  const [isEditingDog,setIsEditingDog] = useState(false)
  const [meetReason,setMeetReason] = useState("Consultation")
  const [dogList,setDogList] = useState([])
  const [selectedDog,setSelectedDog] = useState(0)
  const [dogInfo,setDogInfo] = useState({})
  const [currentDogInfo,setCurrentDogInfo] = useState({})
  const [active, setActive] = useState(0);
  const [dogListData,setDogListData] = useState({})
  const [highestStepVisited, setHighestStepVisited] = useState(active);
  const [phoneNumber,setPhoneNumber] = useState(null)
  const [loading,setLoading] = useState(false)
  const [doctorList,setDoctorList] = useState([])
  const [selectedDoc,setSelectedDoc] = useState(0) 
  const [credit,setCredit] = useState({credits:0})


console.log(appointments)
  console.log(credit)

  // useEffect(() => {
  //   if (router.query.payment === 'true') {
  //     setIsPaid(true);
  //   } 
  // }, [router.query.payment]);


  const nextStep = () => {

      if(active == 1 && dogList?.length <1){
          alert('Add your dog info')
          return
      }

       if(active == 2 && !phoneNumber){
          alert('Add your phone no')
          return
      }

      setActive((current) => (current < 4 ? current + 1 : current));
  }
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));


  const handleStepChange = (nextStep) => {
    const isOutOfBounds = nextStep > 3 || nextStep < 0;

    if (isOutOfBounds) {
      return;
    }

    setActive(nextStep);
    setHighestStepVisited((hSC) => Math.max(hSC, nextStep));
  };

  // Allow the user to freely go back and forth between visited steps.
  const shouldAllowSelectStep = (step) => highestStepVisited >= step && active !== step;




const [windowWidth, setWindowWidth] = useState(null);

  useEffect(() => {
    // Check if window is defined (client-side) before accessing it
    if (typeof window !== 'undefined') {
      // Access window.innerWidth only on the client side
      setWindowWidth(window.innerWidth);

      // Update windowWidth when the window is resized
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      // Add an event listener to handle window resize
      window.addEventListener('resize', handleResize);

      // Remove the event listener when the component unmounts
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);



  const handlePayment = async (amount,currency,plantype,blogsCount,notificationsCount) => {

      console.log(id,dogListData?._id,currentDate.add(dayIndex,'day').format("YYYY-MM-DD"),slot.start,slot.end,slotId,meetReason)
       
      // return
       try {
        const {data} = await axios.post('/api/billing/create',{
           amount:1, currency,paymentMethod:"payu",plantype:"schedulecredit",credit:1,
           doctorId:id,dogId:dogListData?._id,date:currentDate.add(dayIndex,'day').format("YYYY-MM-DD"),start:slot.start,end:slot.end,slotId,reason:meetReason
        })

        setOpenSchedule(false)

        document.open(); 
        document.write(data); 
        document.close(); 
    
       } catch(e) {
       

       }
  }



const handlePhonNo = (e) =>{
  setPhone(e.target.value)
}
const verifyPhoneNumber=async()=>{
   // await axios.
}
const addPhoneNo = () =>{

   setPhoneNumbers([...phoneNumbers,{id:nanoid(),number:phone}])
}

const deletePhoneNo = (id) =>{
   const updateList = phoneNumbers.filter((p,i)=>p.id !==id )
   setPhoneNumbers(updateList)
}


    const handleChangeOtp = (otp) => {
        setOtp(otp)
    };
   


    const startTimer = () => {
        setIsActive(true);
        setSendCount(1);
    };

    useEffect(() => {
        if (timer === 0) {
            setIsActive(false);
            setTimer(60);
        }
    }, [timer]);


      useEffect(() => {
        let interval = null;

        if (isActive) {
            interval = setInterval(() => {
                setTimer(timer => timer - 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isActive]);




    async function sendOtp() {
        startTimer()

        if (!phoneValue) {
            alert("phone number can't be empty")
            return
        }
        if (!isValidPhoneNumber(phoneValue)) {
            alert("Invalid")
            return
        }

        try{
          await axios.post('/api/otp/create',{phoneno:phoneValue}).then(res=>{
            })

          
        }catch(err){
        }
    }




       async function Save(){
       if(!isValidPhoneNumber(phoneValue)){
        alert("Invalid phoneno")
        return
      }
       try{
         await axios.post('/api/calender/number/verify',{phoneno:phoneValue,otp:otp}).then(res=>{
            if(res.data.verified === true){
               setPhoneNumber(phoneValue)
            }
         })
       }catch(err){
       }

   }


  async function getBookings(){
   try{
      await axios.get(`/api/schedule/booking/user/${id}`).then(res=>{
        setAppointments(res.data.bookings)
      })
   }catch(err){
   }
 }


  async function getAvail(){
   try{
      await axios.get(`/api/schedule/availbility/one/${id}`).then(res=>{
        setTimeSlots(res.data.availability.schedule)
      })
   }catch(err){
   }
 }


 useEffect(()=>{
    getDogList()
    getAvail()
    getDoctorList()
 },[])




 
   useEffect(()=>{
     socket.emit("setup",userdata && userdata.user);
  },[id])


 useEffect(()=>{

    socket.on("notify", (id) => {
      setIsNotified(true)
      getBookings()
      getCredits()
    });

  })

async function fetchDoctorDatas(){
  try {
    await axios.get(`/api/doctor/profile/one/${id}`).then(res=>{
      setDoctor(res.data.profile)
    })
  } catch(e) {
    // statements
  }
}
  
  useEffect(()=>{
    fetchDoctorDatas()
  },[])


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
          setIsChatModalOpen(false)
          socket.emit("fetchchat",id)
          socket.emit('notify',doctor?.userID)
          router.push(`/vetchat/${data._id}`)
        } catch(e) {
        }
      }
      

      // const text = "Bruno's prents would like to consult with Dr DogSwag \n Name - Bruno \n Gender-Male \n Age-11 years \n Weight -30 kg  \n Breed -German \n  Reason - Vomiting \n Notes - agag"

      if(chatType === "whatsapp"){
            const text = `${dogdata?.profile?.dogName}'s prents would like to consult with ${doctor.fullName} %0a🐶 Name - ${dogdata?.profile?.dogName} %0a🦴 Gender-${dogdata?.profile?.dogGender} %0a👉 Age-${dogdata?.profile?.dogAge} years %0a💪 Weight - ${dogdata?.profile?.dogAge} kg  %0a👻 Breed - ${dogdata?.profile?.dogBreed} %0a🤔  Reason - ${selectedReason} %0a📌 Notes - ${reason}`  
            setIsConnecting(true);

           const isMobile = navigator.userAgentData.mobile;

           setTimeout(() => {
              window.open(
                `${isMobile ? `whatsapp://send/?phone=919611700874&text=${text}` :`https://web.whatsapp.com/send/?phone=919611700874&text=${text}&type=phone_number&app_absent=0`}`,
                "_target"
              );
              setIsConnecting(false);
            }, 5000); // 5000 milliseconds = 5 seconds
      }


 }  


async function accessChat() {

    setOpenPresc(true)
      

      try {
          const { data } = await axios.post(
              `/api/chat`,{
                userId:doctor.userID,content:`Reason:${selectedReason}\nNotes:${reason}`,new:true,mobile:doctor.mobile
              });
          console.log(data._id)
          setChatID(data._id)
        } catch(e) {
        }
}

// href="intent://send/phonenumber#Intent;scheme=smsto;package=com.whatsapp;action=android.intent.action.SENDTO;end"

async function getDogList(){
  try{

     await axios.get('/api/doglist/profile').then(res=>{
      console.log(res.data?.dogs)
      setDogList(res.data?.dogs?.dogs || [])
      setPhoneNumber(res.data?.dogs?.phoneno)
      setDogListData(res.data?.dogs)
    })
  }catch(err){
  }
}
async function addDogProfile(){
  const dogDetail = {name:dogInfo.name,age:dogInfo.age,breed:dogInfo.breed, weight:dogInfo.weight,reason:dogInfo.reason}
  setDogList([...dogList,dogDetail ])
  setCurrentDogInfo(dogDetail)
  setIsEditingDog(false)
  try{
    await axios.post('/api/doglist/create',{name:dogInfo.name,age:dogInfo.age,breed:dogInfo.breed, weight:dogInfo.weight,reason:dogInfo.reason}).then(res=>{
      getDogList()
    })
  }
  catch(err){
  }

}


useEffect(()=>{
   if(dogList?.length > 0 ){
     setSelectedDog(dogList?.length-1)
     setCurrentDogInfo(dogList[dogList?.length-1])
   }
},[dogList])


function MobileNumber(){
  setMobileTab(true)
}
async function Confirm(){
  

    if(credit?.credits < 1){
      alert("You dont have enough credits")
      return
    }
    try{
        await axios.post(`/api/schedule/create/booking/${id}/${dogListData?._id}`,{date:currentDate.add(dayIndex,'day').format("YYYY-MM-DD"),start:slot.start,end:slot.end,slotId,reason:meetReason}).then(res=>{
          socket.emit("notify",res?.data?.booking?.id)
        })
        getAvail()
        getBookings()
        getCredits()
        toast.success('You will be notified via SMS once the booking is confirmed.')
      } catch(err){
      }

}


async function getDocInfo(id,i){
    setSelectedDoc(i)
    try{
        await axios.get(`/api/doctor/profile/one/${id}`).then(res=>{
            setDoctor(res.data.profile)
        })
    }catch(err){
        console.log(err)
    }

}



async function Action(index,action,slotId){
            setMessages(``)

     try{
        await axios.put(`/api/schedule/booking/${slotId}/${id}`,{status:action}).then(res=>{

          console.log(res?.data?.booking)
          socket.emit("notify",res?.data?.booking?.doctorId)
          if(action === "canceled"){
          getCredits()

          }
          const status = appointments.map((m,i)=>{
          if(index === i){
                // toast.success(`Your Appointment is ${action}. A sms will be sent to the user.`)
                return {...m,status:action}
            }else{
                return {...m}
            }
          })

         setAppointments(status)

        })
      } catch(err){
      }

}


useEffect(()=>{

  getBookings()
  
},[openSchedule])

function Reschedule(id,index) {
   setIndex(index)
   setIsScheduling(true)
   setBookId(id)
}

async function SaveChange(){
     setIsScheduling(false)
     // return
     try{
        await axios.put(`/api/schedule/reschedule/${bookId}/${id}`,{date:currentDate.add(dayIndex, 'day').format('YYYY-MM-DD'),slot}).then(res=>{
          getAvail()
          getBookings()
          socket.emit("notify",res?.data?.booking?.doctorId)
          toast.success(`Rescheduled slot has been sent to the doctor. You will be notified via SMS.`)
        })

          // socket.emit("notify",res?.data?.booking?.id)
        
        
      // const status = appointments.map((m,i)=>{
      //   if(bookId === m._id){
      //       toast.success(`Your Appointment is rescheduled. A sms will be sent to the user.`)
      //       setMessages(`Your Appointment is rescheduled. A sms will be sent to the user.`)
      //       return {...m,status:'pending',slot:`${currentDate.add(dayIndex, 'day').format('DD MMM YY')}, ${slot.start} - ${slot.end}`}
      //   }else{
      //       return {...m}
      //   }
      //  })
     }catch(err){
     }





}


 useEffect(()=>{
    

     socket.emit("setup",userdata && userdata.user);
     getCredits()

  },[])



 function handleReasons(e){
    setMeetReason(e.target.value)
 }





     
function handleDogInfo(e){
   setDogInfo({...dogInfo,[e.target.name]:e.target.value})
}


function customerSupport(){
          const isMobile = navigator.userAgentData.mobile;

              window.open(
                `${isMobile ? `whatsapp://send/?phone=919611700874&text=${"Hi"}` :`https://web.whatsapp.com/send/?phone=919611700874&text=${"Hi"}&type=phone_number&app_absent=0`}`,
                "_target"
              );
}


async function deleteDog(id) {
  try{
     await axios.delete(`/api/doglist/profile/${id}`).then(res=>{
        console.log(res.data)
        getDogList()
        setCurrentDogInfo({})
     })
  }catch(err){
    console.log(err)
  }
}

async function getDoctorList(){
  try{
     await axios.get(`/api/doctor/profile/byclinic/byuser/all/${id}`).then(res=>{
      console.log(res)
      setDoctorList(res.data.doctors)
     })
  }catch(err){
    console.log(err)
  }
}


function handleCurrentDogInfo(e) {
   setCurrentDogInfo({...currentDogInfo,[e.target.name]:e.target.value})
}

async function saveCurrentDogInfo(id){
  setLoading(true)
  try{
    await axios.put(`/api/doglist/profile/edit/${id}`,currentDogInfo).then(res=>{
       console.log(res)
       toast.success("Dog info saved successfully!")
       setLoading(false)
    })
  }catch(err){
    console.log(err)
    setLoading(false)
  }
}


async function getCredits(){
  try{
    await axios.get(`/api/schedule/credits`).then(res=>{
      console.log(res.data)
      setCredit(res.data.credit)
    })
  }catch(err){
    console.log(err)
  }
}

  
// return null

  if (!doctor) {
    return <div className="flex justify-center mt-20 h-screen"><img src="/gif/spinner.svg" className="w-20 h-20 "/></div>; // Show a loading state while fetching the data
  }

  console.log(doctor)

  return (
  <div className="p-4 flex flex-col w-full gap-10 justify-center  bg-white">

  <Toaster
    position="top-center"
    reverseOrder={false}
  />

  <AgreeModal 
  handleCurrentDogInfo={handleCurrentDogInfo}
  handleDogInfo={handleDogInfo}
  dogInfo={dogInfo}
  addDogProfile={addDogProfile}
  deleteDog={deleteDog}
  selectedDog={selectedDog}
  setSelectedDog={setSelectedDog}
  isEditingDog={isEditingDog}
  setIsEditingDog={setIsEditingDog}
  currentDogInfo={currentDogInfo}
  setCurrentDogInfo={setCurrentDogInfo}
  saveCurrentDogInfo={saveCurrentDogInfo}
  dogList={dogList}
  loading={loading}
  isConnecting={isConnecting} handleSelectReason={handleSelectReason} dogdata={dogdata} reason={reason} handleReasonInput={handleReasonInput} createChatRoom={createChatRoom} isModalOpen={isChatModalOpen} setIsModalOpen={setIsChatModalOpen}/>
    {/* doctor name image and start chat button */}
  <div className="p-4 border border-gray-300 rounded-lg rounded-lg">

  <div className="flex items-center justify-between">
      <div className="grid grid-cols-5 gap-2">
   
   {
    doctorList?.length < 1 ?
    <div className="flex flex-col items-center gap-2 ">
    <img className={`w-16 h-16 cursor-pointer object-cover rounded-full`} src={doctor?.profilePic} alt="" />
    <div className="text-center">
    <h2 className="text-[#101010] font-medium truncate w-16 text-xs">{doctor?.fullName}</h2>
    </div>
   </div>
    :
    doctorList?.map((d,i)=>{
      return(
        <div key={i} onClick={()=>getDocInfo(d._id,i)} className="flex flex-col items-center gap-2 ">
        <img className={`w-16 h-16 cursor-pointer ${selectedDoc === i ? "outline-amber-400 outline outline-2" : "outline-amber-100"} object-cover rounded-full`} src={d.profilePic} alt="" />
        <div className="text-center">
        <h2 className="text-[#101010] font-medium truncate w-16 text-xs">{d.displayName}</h2>
        </div>
       </div>
        )
    })
   }

      </div>


      {
     doctorList.length < 1 ? 
     <div>
       <button onClick={Schedule} className={`ml-auto justify-end p-4 bg-blue-500 ${notified ? 'animate-pulse':''} hidden md:block text-white rounded-lg hover:after:content-['_↗']`}>{"Schedule"} </button>
     </div>
     :
     <div className="flex gap-2 ">
     {
       doctorList?.[selectedDoc]?.isChatAvailable &&
       <button onClick={Schedule} className={`ml-auto justify-end p-4 bg-blue-500 ${notified ? 'animate-pulse':''} hidden md:block text-white rounded-lg hover:after:content-['_↗']`}>{"Schedule"} </button>
     }
  
     {
      doctorList?.[selectedDoc]?.isScheduleAvailable && 
      <div className="flex gap-2">
       {/* <button className={` ${isTimeInRange(doctor) ? "": "opacity-50"} ml-auto justify-end p-4 bg-green-500 hidden md:block text-white rounded-lg hover:after:content-['_↗']`} onClick={()=>handleStartChat("whatsapp",doctor)}>Whatsapp Chat</button> */}
       
       <button  className={` ${isTimeInRange(doctor) ? "": "opacity-50"} ml-auto justify-end p-4 bg-[#FFCB07] hidden md:block text-white rounded-lg hover:after:content-['_↗']`} onClick={()=>handleStartChat("normal",doctor)}>Start Chat</button>
      </div>
     }
    </div>
   }

 
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
     <div onClick={()=>accessChat()} className={`flex gap-2 bg-green-300 cursor-pointer w-full py-4 justify-center items-center rounded-lg`}>
            <img src="/pillSVG.svg" className="w-10" alt="" />
            <span className="text-green-800">
              Prescription
            </span>
          </div>

<div onClick={()=>customerSupport()} className={`flex mt-4 gap-2 bg-amber-400 cursor-pointer w-full py-4 justify-center items-center rounded-lg`}>
            <img src="/customer-support.svg" className="w-10" alt="" />
            <span className="text-white">
              Customer support
            </span>
          </div>



          {/*<div onClick={()=>setOpenOrganiser(true)} className={`flex relative gap-2 mt-5 bg-yellow-300 cursor-pointer w-full py-4 justify-center items-center rounded-lg`}>
            <img src="/calender.svg" className="w-10 -ml-5" alt="" />
            <img src="/free-trial.png" className="w-16 absolute right-0 top-1 "/>
            <span className="text-yellow-800">
              Organiser
            </span>
          </div>*/}
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


{/*<div>
  <h3 className="text-md font-bold">Vet Talk</h3>
      <div className="flex flex-wrap justify-center gap-2 mt-5">
          {youtubeVideos.map((m,i) =>  
           <iframe key={i} className="h-48"
            src="https://www.youtube.com/embed/tgbNymZ7vqY">
            </iframe>
          )}
        </div>
</div>*/}

<div className="mb-10">
  <Modal
 opened={openOrganiser}
 onClose={()=>setOpenOrganiser(false)}
 title={"Organiser"}
 centered
>
  {
    !organiserSubscribed ?
    <div className="text-sm text-gray-500 flex flex-col gap-4 font-Inter">
    <li className="flex gap-2 items-start"><img src="/calender.svg" className="w-6"/>{` DogSwag Organizer - Never miss your dog's schedule, whether it is Food, Medicine, Vet Visit, Walking, Diary, etc `}</li>
    <li className="flex gap-2 items-start"><img src="/plus.svg" className="w-5"/> Click and Add important schedules of your dog</li>
    <li className="flex gap-2 items-start"><img src="/phone.svg" className="w-5"/> You can set reminders for up to 3 numbers </li>
    <li className="flex gap-2 items-start"><img src="/smile.svg" className="w-5"/> It is FREE for 60 days</li>
    <li className="flex gap-2 items-start"><img src="/secure.svg" className="w-5"/> The DogSwag Organizer is End to End Encrypted and safe</li>
    <li className="flex gap-2 items-center"><img src="/thumbs-up.svg" className="w-5"/> Works great on Mobile</li>
   

    <div className="flex justify-end">
      <button className="p-2 bg-yellow-500 rounded-xl mt-3 text-white w-32" onClick={()=>setOrganiserSubscribed(true)}>Agree</button>
    </div>
  </div>

   :
  <Organiser dogdata={dogdata}/>

  }
  
</Modal>

  <Modal
 opened={openpresc}
 onClose={()=>setOpenPresc(false)}
 centered
>
  <Prescription chatID={chatID}/>
</Modal>


 <Modal
 opened={openSchedule}
 onClose={()=>setOpenSchedule(false)}
 title={"Schedule"}
 centered
 fullScreen={windowWidth < 500 ? true : false}
 size={'lg'}
>
{
scheduleAgreed ?
<div>
{
messages && <div className="text-sm text-gray-500 text-center">{messages}.Click on the<span className="text-blue-500 cursor-pointer">{` link `}</span>for more details</div>  
}



 <Tabs defaultValue={showAppointments ? "Slots":"Schedule"} >
      <Tabs.List>
        <Tabs.Tab value="Schedule">Schedule</Tabs.Tab>
        <Tabs.Tab value="Slots" onClick={()=>setIsNotified(false)} rightSection={<div className={`object-cover p-1 rounded-full ${notified ? "bg-red-500" : ""}`}></div>}>  Appointments</Tabs.Tab>
        <Tabs.Tab value="Credit">Credit</Tabs.Tab>
     
      </Tabs.List>

      <Tabs.Panel value="Slots" pt="xs" >
{
         isScheduling ?
            <div className="h-96 overflow-y-auto">
               <div className="flex justify-end">
                <button className="p-2 bg-yellow-500 w-32 rounded-xl text-sm" onClick={SaveChange}>Save</button>
               </div>
                <ScheduleView timeSlots={timeSlots} setTimeSlots ={setTimeSlots}  userID={id} slot={slot} setSlot={setSlot} slotId={slotId} setSlotId={setSlotId} dayIndex={dayIndex} setDayIndex={setDayIndex} currentDate={currentDate} setCurrentDate={setCurrentDate}/>
            </div>
            :
         <div className="h-[68vh]  overflow-y-auto">
  
                    {
                      appointments?.map((a,i)=>{
                        return(
                            <div key={i} className="text-xs p-2 gap-2 grid md:grid-cols-3 shadow-md rounded">

                              <div className="flex gap-4 justify-between">
                                <div>Doctor Name</div>
                                <div>{a.doctorId.displayName}</div>
                              </div>

                              <div className="flex gap-4 justify-between">
                                <div>status</div>
                                <div className="">
                                 <button className={` ${a.status === "confirmed" ? "bg-green-500": a.status === "canceled"? "bg-red-500" : "bg-orange-500"}  px-2 rounded-lg text-white`}>
                                    {a.status}
                                  </button>
                                  </div>
                              </div>

                              <div className="flex gap-4 justify-between">
                                <div>slot</div>
                                <div>{ dayjs(a.date).format('DD MMM YY')} , {a.start} - {a.end}</div>
                              </div>


                              <div className="flex gap-4 justify-between">
                                <div>Reason</div>
                                <div>{ a.reason }</div>
                              </div>


                              <div className="flex gap-4 justify-between">
                                                           <div >Action</div>
                               <Menu shadow="md" radius={"md"} width={150} withArrow position={'left'}>
                                        <Menu.Target>
                                            <button disabled={a.status === "canceled" ? true : false} className={` ${a.status ==="canceled" ? "bg-gray-100" : "bg-gray-500"} text-white px-2 rounded-lg text-white`}>
                                              Action
                                            </button>
                                        </Menu.Target>
                                        <Menu.Dropdown>
                                         
                                          {
                                            a.rescheduledBy ==='doctor' && a.status !== 'confirmed'?
                                            <Menu.Item onClick={()=>Action(i,"confirmed",a._id)}>Confirm</Menu.Item>
                                            :
                                            <></>
                                          }
                                          
                                          {
                                           a.status !== "reschedule"  ?
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
      <div className="h-[68vh] overflow-y-auto">
      <Stepper  size="xs" active={active} onStepClick={setActive}>
        <Stepper.Step  allowStepSelect={shouldAllowSelectStep(0)}  >
           <div className="">
               <ScheduleView timeSlots={timeSlots}setTimeSlots ={setTimeSlots} userID={id} slot={slot} setSlot={setSlot} slotId={slotId} setSlotId={setSlotId} dayIndex={dayIndex} setDayIndex={setDayIndex} currentDate={currentDate} setCurrentDate={setCurrentDate}/>
            </div>
        </Stepper.Step>
        <Stepper.Step  allowStepSelect={shouldAllowSelectStep(1)}>
           <DogList handleCurrentDogInfo={handleCurrentDogInfo}
                    handleDogInfo={handleDogInfo}
                    dogInfo={dogInfo}
                    addDogProfile={addDogProfile}
                    deleteDog={deleteDog}
                    selectedDog={selectedDog}
                    setSelectedDog={setSelectedDog}
                    isEditingDog={isEditingDog}
                    setIsEditingDog={setIsEditingDog}
                    currentDogInfo={currentDogInfo}
                    setCurrentDogInfo={setCurrentDogInfo}
                    saveCurrentDogInfo={saveCurrentDogInfo}
                    dogList={dogList}
                    loading={loading}
                    showReason={true}
            />
        </Stepper.Step>
        <Stepper.Step  allowStepSelect={shouldAllowSelectStep(2)} >
                     <div className="grid gap-2 border-t mt-5">
         
              
             
              
               
               

{/*const decryptedBytes = CryptoJS.AES.decrypt(phonenumber.number, secretKey);*/}
{/*const decryptedPhoneNumber = decryptedBytes.toString(CryptoJS.enc.Utf8);*/}
               {/*<VerifyPhoneNo/>*/}

{
               phoneNumber ? 
               <div className="p-2 mt-5">
                 Your current phone no is  <br/>
                 <div className="flex gap-4">
                 <span className="text-lg font-bold">{phoneNumber}</span><img onClick={()=>setPhoneNumber(null)} src="/assets/icons/cross.svg" className="w-4 hover:opacity-50 cursor-pointer"/>
                 </div>
               </div>
               :
               <div>
                 <label className="mt-2 text-md font-bold">Add phone no</label>
                  <div className="flex text-xs">
                     <div className="grid gap-3 w-full">
                      <div className="grid gap-2">
                         <label>Phone No<span className='text-gray-500'></span></label>
                         <PhoneInput
                            defaultCountry="IN"
                            placeholder="Enter phone number"
                            value={phoneValue}
                            onChange={setPhoneValue}
                         />
                         <div className="flex justify-end">
                            <button disabled={isActive} onClick={sendOtp} className={`w-28   text-xs px-2 py-1 rounded ${!isActive? "bg-amber-500 text-white" :"bg-gray-300 text-gray-500"}`}>
                               {isActive ? `Resend in ${timer}s` : !sendCount?"Send OTP": "Resend OTP" }
                            </button>
                          </div>
                      </div>
                      <div className={`${isActive ? "": "hidden"} grid gap-2`}>
                        <div className="grid gap-2">
                         <label>Otp</label>
                         <OtpInput
                            ref={otpRef}
                            otpValue={otp}
                            onChange={handleChangeOtp}
                            separator={'-'}
                            styleOtpInput={"w-5 h-10 p-2"}
                          />
                       </div>
                       <div className="text-end">
                         <button className="bg-[brown] text-white  py-1 w-28 rounded-md" onClick={Save}>Verify</button>
                       </div>
                     </div>
                      </div>
               </div>
               </div>  
}

              {/*<div className="max-w-[300px]">
                {phoneNumbers &&
                  phoneNumbers.map((n) => {
                    return (
                      <div key={n.id} className="border-l-4 border-amber-500 bg-white rounded-md p-2 items-center flex justify-between">
                        <div className="text-xs">{n.number}</div>
                        <button className="text-md hover:text-red-500" onClick={() => deletePhoneNo(n.id)}>
                          &#215;
                        </button>
                      </div>
                    );
                  })}
              </div>*/}
            </div>
        </Stepper.Step>

         <Stepper.Step  allowStepSelect={shouldAllowSelectStep(3)} >

         <Tabs color="Payment" defaultValue="first">
          <Tabs.List>
            <Tabs.Tab value="first">Payment</Tabs.Tab>
            <Tabs.Tab value="second" color="blue" rightSection={<Badge color='blue'>{credit?.credits}</Badge>}>
             Credit
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="first" pt="xs">
          <div className="flex justify-center items-center">
                  <div className=" p-4 flex flex-col text-center max-w-lg mt-3 rounded-lg mx-auto">
                      <div>
                          <p className="mb-2 text-2xl font-bold ">Payment</p>
                          <h2 className="font-bold text-2xl text-center">₹75</h2>
                      </div>
                      <div className="my-8 flex flex-col gap-4 text-black mr-auto">
                          <p  className="flex items-center gap-2"> <img className="w-4 h-4 " src="https://i.ibb.co/pPWnTDj/1828640.png" alt="" /> Priority appointments help you beat the queue</p>
                          <p  className="flex items-center gap-2"> <img className="w-4 h-4 " src="https://i.ibb.co/pPWnTDj/1828640.png" alt="" /> This payment is only for the appointment booking and does not include ( consultation , medical fee, medicine and other charges)</p>
                          <p  className="flex text-left  items-center gap-2"> <img className="w-4 h-4 " src="https://i.ibb.co/pPWnTDj/1828640.png" alt="" /> Please be patient if there is another pet.Your turn will be right after that</p>
                      </div>
                      <button className="rounded-lg bg-blue-500 p-2 uppercase " onClick={()=>handlePayment(1,"INR","schedulecredit")}>Agree</button>
                  </div>
           </div>
          </Tabs.Panel>
          <Tabs.Panel value="second" pt="xs" >
             <button className="rounded-lg bg-blue-500 p-2 uppercase" onClick={Confirm}>Use Credits</button>
          </Tabs.Panel>

        </Tabs>

           
        </Stepper.Step>


        {/*<Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>*/}
      </Stepper>

     
      </div>

       <div className="flex w-full justify-center gap-4">
        {
           slotId && active < 3 &&
            <button className="p-2 bg-yellow-500 w-32" onClick={nextStep}>Next</button>  
        }
        
      </div>

      </Tabs.Panel>

        <Tabs.Panel value="Credit" pt="xs" >
           <div className="flex flex-col gap-2 h-[68vh] overflow-y-auto">
            <h2 className="font-semibold">In case you or the doctor cancels the booking within 2 hours of the appoinment you get 1 appoinment credit. <br/> <p className='text-md font-medium mt-3'>This can be used to book appoinment for your next visit.</p></h2>
            <p className="text-gray-600">Total no of credits remaining : {credit?.credits} </p>
            <p className="text-gray-600">Credits used : 0</p>
            </div>
        </Tabs.Panel>


    </Tabs>
 


</div>
:
  <div className="text-sm text-gray-500 flex flex-col gap-4 font-Inter">
    <div className="flex flex-col  gap-2">

  <p className="text-xs flex  mr-auto items-center gap-1 text-black ">
   <img src='/time-2.svg' className="w-5" /> 
   No more waiting in the Queue...
   </p>   
<div className="px-6 flex flex-col gap-1">
<p className="text-xs flex  items-center gap-1 text-black  ">Book appointments from the comfort of your home and beat the queue
 </p>  

<p className="text-xs flex  items-center gap-1 text-black  ">These are Priority bookings where the doctor’s see you at your specified time slot</p>  

<p className="text-xs flex  items-center gap-1 text-black  ">You will get a SMS and Email upon confirmation of your booking.</p>
<p className="text-xs flex  items-center gap-1 text-black  ">In case it is rescheduled please accept the alternate date and time or cancel and choose a different date and time</p>

<p className="text-xs flex  items-center gap-1 text-black  ">You can cancel 24 hours before your booking.</p>   

<p className="text-xs flex  items-center gap-1 text-black  ">In case of an emergency or if the doctor has still not finished with a Patient. Please wait as your turn will be right after them. 
</p>   
     
</div>

{/*<p className="text-xs flex  items-center gap-1 text-black  ">
   <img src='/money-2.svg' className="w-5" /> 
 A charge of Rs 75 is levied per Priority Booking
</p>  */}

<Link href={"/faq"}>
    <p className="text-xs flex mt-7 items-center gap-1 text-black underline ">Please read the FAQ section for more details </p>    
</Link>
</div>
    <div className="flex justify-end">
      <button className="p-2 bg-yellow-500 rounded-xl mt-3 text-white w-32" onClick={()=>setscheduleAgreed(true)}>Agree</button>
    </div>
  </div>
}
</Modal>


    
</div>
</div>
    
  );
};

export default VetChatDoctorsProfile;
