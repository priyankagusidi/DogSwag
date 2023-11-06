import {useState} from 'react'
import Modal from './modal'
import ContributeModal from './contributeModal'
export default function Index({userdata}){
	const [isModalOpen,setIsModalOpen] = useState(false)
	const [isContributeModalOpen,SetContributeModalOpen] = useState(false)
	const [credit,setCredit] = useState(userdata ? userdata.user.chatCredit: 0)

	return(
		  <div className='p-4 flex flex-col gap-4'>
		  	

{/*		  	<div className="max-w-xs border border-gray-300 gap-2 items-center rounded-lg flex flex-col xs:flex-row w-full justify-between p-3">
		  		<div className="flex flex-col xs:flex-row  gap-4 items-center">
		  		<img src="/contribute.svg" className="w-24 h-24"/>
                <div className="flex flex-col gap-1">
		  		  <h3 className="text-md font-semibold"></h3>
		  		  <div className="text-sm text-gray-500 flex gap-2 items-center">
		  		    <h4></h4>

		  		  </div>
                </div>
                </div>
                <div className="">
		  	    	<button id={"vetchat_contribute_button"} onClick={()=>SetContributeModalOpen(true)} className="w-24 p-2 bg-green-500 text-white rounded-lg">Contribute</button>
		  		</div>
		  	</div>*/}
            
            <div className="max-w-md border border-gray-300 gap-2 items-center rounded-lg flex flex-col xs:flex-row w-full justify-between p-3">
		  		<div className="flex flex-col xs:flex-row  gap-4 items-center">
		  		<img src="/coin.svg" className="w-24 h-24"/>
                <div className="flex flex-col gap-1">
		  		  <h3 className="text-md font-semibold">Chat credit</h3>
		  		  <div className="text-sm text-gray-500 flex gap-2 items-center">
		  		    <h4>Available</h4>
		  		    <span className={`${credit ? "bg-green-500":"bg-red-500"}  px-1 text-black rounded-sm`}>{credit}</span>
		  		  </div>
                </div>
                </div>
                <div className="">
		  	    	<button id={"vetchat_buy_credit_button"} onClick={()=>setIsModalOpen(true)} className="w-24 p-2 bg-[#FFCB07] text-white rounded-lg">Buy Credit</button>
		  		</div>
		  	</div>

		  	
		  	<Modal credit={credit} setCredit={setCredit} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
		  </div>
		)
} 