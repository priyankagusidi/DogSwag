import TimeBar from './TimeBar';
import Doc from './doctorInfo'
import User from './userInfo'
import {Modal,Popover} from '@mantine/core';
import {useState} from 'react';
// import AddPrescription from './addPrescription'
import ViewPrescription from './prescription/view'
import Prescription from './prescription/index'
import {useRouter} from 'next/router'
import Organiser from '@/components/calender/index'
import ChatInputField from './messages';
import moment from 'moment';

// ViewPrescription
export default function Info({messages,setShowSessionChats,showSessionChats,setSessionID,sessionList,chatID,dogdata,isPaused,pauseResumeCountdown,isPrescribed,setIsPrescribed,handleIsPrescribed,sessionID,info,isMenuActive,session,startSession,userdata,hospitalName,experience,availabletime,formatTime,time,stopSession}){
   

   console.log(messages)
   const [presc,setPresc] = useState(false)
   const [showOverlay, setShowOverlay] = useState(false);
   const router = useRouter()
   const [openOrganiser,setOpenOrganiser] = useState(false)

  

  const handleMouseEnter = () => {
    setShowOverlay(true);
  };

  const handleMouseLeave = () => {
    setShowOverlay(false);
  };

  function openSessionChats(id){
    setShowSessionChats(true)
    setSessionID(id)
  }




	return(

      <div className={`flex flex-col gap-2 w-full lg:w-4/12 z-10 ${isMenuActive ? "absolute":"hidden lg:block"} right-0 bg-white justify-center p-2`}>

        {/* <div>
            <h3 className='font-semibold p-2'>Members</h3>
            <ul className='p-2  flex flex-col gap-2'>
              <li className='p-2 flex gap-2 bg-amber-100 rounded-md w-40 truncate text-xs items-center'>
                <span>Doctor Name</span> 
                <div className='w-3 h-3 rounded-full bg-green-500 pulse'></div>
              </li>
              <li className='p-2 flex gap-2 bg-amber-100 rounded-md w-40 truncate text-xs items-center'>
                <span>Bapun Hansdah</span> 
                <div className='w-3 h-3 rounded-full bg-green-500 pulse'></div>
              </li>
            </ul>
        </div> */}



        <div className=''>
          <h3 className='font-semibold p-2 flex items-center gap-2'>History
               <img src='/assets/icons/plus.svg' onClick={()=>setShowSessionChats(!showSessionChats)} className='w-5 cursor-pointer'/>
          </h3>
          <ul className='p-2 h-[20vh] overflow-scroll'>
            {
             sessionList?.length ? sessionList?.map((s,i)=>{
                return(
                  <li key={s._id} onClick={()=>openSessionChats(s._id)} className={`p-2 ${s._id == sessionID ? "bg-gray-200":"" } text-xs hover:bg-gray-100 cursor-pointer rounded-md`}>{moment(s.createdAt).format("DD MMM YY HH:mm")}</li>
                )
              })
              :
              <div>
                <h3 className='text-xs'> No sessions has been created yet.</h3>
              </div>
            }
          </ul>
        </div>

        {
          showSessionChats && 
          <div>
            
            <div className="flex flex-col w-full gap-4 border h-[60vh] overflow-scroll p-2">
          {/* Render chat messages here */} 
          {messages &&
            messages.map((c, i) => {
              const isUserMessage = userdata?.user?._id === c.sender._id;
              const messageClass = isUserMessage ? 'flex justify-end' : 'flex justify-start';

              return (
                <div key={c?._id} className={`flex gap-2 ${messageClass}`}>
                  {
                    c?.type==="text" ?
                    <span className={` px-2 py-1 rounded-lg  whitespace-pre-wrap text-xs ${isUserMessage ? 'ml-2 bg-purple-500 text-white' : 'mr-2 bg-gray-200'}`}>
                      {c.content}
                    </span>:
                    c?.type === "image" ?
                    <img onClick={()=>handleImageModal(c?.content,c?.type)} src={c?.content} className={`rounded-lg text-xs w-28 rounded-lg border h-40 object-cover ${isUserMessage ? 'ml-2' : 'mr-2'}`}/>
                    :
                    c?.type === "video" ?
                    <div onClick={()=>handleImageModal(c?.content,c.type)} className="relative flex items-center justify-center">
                    <video  src={c?.content} className={`rounded-lg text-xs w-28 rounded-lg brightness-50 border h-40 object-cover ${isUserMessage ? 'ml-2' : 'mr-2'}`}/>
                    <img src="/play.svg" className="absolute w-5 h-5 cursor-pointer"/>
                    </div>
                    :
                    <></> 
                  }              
                    <div className={`${isUserMessage ? 'mx-0' : 'my-0'} text-[.6em]`}>{moment(c.createdAt).format("HH:mm")}</div>

                </div>
              );
            })
          }

         
          {/* End of chat messages */}
        </div>
          </div>
        }
        {
        !showSessionChats &&
        <div className="block lg:hidden">
          <div onClick={()=>{setPresc(true),setIsPrescribed(false)}} className={`flex gap-2 ${isPrescribed?"bg-green-500 animate-pulse ":"bg-green-200"} hover:bg-green-300 cursor-pointer w-full py-4 justify-center items-center rounded-lg`}>
            <img src="/pillSVG.svg" className="w-10" alt="" />
            <span className="text-green-800">
               Prescription
            </span>
          </div>
        </div>
        }
        <Modal
          opened={presc}
          onClose={()=>{setPresc(false),setIsPrescribed(false)} }
          title={"Prescription"}
        >
        {
          userdata.user.isDoctor ?
         <Prescription chatID={chatID} handleIsPrescribed={handleIsPrescribed} sessionID={sessionID} isPrescribed={isPrescribed} setIsPrescribed={setIsPrescribed}/>
          :
         <ViewPrescription chatID={chatID} isPrescribed={isPrescribed} setIsPrescribed={setIsPrescribed}/>
        }
        </Modal>


        {
           !showSessionChats && 

           <div className="hidden lg:block">
           <Popover 
            radius={"lg"}
            position={"left"}
            shadow={"5px 5px 10px gray"}
            width={360} withArrow
            onClick={()=>setIsPrescribed(false)} 
            closeOnClickOutside={false}
           >
           <Popover.Target>
           <div className={`flex gap-2 ${isPrescribed?"bg-green-500 animate-pulse ":"bg-green-200"} hover:bg-green-300 cursor-pointer w-full py-4 justify-center items-center rounded-lg`}>
             <img src="/pillSVG.svg" className="w-10" alt="" />
             <span className="text-green-800">
                 Prescription
               </span>
           </div>
           </Popover.Target>
            <Popover.Dropdown>
           {
             userdata.user.isDoctor ?
            <Prescription chatID={chatID} handleIsPrescribed={handleIsPrescribed} sessionID={sessionID} isPrescribed={isPrescribed} setIsPrescribed={setIsPrescribed}/>
             :
            <ViewPrescription chatID={chatID} isPrescribed={isPrescribed} setIsPrescribed={setIsPrescribed}/>
           }
           </Popover.Dropdown>
           </Popover>
           </div>


        }

  
         

          {/* <div onClick={()=>setOpenOrganiser(true)} className={`flex gap-2 mt-5 bg-yellow-300 cursor-pointer w-full py-4 justify-center items-center rounded-lg`}>
            <img src="/calender.svg" className="w-10" alt="" />
            <span className="text-yellow-800">
              Organiser
            </span>
          </div> */}
            <Modal
             opened={openOrganiser}
             onClose={()=>setOpenOrganiser(false)}
            
            >
              <Organiser dogdata={dogdata}/>
            </Modal>
            {
               !showSessionChats && 

                       <div 
           className="flex justify-center py-2 relative items-center cursor-pointer"
           onMouseEnter={handleMouseEnter}
           onMouseLeave={handleMouseLeave}
        >
          <TimeBar time={time} />
          <span className="absolute">{formatTime(time)}</span>
          {userdata.user.isDoctor && showOverlay && session && (
            <div className="absolute">
              <button onClick={pauseResumeCountdown} className="bg-orange-500 p-2 rounded-xl text-white">
                {!isPaused?"Pause":"resume"}
              </button>
            </div>
          )}
        </div>
            }
{
   !showSessionChats && 

   <div>

   {
       userdata.user.isDoctor ?
      <>
       {
        session ?
        <button
      className="w-full mt-2 rounded-lg py-4 px-6 border-2 border-red-600 bg-red-500 text-white"
      onClick={stopSession}
    >
      End Conversation
    </button>
    :
    <button
      className="w-full mt-2 rounded-lg py-4 px-6 border-2 border-green-600 bg-green-500 text-white"
      onClick={startSession}
    >
      Start Conversation
    </button>
       }
      
    
    </>
    :
      !session ?
      <button
        className={`w-full mt-2 rounded-lg py-4 px-6 border-2 border-red-600  bg-red-500 text-white`}
        onClick={()=>router.push('/vetchat')}
      >
      Leave Chat
      </button>
      :
      <button
      className={`w-full mt-2 rounded-lg py-4 px-6 border-2 border-red-600 ${!session ? "opacity-70" :""} bg-red-500 text-white`}
      onClick={stopSession}
      disabled={!session}
      >
         End Conversation
      </button>
   
    }


   </div>

}

     
       

        
      </div>
		)
}


