import {useState} from 'react'
// import { BsCamera } from 'react-icons/bs'
import { blobToURL, fromBlob } from 'image-resize-compress';
import { isValidPhoneNumber } from 'react-phone-number-input'


function profilePicture({selectedImage,setSelectedImage,setPic,defPic}){
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
		   setPic(blob)
         });

		setSelectedImage(imageArray[0])
	}

	// function onProfileImageError(e){
    //   e.target.src="img/defaultprofile.jpg"
    // }
    
	console.log(selectedImage)
    console.log(defPic)
	return(
		   <div className="flex justify-center">
		   <span className="relative">
		   <input id="profilePicture" accept="image/*" type="file" multiple onChange={onSelectedFile} className="hidden" />
		   <label htmlFor="profilePicture"className="flex h-24 absolute w-full justify-center items-center hover:opacity-50 cursor-pointer">
		     {/*<BsCamera size={20}/>		   	*/}
		     <img src="/assets/icons/mode-portrait.svg" className="w-4 h-4"/>	   	
		   </label>
		      <img className="h-24 w-24 rounded-full object-cover  border border-gray-200 bg-gray-100" src={selectedImage ? selectedImage : defPic} />
		   </span>
		   </div>
		)
}

export default profilePicture