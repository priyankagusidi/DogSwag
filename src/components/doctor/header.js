export default function Header({handleStartChat,notified,Schedule}){
	return(
		<div className="p-4 fixed bg-white w-full border-b border-gray-300 z-10">
                 <h3 className="text-lg font-semibold text-[#101010] hidden md:block">Clinic</h3>
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold block md:hidden text-[#101010]">Clinic</h3>
                  <div className="flex gap-2">
                  <button onClick={Schedule} className={`ml-auto ${notified ? "animate-pulse":""} justify-end  bg-blue-500 text-white rounded-lg p-4 block md:hidden hover:after:content-['_↗']`}>Schedule</button>
                  <button className="ml-auto justify-end block md:hidden p-2 bg-yellow-500 rounded-lg text-white hover:after:content-['_↗']" onClick={handleStartChat}>Start Chat</button>
                  </div>
               </div>
        </div>
       		)
}