import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MuiPhoneNumber from "material-ui-phone-number";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Link from "next/link";
import axios from "axios";
import { TimePicker } from "@mui/x-date-pickers";
import  socket  from "@/utils/socket";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Grooming",
  "Hair Cutting",
  "Nail cut",
  "Bath",
  "Trainig",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];




const BusinessAppoint = () => {
  const [isOpenProfile, setIsOpenProfile] = useState(false);





  // -----------------------------dates tab start---------------------

  const [pageNumber, setPageNumber] = useState(10);
  const totalPage = 31;
  const [listTag, setListTag] = useState("");

  useEffect(() => {
    setListTag(generatePagination(totalPage, pageNumber));
  }, [totalPage, pageNumber]);

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
        <li
          key="prev"
          className="prev btn hover:bg-blue-500 hover:text-white hover:scale-110 my-0 mx-3 py-4 px-5 rounded-[50px] cursor-pointer duration-150"
          onClick={handlePrevPage}
        >
          <span>Prev</span>
        </li>
      );
    }

    if (currentPage > 2) {
      paginationTags.push(
        <li
          key="first"
          className="btn hover:bg-blue-500 hover:text-white hover:scale-110 my-0 mx-3 py-4 px-5 rounded-[50px] cursor-pointer duration-150"
          onClick={() => handlePageClick(1)}
        >
          <span>1</span>
        </li>
      );

      if (currentPage > 3) {
        paginationTags.push(
          <li
            key="dots"
            className="dots my-0 mx-3 list-none bg-transparent cursor-default py-4 px-5 rounded-[50px]"
          >
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

      const isActive =
        currentPage === page ? "active bg-blue-500 text-white" : "";

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
          <li
            key="dot"
            className="dots my-0 mx-3 list-none bg-transparent cursor-default py-4 px-5 rounded-[50px]"
          >
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
        <li
          key="next"
          className="next btn hover:bg-blue-500 hover:text-white hover:scale-110 my-0 mx-3 py-4 px-5 rounded-[50px] cursor-pointer duration-150"
          onClick={handleNextPage}
        >
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
availability : false,
},
    {slot : 1,
      timeStart : "12:30",
    startMeridian : "am",
    timeEnd : "1:00",
    endMeridian : "am",
    status : "notBooked",
availability : false,
},
    {slot : 2,
      timeStart : "1:00",
    startMeridian : "am",
    timeEnd : "1:30",
    endMeridian : "am",
    status : "notBooked",
availability : false,
},
    {slot : 3,
      timeStart : "1:30",
    startMeridian : "am",
    timeEnd : "2:00",
    endMeridian : "am",
    status : "notBooked",
availability : false,
},
    {slot : 4,
      timeStart : "2:00",
    startMeridian : "am",
    timeEnd : "2:30",
    endMeridian : "am",
    status : "notBooked",
availability : false,
},
    {slot : 5,
      timeStart : "2:30",
    startMeridian : "am",
    timeEnd : "3:00",
    endMeridian : "am",
    status : "notBooked",
availability : false,
},
    {slot : 6,
      timeStart : "3:00",
    startMeridian : "am",
    timeEnd : "3:30",
    endMeridian : "am",
    status : "notBooked",
availability : false,
},
    {slot : 7,
      timeStart : "3:30",
    startMeridian : "am",
    timeEnd : "4:00",
    endMeridian : "am",
    status : "notBooked",
availability : false,
},
    {slot : 8,
      timeStart : "4:00",
    startMeridian : "am",
    timeEnd : "4:30",
    endMeridian : "am",
    status : "notBooked",
availability : false,
},
    {slot : 9,
      timeStart : "4:30",
    startMeridian : "am",
    timeEnd : "5:00",
    endMeridian : "am",
    status : "notBooked",
availability : false,
},
    {slot : 10,
      timeStart : "5:00",
    startMeridian : "am",
    timeEnd : "5:30",
    endMeridian : "am",
    status : "notBooked",
availability : false,
},
    {slot : 11,
      timeStart : "5:30",
    startMeridian : "am",
    timeEnd : "6:00",
    endMeridian : "am",
    status : "notBooked",
availability : false,
},
    {slot : 12,
      timeStart : "6:00",
    startMeridian : "am",
    timeEnd : "6:30",
    endMeridian : "am",
    status : "notBooked",
availability : false,
},
    {slot : 13,
      timeStart : "6:30",
    startMeridian : "am",
    timeEnd : "7:00",
    endMeridian : "am",
    status : "notBooked",
availability : false,
},
    {slot : 14,
      timeStart : "7:30",
    startMeridian : "am",
    timeEnd : "8:00",
    endMeridian : "am",
    status : "notBooked",
availability : false,
},
    {slot : 15,
      timeStart : "8:00",
    startMeridian : "am",
    timeEnd : "8:30",
    endMeridian : "am",
    status : "notBooked",
availability : false,
},
    {slot : 16,
      timeStart : "8:30",
    startMeridian : "am",
    timeEnd : "9:00",
    endMeridian : "am",
    status : "notBooked",
availability : false,
},
    {slot : 17,
      timeStart : "9:00",
    startMeridian : "am",
    timeEnd : "9:30",
    endMeridian : "am",
    status : "notBooked",
availability : false,
},
    {slot : 18,
      timeStart : "9:30",
    startMeridian : "am",
    timeEnd : "10:00",
    endMeridian : "am",
    status : "notBooked",
availability : false,
},
    {slot : 19,
      timeStart : "10:00",
    startMeridian : "am",
    timeEnd : "10:30",
    endMeridian : "am",
    status : "notBooked",
availability : false,
},
    {slot : 20,
      timeStart : "10:30",
    startMeridian : "am",
    timeEnd : "11:00",
    endMeridian : "am",
    status : "notBooked",
availability : false,
},
    {slot : 21,
      timeStart : "11:30",
    startMeridian : "am",
    timeEnd : "12:00",
    endMeridian : "pm",
    status : "notBooked",
availability : false,
},
    {slot : 22,
      timeStart : "12:00",
    startMeridian : "pm",
    timeEnd : "12:30",
    endMeridian : "pm",
    status : "notBooked",
availability : false,
},
    {slot : 23,
      timeStart : "12:30",
    startMeridian : "pm",
    timeEnd : "1:00",
    endMeridian : "pm",
    status : "notBooked",
availability : false,
},
    {slot : 24,
      timeStart : "1:00",
    startMeridian : "pm",
    timeEnd : "1:30",
    endMeridian : "pm",
    status : "notBooked",
availability : false,
},
    {slot : 25,
      timeStart : "1:30",
    startMeridian : "pm",
    timeEnd : "2:00",
    endMeridian : "pm",
    status : "notBooked",
availability : false,
},
    {slot : 26,
      timeStart : "2:00",
    startMeridian : "pm",
    timeEnd : "2:30",
    endMeridian : "pm",
    status : "notBooked",
availability : false,
},
    {slot : 27,
      timeStart : "2:30",
    startMeridian : "pm",
    timeEnd : "3:00",
    endMeridian : "pm",
    status : "notBooked",
availability : false,
},
    {slot : 28,
      timeStart : "3:00",
    startMeridian : "pm",
    timeEnd : "3:30",
    endMeridian : "pm",
    status : "notBooked",
availability : false,
},
    {slot : 29,
      timeStart : "3:30",
    startMeridian : "pm",
    timeEnd : "4:00",
    endMeridian : "pm",
    status : "notBooked",
availability : false,
},
    {slot : 30,
      timeStart : "4:00",
    startMeridian : "pm",
    timeEnd : "4:30",
    endMeridian : "pm",
    status : "notBooked",
availability : false,
},
    {slot : 31,
      timeStart : "4:30",
    startMeridian : "pm",
    timeEnd : "5:00",
    endMeridian : "pm",
    status : "notBooked",
availability : false,
},
    {slot : 32,
      timeStart : "5:00",
    startMeridian : "pm",
    timeEnd : "5:30",
    endMeridian : "pm",
    status : "notBooked",
availability : false,
},
    {slot : 33,
      timeStart : "5:30",
    startMeridian : "pm",
    timeEnd : "6:00",
    endMeridian : "pm",
    status : "notBooked",
availability : false,
},
    {slot : 34,
      timeStart : "6:00",
    startMeridian : "pm",
    timeEnd : "6:30",
    endMeridian : "pm",
    status : "notBooked",
availability : false,
},
    {slot : 35,
      timeStart : "6:30",
    startMeridian : "pm",
    timeEnd : "7:00",
    endMeridian : "pm",
    status : "notBooked",
availability : false,
},
    {slot : 36,
      timeStart : "7:00",
    startMeridian : "pm",
    timeEnd : "7:30",
    endMeridian : "pm",
    status : "notBooked",
availability : false,
},
    {slot : 37,
      timeStart : "7:30",
    startMeridian : "pm",
    timeEnd : "8:00",
    endMeridian : "pm",
    status : "notBooked",
availability : false,
},
    {slot : 38,
      timeStart : "8:00",
    startMeridian : "pm",
    timeEnd : "8:30",
    endMeridian : "pm",
    status : "notBooked",
availability : false,
},
    {slot : 39,
      timeStart : "8:30",
    startMeridian : "pm",
    timeEnd : "9:00",
    endMeridian : "pm",
    status : "notBooked",
availability : false,
},
    {slot : 40,
      timeStart : "9:00",
    startMeridian : "pm",
    timeEnd : "9:30",
    endMeridian : "pm",
    status : "notBooked",
availability : false,
},
    {slot : 41,
      timeStart : "9:30",
    startMeridian : "pm",
    timeEnd : "10:00",
    endMeridian : "pm",
    status : "notBooked",
availability : false,
},
    {slot : 42,
      timeStart : "10:00",
    startMeridian : "pm",
    timeEnd : "10:30",
    endMeridian : "pm",
    status : "notBooked",
availability : false,
},
    {slot : 43,
      timeStart : "10:30",
    startMeridian : "pm",
    timeEnd : "11:00",
    endMeridian : "pm",
    status : "notBooked",
availability : false,
},
    {slot : 44,
      timeStart : "11:00",
    startMeridian : "pm",
    timeEnd : "11:30",
    endMeridian : "pm",
    status : "notBooked",
availability : false,
},
    {slot : 45,
      timeStart : "11:30",
    startMeridian : "pm",
    timeEnd : "12:00",
    endMeridian : "am",
    status : "notBooked",
availability : false,
},

   
  ]);


    // -----------socket start-------------
    useEffect(()=>{
      
    })

    socket.on('requestToDoctor', (onConnect)=>{
        
        // setSlotData(slotData.map(obj => {
        //   if (obj.slot === onConnect.data.timeStamp) {
        //     return { ...obj, status : 'pending' };
        //   }
        //   return obj; 
        // }));
        console.log('arg',onConnect);
        console.log('timeStamp', onConnect.data.timeStamp);
      });

   
    
    // sockt end 

  
