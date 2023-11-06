import React from 'react'
import {useState} from 'react'
import {Loader} from '@mantine/core'
import axios from 'axios'
import { Modal } from "@mantine/core";
import Link from 'next/link'

export default function FooterComp(){

    const [email,setEmail] = useState("") //
    const [isSubscribing,setIsSubscribing] = useState(false)
    const [errorText,setErrorText] = useState("")
    const [reportModal,setReportModal] = useState(false)
    const [isReporting,setIsReporting] = useState(false)

    async function onSubscribe(){
        setIsSubscribing(true)
        if(!email){
            alert("please enter your email")
            setIsSubscribing(false)
            return
        }

        if(!ValidateEmail(email)){
            alert("Invalid email")
            setIsSubscribing(false)
            return
        }
        try{
        await axios.post('/api/subscribe/',{email}).then(res=>{
            console.log(res)
            alert("you successfully subscribed to dogswag")
            setIsSubscribing(false)
            setEmail("")
        }).catch(err=>{
            setIsSubscribing(false)
            alert(err.response && err.response.data.msg)
            console.log(err)
            setEmail("")
        })
        }
        catch(err){
            console.log(err)
            setIsSubscribing(false)
            setEmail("")
        }
        setIsSubscribing(false)
        setEmail("")
    }
    
function ValidateEmail(input) {

  var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (input.match(validRegex)) {
    return true;
  } else {
    return false;

  }
}


    async function reportError(){

        if(!errorText){
            alert("please input some text")
            return
        }
        setIsReporting(true)
        try{
            await axios.post('/api/info/report',{text:errorText}).then(res=>{
                console.log(res)
                setIsReporting(false)
            })
            alert("Issue reported our team will get back in 24 hours.")
            setReportModal(false)
        }catch(err){
            console.log(err)
                setIsReporting(false)
        }
    }

    function handleError(e){
        setErrorText(e.target.value)
    }
console.log(errorText)
	return(

<footer className="p-4 bg-white sm:p-6">
    <div className="grid sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex mt-4">
             <div className="">
             <img src="/img/dlogo.png" className="w-20"/>
             </div>
             <p className='text-gray-500 text-sm'>

                        <span className="font-bold">DogSwag India Limited</span> <br />
                        Bangalore, India <br />
                        <br />
                        {/*<strong>Phone:</strong>+1 2321 4543 <br />*/}
                        <strong>Email:</strong>Founders@dogswag.club<br />
             </p>
        </div>
        <div className="grid grid-cols-2 text-sm gap-8 sm:gap-6 mt-4">

            <div>
                <h2 className="mb-6 font-semibold text-gray-900 uppercase">Quick links</h2>
                <ul className="text-gray-600">
                    <li className="mb-4 ">
                        <Link href="/" className="hover:underline ">Home</Link>
                    </li>
                    <li>
                        <span onClick={()=>setReportModal(true)} className="hover:underline text-red-500">Report a Bug</span>
                    </li>
                </ul>
            </div>
            <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Legal</h2>
                <ul className="text-gray-600">
                    <li className="mb-4">
                        <Link href="/privacypolicy" className="hover:underline">Privacy Policy</Link>
                    </li>
                    {/*<li>
                        <a href="#" className="hover:underline">Terms &amp; Conditions</a>
                    </li>*/}
                </ul>
            </div>
        </div>
        <div className="max-w-sm flex justify-center text-sm mt-4">
              <div>
                <h4 className='mb-6 font-semibold text-gray-900 uppercase'>Join Our Newsletter</h4>
                 <p className='text-gray-500 pb-2'>Woof,Woof
Subscribe to our newsletter and stay up to date with the latest blogs, contests, and giveaways.</p>
                <div className="flex">
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="bg-gray-100 px-2 py-1 border"/>
                <button onClick={onSubscribe} className={`${isSubscribing?"bg-gray-200":"bg-black"} text-white px-2 py-1 flex justify-center items-center`} disabled={isSubscribing?true:false}>Subscribe{isSubscribing ?<Loader size={"xs"} color={"gray"} className="absolute"/>:<></>}</button>
                </div>
              </div>
        </div>
    </div>
    <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
    <div className="sm:flex sm:items-center sm:justify-between">
        <span className="text-sm text-gray-500 sm:text-center">© 2023 <a href="https://dogswag.com/" className="hover:underline">DogSwag™</a>. All Rights Reserved.
        </span>
        <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
            <a rel="noreferrer"  target="_blank" href={"https://www.facebook.com/people/DogSwag/100075685284710"} className="text-gray-500 hover:text-gray-900">
                {/*<AiFillFacebook/>*/}
                <img src="/assets/icons/facebook.svg" className="w-6 h-6"/>
                <span className="sr-only">Facebook page</span>
            </a>
            <a rel="noreferrer"  target="_blank" href={"https://www.instagram.com/dogswag.club"} className="text-gray-500 hover:text-gray-900">
               {/*<AiFillInstagram/>*/}
                <img src="/assets/icons/instagram.svg" className="w-6 h-6"/>
                <span className="sr-only">Instagram page</span>
            </a>
            <a rel="noreferrer"  target="_blank" href={"https://www.youtube.com/@DogSwagClub"} className="text-gray-500 hover:text-gray-900">
                {/*<AiFillYoutube/>*/}
                <img src="/assets/icons/youtube.svg" className="w-6 h-6"/>
                <span className="sr-only">Twitter page</span>
            </a>
            <a rel="noreferrer"  target="_blank" href={"https://www.linkedin.com/company/dogswag-india-limited"} className="text-gray-500 hover:text-gray-900">
                <img src="/assets/icons/linkedin.svg" className="w-6 h-6"/>
                <span className="sr-only">Linkendin account</span>
            </a>
        </div>
    </div>
         <Modal
                  opened={reportModal}
                  onClose={() => setReportModal(false)}
                  size={"md"}
                  title="Report a Bug"
        >
         <div className="flex flex-col gap-2">
              {/*<h1></h1>*/}
              <textarea onChange={handleError} className="w-full h-60 bg-white bg-gray-200 shadow shadow-inner border p-2"/>
              <div className="text-end"><button  className={`${isReporting?"bg-gray-200":"bg-black"} rounded text-white px-2 py-1 flex justify-center items-center`} disabled={isReporting?true:false} onClick={reportError}>Send{isReporting ?<Loader size={"xs"} color={"gray"} className="absolute"/>:<></>}</button></div>
         </div>
        </Modal>
</footer>

		)
}