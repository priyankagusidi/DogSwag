import React from 'react';
import {useState,useEffect} from 'react'
import axios from 'axios'
// import { RiEdit2Line, RiDeleteBinLine } from 'react-icons/ri';

const App = ({currentVideo,setCurrentVideo}) => {
  

 console.log(currentVideo)  
const [brands,setBrands] = useState([])

  async function fetchBrands(){
    try {
        await axios.get('/api/brand/all').then(res=>{
           console.log(res)
           setBrands(res.data.Brands)
        })
    } catch(e) {
      // statements

      console.log(e);
    }
  }

  useEffect(()=>{
     fetchBrands()
  },[currentVideo._id])


  async function handleSponsore(brand){
    try {
        await axios.put(`/api/video/edit/${currentVideo._id}`,{sponsoredBy:brand._id}).then(res=>{
           console.log(res)
           fetchBrands()
        })
      // let update = 
      // console.log(update)  
        setCurrentVideo({...currentVideo,sponsoredBy:{...currentVideo.sponsoredBy,_id:brand._id}})        
    } catch(e) {
      console.log(e);
    }
  }

  // useEffect(()=>{
  //   setBrands(brands)
  // },[currentVideo])

console.log(brands)
  return (
    <div>
       <h1 className="text-2xl font-bold">Select One Brand to promote in this video</h1>

       <div className="mt-3">
       {
        brands.map((brand,i)=>{
          return(
              <div key={brand._id} className="flex mt-2 gap-2">
                 <span className="p-2 bg-white w-96 rounded-md shadow-md">{brand.title}</span>
                 <button onClick={()=>handleSponsore(brand)} className="p-2 bg-blue-500 flex items-center rounded-md shadow-md text-white hover:bg-blue-400">{currentVideo.sponsoredBy?._id === brand._id ? "Added":"Add"}</button>
            </div>
            )
        })
       }
       
       </div>
    </div>
  );
};

export default App;
