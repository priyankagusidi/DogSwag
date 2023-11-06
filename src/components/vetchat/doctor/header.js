import {useRouter} from 'next/router'

export default function Header({Schedule,notified,handleStartChat,doctorID,doctor}){

const router = useRouter()

function sendWhatsapp(){
            window.open(
              `http://wa.me/919611700874?text=`,
              "_target"
            );
}


    return(
    <div className="p-2 fixed bg-white w-full border-b border-gray-300 z-10">
                <h3 className="text-lg font-semibold text-[#101010] hidden md:block">Vet Chat</h3>
                <div className="flex justify-between items-center">
                  <img onClick={()=>router.push('/vetchat')} src="/m_arrow-left.svg" className="w-7 block md:hidden"/>
                  <div className="flex gap-2 items-center">
                     <button onClick={Schedule} className={ ` ${notified ? 'animate-pulse':''} ml-auto justify-end p-4  block md:hidden  rounded-lg flex flex-col items-center text-xs`}><img src="/calendar.svg" className="w-6"/>Schedule</button>
                     <button className=" ml-auto justify-end p-4  block md:hidden  rounded-lg flex flex-col items-center text-xs  " onClick={()=>handleStartChat('whatsapp',doctor)}><img src="/whatsapp-2.svg" className="w-6"/>Whatsapp</button>
                     <button className=" ml-auto justify-end block md:hidden p-2 rounded-lg  flex flex-col items-center text-xs  " onClick={()=>handleStartChat('normal',doctor)}><img src="/chat.svg" className="w-6"/>Chat</button>
                  </div>
               </div>
        </div>
    )
}