// pages/VetChatDoctors.js

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const VetChatDoctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch('/api/doctor/profile/all')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setDoctors(data.profileData);
      })
      .catch(error => {
        console.error('Error fetching doctor data:', error);
      });
  }, []);

  return (
    <div className="p-4 bg-white h-screen relative">
      {/*<h2>Doctors</h2>*/}
      <div className="flex gap-4 overflow-x-scroll">
        {doctors.map(doctor => (
          <Link href={`/vetchatdoctors/${doctor._id.toString()}`} key={doctor._id}>
            <div
              className=" border border-gray-300 rounded-md w-72 p-2"
            >
              <img className="w-72 h-72 object-cover" src={doctor.profilePic} alt="" />
              <div className="p-8">
                <h3 className="text-lg text-[#101010] font-medium">{doctor.fullName}</h3>
                <p className="text-[#74747C] text-base font-normal">Hospital Name:</p>
                <p className="text-[#101010] text-lg font-normal">{doctor.location}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default VetChatDoctors;
