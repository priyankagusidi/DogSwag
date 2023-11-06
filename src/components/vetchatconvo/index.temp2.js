import React from 'react';
import ChatInputField from './messages';
import { useSearchParams } from 'next/navigation';
import TimeBar from './TimeBar';
import Info from './info';
import {useRouter} from 'next/router'
import socket from '@/utils/socket';
import axios from 'axios'
import {Overlay, Button} from '@mantine/core'

import {useState,useEffect, useRef } from 'react'
const ChatConversation = ({userdata,isMenuActive}) => {
  const router = useRouter()
  const {id} = router.query
  const [messages,setMessages] = useState([])
  const [loading,setLoading] = useState(true)
  const [newMessage,setNewMessage] = useState("")
  const [selectedImage,setSelectedImage] = useState(null)
  const [pic,setPic] = useState(null)
  const [senderProfilePic,setSenderProfilePic]=useState("")
  const [mediaLoading,setMediaLoading] = useState(false) 
  const [session,setSession]= useState(false)
  const [visible, setVisible] = useState(false);
  const [time, setTime] = useState(300); // 15 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const chatWindowRef = useRef(null);

async function fetchChat(){
  try {
    await axios.get(`/api/chat/${id}`).then(res=>{
      accessChat(res.data)
      getTimeDiff(res.data.startSession,res.data.endSession)
    })
  } catch(e) {
    // statements
    console.log(e);
  }
}


function getTimeDiff(start,end){
    
    if(!start){
      return
    }

    // if(timeDifference>300)
    var currentTime = new Date();
    var givenTimestamp = new Date(start);
    var timeDifference = (currentTime - givenTimestamp) / 1000;
    
    if(timeDifference<300){
      startCountdown(300- parseInt(timeDifference))
    }
   
    console.log("Time difference:",parseInt(timeDifference));
}

function accessChat(chat) {
    // fetchMessages(chat)
    console.log(chat)
    const pic = getSenderProfilePic(userdata.user , chat.users)
    setSenderProfilePic(pic)
    // const name = getSenderName(userdata.user , chat.users)
    // setSenderProfileName(name)
    // setSelectedChat(chat)
    socket.emit("join chat", id);
}


console.log(messages)

   const fetchMessages = async (chat) => {
    // if (!selectedChat) return;

    try {
    
      setLoading(true);
              // const lastMessageId = messages.length > 0 ? messages[messages.length - 1]._id : null;

      const { data } = await axios.get(
        `/api/message/${id}`);
      setMessages(data);
      setLoading(false);
      scrollToBottom();
      

      socket.emit("join chat",id);
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(()=>{
     fetchChat()
     fetchMessages()

     socket.emit("setup",userdata && userdata.user);
  },[id])


  useEffect(() => {
    // Scroll to the bottom when component mounts or when messages change
    scrollToBottom();
  }, [messages]);

  useEffect(() => {  
    socket.on("start session", (id) => {

      console.log("start Session")
      // setActiveSessionChat(id)
      setSession(true)
      startCountdown(300)

    });

    socket.on("stop session", (chat) => {
      console.log("stop Session")
      console.log(chat)
      setSession(false)
      setTime(0)
    }
    );



    socket.on("message received", (newMessageRecieved) => {
      // if ("648d6bd4c5b55f8753ebaba3" !== newMessageRecieved.chat._id) {
        // if (!notification.includes(newMessageRecieved)) {
        //   setNotification([newMessageRecieved, ...notification]);
        //   setFetchAgain(!fetchAgain);
        // }
      // } else {
      console.log("message received")
       setMessages([...messages, newMessageRecieved]);
      // }
    });
  });


  function handleTextChange(e){
     setNewMessage(e.target.value)    
  }


  const sendMessage = async ( ) => {

      try {
        if(!pic){
              const { data } = await axios.post(
              "/api/message",
              {
                content: newMessage,
                chatId: id,
              }
            );
            socket.emit("new message", data);
            setMessages([...messages, data]);
            setNewMessage("");  
        }else{
             setMediaLoading(true)
             const formData = new FormData();
             formData.append("chatId", id)
             formData.append("chatimages", pic)

             const { data } = await axios.post("/api/message",formData);
              setSelectedImage(null)
              setPic(null)
              setMediaLoading(false)
            socket.emit("new message", data);
            setMessages([...messages, data]);
            setNewMessage(""); 
        }
         scrollToBottom();
        
      } catch (error) {
         console.log(error)
      }
   
  };



const getSenderProfilePic = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1].profilePic : users[0].profilePic;
};



  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const startCountdown = (time) => {
    setTime(time); // Reset to 15 minutes (10 seconds)
    setIsActive(true); // Activate the countdown
    setSession(true)
  };

  useEffect(() => {
    let interval = null;

    if (isActive && time === 0) {
      setIsActive(false); // Deactivate the countdown
      stopSession()
      clearInterval(interval);
    } else if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, time]);




  async function startSession(){
     try {
       await axios.put(`/api/chat/session/${id}`,{startSession:true}).then(res=>{
        console.log(res.data)
        socket.emit("start session",id)
        setSession(true)
        startCountdown(300)
        scrollToBottom();

       })

     } catch(e) {
       console.log(e);
     }
      
  }


  
   
 async function stopSession(){

     try {
       await axios.put(`/api/chat/session/${id}`,{endSession:true}).then(res=>{
          console.log(res.data)
          setSession(false)
          setTime(0)
          socket.emit("stop session",id)
       })
     } catch(e) {
       console.log(e);
     }
     
  }
   

 function scrollToBottom() {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }


  return (
    <div className="flex w-full h-full p-2">
        
       
      
      {
          userdata.user.isDoctor ?
          <div className="w-full h-full lg:w-8/12  flex justify-center items-center "> 
          {
            !session ? 
                  <div className="shadow-xl rounded-xl max-w-sm text-center text-gray-500 py-10 border-2 border-gray-200 w-full justify-center min-h-24 h-fit flex items-center">
                  <div className="p-2 ">{
                      time ? 
                      "Please click on start conversation to begin conversation !"
                      :
                      <div className="p-5">
                      <h1>What is the nature of the conversation ?</h1>
                      <div className="flex gap-2 justify-center items-center mt-4">
                         <button className="p-2 bg-yellow-500 text-white rounded-lg">Free</button>
                         <button className="p-2 bg-yellow-500 text-white rounded-lg">Paid</button>
                      </div>
                      </div>
                      }
                      </div>
                  </div>
                :
              <ChatInputField  chatWindowRef={chatWindowRef} loading={loading} mediaLoading={mediaLoading} setPic={setPic} setSelectedImage={setSelectedImage} selectedImage={selectedImage} sendMessage={sendMessage} senderProfilePic={senderProfilePic} userdata={userdata} messages={messages} handleTextChange={handleTextChange}/>
           }
          </div>  
          :
                <div className="w-full lg:w-8/12  flex justify-center items-center">

          {
            !session ? 
                  <div className="shadow-xl rounded-xl max-w-sm  text-gray-500  border-2 border-gray-200 w-full  min-h-24 h-fit flex items-center">
                  <div className="p-2 w-full">{
                      time ? 
                      <div className="text-center py-10">
                      {"Please hold on , Your conversation will begin shortly. !"}
                      </div>
                      :
                      <div className="w-full flex flex-col gap-4 p-2">
                         <h1 className="text-black font-bold">What do you think about vetchat?</h1>
                         <ul className="flex gap-4 text-sm">
                           <li className="flex flex-col items-center">
                             <img src="/terrible.svg" className="w-8 h-8"/>
                             <span>terrible</span>
                           </li>
                           <li className="flex flex-col items-center">
                             <img src="/bad.svg" className="w-8 h-8"/>
                             <span>bad</span>
                           </li>
                           <li className="flex flex-col items-center">
                             <img src="/okay.svg" className="w-8 h-8"/>
                             <span>okay</span>
                           </li>
                           <li className="flex flex-col items-center">
                             <img src="/good.svg" className="w-8 h-8"/>
                             <span>good</span>
                           </li>
                           <li className="flex flex-col items-center">
                             <img src="/great.svg" className="w-8 h-8"/>
                             <span>great</span>
                           </li>
                          </ul>
                          <div className='flex flex-col gap-2'>
                          <label className="text-black font-bold">Add note</label>
                          <textarea className="w-full h-40 border border-gray-400 rounded-xl"/>
                          </div>
                      </div>
                      }
                    </div>
                  </div>
                :
              <ChatInputField chatWindowRef={chatWindowRef}  loading={loading} mediaLoading={mediaLoading} setPic={setPic} setSelectedImage={setSelectedImage} selectedImage={selectedImage} sendMessage={sendMessage} senderProfilePic={senderProfilePic} userdata={userdata} messages={messages} handleTextChange={handleTextChange}/>
           }
           </div>  

      }
           <Info 
               formatTime={formatTime}
               time={time}
               userdata={userdata}
               stopSession={stopSession}
               startSession={startSession}
               session={session}
               isMenuActive={isMenuActive}
           />
     <div className="mb-20"></div>
    </div>
  );
};

export default ChatConversation;
