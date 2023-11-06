import React from 'react';
import ChatInputField from './messages';
import { useSearchParams } from 'next/navigation';
import TimeBar from './TimeBar';
import Info from './info';
import {useRouter} from 'next/router'
import socket from '@/utils/socket';
import axios from 'axios'
import {Overlay, Button} from '@mantine/core'
import {Modal} from '@mantine/core'

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
  const [chat,setChat] = useState({})
  const [info,setInfo] = useState({})
  const [rate,setRate] = useState(5)
  const[rated,setRated] = useState(false)
  const [rateText,setRateText] = useState("")
  
  const [sessionType,setSessionType] = useState(null)
  const [sessionModal,setSessionModal] = useState(false)
  const [charged,setCharged] = useState(false)
  const [typing,setTyping] = useState(false)
  const [isTyping,setIsTyping] = useState(false)

async function fetchChat(){
  try {
    await axios.get(`/api/chat/${id}`).then(res=>{
      accessChat(res.data)
      GetProfile(res.data)
      setChat(res.data)
      getTimeDiff(res.data.startSession,res.data.endSession)
    })
  } catch(e) {
    // statements
  }
}


function getTimeDiff(start,end){
    
    if(!start){
      return
    }



    // if(timeDifference>300)
    var currentTime = new Date();
    var givenTimestamp = new Date(start);
    var givenTimestamp2 = new Date(end);

    var timeDifference = (currentTime - givenTimestamp) / 1000;
    
    if(timeDifference<300){
      startCountdown(300- parseInt(timeDifference))
    }
   
}

function accessChat(chat) {
    // fetchMessages(chat)
    const pic = getSenderProfilePic(userdata.user , chat.users)

    setSenderProfilePic(pic)
    // const name = getSenderName(userdata.user , chat.users)
    // setSenderProfileName(name)
    // setSelectedChat(chat)
    socket.emit("join chat", id);
}



   const fetchMessages = async (chat) => {
    // if (!selectedChat) return;

    try {
    
      setLoading(true);
      const lastMessageId =   messages.length > 0 ? messages[0]._id : null;
      const { data } = await axios.get(
        `/api/message/${id}`,{
          params: { lastMessageId },
      });
      setMessages(data);
      setLoading(false);
      scrollToBottom();
      

      socket.emit("join chat",id);
    } catch (error) {
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

      // setActiveSessionChat(id)
      setSession(true)
      startCountdown(300)

    });

    socket.on("stop session", (chat) => {
      setSession(false)
      setTime(0)
    });

    socket.on("free", (id) => {
      setSessionType("free")
      setSessionModal(true)
    });

    socket.on("paid", (id) => {
      setSessionType("paid")
      setSessionModal(true)
    });



    socket.on("message received", (newMessageRecieved) => {
      // if ("648d6bd4c5b55f8753ebaba3" !== newMessageRecieved.chat._id) {
        // if (!notification.includes(newMessageRecieved)) {
        //   setNotification([newMessageRecieved, ...notification]);
        //   setFetchAgain(!fetchAgain);
        // }
      // } else {
       setMessages([...messages, newMessageRecieved]);
      // }
    });
  });
  

  useEffect(()=>{
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  },[])

  function handleTextChange(e){
    
    setNewMessage(e.target.value)    

    if (!typing) {
      setTyping(true);
      socket.emit("typing",id);
    }

    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;

    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", id);
        setTyping(false);
      }
    }, timerLength);
 

  }


  // /profile/one/:ID

// /profile/one/:ID
  async function GetProfile(chat){
    const id = getSenderId(userdata.user , chat.users)
    const isDoc= isSenderDoc(userdata.user , chat.users)
    try {
     
      if(isDoc){
        await axios.get(`/api/doctor/profile/one/${id}`).then(res=>{
          setInfo(res.data.profile)
        })
      }else{
        await axios.get(`/api/doginfo/profile/one/${id}`).then(res=>{
          setInfo(res.data.profile)
        })
      }
      
    } catch(e) {
      // statements
    }
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
      }
   
  };



const getSenderProfilePic = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1].profilePic : users[0].profilePic;
};

const getSenderId = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1]._id : users[0]._id;
};



