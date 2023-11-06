import React, { useState,useEffect } from 'react';
import Dogdetail from './dogdetail'
import { useRouter } from 'next/router'
import axios from 'axios'
import DogProfiles from './dogprofileList'
import Caras from '@/components/utils/carousel'
import Router from 'next/router'


function DogProfile({onedogprofiledata}) {
  const [activeBtn, setActiveBtn] = useState(0);
  const [openEditModal,setOpenEditModal] = useState(false)
  const [dogInfo,setDogInfo] = useState({})
  const [coverImageList,setCoverImageList] = useState([])
  const [cv,setcv]= useState([])
  const slide = React.useRef(null);
  const router = useRouter()
  const [profilePic,setProfilePic] = useState("")
  const [selectedImages,setSelectedImages] = useState("")
  const [defPic,setDefPic] = useState("")
  const [weight,setWeight] = useState("")
  const [month,setMonth] = useState("")
  const [year,setYear] = useState("")
  const [gender,setGender] = useState("")
  const [profilePhone,setProfilePhone] =useState({})
  const handleClick = (i) => {
    setActiveBtn(i);
    slide.current.style.transform = `translateX(-${800*i}px)`;
  }
  
  async function fetchProfileData(){
    try{
       await axios.get(`/api/dogprofile/profile/${router.query.id}`).then(res=>{
          // console.log(res)
          setDogInfo(res && res.data && res.data.profileData?res.data.profileData : {})
          setcv(res && res.data && res.data.profileData && res.data.profileData.coverPictures && res.data.profileData.coverPictures.length > 0 ? res.data.profileData.coverPictures : ["/img/coverpic.jpeg"])
          // setSelectedImages(res && res.data && res.data.profileData && res.data.profileData.profilePic?res.data.profileData.profilePic : "/img/defaultprofile.jpg")
       })
    }
    catch(e){
       // console.log(e)
    }
  }
  
  useEffect(()=>{
      fetchProfileData()
  },[router.query.id])

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
        setProfilePhone({number:""})
        // console.log(e);
      }
    }

  useEffect(()=>{
      getPhone()
  },[])

  function handleChange(e){
      setDogInfo({...dogInfo,[e.target.name]:e.target.value})
  }

 async function SaveProfile(){
    try{
    await axios.put(`/api/dogprofile/profile/edit/${router.query.id}`,dogInfo,{
            credentials: 'include'
    }).then(res=>{
      // console.log(res)
      fetchProfileData()
      Router.reload();

    })
    }catch(e){
       // console.log(e)
    }
 }

 function editProfile(profile){
    setOpenEditModal(true)
    setSelectedImages(dogInfo.profilePic)
    setProfilePic(dogInfo.profilePic)
    setDefPic(dogInfo.profilePic)
    setWeight(dogInfo.weight)
    setMonth(dogInfo.month)
    setYear(dogInfo.year)
    setGender(dogInfo.gender)
    // setSelectedImage(profile.coverPictures)
    // setCoverImageList(profile.coverPictures)
 }

  async function deleteProfile(){
    try {

       const confirmed = confirm("Are you sure you want to delete this profile?");
       if(confirmed){
          await axios.delete(`/api/dogprofile/profile/delete/${router.query.id}`,
          {
            credentials: 'include'
          }).then((res)=>{
            // console.log(res)
            // router.push('/calender')
            window.location.replace("/do");
          })
       }
    } catch(e) {
      // statements
      // console.log(e);
    }
  }

  // console.log(dogInfo.coverPictures)

  return (
    <div className="bg-amber-200 rounded-md relative">
      <div className="text-gray-700 ">
        <div className="flex md:flex-row-reverse flex-col md:flex-row rounded-md  md:overflow-y-auto w-full p-2 md:p-5">
            <div className="-z-1 md:w-6/12"> 
                <Caras images={cv} style={"w-full md:h-80 object-contain rounded-md"}/>
             </div>

            <div className="text-sm md:w-6/12 z-10  md:h-80 grid md:justify-end">
            <div className="flex justify-between items-center w-full p-2 gap-3">
                  <h3 className='md:text-xl sm:text-lg font-bold'>{"Dog's Details"}</h3>
                  <div className="flex gap-2 text-sm">
                  <button id="edit_profile_button" className="bg-white text-black w-16 rounded-md" onClick={()=>editProfile(dogInfo)}>Edit</button>
                  <button id="delete_profile_button" className="bg-red-500 text-black w-16 rounded-md text-white" onClick={deleteProfile}>Delete</button>
                  </div>
            </div>
            <div className="w-full p-2">
            <p className='leading-6 '><span className="font-semibold">{"Dog's name :"}</span> {dogInfo.name}</p>
            <p className='leading-6 '><span className="font-semibold">{"Dog's breed :"}</span> {dogInfo.breed}</p>
            <p className='leading-6 '><span className="font-semibold">{"Dog's weight :"}</span> {dogInfo.weight}</p>
            <p className='leading-6 '><span className="font-semibold">{"Dog's Age :"}</span> {`${dogInfo.month?dogInfo.month+" Month(s)":""}  ${dogInfo.year? dogInfo.year+" Year(s)" :""}`}</p>
            <p className='leading-6 '><span className="font-semibold">{"Parent's name :"}</span> {dogInfo.parentsname}</p>
            <p className='leading-6 '><span className="font-semibold">{"City:"}</span> {dogInfo.city}</p>
            <p className='leading-6 '><span className="font-semibold">{"Country:"}</span> {dogInfo.country}</p>
            <p className='leading-6 '><span className="font-semibold">{"Parent's phone no. :"}</span> {profilePhone && profilePhone.number}</p>
           {
             dogInfo.vetsname && dogInfo.vetsname !== "undefined"?
             <p className='leading-6 '><span className="font-semibold">{"Vets's name :"}</span>{dogInfo.vetsname}</p>
            :
            <></>
           } 
           {
            dogInfo.vetsphoneno && dogInfo.vetsphoneno !== "undefined"?
            <p className='leading-6 '><span className="font-semibold">{"Vets's phone no. :"}</span>{dogInfo.vetsphoneno}</p>            
            :
            <></>
           }
           {
            dogInfo.emergencypersonsname && dogInfo.emergencypersonsname !== "undefined"?
            <p className='leading-6 '><span className="font-semibold">{"Emergency person's name :"}</span>{dogInfo.emergencypersonsname}</p>            
            :
            <></>
           }
           {
             dogInfo.emergencypersonsphoneno && dogInfo.emergencypersonsphoneno !== "undefined"?           
            <p className='leading-6 '><span className="font-semibold">{"Emergency phone's no. :"}</span>{dogInfo.emergencypersonsphoneno}</p>
            :
            <></>
           }
           </div>
            </div>
            </div>
      </div>    
      <Dogdetail gender={gender} setGender={setGender} weight={weight} setWeight={setWeight} month={month} setMonth={setMonth} year={year} setYear={setYear} defPic={defPic} profilePic={profilePic} setProfilePic={setProfilePic} selectedImages={selectedImages} setSelectedImages={setSelectedImages} coverImageList={dogInfo.coverPictures}  dogInfo={dogInfo} setDogInfo={setDogInfo} openEditModal={openEditModal} setOpenEditModal={setOpenEditModal}/>
    </div>
  );
}
export default DogProfile;




