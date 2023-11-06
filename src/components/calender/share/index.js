import Calendar from './calendar'
import Pricing from '../pricing'
import {useState} from 'react'
import EventPreview from '../EventPreview'
import axios from 'axios'
import {useRouter} from 'next/router'
import { Tabs } from '@mantine/core';
import moment from 'moment'

const Index = ({userdata,eventdata}) => {
  // console.log(dogprofiledata)

  const [events,setEvents] = useState( eventdata && eventdata.events ? eventdata.events :[])
  const [timing , setTiming] = useState("Morning")
  const [selectedSection,setSelectedSection] = useState("")

  const router = useRouter()

  console.log(events)
  const handleTiming = (timing) =>{
     setTiming(timing)
  }


  return (
  <div className="text-white p-5">
      <Tabs variant="outline" value={"all"}>
      <Tabs.List >
        <Tabs.Tab onClick={()=>setSelectedSection("all")} value={"all"}><span className=" ">All</span></Tabs.Tab>
             {events && Object.values(events.reduce((acc, event) => {
          if (!acc[event.c_section]) {
            acc[event.c_section] = (
              <Tabs.Tab
                key={event.c_section}
                onClick={() => setSelectedSection(event.c_section)}
                value={event.c_section}
              >
                <span className="">{event.c_section}</span>
              </Tabs.Tab>
            );
          }
        return acc;
      }, {}))}
        
      </Tabs.List>
       <Tabs.Panel value={"all"} pt="xs">      

                       <div className="flex flex-wrap gap-2 text-xs">
                         <button onClick={()=>handleTiming("Morning")} className={`px-4 py-1  rounded-md  hover:scale-105 hover:bg-amber-500 shadow-md ${timing === "morning" ? "bg-amber-800 text-white":"bg-amber-600" }`}>Morning</button>
                         <button onClick={()=>handleTiming("Afternoon")} className={`px-4 py-1  rounded-md hover:scale-105 hover:bg-amber-500  shadow-md ${timing === "afternoon" ? "bg-amber-800 text-white":"bg-amber-600" }`}>Afternoon</button>
                         <button onClick={()=>handleTiming("Night")} className={`px-4 py-1  rounded-md  hover:scale-105 hover:bg-amber-500 shadow-md ${timing === "night" ? "bg-amber-800 text-white":"bg-amber-600" }`}>Night</button>
                      </div>       
               
                      <div className="grid grid-cols-9 text-black">
                        <span className="p-2  text-xs font-bold col-span-3">What</span>
                        <span className="p-2  text-xs font-bold col-span-3">How</span>
                        <span className="p-2  text-xs font-bold col-span-1">When</span>
                        <span className="p-2  text-xs font-bold col-span-1">Type</span>
                        <span className="p-2  text-xs font-bold col-span-1">Qty.</span>
                      </div>
                      <div className="grid gap-2">
                      {
                   events && events.filter((k,i)=>k.c_time === timing).map((m,i)=>{
                        return (

                          m.content.map((c,ind)=>{
                            return(
                            <div key={ind} style={{ backgroundColor: `${m.color}` }} className={`grid grid-cols-9 bg-amber-800 text-white  rounded-md cursor-pointer hover:scale-105 hover:bg-amber-500`} onClick={()=>editEvent(m,c._id)}>
                              <span className="p-2  text-xs col-span-3">{c.what}</span>
                              <span className="p-2  text-xs col-span-3">{c.how}</span>
                              <span className="p-2  text-xs col-span-1 justify-items-center items-center grid">{m.c_rem ? m.c_rem : "N/R"}</span>
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
          if (!acc[event.c_section]) {
            acc[event.c_section] = (
                   <Tabs.Panel value={event.c_section} pt="xs">
                      <div className="flex flex-wrap gap-2 text-xs">
                         <button onClick={()=>handleTiming("Morning")} className={`px-4 py-1  rounded-md shadow-md ${timing === "morning" ? "bg-amber-800 text-white text-white":"bg-amber-600" }`}>Morning</button>
                         <button onClick={()=>handleTiming("Afternoon")} className={`px-4 py-1  rounded-md shadow-md ${timing === "afternoon" ? "bg-amber-800 text-white":"bg-amber-600" }`}>Afternoon</button>
                         <button onClick={()=>handleTiming("Night")} className={`px-4 py-1  rounded-md shadow-md ${timing === "night" ? "bg-amber-800 text-white":"bg-amber-600" }`}>Night</button>
                      </div>
                    
                      <div className="grid grid-cols-9 text-black">
                        <span className="p-2  text-xs font-bold col-span-3">What</span>
                        <span className="p-2  text-xs font-bold col-span-3">How</span>
                        <span className="p-2  text-xs font-bold col-span-1">When</span>
                        <span className="p-2  text-xs font-bold col-span-1">Type</span>
                        <span className="p-2  text-xs font-bold col-span-1">Qty.</span>
                      </div>
                      <div className="grid gap-2">

                      {
                     events && events.filter((s,i)=>s.c_section ===selectedSection).filter((k,i)=>k.c_time === timing).map((m,i)=>{
                        return (
                     m.content.map((c,ind)=>{
                            return(
                            <div key={ind} style={{ backgroundColor: `${m.color}` }} className={`grid grid-cols-9 bg-amber-800 text-white  rounded-md cursor-pointer hover:scale-105 hover:bg-amber-500`} >                          
                              <span className="p-2  text-xs col-span-3">{c.what}</span>
                              <span className="p-2  text-xs col-span-3">{c.how}</span>
                              <span className="p-2  text-xs col-span-1 justify-items-center items-center grid">{m.c_rem ? m.c_rem : "N/R"}</span>
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
        return acc;
      }, {}))

      }
      </Tabs>        

    </div>
   )
};

export default Index;


