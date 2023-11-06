import { useState } from "react";
import axios from 'axios'
import Lottie from "lottie-react";
import Medi from './lottie/medi.json'
import Loading from './lottie/loading.json'

const TaskUpload =()=>{
     const [uploading, setUploading] = useState(false); // Add uploading state
     // const [videoURL, setVideoURL] = useState('');
    const [videoFile,setVideoFile] = useState(null)
    const [videoPreview,setVideoPreview] = useState(null)
    const [videoInfo,setVideoInfo] = useState({title:"",description:""})
    const [loading,setLoading] = useState(false)
    const [uploaded,setUploaded] = useState(false)

    function onSelectedFile(e) {

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

    setVideoFile(e.target.files[0])
    setVideoPreview(imageArray[0])
  }


async function uploadVideo(){

    console.log(videoFile,videoInfo)
    setLoading(true)
    // return
   try{
       const formData = new FormData();
       
       formData.append("videoFile", videoFile)
       formData.append("title", videoInfo.title)
       formData.append("description", videoInfo.description)

        await axios.post('/api/activity/create',formData).then(res=>{
        setLoading(false)
        setUploaded(true)
        console.log(res.data)
      })
   }catch(err){
     console.log(err)
    setLoading(false)

   }    
}

function handleChange(e){
    setVideoInfo(prev=>({...prev,[e.target.name]:e.target.value}))
}




if(uploaded){
    return(
         <div className="h-[500px] p-3 font-bold font-Inter flex flex-col gap-4 mix-blend-darken w-full flex justify-center items-center">
          <div className="text-2xl text-center justify-center items-center flex flex-col gap-4">
               <img src="/happydog.svg" className="w-60 h-60 "/>
             <h3 className="text-lg">Yipee! Your Video is uploaded! It will get featured in 24 hours</h3>
          </div>
         </div>
        )
}



if(loading){
    return(
          <div className="h-[500px]  font-bold flex flex-col w-full justify-center items-center">
           <Lottie.default  animationData={Medi} loop={true} autoplay={true} className="w-60 mt-20 object-cover"/>
           <Lottie.default  animationData={Loading} loop={true} autoplay={true} className="w-96 h-96 -mt-20"/>
         </div>
        )
    
}




    return (
         <div className="flex flex-col my-12 p-3">
        

        <div className="flex justify-center lg:justify-end w-full">
                <div className="">
                    <h1 className="font-bold text-4xl lg:text-7xl uppercase font-Jumper tracking-widest text-gray-700 text-center">Task for the week</h1>
                </div>
        </div>



{/*videoPreview*/}
        <div className="flex lg:flex-row flex-col mb-4 gap-4">
        <div className={` bg-gray-100 ${!videoPreview && "h-48 "} flex items-center  justify-center  lg:w-1/2 rounded-2xl`}>

          { uploading ? (
        // Show loader while uploading
          <div className="animate-spin ease-linear rounded-full border-t-4 border-t-[#FFCB07] border-[4px] h-12 w-12 mx-auto flex flex-col justify-center">          <p className="mt-2">Uploading Video...</p>
          </div> 
      ) :  videoPreview ? (
            <video controls className="h-48 w-full" style={{ borderRadius: '10px' }}>
              <source src={videoPreview} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img src="/Play Button Circled.png"  alt="Placeholder"  />
          )}
        </div>
        </div>


{/*upload video*/}
        <div className="w-1/2">
          <label for="videoUpload" className="text-xl p-2 flex w-full bg-yellow-200 items-center gap-2 rounded-xl justify-center cursor-pointer hover:bg-yellow-300">
            Upload Video
            <img className="lg:w-[40px] lg:h-[40px] h-[25px] w-[25px]" src="/uploadvideoicon.png" alt="" />
          </label>
          <input type="file" id="videoUpload" className="hidden"  onChange={onSelectedFile} />
        </div>

        <div>
            <input name="title" onChange={handleChange} className="rounded-xl w-full mt-4 p-3 border border-gray-300" type="text" required placeholder="Insert your catchy title"/>
        </div>

        <div>
            <textarea  name="description" onChange={handleChange} className="rounded-xl w-full h-40 mt-4 p-3 border border-gray-300" type="text" required placeholder="Video Description" />
        </div>
         <div onClick={uploadVideo} className="bg-yellow-500 mt-4  text-[#FFFFFF8F] text-center  w-2/5 text-xl lg:text-2xl font-medium p-3 rounded-xl hover:after:content-['_↗'] cursor-pointer">Get Started </div>
       
    </div>
    )
}

export default TaskUpload