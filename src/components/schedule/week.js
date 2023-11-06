import React from "react";
import { Tooltip } from '@mantine/core';
import { Popover } from '@mantine/core';
const WeeklyAvailability = ({ availabilities, handleSelectSlot ,maxBookingWeek ,currentWeekIndex,currentDate}) => {
  // Get the current day of the week (0 for Sunday, 1 for Monday, etc.)
  const currentDayIndex = new Date().getDay();

  // Calculate the index of the day before the current day, considering the wrap-around for Sunday.
  const previousDayIndex = (currentDayIndex + 6) % 7;

  // Create a reordered array of days starting from the previous day
  const reorderedDays = [
    ...availabilities.slice(previousDayIndex),
    ...availabilities.slice(0, previousDayIndex),
  ];

 
  return (
    <div className="grid grid-cols-7 gap-2">
      { currentWeekIndex < 1  && reorderedDays.map((day, dayIndex) => (
        <div key={day.day} className="">
          {day.slots.length > 0 ? (
            <ul className="mt-2 flex gap-2 flex-col ">
              {day.slots.map((slot, slotIndex) => {
                
                 {/*if(slot?.booked?.length > 0){
                   console.log(slot.booked,currentDate.add(1, 'day').format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"))
                 }*/}

                function checkAvail(){
                  return slot?.booked?.includes(currentDate.add(dayIndex, 'day').format("YYYY-MM-DD"))
                }
               
                return(
                <li
                  
                  key={slot._id}
                  className={`text-xs md:text-sm ${slot.selected ? "bg-[#1E4D5F] text-white": ""}  ${
                    checkAvail() ? "opacity-70" : ""} 
                    cursor-pointer p-1 flex justify-center hover:border hover:border-[#1E4D5F] text-[#1E4D5F] rounded-xl`}
                >

    <div className="">
                  <Tooltip label={checkAvail() ? "Booked" : `Available slot`}>
                    <button className="flex" onClick={() => handleSelectSlot(slot._id,slot,dayIndex)} disabled={checkAvail()}>{slot.start} {slot.end}</button>
                  </Tooltip>
        </div>       

                </li>
              )

              })}
            </ul>
          ) : (
            <div className="p-2">
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default WeeklyAvailability;
