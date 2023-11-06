import {useState} from 'react'
// import { BsCamera } from 'react-icons/bs'
import { blobToURL, fromBlob } from 'image-resize-compress';

function profilePicture({selectedImage,setSelectedImage,setPic,defPic}){
function onSelectedFile(e){
        const maxSize = 1024 * 1024

		if(e.target.files[0].size > maxSize){
			return alert("image size cant exceed more than 1mb")
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
	console.log(selectedImage)
	return(
		   <div className="flex justify-center w-2/6 items-center border h-24 relative">
		   <img className="absolute top-0 left-0 object-cover h-24 w-full brightness-[50%] rounded" src={selectedImage ? selectedImage :"https://via.placeholder.com/1920x1080.png"} />

		   <span className="relative w-full">
		   <input id="profilePicture" accept="image/*" type="file" onChange={onSelectedFile} className="hidden" />
		   <label htmlFor="profilePicture"className="flex justify-center">
		     {/*<BsCamera size={20} className="text-white"/>	*/}
		     <img src="/assets/icons/mode-landscape.svg" className="w-4 h-4"/>	   	
		   </label>
		   </span>
		   </div>
		)
}

export default profilePicture