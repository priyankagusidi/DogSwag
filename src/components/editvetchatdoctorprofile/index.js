
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const EditVetChatDoctorsProfile = () => {
  

  
  return (
    <div className="mx-auto">
      {/* doctor name image and start chat button */}
    <div
     className="mt-16  md:w-[1010px]" 
    style={{
        borderRadius: '20px',
     padding: '20px', 
     border:' 3px solid var(--black-10, rgba(0, 0, 0, 0.10))'}}>

  <div className="flex items-center">
<div className="flex items-center gap-4 ">
<img
 style=
 {{borderRadius: '2000px', 
width: '100px', 
height: '100px'}} 
src="https://i.ibb.co/37RnmwW/Avatar-3.png" alt="" />
<div>
<h2 className="text-[#101010] font-medium text-3xl">will come from doctors user information</h2>
<p className="text-2xl  items-center font-normal flex gap-2 text-[#74747C]"> <img className="w-[16px]  h-[16px]" src="/earthSVG.svg" alt="" />will come from doctors user information</p>

</div>
</div>
<Link href="/doctorschatconversationlist"><button className="ml-auto justify-end" 
style={{
borderRadius: '20px', 
color: 'var(--white-100, #FFF)',
fontSize: '16px',
fontFamily: 'Inter',
fontStyle: 'normal',
fontWeight: '500',
lineHeight: 'normal',
border:' 4px solid rgba(255, 203, 7, 0.30)', 
padding: '16px 40px',
background: 'var(--primary, #FFCB07)'}}
>Done</button></Link>
    

</div>
</div>
<div className="flex gap-20  mt-10">
<div className="md:block doctor-information-box">
  <div style={{borderRadius: '16px',
   width: '340px',
border:'3px solid var(--black-10, rgba(0, 0, 0, 0.10))',
 padding: '0px 20px 16px 20px'
}}  >
    <div className="flex gap-8 items-center mt-3 ">
    <img src="/hospitalSVG.svg" alt="" />
    <div>
      <p className="text-sm text-[#74747C] font-normal">Hospital / Clinic</p>
      <h3 className="text-[#101010] text-base font-medium"> will come from doctors user information</h3>
    </div>
    </div>
  </div>
  <div style={{borderRadius: '16px',
border:'3px solid var(--black-10, rgba(0, 0, 0, 0.10))',
 padding: '0px 20px 16px 20px', 
 width: '340px'

}}   >
  <div className="mt-3 flex gap-8 items-center ">
  <img src="/starSVG.svg" alt="" />
    <div>
      <p className="text-sm text-[#74747C] font-normal">Years Of Experience</p>
      <h3 className="text-[#101010] text-base font-medium">will come from doctors user information</h3>
    </div>
  </div>
  </div>
  <div style={{borderRadius: '16px',
border:'3px solid var(--black-10, rgba(0, 0, 0, 0.10))', 
padding: '0px 20px 16px 20px',
 width: '340px'

}}  >
   <div  className="flex gap-8 items-center mt-3 ">
   <img src="/clockSVG.svg" alt="" />
    <div>
      <p className="text-sm text-[#74747C] font-normal">Available Time </p>
      <h3 className="text-[#101010] text-base font-medium">will come from doctors user information</h3>
    </div>
   </div>
  </div>
</div>
<div className="mr-16 mt-4" 
style={{borderRadius: '16px', 
border: '3px solid var(--black-10, rgba(0, 0, 0, 0.10))'}}>
<div style={{borderBottom: '3px solid var(--black-10, rgba(0, 0, 0, 0.10))'}}>
  <h3 className="text-2xl px-[20px] pt-6 flex gap-2 items-center font-medium text-[#101010]">
   <img src="/doctorSVG.svg" alt="" /> Professional Summary</h3>
<p className=" px-[20px] mb-6"
 style={{color:' var(--black-50, #74747C)',
marginTop: '8px',
fontSize: '18px',
fontFamily: 'Inter',
fontStyle: 'normal',
fontWeight: '400',
lineHeight: '30px'}}>Summary will come from doctors user information</p>
</div>
<div style={{borderBottom: '3px solid var(--black-10, rgba(0, 0, 0, 0.10))'}} 
className="mt-4">
  <h3 className="text-2xl  flex gap-2   px-[20px]    items-center font-medium text-[#101010]">
     <img src="/educationSVG.svg" alt="" /> Education  Summary</h3>
<ul className="list-disc list-inside px-[20px] mb-6"
 style={{color:' var(--black-50, #74747C)',
marginTop: '8px',
fontSize: '18px',
fontFamily: 'Inter',
fontStyle: 'normal',
fontWeight: '400',
lineHeight: '30px'}}

>
   <li className="list-items">Education will come from doctors user information </li> 
<li className="list-items">Education will come from doctors user information </li> 
</ul>

</div>
<div className="mt-4"><h3 className="text-2xl px-[20px] flex gap-2 items-center font-medium text-[#101010]"> <img src="/doctorSVG.svg" alt="" /> Professional Summary</h3>
<p className="px-[20px] mb-6" style={{color:' var(--black-50, #74747C)',
marginTop: '8px',
fontSize: '18px',
fontFamily: 'Inter',
fontStyle: 'normal',
fontWeight: '400',
lineHeight: '30px'}}>Education will come from doctors user information</p>
</div>
</div>
</div>


</div>
    
  );
};

export default EditVetChatDoctorsProfile;
