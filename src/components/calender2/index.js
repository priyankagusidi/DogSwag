import React, {  useEffect, useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Link from 'next/link';
import axios from 'axios';
import socket from "@/utils/socket";



const DogSwagCalender = () => {

  const [isOpen, setIsOpen] = useState(false)
  const [isOpenServices, setIsOpenServices] = useState(false)
  const [isOpenProfile, setIsOpenProfile] = useState(false)

  const [selectedItems, setSelectedItems] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  // -----------------socket start--------
 

  // socket.on('isAccepted', (onConnect)=>{
  //   console.log(onConnect);
  // });

  // socket.on('isRejected', (onConnect)=>{
  //   console.log(onConnect);
  // });

  // --------------socket end----------

  const serviceData = {
    'groomer' : ['abc', 'xyz', 'dkd', 'dkfk'],
    'hair-cut' : ['cba', 'xyz', 'dkd', 'dkfk'],
    'nail-cut' : ['bca', 'xyz', 'dkd', 'dkfk'],
    'bath' : ['wxy', 'xyz', 'dkd', 'dkfk'],
    'color' : ['pqr', 'xyz', 'dkd', 'dkfk'],
  }

  const [availableItems, setAvailableItems] = useState(['Select category first'])
  

  const handleToggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleItemClick = (item) => {
    if (!selectedItems.includes(item)) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleRemoveItem = (item) => {
    setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item));
  };




  // -----------------------------dates tab start---------------------

  const [pageNumber, setPageNumber] = useState(1);
  const totalPage = 31;
  const [listTag, setListTag] = useState('');
  const [date, SetDate] = useState('')
  const [time, setTime] = useState('')
  const [month, setMonth] = useState(6)
  const [pickeDate, setPickedDate] = useState(null);
 const [year, setYear] = useState()
 const [shopName, setShopName] = useState("Banglore Pet Hospital")


  useEffect(() => {
    setListTag(generatePagination(totalPage, pageNumber));
  }, [totalPage, pageNumber]);

  const handleCalender = (e)=>{
      setPageNumber(e.$D)
      SetDate(`${e.$D}-${e.$M}-${e.$y}`)
      setMonth(e.$M)
      setPickedDate(e)
      setYear(e.$y);
      // console.log(pickeDate);
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
        <li key="next" className="next btn hover:bg-blue-500 hover:text-white hover:scale-110 my-0 mx-3 py-3 px-5 rounded-[50px] cursor-pointer duration-150 " onClick={handleNextPage}>
          <span>Next</span>
        </li>
      );
    }

    return paginationTags;
  };



  const [slotData, setSlotData] = useState([
    {slot : 15,
      timeStart : "8:00",
    startMeridian : "am",
    timeEnd : "8:30",
    endMeridian : "am",
  status : "notBooked"},
    {slot : 18,
      timeStart : "9:30",
    startMeridian : "am",
    timeEnd : "10:00",
    endMeridian : "am",
  status : "notBooked"},
    {slot : 20,
      timeStart : "10:30",
    startMeridian : "am",
    timeEnd : "11:00",
    endMeridian : "am",
  status : "notBooked"},
    {slot : 21,
      timeStart : "11:30",
    startMeridian : "am",
    timeEnd : "12:00",
    endMeridian : "am",
  status : "notBooked"},
    {slot : 24,
      timeStart : "1:00",
    startMeridian : "am",
    timeEnd : "1:30",
    endMeridian : "am",
  status : "notBooked"},
  ]);

 

  // -----------------------------dates tab end---------------------
  const [showModal, setShowModal] = useState(false)
  const [open1, setOpen1] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
 const [slotNumber, setSlotNumber] = useState(null)



  const servicesTypes = ["groomer", "hair-cut", "nail-cut", "bath", "color"]

  const [types, setTypes] = useState("category")
  

  const serviceTypesFun = (e,elm)=>{
    setTypes(elm);
    setIsOpenServices(false);

    Object.keys(serviceData).forEach((dataElm, ind)=>{
      if(dataElm === elm){
       setAvailableItems(serviceData[dataElm])
      }
    })
  }

  // ---------------------------context start-------------------

  const [formData, setFormData] = useState({
    userId : "",
    docId : 1,
    timeStamp : "",
    
  })

  const [allFormData, setAllFormData] = useState([])

