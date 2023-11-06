import { Tabs } from '@mantine/core';
import moment from 'moment'
import { Popover } from '@mantine/core';

export default function EventPreview({selectedEventID,events,selectedDate,timing,handleTiming,editEvent,selectedSection,setSelectedSection}){


function dateCheck(from, to, check) {
  const fromDate = moment(from);
  const toDate = moment(to).subtract(1, 'day');
  const checkDate = moment(check);

  return checkDate.isBetween(fromDate, toDate, null, '[]');
}



	return(
	    <div className="text-white">

       <Popover width={400} position="bottom" withArrow shadow="md">
                <Popover.Target>
                    <button className="text-black text-end w-full">[ i ]</button>
                </Popover.Target>
                <Popover.Dropdown>
                  <li className="flex gap-2 items-start text-gray-600 text-sm mt-5"><img src="/calender.svg" className="w-6"/> {`DogSwag Organizer - Never miss your dog's schedule, whether it is Food, Medicine, Vet Visit, Walking, Diary, etc `}</li>
    <li className="flex gap-2 items-start text-gray-600 text-sm mt-5"><img src="/plus.svg" className="w-5"/> Click and Add important schedules of your dog</li>
    <li className="flex gap-2 items-start text-gray-600 text-sm mt-5"><img src="/phone.svg" className="w-5"/> You can set reminders for up to 3 numbers </li>
    <li className="flex gap-2 items-start text-gray-600 text-sm mt-5"><img src="/smile.svg" className="w-5"/> It is FREE for 60 days</li>
    <li className="flex gap-2 items-start text-gray-600 text-sm mt-5"><img src="/secure.svg" className="w-5"/> The DogSwag Organizer is End to End Encrypted and safe</li>
    <li className="flex gap-2 items-center text-gray-600 text-sm mt-5"><img src="/thumbs-up.svg" className="w-5"/> Works great on Mobile</li>
                  {/*<p className="text-red-500">{"Ensure the notified user has not activated DND. Messages don't go to DND users."}</p>*/}
                </Popover.Dropdown>
              </Popover>


    {

     events && events.filter((m)=>dateCheck(m.start,m.end,selectedDate.start)).length > 0 ?
      <Tabs variant="outline" value={selectedSection}>
      <Tabs.List >
        <Tabs.Tab onClick={()=>setSelectedSection("all")} value={"all"}><span className=" ">All</span></Tabs.Tab>
             {events && Object.values(events.reduce((acc, event) => {
        if (dateCheck(event.start, event.end, selectedDate.start)) {
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
        }
        return acc;
      }, {}))}
        
      </Tabs.List>
       <Tabs.Panel value={"all"} pt="xs">      
<div className=" mt-5">
                       <div className="flex flex-wrap gap-2 text-xs ">
                         <button onClick={()=>handleTiming("Morning")} className={`px-4 py-1  rounded-md  hover:scale-105 hover:bg-amber-500 shadow-md ${timing === "morning" ? "bg-amber-800 text-white":"bg-amber-600" }`}>Morning</button>
                         <button onClick={()=>handleTiming("Afternoon")} className={`px-4 py-1  rounded-md hover:scale-105 hover:bg-amber-500  shadow-md ${timing === "afternoon" ? "bg-amber-800 text-white":"bg-amber-600" }`}>Afternoon</button>
                         <button onClick={()=>handleTiming("Night")} className={`px-4 py-1  rounded-md  hover:scale-105 hover:bg-amber-500 shadow-md ${timing === "night" ? "bg-amber-800 text-white":"bg-amber-600" }`}>Night</button>
                      </div>       
               
                      <div className="flex justify-center text-black">
                        <span className="p-2  text-xs w-[60px] md:w-[80px] font-bold justify-items-center grid border">What</span>
                        <span className="p-2  text-xs w-[60px] md:w-[80px] font-bold justify-items-center grid border">How</span>
                        <span className="p-2  text-xs w-[60px] md:w-[80px] font-bold justify-items-center grid border">When</span>
                        <span className="p-2  text-xs w-[60px] md:w-[80px] font-bold justify-items-center grid border">Type</span>
                        <span className="p-2  text-xs w-[60px] md:w-[80px] font-bold justify-items-center grid border">Qty.</span>
                      </div>
                      <div className="grid gap-2">
                      {
                   events && events.filter((m)=>dateCheck(m.start,m.end,selectedDate.start)).filter((k,i)=>k.c_time === timing).map((m,i)=>{
                        return (

                          m.content.map((c,ind)=>{
                            return(
                            <div key={ind} style={{ backgroundColor: `${m.color}` }} className={`flex justify-center ${selectedEventID === c._id ? "bg-amber-800 text-white":"bg-white text-black"}  rounded-md cursor-pointer hover:scale-105 hover:bg-amber-500`} onClick={()=>editEvent(m,c._id)}>
                              <span className="p-2  text-xs w-[60px] md:w-[80px] justify-items-center grid">{c.what}</span>
                              <span className="p-2  text-xs w-[60px] md:w-[80px] justify-items-center grid">{c.how}</span>
                              <span className="p-2  text-xs w-[60px] md:w-[80px] justify-items-center grid">{m.c_rem ? m.c_rem : "N/R"}</span>
                              <span className="p-2  text-xs w-[60px] md:w-[80px] justify-items-center grid">{c.type}</span>
                              <span className="p-2  text-xs w-[60px] md:w-[80px] justify-items-center grid">{c.qty}</span>
                           </div>
                              )
                          })
                          )
                      })
                      }
                      </div>
                      </div>
       </Tabs.Panel>
      {
         events && Object.values(events.reduce((acc, event) => {
        if (dateCheck(event.start, event.end, selectedDate.start)) {
          if (!acc[event.c_section]) {
            acc[event.c_section] = (
                   <Tabs.Panel value={event.c_section} pt="sm" >
                     <div className=" mt-5">
                      <div className="flex flex-wrap gap-2 text-xs">
                         <button onClick={()=>handleTiming("Morning")} className={`px-4 py-1  rounded-md shadow-md ${timing === "morning" ? "bg-amber-800 text-white text-white":"bg-amber-600" }`}>Morning</button>
                         <button onClick={()=>handleTiming("Afternoon")} className={`px-4 py-1  rounded-md shadow-md ${timing === "afternoon" ? "bg-amber-800 text-white":"bg-amber-600" }`}>Afternoon</button>
                         <button onClick={()=>handleTiming("Night")} className={`px-4 py-1  rounded-md shadow-md ${timing === "night" ? "bg-amber-800 text-white":"bg-amber-600" }`}>Night</button>
                      </div>
                    
                      <div className="flex justify-center text-black">
                        <span className="p-2  text-xs w-[60px] md:w-[80px] font-bold justify-items-center grid border">What</span>
                        <span className="p-2  text-xs w-[60px] md:w-[80px] font-bold justify-items-center grid border">How</span>
                        <span className="p-2  text-xs w-[60px] md:w-[80px] font-bold justify-items-center grid border">When</span>
                        <span className="p-2  text-xs w-[60px] md:w-[80px] font-bold justify-items-center grid border">Type</span>
                        <span className="p-2  text-xs w-[60px] md:w-[80px] font-bold justify-items-center grid border">Qty.</span>
                      </div>
                      <div className="grid gap-2">

                      {
                     events && events.filter((m)=>dateCheck(m.start,m.end,selectedDate.start)).filter((s,i)=>s.c_section ===selectedSection).filter((k,i)=>k.c_time === timing).map((m,i)=>{
                        return (
                     m.content.map((c,ind)=>{
                            return(
                            <div key={ind} style={{ backgroundColor: `${m.color}` }} className={`flex justify-center ${selectedEventID === c._id ? "bg-amber-800 text-white":"bg-white text-black"}  rounded-md cursor-pointer hover:scale-105 hover:bg-amber-500`} onClick={()=>editEvent(m)}>                          
                              <span className="p-2  text-xs w-[60px] md:w-[80px] justify-items-center grid">{c.what}</span>
                              <span className="p-2  text-xs w-[60px] md:w-[80px] justify-items-center grid">{c.how}</span>
                              <span className="p-2  text-xs w-[60px] md:w-[80px] justify-items-center grid">{m.c_rem ? m.c_rem : "N/R"}</span>
                              <span className="p-2  text-xs w-[60px] md:w-[80px] justify-items-center grid">{c.type}</span>
                              <span className="p-2  text-xs w-[60px] md:w-[80px] justify-items-center grid">{c.qty}</span>
                           </div>
                              )
                          })
                          )
                      })

                      
                     
                    }
                    </div>
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
     <div className="flex h-full items-center justify-center text-gray-700 text-xl font-bold"></div>
    }
    </div>
	)
}