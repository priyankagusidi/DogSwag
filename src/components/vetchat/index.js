import Terms from './terms'
import DoctorList from './doctorlist'
import Doctor from './doctor'
import {useEffect, useState} from 'react'
import Header from './header'
import {Modal} from '@mantine/core'
import {useRouter} from 'next/router'

export default function VetChat({userdata,dogdata}){
	const [agreed,setAgreed] = useState(userdata?.user?.hasAgreedVetChat)
	const [doctorID,setDoctorID] = useState(null);
    // const [info,setInfo] = useState(dogdata ? dogdata.profile:{})
    const [isChatModalOpen, setIsChatModalOpen] = useState(false); // State variable for chat modal visibility
    const [creditModal,setCreditModal] = useState(false)
    const [chatType,setChatType] = useState("")

  const [openSchedule,setOpenSchedule] = useState(false)

  const [notified,setIsNotified] = useState(userdata?.user?.isNotified || false)
  const [searchText,setSearchText] = useState("")
  const [search,setSearch] = useState("")
    const router = useRouter()

	const handleStartChat = (type) => {
		if(type === 'whatsapp'){
				   if(userdata?.user.chatCredit <= 3){
		    			setCreditModal(true)
				      return
				  }	
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



	

  

  // Function to check if the current time is within the given time range
  function isTimeInRange(doctor) {

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


 function handleSearch(e) {
	 
 	 setSearchText(e.target.value)
 }

 function submitSearch(){
 	    setSearch(searchText)
 }


 useEffect(()=>{
	if(searchText.length < 1){
		setSearch('')
	}
 },[searchText])


  console.log(search,searchText)


   
	return(
		  <div className="h-full relative flex flex-col bg-white font-Inter">
         	<Header handleSearch={handleSearch} submitSearch={submitSearch} notified={notified} Schedule={Schedule} setDoctorID={setDoctorID} doctorID={doctorID} handleStartChat={handleStartChat}/>
            <div className="mt-16 md:mt-14 bg-white h-full">
            {doctorID ? <button className="ml-5 mt-5 text-gray-500 hidden md:block" onClick={()=>setDoctorID(null)}> {" < doctors"} </button>: <></> }
		   {
		     agreed ?  doctorID ? <Doctor 
		                            dogdata={dogdata}
		                            isChatModalOpen={isChatModalOpen} 
		                            handleStartChat={handleStartChat}
		                            setIsChatModalOpen={setIsChatModalOpen}
		                            doctorID={doctorID}
		                            chatType={chatType}
		                            isTimeInRange={isTimeInRange}
		                            userdata={userdata}
		                            openSchedule={openSchedule}
		                            setOpenSchedule={setOpenSchedule}
		                            notified={notified}
		                            setIsNotified={setIsNotified}
		                            Schedule={Schedule}

		                           /> : 
		                           <DoctorList 
		                             setDoctorID={setDoctorID}
		                             search={search}
		                             

		                           /> : 
		                           <Terms 
		                             setAgreed={setAgreed}
		                          />
		   }
		   </div>
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
		  </div>
		)
}