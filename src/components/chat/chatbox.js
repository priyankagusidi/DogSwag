import React, { useState ,useEffect} from 'react';
import axios from 'axios'
import socket from '@/utils/socket';
import {toast} from 'react-toastify'
import {Modal} from '@mantine/core'
import MessageContent from './messages'
import DoctorInfo from './doctorinfo'
import {Menu} from '@mantine/core'
import {useRouter} from 'next/router'
const Chat = ({userdata}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [messages,setMessages] = useState([])
  const [newMessage,setNewMessage] = useState("")
  const [loading, setLoading] = useState(false);
  const [selectedChat,setSelectedChat] = useState(null)
  const [opened,setOpened] = useState(false)
  const [reason,setReason] = useState(null)
  const [file,setInputFile] = useState(null)
  const [userID,setUserID] = useState(null)
  const [chats,setChats] = useState([])
  const [openDocInfo,setOpenedDocInfo] = useState(false)   
  const [dogInfo,setDogInfo] = useState({})
  const [senderProfilePic,setSenderProfilePic]=useState("")
  const [senderProfileName,setSenderProfileName] = useState("")
  const [activeSessionChat,setActiveSessionChat] = useState("")
  const [session,setSession] = useState(false)
  const [selectedImage,setSelectedImage] = useState(null)
  const [pic,setPic] = useState(null)

  console.log(selectedChat)
 
  const router = useRouter()

   const fetchChats = async (id) =>{
     try{
        await axios.get('/api/chat').then(res=>{
          console.log(res.data)
          setChats(res.data)
        })
     }catch(e){

     }
   }

   const fetchMessages = async (chat) => {
    // if (!selectedChat) return;

    try {
    
      setLoading(true);

      const { data } = await axios.get(
        `/api/message/${chat._id}`);
      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };



  function startSession(){
      // alert("start")
      socket.emit("start session",selectedChat?._id)
      setSession(true)
  }

  function stopSession(){
      // alert("end")
      setSession(false)
      socket.emit("stop session",selectedChat._id)
  }

  function handleTextChange(e){
     setNewMessage(e.target.value)    
  }

    useEffect(() => {


    socket.on("start session", (id) => {

      console.log("start Session")
      setActiveSessionChat(id)
      setSession(true)
      startCountdown()
    });

    socket.on("stop session", (chat) => {
      console.log("stop Session")
      console.log(chat)
      setSession(false)}
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



   useEffect(() => {
    fetchChats()
    socket.emit("setup",userdata && userdata.user);
    // socket.on("connected", () => setSocketConnected(true));
    // socket.on("typing", () => setIsTyping(true));
    // socket.on("stop typing", () => setIsTyping(false));

    // eslint-disable-next-line
  }, []);



console.log(session)

 const createChatRoom =async () =>{
   // onClick={startCountdown}

  if(!reason){
    alert("Add a reason")
  }
  try {
    const { data } = await axios.post(
        `/api/chat`,{
          userId:userID,content:reason
        });
    console.log(data)
    setOpened(false)
    // fetchChats()
    setActiveSessionChat(data._id)
    accessChat(data)
    // socket.emit("start session",data._id)
    // socket.emit("start session",._id)
    alert("Please wait for 30sec")
  } catch(e) {
    // statements
    console.log(e);
  }

 }  
  
  async function fetchProfileData(){
    try{
       await axios.get(`/api/dogprofile/profile/${router.query.id}`).then(res=>{
          setDogInfo(res && res.data && res.data.profileData?res.data.profileData : {})
       })
    }
    catch(e){
       // console.log(e)
    }
  }
  
  useEffect(()=>{
      fetchProfileData()
  },[router.query.id])

  console.log(pic)


const sendMessage = async (event) => {
     // alert("hello")
    // if (newMessage) {
      // socket.emit("stop typing", selectedChat._id);

     // if(!pic || !newMessage){
     //   alert("no content")
     //   return
     // }
      console.log(pic)
      // return
      try {
        if(!pic){
              const { data } = await axios.post(
              "/api/message",
              {
                content: newMessage,
                chatId: selectedChat._id,
              }
            );
            socket.emit("new message", data);
            setMessages([...messages, data]);
            setNewMessage("");  
        }else{
             const formData = new FormData();
             formData.append("chatId", selectedChat._id)
             formData.append("chatimages", pic)

             const { data } = await axios.post("/api/message",formData);
              setSelectedImage(null)
              setPic(null)
            socket.emit("new message", data);
            setMessages([...messages, data]);
            setNewMessage(""); 
        }
        
        
      } catch (error) {
         console.log(error)
      }
   
  };
  

  console.log(messages)

  const clientItems = [
    {
      _id:"648d6bd4c5b55f8753ebaba3",
      doctorID:"643e0febaaa4c828bb070ba7",
      name: 'Dr. Lalit',
      status: "Active",
      waitlist : "3 ",
      designation: 'Senior vet, xyz hospital',
      qulifications: 'MBBS in vetnary science, M.D.',
      experience: '5 year of experice in banglore pet hospital',
      hospital: 'xyz hospital, banglore',
      timing: '8am - 12pm and 5pm - 8pm',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis necessitatibus ut',
      image: '/assets/img/doc1.jpeg'
    },
    {
     _id:"641e86de4febf0950ca43211",
      doctorID:"642af8380e1b2b4be73e75ab",
      name: 'Dr. Devyani p',
      status: "Active",
      waitlist : "3 ",
      designation: 'Senior vet, xyz hospital',
      qulifications: 'MBBS in vetnary science, M.D.',
      experience: '5 year of experice in banglore pet hospital',
      hospital: 'xyz hospital, banglore',
      timing: '8am - 12pm and 5pm - 8pm',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis necessitatibus ut',
      image: '/assets/img/doc4.jpeg'
    },
  ];

  const showInfo = async(index,id,userId) => {
    setActiveTab(index);
    // setSelectedChatID(id)
    setUserID(userId)
    // accessChat()
    setOpenedDocInfo(true)
  };

 const openChatModal=()=>{
    setOpened(true)
    setOpenedDocInfo(false)
 }


socket.on('eventName', (data) => {
  console.log(data)
});

function testSocket(){
   console.log("hello")
   socket.emit('eventName', "hi");
}
  
function handleReasonInput(e){
   setReason(e.target.value)
}

function handleFileInput(e){
  
}

function accessChat(chat) {
    fetchMessages(chat)
    const pic = getSenderProfilePic(userdata.user , chat.users)
    setSenderProfilePic(pic)
    const name = getSenderName(userdata.user , chat.users)
    setSenderProfileName(name)
    setSelectedChat(chat)
    socket.emit("join chat", chat._id);
}

 const getSenderName = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1].displayName : users[0].displayName;
};

 const getSenderProfilePic = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1].profilePic : users[0].profilePic;
};

  const [time, setTime] = useState(300); // 15 minutes in seconds
  const [isActive, setIsActive] = useState(false);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const startCountdown = () => {
    setTime(300); // Reset to 15 minutes (10 seconds)
    setIsActive(true); // Activate the countdown
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
console.log(isActive,session)
  return (
    <div className=" font-[poppins] ">
      <div className="bg-white h-[800px] relative max-w-2xl mx-auto p-5">
        <div className=" text-center mt-4">
          <h2 className='font-light text-amber-500 tracking-wide drop-shadow-md text-3xl '>VET <span className='font-semibold'>Chat-Box</span></h2>
          <h3 className='uppercase text-base text-gray-500 font-normal relative mt-6 mx-0 pb-1 tracking-wide text-center'>Our Supportive Doctors</h3>
          <div className='  h-[2px] bg-gray-500 w-24 mx-auto mb-8'></div>
        </div>
           {
            !selectedChat ?
            <div>
            <div className="flex gap-2 text-sm">
              {clientItems.map((item, index) => (
                <div
                  key={index}
                  onClick={() => showInfo(index,item._id,item.doctorID)}
                >
                  <div className="flex justify-center cursor-pointer">
                    <img className='w-24 h-24 object-cover rounded-full' src={item.image} alt="" />
                  </div>
                  <div className="flex justify-center">
                    <h5 className="">{item.name}</h5>
                 {/* 
                    <small className="h-full">{item.status === "Active" ? <div className = "h-2 w-2 bg-green-600 rounded-full mt-2"></div> : <div className = "h-2 w-2 bg-red-600 rounded-full mt-2"></div>}</small>
                    
                    <small className={`${item.status === "Active" ? "block" : "hidden"}`}><span className='text-red-700 text-base font-medium'>{item.waitlist}</span><span className='text-gray-600 tracking-wider'> Waitlist</span></small>
                    
                    <p className=" hidden">{item.description}</p>*/}
                  </div>
                </div>
              ))}
            </div>
             <div className="grid gap-2 mt-5">
             {
                chats && chats.map((c,i)=>{
                  if(userdata && userdata.user && !userdata.user.isDoctor){
                    if(activeSessionChat !==c._id){
                      return
                    }  
                  }
                  

                   return(
                       <div onClick={()=>accessChat(c)} className="relative bg-gray-200 p-2 rounded-lg flex flex-col gap-2  cursor-pointer hover:bg-gray-300" key={c._id}>
                           <div className="flex items-center gap-2">
                           <div><img src={getSenderProfilePic(userdata.user , c.users)} className="w-6 h-6 rounded-full"/></div>
                           <div className="font-semibold">{getSenderName(userdata.user , c.users)}</div>
                           </div>
                           <div>
                              <span className="text-xs text-gray-600 px-8">{c.latestMessage && c.latestMessage.content}</span>
                           </div>
                           <div className="flex justify-end text-sm absolute right-2">
                             {session ?<span className="rounded-md bg-green-500 px-2 py-1">Ongoing</span> :""}
                           </div>
                       </div>
                    )
                })
              }
            </div>
            </div>
            :
          <div className="">
          <div className="flex cursor-pointer gap-2 justify-between p-3 bg-amber-100 max-w-md mx-auto">
          <div>
          <button onClick={()=>{setSelectedChat(null),fetchChats()}}  >
            <img src="/assets/icons/back-arrow.svg" className="w-5"/>
          </button>
          </div>
          <div className="text-center w-full flex justify-center items-center gap-2">
           {senderProfileName}<span><img src="/assets/icons/indianflag.svg" className="w-4 h-4 object-cover"/></span>
          </div>
          <div>
                  

            {
              userdata && userdata.user && !userdata.user.isDoctor ? 
              <span>{formatTime(time)}</span>
              :
              <div>
                <Menu shadow="md" width={150} position = "bottom-end" withArrow transition="pop-bottom-right">
                            <Menu.Target>
                              <div className="">
                                {/*<BsThreeDotsVertical/>*/}
                              <img src="/assets/icons/menu-dots-vertical.svg" className="w-5 h-5"/>
                              </div>                       
                            </Menu.Target>

                            <Menu.Dropdown >
                               <Menu.Item icon={<img src="/assets/icons/startchat.svg" className="w-5 h-5" />} onClick={startSession}>
                                  startSession
                               </Menu.Item>
                               <Menu.Item icon={<img src="/assets/icons/endchat.svg" className="w-5 h-5" />} onClick={stopSession}>
                                  End chat
                               </Menu.Item>
                               
                            </Menu.Dropdown>
                  </Menu>
              </div>
            }
          
          </div>
          </div>
          <div className="flex">
          <div className="w-full flex justify-center"> 
             {
              loading ?
              <div className="absolute flex flex-col items-center justify-center mt-10">
              <img className="w-24" src="/gif/spinner.svg"/>
              <span>Loading..</span>
              </div>
              :
              <div>

              <MessageContent setPic={setPic} selectedImage={selectedImage} setSelectedImage={setSelectedImage} session={session} isActive={isActive} senderProfilePic={senderProfilePic} messages={messages} userdata={userdata} newMessage={newMessage} setNewMessage={setMessages} sendMessage={sendMessage} handleTextChange={handleTextChange}/>                            
              
              </div>
             }           
          </div>
          </div>
          </div>
           }
      </div>
      
      <Modal
                  opened={opened}
                  onClose={() => setOpened(false)}
                  title="Chat"
      >
       <div className="text-xl font-bold">
         Dog Info
       </div>
       <div className="grid grid-cols-2 bg-gray-100 my-3 p-2 text-sm gap-2">
          <label className="font-bold">Name</label>
          <div className="text-gray-800">{dogInfo.name}</div>
          <label className="font-bold">Age</label>
          <div className="flex gap-2">
          <div className="text-gray-800">{dogInfo.month} Month(s)</div>
          <div className="text-gray-800">{dogInfo.year} Year(s)</div>
          </div>
          <label className="font-bold">Weight</label>
          <div className="text-gray-800">{dogInfo.weight} K.g.</div>
          <label className="font-bold">Breed</label>
          <div className="text-gray-800">{dogInfo.breed}</div>
          <label className="font-bold">Gender</label>
          <div className="text-gray-800">{dogInfo.gender}</div>
       </div>
       <div className="text-xl font-bold mt-3">
         Select A Reason
       </div>
       <div>
         <select className="w-full p-2 mt-3">
            <option>Reason1</option>
            <option>Reason2</option>
            <option>Reason3</option>
            <option>Reason4</option>
            <option>Reason5</option>
            <option>Reason6</option>
         </select>
       </div>
       <div className="text-xl font-bold mt-3">
         A Note to doctor
       </div>
        <div className="mt-3">
            <textarea onChange={handleReasonInput} placeholder="write a reason" className=" h-40 w-full bg-gray-100 p-2 border"/>   
        </div>
{/*        <div className="text-sm grid gap-2">
           <p className="text-md font-bold">{"Attach a file. (image,video)"}</p>
           <input onChange={handleFileInput} type="file"/>
        </div>*/}
        <div className="text-end">
        <button onClick={()=>createChatRoom()} className="p-2 rounded-md text-white bg-amber-500">Submit</button>
        </div>
      </Modal>

       <Modal
                  opened={openDocInfo}
                  onClose={() => setOpenedDocInfo(false)}
                  size={"xl"}
                  // title="Chat"
      >
            <DoctorInfo clientItems={clientItems} activeTab={activeTab} openChatModal={openChatModal}/>
      </Modal>


    </div>
  );
};

export default Chat;

