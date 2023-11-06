import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import {Modal} from '@mantine/core'
import moment from 'moment'
import rrulePlugin from '@fullcalendar/rrule';
import { Select } from '@mantine/core';
import DefaultSections from './defaultSection'
import DefaultTime from './defaultTime'
import DefaultRecurring from './defaultRecurring'
import DefaultMedicineType from './defaultMedicineType'
import {defFoodQty,defMedicineQty} from './defaultQty'
import { Switch } from '@mantine/core';
import { Tabs } from '@mantine/core';
import { useRouter } from 'next/router'
import axios from 'axios'
import { nanoid } from 'nanoid'


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

 
  const [section,setSection] = useState(null)
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


  const [mulEvents,setMulEvents] = useState([])



  const router = useRouter() 

  

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
  },[router.query.id])

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
    // setInfo({...info,[e.target.name]:e.target.value})
 }

 // function handleChangeContent(e){
 //   setContentList([e.target.name]:e.target.value})
 // }

async function createRem(){
  
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
        color: 'orange',   // an option!
        textColor: 'black'
     }

    setOpenRemModal(false)
     
try {
      await axios.post(`/api/dogevents/create/${router.query.id}`,newEvent,{
            credentials: 'include'
      }).then(res=>{
          console.log(res)
      })
      // setEvents([...events, newEvent]);
      getEvents()
      setSelectedSection("all")
      setContentList([]) 
      setSelectedRem("")
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
    setSelectedSection("all")
    setEventInfo(info)
    setSelectedDate(info)
    setRecurringUntill(info.endStr)
  };


  const createModalEvent =()=>{
     setOpenRemModal(true)
     setIsEditingEvents(false)
     setContentList([])

  }

  const handleTiming = (timing) =>{
     setTiming(timing)
  }
  

  const editEvent = (event) =>{
     setIsEditingEvents(true)
     setOpenRemModal(true)
     console.log(event)
     // setCurrentEvent(event)
     setSelectedTime(event.c_time)
     setSection(event.c_section)
     setSelectedRem(event.c_rem)
     setContentList(event.content)
     setEventEditingID(event._id)
     setPhoneNumbers(event.allowednumbers)
  }
  
  const deleteEvent = (id) =>{
    
  }

  const handleRecurring = (e) =>{

  }
  
  const handleDate = (event)=>{
  
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
    
    setOpenRemModal(false)
     
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
     
       getEvents()
       setSelectedSection("all")
       setContentList([]) 
       setSelectedRem("")
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
    setSelectedRem("")
    setOpenRemModal(false)
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



console.log(info)


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


  return (
    <div className="flex flex-col md:flex-row gap-2 bg-amber-700 rounded-md shadow-md">
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
     <div className="w-full md:w-4/12 p-5 rounded-md shadow-md h-96 md:h-full">
    
     <div className="flex justify-between text-white py-5">
     
     <div>
       <h1 className="font-bold">Events</h1>
       <div>
          {`${moment(selectedDate.startStr).format('DD/MM/YYYY')} - ${moment(selectedDate.endStr).format('DD/MM/YYYY')} `}
       </div>
     </div>


     <div className="w-8 h-8 hover:cursor-pointer shadow-md  hover:scale-110 hover:bg-gray-100 bg-white rounded-full text-black flex justify-center items-center" onClick={()=>{createModalEvent()}}>&#x2b;</div>
    
     </div>


    {

     events && events.filter((m)=>dateCheck(m.start,m.end,selectedDate.start)).length > 0 ?
      <Tabs variant="outline" value={selectedSection}>
      <Tabs.List >
        <Tabs.Tab onClick={()=>setSelectedSection("all")} value={"all"}><span className="text-white">All</span></Tabs.Tab>
             {events && Object.values(events.reduce((acc, event) => {
        if (dateCheck(event.start, event.end, selectedDate.start)) {
          if (!acc[event.c_section]) {
            acc[event.c_section] = (
              <Tabs.Tab
                key={event.c_section}
                onClick={() => setSelectedSection(event.c_section)}
                value={event.c_section}
              >
                <span className="text-white">{event.c_section}</span>
              </Tabs.Tab>
            );
          }
        }
        return acc;
      }, {}))}
        
      </Tabs.List>
       <Tabs.Panel value={"all"} pt="xs">      

                       <div className="flex flex-wrap gap-2 text-xs">
                         <button onClick={()=>handleTiming("morning")} className={`px-4 py-1  rounded-md  hover:scale-105 hover:bg-amber-500 shadow-md ${timing === "morning" ? "bg-amber-800 text-white":"bg-amber-200" }`}>Morning</button>
                         <button onClick={()=>handleTiming("afternoon")} className={`px-4 py-1  rounded-md hover:scale-105 hover:bg-amber-500  shadow-md ${timing === "afternoon" ? "bg-amber-800 text-white":"bg-amber-200" }`}>Afternoon</button>
                         <button onClick={()=>handleTiming("night")} className={`px-4 py-1  rounded-md  hover:scale-105 hover:bg-amber-500 shadow-md ${timing === "night" ? "bg-amber-800 text-white":"bg-amber-200" }`}>Night</button>
                      </div>       
               
                      <div className="grid grid-cols-9 text-white">
                        <span className="p-2  text-xs font-bold col-span-3">What</span>
                        <span className="p-2  text-xs font-bold col-span-3">How</span>
                        <span className="p-2  text-xs font-bold col-span-1">When</span>
                        <span className="p-2  text-xs font-bold col-span-1">Type</span>
                        <span className="p-2  text-xs font-bold col-span-1">Qty.</span>
                      </div>
                      <div className="grid gap-2">
                      {
                   events && events.filter((m)=>dateCheck(m.start,m.end,selectedDate.start)).filter((k,i)=>k.c_time === timing).map((m,i)=>{
                        return (

                          m.content.map((c,ind)=>{
                            return(
                            <div key={ind} className="grid grid-cols-9 bg-amber-400 rounded-md cursor-pointer hover:scale-105 hover:bg-amber-500" onClick={()=>editEvent(m)}>
                              <span className="p-2  text-xs col-span-3">{c.what}</span>
                              <span className="p-2  text-xs col-span-3">{c.how}</span>
                              <span className="p-2  text-xs col-span-1 justify-items-center items-center grid">{c.rem ? c.rem : "N/R"}</span>
                              <span className="p-2  text-xs col-span-1 justify-items-center items-center grid">{c.type}</span>
                              <span className="p-2  text-xs col-span-1 justify-items-center items-center grid">{c.qty}</span>
                           </div>
                              )
                          })
                          )
                      })
                      }
                      </div>
       </Tabs.Panel>
      {
         events && Object.values(events.reduce((acc, event) => {
        if (dateCheck(event.start, event.end, selectedDate.start)) {
          if (!acc[event.c_section]) {
            acc[event.c_section] = (
                   <Tabs.Panel value={event.c_section} pt="xs">
                      <div className="flex flex-wrap gap-2 text-xs">
                         <button onClick={()=>handleTiming("morning")} className={`px-4 py-1  rounded-md shadow-md ${timing === "morning" ? "bg-amber-800 text-white":"bg-amber-200" }`}>Morning</button>
                         <button onClick={()=>handleTiming("afternoon")} className={`px-4 py-1  rounded-md shadow-md ${timing === "afternoon" ? "bg-amber-800 text-white":"bg-amber-200" }`}>Afternoon</button>
                         <button onClick={()=>handleTiming("night")} className={`px-4 py-1  rounded-md shadow-md ${timing === "night" ? "bg-amber-800 text-white":"bg-amber-200" }`}>Night</button>
                      </div>
                    
                      <div className="grid grid-cols-9 text-white">
                        <span className="p-2  text-xs font-bold col-span-3">What</span>
                        <span className="p-2  text-xs font-bold col-span-3">How</span>
                        <span className="p-2  text-xs font-bold col-span-1">When</span>
                        <span className="p-2  text-xs font-bold col-span-1">Type</span>
                        <span className="p-2  text-xs font-bold col-span-1">Qty.</span>
                      </div>
                      <div className="grid gap-2">

                      {
                     events && events.filter((m)=>dateCheck(m.start,m.end,selectedDate.start)).filter((s,i)=>s.c_section ===selectedSection).filter((k,i)=>k.c_time === timing).map((m,i)=>{
                        return (
                     m.content.map((c,ind)=>{
                            return(
                            <div key={ind} className="grid grid-cols-9 bg-amber-400 rounded-md cursor-pointer hover:scale-105 hover:bg-amber-500" onClick={()=>editEvent(m)}>
                              <span className="p-2  text-xs col-span-3">{c.what}</span>
                              <span className="p-2  text-xs col-span-3">{c.how}</span>
                              <span className="p-2  text-xs col-span-1 justify-items-center items-center grid">{c.rem ? c.rem : "N/R"}</span>
                              <span className="p-2  text-xs col-span-1 justify-items-center items-center grid">{c.type}</span>
                              <span className="p-2  text-xs col-span-1 justify-items-center items-center grid">{c.qty}</span>
                           </div>
                              )
                          })
                          )
                      })

                      
                     
                    }
                    </div>
                   </Tabs.Panel>
               );
          }
        }
        return acc;
      }, {}))

      }
      </Tabs>        

     :
     <div className="flex h-full items-center justify-center text-white">No event found</div>
    }
      

</div>

   <Modal
                  opened={openRemModal}
                  onClose={() => setOpenRemModal(false)}
                  // title="Reminder"
                  size={"7xl"}
    >
    <div>
      
        <div>
          <p className="text-xl font-black text-amber-900">
            {/*Selected date: {moment(selectedDate).format('DD/MM/YYYY')}*/}
           {`${moment(selectedDate.startStr).format('DD/MM/YYYY')} - ${moment(selectedDate.endStr).format('DD/MM/YYYY')} `}
          </p>
         
           <div className="">

           
             <h1 className="text-xl font-bold text-amber-500">Create Reminder</h1>
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
                  size={"md"}
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
                size={"md"}
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
                <button className="text-sm p-2 rounded-md mt-2 border shadow-md flex gap-2 items-center" onClick={addMoreContent}><img src={"/assets/icons/add-circle.svg"} className="w-5" />Add Content</button>
              </div>
            <div>

            {/*when*/}
             <div className="flex items-center h-10 gap-2 mt-2">
                  <Switch checked={checked} label="Add Notification" onChange={(event) => setChecked(event.currentTarget.checked)} />
              { 
               checked ?
               <div className="flex gap-2 items-center">
                 <input className="p-1 w-32 outline outline-1 outline-gray-300 rounded-md" placeholder="" type="time" value={selectedRem} onChange={selectRem}/>                
                 <div className="font-bold relative cursor-pointer">
                    <span>[ i ]</span>
                    <span className="absolute w-32 h-20 p-2 bg-amber-100 text-xs -top-16 shadow-md">By enabling this you will get reminder in whatsapp</span>
                 </div>
               </div>
               :
               <></>
             }
            </div>


            <div className="grid gap-2 border-t mt-5">
               <label className="mt-2">Add people</label>
               <div className="flex text-sm">
                 <input onChange={handlePhonNo} placeholder="phone number" className="p-2 outline outline-1 outline-gray-300 rounded-md"/>
                 <button className="bg-amber-300 w-24 rounded-r-md" onClick={addPhoneNo}>Add</button>
               </div>
               <div className="max-w-[300px]">
                  {
                   phoneNumbers && phoneNumbers.map((n,i)=>{
                       return(
                          <div key={n.id} className="border-l-4 border-amber-500 bg-amber-200 p-2 items-center flex justify-between">
                          <div className="text-xs">{n.number}</div>
                          <button className="text-md hover:text-red-500" onClick={()=>deletePhoneNo(n.id)}>&#215;</button>
                          </div>
                       )
                    }) 
                  }
               </div>

            </div>
            </div>
              {
              !isEditingEvents ?
              <div className="mt-5"><button className="p-[7px] text-sm bg-amber-800 text-white rounded w-full" onClick={createRem}>Create</button></div>
              :
              <div className="mt-5 grid gap-2">
              <div className=""><button className="p-[7px] text-sm bg-blue-800 text-white rounded w-full" onClick={editRem}>Edit</button></div>
              <div className=""><button className="p-[7px] text-sm bg-red-500 text-white rounded w-full" onClick={deleteRem}>Delete</button></div>

              </div>
              }
           </div>

        </div>
    </div>


    </Modal>
    </div>
  );
};

