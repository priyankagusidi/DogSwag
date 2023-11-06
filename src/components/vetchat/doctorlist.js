// pages/VetChatDoctors.js

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {useRouter} from 'next/router'
import {Modal} from '@mantine/core'

const VetChatDoctors = ({setDoctorID,search}) => {
  const [doctors, setDoctors] = useState([]);
  const [loading,setLoading] = useState(false)
   // const [isPaid, setIsPaid] = useState(false);


  useEffect(() => {
    fetchDoctors()
  }, []);



 const router = useRouter();

  // useEffect(() => {
  //   // Check if the 'modal' query parameter exists
  //   if (router.query.payment === 'true') {
  //     // Remove the 'modal' query parameter
  //     setIsPaid(true)
  //     delete router.query.modal;

  //     // Replace the URL without the 'modal' parameter
  //     router.replace({ pathname: router.pathname, query: false });
  //   }
  // }, []);


  console.log(doctors)

  async function fetchDoctors() {
    try {
      setLoading(true)
      fetch('/api/doctor/profile/all')
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setDoctors(data.profileData);
          setLoading(false)
        })
        .catch(error => {
          setLoading(false)
          console.error('Error fetching doctor data:', error);
      });
    } catch(e) {
      // statements
      setLoading(false)
      console.log(e);
    }
  }

  if (loading) {
    return <div className="flex justify-center h-[90vh] pt-20"><img src="/gif/spinner.svg" className="w-20 h-20 "/></div>; // Show a loading state while fetching the data
  }

  return (
    <div className="p-4 bg-white min-h-[90vh] relative">
      {/*<h2>Doctors</h2>*/}
    <div className="">
      <div className="grid justify-items-center hxs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 cursor-pointer">
        {doctors.filter((f)=>f?.area?.toLowerCase()?.includes(search?.toLowerCase()))?.map(doctor => {

          return( 
            <div
              key={doctor._id}
              className={`border border-gray-300 rounded-md w-64 relative  p-2`}
              onClick={()=>router.push(`/vetchat/doctor/${doctor.userID}`)}
              id="doctor_profile"
            >
              <img className="w-72 md:w-64 h-64 object-cover" src={doctor.profilePic} alt="" />
              <div className="py-5 px-2 flex flex-col gap-2">
              <p className="text-[#101010] text-md font-normal font-semibold">{doctor.fullName}</p>
                <p className="text-[#101010] text-sm font-normal font-semibold">{doctor.location}</p>
                <p className="text-[#101010] text-sm font-normal">{doctor.area}</p>
               
                <div className="">
                </div>

                <div className="flex gap-1">
                <button className="text-xs bg-amber-700 px-2 py-1 rounded-lg text-white">{`${doctor.availTimeStart} - ${doctor.availTimeEnd}`}</button>
                  <button className="text-xs bg-blue-500 px-2 py-1 rounded-lg text-white">Schedule</button>
                  <button className="text-xs bg-yellow-500 px-2 py-1 rounded-lg text-white">Chat</button>
                </div>
               
              </div>
            </div>
        )})}
      </div>
      </div>
       <div className="mt-20"></div>
    </div>
  );
};

export default VetChatDoctors;
