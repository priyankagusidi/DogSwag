import {Modal} from '@mantine/core'
import React, { useState } from 'react';
import { useRouter } from 'next/router'
import axios from 'axios'

const Calendar = ({onedogprofiledata}) => {
 //  console.log(onedogprofiledata)
 //  const [dogProfileInfo,setDogProfileInfo] = useState(onedogprofiledata && onedogprofiledata.profileData?onedogprofiledata.profileData : {})
 //  function handleChange(e){
 //      setDogProfileInfo({...dogProfileInfo,[e.target.name]:e.target.value})
 //  }
 //  const router = useRouter()

 // async function SaveProfile(){
 //    try{
 //    await axios.put(`/api/dogprofile/profile/edit/${router.query.id}`,dogProfileInfo,{
 //            credentials: 'include'
 //    }).then(res=>{
 //      console.log(res)
 //    })
 //    }catch(e){
 //       console.log(e)
 //    }
 // }
// name,age,weight,breed,parentsname,parentsaddress,parentsphoneno,vetsname,vetsphoneno,emergencypersonsname,emergencypersonsphoneno
  return (
    <div className="">

     {/**/}
    </div>
  );
};

export default Calendar;