// console.log(formData);

  
  const showModalFunction = (a, b, c, d, input)=>{
    setShowModal(true);
    setOpen1(true);
  setFormData({
docId : 1,
userId : 1,
timeStamp : `${input}`

})

setSlotNumber(input)


  }

  // console.log(formData);

  const showNotificationFun = () => {
    setShowModal(false);
    setShowNotification(true);
    setAllFormData([...allFormData, formData])
    
  };
  

 const handledDataSend = ()=>{
  setShowNotification(false)

  // ------------------------
  axios.post("/api/request", formData).then((res)=>{}).catch((err)=> console.log(err))

   setSlotData(slotData.map(obj => {
    if (obj.slot === slotNumber) {
      return { ...obj, status : 'pending' };
    }
    return obj; // Return the unchanged object
  }));

  
 }

//  console.log(slotData);
 

//  useEffect(()=>{

//   axios.get('http://localhost:8080/getData/doc').then((res)=>{

//   // console.log((res.data['data'][0]['status']));
//   // console.log((res.data['data'][0]['timeSlot']));

//   setSlotData(prevState => {
//     const newState = [...prevState]; // Create a new array copy
    
//     {res.data['data'].forEach((elm, ind)=>{
//      return  newState[elm['timeSlot']] = { ...newState[elm['timeSlot']], status: elm['status'] }; 
//     }) }
   
//     return newState; // Return the updated state array
//   });

//   }).catch((err)=>{
//     console.log(err);
//   })
  