// --------------------slot fnctionallity start--------

const [showAvailability, setShowAvailability] = useState(false)
const [hoverSlot, setHoverSlot] = useState(null)


const handelEnter = (input)=>{
  setShowAvailability(true)
  setHoverSlot(input)
}
const handleLeave = (input)=>{
  setShowAvailability(false)
  setHoverSlot(input)
}

const handleSlotAvailable = (input)=>{
  setSlotData(
   slotData.map((elm, ind)=>{
    if(ind !== input){
      return elm
    }else{
      return {...elm, availability : false}
    }
   })
  
  )

  
}
const handleSlotUnavailable = (input)=>{
  setSlotData(
    slotData.map((elm, ind)=>{
     if(ind !== input){
       return elm
     }else{
       return {...elm, availability : true}
     }
    })

   
   )
}
useEffect(()=>{
  console.log(
    slotData.filter((elm, ind)=>
  elm.availability === true ? elm : ""
  )
  );
  
},[handleSlotAvailable, handleSlotUnavailable])

// --------------------slot fnctionallity end--------
   
    

  const [month, setMonth] = useState(null);
  const [pickeDate, setPickedDate] = useState(null);

  const handleCalender = (e) => {
    setPageNumber(e.$D);
    setMonth(e.$M);
    setPickedDate(e);
    // console.log(e);
  };

 

  // console.log(slotData);

  // -----------------------------dates tab end---------------------

  const [showUserForm, setShowUserForm] = useState(false);

  const [personName, setPersonName] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };



  // -----------------context data end----------



  const [showAcctRej, setShowAccptRej] = useState(false);
  const [showTD, setShowTD] = useState(false)
  const [rescheduleText, setRecheduleText] = useState("Reschedule")

  const handleAptRejc = ()=>{
    setShowAccptRej(false)
    setRecheduleText("Rechedule");
    setShowTD(false)
  }


  const funAccept = () => {
    setShowAccptRej(false)

    // axios.post('http://localhost:8080/accepted/request/1', {
    //   'requestId':1,
    //    'userId':1,
    //     'docId':1
    // }).then((res)=>{
    // console.log(res);
    // }).catch((err)=>{
    //   console.log(err);
    // })

    // axios.get('http://localhost:8080/getData/doc').then((res)=>{
    // console.log(res.data['data'][0]['status']);
  
    // setSlotData(prevState => {
    //   const newState = [...prevState]; // Create a new array copy
      
    //   {res.data['data'].forEach((elm, ind)=>{
    //    return  newState[elm['timeSlot']] = { ...newState[elm['timeSlot']], status: 'booked' }; 
    //   }) }
     
    //   return newState; // Return the updated state array
    // });
  
    // }).catch((err)=>{
    //   console.log(err);
    // })




  };
  const funReschedule = () => {
  
    setShowTD(()=>(!showTD))
    setRecheduleText("Update")
  };

  const funReject = () => {
  
    // axios.post('http://localhost:8080/decline/request/1', {
    //   'requestId':1,
    //    'userId':1,
    //     'docId':1
    // }).then((res)=>{
    // console.log(res);
    // }).catch((err)=>{
    //   console.log(err);
    // })

    // axios.get('http://localhost:8080/getData/doc').then((res)=>{
    // console.log(res.data['data']);
  
    // setSlotData(prevState => {
    //   const newState = [...prevState]; // Create a new array copy
      
    //   {res.data['data'].forEach((elm, ind)=>{
    //    return  newState[elm['timeSlot']] = { ...newState[elm['timeSlot']], status: 'cancel' }; 
    //   }) }
     
    //   return newState; // Return the updated state array
    // });
  
    // }).catch((err)=>{
    //   console.log(err);
    // })

    setShowAccptRej(false)
  };

  
  // useEffect(()=>{
  //   axios.get('http://localhost:8080/getData/doc').then((res)=>{
  //   // console.log(res.data['data']);
  
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

