import Terms from './terms'
import DoctorList from './doctorlist'
import Doctor from './doctor'
import {useState} from 'react'
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
    
    const router = useRouter()

	const handleStartChat = (type) => {
		if(userdata?.user.chatCredit <= 0){
			setCreditModal(true)
			return
		}
        setChatType(type)
	    setIsChatModalOpen(true); // Show the chat modal
	};

	function closeCreditModal(){
		setCreditModal(false)
		router.push('/setting')
	}


   
	return(
		  <div className="h-full relative flex flex-col bg-white font-Inter">
         	<Header setDoctorID={setDoctorID} doctorID={doctorID} handleStartChat={handleStartChat}/>
            <div className="mt-16 md:mt-14 bg-white h-full">
            {/*{doctorID ? <button className="ml-5 mt-5 text-gray-500 hidden md:block" onClick={()=>setDoctorID(null)}> {" < doctors"} </button>: <></> }*/}
		   {
		     agreed ?
                   <DoctorList 
                     setDoctorID={setDoctorID}
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
           <button onClick={closeCreditModal} className="p-2 bg-[#FFCB07] text-white rounded-xl mt-2">Buy Chat Coins</button>
           </div>
          </Modal>
		  </div>
		)
}