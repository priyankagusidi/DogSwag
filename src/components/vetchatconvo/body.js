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
import TimeBar2 from './TimeBar2';
import ContributeModal from './contributeModal'


import {useState,useEffect, useRef } from 'react'
// import { a } from '@react-spring/web';
const ChatConversation = ({userdata,isMenuActive,isPrescribed,setIsPrescribed,dogdata}) => {
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
  const [time, setTime] = useState(900); // 15 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const chatWindowRef = useRef(null);
  const [chat,setChat] = useState({})
  const [info,setInfo] = useState({})
  const [rate,setRate] = useState(5)
  const [rated,setRated] = useState(false)
  const [rateText,setRateText] = useState("")
  const [sessionID,setSessionID] = useState("")
  const [latestMessage,setLatestMessage] = useState("")
  const [sessionType,setSessionType] = useState(null)
  const [sessionModal,setSessionModal] = useState(false)
  const [charged,setCharged] = useState(false)
  const [typing,setTyping] = useState(false)
  const [isTyping,setIsTyping] = useState(false)
  const [isPaused, setIsPaused] = useState(false);
  const [inputHeight, setInputHeight] = useState('50px')
  const [contributed,setContributed] = useState(false)
  const [isContributeModalOpen,SetContributeModalOpen] = useState(false)
  const inputsRef = useRef(null);
  const [sessionList,setSessionList] = useState([])
  const [recentSessionID,setRecentSessionID] = useState("")
  const [showSessionChats,setShowSessionChats] = useState(false)

async function fetchChat(){
  try {
    await axios.get(`/api/chat/${id}`).then(res=>{
      accessChat(res.data)
      GetProfile(res.data)
      setChat(res.data)
      getTimeDiff(res.data.startSession,res.data.endSession)
      // setSessionID(res.data.sessionID)
    })  
  } catch(e) {
    // statements
  }
}


  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (showNotification) {
      const originalTitle = document.title;
      document.title = 'New Message!';
      
      const blinkInterval = setInterval(() => {
        document.title = document.title === 'New Message!' ? ' ' : 'New Message!';
      }, 1000);

      return () => {
        clearInterval(blinkInterval);
        document.title = originalTitle;
      };
    }
  }, [showNotification]);

  const handleNotificationClick = () => {
    setShowNotification(true);

    // You can also trigger other actions related to your notification here
    
    setTimeout(() => {
      setShowNotification(false);
    }, 5000); // Reset after 5 seconds
  };

async function getAllSessions(){
  try{
    await axios.get(`/api/chat/session/all/${id}`).then(res=>{
      setSessionList(res?.data?.sessions || [])
      setSessionID(res?.data?.sessions?.[0]._id || null)
      // setRecentSessionID(res?.data?.sessions?.[0]._id || null)
    })
  }catch(err){
  }
}

useEffect(()=>{
  getAllSessions()
},[id])

function getTimeDiff(start,end){
    
    if(!start){
      return
    }
    var currentTime = new Date();
    
    //if(timeDiffernce>10)

    if(end){
       if(end>start){
           setSession(false)
           return
       }
    }
  

    // if(timeDifference>900)
    var givenTimestamp = new Date(start);
  
    var timeDifference1 = (currentTime - givenTimestamp) / 1000;
    
   

    if(timeDifference1<900){
      startCountdown(900- parseInt(timeDifference1))
      return
    }



   
}