// console.log(slotData);

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-[#f2f3f7]">
      {/* ----------------accept reject form start---------------------- */}

      {showAcctRej ? (
        <div className="absolute h-screen w-full bg-gray-600 flex justify-center items-center z-10 bg-opacity-40">
          <div className="h-[70%] w-1/3 bg-white rounded-md p-10">
            <div className="flex flex-col space-y-10">
              <div className="flex justify-between">
                <h1 className="mx-auto text-3xl font-medium tracking-wide text-gray-700">
                  Appointent
                </h1>
                <div
                  className="bg-red-500 hover:bg-red-600 rounded-full p-1 h-8 w-8 text-white font-bold flex justify-center items-center relative -top-7 -right-4"
                  onClick={handleAptRejc}
                >
                  x
                </div>
              </div>

              <div>
                <p className="text-lg font-medium">
                  Name : <span className="text-gray-600">Sundar Raman</span>
                </p>
                <p className="text-lg font-medium">
                  Service :{" "}
                  <span className="text-gray-600">Grooming, Hair cutting </span>
                </p>
              </div>

              <div className="flex justify-between items-center ">
                <button
                  className="text-lg font-mono bg-amber-500 border-2 hover:border-amber-500 hover:bg-transparent duration-500 hover:text-gray-700 px-4 py-2 rounded-full text-white"
                  onClick={funAccept}
                >
                  Accept
                </button>
                <button
                  className="text-lg font-mono bg-amber-500 border-2 hover:border-amber-500 hover:bg-transparent duration-500 hover:text-gray-700 px-4 py-2 rounded-full text-white"
                  onClick={funReschedule}
                >
                  {rescheduleText}
                </button>
                <button
                  className="text-lg font-mono bg-amber-500 border-2 hover:border-amber-500 hover:bg-transparent duration-500 hover:text-gray-700 px-4 py-2 rounded-full text-white"
                  onClick={funReject}
                >
                  Reject
                </button>
              </div>

              {showTD && 
                <div className="grid grid-rows-2 place-content-center gap-3">
  <div className="mx-auto">
  <LocalizationProvider dateAdapter={AdapterDayjs}>
      
        <DatePicker label="Reschedule date" />
     
    </LocalizationProvider>
  </div>
  <div className="flex items-center justify-center space-x-2">
    <div>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      
        <TimePicker label="From" />
     
    </LocalizationProvider>
    </div>
    <div>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      
        <TimePicker label="To" />
      
    </LocalizationProvider>
    </div>
  </div>
</div>
}



            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {/* ----------------accept reject form end---------------------- */}

      {/* --------------user appoint book form---------------- */}
      {showUserForm ? (
        <div className="absolute h-screen w-full flex items-center justify-center bg-gray-400 bg-opacity-40">
          <div className="h-2/3 w-1/2 flex justify-center items-center bg-white rounded-md z-30">
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <div className="p-10  mx-auto">
                <div
                  className="text-red-700 font-bold w-fit text-xl relative -right-[110%] -top-10 cursor-pointer"
                  onClick={() => setShowUserForm(false)}
                >
                  x
                </div>
                <div className=" grid grid-rows-4">
                  <div>
                    <TextField
                      id="outlined-search"
                      label="Client name"
                      type="search"
                      size="small"
                    />
                    <TextField
                      id="outlined-search"
                      label="Pet name"
                      type="search"
                      size="small"
                    />
                  </div>

                  <div>
                    <TextField
                      id="outlined-search"
                      label="Pet age"
                      type="number"
                      size="small"
                    />
                    <MuiPhoneNumber defaultCountry={"in"} />
                  </div>

                  <FormControl sx={{ m: 1, width: 450 }}>
                    <InputLabel id="demo-multiple-checkbox-label">
                      Services...
                    </InputLabel>
                    <Select
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      multiple
                      value={personName}
                      onChange={handleChange}
                      input={<OutlinedInput label="Tag" />}
                      renderValue={(selected) => selected.join(", ")}
                      MenuProps={MenuProps}
                    >
                      {names.map((name) => (
                        <MenuItem key={name} value={name}>
                          <Checkbox checked={personName.indexOf(name) > -1} />
                          <ListItemText primary={name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <button className="bg-amber-400 px-3 py-1 rounded-full text-white tracking-wide w-fit h-fit mx-auto my-auto hover:bg-amber-500 duration-300">
                    Submit
                  </button>
                </div>
              </div>
            </Box>
          </div>
        </div>
      ) : (
        ""
      )}

      {/* ----------------------user appointent book form end---------------- */}
      <div className="h-[90vh] w-[90%]  shadow-md rounded-md grid grid-rows-2 my-8 p-5">
        {/* ---------------------------top--------------------------- */}
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
          <div className="flex flex-col justify-around">
            <h1 className="text-2xl text-gray-700 tracking-wide ">
              Appointments
            </h1>

            {/* ----------------calender----------------- */}
            <div>
              <div className="w-2/3">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker value={pickeDate} onChange={handleCalender} />
                </LocalizationProvider>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-around items-center">
            <h1 className="text-3xl font-semibold tracking-wide">Shop Name</h1>
            <button
              className="bg-blue-500 hover:scale-110 duration-300 px-3 py-1 rounded-full shadow-lg text-white text-lg tracking-wide font-medium font-mono"
              onClick={() => setShowUserForm(true)}
            >
              Book user Appointmet
            </button>

            <div className=" box h-12 w-12 flex cursor-pointer hover:py-[10px] hover:px-[20px] bg-[#ececec] rounded-full items-center justify-center shadow-lg   duration-700 hover:w-[400px]">
              <input
                className="w-0 outline-none border-none font-medium  duration-700 bg-transparent  "
                type="text"
                placeholder="Search user..."
              />
              <img src="/img/search.svg" alt="" className=" h-8 w-8" />
            </div>
          </div>

          {/* ------------------------------profile----------------------------- */}
          <div className="grid grid-rows-2">
            <div className="flex items-start justify-center">
              <div className="relative ">
                <button className="font-semibold text-5xl border-2 hover:border-amber-700 duration-300 p-4 h-20 w-20 flex items-center justify-center rounded-full mx-auto bg-amber-400 text-white">
                  <span className="-mt-2">+</span>
                </button>

                <p className="text-gray-700 font-medium tracking-wide">
                  Create profile
                </p>
              </div>

              <div className="flex flex-col h-full justify-between pb-10 ">
                <div className="relative flex flex-col items-center  h-[70px] w-full -right-20">
                  <button
                    onClick={() => setIsOpenProfile((prev) => !prev)}
                    className=" flex-col font-bold  duration-500 active:text-white"
                  >
                    <img
                      src="/img/user.jpg"
                      className="rounded-full h-20 w-20 object-cover mx-auto"
                    />
                    <div className="flex items-center justify-between">
                      <h2 className="text-base font-mono font-semibold text-gray-600 hover:text-gray-800">
                        Lucy, 11MTH
                      </h2>
                      {!isOpenProfile ? (
                        <img src="/img/arrow.svg" className="h-8" />
                      ) : (
                        <img src="/img/up-arrow.svg" className="h-8" />
                      )}
                    </div>
                  </button>

                  {isOpenProfile && (
                    <div className=" absolute top-32 flex flex-col items-start space-y-3 w-[200%] bg-gray-50 shadow-lg rounded-md p-3 z-20">
                      <ul>
                        <li className="text-base font-semibold tracking-wide text-gray-700">
                          Name :{" "}
                          <span className="font-medium  text-gray-600">
                            John Calley
                          </span>{" "}
                        </li>
                        <li className="text-base font-semibold tracking-wide text-gray-700">
                          Shop name :{" "}
                          <span className="font-medium  text-gray-600">
                            XYZ grooming{" "}
                          </span>
                        </li>
                        <li className="text-base font-semibold tracking-wide text-gray-700">
                          Address :{" "}
                          <span className="font-medium  text-gray-600">
                            XYZ street, Vikash nagar Banglore{" "}
                          </span>
                        </li>
                        <li className="text-base font-semibold tracking-wide text-gray-700">
                          Mobile no. :{" "}
                          <span className="font-medium  text-gray-600">
                            +91 9876543210{" "}
                          </span>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center space-x-3">
              <Link href={"/calender"}>
                <button className="bg-blue-500 hover:scale-110 duration-300 px-3 py-1 rounded-full shadow-lg text-white text-lg  font-medium font-mono w-fit mx-auto  relative ">
                  User profile
                </button>
              </Link>

              <button className="bg-blue-500 hover:scale-110 duration-300 px-3 py-1 rounded-full shadow-lg text-white text-lg  font-medium font-mono w-fit mx-auto  relative ">
                Dashboard
              </button>
            </div>
          </div>
        </div>

        {/* -----------------------bottom----------------------------------- */}
        <div>
          {/* -----------------------------dates tab------------------------- */}

          <div className="datesNeo rounded-full">
            <ul className="flex justify-center px-5 py-2">{listTag}</ul>
          </div>
          {/* ---------------------------date tab end-------------------------- */}


{/* ---------------------------slot start---------------------- */}

          <div className="grid grid-cols-4 gap-4 mt-7 w-11/12 px-4 py-1 h-44  overflow-y-scroll mx-auto">
            {slotData.map((elm, index) => (
              <div className='relative  py-[10px] px-2 list-none font-medium tracking-wider  text-base rounded-[40px] neoSlot hover:scale-100 flex justify-center space-x-2 items-center' key={index} onMouseEnter={()=>handelEnter(index)} onMouseLeave={()=>handleLeave(index)}>

              {showAvailability && hoverSlot===index &&
              <div id="animation" className="">
              <div
               data-tooltip={`${
                      elm.availability === false
                        ? "click to make slot available for your clients"
                        : elm.availability === true
                        ? "click to make slot unavailable for your clients"
                        :   ""
                    }`}
                    className="tooltip "
               > {elm.availability === true ? <img src="/img/unavailable.svg" alt=""  className="tooltip h-7 w-7 cursor-pointer hover:scale-105" onClick={()=>handleSlotAvailable(index)}/> : <img src="/img/available.svg" alt=""  className="tooltip h-7 w-7 cursor-pointer hover:scale-105 " onClick={()=>handleSlotUnavailable(index)}/>} </div>
              </div>
              }
                



<span  className={`${elm.availability === false ? "text-[#bfc2c5]" : "text-[#3b5167]"}`}>{elm.timeStart}{elm.startMeridian} - {elm.timeEnd}{elm.endMeridian}</span>

                <div id="animation">
                  <div
                    data-tooltip={`${
                      elm.status === "notBooked"
                        ? "click to book"
                        : elm.status === "pending"
                        ? "Your appointment is in pending you will be notifies once Shop Name will confirm"
                        : elm.status === "booked"
                        ? "Congratulatins, your appointment is accepted by Shop Name, You can re-schedule or cancel if needed."
                        : elm.status === "resheduled"
                        ? "your appointment is rescheduled by Shop name, Click on to accept"
                        : elm.status === "cancel"
                        ? "your appointment is canceled by Shop name , please book any other slot."
                        : ""
                    }`}
                    className={`${
                      elm.status === "notBooked"
                        ? ""
                        : elm.status === "pending"
                        ? "tooltip h-4 w-4 bg-red-600 animate-pulse duration-75"
                        : elm.status === "booked"
                        ? "tooltip h-4 w-4 bg-green-600"
                        : elm.status === "reshedule"
                        ? "tooltip h-4 w-4 bg-yellow-600"
                        : elm.status === "cancel"
                        ? "tooltip h-4 w-4 bg-red-600"
                        : ""
                    }  rounded-full`}
                    onClick={() => setShowAccptRej(!showAcctRej)}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          {/* ------------------------slot end---------------- */}
        </div>
      </div>
    </div>
  );
};

export default BusinessAppoint;
