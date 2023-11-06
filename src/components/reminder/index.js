
import React, { useEffect, useState } from 'react'
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";


import Link from 'next/link';


const ReminderPage = () => {

  const [isOpen, setIsOpen] = useState(false)
  const [isOpenProfile, setIsOpenProfile] = useState(false)



  const [value, setValue] = useState("")
  // console.log(value.$D);



  // -----------------------------dates tab start---------------------

  const [pageNumber, setPageNumber] = useState(10);
  const totalPage = 31;
  const [listTag, setListTag] = useState('');
  const [date, SetDate] = useState('')
  const [time, setTime] = useState('')
  const [month, setMonth] = useState(6)

  useEffect(() => {
    setListTag(generatePagination(totalPage, pageNumber));
  }, [totalPage, pageNumber]);

  const handleCalender = (e)=>{
      setPageNumber(e.$D)
      SetDate(`${e.$D}-${e.$M}-${e.$y}`)
      setMonth(e.$M)
      
  }

  const handlePrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handleNextPage = () => {
    if (pageNumber < totalPage) {
      setPageNumber(pageNumber + 1);
    }
  };

  const handlePageClick = (page) => {
    setPageNumber(page);
  };

  const generatePagination = (totalPage, currentPage) => {
    const beforePage = currentPage - 1;
    const afterPage = currentPage + 1;
    let paginationTags = [];

    if (currentPage > 1) {
      paginationTags.push(
        <li key="prev" className="prev btn hover:bg-blue-500 hover:text-white hover:scale-110 my-0 mx-3 py-4 px-5 rounded-[50px] cursor-pointer duration-150" onClick={handlePrevPage}>
          <span>Prev</span>
        </li>
      );
    }

    if (currentPage > 2) {
      paginationTags.push(
        <li key="first" className="btn hover:bg-blue-500 hover:text-white hover:scale-110 my-0 mx-3 py-4 px-5 rounded-[50px] cursor-pointer duration-150" onClick={() => handlePageClick(1)}>
          <span>1</span>
        </li>
      );

      if (currentPage > 3) {
        paginationTags.push(
          <li key="dots" className="dots my-0 mx-3 list-none bg-transparent cursor-default py-4 px-5 rounded-[50px]">
            <span>...</span>
          </li>
        );
      }
    }

    for (let page = beforePage; page <= afterPage; page++) {
      if (totalPage < page) {
        break;
      }

      if (page === 0) {
        page = page + 1;
      }

      const isActive = currentPage === page ? "active bg-blue-500 text-white" : "";
     

      paginationTags.push(
        <li
          key={page}
          className={`btn hover:bg-blue-500 hover:text-white hover:scale-110 my-0 mx-3 py-4 px-5 rounded-[50px] cursor-pointer duration-150   ${isActive}`}
          onClick={() => handlePageClick(page)}
        >
          <span>{page}</span>
        </li>
      );
    }

    if (currentPage < totalPage - 1) {
      if (currentPage < totalPage - 2) {
        paginationTags.push(
          <li key="dot" className="dots my-0 mx-3 list-none bg-transparent cursor-default py-4 px-5 rounded-[50px]">
            <span>...</span>
          </li>
        );
      }

      paginationTags.push(
        <li
          key="last"
          className="btn hover:bg-blue-500 hover:text-white hover:scale-100 my-0 mx-3 py-4 px-5 rounded-[50px] cursor-pointer duration-500"
          onClick={() => handlePageClick(totalPage)}
        >
          <span>{totalPage}</span>
        </li>
      );
    }

    if (totalPage > currentPage) {
      paginationTags.push(
        <li key="next" className="next btn hover:bg-blue-500 hover:text-white hover:scale-110 my-0 mx-3 py-4 px-5 rounded-[50px] cursor-pointer duration-150" onClick={handleNextPage}>
          <span>Next</span>
        </li>
      );
    }

    return paginationTags;
  };



  const [slotData, setSlotData] = useState([

          {slot : 0,
            timeStart : "12:00",
          startMeridian : "am",
          timeEnd : "12:30",
          endMeridian : "am",
          status : "notBooked",
      },
          {slot : 1,
            timeStart : "12:30",
          startMeridian : "am",
          timeEnd : "1:00",
          endMeridian : "am",
          status : "notBooked",
      },
          {slot : 2,
            timeStart : "1:00",
          startMeridian : "am",
          timeEnd : "1:30",
          endMeridian : "am",
          status : "notBooked",
      },
          {slot : 3,
            timeStart : "1:30",
          startMeridian : "am",
          timeEnd : "2:00",
          endMeridian : "am",
          status : "notBooked",
      },
          {slot : 4,
            timeStart : "2:00",
          startMeridian : "am",
          timeEnd : "2:30",
          endMeridian : "am",
          status : "notBooked",
      },
          {slot : 5,
            timeStart : "2:30",
          startMeridian : "am",
          timeEnd : "3:00",
          endMeridian : "am",
          status : "notBooked",
      },
          {slot : 6,
            timeStart : "3:00",
          startMeridian : "am",
          timeEnd : "3:30",
          endMeridian : "am",
          status : "notBooked",
      },
          {slot : 7,
            timeStart : "3:30",
          startMeridian : "am",
          timeEnd : "4:00",
          endMeridian : "am",
          status : "notBooked",
      },
          {slot : 8,
            timeStart : "4:00",
          startMeridian : "am",
          timeEnd : "4:30",
          endMeridian : "am",
          status : "notBooked",
      },
          {slot : 9,
            timeStart : "4:30",
          startMeridian : "am",
          timeEnd : "5:00",
          endMeridian : "am",
          status : "booked",
      },
          {slot : 10,
            timeStart : "5:00",
          startMeridian : "am",
          timeEnd : "5:30",
          endMeridian : "am",
          status : "notBooked",
      },
          {slot : 11,
            timeStart : "5:30",
          startMeridian : "am",
          timeEnd : "6:00",
          endMeridian : "am",
          status : "notBooked",
      },
          {slot : 12,
            timeStart : "6:00",
          startMeridian : "am",
          timeEnd : "6:30",
          endMeridian : "am",
          status : "notBooked",
      },
          {slot : 13,
            timeStart : "6:30",
          startMeridian : "am",
          timeEnd : "7:00",
          endMeridian : "am",
          status : "notBooked",
      },
          {slot : 14,
            timeStart : "7:30",
          startMeridian : "am",
          timeEnd : "8:00",
          endMeridian : "am",
          status : "notBooked",
      },
          {slot : 15,
            timeStart : "8:00",
          startMeridian : "am",
          timeEnd : "8:30",
          endMeridian : "am",
          status : "notBooked",
      },
          {slot : 16,
            timeStart : "8:30",
          startMeridian : "am",
          timeEnd : "9:00",
          endMeridian : "am",
          status : "notBooked",
      },
          {slot : 17,
            timeStart : "9:00",
          startMeridian : "am",
          timeEnd : "9:30",
          endMeridian : "am",
          status : "notBooked",
      },
          {slot : 18,
            timeStart : "9:30",
          startMeridian : "am",
          timeEnd : "10:00",
          endMeridian : "am",
          status : "notBooked",
      },
          {slot : 19,
            timeStart : "10:00",
          startMeridian : "am",
          timeEnd : "10:30",
          endMeridian : "am",
          status : "notBooked",
      },
          {slot : 20,
            timeStart : "10:30",
          startMeridian : "am",
          timeEnd : "11:00",
          endMeridian : "am",
          status : "notBooked",
      },
          {slot : 21,
            timeStart : "11:30",
          startMeridian : "am",
          timeEnd : "12:00",
          endMeridian : "pm",
          status : "notBooked",
      },
          {slot : 22,
            timeStart : "12:00",
          startMeridian : "pm",
          timeEnd : "12:30",
          endMeridian : "pm",
          status : "notBooked",
      },
          {slot : 23,
            timeStart : "12:30",
          startMeridian : "pm",
          timeEnd : "1:00",
          endMeridian : "pm",
          status : "notBooked",
      },
          {slot : 24,
            timeStart : "1:00",
          startMeridian : "pm",
          timeEnd : "1:30",
          endMeridian : "pm",
          status : "notBooked",
      },
          {slot : 25,
            timeStart : "1:30",
          startMeridian : "pm",
          timeEnd : "2:00",
          endMeridian : "pm",
          status : "notBooked",
      },
          {slot : 26,
            timeStart : "2:00",
          startMeridian : "pm",
          timeEnd : "2:30",
          endMeridian : "pm",
          status : "notBooked",
      },
          {slot : 27,
            timeStart : "2:30",
          startMeridian : "pm",
          timeEnd : "3:00",
          endMeridian : "pm",
          status : "notBooked",
      },
          {slot : 28,
            timeStart : "3:00",
          startMeridian : "pm",
          timeEnd : "3:30",
          endMeridian : "pm",
          status : "notBooked",
      },
          {slot : 29,
            timeStart : "3:30",
          startMeridian : "pm",
          timeEnd : "4:00",
          endMeridian : "pm",
          status : "notBooked",
      },
          {slot : 30,
            timeStart : "4:00",
          startMeridian : "pm",
          timeEnd : "4:30",
          endMeridian : "pm",
          status : "notBooked",
      },
          {slot : 31,
            timeStart : "4:30",
          startMeridian : "pm",
          timeEnd : "5:00",
          endMeridian : "pm",
          status : "notBooked",
      },
          {slot : 32,
            timeStart : "5:00",
          startMeridian : "pm",
          timeEnd : "5:30",
          endMeridian : "pm",
          status : "notBooked",
      },
          {slot : 33,
            timeStart : "5:30",
          startMeridian : "pm",
          timeEnd : "6:00",
          endMeridian : "pm",
          status : "notBooked",
      },
          {slot : 34,
            timeStart : "6:00",
          startMeridian : "pm",
          timeEnd : "6:30",
          endMeridian : "pm",
          status : "notBooked",
      },
          {slot : 35,
            timeStart : "6:30",
          startMeridian : "pm",
          timeEnd : "7:00",
          endMeridian : "pm",
          status : "notBooked",
      },
          {slot : 36,
            timeStart : "7:00",
          startMeridian : "pm",
          timeEnd : "7:30",
          endMeridian : "pm",
          status : "notBooked",
      },
          {slot : 37,
            timeStart : "7:30",
          startMeridian : "pm",
          timeEnd : "8:00",
          endMeridian : "pm",
          status : "notBooked",
      },
          {slot : 38,
            timeStart : "8:00",
          startMeridian : "pm",
          timeEnd : "8:30",
          endMeridian : "pm",
          status : "notBooked",
      },
          {slot : 39,
            timeStart : "8:30",
          startMeridian : "pm",
          timeEnd : "9:00",
          endMeridian : "pm",
          status : "notBooked",
      },
          {slot : 40,
            timeStart : "9:00",
          startMeridian : "pm",
          timeEnd : "9:30",
          endMeridian : "pm",
          status : "notBooked",
      },
          {slot : 41,
            timeStart : "9:30",
          startMeridian : "pm",
          timeEnd : "10:00",
          endMeridian : "pm",
          status : "notBooked",
      },
          {slot : 42,
            timeStart : "10:00",
          startMeridian : "pm",
          timeEnd : "10:30",
          endMeridian : "pm",
          status : "notBooked",
      },
          {slot : 43,
            timeStart : "10:30",
          startMeridian : "pm",
          timeEnd : "11:00",
          endMeridian : "pm",
          status : "notBooked",
      },
          {slot : 44,
            timeStart : "11:00",
          startMeridian : "pm",
          timeEnd : "11:30",
          endMeridian : "pm",
          status : "notBooked",
      },
          {slot : 45,
            timeStart : "11:30",
          startMeridian : "pm",
          timeEnd : "12:00",
          endMeridian : "am",
          status : "notBooked",
      },
         
          
         
    ]);

 

  // -----------------------------dates tab end---------------------
  const [showModal, setShowModal] = useState(false)
  const [open1, setOpen1] = useState(false)
 const [slotNumber, setSlotNumber] = useState(null)
  


  const showModalFunction = (a,b,c,d,e)=>{
    setShowModal(true);
    setOpen1(true);
    setTime(`${a}${b}-${c}${d}`)
    setSlotNumber(e);
  }

  const [showDogDetails, setShowDogDetails] = useState(false)
  const [active , setActive] = useState(false)

  // ---------------------------context start-------------------



  // ---------------------------context end-------------------



  return (
    <div className='w-full min-h-screen flex justify-center items-center bg-[#f2f3f7]'>

{showDogDetails &&
  <div className='absolute h-screen w-full bg-gray-600 bg-opacity-40 flex justify-center items-center'>
  <div className='bg-white h-2/3 w-1/2 rounded-md z-10 p-7 grid grid-rows-4'>

<div className=' row-span-1 flex items-center justify-between '>
<div className='flex space-x-3'>
  <img onClick={()=>setActive(1)} className={`h-16 w-16 rounded-full object-cover hover:scale-105 duration-200 cursor-pointer ${active === 1 ? "border border-amber-800 p-1" : ""}`} src="/img/user.jpg" alt="" />
  <img onClick={()=>setActive(2)} className={`h-16 w-16 rounded-full object-cover hover:scale-105 duration-200 cursor-pointer ${active === 2 ? "border border-amber-800 p-1" : ""}`} src="/img/user.jpg" alt="" />
</div>

<div className='flex space-x-3'>
  <img className='h-6 w-6 hover:scale-105 cursor-pointer'  src="/img/edit.svg" alt="" />
  <img className='h-6 w-6 hover:scale-105 cursor-pointer'  src="/img/delete1.svg" alt="" />
  <img  className='h-6 w-6 scale-105 relative -top-12 -right-4 cursor-pointer' src="/img/delete.svg" alt="" onClick={()=>setShowDogDetails(!showDogDetails)}/>
</div>


</div>
<div className=' row-span-3 grid grid-cols-2 gap-4 h-64 overflow-hidden overflow-y-scroll'>
<div>
  <h3 className='text-gray-700 font-semibold tracking-wide'>Dog name :</h3>
  <p className='text-gray-600 font-medium text-sm'>Bruno</p>
</div>
<div>
  <h3 className='text-gray-700 font-semibold tracking-wide'>Dog breed :</h3>
  <p className='text-gray-600 font-medium text-sm'>German shepherd</p>
</div>
<div>
  <h3 className='text-gray-700 font-semibold tracking-wide'>Dog weight :</h3>
  <p className='text-gray-600 font-medium text-sm'>13kg</p>
</div>
<div>
  <h3 className='text-gray-700 font-semibold tracking-wide'>Dog age :</h3>
  <p className='text-gray-600 font-medium text-sm'>11 months 2 year</p>
</div>
<div>
  <h3 className='text-gray-700 font-semibold tracking-wide'>Parent name :</h3>
  <p className='text-gray-600 font-medium text-sm'>Sunder raman</p>
</div>
<div>
  <h3 className='text-gray-700 font-semibold tracking-wide'>City name :</h3>
  <p className='text-gray-600 font-medium text-sm'>Banglore</p>
</div>
<div>
  <h3 className='text-gray-700 font-semibold tracking-wide'>Country name :</h3>
  <p className='text-gray-600 font-medium text-sm'>India</p>
</div>
<div>
  <h3 className='text-gray-700 font-semibold tracking-wide'>Country name :</h3>
  <p className='text-gray-600 font-medium text-sm'>India</p>
</div>
<div>
  <h3 className='text-gray-700 font-semibold tracking-wide'>Parent phone number :</h3>
  <p className='text-gray-600 font-medium text-sm'>+91 9340639669</p>
</div>
<div>
  <h3 className='text-gray-700 font-semibold tracking-wide'>Vet name :</h3>
  <p className='text-gray-600 font-medium text-sm'>Sunder raman</p>
</div>
<div>
  <h3 className='text-gray-700 font-semibold tracking-wide'>Vet phone no. :</h3>
  <p className='text-gray-600 font-medium text-sm'>+91 9876543210</p>
</div>
<div>
  <h3 className='text-gray-700 font-semibold tracking-wide'>Emergency person name :</h3>
  <p className='text-gray-600 font-medium text-sm'>XYZ</p>
</div>
<div>
  <h3 className='text-gray-700 font-semibold tracking-wide'>Emergency phone number :</h3>
  <p className='text-gray-600 font-medium text-sm'>+91 987654321</p>
</div>

</div>

  </div>
</div>
}


    
      <div className='h-[90vh] w-[90%]  shadow-md rounded-md grid grid-rows-2 my-8 p-5'>

{/* ---------------------------top--------------------------- */}
<div className='grid grid-cols-4'>
<div className='grid grid-rows-2 col-span-3 '>
<div className='flex items-start justify-between space-x-2'>

<div className='flex items-start space-x-2'>  
<h2 className='mt-2 font-semibold'>Set</h2>

<div className='relative flex flex-col items-center w-[160px] h-[70px] rounded '>
  <button onClick={()=> setIsOpen((prev) => !prev)} className=' w-full flex items-center justify-center font-bold text-lg rounded-lg tracking-wider border-4 border-transparent active:border-white duration-300 active:text-white text-amber-700'>
  Reminder
  {!isOpen ? (
    <img src="/img/arrow.svg" className='h-8'/>
  ) : (<img src="/img/up-arrow.svg" className='h-8'/>)}</button>

  {isOpen && (
    <div className='bg-amber-500 absolute top-12 flex flex-col items-start rounded-lg p-1 w-full'>
      <div className='flex w-full justify-between hover:bg-amber-400 cursor-pointer rounded-r-lg border-l-transparent hover:border-l-white border-l-4'>
      <Link href={'/'}>
      <h2 className='p-2 font-bold text-white'>Appointment</h2>
      </Link>
       
      </div>
    </div>
  )}
</div>
</div>


  <div className='space-y-1'>
    <h1 className='text-4xl text-gray-600 '> <span className='text-amber-500 font-medium'>Dogswag</span> Organizer</h1>
    <p className='text-sm text-gray-600 font-semibold tracking-wide'>Introduce your dog to the DogSwag organizer.</p>
  </div>

  <div></div>

</div>


<div className='grid grid-cols-2'>
{/* ----------------calender----------------- */}
<div>
<div className='w-2/3 '>


<LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker  onChange={handleCalender}/>
    </LocalizationProvider>
</div>


</div>

</div>



</div>

{/* ------------------------------profile----------------------------- */}

<div className='flex flex-col justify-between'>

<div className='flex items-start justify-around '>
<div>
<button className='font-semibold text-5xl border-2 hover:border-amber-700 duration-300 p-4 h-20 w-20 flex items-center justify-center rounded-full mx-auto bg-amber-400 text-white'><span className='-mt-2'>+</span></button>

<p className='text-gray-700 font-medium tracking-wide'>Add Profile</p>
</div>


<div className='relative flex flex-col items-center w-fit h-[70px]'>
    <button onClick={()=> setIsOpenProfile((prev) => !prev)} className=' flex-col font-bold  duration-500 active:text-white'>
    <div className=' flex justify-center'>
    <div className='bg-white h-20 w-20 mx-auto absolute rounded-full bg-opacity-0 hover:bg-opacity-70 duration-300 flex justify-center items-center'><button onClick={()=>setShowDogDetails((data)=>!data)} className='text-blue-500 opacity-0 hover:opacity-100 text-sm '>View<br />profile</button></div>
    <img src="/img/user.jpg" className='rounded-full h-20 w-20 object-cover mx-auto' />
    </div>
    
    <div className='flex items-center justify-between'>
    <h2 className='text-base font-mono font-semibold text-gray-600 hover:text-gray-800'>Lucy, 11MTH</h2>
    {!isOpenProfile ? (
      <img src="/img/arrow.svg" className='h-8'/>
    ) : (<img src="/img/up-arrow.svg" className='h-8'/>)}
    </div>
    </button>

    {isOpenProfile && (
      <div className=' absolute top-32 flex flex-col items-start space-y-3 rounded-lg p-1 w-full'>
        <div className='flex items-center justify-center space-x-3 w-full cursor-pointer rounded-r-lg border-l-transparent hover:border-l-amber-800 border-l-4'>
        <img src="/img/user1.jpg" className='rounded-full h-14 w-14 hover:h-16 hover:w-16 duration-500 object-cover mx-auto' />
        <h2 className='text-sm font-mono font-semibold mx-auto w-fit text-gray-600 hover:text-gray-800'>mecy, 11MTH</h2> 
        </div>
        <div className='flex items-center justify-center space-x-3 w-full cursor-pointer rounded-r-lg border-l-transparent hover:border-l-amber-800 border-l-4'>
        <img src="/img/user1.jpg" className='rounded-full h-14 w-14 hover:h-16 hover:w-16 duration-500 object-cover mx-auto' />
        <h2 className='text-sm font-mono font-semibold mx-auto w-fit text-gray-600 hover:text-gray-800'>mecy, 11MTH</h2> 
        </div>
        
      </div>
    )}
  </div>
</div>


<div>

</div>

</div>
</div>

 
 {/* -----------------------bottom----------------------------------- */}
 <div>
{/* -----------------------------dates tab------------------------- */}

<div className='datesNeo rounded-full'>
<ul className='flex justify-center px-5 py-2'>{listTag}</ul>
</div>
{/* ---------------------------date tab end-------------------------- */}

{/* ------------slots-------------------- */}


<div className="grid grid-cols-4 gap-4 mt-7 w-11/12 px-4 py-1 h-44 overflow-hidden overflow-y-scroll mx-auto ">

{slotData.map((elm, index)=>(
<div className='relative  py-[10px] px-2 list-none font-medium tracking-wider text-[#5a84a2] text-base rounded-[40px] neoSlot hover:scale-100 flex justify-center space-x-2 items-center' key={index} >
<span onClick={()=>showModalFunction(elm.timeStart,elm.startMeridian,elm.timeEnd,elm.endMeridian, elm.slot)}>{elm.timeStart}{elm.startMeridian} - {elm.timeEnd}{elm.endMeridian}</span>

<div id="animation">
<div data-tooltip={`${elm.status === "notBooked" ? "click to book" : elm.status === "pending" ? "Your appointment is in pending you will be notifies once Shop Name will confirm" : elm.status === "booked" ? "Congratulatins, your appointment is accepted by Shop Name, You can re-schedule or cancel if needed." : elm.status === "resheduled"? "your appointment is rescheduled by Shop name, Click on to accept": elm.status === "cancel" ? "your appointment is canceled by Shop name , please book any other slot.":""}`}  className={`${elm.status === "notBooked" ? "": elm.status === "pending" ? "tooltip h-4 w-4 bg-gray-600" : elm.status === "booked" ? "tooltip h-4 w-4 bg-green-600" : elm.status === "reshedule" ? "tooltip h-4 w-4 bg-yellow-600": elm.status === "canceled" ? "tooltip h-4 w-4 bg-red-600":""}  rounded-full`}></div>
</div>

</div>



))}


</div>

{/* --------------------alert card------------------------------------------- */}



{/* ------------------------------alert card end---------------------------- */}

 </div>
 

</div>

      
    </div>
  )
}

export default ReminderPage