function accessChat(chat) {
    // fetchMessages(chat)
    const pic = getSenderProfilePic(userdata.user , chat.users)

    setSenderProfilePic(pic)
  
    socket.emit("join chat", id);
}



   const fetchMessages = async (chat) => {
    // if (!selectedChat) return;

    try {
    
      setLoading(true);
      const lastMessageId =   messages.length > 0 ? messages[0]._id : null;
      const { data } = await axios.get(
        `/api/message/${id}`,{
          params: { lastMessageId,sessionID },
      });
      setMessages(data);
      setLoading(false);
      scrollToBottom();
      console.log(data)

      socket.emit("join chat",id);
    } catch (error) {
    }
  };

  useEffect(()=>{
     fetchChat()
     fetchMessages()
     socket.emit("setup",userdata && userdata.user);
  },[id,sessionID])


  useEffect(() => {
    return () => {
      socket.disconnect(userdata.user)
    };
  }, []);

  useEffect(() => {
    // Scroll to the bottom when component mounts or when messages change
    scrollToBottom();
  }, [messages]);

  useEffect(() => {  
    socket.on("start session", (chat,id) => {

      // setActiveSessionChat(id)
      // setSessionID(id)
      setSession(true)
      startCountdown(900)
      getAllSessions()
      // setSessionList([...sessionList,{_id:res.data.chat.sessionID}])

    });


    socket.on("ispaused", (chat) => {
        setIsPaused(!isPaused)
    });

    socket.on("stop session", (chat) => {
      // setSessionID(id)
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

    // socket.on("prescribed", (id) => {
    //   setIsPrescribed(!isPrescribed)
    // });

    // socket.on("checked", (id) => {
    //   setIsPrescribed(!isPrescribed)
    // });



    socket.on("message received", (newMessageRecieved) => {
      // if ("648d6bd4c5b55f8753ebaba3" !== newMessageRecieved.chat._id) {
        // if (!notification.includes(newMessageRecieved)) {
        //   setNotification([newMessageRecieved, ...notification]);
        //   setFetchAgain(!fetchAgain);
        // }
      // } else {

      //  if(id === newMessageRecieved.chat._id){
      //    handleNotificationClick()
      //  }

      console.log(newMessageRecieved.sessionID,sessionList?.[0]?._id, sessionID,sessionList?.[0]?._id === sessionID)
       if(sessionList?.[0]?._id === sessionID ){
         setMessages([...messages, newMessageRecieved]); 
       }
      
      // }
    });
  });
  // console.log(sessionList)

  useEffect(()=>{
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
    socket.emit("activeroom",id)
    socket.on("prescribed", (id) => {
      setIsPrescribed(!isPrescribed)
    });
  },[])

  function handleTextChange(e){
    
    setNewMessage(e.target.value)   

   const newHeight = e.target.value ? `${e.target.scrollHeight}px` : '50px';
   setInputHeight(newHeight);
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
              // setMessages([...messages, newMessage,{sender:{_id:userdata.user._id}}]);
              const updatedNewMessage = {
                type:"text",
                content:newMessage,
                sender: { _id: userdata.user._id }
              };
              setMessages([...messages, updatedNewMessage]);
              setNewMessage(""); 

              const { data } = await axios.post(
              "/api/message",
              {
                content: newMessage,
                chatId: id,
                sessionID,
              }
            );
            socket.emit("new message", data);
            setMessages([...messages, data]);
            
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

  const pauseResumeCountdown = () => {
    socket.emit("ispaused",id)
    setIsPaused((prevIsPaused) => !prevIsPaused);
  };

  useEffect(() => {
    let interval = null;

    if (isActive && time === 0) {
      setIsActive(false); // Deactivate the countdown
      stopSession()
      clearInterval(interval);
    } else if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, time, isPaused]);




  async function startSession(){
     try {
       await axios.put(`/api/chat/session/${id}`,{startSession:true}).then(res=>{
        socket.emit("start session",id,res.data.chat.sessionID)
        // socket.emit("start session",)
        // setSessionList([...sessionList,{_id:res.data.chat.sessionID}])
        getAllSessions()
        setSession(true)
        startCountdown(900)
        scrollToBottom();
        // setSessionID(res.data.chat.sessionID)

       })

     } catch(e) {
     }
      
  }


  function sendM(e){
    e.preventDefault()
    sendMessage()
    inputsRef.current.focus();
    setInputHeight('50px');
  }


  
   
 async function stopSession(){

     try {
       await axios.put(`/api/chat/session/${id}`,{endSession:true,sessionID}).then(res=>{
          setSession(false)
          setTime(0)
          socket.emit("stop session",id)
         if(userdata?.user?.isDoctor === true){
            router.push('/chatlist')
          }
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

          const ID = getSenderId(userdata.user , chat.users)

          await axios.put(`/api/user/chat/reduce`,{
            ID
          }).then(res=>{
          })        
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

  function handleIsPrescribed(){
     socket.emit("prescribed",id)
  }


  function Contribute(){
     // router.push('/setting')
    SetContributeModalOpen(true)
  }

  function Cancel(){
     setContributed(true)
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
          <div className="w-full h-full lg:w-8/12  flex justify-center items-center"> 
          {
            !session ? 
                  <div className="shadow-xl rounded-xl max-w-sm text-center text-gray-500 py-10 border-2 border-gray-200 w-full justify-center flex items-center">
                  <div className="p-2">{
                      time ? 

                      <div className="px-5">
                        {chat.latestMessage?<div className="text-white text-start bg-green-500 whitespace-pre-wrap p-2 rounded-xl">{chat.latestMessage && chat.latestMessage.content}</div>:<></>}
                        {`Please click on start conversation to begin conversation !`}
                      </div>
                      :
                      <div className="p-5">
                          <h1>Chat Ended !</h1>
                      </div>
                      /*charged ? 
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
                      </div> */                     
                      }
                      </div>
                  </div>
                :
              <ChatInputField  inputHeight={inputHeight} setInputHeight={setInputHeight} inputsRef={inputsRef} formatTime={formatTime} time={time} isTyping={isTyping} sendM={sendM} newMessage={newMessage}chatWindowRef={chatWindowRef} loading={loading} mediaLoading={mediaLoading} setPic={setPic} setSelectedImage={setSelectedImage} selectedImage={selectedImage} sendMessage={sendMessage} senderProfilePic={senderProfilePic} userdata={userdata} messages={messages} handleTextChange={handleTextChange}/>
           }
          </div>  
          :
                <div className="w-full lg:w-8/12  flex justify-center items-center">

          {
            !session ? 
                  <div className="shadow-xl rounded-xl max-w-sm  text-gray-500  border-2 border-gray-200 w-full flex items-center">
                  <div className="p-2 w-full">{
                      time ? 
                      <div className="text-center py-10 relative">
                      <div
                        className="moving-border"
                      ></div>
                      {"Please hold on, Your conversation will begin shortly!"}
                      </div>
                      :
                      
                      contributed ?

                        rated ?
                         <div className="p-5">
                          <h1>Thanks for feedback.</h1>
                          </div>    
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
                      :
                       <div className="p-5">
                          <h1 className="text-xl text-center">We want to keep <span className="font-bold">VetChat Free <br/>Contribute</span> if you can.</h1>
                          <div className="flex gap-2 justify-center items-center mt-4">
                             <button onClick={Contribute} className="p-3 font-semibold bg-green-500 text-white rounded-lg">Contribute</button>
                             <button onClick={Cancel} className="p-2 bg-gray-400 text-white rounded-lg w-24 font-semibold">No</button>
                          </div>
                      </div>     

                      
                     
                      }
                    </div>
                  </div>
                :
              <ChatInputField inputHeight={inputHeight} setInputHeight={setInputHeight} inputsRef={inputsRef} formatTime={formatTime} time={time} isTyping={isTyping} sendM={sendM} newMessage={newMessage}chatWindowRef={chatWindowRef}  loading={loading} mediaLoading={mediaLoading} setPic={setPic} setSelectedImage={setSelectedImage} selectedImage={selectedImage} sendMessage={sendMessage} senderProfilePic={senderProfilePic} userdata={userdata} messages={messages} handleTextChange={handleTextChange}/>
           }
           </div>  

      }

           
           
           <Info 
               chatID={chat._id}
               info={info}
               formatTime={formatTime}
               time={time}
               userdata={userdata}
               stopSession={stopSession}
               startSession={startSession}
               session={session}
               isMenuActive={isMenuActive}
               sessionID={sessionID}
               isPrescribed={isPrescribed}
               setIsPrescribed={setIsPrescribed}
               handleIsPrescribed={handleIsPrescribed}
               pauseResumeCountdown={pauseResumeCountdown}
               isPaused={isPaused}
               dogdata={dogdata}
               sessionList={sessionList}
               setSessionID={setSessionID}
               setShowSessionChats={setShowSessionChats}
               showSessionChats={showSessionChats}
               messages={messages}
           />

      <Modal
        opened={sessionModal}
        onClose={()=>setSessionModal(false)}
        centered
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
         <ContributeModal isModalOpen={isContributeModalOpen}  setIsModalOpen={SetContributeModalOpen}/>

     <div className="mb-20"></div>
    </div>
  );
};

export default ChatConversation;
