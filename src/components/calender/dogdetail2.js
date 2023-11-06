import {Modal} from '@mantine/core'
import React, { useState } from 'react';
import { useRouter } from 'next/router'
import axios from 'axios'

export default function DogDetails({onedogprofiledata}){

  const [openEditProfileModal,setOpenEditProfileModal] = useState(false) 
  const [isEditing,setIsEditing] = useState(false) 
  const [dogProfileInfo,setDogProfileInfo] = useState(onedogprofiledata && onedogprofiledata.profileData?onedogprofiledata.profileData : {})
  


  function openEditModal(){
    setIsEditing(!isEditing)
  }

  function handleChange(e){
      setDogProfileInfo({...dogProfileInfo,[e.target.name]:e.target.value})
  }
  const router = useRouter()

 async function SaveProfile(){
    try{
    await axios.put(`/api/dogprofile/profile/edit/${router.query.id}`,dogProfileInfo,{
            credentials: 'include'
    }).then(res=>{
      console.log(res)
    })
    }catch(e){
       console.log(e)
    }
 }


	return(
		   <div className="">
    
      <div className="bg-amber-100 mx-auto shadow-md rounded-md p-5 relative text-gray-900">
        <div className="max-w-7xl mx-auto bg-white shadow-md rounded-md p-3">
           <div className="flex justify-between text-xs font-bold items-center relative">
              <div className="grid">
              
              <div className="rounded-md shadow w-24 h-24 bg-gray-200"></div>
              {
                isEditing ? 
                <input placeholder="Dog's name" className="font-bold text-2xl p-2 mt-2 font-[roboto] bg-white border border-gray-400 rounded-md"/>:
                <h1 className="font-bold text-2xl mt-2 font-[roboto]">{dogProfileInfo.name}</h1>
              }

             {
                isEditing ? 
                <input placeholder="Dog's breed" className="font-bold p-2 mt-2 font-[roboto] bg-white border border-gray-400 rounded-md"/>:
                <span className="text-sm  font-[roboto] text-amber-800">{dogProfileInfo.breed}</span>
              }

              </div>

              <div className="flex gap-2 absolute right-4 top-4 text-white px-2">
                <select className="border border-gray-500 text-black rounded-md">
                   <option className="p-2 bg-amber-200 text-black">Davis</option>
                   <option className="p-2 bg-amber-200 text-black">Jerin</option>
                   <option className="bg-amber-800 text-white">+ Add more</option>
                </select>
                <button className={`p-2 ${isEditing? "bg-green-500":"bg-blue-200 text-black"} w-24 shadow-md border-gray-400 rounded-md`} onClick={()=>openEditModal()}>{isEditing ?"Save":"Edit"}</button>
                <button className="p-2 bg-red-300 text-black rounded-md">Delete</button>
              </div>
        </div>
        <div className="grid grid-cols-3 gap-2  max-w-xs mt-2">
          <div>
            <h1 className="text-xs font-bold">AGE</h1>
            {
                isEditing ? 
                <input placeholder="age" className="w-24 text-sm font-bold p-2 mt-2 font-[roboto] bg-white border border-gray-400 rounded-md"/>:
                <span className="text-sm  font-[roboto] text-amber-800">{dogProfileInfo.age?dogProfileInfo.age:"N/A"}</span>                        
              }
          </div>
          <div>
            <h1 className="text-xs font-bold">Weight</h1>

             {
                isEditing ? 
                <input placeholder="weight" className="w-24 text-sm font-bold p-2 mt-2 font-[roboto] bg-white border border-gray-400 rounded-md"/>:
                <span className="text-sm  font-[roboto] text-amber-800">{dogProfileInfo.weight?dogProfileInfo.weight:"N/A"}</span>                        
              }
          </div>
          <div>
            <h1 className="text-xs font-bold">Gender</h1>

          {
                isEditing ? 
                <input placeholder="Dog's gender" className="w-28 text-sm font-bold p-2 mt-2 font-[roboto] bg-white border border-gray-400 rounded-md"/>:
                <span className="text-sm  font-[roboto] text-amber-800">{dogProfileInfo.gender?dogProfileInfo.gender:"N/A"}</span>                        
              }
          </div>
        </div>
         <div className="flex gap-2 justify-between max-w-xl mt-2">
          <div className="w-full">
            <h1 className="text-xs font-bold">Location</h1>
              {
                isEditing ? 
                <textarea placeholder="Address" className="text-sm w-full font-bold p-2 mt-2 font-[roboto] bg-white border border-gray-400 rounded-md"/>:
                <span className="text-sm  font-[roboto] text-amber-800">{dogProfileInfo.address?dogProfileInfo.address:"N/A"}</span>                        
              }
          </div>
        </div>
        <div className="grid gap-2 grid-cols-3 flex-col  mt-2">
        <div className="grid gap-2">
          <div>
            <h1 className="text-xs font-bold">{"Parent's Name"}</h1>
              {
                isEditing ? 
                <input placeholder="Parent's name" className="text-sm w-full font-bold p-2 mt-2 font-[roboto] bg-white border border-gray-400 rounded-md"/>:
                <span className="text-sm  font-[roboto] text-amber-800">{dogProfileInfo.parentsname?dogProfileInfo.parentsname:"N/A"}</span>                        
              }
          </div>
           <div>
            <h1 className="text-xs font-bold">Phone no</h1>
            {
                isEditing ? 
                <input placeholder="Parent's phone no" className="text-sm w-full font-bold p-2 mt-2 font-[roboto] bg-white border border-gray-400 rounded-md"/>:
                <span className="text-sm  font-[roboto] text-amber-800">{dogProfileInfo.parentsphoneno?dogProfileInfo.phoneno : "N/A"}</span>                                    
              }

          </div>

        </div>
        <div className="grid gap-2">

           <div>
            <h1 className="text-xs font-bold">{"Vet's Name"}</h1>
            {
                isEditing ? 
                <input placeholder="Vet's age" className="text-sm w-full font-bold p-2 mt-2 font-[roboto] bg-white border border-gray-400 rounded-md"/>:
                <span className="text-sm font-[roboto] text-amber-800">{dogProfileInfo.vetsname?dogProfileInfo.vetsname:"N/A"}</span>                                    
              }
          </div>
           <div>
            <h1 className="text-xs font-bold">Phone no</h1>
           {
                isEditing ? 
                <input placeholder="Vet's phone no" className="text-sm w-full font-bold p-2 mt-2 font-[roboto] bg-white border border-gray-400 rounded-md"/>:
                <span className="text-sm  font-[roboto] text-amber-800">{dogProfileInfo.phoneno?dogProfileInfo.phoneno:"N/A"}</span>                                    
              }
          </div>
        </div>
        <div className="grid gap-2">


          <div>
             <h1 className="text-xs font-bold">{"Emergengy Person's Name"}</h1>
          {
                isEditing ? 
                <input placeholder="Emergengy person's name" className="text-sm w-full font-bold p-2 mt-2 font-[roboto] bg-white border border-gray-400 rounded-md"/>:
                <span className="text-sm  font-[roboto] text-amber-800">{dogProfileInfo.emergencypersonsname?dogProfileInfo.emergencypersonsname:"N/A"}</span>                                    
              }
          </div>
           <div>
            <h1 className="text-xs font-bold">Phone no</h1>
           {
                isEditing ? 
                <input placeholder="Emergengy person's phone no" className="text-sm w-full font-bold p-2 mt-2 font-[roboto] bg-white border border-gray-400 rounded-md"/>:
                <span className="text-sm  font-[roboto] text-amber-800">{dogProfileInfo.emergencypersonsphoneno?dogProfileInfo.emergencypersonsphoneno:"N/A"}</span>                                    
              }
          </div>

        </div>

          </div>
        </div>
        </div>
        </div>
		)
}