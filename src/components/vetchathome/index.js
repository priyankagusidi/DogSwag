import Link from 'next/link'

const VetChatHeader = () =>{
    return (
        <div className="max-w-7xl mx-auto py-8">
           
            <h4 className="text-3xl lg:text-[4rem] mb-4 mx-auto font-Jumper text-center lg:leading-[5rem]">
              <span className="text-[#BE389D]"> Connect instantly  </span> to top <span  className="text-[#62CD11]">doctors</span> and  get answers to   your queries from <span  className="text-[#2C86CF]"> anywhere</span> in the <span  className="text-[#2C86CF]"> world</span>
            </h4>
            <p className="text-lg text-center font-inter text-gray-500"> <span className="text-green-500">{` Free Chat `}</span> <span className="text-yellow-500"> {`|  Ask Questions  | `} </span><span className="text-orange-500">{` Get Answers `}</span></p>
              <div className="flex justify-center mt-5">
            <Link href="/vetchat">
            <button id={"vet_chat_get_started"}
             className="bg-purple-500 text-white text-xl lg:text-3xl p-4 rounded-xl hover:after:content-['_↗']">Get Started
             </button>
             </Link>
            </div>
            <img src="/assets/img/Chat.png" className="py-5" alt="" />
            <p className="text-lg text-center font-inter text-gray-500">DogSwag in partnership with Bangalore <br className="block md:hidden"/> Pet Hospital brings to you <span className="text-[#9747FF]">Vet Chat</span></p>
        </div>
    )
}

export default VetChatHeader