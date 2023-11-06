import React, { useState ,useEffect} from 'react';
import axios from 'axios'
import Dogdetail from './dogRegistration'
import {useRouter} from 'next/router'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import { LoadingOverlay, Button, Group, Box } from '@mantine/core';


export default function App({trackEvent,addProfileRef,showDetail,setShowDetail,openEditModal,setOpenEditModal}){
	  
    const [profileList,setProfileList] = useState([])
    const [dogInfo,setDogInfo] = useState({})
    const [profilePic,setProfilePic] = useState("")
    const [selectedImage,setSelectedImage] = useState("/img/defaultprofile.jpg")
    const [phoneValue,setPhoneValue] = useState("")
    const [loading,setLoading] = useState(false)   
    const [weight,setWeight] = useState("10")
    const [month,setMonth] = useState("10")
    const [year,setYear] = useState("1")
    const [gender,setGender] = useState("Male")
    const router = useRouter()
    const [profilePhone,setProfilePhone] = useState({})
  
	// console.log(profileList)
	useEffect(()=>{
		getProfiles()
    getPhone()
	},[])
  
	function OpenCreateProfileModal(){
		// trackEvent('form','open','create profile form')
    setOpenEditModal(true)
	}

    async function getProfiles() { 	
    	try {
	        await axios.get(`/api/dogprofile/all`,
	        {
	          credentials: 'include'
	        }).then((res)=>{
	        	// console.log(res)
	        	setProfileList(res.data.profiles)
	        })	    	
	    } catch(e) {
	    	// console.log(e);
	    }
    }

async function getPhone() {  
      try {
          await axios.get(`/api/dogprofile/phoneno`,
          {
            credentials: 'include'
          }).then((res)=>{
            // console.log(res)
            setProfilePhone(res.data.findOnePhoneNumber)
          })        
      } catch(e) {
        setProfilePhone("")
        // console.log(e);
      }
    }


    async function createProfile(e) {
    e.preventDefault();
      // console.log(weight,gender,month,year)
      // return
      setLoading(true)
      // console.log(dogInfo) 
      setOpenEditModal(false)
        const formData = new FormData();
        formData.append("name", dogInfo.name)
        formData.append("age", dogInfo.age)
        formData.append("profilePic",profilePic)
        formData.append("weight",weight)
        formData.append("gender",gender)
        formData.append("month",month)
        formData.append("year",year)
        formData.append("breed",dogInfo.breed)
        // formData.append("weight", dogInfo.weight)
        formData.append("parentsname", dogInfo.parentsname)
        // formData.append("parentsaddress", dogInfo.parentsaddress)
        formData.append("city", dogInfo.city)
        formData.append("country", dogInfo.country)
        formData.append("parentsphoneno", phoneValue)
        formData.append("vetsname",dogInfo.vetsname )
        formData.append("vetsphoneno", dogInfo.vetsphoneno)
        formData.append("emergencypersonsname",dogInfo.emergencypersonsname )
        formData.append("emergencypersonsphoneno",dogInfo.emergencypersonsphoneno )
      try {
          await axios.post(`/api/dogprofile/create`,
            formData,
          {
             headers: {
                    'Content-Type': 'multipart/form-data'
            }
          }).then((res)=>{
            // console.log(res)
            toast("Profile Created!")
            setLoading(false)
            router.push(res && res.data && res.data.profileData ? `/do/${res.data.profileData._id}` : "/do")
            return
          })   
          getProfiles()    
          // getPhone() 
      } catch(e) {
        // console.log(e);
      }
  }

  function onProfileClick(id){
    if(id===router.query.id){
       setShowDetail(!showDetail)
       return
    }else {
      router.push(`/do/${id}`)
      return
    }

  }


const  customLoader = (
          <div className="flex flex-col items-center gap-3">
                <svg
    width="60"
    height="60"
    viewBox="0 0 38 38"
    xmlns="http://www.w3.org/2000/svg"
    stroke={"blue"}
  >
    <g fill="none" fillRule="evenodd">
      <g transform="translate(1 1)" strokeWidth="4">
        <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
        <path d="M36 18c0-9.94-8.06-18-18-18">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 18 18"
            to="360 18 18"
            dur="1s"
            repeatCount="indefinite"
          />
        </path>
      </g>
    </g>
  </svg>

 <div className="text-sm font-bold text-amber-900">Creating Profile</div>
          </div>
      )

if(loading){
     return(
        <LoadingOverlay visible={loading} loader={customLoader} overlayBlur={2} />
      )
}

    // console.log(router.query.id)
	
	return(
		   <div className="bg-amber-200 p-4">
        <ToastContainer />
		  	<div className="flex space-x-4 overflow-x-auto p-2">
       <div  className="flex-shrink-0" onClick={OpenCreateProfileModal}>
          <div
             id="create_profile" ref={addProfileRef} className="w-20 h-20 rounded-full text-3xl hover:bg-gray-100 flex items-center justify-center object-cover border-2 border-white p-0.5 bg-white hover:cursor-pointer"
          >
          +
          </div>
          <p  className="text-sm text-center mt-1">Add Profile</p>
        </div>

      {profileList && profileList.map(story => (
        <div key={story._id} className="flex-shrink-0">
          <img
            onClick={()=>onProfileClick(story._id)}
            className={`w-20 h-20 rounded-full object-cover ${router.query.id === story._id ? "border-2 border-amber-800":""} p-0.5 hover:cursor-pointer`}
            src={story.profilePic || "/img/defaultprofile.jpg"}
            alt={story.username}
          />
          <p className="text-sm text-center mt-1">{story.name && story.name.length > 5 ? story.name.slice(0,5) : story.name}</p>
        </div>
      ))}
       
    </div>
      <Dogdetail setProfilePhone={setProfilePhone} profilePhone={profilePhone} gender={gender} setGender={setGender} weight={weight} setWeight={setWeight} month={month} setMonth={setMonth} year={year} setYear={setYear} phoneValue={phoneValue} setPhoneValue={setPhoneValue} profilePic={profilePic}setProfilePic={setProfilePic} selectedImage={selectedImage} setSelectedImage={setSelectedImage} dogInfo={dogInfo} setDogInfo={setDogInfo} createProfile={createProfile} openEditModal={openEditModal} setOpenEditModal={setOpenEditModal}/>
      
		  	</div>
		)
}