// import {Modal} from '@mantine/core'
// import React, { useState } from 'react';
// import { useRouter } from 'next/router'
// import MemeUpload from '@/components/utils/memeUpload'
// import ImageContainer from '@/components/woofwoof/meme/imageContainer';
// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
// import ProfilePicture from '@/components/utils/profilePicture'
// import { ToastContainer, toast } from 'react-toastify';
// import { Select } from '@mantine/core';
// import DefaultWeights from './defaultWeights'
// import DefaultMonths from './defaultMonths'
// import DefaultYears from './defaultYears'
// import DefaultGender from './defaultGender'


import axios from 'axios'
const Calendar = ({gender,month,year,weight,setGender,setMonth,setYear,setWeight,coverImageList,defPic,dogInfo,setDogInfo,openEditModal,setOpenEditModal,profilePic,setProfilePic,selectedImages,setSelectedImages}) => {

  return(
    <></>
  )
//   function handleChange(e){
//       setDogInfo({...dogInfo,[e.target.name]:e.target.value})
//   }
//     const [selectedImage, setSelectedImage] = useState(null) 
//     const [selectedVideo, setSelectedVideo] = useState(null)
//     const [coverPic, setCoverPic] = useState([])
//     const [container,setContainer] = useState([])
//     const [isMemeModalOpen,setIsMemeModalOpen] = useState(false)
//     const [sec,setSec] = useState(false)

    
//     const [genderData, setGenderData] = useState(DefaultGender)
//     const [weightData, setWeightData] = useState(DefaultWeights)
//     const [monthData, setMonthData] = useState(DefaultMonths)
//     const [yearData, setYearData] = useState(DefaultYears)


// // console.log(selectedImage)

// // const [coverimageList,setCoverimageList] = useState([])
// const [coverImages,setCoverImages] = useState({})

// const router = useRouter()
//  async function SaveProfile(){
//     setOpenEditModal(false)
//      // console.log(dogInfo)

//       const formData = new FormData();
//         formData.append("name", dogInfo.name)
//         formData.append("age", dogInfo.age)
//         formData.append("profilePic",profilePic)
//         formData.append("breed",dogInfo.breed)
//         formData.append("weight",weight)
//         formData.append("gender",gender)
//         formData.append("month",month)
//         formData.append("year",year)
//         formData.append("parentsname", dogInfo.parentsname)
//         formData.append("city", dogInfo.city)
//         formData.append("country", dogInfo.country)        
//         formData.append("parentsphoneno", dogInfo.parentsphoneno)
//         formData.append("vetsname",dogInfo.vetsname )
//         formData.append("vetsphoneno", dogInfo.vetsphoneno)
//         formData.append("emergencypersonsname",dogInfo.emergencypersonsname )
//         formData.append("emergencypersonsphoneno",dogInfo.emergencypersonsphoneno )
       
//         if (coverPic.length != 0) {
//         for (const single_file of coverPic) {
//             formData.append('coverPic', single_file)
//           }
//         }

//     try{
//     await axios.put(`/api/dogprofile/profile/edit/${router.query.id}`,formData,{
//             headers: {
//                     'Content-Type': 'multipart/form-data'
//     }
//     }).then(res=>{
//       toast("Profile Edited!")
//       // console.log(res)
//     })
//     }catch(e){
//        // console.log(e)
//     }
//  }

//   const moveImage = (dragId, dropId) => {
//     const dragIndex = selectedImage.findIndex((img,i) => i === dragId);
//     const dropIndex = selectedImage.findIndex((img,i) => i === dropId);

//     const newImages = [...selectedImage];
//     const [removed] = newImages.splice(dragIndex, 1);
//     newImages.splice(dropIndex, 0, removed);
    
//     const dragIndex2 = coverPic.findIndex((img,i) => i === dragId);
//     const dropIndex2 = coverPic.findIndex((img,i) => i === dropId)
//     const newImages2 = [...coverPic];
//     const [removed2] = newImages2.splice(dragIndex2, 1);
//     newImages2.splice(dropIndex2, 0, removed2);

//     setSelectedImage(newImages);
//     setCoverPic(newImages2)
//   };

//   // console.log(dogInfo)
//   return (
//     <Modal
//       opened={openEditModal}
//       onClose={() => setOpenEditModal(false)}
//       // title="Reminder"
//       size={"2xl"}
//     >
//     <div className="font-poppins text-sm">
//           <ToastContainer />
//            <div className={sec ?"hidden":""}>
//             <ProfilePicture setPic={setProfilePic} selectedImage = {selectedImages} setSelectedImage={setSelectedImages} defPic={defPic}/>          
//                        <div className="flex flex-col gap-2 w-full">
//            <h1 className="text-xl font-bold">{"Pet Details"}</h1>
//            <div className="grid grid-cols-2 gap-2">
//                <div className="grid gap-2">
//                    <label className="text-xs font-bold tracking-widest">{"Pet Name"}</label>
//                    <input className="p-2 border  w-full" value={dogInfo.name}  onChange={handleChange}placeholder='Name' name="name"/>
//                 </div>
//                <div className="grid gap-2">
//                    <label className="text-xs font-bold tracking-widest">{"Pet Breed"}</label>
//                    <input className="p-2 border  w-full" value={dogInfo.breed}  onChange={handleChange}placeholder='Breed' name="breed"/>
//                 </div>
//                 <div className="grid gap-2">
//                    <label className="text-xs font-bold tracking-widest">{"Pet Gender"}</label>
//                    {/*<input className="p-2 border  w-full" value={dogInfo.gender} onChange={handleChange} placeholder='Gender' name="gender"/>*/}
//                    <Select
//                   data={genderData}
//                   placeholder="Weight"
//                   nothingFound="Nothing found"
//                   searchable
//                   onChange={setGender}
//                   creatable
//                   getCreateLabel={(query) => `+ Create ${query}`}
//                   onCreate={(query) => {
//                     const item = { value: query, label: query+" "+"👉" };
//                     setSectionData((current) => [...current, item]);
//                     return item;
//                   }}
//                   value={gender}
//                 />
//                 </div>
//                 <div className="grid gap-2">
//                    <label className="text-xs font-bold tracking-widest">{"Pet Weight"}</label>
//                    {/*<input className="p-2 border  w-full" value={dogInfo.weight} onChange={handleChange} placeholder='Weight' name="weight"/>*/}
//                  <Select
//                   data={weightData}
//                   placeholder="Weight"
//                   nothingFound="Nothing found"
//                   searchable
//                   onChange={setWeight}
//                   creatable
//                   getCreateLabel={(query) => `+ Create ${query}`}
//                   onCreate={(query) => {
//                     const item = { value: query, label: query+" "+"👉" };
//                     setSectionData((current) => [...current, item]);
//                     return item;
//                   }}
//                   value={weight}
//                 />                   
//                 </div>

//                <div className="grid gap-2">
//                    <label className="text-xs font-bold tracking-widest">{"Pet Age"}</label>
//                    {/*<input className="p-2 border  w-full" value={dogInfo.age}  onChange={handleChange}placeholder='Age' name="age"/>*/}
//                  <div className="grid grid-cols-2 gap-2 max-w-[200px]">
//                  <label className="text-xs text-center">Month</label>
//                  <label className="text-xs text-center">Year</label>
//                  <Select
//                   data={monthData}
//                   placeholder="Month"
//                   nothingFound="Nothing found"
//                   searchable
//                   onChange={setMonth}
//                   creatable
//                   getCreateLabel={(query) => `+ Create ${query}`}
//                   onCreate={(query) => {
//                     const item = { value: query, label: query+" "+"👉" };
//                     setSectionData((current) => [...current, item]);
//                     return item;
//                   }}
//                   value={month}
//                 />  
//                 <Select
//                   data={yearData}
//                   placeholder="Year"
//                   nothingFound="Nothing found"
//                   searchable
//                   onChange={setYear}
//                   creatable
//                   getCreateLabel={(query) => `+ Create ${query}`}
//                   onCreate={(query) => {
//                     const item = { value: query, label: query+" "+"👉" };
//                     setSectionData((current) => [...current, item]);
//                     return item;
//                   }}
//                   value={year}
//                 />  
//                 </div>
//                 </div>
//            </div>
//            </div>

//            <div className="flex flex-col gap-2 mt-5">
//            <h1 className="text-xl font-bold">{"Parent's Details"}</h1>

//              <div className="grid gap-2">
//                <label className="text-xs font-bold tracking-widest">{"Parent Name"}</label>
//                  <input className="p-2 border bg-gray-100 w-full"value={dogInfo.parentsname}  onChange={handleChange} placeholder='Parent name' name="parentsname"/></div>
//             {/* <div className="grid gap-2">
//                  <label className="text-xs font-bold tracking-widest">{"City/Country"}</label>
//                  <textarea className="p-2 h-20 border bg-gray-100 w-full"value={dogInfo.parentsaddress}  onChange={handleChange} placeholder='e.g. Bangalore,India' name="parentsaddress"/>
//             </div>*/}
//                  <div className="grid grid-cols-2 gap-2">

//              <div className="grid gap-2">
//                  <label className="text-xs font-bold tracking-widest">{"City"}</label>
//                  <input className="p-2  border  w-full"value={dogInfo.city}  onChange={handleChange} placeholder='city' name="city"/>
//             </div>
        
//             <div className="grid gap-2">
//                  <label className="text-xs font-bold tracking-widest">{"Country"}</label>
//                  <input className="p-2  border  w-full"value={dogInfo.country}  onChange={handleChange} placeholder='country' name="country"/>
//             </div>
//             </div>

//              {/*<div className="grid gap-2">
//                  <label className="text-xs font-bold tracking-widest">{"Mobile"}</label>
//                  <input className="p-2 border bg-gray-100 w-full"value={dogInfo.parentsphoneno}  onChange={handleChange} placeholder='Phoneno' name="parentsphoneno"/>
//             </div>
// */}
//             <div className="flex">
//               <button className="p-2 text-white bg-amber-500 w-24 rounded-md" onClick={()=>setSec(true)}>Next</button>
//             </div>

//           </div>
//           </div>
//           <div className={sec?"":"hidden"}>
//           <div className="flex flex-col gap-2">
//            <h1 className="text-xl font-bold">{"Vet (Optional)"}</h1>
//            <div className="grid grid-cols-2 gap-2">
//             <div className="grid gap-2">
//                  <label className="text-xs font-bold tracking-widest">{"Name"}</label>
//                  <input className="p-2 border bg-gray-100 w-full"value={dogInfo.vetsname}  onChange={handleChange} placeholder="Vet's Name" name="vetsname"/>
//             </div>
//             <div className="grid gap-2">
//                  <label className="text-xs font-bold tracking-widest">{"Mobile"}</label>
//                  <input className="p-2 border bg-gray-100 w-full"value={dogInfo.vetsphoneno}  onChange={handleChange} placeholder="Vet's Phone no." name="vetsphoneno"/>
//             </div>
//             </div>

//           </div>

//           <div className="flex flex-col gap-2 mt-5">
//            <h1 className="text-xl font-bold">{"Emergengy Contact (Optional)"}</h1>
//            <div className="grid grid-cols-2 gap-2">

//             <div className="grid gap-2">
//                  <label className="text-xs font-bold tracking-widest">{"Name"}</label>
//                  <input className="p-2 border bg-gray-100 w-full"value={dogInfo.emergencypersonsname}  onChange={handleChange} placeholder='Emergengy Person Name' name="emergencypersonsname"/>
//             </div>
//             <div className="grid gap-2">
//                  <label className="text-xs font-bold tracking-widest">{"Mobile"}</label>
//                  <input max={"10"} type="number" className="p-2 border bg-gray-100 w-full"value={dogInfo.emergencypersonsphoneno}  onChange={handleChange} placeholder="Emergengy Person's Phone no" name="emergencypersonsphoneno"/>
//             </div>
//           </div>
//           </div>

//         <div className="mt-5 text-sm font-bold">
//           Add cover picture
//         </div>
//       <div id="coverImages">
//        <MemeUpload 
//                      // userdata={userdata}  

//                      pic={coverPic} 
//                      setPic={setCoverPic} 

//                      container={container} 
//                      setContainer={setContainer} 

//                      setSelectedVideo={setSelectedVideo} 
//                      setSelectedImage={setSelectedImage} 
                     
//                      setIsMemeModalOpen={setIsMemeModalOpen} />
//         </div>
        
//           {
//            <DndProvider backend={HTML5Backend}>
//               {
//                 selectedImage && selectedImage.length>1 ?
//                 <div>
//                 {selectedImage && selectedImage.map((img,i) => (
//                   <ImageContainer key={i} id={i} url={img} moveImage={moveImage} />
//                 ))}
//               </div>
//               :
//               <label htmlFor="coverImages">
//               <div className="flex gap-2">
//                 {coverImageList && coverImageList.map((img,i) => (
//                   <img key={i} src={img} className="w-16 h-16 object-cover" />
//                 ))}
//               </div>
//               </label>
//               }
//             </DndProvider>

//           }
//           <div className="flex gap-2">
//          <div className="flex">
//               <button className="p-2 text-white bg-amber-500 w-24 rounded-md" onClick={()=>setSec(false)}>Back</button>
//           </div>
//           <div className="flex">
//           <button className="p-2 text-white bg-amber-500 w-24 rounded-md" onClick={SaveProfile}>Save</button>
//         </div>
//         </div>
//         </div>
      
//     </div>
//     </Modal>
//   );
};

export default Calendar;