//  },[])




  // ---------------------------context end-------------------



  return (
    <div className='w-full min-h-screen flex justify-center items-center bg-[#f2f3f7]'>

    
      <div className='md:h-[90vh] h-[100vh] md:w-[90%] w-full  shadow-md rounded-md grid grid-rows-2 my-8 p-5'>

{/* ---------------------------top--------------------------- */}
<div className='grid md:grid-cols-4 md:grid-rows-2 grid-row-4'>
<h2 className='font-bold text-gray-600 md:px-2 block md:hidden text-center flex items-center justify-center text-xl tracking-wide md:order-none order-first border-b-4 border-amber-400 w-fit h-fit pb-1' ><span className='my-auto'>{shopName}</span></h2>
<div className='grid grid-rows-2 md:col-span-3 row-span-2  md:order-none order-last'>
<div className='flex items-start md:justify-start justify-start space-x-6'>

<h2 className='mt-2 font-semibold md:block mr-2' hidden>Set</h2>

  <div className='relative flex flex-col items-center w-[160px] h-[70px] rounded '>
    <button onClick={()=> setIsOpen((prev) => !prev)} className=' w-full flex items-center md:justify-between md:font-bold font-semibold  md:text-lg text-base rounded-lg md:tracking-wider tracking-wide border-4 border-transparent active:border-white duration-300 active:text-white text-amber-700'>
    Appointment
    {!isOpen ? (
      <img src="/img/arrow.svg" className='md:h-8 h-6'/>
    ) : (<img src="/img/up-arrow.svg" className='md:h-8 h-6'/>)}</button>

    {isOpen && (
      <div className='bg-amber-600 absolute top-12 flex flex-col items-start rounded-lg p-1 w-full opacity-100 z-20'>
        <div className='flex w-full justify-between hover:bg-amber-500 cursor-pointer rounded-r-lg border-l-transparent hover:border-l-white border-l-4'>
        <Link href={'/reminder'}>
        <h2 className='p-2 md:font-bold font-semibold text-white'>Reminder</h2>
        </Link>
        
         
        </div>
        <div className='flex w-full justify-between hover:bg-amber-400 cursor-pointer rounded-r-lg border-l-transparent hover:border-l-white border-l-4'>
        <Link href={'/bussiness'}>
        <h2 className='p-2 md:font-bold font-semibold text-white'>Business profile</h2>
        </Link>
        
        </div>
      </div>
    )}
  </div>

  <h2 className='mt-2 font-semibold md:block ml-2' hidden>With</h2>


  <div className='relative flex flex-col items-center w-[110px] h-[70px] rounded '>
    <button onClick={()=> setIsOpenServices((prev) => !prev)} className=' w-full flex items-center justify-between md:font-bold font-semibold md:text-lg rounded-lg tracking-wider border-4 border-transparent active:border-white duration-300 active:text-white text-amber-700 capitalize'>
    {types}
    {!isOpenServices ? (
      <img src="/img/arrow.svg" className='md:h-8 h-6'/>
    ) : (<img src="/img/up-arrow.svg" className='md:h-8 h-6'/>)}</button>

    {isOpenServices && (
      <div className='bg-amber-600 text-white z-20 absolute top-12 flex flex-col items-start rounded-lg p-1 w-[120%]'>
      {servicesTypes.map((elm, index)=>(
        <div className='flex w-full justify-between hover:bg-amber-400 cursor-pointer rounded-r-lg border-l-transparent hover:border-l-white border-l-4 capitalize md:text-base text-sm' key={index}>
          <h2 className='p-2 font-medium' onClick={e => serviceTypesFun(e, elm)} >{elm}</h2>
          
        </div>
      ))}
        
      
        
       
      </div>
    )}
  </div>
{/* -----------------------show item--------------------- */}
<div>
<div className='hidden md:block'>
<h2 className='mt-2 font-bold bg-amber-800 text-white px-2'>{shopName}</h2>
</div>

<div className="selected-items md:block hidden">
  {selectedItems.length > 0 && (
    <ul>
      {selectedItems.map((item) => (
        <li key={item} className='flex items-center justify-start gap-2 font-mono text-gray-600 hover:font-semibold'>
        <span> {item} </span>
          <button onClick={() => handleRemoveItem(item)}><img className='h-4' src='/img/remove.svg'/></button>
        </li>
      ))}
    </ul>
  )}
</div>

</div>

  <div>

  </div>
</div>


<div className='md:grid md:grid-cols-2 md:place-items-start flex items-start justify-start md:-mt-0 -mt-6'>
{/* ----------------calender----------------- */}
<div>
<div className='w-2/3 '>


<LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker value={pickeDate} onChange={handleCalender}/>
    </LocalizationProvider>
</div>


</div>


{/* ------------select services----------------- */}
<div className='w-1/6 h-[30px] relative md:-left-0 -left-8'>
 <button onClick={handleToggleDropdown} className='font-semibold tracking-wider flex items-center space-x-4'>Services <img src="/img/arrow.svg" alt="" className='md:w-8 md:h-8 h-6 w-6'/></button>
  {dropdownOpen && (
    <ul className="w-[150px] bg-amber-600 pl-2 rounded py-4 space-y-3 relative z-40">
      {availableItems.map((item, ind) => (
        <li key={ind} onClick={() => handleItemClick(item)} className='cursor-pointer rounded-r-lg border-l-transparent hover:border-l-white border-l-4 pl-1 text-white hover:font-semibold md:text-base text-sm'>
          {item}
        </li>
      ))}
    </ul>
  )}
 </div>


</div>



</div>

{/* ------------------------------profile----------------------------- */}

<div className='flex flex-col justify-between md:space-x-0 space-x-5 md:order-none order-2'>

<div className='flex items-start md:justify-between md:space-x-0 space-x-4'>
<div>
<button className='font-semibold md:text-5xl text-3xl border-2 hover:border-amber-700 duration-300 p-4 md:h-20 md:w-20 h-16 w-16 flex items-center justify-center rounded-full mx-auto bg-amber-400 text-white'><span className='-mt-2'>+</span></button>

<p className='text-gray-700 font-medium tracking-wide md:text-base text-sm'>Add Profile</p>
</div>


<div className='relative flex flex-col items-center w-fit md:h-[70px]'>
    <button onClick={()=> setIsOpenProfile((prev) => !prev)} className=' flex-col font-bold  duration-500 active:text-white'>
    
    <img src="/img/user.jpg" className='rounded-full md:h-20 md:w-20 h-16 w-16 object-cover mx-auto' />
    <div className='flex items-center justify-between'>
    <h2 className=' font-mono font-semibold text-gray-600 hover:text-gray-800 md:text-base text-sm '>Lucy, 11MTH</h2>
    {!isOpenProfile ? (
      <img src="/img/arrow.svg" className='md:h-8 h-6'/>
    ) : (<img src="/img/up-arrow.svg" className='md:h-8 h-6'/>)}
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

  <div className="selected-items md:hidden block">
  {selectedItems.length > 0 && (
    <ul>
      {selectedItems.map((item) => (
        <li key={item} className='flex items-center justify-start gap-2 font-mono text-gray-600 hover:font-semibold'>
        <span> {item}</span>
          <button onClick={() => handleRemoveItem(item)}><img className='h-4' src='/img/remove.svg'/></button>
        </li>
      ))}
    </ul>
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

<div className='datesNeo rounded-full md:block hidden'>
<ul className='flex justify-center px-5 md:py-2 py-1'>{listTag}</ul>
</div>
{/* ---------------------------date tab end-------------------------- */}

{/* ------------slots-------------------- */}


<div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 md:mt-7 md:w-10/12 mx-auto">

{slotData.map((elm, index)=>{

  return(
    <div className='relative  py-[10px] px-2 list-none font-medium tracking-wider text-[#5a84a2] sm:text-base text-sm rounded-[40px] neoSlot hover:scale-100 flex justify-center space-x-2 items-center' key={index} >
<span onClick={()=>showModalFunction( elm.timeStart, elm.startMeridian,elm.timeEnd, elm.endMeridian, elm.slot)}>{elm.timeStart}{elm.startMeridian} - {elm.timeEnd}{elm.endMeridian}</span>

<div id="animation">
<div data-tooltip={`${elm.status === "notBooked" ? "click to book" : elm.status === "pending" ? "Your appointment is in pending you will be notifies once Shop Name will confirm" : elm.status === "booked" ? "Congratulatins, your appointment is accepted by Shop Name, You can re-schedule or cancel if needed." : elm.status === "resheduled"? "your appointment is rescheduled by Shop name, Click on to accept": elm.status === "cancel" ? "your appointment is canceled by Shop name , please book any other slot.":""}`}  className={`${elm.status === "notBooked" ? "": elm.status === "pending" ? "tooltip h-4 w-4 bg-gray-600" : elm.status === "booked" ? "tooltip h-4 w-4 bg-green-600" : elm.status === "reshedule" ? "tooltip h-4 w-4 bg-yellow-600": elm.status === "cancel" ? "tooltip h-4 w-4 bg-red-600":""}  rounded-full`}></div>
</div>

</div>


  )


})}


</div>

{/* --------------------alert card------------------------------------------- */}

{showModal ? 
<div className="w-full top-0 bg-gray-300 flex justify-center items-center">
<div className={`popup bg-[#d2ac03] rounded-md   text-center pt-0 px-7 pb-7 text-[#333]   sm:w-[400px] w-[340px]  duration-500 text-3xl font-medium mt-7 mb-3 ${open1 ? "open-popup ": ""}`}>
<img className='imgCheckout mx-auto w-24 h-24 -mt-[50px] rounded-full shadow-md bg-[#fff]' src="/img/svg3.svg"/>
<h2 className='text-white text-lg'>Your selected time slot is <br /> <span className='text-gray-200 mr-3'>{date}</span> <span className='text-blue-800 font-semibold'>{time}</span></h2>
{/* <p className='text-gray-700 text-lg font-semibold '> A.K. Pet care</p> */}
<p className='text-gray-700 text-lg font-semibold '>Category - <span className='font-semibold text-gray-200 capitalize'>{types}</span></p>


<ul className='flex items-center'>

{selectedItems.length>0 && 
selectedItems.map((elm, ind)=>(
  <div key={ind} className='flex items-center justify-center  space-x-3 mx-auto w-fit'>
  <li className='text-base  text-gray-200'>{elm}</li>
  <li>|</li>
  </div>
))}
  
  
  
</ul>
<button type="button" className='buttonCheckout w-full mt-[40px] py-2 bg-[#f4f5f4] text-[#424242] border outline-none text-lg rounded-md cursor-pointer shadow-md hover:text-gray-700 flex justify-center items-center' onClick={showNotificationFun}> <span>Book Appointment</span>  <span>
<img className='h-10 w-10' src="/img/send.svg" alt="" />
</span></button>
</div>
</div> : ""}

{showNotification ? 
<div className="w-full top-0 bg-gray-300 flex justify-center items-center">
<div className={`popup bg-[#d2ac03] rounded-md   text-center pt-0 px-7 pb-7 text-[#333]   sm:w-[400px] w-[340px]  duration-500 text-3xl font-medium mt-7 mb-3 ${showNotification ? "open-popup ": ""}`}>
<img className='imgCheckout mx-auto w-24 h-24 -mt-[50px] rounded-full shadow-md bg-[#fff]' src="/img/svg4.svg"/>
<h2 className='text-white text-3xl'>We are really grateful to you!</h2><br />
<p className='text-gray-700 text-lg font-semibold '> Thanks For Booking With Us.</p>


<button type="button" className='buttonCheckout w-full mt-[40px] py-2 bg-[#f4f5f4] text-[#424242] border outline-none text-lg rounded-md cursor-pointer shadow-md hover:text-gray-700 flex justify-center items-center' onClick={handledDataSend}> 
<img src="/img/ok.svg" alt="" className='-rotate-90'/>
</button>
</div>
</div> : ""}




{/* ------------------------------alert card end---------------------------- */}

 </div>
 

</div>

      
    </div>
  )
}

export default DogSwagCalender

// api
// http://localhost:8080/request

