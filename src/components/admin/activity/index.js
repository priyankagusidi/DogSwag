import React from 'react';
import {useState,useEffect} from 'react'
import axios from 'axios'
// import { RiEdit2Line, RiDeleteBinLine } from 'react-icons/ri';

const App = () => {
   
const [title,setTitle] = useState("")
const [brands,setBrands] = useState([])
const [value,setValue] = useState({})
const [activity,setActivity] = useState([])
const [curMonth,setCurMonth] = useState("January")
const [newVideoLink, setNewVideoLink] = useState('');

    // function handleChange(e){
    //   console.log(e.target.value)
    //   setTitle(e.target.value)
    // }


  async function fetchBrands(){
    try {
        await axios.get('/api/activity/publicvideo').then(res=>{
           console.log(res)
          setBrands(res.data.Videos)

        })
    } catch(e) {
      // statements

      console.log(e);
    }
  }

  useEffect(()=>{
        fetchActivity()

     fetchBrands()
  },[])


   async function fetchActivity(){
    try {
        await axios.get('/api/activity/getallactivity').then(res=>{
           console.log(res)
          setActivity(res.data.activity)

        })
    } catch(e) {
      // statements

      console.log(e);
    }
  }


  async function handleAddVideo(e,userId,uploadedVideoId) {
    e.preventDefault();

    const videoId = extractVideoId(newVideoLink);

    try {

    const newVideo = {
      videoId: videoId,
      userId:userId,
      uploadedVideoId:uploadedVideoId
    };
      
      await axios.post('/api/video/create',newVideo).then((res=>{
        console.log(res.data)
        fetchBrands()
      }))

    } catch(e) {
      console.log(e);
    }

    setNewVideoLink('');
  }

  function extractVideoId(link) {
    // Extract the video ID from the YouTube link
    // Example link: https://www.youtube.com/watch?v=ABC12345
    const videoId = link.split('v=')[1];
    return videoId;
  }



  //   const addBrand = async() => {

  //     console.log(title)
  //     // return

  //     try {
  //       await axios.post('/api/brand/create',{title}).then(res=>{
  //         console.log(res.data)
  //         fetchBrands()
  //       })
  //     } catch(e) {
  //       console.log(e);
  //     }
  //     setTitle("")
  
  // };


  function handleChange(e){
     setValue({...value,[e.target.name]:e.target.value})
  }
  
  async function submit(){

    console.log(value)
    // return
    try{
       await axios.post('/api/activity/createactivity',{
          title:value.title,
          description:value.description,
          week:value.week ,
          month:value.month ,
          year:value.year
       }).then(res=>{
        fetchActivity()
        console.log(res.data)
       })

    }catch(err){
      console.log(err)
    }
  }

  console.log(brands)
  console.log(activity)


  return (
    <div>
       
       <div>
         <h1 className="text-2xl font-semibold">Create Activity</h1>
         <div className="flex flex-col gap-2 max-w-sm">
           <input onChange={handleChange} name="title" className="p-2 border" placeholder="title" />
           <input onChange={handleChange} name="description"className="p-2 border" placeholder="description" />
            <div className="flex gap-2">
             <select name="week" className="p-2 bg-white" id="selectOptions"  onChange={handleChange}>
              <option value="">Select week</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
         <select  onChange={handleChange}name="month" className="p-2 bg-white">
            <option value="">Select month</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
        </select>

        <select onChange={handleChange} name="year" className="p-2 bg-white">
          <option value="">Select year</option>
          <option>2023</option>
          <option>2024</option>
        </select>
      </div>

      <button onClick={submit} className="p-2 bg-yellow-500">Create Activity</button>

         </div>

         <div className="mt-5">
           <select onChange={(e)=>setCurMonth(e.target.value)} className="p-2 bg-white">
                <option>January</option>
                <option>February</option>
                <option>March</option>
                <option>April</option>
                <option>May</option>
                <option>June</option>
                <option>July</option>
                <option>August</option>
                <option>September</option>
                <option>October</option>
                <option>November</option>
                <option>December</option>
           </select>
         </div>

         <div className="mt-10 flex flex-col gap-2 ">
         {
            activity.filter((f,i)=>f.month === curMonth)?.map((m,i)=>{
              return(
                  <div key={i} className="flex flex-col rounded-md bg-white gap-2 p-2">
                    <h1 className="text-md font-bold">Week {m.week}</h1>
                    <h1 className="text-xl">{m.title}</h1>
                    <h1>{m.description}</h1>
                  </div>
                )
            })
         }
          
         </div>
       </div>
    
       <div className="mt-10">
       {
        brands?.map((brand,i)=>{
          return(
              <div key={brand._id} className="flex justify-between mt-2 bg-white p-2">
                 <div className="flex flex-col">
                 <span className="p-2 bg-white w-96 font-black text-2xl font-semibold">{brand.title}</span>
                 <span className="p-2 bg-white w-96 ">{brand.description}</span>
                 {
                   brand.reuploaded?
                   <div className="p-2 text-sm text-green-500">Already Uploaded</div>
                   :
                   <div className="max-w-md">
                   <input onChange={(e)=>setNewVideoLink(e.target.value)} placeholder="Paste youtube link" className="p-2 rounded-md text-sm border border-gray-400 w-full" />
                   <button onClick={(e)=>handleAddVideo(e,brand.userID,brand._id)} className="p-2 bg-yellow-500 mt-2 text-sm rounded-lg text-white">Submit</button>
                 </div>
                 }
                 
                 </div>
                 <video className="w-40 h-40 object-cover" src={brand.videoFile} controls/>
              </div>
            )
        })
       }
       
       </div>
    </div>
  );
};

export default App;

