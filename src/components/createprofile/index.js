import React, { useState } from 'react'
import { useRouter } from 'next/router'
// import { TextField } from '@mui/material'
// import { MultiSelect } from "@mantine/core";
import axios from 'axios'
import Link from 'next/link'
import Router from 'next/router'
import dynamic from 'next/dynamic';

import ProfilePicture from '@/components/utils/profilePicture'
const Modal = dynamic(() => import('@mantine/core').then((m) => m.Modal), {
  ssr: false,
});
const MultiSelect = dynamic(() => import('@mantine/core').then((m) => m.MultiSelect), {
  ssr: false,
});


const CreateProfile = ({userdata,userprofiledata}) => {
    const [opened, setOpened] = useState(false);
    const [available, notAvailable] = useState(true)
    const [userData, setUserData] = useState({})
    const [userName, setUserName] = useState("")
    const [timerId, setTimerId] = useState(null)
    const [availUserName, setavailUserName] = useState(false)
    const [value, setValue] = useState([{ value: 'shetland sheepdog', label: 'Shetland sheepdog' }]);
    const [errMsg, setErrMsg] = useState({msg:"",status:false})
    const [profilePic,setProfilePic] = useState("")
    const [selectedImage,setSelectedImage] = useState(null)
    const [breeds,setBreeds] = useState(breedData)
    const [breedList, setBreedList] = useState([]);
    const router = useRouter();
    const [isloading, setIsLoading] = useState(false)


    // if(userdata.user.role !== "blogger"){
    //     return <div className="text-xl h-screen flex justify-center mt-20">Become a Blogger to create profile ! Click on write to get started !</div>
    // }
    
    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }

    const handleUsername = (e) => {
        clearTimeout(timerId);

         if(validateText(e.target.value)){
            setavailUserName(false)
            return
        }
        if (!e.target.value) {
            setavailUserName(false)
            return;
        }

        setTimerId(
            setTimeout(async () => {
                console.log("execute")
                await axios.get(`/api/info/checkusername/${e.target.value}`).then(res => setavailUserName(res.data.avail))
                setUserName(e.target.value) 
                setUserData({ ...userData, username: e.target.value })
            }, 500)
        );
    }


    function validateText(text) {
     
      if (/^[0-9]/.test(text)) {
        return true
      }

      if (/[^A-Za-z0-9]/.test(text)) {
        return true
      }
      // alert(text)
      return false
    }

      // text = text.replace(/\s/g, "_");

    const handleForm = async () => {
        const { bio, firstname, lastname, noofdog, username } = userData

        // if(validateText(username)){
        //     alert("username can't contain special charater")
        //     return
        // }

        if(!availUserName){
            alert("username already exist or invalid name")
            return
        }
        if(!firstname){
            alert("please add your firstname")
            return
        }
        if(!lastname){
            alert("please add your lastname")
            return
        }
        if(!username){
            alert("please add your username")
        }
        if(!bio){
            alert("add some bio")
            return
        }

        setIsLoading(true)

        const formData = new FormData();
        formData.append("bio", bio)
        formData.append("firstname", firstname)
        formData.append("lastname", lastname)
        formData.append("noofdog", noofdog)
        formData.append("username", username)
        formData.append("profilePic", profilePic)
        formData.append("breeds", JSON.stringify(breedList))


            await axios.post("/api/info/createprofile", formData,{
                  headers: {
                    'Content-Type': 'multipart/form-data'
                  }
                })
                .then(response => {
                    console.log(response);
                    setIsLoading(false)
                    return Router.push(`/profile/${userdata.user._id}`)
                })
                .catch(error => {
                    console.log(error);
                    setOpened(true)
                    setIsLoading(false)
                    setErrMsg({...errMsg,status:true,msg:error.response.statusText,text:error.response.data.msg})
                });  

    }

    console.log(errMsg)

    return (
      <div className="max-w-[900px] mx-auto bg-white">
      <div className="grid grid-rows-[8] gap-4 md:px-40 sm:px-24 px-16 py-10">
       
      <div className='text-3xl text-gray-700'>
         <h1 className='mx-auto w-fit'>Create profile</h1>
      </div>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={errMsg.msg}
      >
      {errMsg.text}
      </Modal>

      
       <div className="row-span-2">
            <ProfilePicture setPic={setProfilePic} selectedImage = {selectedImage} setSelectedImage={setSelectedImage} defPic={userdata.user.profilePic ? userdata.user.profilePic : "img/defaultProfile.jpg" }/>          
       </div>
      
         
   
         <div className="mx-auto max-w-[900px]">
         <div className="flex items-center gap-6">
         <div className="flex flex-col">
         <label className="text-sm font-medium text-gray-500 my-1">
               Username
         </label>
         <div className="flex items-center gap-3">
         <input 
            onChange={handleUsername} 
            className="p-2 bg-[#e9ecef]  border text-sm rounded" 
            name="username" 
            placeholder="Username"
        />
         <div className="text-center">
      
         {
            userName ? 
                     
            availUserName ? <div className='flex items-center gap-2'>
                 <p className="text-sm text-blue-500">Availabe</p>
                 <img src="/img/check.png" className='h-6' alt="" />
               </div> : <div className='flex items-center gap-2'>
                 <img src="/img/cross.png" className='h-6' alt="" />
                 <p className="text-sm text-red-500">Not availabe</p>
               </div>
              :<></>
         }


         </div>
         </div>

        </div>
         
           
         </div>
            
         </div>
   
         <div >
         <div className="grid grid-cols-2 gap-6">
         <div className="flex flex-col">
         <label className="text-sm font-medium text-gray-500 my-1">
               First Name
         </label>
         <input onChange={handleChange} 
              name="firstname" 
              className="p-2 bg-[#e9ecef]  border text-sm rounded"
              placeholder="First Name"
          />
          </div>
          <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-500 my-1">
               Last Name
         </label>
         <input 
              onChange={handleChange} 
              className="p-2 bg-[#e9ecef]  border text-sm rounded"
              placeholder="Last Name"
              name="lastname"
        />
         </div>
           </div>
         </div>
   
         <div className="grid grid-cols-2">
         <div className="flex flex-col">
         <label className="text-sm font-medium text-gray-500 my-1">
               No of dogs
         </label>
         <input 
           name="noofdog" 
           onChange={handleChange} 
           type="number"
           min="0"
            className="p-2 bg-[#e9ecef]  border text-sm rounded w-28"
            placeholder="No of dogs"
         />
         </div>
         </div>
           
           <div>
             <label className="text-sm font-medium text-gray-500 my-1">
               Select Breeds
             </label>
             <MultiSelect
                      data={breeds}
                      placeholder="Select Breeds"
                      searchable
                      creatable
                      getCreateLabel={(query) => `+ Create ${query}`}
                      onCreate={(query) => {
                        const item = { value: query, label: query };
                        setBreeds((current) => [...current, item]);
                        return item;
                      }}
                      value={breedList}
                      onChange={setBreedList}
                    />
           </div>

   
         <div className="row-span-2">
         <label className="block mb-1 text-sm font-medium text-gray-400">
            Sort Bio <span className='text-gray-400 font-normal'>(max 300 character)</span>
           </label>
           
           <textarea
             id="message"
             rows="4"
             maxLength={300}
             className="p-2 bg-[#e9ecef]  border text-sm rounded w-full"
             placeholder="Write here...✍️"
             onChange={handleChange}
             name="bio"
           ></textarea>
         </div>
   
         
         <div className="flex justify-end space-x-5 items-center">
         <button onClick={handleForm} className={`w-1/4 text-xs ${isloading ?"bg-gray-400":"bg-gray-800" } px-3 py-2 text-gray-50 rounded font-medium`} name="submit" disabled={isloading ? true :false}>Submit</button>
         </div>
         
       </div>
       </div>


    )
}


