export default function Header({Schedule,notified,handleStartChat,doctorID,setDoctorID,handleSearch,submitSearch}){
	
function sendWhatsapp(){
            window.open(
              `http://wa.me/919611700874?text=`,
              "_target"
            );
}


    return(
		!doctorID ?
    <div className="p-4 fixed bg-white w-full border-b border-gray-300 z-10 flex flex-col md:flex-row gap-2">
                <h3 className="text-lg font-semibold text-[#101010] p-1 ">Vet Chat</h3>
                <div className="flex flex-col md:flex-row gap-2">
                  <input onChange={handleSearch} placeholder="Search clinics" className="p-1 border"/>
                  <button onClick={submitSearch} className="bg-amber-300 rounded px-2">Search</button>
                </div>
                
    </div>
    :
    <div className="p-2 fixed bg-white w-full border-b border-gray-300 z-10">
                <h3 className="text-lg font-semibold text-[#101010] hidden md:block">Vet Chat</h3>
                <div className="flex justify-between items-center">
                  <img onClick={()=>setDoctorID(null)} src="/m_arrow-left.svg" className="w-7 block md:hidden"/>
                  <div className="flex gap-2 ">
                     <button onClick={Schedule} className={`ml-auto justify-end p-4  ${notified ? 'animate-pulse':''} block md:hidden text-white rounded-lg `}><img src="/calendar.svg" className="w-10"/></button>
                     <button className="ml-auto justify-end p-4  block md:hidden text-white rounded-lg " onClick={()=>handleStartChat('whatsapp')}><img src="/whatsapp-2.svg" className="w-10"/></button>
                     <button className="ml-auto justify-end block md:hidden p-2 rounded-lg text-white " onClick={()=>handleStartChat('normal')}><img src="/chat.svg" className="w-10"/></button>
                  </div>
               </div>
        </div>
    )
}