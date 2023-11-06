import { useState, useEffect } from 'react';
import { fromBlob } from 'image-resize-compress';
import {useRouter} from 'next/router'


function ProfilePicture({ setSelectedVideo,userdata, setIsMemeModalOpen, setPic, setContainer, setSelectedImage,container, pic, selectedVideo }) {
  const [left, setLeft] = useState(1);
  const router = useRouter()

  

  function onSelectedFile(e) {

    console.log(e.target.files)

    if (e.target.files.length < 1) {
      console.log('error less than 1 image');
      return;
    }

    if(e.target.files[0].size > 10 * 1024 * 1024)
    {
       alert("video size cant be more than 10mb")
       return 
    }
    const selectedArray = Array.from(e.target.files)

    const imageArray = selectedArray.map((file)=>{
      return URL.createObjectURL(file)
    })
    setPic([e.target.files[0]])
    setSelectedVideo(imageArray[0])
    setSelectedImage(null)
  }

  return (
    <div className="">
      <div className="flex justify-center">
        <input id="videofile" type="file"  onChange={onSelectedFile} accept="video/mp4,video/mkv, video/x-m4v,video/*" className="hidden"/>
        {/*<input id="profilePicture" type="file" onChange={onSelectedFile} accept="video/mp4,video/mkv, video/x-m4v,video/*" className="hidden"/>*/}
        <label htmlFor="videofile" className="cursor-pointer flex gap-2 rounded-lg justify-center items-center h-10 p-2 w-fit bg-black text-white">
          <img src="/assets/icons/square-plus.svg" className="w-4 h-4 bg-[white] rounded-lg" />
          <span className="text-sm">{selectedVideo ?"Change video" :"Add video"}</span>
        </label>
      </div>
    </div>
  );
}

export default ProfilePicture;
