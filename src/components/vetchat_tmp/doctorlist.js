// pages/VetChatDoctors.js

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';


const VetChatDoctors = ({setDoctorID}) => {
  const [doctors, setDoctors] = useState([]);
  const [loading,setLoading] = useState(false)
  const router = useRouter();

  useEffect(() => {
    fetchDoctors()
  }, []);

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
    return <div className="flex justify-center h-full pt-20"><img src="/gif/spinner.svg" className="w-20 h-20 "/></div>; // Show a loading state while fetching the data
  }

  return (
    <div className="p-4 bg-white  relative">
      {/*<h2>Doctors</h2>*/}
      <div className="grid md:grid-cols-4 gap-4 justify-center cursor-pointer">
        {doctors.map(doctor => {

          const currentTime = new Date();

          // Extract the hours and minutes from the current time
          const currentHour = currentTime.getHours();
          const currentMinutes = currentTime.getMinutes();

          
          // Function to check if the current time is within the given time range
          function isTimeInRange() {
             
              const [startHour, startMinute] = doctor.availTimeStart.split(":").map(Number);
              const [endHour, endMinute] = doctor.availTimeEnd.split(":").map(Number);

              const startMinutes = startHour * 60 + startMinute;
              const endMinutes = endHour * 60 + endMinute;

              // Convert current time to minutes
              const currentMinutesTotal = currentHour * 60 + currentMinutes;

              // Check if the current time is between start and end time
              return currentMinutesTotal >= startMinutes && currentMinutesTotal <= endMinutes;
          }

          return( 
            <div
              key={doctor._id}
              className={`${isTimeInRange() ? "":"opacity-50"} border border-gray-300 rounded-md w-72 relative md:w-64 p-2`}
              onClick={isTimeInRange() ? ()=>router.push({pathname: `/vetchat/doctor/${doctor.userID}`}, undefined, { scroll: true }):()=>alert('Not Available!')}
              id="doctor_profile"
            >
              <img className="w-72 md:w-64 h-64 object-cover" src={doctor.profilePic} alt="" />
              <div className="p-8 ">
                <h3 className="text-lg text-[#101010] font-medium">{doctor.fullName}</h3>
                <p className="text-[#74747C] text-sm font-normal">Hospital Name:</p>
                <p className="text-[#101010] text-sm font-normal">{doctor.location}</p>
                <button className="absolute bottom-2 text-xs mt-1 p-2 bg-yellow-300 rounded-lg">{`${doctor.availTimeStart} - ${doctor.availTimeEnd}`}</button>
              </div>
            </div>
        )})}
      </div>
       <div className="mt-20"></div>
    </div>
  );
};

export default VetChatDoctors;
