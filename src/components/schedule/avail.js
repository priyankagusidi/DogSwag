

import React from "react";
import WeeklyAvailability from "./week";


function App({timeSlots,handleSelectSlot,currentWeekIndex,maxBookingWeek,currentDate}) {


  return (
      <div className="">
         <WeeklyAvailability 
           currentWeekIndex={currentWeekIndex} 
           maxBookingWeek={maxBookingWeek} 
           availabilities={timeSlots} 
           handleSelectSlot={handleSelectSlot} 
           currentDate={currentDate}
         />
      </div>
  );
}

export default App;
