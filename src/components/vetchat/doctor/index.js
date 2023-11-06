import Doctor from './body'
import {useState,useEffect} from 'react'
import Header from './header'
import {Modal} from '@mantine/core'
import {useRouter} from 'next/router'
import socket from '@/utils/socket';

export default function VetChat({userdata,dogdata}){
    const router = useRouter()

  const [agreed,setAgreed] = useState(userdata?.user?.hasAgreedVetChat)
  // const [doctorID,setDoctorID] = useState(router?.q);
    // const [info,setInfo] = useState(dogdata ? dogdata.profile:{})
    const [isChatModalOpen, setIsChatModalOpen] = useState(false); // State variable for chat modal visibility
    const [creditModal,setCreditModal] = useState(false)
    const [chatType,setChatType] = useState("")
    const [doctor, setDoctor] = useState(null);

  const [openSchedule,setOpenSchedule] = useState(false)

  const [notified,setIsNotified] = useState(userdata?.user?.isNotified || false)

   const [isPaid, setIsPaid] = useState(false);
    
  const [scheduleAgreed,setscheduleAgreed] = useState(false)

  const [showAppointments,setShowAppointments] = useState(false)

  const handleStartChat = (type,doctor) => {
    if(type === 'whatsapp'){
           if(userdata?.user.chatCredit <= 3){
              setCreditModal(true)
              return
          } 
    }

      if(!isTimeInRange(doctor)){
        alert("Not available")
        return
      }
    
      setChatType(type)
      setIsChatModalOpen(true); // Show the chat modal
  };

  function closeCreditModal(){
    setCreditModal(false)
    router.push('/setting')
  }


  function Schedule(argument) {
  setOpenSchedule(true)
 
  setIsNotified(false)
}

  function closepaymentmodal(){
    setIsPaid(false)
    setOpenSchedule(true)
    setscheduleAgreed(true)
    setShowAppointments(true)
    socket.emit('notify',doctor?.userID)
  }

console.log(router.query)

  
  useEffect(() => {
    // Check if the 'modal' query parameter exists
    if (router.query.payment === 'true') {
      // Remove the 'modal' query parameter
      setIsPaid(true)
      delete router.query.payment;
      // Replace the URL without the 'modal' parameter
      router.replace({ pathname: router.pathname,query:router.query});
    }
  }, []);
  

  // Function to check if the current time is within the given time range
  function isTimeInRange(doctor) {
    // socket.emit('notify',doctor?._id)
      const currentTime = new Date();
      // Extract the hours and minutes from the current time
      const currentHour = currentTime.getHours();
      const currentMinutes = currentTime.getMinutes();
     
      const [startHour, startMinute] = doctor.availTimeStart.split(":").map(Number);
      const [endHour, endMinute] = doctor.availTimeEnd.split(":").map(Number);

      const startMinutes = startHour * 60 + startMinute;
      const endMinutes = endHour * 60 + endMinute;

      // Convert current time to minutes
      const currentMinutesTotal = currentHour * 60 + currentMinutes;

      // Check if the current time is between start and end time
      return currentMinutesTotal >= startMinutes && currentMinutesTotal <= endMinutes;
  }





   
  return(
      <div className="h-full relative flex flex-col bg-white font-Inter">
          

          <Modal
           opened={creditModal}
       onClose={closeCreditModal}
       size="sm"
       centered
          >
           <div className="text-center font-Inter  flex flex-col justify-center items-center">
           <img src="/saddog.png" className="w-32"/>
           <p className="text-gray-500  mt-2 ">Sorry you don’t have enough Chat Coins to start this conversation</p>
           <button onClick={closeCreditModal} className="p-2 bg-green-500 text-white rounded-xl mt-2">Buy credits for Whatsapp</button>
           </div>
          </Modal>


            <Modal
             opened={isPaid}
             onClose={closepaymentmodal}
             size="sm"
             centered
            >
             
                <h2 className="text-xl font-semibold text-center">Payment Done!</h2>
                <p className="text-center text-gray-600">You will be notified via SMS once the booking is confirmed.</p>


            </Modal>



          <Header doctor={doctor}  setDoctor={setDoctor} notified={notified} Schedule={Schedule} doctorID={router?.qurery?.id} handleStartChat={handleStartChat}/>
            <div className="mt-16 md:mt-14 bg-white h-full">
             <button className="ml-5 mt-5 text-gray-500 hidden md:block" onClick={()=>router.push('/vetchat')}> {" < doctors"} </button>
             <Doctor 
                    dogdata={dogdata}
                    isChatModalOpen={isChatModalOpen} 
                    handleStartChat={handleStartChat}
                    setIsChatModalOpen={setIsChatModalOpen}
                    // doctorID={doctorID}
                    chatType={chatType}
                    isTimeInRange={isTimeInRange}
                    userdata={userdata}
                    openSchedule={openSchedule}
                    setOpenSchedule={setOpenSchedule}
                    notified={notified}
                    setIsNotified={setIsNotified}
                    Schedule={Schedule}
                    isPaid={isPaid}
                    scheduleAgreed={scheduleAgreed}
                    setscheduleAgreed={setscheduleAgreed}
                    showAppointments={showAppointments}
                    setShowAppointments={setShowAppointments}
                    doctor={doctor} 
                    setDoctor={setDoctor}
                   /> 
       </div>
         
      </div>
    )
}