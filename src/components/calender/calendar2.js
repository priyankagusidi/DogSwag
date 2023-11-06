
import React, { useState, useEffect , useRef } from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
// import { useSpring, animated } from '@react-spring/web'
// import PricingModal from './pricingModal'
// import { Tooltip } from 'react-tooltip';
// import { Tooltip as ReactTooltip } from "react-tooltip";
// import { Walktour } from 'walktour'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { DateInput } from '@mantine/dates';
// const FullCalendar = dynamic(() => import('./FullCalendar'), {
//   ssr: false // Disable server-side rendering
// });
const url = `${process.env.NODE_ENV === "development" ? "http://localhost:4000" : process.env.PROD_URI }`
// import FullCalendar from './FullCalendar'
import {Modal} from '@mantine/core'
import moment from 'moment'
// import rrulePlugin from '@fullcalendar/rrule';
import { Select } from '@mantine/core';
import DefaultSections from './defaultSection'
import DefaultTime from './defaultTime'
import DefaultRecurring from './defaultRecurring'
import DefaultMedicineType from './defaultMedicineType'
import {defFoodQty,defMedicineQty} from './defaultQty'
import { Switch,Popover } from '@mantine/core';
import { Tabs } from '@mantine/core';
import { useRouter } from 'next/router'
import axios from 'axios'
import { nanoid } from 'nanoid'
import EventPreview from './EventPreview'
// import jwt from 'jsonwebtoken';

