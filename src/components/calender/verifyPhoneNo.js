// import VerifyPhoneNo from './verifyPhoneNo'
import React, { useState, useRef, useEffect } from 'react';
import OtpInput from 'react-verify-otp';
import '/node_modules/react-verify-otp/dist/style.css';
import dynamic from 'next/dynamic'
const PhoneInput = dynamic(() => import('react-phone-number-input'), {
    ssr: false,
});
import { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import axios from 'axios'

const Index = ({setHasPhoneNumber}) => {
    const otpRef = useRef(null);
    const [otp, setOtp] = useState('');
    const [phoneValue, setPhoneValue] = useState("")
    const [timer, setTimer] = useState(60);
    const [isActive, setIsActive] = useState(false);
    const [sendCount, setSendCount] = useState(0)


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



    const handleChangeOtp = (otp) => {
        setOtp(otp)
    };


    async function sendOtp() {
        if (!phoneValue) {
            alert("phone number can't be empty")
            return
        }
        if (!isValidPhoneNumber(phoneValue)) {
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
   
   async function Save(){
       if(!isValidPhoneNumber(phoneValue)){
        alert("Invalid phoneno")
        return
      }
       try{
         await axios.put('/api/calender/save',{phoneno:phoneValue,otp:otp}).then(res=>{
            console.log(res.data)
            setHasPhoneNumber(true)
          })
       }catch(err){
         console.log(err)
         alert("invilid otp")
          // setSavingPaymentInfo(false)
          // alert(err.response.data.msg)
       }

   }


    return (
        <div>
      <div className="bg-white max-w-sm mx-auto shadow-md rounded-md p-5">
          <div className="flex justify-center my-2 flex-col">
                      <h1 className="text-2xl font-semibold">Verify Phone No.</h1>

                     <div className="grid gap-3 mt-4">
                      <div className="grid gap-2">
                         <label>Phone no</label>
                         <PhoneInput
                            defaultCountry="IN"
                            placeholder="enter phone number"
                            value={phoneValue}
                            onChange={setPhoneValue}
                         />

         <div className="flex justify-end"><button disabled={isActive} onClick={sendOtp} className={`w-28   text-xs px-2 py-1 rounded ${!isActive? "bg-[#822500] text-white" :"bg-gray-300 text-gray-500"}`}>{isActive ? `Resend in ${timer}s` : !sendCount?"Send OTP": "Resend OTP" }</button> </div>


                      </div>

                      <div className="grid gap-2">
                         <label>Otp</label>

                     <OtpInput
                    ref={otpRef}
                    otpValue={otp}
                    onChange={handleChangeOtp}
                    separator={'-'}
                    styleOtpInput={"w-5 h-10 p-2"}
                      />
                      </div>
                      </div>
          </div>
          <div className="flex justify-center text-sm mt-4">
        <button className="bg-amber-800 text-white py-2 rounded-md w-full" onClick={Save}>Save</button>
</div>
      </div>

      <div>
      </div>
      </div>
    )
};

export default Index;