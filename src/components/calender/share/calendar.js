import React, { useState, useEffect , useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import {Modal} from '@mantine/core'
import moment from 'moment'
import rrulePlugin from '@fullcalendar/rrule';
// import { Select } from '@mantine/core';
// import DefaultSections from './defaultSection'
// import DefaultTime from './defaultTime'
// import DefaultRecurring from './defaultRecurring'
// import DefaultMedicineType from './defaultMedicineType'
// import {defFoodQty,defMedicineQty} from './defaultQty'
import { Switch } from '@mantine/core';
import { Tabs } from '@mantine/core';
import { useRouter } from 'next/router'
import axios from 'axios'
import { nanoid } from 'nanoid'
import EventPreview from '../EventPreview'
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


const Calendar = () => {
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

  // const [info,setInfo] = useState({})
  // const currentTime = "12:00:00"
  // const [sectionList,setSectionList] = useState([])
  // const [whatsappList,setWhatsappList] = useState([])
  // const [number,setNumber] = useState("")

  // const [sectionData, setSectionData] = useState(DefaultSections)
  // const [timeData, setTimeData] = useState(DefaultTime)
  // const [recurringData, setRecurringData] = useState(DefaultRecurring)
  // const [medicineTypeData, setMedicineTypeData] = useState(DefaultMedicineType)
  // const [qtyData, setQtyData] = useState([])

 
  // const [section,setSection] = useState(null)
  // const [checked, setChecked] = useState(false);
  // const [hasReminder,setHasReminder] = useState(false)
  // const [recurringTime,setRecurringTime] = useState(null)
  const [eventInfo,setEventInfo] = useState({})
  const [recurringUntill,setRecurringUntill] = useState(null)
  const [timing,setTiming] = useState("morning")
  // const [recurringInfo,setRecurringInfo] = useState({})

  const [startDate,setStartDate] = useState()
  const [endDate,setEndDate] = useState()
  // const [isEditingEvents,setIsEditingEvents] = useState(false)
  // const [contentList,setContentList] = useState([])
  
  // const [currentEvent,setCurrentEvent] = useState({})
  // const [eventEditingID,setEventEditingID] = useState("")
  // const [phone,setPhone] = useState({})
  // const [phoneNumbers,setPhoneNumbers] = useState([])
  // const [selectedEventID,setSelectedEventID] = useState("")
  // const [gen,setGen] = useState("")

  // const [mulEvents,setMulEvents] = useState([])

  // const otpRef = useRef(null);
  // const [otp, setOtp] = useState('');
  // const [phoneValue, setPhoneValue] = useState("")
  // const [timer, setTimer] = useState(60);
  // const [isActive, setIsActive] = useState(false);
  // const [sendCount, setSendCount] = useState(0)

  const router = useRouter() 



  

 
  useEffect(()=>{
     getEvents()
  },[router.query.id])

 async function getEvents(){
    try{
       await axios.get(`/api/dogevents/event/number/${router.query.id}`).then(res=>{
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





// async function createRem(){

//     if(!section){
//       alert("add a section")
//     }
    
//     if(!selectedTime){
//       alert("add a timing")
//     }
 

//     if(contentList.length < 1){
//       alert("add atleast one content")
//       return
//     }

//       const id = events.length + 1;
//       const newEvent = {
//         id,
//         title:section,
//         start: eventInfo.start,
//         end: eventInfo.end,
//         content:contentList,
//         c_section:section,
//         c_rem:checked ? selectedRem:null,
//         c_time:selectedTime,
//         allowednumbers:phoneNumbers,
//         color: 'orange',   // an option!
//         textColor: 'black'
//      }

//     console.log(newEvent)
//     // return


     
// try {
//       await axios.post(`/api/dogevents/create/${router.query.id}`,newEvent,{
//             credentials: 'include'
//       }).then(res=>{
//           console.log(res)
//       })
//       // setEvents([...events, newEvent]);
//       getEvents()
//       setSelectedSection("all")
//     } catch(e) {
//       alert(e && e.response && e.response.data ? e.response.data.msg : "error creating event")
//       console.log(e);
//     }
//  }

  // function onChangeWhatsapp(e){
  //   setNumber(e.target.value)
  // }
  
  // function addWhatsapp(){
  //   setWhatsappList([...whatsappList,number])
  // }

  const handleSelect = (info) => {
    setSelectedSection("all")
    setEventInfo(info)
    setSelectedDate(info)
    setRecurringUntill(info.endStr)
  };


  // const createModalEvent =()=>{
  //    setOpenRemModal(true)
  //    setIsEditingEvents(false)
  //    setContentList([])
  // }

  const handleTiming = (timing) =>{
     setTiming(timing)
  }
  

  const editEvent = (event,oneeventid) =>{
     // setIsEditingEvents(true)
     // setOpenRemModal(true)
     // console.log(event)
     // // setCurrentEvent(event)
     // setSelectedTime(event.c_time)
     // setSection(event.c_section)
     // setSelectedRem(event.c_rem)
     // setContentList(event.content)
     // setEventEditingID(event._id)
     // setSelectedEventID(oneeventid)
     // setPhoneNumbers(event.allowednumbers)
  }
  
  const deleteEvent = (id) =>{
    
  }

  const handleRecurring = (e) =>{

  }
  
  const handleDate = (event)=>{
  
  }

  // const editRem =async()=>{  
  //     // alert(eventEditingID)
  //     // return
     
  //    if(!section){
  //      alert("add a Section")
  //      return
  //    }

  //    if(!selectedTime){
  //      alert("add a timing")
  //    }

  //    if(contentList.length < 1){
  //     alert("add atleast one content")
  //     return
  //   }
    
  //   // setOpenRemModal(false)
     
  //   const newEvent = {
  //       // id:eventEditingID,
  //       title:section,       
  //       content:contentList,
  //       c_section:section,
  //       c_rem:checked ? selectedRem:null,
  //       c_time:selectedTime,
  //       allowednumbers:phoneNumbers,
  //       color: 'orange',   
  //       textColor: 'black'
  //     };
  //    try{
  //     await axios.put(`/api/dogevents/events/edit/${eventEditingID}`,newEvent,{
  //           credentials: 'include'
  //     }).then(res=>{
  //        console.log(res)
  //     })
  //      setIsEditingEvents(false)
  //      getEvents()
  //    } 
  //    catch(e){
  //     console.log(e)
  //    }
      
  // }

  // const deleteRem=async()=>{

  //   await axios.delete(`/api/dogevents/events/delete/${eventEditingID}`,{
  //           credentials: 'include'
  //     }).then(res=>{
  //        console.log(res)
  //     })
  //   getEvents()
  //   setSelectedSection("all")
  //   setContentList([]) 
  //   setIsEditingEvents(false)
  //   setSelectedRem("")
  // }


// const addMoreContent = () => {
//   setContentList((prevContentList) => [
//     ...prevContentList,
//     {id:nanoid() ,what: "", how: "" ,type:"",qty:""} // Initialize the new content with empty values
//   ]);
// };

console.log(events)
// console.log(contentList)
// const handleChangeContent = (e, id, fieldName) => {

//   console.log(id,fieldName)
//   const { value } = e.target;

//   const updateContentList = contentList.map((l,i)=>{
//     if(l.id===id){
//       return {...l,[fieldName]:value}
//     }else {
//       return {...l}
//     }
//   })

//   setContentList(updateContentList)
// };


// const deleteContent = (id) => {
//   const updateContentList = contentList.filter((l,i)=>l.id !== id)
//   setContentList(updateContentList)
// };

// const handlePhonNo = (e) =>{
//   setPhone(e.target.value)
// }
// const verifyPhoneNumber=async()=>{
//    // await axios.
// }
// const addPhoneNo = () =>{

//    setPhoneNumbers([...phoneNumbers,{id:nanoid(),number:phone}])
// }

// const deletePhoneNo = (id) =>{
//    const updateList = phoneNumbers.filter((p,i)=>p.id !==id )
//    setPhoneNumbers(updateList)
// }


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


  return (
    <div className="flex flex-col md:flex-row gap-2 bg-amber-200 rounded-md shadow-md">
    <div className="w-full md:w-8/12 p-10 ">
    
      <div className="calendar">

    <FullCalendar
      plugins={[rrulePlugin,dayGridPlugin,interactionPlugin]}
      initialView="dayGridMonth"
      events={events}
      editable={false}
      selectable={true}
      eventContent={CustomEvent}
      selectMirror={true}
      dayMaxEvents={true}
      select={handleSelect}
      dateClick={handleDate}
       datesSet={(arg) => {
         setStartDate(arg.start) //starting visible date
         setEndDate(arg.end) //ending visible date
      }}
       dayCellDidMount={(arg) => {
    // Custom rendering after the day cell is mounted
    const isCurrentDate = arg.date.toDateString() === new Date().toDateString();

    if (isCurrentDate) {
      arg.el.style.backgroundColor = '#b65100'; // Change the background color to red for the current date
      arg.el.style.color = 'white'; // Change the text color to white for the current date
    }
  }}



    />   
   </div>
    </div>    
     <div className="w-full md:w-4/12 p-5 h-96 md:h-full">
    
     <div className="flex justify-between text-black py-5">
     
     <div>
       <h1 className="font-bold">Events</h1>
       <div>
          {`${moment(selectedDate.startStr).format('DD/MM/YYYY')} - ${moment(selectedDate.endStr).format('DD/MM/YYYY')} `}
       </div>
     </div>
    
     </div>


      <EventPreview selectedSection={selectedSection} events={events} selectedDate={selectedDate} timing={timing} handleTiming={handleTiming} editEvent={editEvent} setSelectedSection={setSelectedSection}/>

      

</div>
    </div>
  );
};

export default Calendar;


