import React, { useState, useEffect , useRef } from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import { useSpring, animated } from 'react-spring';
import Tooltip from 'react-tooltip';

const FullCalendar = dynamic(() => import('./FullCalendar'), {
  ssr: false // Disable server-side rendering
});
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
import jwt from 'jsonwebtoken';

import OtpInput from 'react-verify-otp';
import '/node_modules/react-verify-otp/dist/style.css';
import dynamic from 'next/dynamic'
const PhoneInput = dynamic(() => import('react-phone-number-input'), {
    ssr: false,
});
import { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import CryptoJS from 'crypto-js'


const Calendar = ({demo}) => {
  const [events, setEvents] = useState([]);
  const [selectedEvents,setSelectedEvents] = useState([])
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [openRemModal,setOpenRemModal] = useState(false)
  const [reminderList,setReminderList] = useState([])

  const [selectedTime,setSelectedTime] = useState("morning")
  const [selectedRem,setSelectedRem] = useState("12:00")
  const [selectedMedicineType,setSelectedMedicineType] = useState("tablet")
  const [selectedQty,setSelectedQty] = useState("50gms")
  const [selectedSection,setSelectedSection] = useState("")

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

 
  const [section,setSection] = useState("medicine")
  const [checked, setChecked] = useState(false);
  const [hasReminder,setHasReminder] = useState(false)
  const [recurringTime,setRecurringTime] = useState(null)
  const [eventInfo,setEventInfo] = useState({})
  const [recurringUntill,setRecurringUntill] = useState(null)
  const [timing,setTiming] = useState("morning")
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

  const [mulEvents,setMulEvents] = useState([])

  const otpRef = useRef(null);
  const [otp, setOtp] = useState('');
  const [phoneValue, setPhoneValue] = useState("")
  const [timer, setTimer] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [sendCount, setSendCount] = useState(0) 
  const [openCreate,setOpenCreate] = useState(false)
  const [openInfo,setOpenInfo] = useState(false)
  const [showButton, setShowButton] = useState(true);
  const eventCreateRef  = useRef(null)
  const calenderRef = useRef(null);
  const [inviteLink,setInviteLink] = useState("")
  const router = useRouter() 
  const textAreaRef = useRef(null);

  const copyToClipboard = (value) => {
      navigator.clipboard.writeText(value)
  };

  console.log(FullCalendar)
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

  const [step, setStep] = useState(0);

  const handAnimation = useSpring({
    left: step === 0 ? '100px' : '300px',
    top: step === 0 ? '100px' : '200px',
  });

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };


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

    const handleChangeOtp = (otp) => {
        setOtp(otp)
    };
   
   console.log(isActive)

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
              console.log(res.data)
            })
        }catch(err){
          console.log(err)
        }
    }
   console.log(phoneValue)
   async function Save(){
       if(!isValidPhoneNumber(phoneValue)){
        alert("Invalid phoneno")
        return
      }
       try{
         await axios.post('/api/calender/number/verify',{phoneno:phoneValue,otp:otp}).then(res=>{
            console.log(res.data)
            alert(res.data.msg)
            if(res.data.verified === true){
              // setPhoneNumbers([...phoneNumbers,phoneValue]) 
               setPhoneNumbers([...phoneNumbers,{id:nanoid(),number:phoneValue}])

            }
         })
       }catch(err){
         console.log(err)
       }

   }

  

  useEffect(()=>{

    if(section === "medicine"){
      setQtyData(defMedicineQty)
    }
    if(section === "food"){
      setQtyData(defFoodQty)
    }
  },[section])
 
  useEffect(()=>{
     getEvents()
  },[])

 async function getEvents(){
    try{
       await axios.get(`/api/dogevents/events/${router.query.id}/${startDate}/${endDate}`).then(res=>{
        setEvents(res.data.events)
       })
    }catch(e){
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





async function createRem(){
    
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

      const id = events.length + 1;
      const newEvent = {
        id,
        title:section,
        start: eventInfo.start,
        end: eventInfo.end,
        content:contentList,
        c_section:section,
        c_rem:checked ? selectedRem:null,
        c_time:selectedTime,
        allowednumbers:phoneNumbers,
        color: setColor(section),   // an option!
        textColor: 'black'
     }

    console.log(newEvent)
    // return


  function setColor(section){
      if(section === "medicine"){
        return "skyblue"
      }else if (section==="food") {
        return "#90EE90"
      }else if (section === "training") {
        return "yellow"
      }else if (section === "vetvisit") {
        return "purpule"
      }else if (section === "holiday"){
        return "red"
      }else if(section === "boarding"){
        return "pink"
      }else {
        return "gray"
      }
  }

     
try {
      await axios.post(`/api/dogevents/create/${router.query.id}`,newEvent,{
            credentials: 'include'
      }).then(res=>{
          console.log(res)
      })
      // setEvents([...events, newEvent]);
      getEvents()
      setSelectedSection("all")
    } catch(e) {
      alert(e && e.response && e.response.data ? e.response.data.msg : "error creating event")
      console.log(e);
    }
 }

  function onChangeWhatsapp(e){
    setNumber(e.target.value)
  }
  
  function addWhatsapp(){
    setWhatsappList([...whatsappList,number])
  }

  const handleSelect = (info) => {
    // scrollToEventCreateButton()

    setSelectedSection("all")
    setEventInfo(info)
    setOpenCreate(false)
    setSelectedDate(info)
    setRecurringUntill(info.endStr)
    setOpenCreate(true)
    setIsEditingEvents(false)
    setContentList([])
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
   
     setIsEditingEvents(true)
     // setOpenRemModal(true)
     setOpenCreate(true)
     console.log(event)
     // setCurrentEvent(event)
     setSelectedTime(event.c_time)
     setSection(event.c_section)
     setSelectedRem(event.c_rem)
     setContentList(event.content)
     setEventEditingID(event._id)
     setSelectedEventID(oneeventid)
     setPhoneNumbers(event.allowednumbers)
  }
  
  const deleteEvent = (id) =>{
    
  }

  const handleRecurring = (e) =>{

  }
  
  const handleDate = (event)=>{
    if(window.innerWidth < "1020"){
     scrollToEventCreateButton()
    }
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
    
    // setOpenRemModal(false)
     
    const newEvent = {
        // id:eventEditingID,
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
         console.log(res)
      })
       setIsEditingEvents(false)
       getEvents()
     } 
     catch(e){
      console.log(e)
     }
      
  }

  const deleteRem=async()=>{

    await axios.delete(`/api/dogevents/events/delete/${eventEditingID}`,{
            credentials: 'include'
      }).then(res=>{
         console.log(res)
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
console.log(contentList)
const handleChangeContent = (e, id, fieldName) => {

  console.log(id,fieldName)
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


  function dateCheck(from,to,check) {

    var fDate,lDate,cDate;
    fDate = Date.parse(from);
    lDate = Date.parse(to);
    cDate = Date.parse(check);

    if((cDate < lDate && cDate >= fDate)) {
        return true;
    }
    return false;
}

   function CustomEvent(props) {
  return (
    <div className="flex text-xs gap-2">
      <span>{props.event._def.extendedProps.c_rem ? props.event._def.extendedProps.c_rem : "N/R" }</span>
      <strong>{props.event.title}</strong>
    </div>
  );
}
function ActiveCreateWidow(){
}

  return (
    <div className="flex flex-col  lg:flex-row gap-2 bg-amber-200 rounded-md shadow-md p-2">
  {/*<button onClick={scrollToEventCreateButton} className="p-2 bg-red-300 z-50">hello</button>*/}
<animated.div className="hand-logo" style={handAnimation} />
<button onClick={prevStep} disabled={step === 0}>Previous</button>
<button onClick={nextStep} disabled={step === 2}>Next</button>
{step === 0 && (
        <Tooltip id="tooltip-step-0" place="right" effect="solid">
          Instruction for step 0
        </Tooltip>
      )}

{step === 1 && (
        <Tooltip id="tooltip-step-1" place="bottom" effect="solid">
          Instruction for step 1
        </Tooltip>
      )}

      {step === 2 && (
        <Tooltip id="tooltip-step-2" place="left" effect="solid">
          Instruction for step 2
        </Tooltip>
      )}
    <div className="w-full lg:w-8/12 lg:p-10">
      {/*<button onClick={scrollToCalendar} >Scroll to Component</button>*/}
      {showButton && (
        <button className="fixed p-2 text-white bottom-5 right-5 z-50" onClick={scrollToCalendar}><img className="w-8" src="/assets/icons/calendar/calendae.svg"/></button>
      )}
      <div className="calendar" ref={calenderRef}>

    <FullCalendar
      events={events}
      handleEventClick={handleEventClick}
      CustomEvent={CustomEvent}
      handleSelect={handleSelect}
      handleDate={handleDate}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
    />   
   </div>
    </div>   
   
     <div className="w-full lg:w-4/12 p-5 h-[730px] relative rounded-md">
    
     <div className="text-white py-5">
     
     <div className="text-gray-700">
       <h1 className="font-bold text-2xl">Events</h1>
       <div className="font-semibold">
          {`${moment(selectedDate.startStr).format('DD/MM/YYYY')} - ${moment(selectedDate.endStr).format('DD/MM/YYYY')} `}
       </div>
     </div>

    
    {/*onClick={ActiveCreateWidow} */}
     </div>


      <EventPreview selectedSection={selectedSection} events={events} selectedDate={selectedDate} timing={timing} handleTiming={handleTiming} editEvent={editEvent} setSelectedSection={setSelectedSection}/>

 <div className="cursor-pointer" ref={eventCreateRef}>
        <button className="w-10 h-10 bg-amber-900 absolute rounded-full text-4xl text-white  bottom-5 right-0 lg:right-5" onClick={()=>{createModalEvent()}}>+</button>
 </div>
    
 <div className="flex justify-center">
 <div className={`${openCreate ? "":"hidden"} text-xs absolute bottom-20 h-[500px] xs:right-5  overflow-y-auto bg-white shadow-md p-5 rounded-md z-50 max-w-xs`}>
          <div className="flex flex-col h-full justify-between">
           <div className="">
             {/*<h1 className="text-xl font-bold text-amber-500">Create Reminder</h1>*/}
                  <div className="text-amber-700 font-bold text-xl">
                  {`${moment(selectedDate.startStr).format('DD/MM/YYYY')} - ${moment(selectedDate.endStr).format('DD/MM/YYYY')}`}
                  </div>
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
                    <input value={m.what} className="p-[7px] w-full text-sm  outline outline-1 outline-gray-300 rounded" placeholder="what" onChange={(e)=>handleChangeContent(e,m.id,"what")} name={`what`} />
                 </div>
              </div>

              {
                section === "medicine" ?
                <div>
                <Select
                data={medicineTypeData}
                placeholder="set medicine type"
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
                section === "medicine" || section === "food" ?

             <div>
              <Select
              data={qtyData}
              placeholder="set qty"
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
                    <input value={m.how} className="p-[7px] w-full   text-sm outline outline-1 outline-gray-300 rounded" placeholder="how" onChange={(e)=>handleChangeContent(e,m.id,"how")} name={`how`}/>
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
                <button id="add_more_content_button" className="text-xs p-2 rounded-full mt-2 bg-white shadow-md flex gap-2 items-center" onClick={addMoreContent}><img src={"/assets/icons/add-circle.svg"} className="w-5" /></button>
              </div>
            <div>

            {/*when*/}
             <div id="notification_button" className="flex flex-col h-10 gap-2 mt-4">
                  <Switch checked={checked} size="xs" label="Add Notification" onChange={(event) => setChecked(event.currentTarget.checked)} />
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
                  By enabling this you will get reminder in whatsapp
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
                    <button id="message_preview_button" className="text-xs p-2 rounded-full mt-2 bg-blue-500 shadow-md flex gap-2 items-center text-white"><img src={"/assets/icons/calendar/preview.svg"} className="w-3" />Preview</button>
                </Popover.Target>
                <Popover.Dropdown>
                          <div className="w-60 rounded-md p-2 text-sm">
                <h1 className="font-bold">🐕 DogSwag 🐕</h1>
                <div className="flex flex-col">
                 <div>{`Pet Name - ${"Max"}`}</div>
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
                         <button className="bg-[brown] text-white  py-1 w-28 rounded-md" onClick={Save}>Save</button>
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

             <div className="pb-5">
              {
              !isEditingEvents ?
              <div className="mt-2"><button id="create_event_button" className="p-[7px] text-sm bg-amber-400 rounded-full text-black w-full" onClick={createRem}>Create</button></div>
              :
              <div className="mt-2 grid gap-2">
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
    </div>
  );
};

export default Calendar;




