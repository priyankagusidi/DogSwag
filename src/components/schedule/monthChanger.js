import React, { useState } from 'react';
import dayjs from 'dayjs';
import TimezoneSelect from 'react-timezone-select'
const WeekNavigation = ({currentWeekIndex,currentDate, setCurrentDate,setCurrentWeekIndex,dayIndex}) => {

  const daysOfWeek = [];
  const [selectedTimezone, setSelectedTimezone] =useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  )
   const today = dayjs().startOf('day'); // Set time to midnight
  
  // Initialize daysOfWeek array with the current week's dates
  for (let i = 0; i < 7; i++) {
    daysOfWeek.push(currentDate.add(i, 'day').format('YYYY-MM-DD'));
  }
  


  const prevWeek = () => {


   // console.log(today,currentDate)

  if (currentDate.format("YYYY-MM-DD") === today.format("YYYY-MM-DD") ) {
    return;
  }
    setCurrentWeekIndex((prevWeekIndex)=>prevWeekIndex-1)
    setCurrentDate((prevDate) => prevDate.subtract(7, 'day'));
  };

  const nextWeek = () => {
    setCurrentWeekIndex((prevWeekIndex)=>prevWeekIndex+1)
    setCurrentDate((prevDate) => prevDate.add(7, 'day'));
  };

  return (
    <div className="container text-xs md:text-sm  mx-auto mt-4">
      <div className="flex justify-between items-center">
        <div className="flex py-2">
            <img src="/assets/icons/rightarrow.svg" className={`w-8 ${ currentDate.format("YYYY-MM-DD") === today.format("YYYY-MM-DD") ?"opacity-70":""} border-gray-300 border p-2 rotate-180 cursor-pointer`} onClick={prevWeek}/>
            <img src="/assets/icons/rightarrow.svg" className="w-8 border-gray-300 border p-2  cursor-pointer" onClick={nextWeek}/>
         </div>
         <div className="text-xs md:text-sm text-gray-600">
           {currentDate.format('MMM DD') } - { currentDate.add(6, 'day').format('DD') } , {currentDate.format('YYYY')}
         </div>
         <div className="w-6/12 text-xs md:text-sm">
           <TimezoneSelect
            value={selectedTimezone}
            onChange={setSelectedTimezone}
          />
         </div>
      </div>

      <div className="grid grid-cols-7 justify-items-center gap-1 py-3 text-gray-700">
        {daysOfWeek.map((date) => (
          <div key={date} className="text-center border-t-4 py-2 border-[#1E4D5F] w-full">
            <p className="text-md">{dayjs(date).format('ddd')}</p>
            <p className="text-md">{dayjs(date).format('D')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekNavigation;
