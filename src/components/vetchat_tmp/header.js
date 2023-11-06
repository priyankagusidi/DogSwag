export default function Header({handleStartChat,doctorID,setDoctorID}){
	
function sendWhatsapp(){
            window.open(
              `http://wa.me/919611700874?text=`,
              "_target"
            );
}


    return(
		!doctorID ?
    <div className="p-4 fixed bg-white w-full border-b border-gray-300 z-10">
                <h3 className="text-lg font-semibold text-[#101010] ">Vet Chat</h3>
               
    </div>
    :
    <div className="p-4 fixed bg-white w-full border-b border-gray-300 z-10">
                <h3 className="text-lg font-semibold text-[#101010] hidden md:block">Vet Chat</h3>
                <div className="flex justify-between items-center">
                  <img onClick={()=>setDoctorID(null)} src="/m_arrow-left.svg" className="w-7 block md:hidden"/>
                  <div className="flex gap-2 ">
                     <button className="ml-auto justify-end p-4 bg-green-500 block md:hidden text-white rounded-lg hover:after:content-['_↗']" onClick={()=>handleStartChat('whatsapp')}>Whatsapp</button>
                     <button className="ml-auto justify-end block md:hidden p-2 bg-yellow-500 rounded-lg text-white hover:after:content-['_↗']" onClick={()=>handleStartChat('normal')}>Start Chat</button>
                  </div>
               </div>
        </div>
    )
}