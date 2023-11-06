import {useState,useEffect} from 'react'
import dayjs from 'dayjs';
import WeeklyAvailability from './avail'
import MonthChanger from './monthChanger';
import {Modal} from '@mantine/core'
import {Avail} from './availbilityconst'
import axios from 'axios'

export default function ScheduleView({timeSlots,setTimeSlots,
                                      userID,
                                      slot,setSlot,
                                      opened,setOpened,
                                      tutorId,
                                      dayIndex,setDayIndex,
                                      currentDate,setCurrentDate,
                                      slotId,setSlotId
                                    }){


  const [maxBookingWeek,setMaxBookingWeek] = useState(2)
  const [currentWeekIndex,setCurrentWeekIndex] = useState(0)
 

function handleSelectSlot(slotId, slot, dayIndex) {
  setTimeSlots((prevWeeklySlots) => {
    const updatedSlots = JSON.parse(JSON.stringify(timeSlots)); // Create a deep copy of the timeSlots array
    for (let dayIdx = 0; dayIdx < updatedSlots.length; dayIdx++) {
      for (let slotIdx = 0; slotIdx < updatedSlots[dayIdx].slots.length; slotIdx++) {
        const currentSlot = updatedSlots[dayIdx].slots[slotIdx];
        if (currentSlot._id === slotId) {
          // Toggle the selected state for the clicked slot
          currentSlot.selected = !currentSlot.selected;
        } else {
          // Deselect any other slots in the array
          currentSlot.selected = false;
        }
      }
    }
    return updatedSlots;
  });

  // Set the selected slot and other variables
  setSlotId(slotId);
  setSlot(slot);
  setDayIndex(dayIndex);
}

 async function book(slotId,date){
  
      setTimeSlots((prevWeeklySlots) => {
          const updatedSlots = [...timeSlots];
          for (const day of updatedSlots) {
            for (const slot of day.slots) {
              if (slot._id === slotId) {
                 console.log(slotId,slot._id,date)
                break;
              }
            }
          }
          return updatedSlots;
      });
  }





	return(
		  <div>
            <div className="h-[60vh] overflow-y-auto">
            <MonthChanger 
                      currentWeekIndex={currentWeekIndex} 
                      dayIndex={dayIndex} 
                      setCurrentWeekIndex={setCurrentWeekIndex} 
                      currentDate={currentDate} 
                      setCurrentDate={setCurrentDate}/>
            <WeeklyAvailability 
                       currentDate={currentDate} 
                       timeSlots={timeSlots} 
                       setCurrentWeekIndex={setCurrentWeekIndex} 
                       maxBookingWeek={maxBookingWeek} 
                       currentWeekIndex={currentWeekIndex} 
                       handleSelectSlot={handleSelectSlot}/>
            </div>

             {/*<div>
               slotId:{slotId}
               {currentDate.add(dayIndex+1,'day').toString()}
             </div>*/}
            {/* <button onClick={()=>book(slotId,currentDate.add(dayIndex+1,'day').toString())} className="p-2 bg-blue-500 text-sm text-white rounded-lg">
                      Confirm Time
            </button>*/}
		  </div>
		)
}


    // <Modal
    //         opened={opened}
    //         onClose={()=>setOpened(false)}
    //         centered
    //         size={"xl"}
    //         height={400}
    //         >

    // </Modal>
