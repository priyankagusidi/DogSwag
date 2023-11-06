import {useState,useEffect} from 'react'
import {Modal} from '@mantine/core'
import axios from 'axios';

export default function DogModal({fetchDogProfile,dog,isDogModalOpen,setIsDogModalOpen,type}){
  const [profilePic,setProfilePic] = useState(null)

  const [info, setinfo] = useState(dog);
    
    console.log(info)

	async function handleEdit(){

		const formData = new FormData();
        formData.append("dogName", info.dogName)
        formData.append("dogBreed", info.dogBreed)
        formData.append("dogGender", info.dogGender)
        formData.append("dogAge", info.dogAge)
        formData.append("dogWeight", info.dogWeight)
      
		try {
			if(type==="edit"){
					await axios.put('/api/doginfo/profile/edit',formData,{
			    headers: {
	                  'Content-Type': 'application/json'
	                    }
	            }).then(res=>{
									console.log(res.data)
									setIsDogModalOpen(false)
									fetchDogProfile()
				      })
      }else{
          await axios.post('/api/doginfo/create',formData,{
			    headers: {
	                  'Content-Type': 'application/json'
	                    }
	            }).then(res=>{
										setIsDogModalOpen(false)
										fetchDogProfile()
				      })
	    }
			
		} catch(e) {
			console.log(e);
		}
	}


  const handleChange = (e) => {
    const { name, value } = e.target;
    setinfo((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(info); // Replace with your own logic to handle form submission
    handleEdit()
  };
  

  const handleProfilePic=(e)=>{
  	if(!e.target.files){
  		return
  	}
  	console.log(e.target.files)
  	setProfilePic(e.target.files[0])
  }


	return(
		  <Modal
		    opened={isDogModalOpen}
		    onClose={()=>setIsDogModalOpen()}
		  >
		  <div className="grid grid-cols-10 gap-2 text-sm">
		  	<label className="flex justify-start border col-span-3">
		  	  <h1>Dog Name</h1>
		  	</label>
		  	<input onChange={handleChange} value={info?.dogName}  name="dogName" className="p-2 border bg-gray-100 rounded-lg col-span-7" placeholder="Name"/>

		    <label className="flex justify-start border col-span-3">
		  	  <h1>Age</h1>
		  	</label>
		  	<input onChange={handleChange} value={info?.dogAge} name="dogAge"  className="p-2 border bg-gray-100 rounded-lg col-span-7" placeholder="Age"/>
            <label className="flex justify-start border col-span-3">
		  	  <h1>Gender</h1>
		  	</label>
		  	<input onChange={handleChange} value={info?.dogGender}  name="dogGender" className="p-2 border bg-gray-100 rounded-lg col-span-7" placeholder="Gender"/>
		  
            <label className="flex justify-start border col-span-3">
		  	  <h1>Weight</h1>
		  	</label>
		  	<input onChange={handleChange}  value={info?.dogWeight} name="dogWeight" className="p-2 border bg-gray-100 rounded-lg col-span-7" placeholder="Weight"/>

		  	<label className="flex justify-start border col-span-3">
		  	  <h1>Breed</h1>
		  	</label>
		  	<input onChange={handleChange}  value={info?.dogBreed} name="dogBreed" className="p-2 border bg-gray-100 rounded-lg col-span-7" placeholder="Breed"/>
		  
		  	<button onClick={handleEdit} className="p-2 bg-[#FFCB07] w-24 rounded-lg">Save</button>
		  </div>

		  </Modal>
		)
}