import OtpInput from 'react-verify-otp';
import '/node_modules/react-verify-otp/dist/style.css';
import dynamic from 'next/dynamic'
const PhoneInput = dynamic(() => import('react-phone-number-input'), {
    ssr: false,
});
import { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
// import CryptoJS from 'crypto-js'


const Calendar = ({dogdata,demo,setShowPricing,billingdata,scrollToComponent,openCreate,setOpenCreate,dateSelect,setDateSelect}) => {
  
  // console.log(animated)
  // return 
  const [pricingModal,setPricingModal] = useState(false)
  const [dogInfo,setDogInfo] = useState({})

  const [events, setEvents] = useState([]);
  const [selectedEvents,setSelectedEvents] = useState([])
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [openRemModal,setOpenRemModal] = useState(false)
  const [reminderList,setReminderList] = useState([])

  const [selectedTime,setSelectedTime] = useState("Morning")
  const [selectedRem,setSelectedRem] = useState("12:00")
  const [selectedMedicineType,setSelectedMedicineType] = useState("Tablet")
  const [selectedQty,setSelectedQty] = useState("50gms")
  const [selectedSection,setSelectedSection] = useState("all")

  const [info,setInfo] = useState({})
  const currentTime = "12:00:00"
  const [sectionList,setSectionList] = useState([])
  const [whatsappList,setWhatsappList] = useState([])
  const [number,setNumber] = useState("")

  const [sectionData, setSectionData] = useState(DefaultSections)
  const [timeData, setTimeData] = useState(DefaultTime)
  const [recurringData, setRecurringData] = useState(DefaultRecurring)
  const [medicineTypeData, setMedicineTypeData] = useState(DefaultMedicineType)
  const [qtyData, setQtyData] = useState([])

 
  const [section,setSection] = useState("Medicine")
  const [checked, setChecked] = useState(false);
  const [hasReminder,setHasReminder] = useState(false)
  const [recurringTime,setRecurringTime] = useState(null)
  const [eventInfo,setEventInfo] = useState({})
  const [recurringUntill,setRecurringUntill] = useState(null)
  const [timing,setTiming] = useState("Morning")
  const [recurringInfo,setRecurringInfo] = useState({})

  const [startDate,setStartDate] = useState()
  const [endDate,setEndDate] = useState()
  const [isEditingEvents,setIsEditingEvents] = useState(false)
  const [contentList,setContentList] = useState([])
  
  const [currentEvent,setCurrentEvent] = useState({})
  const [eventEditingID,setEventEditingID] = useState("")
  const [phone,setPhone] = useState({})
  const [phoneNumbers,setPhoneNumbers] = useState([])
  const [selectedEventID,setSelectedEventID] = useState("")
  const [gen,setGen] = useState("")
  const [inviteModal,setInviteModal] = useState(false)
  const [selectedDateRange,setSelectedDateRange] = useState({})
  const [mulEvents,setMulEvents] = useState([])

  const otpRef = useRef(null);
  const [otp, setOtp] = useState('');
  const [phoneValue, setPhoneValue] = useState("")
  const [timer, setTimer] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [isActiveOtp, setIsActiveOtp] = useState(false); 
  const [sendCount, setSendCount] = useState(0) 
  const [openInfo,setOpenInfo] = useState(false)
  const [showButton, setShowButton] = useState(true);
  const eventCreateRef  = useRef(null)
  const calenderRef = useRef(null);
  const [inviteLink,setInviteLink] = useState("")
  const router = useRouter() 
  const textAreaRef = useRef(null);
   const [eventInstOpen,setEventInstOpen] = useState(false)
  const [step, setStep] = useState(0);
  const [messages,setMessages] = useState("")
   

  // const handAnimation = useSpring({
  //   left: step === 0 ? '100px' : '300px',
  //   top: step === 0 ? '100px' : '200px',
  // });

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };


  const copyToClipboard = (value) => {
      navigator.clipboard.writeText(value)
  };

  // console.log(FullCalendar)
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
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1, // Adjust the threshold as per your requirement
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setShowButton(false);
        } else {
          setShowButton(true);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    if (calenderRef.current) {
      observer.observe(calenderRef.current);
    }

    return () => {
      if (calenderRef.current) {
        observer.unobserve(calenderRef.current);
      }
    };
  }, []);

  const scrollToCalendar = () => {
    if (calenderRef.current) {
      calenderRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

    async function fetchProfileData(){
    try{
       await axios.get(`/api/dogprofile/profile/${dogdata?.profile?._id}`).then(res=>{
          setDogInfo(res && res.data && res.data.profileData?res.data.profileData : {})
       })
    }
    catch(e){
       // console.log(e)
    }
  }
  
  useEffect(()=>{
      fetchProfileData()
  },[dogdata?.profile?._id])


    const handleChangeOtp = (otp) => {
        setOtp(otp)
    };
   
   // console.log(isActive)

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
              // console.log(res.data)
              setIsActiveOtp(true)
          })
        }catch(err){
          // console.log(err)
        }
    }
   // console.log(phoneValue)
   async function Save(){
       if(!isValidPhoneNumber(phoneValue)){
        alert("Invalid phoneno")
        return
      }
       try{
         await axios.post('/api/calender/number/verify',{phoneno:phoneValue,otp:otp}).then(res=>{
            console.log(res.data)
            toast(res.data.msg)
            if(res.data.verified === true){
              // setPhoneNumbers([...phoneNumbers,phoneValue]) 
               setPhoneNumbers([...phoneNumbers,{id:nanoid(),number:phoneValue}])
               setOtp("")
               setPhoneValue("")
            }
            setIsActiveOtp(false)
         })
       }catch(err){
         // toast(res.data.msg)
         // console.log(err)
       }

   }

  

  useEffect(()=>{

    if(section === "Medicine"){
      setQtyData(defMedicineQty)
    }
    if(section === "Food"){
      setQtyData(defFoodQty)
    }
  },[section])
 
  useEffect(()=>{
     // getEvents()
     getPhoneNumber()
  },[])
  

  useEffect(()=>{
     getEvents()
  },[dogdata?.profile?._id])


  async function getPhoneNumber(){
    try {
      await axios.get('/api/dogevents/events/phone').then(res=>{
        setPhoneNumbers(res && res.data && res.data.numbers && res.data.numbers.allowednumbers)
        // console.log(res)
      })      
    } catch(e) {
        // console.log(e);
        setPhoneNumbers([])
    }
  }
 async function getEvents(){
    if(!dogdata?.profile?._id){
      return
    }
    try{
       await axios.get(`/api/dogevents/events/${dogdata?.profile?._id}/${startDate}/${endDate}`).then(res=>{
        setEvents(res.data.events)
       })
    }catch(e){
      // console.log(e)
    }
 }

 function selectTime(e) {
  setSelectedTime(e.target.value)
 }

 function selectRem(e){
  setSelectedRem(e.target.value)
 }

 function handleChange(e){
 }

   const handleCustomButtonClick = () => {
    // Custom button click event handler
    // Add your logic here
    setEventInstOpen(true)
  };
   
   // console.log(billingdata)
  function checkBilling(){
    
    if(billingdata.trial && !billingdata.trialQuotaAlert && !billingdata.premiumQuotaAlert){
       return  
    }
    
    // scrollToComponent()
    setPricingModal(true)
  
  }


