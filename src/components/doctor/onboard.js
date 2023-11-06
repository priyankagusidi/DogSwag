import React, { useState } from 'react';
import {useRouter} from 'next/router'
import axios from 'axios'
import { blobToURL, fromBlob } from 'image-resize-compress';
import AvatarEditor from 'react-avatar-editor'
import {Modal,Stepper} from '@mantine/core'
const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [eductionText,setEducationText] = useState("")
  const [educationList,setEducationList] = useState([
         
])
  const [profilePic,setProfilePic] = useState(null)
  const router = useRouter()
      const [resizer,setResizer] = useState(false)

    const [image, setImage] = useState(null);
    const [editor, setEditor] = useState(null);
    const [scale, setScale] = useState(1);
    const [active,setActive] = useState(0)


  const [info, setinfo] = useState({
    fullName: '',
    city: '',
    country: '',
    experience: '',
    location: '',
    availTimeStart: '',
    availTimeEnd:'',
    profSummery: '',
  });

   const [selectedImage,setSelectedImage] = useState(null)
   const [pic,setPic] = useState("")
  const [highestStepVisited, setHighestStepVisited] = useState(active);


  
	async function handleAgree(){

    if(!info.profSummery || !educationList.length){
       alert('Fill required input !')
       return 
    }

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
        formData.append("profilePic", pic)

		try {
			await axios.post('/api/doctor/create',formData).then(res=>{
				console.log(res.data)
				router.push('/doctor/profile')
			})
		} catch(e) {
			console.log(e);
		}
	}


     const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setImage(URL.createObjectURL(selectedFile));
    };

    const handleScaleChange = (e) => {
        const newScale = parseFloat(e.target.value);
        setScale(newScale);
    };


     const handleCrop = () => {

      setResizer(false)
        if (editor) {
            const canvas = editor.getImageScaledToCanvas();
            canvas.toBlob((blob) => {
                // Now you have the cropped and resized blob ready for uploading
                // You can use this blob for further processing or upload it

                // Example: Uploading the cropped and resized image using your function
                const quality = 5;
                const width = 0;
                const height = 0;
                const format = 'webp';

                fromBlob(blob, quality, width, height, format).then((processedBlob) => {
                    console.log(processedBlob);
                    setSelectedImage(URL.createObjectURL(processedBlob)); 
                    setPic(blob)                    
                });
            });
        }
    };




  console.log(step)


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

     if(step === 1){
        if(!pic){
          alert("profile pic Required")
          return
        }
        if(!info.fullName || !info.city || !info.country){
          alert("Fill required input !")
          return
        }
     }

     if (step === 2) {
         if(!info.experience || !info.location){
            alert("Fill required input !")
            return
         }
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
  }

  const handleProfilePic=(e)=>{
  	if(!e.target.files){
  		return
  	}
  	console.log(e.target.files)
  	setProfilePic(e.target.files[0])
  }


    function onSelectedFile(e){
         // alert("hello")
        const maxSize = 1024 * 1024

        // if(e.target.files[0].size > maxSize){
            
        //     alert("image size cant exceed more than 1mb")
        //     return
        // }

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
           setPic(blob)
         });

        setSelectedImage(imageArray[0])
    }


  function deleteExp(index){
     const del = educationList.filter((e,i)=> i !== index)
     setEducationList(del)
  }


   const nextStep = () => {


       if(active === 0){
        if(!pic){
          alert("profile pic Required")
          return
        }
        if(!info.fullName || !info.city || !info.country){
          alert("Fill required input !")
          return
        }
     }

     if (active === 1) {
         if(!info.experience || !info.location){
            alert("Fill required input !")
            return
         }
     }



      setActive((current) => (current < 2 ? current + 1 : current));
  }
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    const handleStepChange = (nextStep) => {
    const isOutOfBounds = nextStep > 3 || nextStep < 0;

    if (isOutOfBounds) {
      return;
    }

    setActive(nextStep);
    setHighestStepVisited((hSC) => Math.max(hSC, nextStep));
  };

  // Allow the user to freely go back and forth between visited steps.
  const shouldAllowSelectStep = (step) => highestStepVisited >= step && active !== step;



  return (
    <div className="max-w-lg w-full mx-auto p-6 bg-gray-50 border border-gray-300 rounded-lg shadow-lg h-fit mt-16 font-Inter text-gray-600">
      
        <Stepper  color="yellow" size="xs" active={active} onStepClick={setActive}>
          <Stepper.Step >
          <div className="w-full">
            <h2 className="text-2xl font-bold mb-4">Step 1: Profile</h2>
            <label htmlFor="profilePic" className="block mb-2">
              Profile Picture:
            </label>
            <div onClick={()=>setResizer(true)} className="flex justify-center">
             <span className="relative">
             {/*<input id="profilePicture" accept="image/*" type="file" onChange={onSelectedFile} className="hidden" />*/}
             <label htmlFor="profilePicture"className="flex h-24 absolute w-full justify-center items-center hover:opacity-50 cursor-pointer">
               {/*<BsCamera size={20}/>           */}
               <img src="/assets/icons/mode-portrait.svg" className="w-4 h-4"/>       
             </label>
                <img className="h-24 w-24 rounded-full object-cover  border border-gray-200 bg-gray-100" src={selectedImage || "/img/defaultprofile.jpg"} />
             </span>
            </div>



            {/*<ProfilePicture setPic={setProfilePic} selectedImage = {selectedImage} setSelectedImage={setSelectedImage} defPic={"img/defaultProfile.jpg"}/>*/}

           {/* <input
              type="file"
              id="profilePic"
              name="profilePic"
              onChange={handleProfilePic}
              className="border border-gray-300 px-4 py-2 rounded-md w-full mb-4"
            />*/}

            <label htmlFor="name" className="block mb-2">
            Clinic/Hospital Name:
            </label>
            <input
              type="text"
              id="name"
              name="fullName"
              value={info.fullName}
              onChange={handleChange}
              required
              className="border border-gray-300 px-4 py-2 rounded-md w-full mb-4"
            />

            <label htmlFor="location" className="block mb-2">
              City:
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={info.city}
              onChange={handleChange}
              required
              className="border border-gray-300 px-4 py-2 rounded-md w-full mb-4"
            />
            <label htmlFor="location" className="block mb-2">
              Country:
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={info.country}
              onChange={handleChange}
              required
              className="border border-gray-300 px-4 py-2 rounded-md w-full mb-4"
            />
          </div>
        </Stepper.Step>
          <Stepper.Step>

          <div className="w-full">
            <h2 className="text-2xl font-bold mb-4">Step 2: Details</h2>
            <label htmlFor="experience" className="block mb-2">
              Experience:
            </label>
            <input
              type="number"
              id="experience"
              name="experience"
              value={info.experience}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 rounded-md w-full mb-4"
            />

            <label htmlFor="location" className="block mb-2">
              Clinic Location:
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={info.location}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 rounded-md w-full mb-4"
            />

            <label htmlFor="availTimeStart" className="block mb-2">
              Available Time:
            </label>
            <div className="grid grid-cols-2 gap-2">
            <input
              type="time"
              id="availTimeStart"
              name="availTimeStart"
              value={info.availTimeStart}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 rounded-md w-full mb-4"
            />
            <input
              type="time"
              id="availTimeEnd"
              name="availTimeEnd"
              value={info.availTimeEnd}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 rounded-md w-full mb-4"
            />
            </div>
          </div>
        </Stepper.Step>

        <Stepper.Step>
          <div>
            <h2 className="text-2xl font-bold mb-4">Step 3: Profession Experience & Education</h2>
            <label htmlFor="profSummery" className="block mb-2">
              Profession Experience:
            </label>
            <textarea
              type="text"
              id="profSummery"
              name="profSummery"
              value={info.profSummery}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 rounded-md w-full mb-4 h-40"
            />
            <label htmlFor="profSummery" className="block mb-2">
              Education:
            </label>
            <div className="flex gap-1">
            <input
              type="text"
              id="education"
              name="education"
              value={info.eduction}
              onChange={handleEducationChange}
              className="border border-gray-300 px-4 py-2 rounded-md w-10/12"
            />
             <button className="p-2 bg-[#FFCB07] w-2/12 rounded-md" onClick={AddEducation}>Add</button>
            </div>
            <ul className="p-2 flex flex-col gap-2">
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
          </Stepper.Step>        
        </Stepper>


{/*        <div className="mt-6 flex justify-between">
          {step > 1 && (
            <button
              type="button"
              className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded"
              onClick={handlePrev}
            >
              Previous
            </button>
          )}

          {step < 3 && (
            <button
              type="button"
              className="bg-[#FFCB07] hover:opacity-80 text-white py-2 px-4 rounded ml-4"
              onClick={handleNext}
            >
              Next
            </button>
          )}

          {step === 3 && (
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded ml-4"
            >
              Submit
            </button>
          )}
        </div>*/}

        <div className="flex w-full justify-center gap-4">
        {
           active < 2 ?
            <button className="p-2 bg-yellow-500 w-32" onClick={nextStep}>Next</button>  
            :
            <button className="p-2 bg-yellow-500 w-32" onClick={handleSubmit}>Submit</button>  
        }
        </div>



           <Modal
        opened={resizer}
        onClose={()=>setResizer(false)}
     >
     <div className="flex flex-col gap-5">
            <input type="file" onChange={handleFileChange} />
            {image && (
                <div className="flex flex-col gap-2">
                    <AvatarEditor
                        ref={(editorRef) => setEditor(editorRef)}
                        image={image}
                        width={250}
                        height={250}
                        border={50}
                        scale={scale}
                    />
                    <div className="flex gap-2 items-center text-sm">
                    <label>Zoom</label>
                    <input
                        type="range"
                        min="1"
                        max="2"
                        step="0.01"
                        value={scale}
                        onChange={handleScaleChange}
                    />
                    </div>
                    <button className="p-2 bg-yellow-500 rounded-xl" onClick={handleCrop}>Crop & Upload</button>
                </div>
            )}
        </div>
      </Modal>

    </div>
  );
};

export default MultiStepForm;
