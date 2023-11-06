import {useState} from 'react'
import {Modal} from '@mantine/core'
import axios from 'axios'

export default function Edit({getDoctorData,doctor,isOpen,setOpen,type}){


  const [eductionText,setEducationText] = useState("")
  const [educationList,setEducationList] = useState(doctor.education)
  const [profilePic,setProfilePic] = useState(null)
  const [info, setinfo] = useState(doctor);
  
	async function handleAgree(){

		const formData = new FormData();
        formData.append("fullName", info.fullName)
        formData.append("city", info.city)
        formData.append("country", info.country)
        formData.append("experience", info.experience)
        formData.append("location", info.location)
        formData.append("availTimeStart", info.availTimeStart)
        formData.append("availTimeEnd", info.availTimeEnd)
        formData.append("profSummery", info.profSummery)
        formData.append("education", JSON.stringify(educationList))
        formData.append("profilePic", info.profilePic)

		try {
			await axios.put('/api/doctor/profile/edit',formData,{
		    headers: {
                  'Content-Type': 'application/json'
                    }
            }).then(res=>{
				console.log(res.data)
				// router.push('/doctor/profile')
				setOpen(false)
				getDoctorData()
			})
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
    handleAgree()
  };

  const handleNext = () => {
  	console.log(info)
  	if(!info.fullName || !info.city || !info.country){
  		alert("Required")
  		return
  	}
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrev = () => {
    setStep((prevStep) => prevStep - 1);
  };
  
  const handleEducationChange = (e) =>{
  	setEducationText(e.target.value)
  }

  const AddEducation = () =>{
  	setEducationList([...educationList,eductionText])
    setEducationText("")

  }

  const handleProfilePic=(e)=>{
  	if(!e.target.files){
  		return
  	}
  	console.log(e.target.files)
  	setProfilePic(e.target.files[0])
  }


    function deleteExp(index){
     const del = educationList.filter((e,i)=> i !== index)
     setEducationList(del)
  }


	return(
 <Modal
  opened={isOpen}
  onClose={()=>setOpen(false)}
  size={"lg"}
  title={type==="profSummery" ? "Professional summery": type==="details" ? "Details" : type === "education" ? "Education":null }
>
  <div>
  {
    type === 'profile' ?
    <div className="flex text-gray-500 flex-col gap-2 px-2 md:px-5">
       <label>Full Name</label>
       <input 
               className="p-2 rounded-lg border border-gray-400" 
               placeholder="Full Name"
               name="fullName"
               value={info.fullName}
               onChange={handleChange}
        />
        <div className="grid grid-cols-2 gap-2">
       <div className="flex flex-col gap-2">
       <label>City</label>
       <input 
               className="p-2 rounded-lg border border-gray-400" 
               placeholder="City"
               name="city"
               value={info.city}
               onChange={handleChange}
        />
        </div>
        <div className="flex flex-col gap-2">
         <label>Country</label>
       <input 
               className="p-2 rounded-lg border border-gray-400" 
               placeholder="Country"
               name="country"
               value={info.country}
               onChange={handleChange}
        />
        </div>
        </div>
    </div>
    :
    type === 'profSummery' ?
    <div className="flex text-gray-500 flex-col gap-2 px-2 md:px-5">
      <h1 className="text-md ">{`Use this space to show clients you have the skills and experience they're looking for.`}</h1>
      <ul className="text-sm px-4">
        <li className="list-disc">{`Describe your strengths and skills,Highlight projects`} </li>
          <li className="list-disc">{`accomplishments and education`}</li>
        <li className="list-disc">{`Keep it short and make sure it's error-free`}</li>
      </ul>
      <span className="p-1">Add note</span>
      <textarea 
              name="profSummery"
              value={info.profSummery}
              onChange={handleChange}
      className="h-40 border border-gray-400 rounded-md p-2"/>
      
    </div>
    :
     type === 'details' ?
     <div className="grid gap-2 text-md text-gray-500">
          <label>Hospital</label>
          <input 
               className="p-2 rounded-lg border border-gray-400" 
               placeholder="Hospital name"
               name="location"
               value={info.location}
               onChange={handleChange}
               />
          <label>Years of experience</label>
          <input 
               className="p-2 rounded-lg border border-gray-400" 
               placeholder="Years of experience"
               name="experience"
               value={info.experience}
               onChange={handleChange}
               />
          <label>Available time</label>
          <div className="grid grid-cols-2 gap-2 max-w-sm">
          <input 
              name="availTimeStart"
              value={info.availTimeStart}
              onChange={handleChange}
          type="time" className="p-2 rounded-lg border border-gray-400" />
          <input 
              name="availTimeEnd"
              value={info.availTimeEnd}
              onChange={handleChange}
              type="time" className="p-2 rounded-lg border border-gray-400" />
          </div>
     </div>
     :
     type === 'education' ?
     <div className="flex gap-2 flex-col text-gray-500">
       <div className="flex gap-2">
       <input
              type="text"
              id="education"
              name="education"
              value={eductionText}
              onChange={handleEducationChange}
              className="border border-gray-300 px-4 py-2 rounded-md w-10/12"
            />
             <button className="p-2 bg-green-500 text-white w-2/12 rounded-md" onClick={AddEducation}>Add</button>
      </div>
            <ul className="px-4 text-sm">
            {
              educationList.map((e,i)=>{
                return(
                      <li  key={i} className="rounded-xl text-start items-center relative p-1 flex gap-2  bg-white">
                        <div className="w-11/12 p-1">{e}</div>
                        <div onClick={()=>deleteExp(i)} className="w-1/12 flex justify-center absolute bg-red-500 right-0 p-2 cursor-pointer"><img src={"/assets/icons/cross.svg"} className="w-4"/></div>
                      </li>
                  )
              })

            }
            </ul>
     </div>
     :
     null
  }
    <div className="p-4 flex justify-end gap-4">
      <button className="border border-gray-300  p-3 w-24 rounded-lg" onClick={()=>setOpen(false)}>Cancel</button>
      <button className="bg-yellow-500 text-white p-3 w-24 rounded-lg" onClick={handleAgree}>Save</button>
    </div>
  </div>
</Modal>
		)
}