const isSenderDoc = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1].isDoctor : users[0].isDoctor;
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
        socket.emit("start session",id)
        setSession(true)
        startCountdown(300)
        scrollToBottom();

       })

     } catch(e) {
     }
      
  }


  function sendM(e){
    e.preventDefault()
    sendMessage()
  }


  
   
 async function stopSession(){

     try {
       await axios.put(`/api/chat/session/${id}`,{endSession:true}).then(res=>{
          setSession(false)
          setTime(0)
          socket.emit("stop session",id)
       })
     } catch(e) {
     }
     
  }
   

   async function free(){
          socket.emit("free",id)
          setCharged(true)
  }
  
   async function paid(){
          socket.emit("paid",id)
          setCharged(true)
  } 

 function scrollToBottom() {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }

 async function Rate(chat){
    const id = getSenderId(userdata.user , chat.users)
    // return
     try {
       await axios.post(`/api/doctor/rate/${id}`,{text:rateText,rating:rate}).then(res=>{
         setRated(true)
       })
     } catch(e) {
     }
  }

  function handleRateText(e){
    setRateText(e.target.value)
  }
 const feedback = [
   {
    text:"terrible"
   },
    {
    text:"bad"
   },
    {
    text:"okay"
   },
    {
    text:"good"
   },
    {
    text:"great"
   },

]
  return (
    <div className="flex w-full h-full p-2">
        
       
      {/*<div className="w-full h-full lg:w-8/12  flex justify-center items-center "> 
              <ChatInputField 
                newMessage={newMessage}  
                chatWindowRef={chatWindowRef} 
                loading={loading} 
                mediaLoading={mediaLoading} 
                setPic={setPic} 
                setSelectedImage={setSelectedImage} 
                selectedImage={selectedImage} 
                sendMessage={sendMessage} 
                senderProfilePic={senderProfilePic} 
                userdata={userdata} 
                messages={messages} 
                handleTextChange={handleTextChange}/>
      </div>*/}
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
                        charged ? 
                        <div className="text-center">
                           Great the user will be notified.
                        </div>
                        :
                        <div className="p-5">
                          <h1>What is the nature of the conversation?</h1>
                          <div className="flex gap-2 justify-center items-center mt-4">
                             <button onClick={free} className="p-2 bg-yellow-500 text-white rounded-lg">Free</button>
                             <button onClick={paid} className="p-2 bg-yellow-500 text-white rounded-lg">Paid</button>
                          </div>
                      </div>                      
                      }
                      </div>
                  </div>
                :
              <ChatInputField isTyping={isTyping} sendM={sendM} newMessage={newMessage}chatWindowRef={chatWindowRef} loading={loading} mediaLoading={mediaLoading} setPic={setPic} setSelectedImage={setSelectedImage} selectedImage={selectedImage} sendMessage={sendMessage} senderProfilePic={senderProfilePic} userdata={userdata} messages={messages} handleTextChange={handleTextChange}/>
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
                      {"Please hold on, Your conversation will begin shortly!"}
                      </div>
                      :
                        
                        rated ?
                         <div>Thanks for feedback</div>
                        :
                        <div className="w-full flex flex-col gap-4 p-2">
                           <h1 className="text-black font-bold">What do you think about vetchat?</h1>
                           <ul className="flex gap-4 text-sm">
                             {feedback.map((f,i)=>{
                              return(
                                 <li key={i} onClick={()=>setRate(i+1)} className={`flex flex-col items-center  ${rate === i+1 ? "scale-150":""}`}>
                                   <img src={`/${f.text}.svg`} className={`w-8 h-8`}/>
                                   <span>{f.text}</span>
                                 </li>
                                )
                             })}
                            </ul>
                            <div className='flex flex-col gap-2'>
                            <label className="text-black font-bold">Add note</label>
                            <textarea onChange={handleRateText} className="w-full h-40 border border-gray-400 rounded-xl p-2"/>
                            </div>
                            <button onClick={()=>Rate(chat)} className="p-2 bg-yellow-500 text-white rounded-lg">Send</button>
                        </div>
                     
                      }
                    </div>
                  </div>
                :
              <ChatInputField isTyping={isTyping} sendM={sendM} newMessage={newMessage}chatWindowRef={chatWindowRef}  loading={loading} mediaLoading={mediaLoading} setPic={setPic} setSelectedImage={setSelectedImage} selectedImage={selectedImage} sendMessage={sendMessage} senderProfilePic={senderProfilePic} userdata={userdata} messages={messages} handleTextChange={handleTextChange}/>
           }
           </div>  

      }
           <Info 
               info={info}
               formatTime={formatTime}
               time={time}
               userdata={userdata}
               stopSession={stopSession}
               startSession={startSession}
               session={session}
               isMenuActive={isMenuActive}
               messages={messages}
           />

      <Modal
        opened={sessionModal}
        onClose={()=>setSessionModal(false)}
      >
        {
          sessionType === "free"?
          <div className="flex flex-col justify-center items-center text-gray-500 text-center">
            <img src="/dog2.svg"/>
            Hurray!...Your conversation was free. Hope your doggy recovers soon.
          </div>
          :
          <div  className="flex flex-col justify-center items-center text-gray-500 text-center">
            Your conversation was charged at 1 chat coin. Hope your doggy feels ok
          </div>
        }
      </Modal>
     <div className="mb-20"></div>
    </div>
  );
};

export default ChatConversation;
