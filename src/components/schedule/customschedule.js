import React, { useState ,useEffect} from 'react';
// import { DatePicker } from '@mantine/dates';
// import Repeat from './repeat'
import {nanoid} from 'nanoid'
// import Tu_Button from '@/components/ui/button'
import axios from 'axios'
import {toast,Toaster} from 'react-hot-toast'



const times = ['06:00','06:15','06:30','06:45']
export default function Schedule() {
  const [value, setValue] = useState([null, null]);
  const [date, setDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState([]);

  const [selectedDays, setSelectedDays] = useState([]);

// console.log(selectedDays)

    function handleDaySelect(dayIndex) {
      if (selectedDays.includes(dayIndex)) {
        // Day is already selected, so remove it from the selected days
        setSelectedDays(selectedDays.filter((day) => day !== dayIndex));
        // Remove all slots for the unselected day
        removeTimeSlots(dayIndex);
      } else {
        // Day is not selected, so add it to the selected days
        setSelectedDays([...selectedDays, dayIndex]);
        // Add an initial slot for the selected day
        addInitialTimeSlot(dayIndex);
      }
    }

    function addInitialTimeSlot(dayIndex) {
      const updatedTimeSlots = [...timeSlots];
      updatedTimeSlots[dayIndex].slots = [{ slotId:nanoid(),start: '06:00', end: '06:30'}];
      setTimeSlots(updatedTimeSlots);
    }

    function removeTimeSlots(dayIndex) {
      const updatedTimeSlots = [...timeSlots];
      updatedTimeSlots[dayIndex].slots = [];
      setTimeSlots(updatedTimeSlots);
    }

    
function addTimeSlot(dayIndex) {
  if (selectedDays.includes(dayIndex)) {
    const updatedTimeSlots = [...timeSlots];
    const previousSlot = updatedTimeSlots[dayIndex].slots.slice(-1)[0];

    if (previousSlot) {
      const [prevHour, prevMinute] = previousSlot.end.split(':').map(Number);
      let newHour = prevHour;
      let newMinute = prevMinute + 30;

      if (newMinute >= 60) {
        newHour += 1;
        newMinute -= 60;
      }

      const newStartTime = `${prevHour.toString().padStart(2, '0')}:${prevMinute.toString().padStart(2, '0')}`;
      const newEndTime = `${newHour.toString().padStart(2, '0')}:${newMinute.toString().padStart(2, '0')}`;
      updatedTimeSlots[dayIndex].slots.push({ slotId: nanoid(), start: newStartTime, end: newEndTime });
    } else {
      updatedTimeSlots[dayIndex].slots.push({ slotId: nanoid(), start: '06:00', end: '06:30' });
    }

    setTimeSlots(updatedTimeSlots);
  }
}



  function deleteTimeSlot(dayIndex, slotIndex) {
    if (selectedDays.includes(dayIndex)) {
      const updatedTimeSlots = [...timeSlots];
      updatedTimeSlots[dayIndex].slots.splice(slotIndex, 1);
      setTimeSlots(updatedTimeSlots);
    }
  }

  function handleTimeChange(dayIndex, slotIndex, field, value) {
    const updatedTimeSlots = [...timeSlots];
    updatedTimeSlots[dayIndex].slots[slotIndex][field] = value;
    setTimeSlots(updatedTimeSlots);
  }

 async function getAvail(){
   try{
      await axios.get('/api/schedule/availbility').then(res=>{
        console.log(res.data.availability.schedule)
        setTimeSlots(res.data.availability.schedule)
        setSelectedDays(res.data.availability.selectedDays)
      })
   }catch(err){
      console.log(err)
   }
 }


 useEffect(()=>{
    getAvail()
 },[])



console.log(timeSlots)

  async function Create(){

      const defTimeSlots = [
            { day: 'Monday', slots: [{slotId:nanoid(),start: '06:00', end: '06:30' }] },
            { day: 'Tuesday', slots: [{slotId:nanoid(),start: '06:00', end: '06:30' }] },
            { day: 'Wednesday', slots: [{slotId:nanoid(),start: '06:00', end: '06:30' }] },
            { day: 'Thursday', slots: [{slotId:nanoid(),start: '06:00', end: '06:30' }] },
            { day: 'Friday', slots: [{slotId:nanoid(),start: '06:00', end: '06:30' }] },
            { day: 'Saturday', slots: [{slotId:nanoid(),start: '06:00', end: '06:30' }] },
            { day: 'Sunday', slots: [{slotId:nanoid(),start: '06:00', end: '06:30' }] },
      ]

      setSelectedDays([0,1,2,3,4,5,6])

      try{

         setTimeSlots(defTimeSlots)
         await axios.post('/api/schedule/create/availbility',{avail:defTimeSlots,selectedDays:JSON.stringify([0,1,2,3,4,5,6])}).then(res=>{
          console.log(res.data)
          getAvail()
         })
      }catch(err){
          console.log(err)
      }
  }
  


    async function Save(){

      try{
          await axios.put('/api/schedule/edit/availbility',{avail:timeSlots,selectedDays:JSON.stringify(selectedDays)}).then(res=>{
            console.log("Changes Saved! and will be shown to the pet parents")
            toast.success('Changes Saved! and will be shown to the pet parents')
          return
         })
      }catch(err){
          console.log(err)
      }
  }



  if(timeSlots?.length <1){
    return (
         <div className=" flex flex-col   bg-white  ">
            <div className="flex justify-between">
             <h1 className="text-xl text-gray-600">Set your availability</h1>
               <button onClick={Create} text={"Create"} className="p-2 bg-yellow-500 rounded-xl text-white">Create</button>
            </div>
            <div className="text-center text-gray-600 mt-20">
               Click on Create button to create availability.
            </div>
      </div>
      )
  }


  return (
    <div className="  flex flex-col  bg-white ">
      <div className="flex justify-between">
       <h1 className="text-xl text-gray-600">Set your availability</h1>
         <button onClick={Save} text={"Save"} className="p-2 bg-yellow-500 rounded-xl text-white">Save</button>
      </div>
      <div className="mt-2">
        {timeSlots.map((day, dayIndex) => (
          <div key={dayIndex} className="relative mt-5 max-w-sm">
            <div className="flex items-center gap-2 text-xs">
              <input
                id={day.day}
                type="checkbox"
                checked={selectedDays.includes(dayIndex)}
                onChange={() => handleDaySelect(dayIndex)}
              />
              <label htmlFor={day.day}>{day.day}</label>
            </div>

            {selectedDays.includes(dayIndex) &&
              day.slots.map((slot, slotIndex) => (
                <div key={slotIndex} className="flex items-center gap-2 relative mt-2">
                  <input
                    value={slot.start}
                    type="time"
                    className="p-2 rounded-md border border-gray-300 md:w-full text-xs md:text-sm"
                    onChange={(e) => handleTimeChange(dayIndex, slotIndex, 'start', e.target.value)}
                  />
                  <p className="w-10 text-xs text-center md:text-sm">to</p>
                  <input
                    value={slot.end}
                    type="time"
                    className="p-2 rounded-md border border-gray-300 md:w-full text-xs md:text-sm"
                    onChange={(e) => handleTimeChange(dayIndex, slotIndex, 'end', e.target.value)}
                  />
                  <img
                    src="/assets/icons/dustbin.svg"
                    alt="Delete"
                    className="w-5 cursor-pointer"
                    onClick={() => deleteTimeSlot(dayIndex, slotIndex)}
                  />

                  {slotIndex === day.slots.length - 1 && (
                    <img
                      src="/assets/icons/plus.svg"
                      alt="Add"
                      onClick={() => addTimeSlot(dayIndex)}
                      className="w-5 cursor-pointer"
                    />
                  )}
                </div>
              ))}
          </div>
        ))}
      </div>

     
    
    </div>
  );
}
