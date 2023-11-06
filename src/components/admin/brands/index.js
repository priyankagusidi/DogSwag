import React from 'react';
import {useState,useEffect} from 'react'
import axios from 'axios'
// import { RiEdit2Line, RiDeleteBinLine } from 'react-icons/ri';

const App = () => {
   
const [title,setTitle] = useState("")
const [brands,setBrands] = useState([])

    function handleChange(e){
      console.log(e.target.value)
      setTitle(e.target.value)
    }


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
  },[])


    const addBrand = async() => {

      console.log(title)
      // return

      try {
        await axios.post('/api/brand/create',{title}).then(res=>{
          console.log(res.data)
          fetchBrands()
        })
      } catch(e) {
        console.log(e);
      }
      setTitle("")
  
  };

  return (
    <div>
       <h1>Register Brands</h1>
       
       <div className="mt-2">
         <input onChange={handleChange} className="p-2" placeholder="brandname"/>
         <button onClick={addBrand} className="p-2 bg-blue-500 text-white">Add Brand</button>
       </div>
       <div className="mt-10">
       {
        brands?.map((brand,i)=>{
          return(
              <div key={brand._id} className="flex mt-2">
                 <span className="p-2 bg-white w-96 rounded-md shadow-md">{brand.title}</span>
                 <button  className="p-2 bg-red-500 flex items-center rounded-md shadow-md text-white hover:bg-red-400">Del</button>
            </div>
            )
        })
       }
       
       </div>
    </div>
  );
};

export default App;
