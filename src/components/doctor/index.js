import Header from './header'
import Body from './body'
import {useState} from 'react'
import {useRouter} from 'next/router'

export default function Index({doctordata,userdata,isEditing,button_title}){
  const [isChatModalOpen, setIsChatModalOpen] = useState(false); // State variable for chat modal visibility
    
  const [openSchedule,setOpenSchedule] = useState(false)

  const [notified,setIsNotified] = useState(userdata?.user?.isNotified || false)


    const router = useRouter()
  const handleStartChat=()=>{
    router.push('/chatlist')
    return
  }


  function Schedule(){
    
    setOpenSchedule(true)
    setIsNotified(false)
}

  return(
         <>
          <Header  notified={notified} Schedule={Schedule} handleStartChat={handleStartChat}/>
          <div className="mt-16 md:mt-14">
                 <Body  openSchedule={openSchedule}
                                setOpenSchedule={setOpenSchedule}
                                notified={notified}
                                setIsNotified={setIsNotified}
                                Schedule={Schedule}
                                doctordata={doctordata} userdata={userdata} isEditing={true} isChatModalOpen={isChatModalOpen} handleStartChat={handleStartChat} setIsChatModalOpen={setIsChatModalOpen} link="" button_title="Start Chat"/>
            </div>
          
         </>
    )
}