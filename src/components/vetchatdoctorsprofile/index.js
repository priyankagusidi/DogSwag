import Header from './header'
import Body from './body'
import {useState} from 'react'
export default function Index(){
  const [isChatModalOpen, setIsChatModalOpen] = useState(false); // State variable for chat modal visibility
    
  const handleStartChat = () => {
    setIsChatModalOpen(true); // Show the chat modal
  };

	return(
         <>
         	<Header handleStartChat={handleStartChat}/>
         	<div className="mt-16 md:mt-14">
                 <Body isChatModalOpen={isChatModalOpen} handleStartChat={handleStartChat} setIsChatModalOpen={setIsChatModalOpen} link="" button_title="Start Chat"/>
            </div>
         	
         </>
		)
}