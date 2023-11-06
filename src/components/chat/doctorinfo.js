export default function DoctorInfo({clientItems,openChatModal,activeTab}){
	return(
		  <div className="w-full flex">
            <div className="">
              <img className='rounded-sm w-96 h-96 object-cover' src={clientItems[activeTab].image} alt="client image" />
            </div>

            <div className="flex p-5">
              <div className='grid'>
              <div className=''>
                <h4 className="text-xl text-amber-500">{clientItems[activeTab].name}</h4>  
                <small className=" text-gray-500">{clientItems[activeTab].designation}</small>
              </div>
              <p className=" text-sm sm:mt-10 mt-5 "><span className='font-semibold text-gray-600'>Qulifications :</span> <span className='font-medium text-gray-500'>{clientItems[activeTab].qulifications}</span></p>
              <p className="show-description text-sm"><span className='font-semibold text-gray-600'>Past experience :</span> <span className='font-medium text-gray-500'>{clientItems[activeTab].experience}</span> </p>
              <p className="show-description text-sm"><span className='font-semibold text-gray-600'>Hospital/Clinic name :</span>  <span className='font-medium text-gray-500'>{clientItems[activeTab].hospital}</span> </p>
              <p className="show-description text-sm"><span className='font-semibold text-gray-600'>Available timing :</span> <span className='font-medium text-gray-500'>{clientItems[activeTab].timing}</span> </p>
              <p className="show-description text-sm"><span className='font-semibold text-gray-600'>Description :</span> <span className='font-medium text-gray-500'>{clientItems[activeTab].description}</span></p>
              <button onClick={openChatModal} className='border-2 border-amber-500 text-gray-700 hover:text-white py-[10px] px-4 mt-2 uppercase transition-colors hover:bg-amber-500 duration-300 flex items-center justify-center space-x-3'>
              <img className='h-8 w-8' src="/assets/icons/message.svg" alt="" />
              <span>chat now</span>
              </button>
              </div>
            </div>
          </div>
		)
}