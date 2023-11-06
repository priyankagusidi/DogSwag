import {Modal} from '@mantine/core'
import React, { useState } from 'react';
const Calendar = () => {
	const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
const [selectedDay, setSelectedDay] = useState(null);
const [dayImages, setDayImages] = useState({});
const [openRemModal,setOpenRemModal] = useState(false)
const [reminderList,setReminderList] = useState([])
const [selectedTime,setSelectedTime] = useState("morning")
const [selectedRem,setSelectedRem] = useState("12:00")
const [info,setInfo] = useState({})
const currentTime = "12:00:00"
const [sectionList,setSectionList] = useState([])

const [whatsappList,setWhatsappList] = useState([])
const [number,setNumber] = useState("")
 
// const data = [{
// 	date:"1.2.3",
// 	type:"food",
// 	when:"8:30",
// 	what:"medicine name",
// 	how:"some instruction",
// 	time:"morning"
// },
//  {
// 	date:"1.2.3",
// 	type:"food",
// 	when:"2:30",
// 	what:"medicine name",
// 	how:"some instruction",
// 	time:"afternoon"
// },
//  {
// 	date:"1.2.3",
// 	type:"medicine",
// 	when:"9:30",
// 	what:"medicine name",
// 	how:"some instruction",
// 	time:"night"
// },
//  {
// 	date:"1.2.3",
// 	type:"medicine",
// 	when:"7:30",
// 	what:"medicine name",
// 	how:"some instruction",
// 	time:"morning"
// }
// ]

// function createEvent(type,when,what,how,time){
//    setReminderList([...reminderList,{type,when,what,how,time}])
// }

const generateCalendarGrid = (month, year) => {
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarGrid = [];
  let dayCounter = 1;

  for (let week = 0; week < 6; week++) {
    const weekRow = [];

    for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
      if (week === 0 && dayOfWeek < firstDayOfMonth) {
        weekRow.push(null);
      } else if (dayCounter > daysInMonth) {
        weekRow.push(null);
      } else {
        weekRow.push(dayCounter);
        dayCounter++;
      }
    }

    calendarGrid.push(weekRow);
  }

  return calendarGrid;
};

const handleMonthChange = (e) => {
    setCurrentMonth(parseInt(e.target.value));
  };

  const handleYearChange = (e) => {
    setCurrentYear(parseInt(e.target.value));
  };


const handleDayClick = (day, image) => {
  console.log(`${day} ${currentMonth+1} ${currentYear}`)
  setSelectedDay(`${day}-${currentMonth+1}-${currentYear}`);
 setOpenRemModal(true)
  // setDayImages({ ...dayImages, [day]: image });
};
  // Your calendar logic will reside here

 const calendarGrid = generateCalendarGrid(currentMonth, currentYear);

 function selectTime(e) {
 	console.log(e.target.value)
 	setSelectedTime(e.target.value)
 }
 function selectRem(e){
 	setSelectedRem(e.target.value)
 }
  function handleChange(e){
  	setInfo({...info,[e.target.name]:e.target.value})
  }
 function createRem(){
   if(!sectionList.includes(info.section)){
      setSectionList([...sectionList,info.section])
   }
   setReminderList([...reminderList,{type:info.section,when:selectedRem,what:info.what,how:info.how,time:selectedTime}])	
 }
  console.log(reminderList)

  function onChangeWhatsapp(e){
  	setNumber(e.target.value)
  }
  
  function addWhatsapp(){
  	setWhatsappList([...whatsappList,number])
  }

  return (
    <div className="">

      
   
    <div className="flex flex-wrap gap-5">
    <div className="max-w-sm bg-white p-5 rounded-md shadow">
    	share with whatsapp numbers
    	<div>
    	  <input type="number" className="p-2 border w-10/12" onChange={onChangeWhatsapp}/>
    	  <button className="p-2 bg-amber-800 text-white w-2/12" onClick={addWhatsapp}>Add</button>
    	</div>
      <div className="mt-2 grid gap-2">
    	{
    		whatsappList.map((m,i)=>{
    			return (
            <div key={i} className="bg bg-blue-100 rounded-md border-l-4 border-blue-500 flex justify-between items-center">
              <span className="p-2">{m}</span>
              <div className="p-2 text-red-500 border hover:bg-red-400 cursor-pointer"><img src="/assets/icons/cross.svg" className="w-3"/></div>
            </div>
            )
    		})
    	}
      </div>
    </div>

   

  </div>

    </div>
  );
};

export default Calendar;