/* ------------------Dog's Profile styling start-------------------- */


 
  // <div className="flex relative justify-center md:p-5">
  //     <div className="flex md:flex-row-reverse  flex-col md:flex-row justify-center p-2  md:p-5 items-center  rounded-md">    
             
              // <div className="-z-1">
              //   <Caras images={cv} style={"w-full  md:h-80 object-cover rounded-md"}/>
              // </div>

            //   <div className="max-w-sm rounded-md text-[#d3d4d6] bg-gradient-to-r from-indigo-900 via-indigo-900 to-indigo-600 md:h-[300px] md:overflow-y-auto w-full p-5 z-50">
            //     <div className="flex justify-between mb-5">
            //       <h3 className='md:text-xl sm:text-lg font-bold'>Dog's Details</h3>
            //       <div className="flex gap-2 text-sm">
            //       <button className="bg-white text-black w-20 rounded-md" onClick={()=>editProfile(dogInfo)}>Edit</button>
            //       <button className="bg-red-500 text-black w-20 rounded-md text-white" onClick={deleteProfile}>Delete</button>
            //       </div>
            //       {/*<button className="schedule md:py-1 sm:py-[0.2rem] py-[0.   16rem] md:px-3 sm:px-[0.7rem] px-[0.65rem] md:text-base sm:text-[0.9rem] text-[0.85rem]">Schedule</button>*/}
            //     </div>
            // <div className="text-sm">
            // <p className='leading-6 '><span className="font-semibold">Dog's name :</span> {dogInfo.name}</p>
            // <p className='leading-6 '><span className="font-semibold">Dog's breed :</span> {dogInfo.breed}</p>
            // <p className='leading-6 '><span className="font-semibold">Dog's weight :</span> {dogInfo.weight}</p>
            // <p className='leading-6 '><span className="font-semibold">Dog's Age :</span> {dogInfo.age}</p>
            // <p className='leading-6 '><span className="font-semibold">Parent's name :</span> {dogInfo.parentsname}</p>
            // <p className='leading-6 '><span className="font-semibold">Parent's address :</span>{dogInfo.parentsaddress}</p>
            // <p className='leading-6 '><span className="font-semibold">Parent's phone no. :</span> {dogInfo.parentsphoneno}</p>
            // <p className='leading-6 '><span className="font-semibold">Vets's name :</span>{dogInfo.vetsname}</p>
            // <p className='leading-6 '><span className="font-semibold">Vets's phone no. :</span>{dogInfo.vetsphoneno}</p>
            // <p className='leading-6 '><span className="font-semibold">Emergency person's name :</span>{dogInfo.emergencypersonsname}</p>
            // <p className='leading-6 '><span className="font-semibold">Emergency phone's no. :</span>{dogInfo.emergencypersonsphoneno}</p>
            // </div>
            //   </div>
  //       </div>
  //     </div>