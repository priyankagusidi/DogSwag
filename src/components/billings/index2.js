import React from 'react'
import { isValidPhoneNumber } from 'react-phone-number-input'
import {useState,useRef,useEffect} from 'react'
import axios from 'axios'
import dynamic from 'next/dynamic';
import 'react-phone-number-input/style.css'
import { Tabs } from '@mantine/core';

const Select = dynamic(() => import('@mantine/core').then((m) => m.Select), {
  ssr: false,
});
const OtpInput = dynamic(() => import('./otp'), {
  ssr: false,
});
const PhoneInput = dynamic(() => import('react-phone-number-input'), {
  ssr: false,
});
const Switch = dynamic(() => import('@mantine/core').then((m) => m.Switch), {
  ssr: false,
});
import paypal from 'paypal-rest-sdk';


import Timer from './timer'

const Billing_section = ({userprofiledata,noofblogs}) => {
  const [phoneValue,setPhoneValue]=useState(userprofiledata.user && userprofiledata.user.havepaymentInfo ? userprofiledata.user.phoneno :"" )
  const [upi,setUpi] = useState(userprofiledata.user && userprofiledata.user.havepaymentInfo ? userprofiledata.user.UPI :"" )
  const [otp, setOtp] = useState(["", "", "", ""]);
  const  inputsRef = useRef([]);
  const [timer, setTimer] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [sendCount,setSendCount] = useState(0)
  const [isSavingPaymentInfo,setSavingPaymentInfo] = useState(false)
  const [errMsg,setErrMsg] = useState("")
  const [WithDrawScreen,setWithDrawScreen] = useState(userprofiledata.user && userprofiledata.user.havepaymentInfo ? true :false )
  const [withdrawAmount,setWithdrawAmount] = useState(0)
  const [isWithDrawing,setWithDrawing] = useState(false)
  const [withdrawn,setWithDrawn] = useState(userprofiledata.user && userprofiledata.user.withdrawn ? userprofiledata.user.withdrawn :0)
  const [readtime,setReadTime] = useState((userprofiledata.user.readtime/60).toFixed(2))
  const [balance,setBalance] = useState(readtime-withdrawn)


  async function sendOtp(){
      if(!phoneValue){
        alert("phone number can't be empty")
        return
      }
      if(!isValidPhoneNumber(phoneValue)){
        alert("Invalid")
        return
      }
      try{
        await axios.post('/api/otp/create',{phoneno:phoneValue}).then(res=>{
            console.log(res.data)
          })
      }catch(err){
        console.log(err)
      }
      startTimer()
  }
  
  async function handleUpi(e){
      setUpi(e.target.value)
  }

  async function SavepaymentInfo(){

    setSavingPaymentInfo(true)
       if(!upi){
          alert("Enter upi")
       }
       if(!phoneValue){
        alert("phone number can't be empty")
        return
      }
      if(!isValidPhoneNumber(phoneValue)){
        alert("Invalid phoneno")
        return
      }

       try{
         await axios.post('/api/payment/create',{upi,phoneno:phoneValue,otp:otp.join("")}).then(res=>{
            console.log(res.data)
            setUpi(res.data.userInfo.UPI)
            setPhoneValue(res.data.userInfo.phoneno)
            setWithDrawScreen(true)
          })
         setSavingPaymentInfo(false)
       }catch(err){
          console.log(err)
          setSavingPaymentInfo(false)
          setErrMsg(err.response.data.msg)
       }
  } 

    const handleChange = (e, index) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);

    if (e.target.value !== "" && index < otp.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text/plain").slice(0, 4);
    const newOtp = [...otp];
    pasteData.split("").forEach((val, i) => {
      newOtp[i] = val;
    });
    setOtp(newOtp);
  };  

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTimer(timer => timer - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive]);

  const startTimer = () => {
    setIsActive(true);
    setSendCount(1);
  };

  useEffect(() => {
    if (timer === 0) {
      setIsActive(false);
      setTimer(60);
    }
  }, [timer]);

  function withdrawHandle(e){
    setWithdrawAmount(e.target.value)
  }

  console.log(balance,withdrawAmount,balance>withdrawAmount)
  async function withdraw(){
    if(parseInt(withdrawAmount) > parseInt(balance)){
        alert("You don't have enough balance")
       return
    }
    setWithDrawing(true)
    try{
      axios.post("/api/withdraw/create",{
          upi:upi,
          amount:withdrawAmount, 
          phoneno:phoneValue,
          name:`${userprofiledata.user && userprofiledata.user.firstname}  ${ userprofiledata.user && userprofiledata.user.lastname}`
      }).then(res=>{
        console.log(res)

        setWithDrawn(res.data.userInfo.withdrawn)
        setBalance(readtime - res.data.userInfo.withdrawn)
        setWithDrawing(false)
        alert("You will be paid within 48 hours")
      })
    }catch(err){
      setWithDrawing(false)
      console.log(err)
    }


  }

  return (     

    <div className="max-w-[1000px] mx-auto mt-5 font-[poppins] pb-32">
       <div className=''>
        <h1 className='md:text-2xl sm:text-xl text-lg text-gray-600 font-semibold'>Billing Section</h1>
       </div>

    <div className="grid gap-3 mt-4">

       <div className='grid items-center gap-2 rounded border bg-white px-5 py-10'>
        <h3 className='text-md text-gray-600 font-semibold'>Payment Schedule :</h3>
         <div className="text-xs">           
            <li>Once in 15 days</li>
            <li>window open for  3 days for transfer request</li>
            <li>you can withdraw the full amount or in parts once in 15 days</li>
         </div>
         <div className="bg-yellow-100 p-2 text-xs mt-4">
              <h1 className="font-semibold text-sm">Ref.</h1>
              <li>Window opens on 2nd and 17th of each.</li>
<li>Withdrawal request open for 3 days from cycle open day</li>
<li>You will be notified about window opening via email and notified film</li>
<li>If you missed withdrawing in one cycle not to worry you can withdraw in the next payment cycle
You can withdraw in full or in parts.</li>
         </div>
         <div className="mt-5">
           <h3 className='text-md text-gray-600 font-semibold'>Next cycle starts in :</h3>
           <button className="bg-green-800 px-2 rounded text-white text-sm ">17th April</button>
         </div>
      </div>
      {/*stats*/}
      <div className="bg-white border px-5 pt-2 pb-10 rounded">
      <h1 className="text-[#822500] text-center text-xl font-bold uppercase py-5 underline">Stats</h1>
      <div className=' grid sm:grid-cols-3 rounded justify-center justify-items-center gap-2'>
        
        <div className='text-center text-sm uppercase'>
            <h3 className='text-gray-500'>Total number of blogs</h3>
            <div className="flex justify-center"><h2 className='w-fit p-2 bg-[#822500] rounded-full w-24 text-white border-white border-4 shadow-md hover:shadow-lg md:text-sm text-xs'>{noofblogs}</h2></div>
        </div>
        <div className='text-center text-sm uppercase'>
            <h3 className='text-gray-500'>Total number of views</h3>
            <div className="flex justify-center"><h2 className='w-fit p-2 bg-[#822500] rounded-full w-24 text-white border-white border-4 shadow-md hover:shadow-lg md:text-sm text-xs'>{userprofiledata && userprofiledata.user && userprofiledata.user.totalviews}</h2></div>
        </div>
        <div className='text-center text-sm uppercase'>
            <h3 className='text-gray-500'>Total read time (in minutes)</h3>
            <div className="flex justify-center"><h2 className='w-fit p-2 bg-[#822500] rounded-full w-24 text-white border-white border-4 shadow-md hover:shadow-lg md:text-sm text-xs'>{userprofiledata && userprofiledata.user && (userprofiledata.user.readtime/60).toFixed(2)}</h2></div>
        </div>
      </div>
      </div>

      {/*payment calculation*/}
      <div className='grid items-center gap-2 rounded border bg-white px-5 py-10'>
        <h3 className='text-md text-gray-600 font-semibold'>Payment calculation :</h3>
        <div className="flex items-center gap-2">
        <p className=' text-gray-500 md:text-sm text-xs'>Total views</p>
        <p className="text-black md:text-sm text-xs">{userprofiledata && userprofiledata.user && userprofiledata.user.totalviews}</p>
        </div>
        <div className="flex items-center gap-2">
        <p className=' text-gray-500 md:text-sm text-xs'>Total withdrawn </p>
        <p className="text-black md:text-sm text-xs">{withdrawn}</p>
        </div>
        <div className="flex items-center gap-2">
        <p className=' text-gray-500 md:text-sm text-xs'>Balance</p>
        <p className="text-black md:text-sm text-xs">{balance}</p>
        </div>
      </div>

      {/*billing information and withdrawl*/}
      {
        WithDrawScreen ? 
      <div className="grid gap-4 bg-white rounded border px-5 py-10">
            <h3 className='text-md text-gray-600 font-semibold'>Withdraw payment </h3>
          <div className="flex flex-col sm:flex-row gap-2">
            <input onChange={withdrawHandle} placeholder="enter amount" className="p-2 border border-[#d3d9e3] rounded-[5px] text-[15px] p-[7px] bg-[#f2f4f7]" />
            <button onClick={withdraw} className={`w-full sm:w-24 p-2 rounded text-xs  ${isWithDrawing? "bg-gray-200" :"bg-black"}  text-white`} disabled={isWithDrawing? true:false}>Withdraw</button>
          </div>


      </div>

      :
      <div className="grid items-center gap-4 bg-white rounded border px-5 py-10">

           <div>
           <h3 className='text-md text-gray-600 font-semibold'>Request payment </h3>
          
          <div className='grid md:grid-cols-2'>
            <div className='flex gap-1 items-center py-2'>
                <p className='text-gray-500 md:text-sm text-xs'>Your</p>
                <img src="/img/phonepe.png" alt="Phonepe" className='md:h-5 h-4' />
                <p className='text-gray-500 md:text-sm text-xs'>/</p>
                <img src="/img/googlePay.png" alt="google-pay" className='md:h-4 h-3'/>
                <p className='text-gray-500 md:text-sm text-xs'>UPI</p>
            </div>
            <input onChange={handleUpi} name="upi" placeholder="enter UPI" className="p-2 border border-[#d3d9e3] rounded-[5px] text-[15px] p-[7px] bg-[#f2f4f7]" />
            {/*<TextField required id="outlined-basic" label="" defaultValue="" variant="outlined" className='' size='small' placeholder=''/>*/}
          </div>
          
          </div>


      <div className='grid gap-3'>
         <div className="grid md:grid-cols-2 items-center">
         <p className=' text-gray-500 md:text-sm text-xs py-2'>Your phone number </p>
         <PhoneInput
              defaultCountry="IN"
              placeholder="enter phone number"
              value={phoneValue}
              onChange={setPhoneValue}
          />
         </div>
         <div className="flex justify-end"><button disabled={isActive} onClick={sendOtp} className={`w-28   text-xs px-2 py-1 rounded ${!isActive? "bg-[#822500] text-white" :"bg-gray-300 text-gray-500"}`}>{isActive ? `Resend in ${timer}s` : !sendCount?"Send OTP": "Resend OTP" }</button> </div>
      </div>


      <div className='grid md:grid-cols-2 items-center'>
          <div className=""><p className='text-gray-500 md:text-sm text-xs py-2'>Enter OTP </p></div>
          <div className="flex justify-start"><OtpInput inputsRef={inputsRef} handleChange={handleChange} handlePaste={handlePaste} otp={otp} className=""/></div>          
      </div>


      <div className='flex justify-end'>
      <button onClick={ SavepaymentInfo} className='py-2 w-24 rounded text-xs  bg-black  text-white'>Submit</button>
      </div>


{
  errMsg ? <div className="flex rounded text-xs text-red-500 py-2 px-2 w-full bg-red-200">{errMsg}</div> : <></>
}
      


      </div>
      
  }
      
    <div className='flex flex-col gap-2 rounded border bg-white px-5 py-10 h-[500px]'>
    <h3 className='text-md text-red-800 font-semibold' >Coming soon</h3>
    <Tabs defaultValue="ads" color="red">
      <Tabs.List>
        <Tabs.Tab value="ads" icon={<img src="/assets/icons/ad.svg" className="w-4"/>}><div className="flex items-center gap-1">Ads<img src="/img/lock.png" className="w-3"/></div></Tabs.Tab>
        <Tabs.Tab value="verified" icon={<img src="/assets/icons/badge-check.svg" className="w-4"/>}><div className="flex items-center gap-1">Verified<img src="/img/lock.png" className="w-3"/></div></Tabs.Tab>
        <Tabs.Tab value="memes" icon={<img src="/assets/icons/face-sunglassess.svg" className="w-4"/>}><div className="flex items-center gap-1">Memes<img src="/img/lock.png" className="w-3"/></div></Tabs.Tab>
        {/*<Tabs.Tab value="spansoredblogs" icon={<img src="/assets/icons/usd-circle.svg" className="w-4"/>}>Sponsored Blogs</Tabs.Tab>*/}
      </Tabs.List>

      <Tabs.Panel value="ads" pt="xs">
         <div className="text-xs">           
               <li>Be the Ad Boss</li>
               <li>Choose the Ad you wish to promote from the Ad gallery</li>
               <li>Get to earn up to 20% of the Ad revenue (Min 10%)</li>
               <li>Skip if you wish to not promote any brand on your blog (turn the ad gallery off under your billing section).</li>
               <li>No showing Ads outside of the Ad gallery on any of your blogs (Leads to immediate suspension of account).</li> 
         </div>
         <div className="bg-yellow-100 p-2 text-xs mt-4">
              <h1 className="font-semibold text-sm">Criteria</h1>
              <li>Write 5 short insightful blogs</li>
              <li>Get 1000 views or 200 minutes of read time cumulatively </li>
              <li>The Ad gallery will get automatically unlocked once the criteria are met.</li>
         </div>
         <div className="flex p-2 bg-gray-50 mt-5 justify-center">
                <Switch 
                 label="Activate ads"
                 disabled={true}
                />
         </div>
{/*         <div className="bg-gray-50 p-2 h-80 ">
             <div className="flex h-full justify-center items-center">
                <img src="/assets/icons/lock.svg" className="w-14 h-14" />
             </div>
         </div>*/}
      </Tabs.Panel>

      <Tabs.Panel value="verified" pt="xs">
          <div className="text-xs">
               <h1>Everybody gets a chance to become a verified member. Verified members get perks that stand out and those are: </h1>           
               <li>A verified badge </li>
               <li>Higher per-minute read time blog payout (You will get an email with details)</li>
               <li>Upto 30% Ad gallery payouts (Min 20%)</li>
               <li>Quarterly brand-sponsored goodie bag for you and your furkid</li>
               <li>Higher Meme Payouts (Details on email)</li> 
               <li>First-choice picks on sponsored blogs and a higher payout</li> 
         </div>
         <div className="bg-yellow-100 p-2 text-xs mt-4">
              <h1 className="font-semibold text-sm">Criteria</h1>
              <li>Promote and recommend <span className="text-blue-500"><a href="https://dogswag.club">dogswag.club</a></span> to readers and writers</li>
              <li>50,000 views and 10,000 mins read time (Cumulatively )</li>
              <li>Should be active on the platform </li>
         </div>
  
      </Tabs.Panel>

      <Tabs.Panel value="memes" pt="xs">
         <div className="p-2 h-80 ">
          <div className="text-xs">           
               <li>A comical dog take and twist on quotes, trends, and current affairs. </li>
               <li>Create memes, make them fun, stay away from politics, and ensure it is original. </li>
               <li>Meme creators earn Rs 25 per approved meme</li>
               <li>Memes need to be original and should not infringe any copyright </li>
               <li>Meme creators are solely responsible for the meme that they create</li> 
               <li>Do not bring politics and religion into the mix as it will not be approved</li> 
               <li>Please share on social media platforms to spread the vibe </li>
         </div>
         <div className="bg-yellow-100 p-2 text-xs mt-4">
              <h1 className="font-semibold text-sm">Criteria</h1>
              <li>Anybody can create a meme (No restriction) </li>
              <li>Only approved memes get paid </li>
              <li>Payment happens once in 15 days through the billing section </li>
              <li>DogSwag is allowed to use the meme in any form or fashion </li>
              <li>Higher payments for verified members (Refer to verified member) </li>
         </div>
        {/*     <div className="flex h-full justify-center items-center">
                <img src="/assets/icons/lock.svg" className="w-14 h-14" />
             </div>*/}
         <div className="flex p-2 bg-gray-50 mt-5 justify-center">
                <Switch 
                 label="Activate ads"
                 disabled={true}
                />
         </div>
         </div>
      </Tabs.Panel>

{/*       <Tabs.Panel value="spansoredblogs" pt="xs">
         <div className="bg-yellow-100 p-2">
              <h1 className="font-semibold text-sm ">Criteria</h1>
              <p className="text-xs text-gray-600">Here is some Criteria</p>
         </div>
         <div className="bg-gray-50 p-2 h-80 ">
             <div className="flex h-full justify-center items-center">
                <img src="/assets/icons/lock.svg" className="w-14 h-14" />
             </div>
         </div>
      </Tabs.Panel>*/}
    </Tabs>
      </div>

    </div>
 
    </div>
   
  )
}

export default Billing_section