async function createRem(){

    setMessages("")
    // return
    if(demo){
      alert("create atleast one dog profile")
      return
    }

    if(!section){
      alert("add a section")
    }
    
    if(!selectedTime){
      alert("add a timing")
    }
 

    if(contentList.length < 1){
      alert("add atleast one content")
      return
    }
    if(moment(selectedDateRange.StartDate).subtract(1, 'day').format('YYYY-MM-DD') >= moment(selectedDateRange.EndDate).add(1, 'day').format('YYYY-MM-DD') ){
      alert("Invalid date range!")
      return
    }

    let start = moment(selectedDateRange.StartDate).format('YYYY-MM-DD');  
    let end = moment(selectedDateRange.EndDate).add(1, 'day').format('YYYY-MM-DD')
        
    // if(moment(selectedDateRange.StartDate).format('YYYY-MM-DD') !== moment(selectedDateRange.EndDate).format('YYYY-MM-DD')){
    //    start = moment(selectedDateRange.StartDate).subtract(1, 'day').format('YYYY-MM-DD')
    // }

    console.log(moment(selectedDateRange.StartDate).format('YYYY-MM-DD'),moment(selectedDateRange.EndDate).format('YYYY-MM-DD'),moment(selectedDateRange.StartDate).format('YYYY-MM-DD') !== moment(selectedDateRange.EndDate).format('YYYY-MM-DD'))
   

      const id = events.length + 1;
      const newEvent = {
        id,
        title:section,
        start: start,
        end:end,
        content:contentList,
        c_section:section,
        c_rem:checked ? selectedRem:null,
        c_time:selectedTime,
        allowednumbers:phoneNumbers,
        color: setColor(section),   // an option!
        textColor: 'black'
     }

    // console.log(newEvent)
    // return


  function setColor(section){
      if(section === "Medicine"){
        return "skyblue"
      }else if (section==="Food") {
        return "#90EE90"
      }else if (section === "Training") {
        return "yellow"
      }else if (section === "Vetvisit") {
        return "purpule"
      }else if (section === "Holiday"){
        return "red"
      }else if(section === "Boarding"){
        return "pink"
      }else {
        return "gray"
      }
  }

     
try {
      await axios.post(`/api/dogevents/create/${dogdata?.profile?._id}`,newEvent,{
            credentials: 'include'
      }).then(res=>{

          if(phoneNumbers.length > 0){
            setMessages("Both Event & Reminder created!")
          }else{
            setMessages("Only Reminder created")
          }
          // toast("Event Created!")
          // console.log(res)
      })
      // setEvents([...events, newEvent]);
      getEvents()
      setSelectedSection("all")
    } catch(e) {
      alert(e && e.response && e.response.data ? e.response.data.msg : "error creating event")
      // console.log(e);
    }
 }

  function onChangeWhatsapp(e){
    setNumber(e.target.value)
  }
  
  function addWhatsapp(){
    setWhatsappList([...whatsappList,number])
  }





  // console.log(selectedDateRange)
  const handleSelect = (info) => {
    // scrollToEventCreateButton()
    setSelectedDateRange({...selectedDateRange,StartDate:moment(info.startStr).format('YYYY-MM-DD'),EndDate:moment(info.endStr).subtract(1, 'day').format('YYYY-MM-DD')})
    setEventInstOpen(false)
    setSelectedSection("all")
    setEventInfo(info)
    setSelectedDate(info)
    // setRecurringUntill(info.endStr)
    // console.log(info)
    // setSelectedDateRange({...selectedDateRange,StartDate:info.startStr,EndDate:info.endStr})
    
const eventOnDesiredDate = events.find(event => {
  const eventStartDate = moment(event.start);
  const eventEndDate = moment(event.end);
  
  const infoStartDate = moment(info.start);
  const infoEndDate = moment(info.end);
  
  return moment(eventStartDate).isSameOrBefore(moment(infoStartDate)) && moment(eventEndDate).isSameOrAfter(moment(infoEndDate)) 
     // .format('DD/MM/YYYY') <= moment(info.start).format('DD/MM/YYYY') && .format('DD/MM/YYYY') >= moment(info.end).format('DD/MM/YYYY')
  // );
});
    
    if (eventOnDesiredDate) {
     setOpenCreate(false)
    }else {
     setOpenCreate(true)
    }

    setIsEditingEvents(false)
    setContentList([])
    setDateSelect(true)
  };



  const createModalEvent =()=>{
     // setOpenRemModal(true)
     setOpenCreate(!openCreate)
     setIsEditingEvents(false)
     setContentList([])
  }

  const handleTiming = (timing) =>{
     setTiming(timing)
  }

   const scrollToEventCreateButton = () => {
    if (eventCreateRef.current) {
      eventCreateRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  

  const editEvent = (event,oneeventid) =>{
     setSelectedDateRange({...selectedDateRange,StartDate:event.start,EndDate:moment(event.end).subtract(1, 'day').format('YYYY-MM-DD')})
     setIsEditingEvents(true)
     // setOpenRemModal(true)
     setOpenCreate(true)
     // console.log(event)
     // setCurrentEvent(event)
     setSelectedTime(event.c_time)
     setSection(event.c_section)
     setSelectedRem(event.c_rem)
     setContentList(event.content)
     setEventEditingID(event._id)
     setSelectedEventID(oneeventid)
     // setPhoneNumbers(event.allowednumbers)
  }
  // console.log(phoneNumbers)
  const deleteEvent = (id) =>{
    
  }

  const handleRecurring = (e) =>{

  }
  
  const handleDate = (event)=>{
    // if(window.innerWidth < "1020"){
    //  scrollToEventCreateButton()
    // }

    // setSelectedSection("all")
    // setEventInfo(info)
    // setOpenCreate(false)
    // setSelectedDate(info)
    // setRecurringUntill(info.endStr)
    // setOpenCreate(true)
    // setIsEditingEvents(false)
    // setContentList([])
    // setDateSelect(true)
  }

  const editRem =async()=>{  
      // alert(eventEditingID)
      // return
     
     if(!section){
       alert("add a Section")
       return
     }

     if(!selectedTime){
       alert("add a timing")
     }

     if(contentList.length < 1){
      alert("add atleast one content")
      return
    }
    if(moment(selectedDateRange.StartDate).subtract(1, 'day').format('YYYY-MM-DD') >= moment(selectedDateRange.EndDate).add(1, 'day').format('YYYY-MM-DD') ){
      alert("Invalid date range!")
      return
    }
    let start = moment(selectedDateRange.StartDate).format('YYYY-MM-DD');  
    let end = moment(selectedDateRange.EndDate).add(1, 'day').format('YYYY-MM-DD')
        
    if(moment(selectedDateRange.StartDate).format('YYYY-MM-DD') !== moment(selectedDateRange.EndDate).format('YYYY-MM-DD')){
       start = moment(selectedDateRange.StartDate).subtract(1, 'day').format('YYYY-MM-DD')
    }

    // setOpenRemModal(false)
     
    const newEvent = {
        // id:eventEditingID,
        start:start,
        end: end,
        title:section,       
        content:contentList,
        c_section:section,
        c_rem:checked ? selectedRem:null,
        c_time:selectedTime,
        allowednumbers:phoneNumbers,
        color: 'orange',   
        textColor: 'black'
      };
     try{
      await axios.put(`/api/dogevents/events/edit/${eventEditingID}`,newEvent,{
            credentials: 'include'
      }).then(res=>{
          toast("Event Edited!")
         // console.log(res)
      })
       setIsEditingEvents(false)
       getEvents()
     } 
     catch(e){
      // console.log(e)
     }
      
  }

  const deleteRem=async()=>{

    await axios.delete(`/api/dogevents/events/delete/${eventEditingID}`,{
            credentials: 'include'
      }).then(res=>{
         // console.log(res)
      })
    getEvents()
    setSelectedSection("all")
    setContentList([]) 
    setIsEditingEvents(false)
    setSelectedRem("")
  }


const addMoreContent = () => {
  setContentList((prevContentList) => [
    ...prevContentList,
    {id:nanoid() ,what: "", how: "" ,type:"",qty:""} // Initialize the new content with empty values
  ]);
};

console.log(events)
// console.log(contentList)
const handleChangeContent = (e, id, fieldName) => {

  // console.log(id,fieldName)
  const { value } = e.target;

  const updateContentList = contentList.map((l,i)=>{
    if(l.id===id){
      return {...l,[fieldName]:value}
    }else {
      return {...l}
    }
  })

  setContentList(updateContentList)
};

const handleEventClick =(info)=>{
  setInviteModal(true)
  setInviteLink(info.event.extendedProps._id)
}

const deleteContent = (id) => {
  const updateContentList = contentList.filter((l,i)=>l.id !== id)
  setContentList(updateContentList)
};

// console.log(billingdata)

function customDescriptionRenderer(step) {


  // console.log(step)
  return (
    <div>
      <img src={step} className="h-20 w-60 object-cover"/>
    </div>
  );
}


function handleChangeDate(e){
  // console.log(e.target.value)
 
  setSelectedDateRange({...selectedDateRange,[e.target.name]:e.target.value})
}

// console.log(selectedDateRange)

function customTitleRenderer(step) {

  
  // console.log(step)
  return (
    <div>
      <h1>{step}</h1>
    </div>
  );
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


//   function dateCheck(from,to,check) {
   
//     var fDate,lDate,cDate;
//     fDate = Date.parse(from);
//     lDate = Date.parse(to);
//     cDate = Date.parse(check);
   
     // console.log(fDate,lDate,cDate)
//     if((cDate <= lDate && cDate >= fDate)) {
//         return true;
//     }
//     return false;
// }

console.log(dogdata)

   function CustomEvent(props) {
    // console.log(props)
  return (
    <div className="flex md:text-xs gap-2">
      <span>{props.event._def.extendedProps.c_rem ? props.event._def.extendedProps.c_rem : "N/R" }</span>
      <span>{props.event.title}</span>
    </div>
  );
}


   function CustomDesc(props) {
    // console.log(props)
  return (
     <div>helo</div>
  );
}

function ActiveCreateWidow(){
}
// console.log(phoneNumbers)
// return null 
  return (
    <div className="flex ">
        <ToastContainer />
     

   {/*  <div className="grid grid-cols-2 gap-2 w-full border">
          <input type="date" className="p-2 w-full"/>
          <input type="date" className="p-2 w-full"/>
     </div>*/}

        
   
     <div className={`w-full max-w-3xl mx-auto ${dateSelect ? "absolute top-0 transition duration-[5s]":"hidden"} h-[80vh] relative`}>



      <div className="max-w-7xl">
         <EventPreview selectedSection={selectedSection} events={events} selectedDate={selectedDate} timing={timing} handleTiming={handleTiming} editEvent={editEvent} setSelectedSection={setSelectedSection}/>
      </div>
 <div className="cursor-pointer">
        <button className="w-10 h-10 bg-amber-900 absolute rounded-full text-4xl text-white  bottom-5 right-0 lg:right-5" onClick={()=>{createModalEvent()}}>+</button>
 </div>
    
 <div className="flex justify-center">
 
 <div  className={`${openCreate ? "":"hidden"} w-11/12  text-xs absolute  bottom-20 h-[500px] xs:right-2 lg:right-5 overflow-y-auto bg-gray-100  shadow-md p-5 rounded-md z-50`}>
          <div className="flex flex-col h-full justify-between">
           <div className="">
             {/*<h1 className="text-xl font-bold text-amber-500">Create Reminder</h1>*/}
                  <div className="text-amber-700 grid grid-cols-2 gap-1 font-bold">
                  <input type="date" value={selectedDateRange.StartDate} name="StartDate" onChange={handleChangeDate} className="p-2 w-full border text-sm"/>
                  <input type="date" value={selectedDateRange.EndDate} name="EndDate" onChange={handleChangeDate} className="p-2 w-full border text-sm"/>
                  </div>
                  {/*{`${moment(selectedDate.startStr).format('DD/MM/YYYY')} - ${moment(selectedDate.endStr).subtract(1, 'day').format('DD/MM/YYYY')}`}*/}

             <div className="my-2 grid grid-cols-2 max-w-2xl p-2 shadow-md gap-3 rounded-md">
                {/*section*/}
               <div>
               <Select
                  data={sectionData}
                  placeholder="Section"
                  nothingFound="Nothing found"
                  searchable
                  onChange={setSection}
                  creatable
                  getCreateLabel={(query) => `+ Create ${query}`}
                  onCreate={(query) => {
                    const item = { value: query, label: query+" "+"👉" };
                    setSectionData((current) => [...current, item]);
                    return item;
                  }}
                  value={section}
                />
               </div>

              {/*timing*/}
              <div className="">
              <Select
                data={timeData}
                placeholder="When"
                nothingFound="Nothing found"
                searchable
                onChange={setSelectedTime}
                value={selectedTime}
              />
               </div>
              
              
              </div>
<div className="grid gap-2">

{
  contentList.map((m,i)=>{
                return(
                  <div key={m.id} className="flex rounded-md shadow-md  border border-gray-200">
                  <div className="grid w-full md:grid-cols-2  gap-2 p-2">
              {/*what*/}
              <div className="">
                 <div> 
                    <input value={m.what} className="py-[7px] px-[12px] w-full text-sm  outline outline-1 outline-gray-300 rounded" placeholder="What" onChange={(e)=>handleChangeContent(e,m.id,"what")} name={`what`} />
                 </div>
              </div>

              {
                section === "Medicine" ?
                <div>
                <Select
                data={medicineTypeData}
                placeholder="Type"
                nothingFound="Nothing found"
                searchable
                value={m.type}
                onChange={(selected) => handleChangeContent({ target: { value: selected }},m.id,"type" )}
                // onChange={setSelectedMedicineType}
              />
              </div>
              :
              <></>
              }

              {
                section === "Medicine" || section === "Food" ?

             <div>
              <Select
              data={qtyData}
              placeholder="Qty"
              nothingFound="Nothing found"
              searchable
              // onChange={setSelectedQty}
              onChange={(selected) => handleChangeContent({ target: { value: selected }},m.id,"qty")}
              creatable
              value={m.qty}
              getCreateLabel={(query) => `+ Create ${query}`}
              onCreate={(query) => {
                const item = { value: query, label: query };
                setQtyData((current) => [...current, item]);
                return item;
              }}
            />
            </div>

              :
              <></>
              }
              {/*how*/}
                <div>
                    <input value={m.how} className="p-[7px] px-[12px] w-full   text-sm outline outline-1 outline-gray-300 rounded" placeholder="e.g. With water,Broth" onChange={(e)=>handleChangeContent(e,m.id,"how")} name={`how`}/>
                </div>
                </div>
                <div onClick={()=>deleteContent(m.id)} className="flex items-center bg-red-500 p-2 cursor-pointer shadow-md rounded-r-md ">
                  <button ><img src="/assets/icons/cross.svg" className="w-3 invert"/></button>
                </div>
        </div>
              
                  )
              })
}
              
              </div>

              <div className="flex justify-center">
                <button id={"add_more_content_button"} className="text-xs p-2 rounded-full mt-2 bg-white shadow-md flex gap-2 items-center" onClick={addMoreContent}><img src={"/assets/icons/add-circle.svg"} className="w-5" /></button>
              </div>
            <div>

            {/*when*/}
         {/*   <div className="flex gap-2 items-center py-1 font-bold">
              <h1>Used</h1>
              {billingdata && billingdata.premium
              ? billingdata.premium.notificationsCount+"/150"
              : billingdata && billingdata.trial
              ? billingdata.trial.notificationsCount+"/10"
              : null}
            </div>*/}
             <div id={"notification_button"} className="w-fit flex flex-col gap-2 mt-4">
                  <Switch  checked={checked} size="xs" label="Add Notification" onChange={(event) => setChecked(event.currentTarget.checked)} />
              { 
               checked ?
               <div className="flex gap-2 items-center">
                 <input className="p-1 w-32 outline outline-1 outline-gray-300 rounded-md" placeholder="" type="time" value={selectedRem} onChange={selectRem}/>                
                {/* <div className="relative cursor-pointer">
                    <span className="font-bold" onClick={()=>setOpenInfo(!openInfo)}>[ i ]</span>
                    <span className={`absolute w-32 h-16 p-2 bg-amber-100 text-xs -top-16 shadow-md ${openInfo ? "" :"hidden"}`}>By enabling this you will get reminder in whatsapp</span>
                 </div>*/}
                 <Popover width={200} position="bottom" withArrow shadow="md">
                <Popover.Target>
                    <button>[ i ]</button>
                </Popover.Target>
                <Popover.Dropdown>
                  By enabling this you will get reminder in whatsapp.
                  <p className="text-red-500">{"Ensure the notified user has not activated DND. Messages don't go to DND users."}</p>
                </Popover.Dropdown>
              </Popover>
               </div>
               :
               <></>
             }
            </div>

            </div>
          <div className="flex justify-center mt-5">
           <Popover width={250} color="blue" position="bottom" withArrow shadow="md">
                <Popover.Target>
                    <button id="message_preview_button" className="text-xs p-2 rounded-full mt-2 bg-blue-500 shadow-md flex gap-2 items-center text-white"><img src={"/assets/icons/calendar/preview.svg"} className="w-3" />Message Preview</button>
                </Popover.Target>
                <Popover.Dropdown>
                          <div className="w-60 rounded-md p-2 text-sm">
                <h1 className="font-bold">🐕 DogSwag 🐕</h1>
                <div className="flex flex-col">
                 <div>{`Pet Name - ${dogInfo && dogInfo.name}`}</div>
                 <div className="font-semibold">{section}</div>
                 <div>{`Time - ${selectedTime}`}</div>
                 <div className="flex flex-col">
                  {
                   contentList && contentList.map((m,i)=>{
                     return (
                         <div key={m.id} className="flex gap-2">
                            <div>{m.what}</div>
                            <div>{m.type}</div> 
                            <div>{m.qty}</div>
                            <div>{m.how}</div>
                         </div>
                      )
                   })
                  }
                 </div>
                </div>
              </div>
                </Popover.Dropdown>
              </Popover>
           </div>          
          
           </div>

           {
              messages && 
              <div className="mt-2 text-amber-800 text-center">
                 {messages}
              </div>
              }
             

          <div className="grid gap-2 border-t mt-5">
               <label className="mt-2 text-md font-bold">Add people</label>
               <div className="flex text-xs">
                 {/*<input onChange={handlePhonNo} placeholder="phone number" className="p-2 outline outline-1 outline-gray-300 rounded-md"/>*/}
                
                     <div className="grid gap-3 w-full">
                      <div className="grid gap-2">
                         <label>Phone No<span className='text-gray-500'></span></label>
                         <PhoneInput
                            defaultCountry="IN"
                            placeholder="Enter phone number"
                            value={phoneValue}
                            onChange={setPhoneValue}

                         />

         <div className="flex justify-end"><button disabled={isActive} onClick={sendOtp} className={`w-28   text-xs px-2 py-1 rounded ${!isActive? "bg-amber-500 text-white" :"bg-gray-300 text-gray-500"}`}>{isActive ? `Resend in ${timer}s` : !sendCount?"Send OTP": "Resend OTP" }</button> </div>


                      </div>
                      
                      <div className={`${isActiveOtp ? "": "hidden"} grid gap-2`}>
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
               
                 {/*<button className="bg-amber-300 w-24 rounded-r-md" onClick={addPhoneNo}>Add</button>*/}
               </div>
               

{/*const decryptedBytes = CryptoJS.AES.decrypt(phonenumber.number, secretKey);*/}
{/*const decryptedPhoneNumber = decryptedBytes.toString(CryptoJS.enc.Utf8);*/}
               {/*<VerifyPhoneNo/>*/}

              <div className="max-w-[300px]">
      {phoneNumbers &&
        phoneNumbers.map((n) => {


{/*
          const isEncrypted = (value) => {
  try {
    const decryptedBytes = CryptoJS.AES.decrypt(value, secretKey);
    const decryptedValue = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return !!decryptedValue; // Return true if decryption is successful
  } catch (error) {
    return false; // Return false if decryption fails
  }
};*/}


{/*          const secretKey = 'malibu';
          let decryptedPhoneNumber = ""

         if(isEncrypted(n.number)){
          const decryptedBytes = CryptoJS.AES.decrypt(n.number, secretKey); // Replace with your secret key
           decryptedPhoneNumber = decryptedBytes.toString(CryptoJS.enc.Utf8);
         }else{
           decryptedPhoneNumber = n.number
         }
          */}



          return (
            <div key={n.id} className="border-l-4 border-amber-500 bg-white rounded-md p-2 items-center flex justify-between">
              <div className="text-xs">{n.number}</div>
              <button className="text-md hover:text-red-500" onClick={() => deletePhoneNo(n.id)}>
                &#215;
              </button>
            </div>
          );
        })}
    </div>


            </div>

             

             <div className="">
              {
              !isEditingEvents ?
              <div className="mt-2"><button id="create_event_button" className="p-[7px] text-sm bg-amber-400 rounded-full text-black w-full" onClick={createRem}>Create</button></div>
              :
              <div className="mt-2 flex flex-col">
              <div className=""><button className="p-[7px] text-sm bg-gradient-to-r from-green-300 to-purple-400 text-white rounded w-full" onClick={editRem}>Edit</button></div>
              <div className=""><button className="p-[7px] text-sm bg-gradient-to-r from-rose-700 to-pink-600 text-white rounded w-full" onClick={deleteRem}>Delete</button></div>

              </div>
              }
              </div>
              
              

        </div>




        </div>      
</div>

</div>
   <Modal
                  opened={inviteModal}
                  onClose={() => setInviteModal(false)}
                  size={"md"}
                  title={"Event Link"}
    >

    <div className="mx-auto grid relative">
       <div className="flex items-center justify-center">
      <div className="flex p-2 bg-blue-200 rounded-full w-full">
        <input
          type={"button"}
          ref={textAreaRef}
          className="bg-blue-200 w-full text-xs p-2 cursor-pointer"
          value={`${url}/do/share/${inviteLink}`}
          readOnly
          onClick={()=>copyToClipboard(`${url}/do/share/${inviteLink}`)}
        />
      </div>
    </div>
    </div>

    </Modal>
    {/*<PricingModal pricingModal={true} />*/}
    </div>
  );
};

export default Calendar;




