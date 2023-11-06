import React from 'react';
import {useState,useEffect} from 'react'
import axios from 'axios'
const App = () => {
    const [users, setUsers] = useState([]);

    async function fetchUser(){
    try {
        await axios.get('/api/user/all').then(res=>{
           console.log(res)
          setUsers(res.data.user)
        })
    } catch(e) {
      // statements
      console.log(e);
    }
  }

  useEffect(()=>{
      fetchUser()
  },[])

  return (
    <div className="grid gap-2">
        <div className="grid grid-cols-12 gap-2">
              <span className="bg-amber-600 text-white p-2 col-span-1">no.</span>
              <span className="bg-amber-600 text-white p-2 col-span-1">Pic</span>
              <span className="bg-amber-600 text-white p-2 col-span-6">email</span>
              <span className="bg-amber-600 text-white p-2 col-span-3">Name</span>
              <span className="bg-amber-600 text-white p-2 col-span-1">role</span>
            </div>
      {
        users.map((u,i)=>{
          return(
            <div key={u._id} className="grid grid-cols-12 gap-2">
              <span className="bg-white p-2 col-span-1">{i+1}.</span>
              <span className="bg-white p-2 col-span-1"><img src={u.profilePic} className="w-5 h-5 rounded-full"/></span>
              <span className="bg-white p-2 col-span-6">{u.email}</span>
              <span className="bg-white p-2 col-span-3">{u.displayName}</span>
              <span className="bg-white p-2 col-span-1">{u.role}</span>
            </div>
            )
        })
      }
        
    </div>
  );
};

export default App;