export default CreateProfile



const breedData = [
    { value: 'afghan hound', label: 'Afghan hound' },
    { value: 'airedale terrier', label: 'Airedale terrier' },
    { value: 'akita', label: 'Akita' },
    { value: 'alaskan Malamute', label: 'Alaskan Malamute' },
    { value: 'american Staffordshire terrier', label: 'American Staffordshire terrier' },
    { value: 'american water spaniel', label: 'American water spaniel' },
    { value: 'australian cattle dog', label: 'Australian cattle dog' },
    { value: 'australian shepherd', label: 'Australian shepherd' },
    { value: 'australian terrier', label: 'Australian terrier' },
    { value: 'aasenji', label: 'basenji' },
    { value: 'aasset hound', label: 'basset hound' },
    { value: 'beagle', label: 'beagle' },
    { value: 'bearded collie', label: 'bearded collie' },
    { value: 'bedlington terrier', label: 'Bedlington terrier' },
    { value: 'bernese mountain dog', label: 'Bernese mountain dog' },
    { value: 'bichon frise', label: 'bichon frise' },
    { value: 'black and tan coonhound', label: 'black and tan coonhound' },
    { value: 'bloodhound', label: 'bloodhound' },
    { value: 'border collie', label: 'border collie' },
    { value: 'border terrier', label: 'border terrier' },
    { value: 'borzoi', label: 'borzoi' },
    { value: 'boston terrier', label: 'Boston terrier' },
    { value: 'bouvier des Flandres', label: 'bouvier des Flandres' },
    { value: 'boxer', label: 'boxer' },
    { value: 'briard', label: 'briard' },
    { value: 'brittany', label: 'Brittany' },
    { value: 'brussels griffon', label: 'Brussels griffon' },
    { value: 'bull terrier', label: 'bull terrier' },
    { value: 'bulldog', label: 'bulldog' },
    { value: 'bullmastiff', label: 'bullmastiff' },
    { value: 'cairn terrier', label: 'cairn terrier' },
    { value: 'banaan dog', label: 'Canaan dog' },
    { value: 'bhesapeake Bay retriever', label: 'Chesapeake Bay retriever' },
    { value: 'bhihuahua', label: 'Chihuahua' },
    { value: 'bhinese crested', label: 'Chinese crested' },
    { value: 'bhinese shar-pei', label: 'Chinese shar-pei' },
    { value: 'chow chow', label: 'chow chow' },
    { value: 'blumber spaniel', label: 'Clumber spaniel' },
    { value: 'cocker spaniel', label: 'cocker spaniel' },
    { value: 'collie', label: 'collie' },
    { value: 'curly-coated retriever', label: 'curly-coated retriever' },
    { value: 'dachshund', label: 'dachshund' },
    { value: 'balmatian', label: 'Dalmatian' },
    { value: 'boberman pinscher', label: 'Doberman pinscher' },
    { value: 'bnglish cocker spaniel', label: 'English cocker spaniel' },
    { value: 'bnglish setter', label: 'English setter' },
    { value: 'bnglish springer spaniel', label: 'English springer spaniel' },
    { value: 'bnglish toy spaniel', label: 'English toy spaniel' },
    { value: 'bskimo dog', label: 'Eskimo dog' },
    { value: 'binnish spitz', label: 'Finnish spitz' },
    { value: 'flat-coated retriever', label: 'flat-coated retriever' },
    { value: 'fox terrier', label: 'fox terrier' },
    { value: 'foxhound', label: 'foxhound' },
    { value: 'French bulldog', label: 'French bulldog' },
    { value: 'berman shepherd', label: 'German shepherd' },
    { value: 'berman shorthaired pointer', label: 'German shorthaired pointer' },
    { value: 'berman wirehaired pointer', label: 'German wirehaired pointer' },
    { value: 'golden retriever', label: 'golden retriever' },
    { value: 'bordon setter', label: 'Gordon setter' },
    { value: 'breat Dane', label: 'Great Dane' },
    { value: 'greyhound', label: 'greyhound' },
    { value: 'irish setter', label: 'Irish setter' },
    { value: 'irish water spaniel', label: 'Irish water spaniel' },
    { value: 'irish wolfhound', label: 'Irish wolfhound' },
    { value: 'jack Russell ', label: 'Jack Russell ' },
    { value: 'terrier', label: 'terrier' },
    { value: 'japanese spaniel', label: 'Japanese spaniel' },
    { value: 'keeshond', label: 'keeshond' },
    { value: 'kerry blue terrier', label: 'Kerry blue terrier' },
    { value: 'komondor', label: 'komondor' },
    { value: 'kuvasz', label: 'kuvasz' },
    { value: 'labrador retriever', label: 'Labrador retriever' },
    { value: 'lakeland terrier', label: 'Lakeland terrier' },
    { value: 'lhasa apso', label: 'Lhasa apso' },
    { value: 'maltese', label: 'Maltese' },
    { value: 'manchester terrier', label: 'Manchester terrier' },
    { value: 'mastiff', label: 'mastiff' },
    { value: 'mexican hairless', label: 'Mexican hairless' },
    { value: 'ewfoundland', label: 'Newfoundland' },
    { value: 'orwegian elkhound', label: 'Norwegian elkhound' },
    { value: 'orwich terrier', label: 'Norwich terrier' },
    { value: 'otterhound', label: 'otterhound' },
    { value: 'papillon', label: 'papillon' },
    { value: 'Pekingese', label: 'Pekingese' },
    { value: 'pointer', label: 'pointer' },
    { value: 'Pomeranian', label: 'Pomeranian' },
    { value: 'poodle', label: 'poodle' },
    { value: 'pug', label: 'pug' },
    { value: 'puli', label: 'puli' },
    { value: 'rhodesian ridgeback', label: 'Rhodesian ridgeback' },
    { value: 'rottweiler', label: 'Rottweiler' },
    { value: 'saint Bernard', label: 'Saint Bernard' },
    { value: 'saluki', label: 'saluki' },
    { value: 'samoyed', label: 'Samoyed' },
    { value: 'schipperke', label: 'schipperke' },
    { value: 'schnauzer', label: 'schnauzer' },
    { value: 'scottish deerhound', label: 'Scottish deerhound' },
    { value: 'scottish terrier', label: 'Scottish terrier' },
    { value: 'sealyham terrier', label: 'Sealyham terrier' },
    { value: 'shetland sheepdog', label: 'Shetland sheepdog' },

];