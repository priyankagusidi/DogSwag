export default function Header({handleStartChat}){
	return(
		<div className="p-4 fixed bg-white w-full border-b border-gray-300 z-10">
                 <h3 className="text-lg font-semibold text-[#101010] hidden md:block">Vet Chat</h3>
                <div className="flex justify-center items-center">
                  <img src="/m_arrow-left.svg" className="w-7 block md:hidden"/>
                  <button className="ml-auto justify-end block md:hidden p-2 bg-yellow-500 rounded-lg text-white hover:after:content-['_↗']" onClick={handleStartChat}>Start Chat</button>
               </div>
        </div>
       		)
}


