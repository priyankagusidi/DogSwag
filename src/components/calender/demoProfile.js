import React, { useState } from 'react';
import Dogdetail from './dogRegistration'
import { useRouter } from 'next/router'
import axios from 'axios'
// import DogProfiles from './dogProfiles'

function DogProfile() {
  const [activeBtn, setActiveBtn] = useState(0);
  const [openEditModal,setOpenEditModal] = useState(false)
  const [dogInfo,setDogInfo] = useState({})
  const [profilePic,setProfilePic] = useState("")
  const [selectedImage,setSelectedImage] = useState("/img/defaultProfile.jpg")

   const router = useRouter()
   function editProfile(){
        setOpenEditModal(true)
   }



    async function createProfile(e) {
    e.preventDefault();
      console.log(dogInfo) 
        const formData = new FormData();
        formData.append("name", dogInfo.name)
        formData.append("age", dogInfo.age)
        formData.append("profilePic",profilePic)
        formData.append("weight", dogInfo.weight)
        formData.append("parentsname", dogInfo.parentsname)
        formData.append("parentsaddress", dogInfo.parentsaddress)
        formData.append("parentsphoneno", dogInfo.parentsphoneno)
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
            console.log(res)
            router.push('/calender')
          })   
      } catch(e) {
        console.log(e);
      }
  }

  return (
    <div className="bg-amber-400 rounded-md relative">
      <h1 className='text-left pt-[30px] pl-[10px] md:text-2xl sm:text-xl text-lg font-semibold text-[#fff] font-[poppins]'>{"Dog's Profile"}</h1>
      <div className="border-bottom h-1 md:w-1/12 sm:w-[7%] w-[6%] ml-3 bg-gray-600 mt-2"></div>
      <div className="flex  justify-center md:p-5">
      
      <div className="flex md:flex-row-reverse  flex-col md:flex-row justify-center p-2  md:p-5 items-center  rounded-md">    
             
              <div className="-z-1">
                <img className='w-96 h-80 object-cover rounded-md '  src="/img/2.jpg" alt="" />
              </div>

              <div className=" rounded-md text-[#d3d4d6] bg-[#2d3a59] md:h-[300px] md:overflow-y-auto w-full p-5 z-50">
                <div className="flex justify-between mb-5">
                  <h3 className='md:text-xl sm:text-lg font-bold'>{"Dog's Details"}</h3>
                  <button className="bg-white text-black w-24 rounded-md" onClick={editProfile}>Edit</button>
                  {/*<button className="schedule md:py-1 sm:py-[0.2rem] py-[0.16rem] md:px-3 sm:px-[0.7rem] px-[0.65rem] md:text-base sm:text-[0.9rem] text-[0.85rem]">Schedule</button>*/}
                </div>
<div className="text-sm">
  <p className='leading-6 '><span className="font-semibold">{"Dog's name "}:</span>
    Max
  </p>
  <p className='leading-6 '><span className="font-semibold">{"Dog's breed "}:</span>
    Labrador Retriever
  </p>
  <p className='leading-6 '><span className="font-semibold">{"Dog's weight "}:</span>
    25 kilograms
  </p>
  <p className='leading-6 '><span className="font-semibold">{"Dog's Age "}:</span>
    3 years
  </p>
  <p className='leading-6 '><span className="font-semibold">{"Parent's name "}:</span>
    Sarah Thompson
  </p>
  <p className='leading-6 '><span className="font-semibold">{"Parent's address "}:</span>
    123 Main Street, Anytown, USA
  </p>
  <p className='leading-6 '><span className="font-semibold">{"Parent's phone no. "}:</span>
    +1 (555) 123-4567
  </p>
  <p className='leading-6 '><span className="font-semibold">{"Vet's name "}:</span>
    Dr. Jessica Anderson
  </p>
  <p className='leading-6 '><span className="font-semibold">{"Vet's phone no. "}:</span>
    +1 (555) 987-6543
  </p>
  <p className='leading-6 '><span className="font-semibold">{"Emergency person's name "}:</span>
    David Johnson
  </p>
  <p className='leading-6 '><span className="font-semibold">{"Emergency phone's no. "}:</span>
    +1 (555) 789-0123
  </p>
</div>
            </div>
        </div>
      </div>
      <Dogdetail profilePic={profilePic} setProfilePic={setProfilePic} selectedImage={selectedImage} setSelectedImage={setSelectedImage} dogInfo={dogInfo} setDogInfo={setDogInfo} createProfile={createProfile} openEditModal={openEditModal} setOpenEditModal={setOpenEditModal}/>
      
    </div>
  );
}
export default DogProfile;



