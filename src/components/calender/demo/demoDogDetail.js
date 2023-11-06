import React, { useState } from 'react';
import Dogdetail from '../dogRegistration'
import { useRouter } from 'next/router'
import axios from 'axios'
import Caras from '@/components/utils/carousel'


function DogProfile() {
  
  const [activeBtn, setActiveBtn] = useState(0);
  const [openEditModal,setOpenEditModal] = useState(false)
  const [dogInfo,setDogInfo] = useState({})
  const [profilePic,setProfilePic] = useState("")
  const [selectedImage,setSelectedImage] = useState("/img/defaultprofile.jpg")

   const router = useRouter()
   function editProfile(){
        setOpenEditModal(true)
   }


    async function createProfile(e) {
    e.preventDefault();
      console.log(dogInfo) 
        setOpenEditModal(false)
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
            router.push('/do')
            return
          })   
      } catch(e) {
        console.log(e);
      }
  }

  return (

  <div className="bg-amber-200 rounded-md relative">
      <div className="text-gray-700">
<div className="flex justify-between p-5">
                  <h3 className='md:text-xl sm:text-lg font-bold'>{"Dog Profile"}</h3>
                  <div className="flex gap-2 text-sm">
                  </div>
                </div>
        <div className="md:items-center flex md:flex-row-reverse flex-col md:flex-row rounded-md  md:overflow-y-auto w-full p-5">
            <div className="-z-1 md:w-6/12"> 
                <Caras images={["/img/coverpic.jpeg"]} style={"w-full  md:h-80 object-contain rounded-md"}/>
             </div>

   <div className="text-sm">
  <p className='leading-6 '><span className="font-semibold">{"Dog's name :"}</span>
    Max
  </p>
  <p className='leading-6 '><span className="font-semibold">{"Dog's breed :"}</span>
    Labrador Retriever
  </p>
  <p className='leading-6 '><span className="font-semibold">{"Dog's weight :"}</span>
    25 kilograms
  </p>
  <p className='leading-6 '><span className="font-semibold">{"Dog's Age :"}</span>
    3 years
  </p>
  <p className='leading-6 '><span className="font-semibold">{"Parent's name :"}</span>
    Sarah Thompson
  </p>
  <p className='leading-6 '><span className="font-semibold">{"Parent's address :"}</span>
    123 Main Street, Anytown, USA
  </p>
  <p className='leading-6 '><span className="font-semibold">{"Parent's phone no. :"}</span>
    +1 (555) 123-4567
  </p>
  <p className='leading-6 '><span className="font-semibold">{"Vet's name :"}</span>
    Dr. Jessica Anderson
  </p>
  <p className='leading-6 '><span className="font-semibold">{"Vet's phone no. :"}</span>
    +1 (555) 987-6543
  </p>
  <p className='leading-6 '><span className="font-semibold">{"Emergency person's name :"}</span>
    David Johnson
  </p>
  <p className='leading-6 '><span className="font-semibold">{"Emergency phone's no. :"}</span>
    +1 (555) 789-0123
  </p>
</div>
</div>
</div>    
       <Dogdetail profilePic={profilePic} setProfilePic={setProfilePic} selectedImage={selectedImage} setSelectedImage={setSelectedImage} dogInfo={dogInfo} setDogInfo={setDogInfo} createProfile={createProfile} openEditModal={openEditModal} setOpenEditModal={setOpenEditModal}/>
    </div>
    
  );
}
export default DogProfile;
