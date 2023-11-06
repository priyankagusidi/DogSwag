import React, { useState,useRef,useEffect } from "react"; 
import {Modal} from '@mantine/core'
import ProfilePicture from '@/components/utils/profilePicture'
// import MemeUpload from '@/components/utils/memeUpload'
// import ImageContainer from '@/components/woofwoof/meme/imageContainer';
// import { DndProvider } from 'react-dnd';
import dynamic from 'next/dynamic'
const PhoneInput = dynamic(() => import('react-phone-number-input'), {
    ssr: false,
});
import { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import OtpInput from 'react-verify-otp';
import { Select } from '@mantine/core';
import DefaultWeights from './defaultWeights'
import DefaultMonths from './defaultMonths'
import DefaultYears from './defaultYears'
import DefaultGender from './defaultGender'
import axios from 'axios'
import {toast} from 'react-toastify'
 
export default function RegistrationForm({profilePhone,setProfilePhone,weight,month,year,gender,setWeight,setMonth,setYear,setGender,phoneValue,setPhoneValue,profilePic,setProfilePic ,selectedImage,setSelectedImage,openEditModal,createProfile,dogInfo,setDogInfo,setOpenEditModal}) { 
    const [isSecActive, setIsSecActive] = useState(false); 
    const [isMemeModalOpen,setIsMemeModalOpen] = useState(false)
    const [sec,setSec] = useState(false)
    const [isNextActive,setNextActive] = useState(false)
    const otpRef = useRef(null);
    const [otp, setOtp] = useState('');

    const [genderData, setGenderData] = useState(DefaultGender)
    const [weightData, setWeightData] = useState(DefaultWeights)
    const [monthData, setMonthData] = useState(DefaultMonths)
    const [yearData, setYearData] = useState(DefaultYears)

    const [timer, setTimer] = useState(60);
    const [isActive, setIsActive] = useState(false);
    const [sendCount, setSendCount] = useState(0) 
    const [isVerified,setIsVerified] = useState(false)

    const handleChangeOtp = (otp) => {
        setOtp(otp)
    };
   
  // const [dogInfo,setDogInfo] = useState({})
  const handleNext = () => { 

            if (!dogInfo.name || !dogInfo.breed  || !dogInfo.parentsname || !dogInfo.city || !dogInfo.country) { 
              alert("Please fill all the fields.")
              return            
            } 
            if(!isVerified && !profilePhone){
                 toast('Please verify your phone number.')
                // setPhoneValue("")
                 return
            }
   
            setSec(true)
  }; 
 
  const handleBack = () => { 
    setIsSecActive(false); 
  }; 
 
useEffect(() => {
        let interval = null;

        if (isActive) {
            interval = setInterval(() => {
                setTimer(timer => timer - 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isActive]);

    const startTimer = () => {
        setIsActive(true);
        setSendCount(1);
    };

    useEffect(() => {
        if (timer === 0) {
            setIsActive(false);
            setTimer(60);
        }
    }, [timer]);



  const handleChange=(e)=>{
    setDogInfo({...dogInfo,[e.target.name]:e.target.value})
  }

   async function sendOtp() {
        startTimer()
        if (!phoneValue) {
            toast("phone number can't be empty")
                return
        }
        if (!isValidPhoneNumber(phoneValue)) {
            // alert("Invalid")
            toast("Invalid phoneno")
            return
        }

        try{
          await axios.post('/api/otp/create',{phoneno:phoneValue}).then(res=>{
              // console.log(res.data)
            })
        }catch(err){
          // console.log(err)
        }
    }


   // console.log(phoneValue)
   async function Save(){
       if(!isValidPhoneNumber(phoneValue)){
        toast("Invalid phoneno")
        return
      }
       try{
         await axios.post('/api/calender/number/verify',{phoneno:phoneValue,otp:otp}).then(res=>{
            // console.log(res.data)
            toast(res.data.msg)
            // setIsActive(false)
            setOtp("")
            // setPhoneValue("")
            setProfilePhone({number:phoneValue})
            setIsVerified(true)
         })

       }catch(err){
         // toast(res.data.msg)
         // console.log(err)
       }

   }


 
  return ( 
  

   <Modal
      opened={openEditModal}
      onClose={() => setOpenEditModal(false)}
      // title="Reminder"
      size={"lg"}
    >
    <div className="font-[Roboto] text-sm bg-white">
           <div className={sec ?"hidden":""}>
           
           <ProfilePicture setPic={setProfilePic} selectedImage = {selectedImage} setSelectedImage={setSelectedImage} defPic={"/img/defaultprofile.jpg"}/>          
           <div className="flex flex-col gap-2 w-full">
           <h1 className="text-xl font-bold">{"Pet Details"}</h1>
           <div className="grid grid-cols-2 gap-2">
               <div className="grid gap-2">
                   <label className="text-xs font-bold tracking-widest">{"Pet Name"}</label>
                   <input className="p-2 border  w-full" value={dogInfo.name}  onChange={handleChange}placeholder='Name' name="name"/>
                </div>
               <div className="grid gap-2">
                   <label className="text-xs font-bold tracking-widest">{"Pet Breed"}</label>
                   <input className="p-2 border  w-full" value={dogInfo.breed}  onChange={handleChange}placeholder='Breed' name="breed"/>
                </div>
                <div className="grid gap-2">
                   <label className="text-xs font-bold tracking-widest">{"Pet Gender"}</label>
                   {/*<input className="p-2 border  w-full" value={dogInfo.gender} onChange={handleChange} placeholder='Gender' name="gender"/>*/}
                   <Select
                  data={genderData}
                  placeholder="Weight"
                  nothingFound="Nothing found"
                  searchable
                  onChange={setGender}
                  creatable
                  getCreateLabel={(query) => `+ Create ${query}`}
                  onCreate={(query) => {
                    const item = { value: query, label: query+" "+"👉" };
                    setSectionData((current) => [...current, item]);
                    return item;
                  }}
                  value={gender}
                />
                </div>
                <div className="grid gap-2">
                   <label className="text-xs font-bold tracking-widest">{"Pet Weight"}</label>
                   {/*<input className="p-2 border  w-full" value={dogInfo.weight} onChange={handleChange} placeholder='Weight' name="weight"/>*/}
                 <Select
                  data={weightData}
                  placeholder="Weight"
                  nothingFound="Nothing found"
                  searchable
                  onChange={setWeight}
                  creatable
                  getCreateLabel={(query) => `+ Create ${query}`}
                  onCreate={(query) => {
                    const item = { value: query, label: query+" "+"👉" };
                    setSectionData((current) => [...current, item]);
                    return item;
                  }}
                  value={weight}
                />                   
                </div>

               <div className="grid gap-2">
                   <label className="text-xs font-bold tracking-widest">{"Pet Age"}</label>
                   {/*<input className="p-2 border  w-full" value={dogInfo.age}  onChange={handleChange}placeholder='Age' name="age"/>*/}
                 <div className="grid grid-cols-2 gap-2 max-w-[200px]">
                 <label className="text-xs text-center">Month</label>
                 <label className="text-xs text-center">Year</label>
                 <Select
                  data={monthData}
                  placeholder="Month"
                  nothingFound="Nothing found"
                  searchable
                  onChange={setMonth}
                  creatable
                  getCreateLabel={(query) => `+ Create ${query}`}
                  onCreate={(query) => {
                    const item = { value: query, label: query+" "+"👉" };
                    setSectionData((current) => [...current, item]);
                    return item;
                  }}
                  value={month}
                />  
                <Select
                  data={yearData}
                  placeholder="Year"
                  nothingFound="Nothing found"
                  searchable
                  onChange={setYear}
                  creatable
                  getCreateLabel={(query) => `+ Create ${query}`}
                  onCreate={(query) => {
                    const item = { value: query, label: query+" "+"👉" };
                    setSectionData((current) => [...current, item]);
                    return item;
                  }}
                  value={year}
                />  
                </div>
                </div>
           </div>
           </div>

           <div className="flex flex-col gap-2 mt-5">
           <h1 className="text-xl font-bold">{"Parent's Details"}</h1>
             <div className="grid gap-2">
               <label className="text-xs font-bold tracking-widest">{"Parent Name"}</label>
               <input className="p-2 border  w-full"value={dogInfo.parentsname}  onChange={handleChange} placeholder='Parent name' name="parentsname"/>
            </div>
           <div className="grid grid-cols-2 gap-2">

             <div className="grid gap-2">
                 <label className="text-xs font-bold tracking-widest">{"City"}</label>
                 <input className="p-2  border  w-full"value={dogInfo.city}  onChange={handleChange} placeholder='city' name="city"/>
            </div>
        
            <div className="grid gap-2">
                 <label className="text-xs font-bold tracking-widest">{"Country"}</label>
                 <input className="p-2  border  w-full"value={dogInfo.country}  onChange={handleChange} placeholder='country' name="country"/>
            </div>
            </div>

            {
                profilePhone ? 
                <div className="grid gap-2">
                  <label className="text-xs font-bold tracking-widest">{"Phone"}</label>
                   <div className="text-xs flex gap-2 items-center">{profilePhone.number} <span className="flex items-center"><img src="/assets/icons/tick.svg" className="w-4"/>Verified</span></div>

                </div>
                :
                <div className="grid gap-2">
                 <label className="text-xs font-bold tracking-widest">{"Mobile"}</label>
               <div className="flex text-xs">
                 {/*<input onChange={handlePhonNo} placeholder="phone number" className="p-2 outline outline-1 outline-gray-300 rounded-md"/>*/}
                
                     <div className="grid gap-3 w-full">
                      <div className="grid gap-2">
                         <label>Phone No<span className='text-gray-500'></span></label>
                         <PhoneInput
                            defaultCountry="IN"
                            placeholder="Enter phone number"
                            value={phoneValue}
                            onChange={setPhoneValue}
                            readOnly={isVerified}

                         />

         <div className="flex justify-end"><button disabled={isActive} onClick={sendOtp} className={`w-28   text-xs px-2 py-1 rounded ${!isActive? "bg-amber-500 text-white" :"bg-gray-300 text-gray-500"}`}>{isActive ? `Resend in ${timer}s` : !sendCount?"Send OTP": "Resend OTP" }</button> </div>


                      </div>
                      
                      <div className={`${isActive ? "": "hidden"} grid gap-2`}>
                        <div className="grid gap-2">
                         <label>Otp</label>

                     <OtpInput
                    ref={otpRef}
                    otpValue={otp}
                    onChange={handleChangeOtp}
                    separator={'-'}
                    styleOtpInput={"w-5 h-10 p-2"}
                      />
                      </div>
                      <div className="text-end">
                         <button className="bg-[brown] text-white  py-1 w-28 rounded-md" onClick={Save}>Verify</button>
                     </div>
                     </div>
                      </div>
               
                 {/*<button className="bg-amber-300 w-24 rounded-r-md" onClick={addPhoneNo}>Add</button>*/}
               </div>                 {/*<input className="p-2 border  w-full"value={dogInfo.parentsphoneno}  onChange={handleChange} placeholder='Phone No' name="parentsphoneno"/>*/}
            </div>
            }

            <div className="flex">
              <button className="p-2 text-white bg-amber-500 w-24 rounded-md" onClick={handleNext}>Next</button>
            </div>

          </div>
          </div>
          <div className={sec?"":"hidden"}>
          <div className="flex flex-col gap-2">
           <h1 className="text-xl font-bold">{"Vet (Optional)"}</h1>
           <div className="grid grid-cols-2 gap-2">
            <div className="grid gap-2">
                 <label className="text-xs font-bold tracking-widest">{"Name"}</label>
                 <input className="p-2 border  w-full"value={dogInfo.vetsname}  onChange={handleChange} placeholder="Vet's Name" name="vetsname"/>
            </div>
            <div className="grid gap-2">
                 <label className="text-xs font-bold tracking-widest">{"Mobile"}</label>
                 <input className="p-2 border  w-full"value={dogInfo.vetsphoneno}  onChange={handleChange} placeholder="Vet's Phone no." name="vetsphoneno"/>
            </div>
            </div>

          </div>

          <div className="flex flex-col gap-2 mt-5">
           <h1 className="text-xl font-bold">{"Emergengy Contact (Optional)"}</h1>
           <div className="grid grid-cols-2 gap-2">

            <div className="grid gap-2">
                 <label className="text-xs font-bold tracking-widest">{"Name"}</label>
                 <input className="p-2 border  w-full"value={dogInfo.emergencypersonsname}  onChange={handleChange} placeholder='Emergengy Person Name' name="emergencypersonsname"/>
            </div>
            <div className="grid gap-2">
                 <label className="text-xs font-bold tracking-widest">{"Mobile"}</label>
                 <input max={"10"} type="number" className="p-2 border  w-full"value={dogInfo.emergencypersonsphoneno}  onChange={handleChange} placeholder="Emergengy Person's Phone no" name="emergencypersonsphoneno"/>
            </div>
          </div>
          </div>
{/*
        <div className="mt-5 text-sm font-bold">
          Add cover picture
        </div>*/}
      <div className="mt-2">
  
          <div className="flex gap-2">
         <div className="flex">
              <button className="p-2 text-white bg-amber-500 w-24 rounded-md" onClick={()=>setSec(false)}>Back</button>
          </div>
          <div className="flex">
          <button id="register_dog_profile" className="p-2 text-white bg-amber-500 w-24 rounded-md" onClick={createProfile} >Save</button>
        </div>
        </div>
        </div>
    </div>
    </div>
    </Modal>
  )

} 
 
