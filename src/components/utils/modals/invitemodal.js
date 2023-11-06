import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';

import React, { useState, useEffect,useRef } from 'react';
import { Loader } from '@mantine/core';

const Modal = dynamic(() => import('@mantine/core').then((m) => m.Modal), {
  ssr: false,
});
const Select = dynamic(() => import('@mantine/core').then((m) => m.Select), {
  ssr: false,
});
import axios from 'axios'

export default function InviteModal({openWriteModal,setOpenWriteModal,isSentRequest, setIsSentRequest}){
    
    const router = useRouter();
    const [bloggerList, setBloggerList] = useState([{ value: "6421495a83133d275052d937", label: "DogSwag(Admin)"}])
    const [getBlogger,setBlogger] = useState("")
    const [sendingRequest,setSendingRequest] = useState(false)
    const [reqInfo, setReqInfo] = useState({ about: "", blogger_id: "", blogger_email: "", blogger_name: "" })
     async function sendRequest(e) {
        e.preventDefault()

        const { about } = reqInfo

        if(!getBlogger){
            alert("Select atleast one blogger")
            return
        }
        if (about.split(' ').length < 10) {
            alert("can't be less than 50 words")
        }

        setSendingRequest(true)
        try {
            await axios.post(`/api/request/requestauthor`, {
                about,
                blogger_ID: getBlogger
            }).then(res => {
                console.log(res)
            })
            // setInviteModal(false)
            setIsSentRequest(true)
            setOpenWriteModal(false)
            setSendingRequest(false)
        } catch (err) {
            console.log(err)
            setSendingRequest(false)
            if (err.response && err.response.status === 401) {
                return router.push('/login')
            }
            if (err.response && err.response.data.msg) {
                return alert(err.response.data.msg)
            }

        }
    }


     function handleInput(e) {
        setReqInfo({ ...reqInfo, [e.target.name]: e.target.value, type: "sendrequest" })
    }
	return(
		   <Modal
                     opened={openWriteModal}
                     onClose={() => setOpenWriteModal(false)}
                     title="Request message"
              >
            <p className="font-normal font-[poppins] text-xs text-gray-500">This is an invite only club, so we request you let the content writers know why you will be a great fit for DogSawg</p> 
              <form className="flex flex-col gap-4 mt-3" onSubmit={sendRequest}>
                <label className="text-xs">Tell us in 50 words why you should get an invite <span className="text-red-500">(Minimum 10 words)</span></label>
                {/*<input className="py-1 px-2 rounded border shadow-inner text-sm" onChange={handleInput} name="user_email" placeholder="your email"/>*/}
                <textarea className="py-2 px-2 rounded text-xs border shadow-inner h-40 text-sm font-[poppins]" onChange={handleInput} name="about" placeholder="Write here ...." required/>
                <h4 className="text-md mt-2">Choose profile</h4> 
                <div className="relative">
                 <Select
                      data={bloggerList}
                      placeholder="Select a Blogger"
                      nothingFound="Nothing found"
                      searchable
                      value={getBlogger}
                      onChange={setBlogger}
                    />
                </div>
                <div className="flex justify-end">
                    <button className={`px-4 py-1 relative flex justify-center items-center ${ sendingRequest || (reqInfo.about.split(" ").length < 10 || !getBlogger) ? "bg-gray-300":"bg-black"} text-white rounded flex items-center gap-3 text-sm`} disabled={sendingRequest || (reqInfo.about.split(" ").length < 10 || !getBlogger)? true:false}>
                             Send request

                             {
                                sendingRequest ? <Loader size="xs" color={"gray"} className="absolute" /> :""
                             }
                             <svg width="10" 
                             height="10" 
                             viewBox="0 0 14 14" 
                             fill="none" 
                             xmlns="http://www.w3.org/2000/svg">
                             <path d="M7.00004 0.333496L5.82504 1.5085L10.475 6.16683H0.333374V7.8335H10.475L5.82504 12.4918L7.00004 13.6668L13.6667 7.00016L7.00004 0.333496Z" fill="white"/>
                             </svg>
                    </button>
                </div>
             </form>
             </Modal>

		)
}