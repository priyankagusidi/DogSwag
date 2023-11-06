import {Modal} from '@mantine/core'
import {useState,useEffect} from 'react'
import axios from 'axios'
import Link from 'next/link'
import OpenPricingModal from './pricing'
import ProfilePicture from '@/components/utils/profilePicture'
// billingModal,setBillingModal

export default function DogProfiles({dogprofiledata}){
    const [profilePic,setProfilePic] = useState("")

    const [selectedImage,setSelectedImage] = useState(null)
	
	console.log(dogprofiledata)
	const [openCreateProfileModal,setOpenCreateProfileModal] = useState(false)
	const [profileInfo,setProfileInfo] = useState({})
	const [profileList,setProfileList] = useState(dogprofiledata ?dogprofiledata.profiles:[])


	function openModal(){
		setOpenCreateProfileModal(true)
	}

	function handleChange(e){
		setProfileInfo({...profileInfo,[e.target.name]:e.target.value})
	}

	useEffect(()=>{
		getProfiles()
	},[])

    async function getProfiles() { 	
    	try {
	        await axios.get(`/api/dogprofile/all`,
	        {
	          credentials: 'include'
	        }).then((res)=>{
	        	console.log(res)
	        	setProfileList(res.data.profiles)
	        })	    	
	    } catch(e) {
	    	console.log(e);
	    }
    }
	async function createProfile() {
      
	    try {
	        await axios.post(`/api/dogprofile/create`,
	        	profileInfo,
	        {
	          credentials: 'include'
	        }).then((res)=>{
	        	console.log(res)
	        })	    	
	    } catch(e) {
	    	console.log(e);
	    	// setPricingModal(true)
	    }
		setOpenCreateProfileModal(false)
        // setProfileList([...profileList,profileInfo])
        getProfiles()
	}

	async function deleteProfile(id){
		try {
			 await axios.delete(`/api/dogprofile/profile/delete/${id}`,
	        	profileInfo,
	        {
	          credentials: 'include'
	        }).then((res)=>{
	        	console.log(res)
	        })	    
		getProfiles()
       
		} catch(e) {
			// statements
			console.log(e);
		}
   console.log(profileList)
	}
	return(
		  <div>
		  <div className="bg-amber-800 h-screen mx-auto shadow-md rounded-md p-5">
          <div className="flex my-4 flex-col bg-amber-400 p-5 rounded-md h-[90vh]">
             <div className=" flex gap-2 items-center">
             <h1 className="text-2xl font-semibold py-2">Dog Profiles</h1>
             <div><button className="p-2 font-semibold bg-amber-800 text-white w-24 rounded " onClick={openModal}>Add &#8889;</button></div>
             </div>
             <div className="grid mt-5 mx-auto">

             <div className="flex text-xs h-20 font-[Roboto] font-bold p-2 border-b">
                             
                            

                            <div className="flex gap-4 justify-between  items-center">
                            
                            <div className="w-[50px] cursor-pointer items-center flex">

                            </div>

                            <div className="w-[300px]">
                              <h1 className="font-semibold">{"Name"}</h1>
                            </div>

                             <div className="w-[300px]">
                              <h1>{"breed"}</h1>
                            </div>
                             <div className="w-[50px]">
                              <h1>{"weight"}</h1>
                            </div>
                            <div className="w-[50px]">
                              <h1>{"age"}</h1>
                            </div>
                             <div className="w-[50px]">
                              <h1>Gender</h1>
                            </div>

                            </div>  


              			</div>
           <div className="grid gap-2">
              
              {
              	profileList && profileList.map((m,i)=>{
              		return(
              			<div key={i} className="flex text-xs h-20 font-[Roboto] border-b p-2 bg-white  rounded-md hover:scale-105">
                             
                            

                            <div className=" flex gap-4 justify-between  items-center  ">
                            
                            <div className="w-[50px] cursor-pointer items-center flex">
                            	<Link href={`/calender/${m._id}`}><img src="https://via.placeholder.com/1080x1080.png" className="rounded-full w-14"/></Link>
                            </div>

                            <div className="w-[300px]">
                              <Link href={`/calender/${m._id}`}><h1 className="font-semibold">{m.name}</h1></Link>
                            </div>

                             <div className="w-[300px]">
                              <h1>{m.breed ? m.breed : "N/A"}</h1>
                            </div>
                             <div className="w-[50px]">
                              <h1>{m.weight ? m.weight :"N/A"}</h1>
                            </div>
                            <div className="w-[50px]">
                              <h1>{m.age ? m.age : "N/A"}</h1>
                            </div>
                             <div className="w-[50px]">
                              <h1>{m.gender? m.gender : "N/A"}</h1>
                            </div>

                            <div>
                            	<button className="shadow-md p-2 border border-gray-400 rounded-md">Edit profile</button>
                            </div>
                            <div>
                            	<button className="shadow-md p-2 border border-gray-400 rounded-md bg-red-500" onClick={()=>deleteProfile(m._id)}>Delete profile</button>
                            </div>

                            </div>   

              			</div>
              			)
              	})
              }              
             </div>
             </div>
		  </div>
		  </div>
		  <Modal
		          opened={openCreateProfileModal}
                  onClose={() => setOpenCreateProfileModal(false)}
                  title="Create Profile"
                  size={"2xl"}
		  >
		    <div className="flex flex-col gap-2 items-center">
		    	{/*<div className="w-24 h-24 rounded-full bg-gray-200 shadow-md m-5"></div>*/}
            <ProfilePicture setPic={setProfilePic} selectedImage = {selectedImage} setSelectedImage={setSelectedImage} defPic={"https://via.placeholder.com/1080x1080.png" }/>          

		    	<input className="p-2 text-sm rounded-md border border-gray-300" onChange={handleChange} name="name" placeholder="name"/>
		    	<input className="p-2 text-sm rounded-md border border-gray-300" onChange={handleChange} name="breed" placeholder="breed"/>
		    	<input className="p-2 text-sm rounded-md border border-gray-300" type="number" onChange={handleChange} name="age" placeholder="age"/>
		    	<input className="p-2 text-sm rounded-md border border-gray-300" type="number" onChange={handleChange} name="weight" placeholder="weight (in age)"/>
		    	<button onClick={createProfile} className="bg-amber-500 hover:bg-amber-400 p-2 rounded-md text-white">Create</button>
		    </div>
		  </Modal>

		  </div>
		)
}