export default Calendar;


      {/*recurring*/}
            {/*<div className="mt-2">
              <Select
              data={recurringData}
              placeholder="set recurring"
              nothingFound="Nothing found"
              searchable
              onChange={setRecurringTime}
            />
            </div>*/}
{/*            <div className="text-sm mt-5">
            <h1 className="py-2">Custom</h1>
      
      <Tabs defaultValue="daily">
      <Tabs.List>
        <Tabs.Tab value={"daily"}>Daily</Tabs.Tab>
        <Tabs.Tab value={"weekly"}>Weekly</Tabs.Tab>
        <Tabs.Tab value={"monthly"}>Monthly</Tabs.Tab>
        <Tabs.Tab value={"yearly"}>Yearly</Tabs.Tab>
      </Tabs.List>
       <Tabs.Panel value={"daily"} pt="xs">             
             <div className="text-sm mt-4 flex items-center gap-2">
               <label>Repeats Every</label>
               <div>
                  <input className="p-1 rounded-md w-24 border border-gray-300" type="number" value={recurringInfo.interval} name="interval" onChange={handleRecurring}/>
               </div>
               <span>Day(s)</span>
            </div>
             <div className="flex items-center gap-2 text-sm mt-4">
               <label>To :</label>
               <input className="p-1 rounded-md  border border-gray-300" type="date" value={recurringInfo.untill} name="until" onChange={handleRecurring}/>
            </div>
       </Tabs.Panel>
       <Tabs.Panel value={"weekly"} pt="xs">             
             <div className="flex items-center gap-2 text-sm mt-4">
               <label>Repeats Every</label>
               <input type="number" value={recurringInfo.interval} name="interval" onChange={handleRecurring}/>
               <span>Day</span>
            </div>
             <div className="flex items-center gap-2 text-sm mt-4">
               <label>To :</label>
               <input type="date" value={recurringInfo.untill} name="until" onChange={handleRecurring}/>
            </div>
       </Tabs.Panel>
       <Tabs.Panel value={"monthly"} pt="xs">             
             <div className="flex items-center gap-2 text-sm mt-4">
               <label>Repeats Every</label>
               <input type="number" value={recurringInfo.interval} name="interval" onChange={handleRecurring}/>
               <span>Day</span>
            </div>
             <div className="flex items-center gap-2 text-sm mt-4">
               <label>To :</label>
               <input type="date" value={recurringInfo.untill} name="until" onChange={handleRecurring}/>
            </div>
       </Tabs.Panel>
       <Tabs.Panel value={"yearly"} pt="xs">             
           <div className="flex items-center gap-2 text-sm mt-4">
               <label>Repeats Every</label>
               <input type="number" value={recurringInfo.interval} name="interval" onChange={handleRecurring}/>
               <span>Day</span>
            </div>
             <div className="flex items-center gap-2 text-sm mt-4">
               <label>To :</label>
               <input type="date" value={recurringInfo.untill} name="until" onChange={handleRecurring}/>
            </div>
       </Tabs.Panel>
      </Tabs>

            </div>*/}




