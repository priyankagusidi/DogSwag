import {useState,useEffect} from 'react'
import axios from 'axios'
import DogModal from './dogmodal';
import Link from  'next/link'
import ProfilePicture from '@/components/utils/profilePicture'
import { blobToURL, fromBlob } from 'image-resize-compress';
import Bio from "./bio"
import PreviousPosts from "./previousposts"
import QuickLinks from "./quicklinks"
import TaskMonth from "./taskmonth"


export default function DogProfile({dogdata,showImage,grid,padding,showEdit}){
   
    const [info,setInfo] = useState(dogdata ? dogdata.profile:{})
    const [isDogModalOpen,setIsDogModalOpen] = useState(false)
    const [type,setType] = useState(null)  
   
    const [selectedImage,setSelectedImage] = useState(null)
    const [pic,setPic] = useState("")

    async function fetchDogProfile(){
    	try {
    		await axios.get(`/api/doginfo/profile`).then(res=>{
             setInfo(res.data.profile)
            })
    	} catch(e) {
    		// statements
    		console.log(e);
    	}
    }

    function onSelectedFile(e){
         // alert("hello")
        const maxSize = 1024 * 1024

        if(e.target.files[0].size > maxSize){
            
            alert("image size cant exceed more than 1mb")
            return
        }

        const selectedArray = Array.from(e.target.files)

        const imageArray = selectedArray.map((file)=>{
            return URL.createObjectURL(file)
        })

        const quality = 5;
        const width = 0;
        const height = 0;
        const format = 'webp';
    
        console.log(e.target.files[0])

         fromBlob(e.target.files[0], quality, width, height, format).then((blob) => {
           console.log(blob);
           updateImage(blob)
         });

        setSelectedImage(imageArray[0])
    }

async function updateImage(blob){
         
        console.log(blob)
         
        const formData = new FormData();
        formData.append("dogImage", blob)
        
      
        try {
            if(info){
                    await axios.put('/api/doginfo/profile/edit',formData).then(res=>{
                        fetchDogProfile()
                      })
      }else{
          await axios.post('/api/doginfo/create',formData,{
                headers: {
                         'Content-Type': 'application/json'
                         }
                }).then(res=>{
                         fetchDogProfile()
                      })
        }
            
        } catch(e) {
            console.log(e);
        }
    }



	function openModal(info,type){
		setIsDogModalOpen(true)
        setType(type)
	}

	console.log(info)

	return(
		  <div className="w-full bg-white">
              <div className="flex flex-col gap-5">
                            <div className=" rounded-full flex flex-col items-center justify-center gap-2">
                               
                                <div className="flex justify-center">
                                   <span className="relative">
                                   <input id="profilePicture" accept="image/*" type="file" onChange={onSelectedFile} className="hidden" />
                                   <label htmlFor="profilePicture"className="flex h-24 absolute w-full justify-center items-center hover:opacity-50 cursor-pointer">
                                     {/*<BsCamera size={20}/>           */}
                                     <img src="/assets/icons/mode-portrait.svg" className="w-4 h-4"/>       
                                   </label>
                                      <img className="h-24 w-24 rounded-full object-cover  border border-gray-200 bg-gray-100" src={info?.dogImage || "/doguser.png"} />
                                   </span>
                                </div>

                                {/*<ProfilePicture selectedImage={selectedImage} setSelectedImage={setSelectedImage} setPic={setPic} defPic={"/doguser.png"}/>*/}
                                {/*<img src="/doguser.png" className="w-20 h-20 rounded-full border bg-gray-300" alt="" />*/}
                                <p className="text-black font-medium text-sm">{info? info.dogName || "Milo" :"Milo"}</p>
                            </div>
                            <div className={`text-gray-500 text-sm ${grid?"grid grid-cols-2 justify-center items-center":"flex flex-col"}   gap-2`}>
                                <div className={`p-${padding} rounded-lg border border-gray-300 flex items-center gap-3`}>
	                                {showImage ? <img src="/gender.svg" className="w-10 h-10"/>:<></>}
	                                <p className={`gap-2 ${grid?"grid":"flex"}`}> 
	                                    <span>Gender :</span> 
	                                    <span className="text-black">{info ? info.dogGender || "Male" : "Male"}</span> 
	                                </p>
                                </div>
                                <div className={`p-${padding} rounded-lg border border-gray-300 flex items-center gap-3`}>
	                                {showImage ? <img src="/cake.svg" className="w-10 h-10"/>:<></>}
                                
                                <p className={`gap-2 ${grid?"grid":"flex"}`}> 
                                      <span>Age : </span>
                                      <span className="text-black">{info ? info.dogAge || "8" : "8"}</span> 
                                </p>
                                </div>
                                <div className={`p-${padding} rounded-lg border border-gray-300 flex items-center gap-3`}>
	                                {showImage ? <img src="/bone.svg" className="w-10 h-10"/>:<></>}

                                <p className={`gap-2 ${grid?"grid":"flex"}`}> 
                                      <span>Weight :</span> 
                                      <span className="text-black">{info ? info.dogWeight || "12" : "12"}</span> </p>
                                      </div>
                                <div className={`p-${padding} rounded-lg border border-gray-300 flex items-center gap-3`}>
	                                {showImage ? <img src="/dog.svg" className="w-10 h-10"/>:<></>}
                               
                                <p className={`gap-2 ${grid?"grid":"flex"}`}>
                                       <span>Breed : </span>
                                       <span className="text-black">{info ? info.dogBreed || "German" : "German"}</span>
                                 </p>
                                 </div>
                            </div>
                          {
                            showEdit ?
                            <div className="flex justify-center w-full">
                            {
                                info
                                ?
                                <button onClick= {()=>openModal(info,"edit")} className="border w-20 p-2 border-gray-300 rounded-xl">Edit</button>
                                :
                                <img id={"dog_profile_added"} onClick= {()=>openModal(info,"add")} src="/add.svg" />
                            }
                            </div>
                            :
                            <></>
                          }
                            
                           {
                                info
                                ?
                                <div className="text-gray-800 p-1 text-xs"> Go to <Link href="/vetchat" className="text-blue-400 underline">Vet Chat</Link></div>
                                :
                                <div className="text-gray-800 bg-red-300 p-1 text-xs">Note : Create Dog profile to access Vet Chat.</div>
                            }
                        </div>
                        <DogModal  type={type} fetchDogProfile={fetchDogProfile} dog={info} isDogModalOpen={isDogModalOpen} setIsDogModalOpen={setIsDogModalOpen}/>
                        
		  </div>
		)
}