import {Modal} from '@mantine/core'
import {useState,useEffect} from 'react'
import { blobToURL, fromBlob } from 'image-resize-compress';

export default function Dog({dogdata}){


	const [edit,setEdit] = useState(false)
	const [info,setInfo] = useState({
		dogName:dogdata?.profile?.dogName || "bruno",
		dogBreed:dogdata?.profile?.dogBreed || "breed"
	})

	const [selectedImage,setSelectedImage] = useState(null)
    const [pic,setPic] = useState("")

	function handleChange(e){
		setInfo({...info,[e.target.name]:e.target.value})
	}

	async function save(){
		try{
			 // setInfo({})
             setEdit(false)
		}catch(err){
			console.log(err)
		}
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
           // updateImage(blob)
           setPic(blob)
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


	return(
		  <div className="flex font-Inter w-full p-10 lg:p-20 bg-gray-100">
		  	  <div className="flex flex-col lg:flex-row text-center lg:text-start w-full mx-auto max-w-4xl items-center gap-5 lg:gap-10">
                   <div className="w-full relative flex items-center justify-center">
                   <input id="profilePicture" accept="image/*" type="file" onChange={onSelectedFile} className="hidden" />
                   <label htmlFor="profilePicture"className="flex h-24 absolute w-full justify-center items-center hover:opacity-50 cursor-pointer">
                     <img src="/assets/icons/mode-portrait.svg" className="w-4 h-4"/>       
                   </label>
                        <img src={ selectedImage || dogdata?.profile?.dogImage  || "/doguser.png"} className="w-40 lg:w-60 h-40 lg:h-60 object-cover rounded-full"/>
                   </div>
		  	  	  <div className="flex flex-col">
		  	  	  	  <div className="lg:hidden flex items-center justify-center font-bold">
		  	  	         <img className="w-8 h-8" src="/badge.svg" alt="" />
		  	  	         <label className="text-gray-500 text-xl font-black">1st</label>
		  	  	  	  </div>
		  	  	  	  <h1 className="text-3xl lg:text-6xl text-gray-800 font-Jumper">{info?.dogName}</h1>
		  	  	  	  <p className="text-sm lg:text-lg text-gray-500">{info?.dogBreed}</p>
		  	  	  	  <div onClick={()=>setEdit(true)} className="flex gap-2 mt-3 cursor-pointer items-center justify-center lg:justify-start">
		  	  	  	  	<img src="/img/edit.svg" className="w-5 h-5"/>
		  	  	  	  	<span className="text-sm text-gray-500 hover:text-gray-600">Edit</span>
		  	  	  	  </div>
		  	  	  </div>
		  	  	  <div className="w-full hidden lg:flex justify-end flex items-center">
		  	  	     <img className="w-16 h-16" src="/badge.svg" alt="" />
		  	  	     <div className="flex">
		  	  	     <label className="text-gray-500 text-7xl font-black">1</label>
		  	  	     <span className="text-gray-500 text-xl font-black">st</span>
		  	  	     </div>
		  	  	  </div>
		  	  </div>
		  	  <Modal
		  	    opened={edit}
		  	    onClose={()=>setEdit(false)}
		  	    size={'sm'}
		  	    title="Edit"
		  	  >
		  	    <div className="flex gap-1 flex-col text-sm">
		  	    <label>Dog Name</label>
		  	  	<input  value={info.dogName} name={"dogName"} onChange={handleChange} className="p-2  border border-gray-300 rounded-md"/>
		  	    <label>Dog Breed</label>
		  	  	<input value={info.dogBreed}  name={"dogBreed"} onChange={handleChange} className="p-2  border border-gray-300 rounded-md"/>
		  	  	<button onClick={save} className="p-2 bg-[#FFCB07] rounded-md">Save</button>
		  	    </div>
		  	  </Modal>
		  </div>
		)
}