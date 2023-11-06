import Link from 'next/link'

const VetChatHomeChatSection = ()=>{
    return (
<section className="bg-[#9747FF] px-5 py-10 md:p-16 max-w-7xl mx-auto">
    <div className="hidden sm:block">

    <div className="text-white flex justify-start gap-4 mt-5">
        <div className="flex items-end"><img src="/drSarahLeeAvatar.png" className="w-5 h-5 object-cover" alt="" /></div>
        <button className="p-4 rounded-t-full rounded-br-full border border-white border-3 shadow-xl ">Advice for helping dog with arthritis?</button>
    </div>

    <div className="text-white flex  justify-end gap-4 mt-5">
        <button className="p-4 rounded-t-full rounded-bl-full border border-white border-3 shadow-xl ">Is this eye redness serious? Or just irritation?</button>
        <div className="flex items-end"><img src="/drSarahLeeAvatar.png" className="w-5 h-5 object-cover" alt="" /></div>
    </div>

    <div className="text-white flex justify-start gap-4 mt-5">
        <div className="flex items-end"><img src="/drSarahLeeAvatar.png" className="w-5 h-5 object-cover" alt="" /></div>
        <button className="p-4 rounded-t-full rounded-br-full border border-white border-3 shadow-xl ">Can anyone identify this cluster of bumps?</button>
    </div>


    <div className="text-white flex  justify-end gap-4 mt-5">
        <button className="p-4 rounded-t-full rounded-bl-full border border-white border-3 shadow-xl ">My Dog is Vomiting</button>
        <div className="flex items-end"><img src="/drSarahLeeAvatar.png" className="w-5 h-5 object-cover" alt="" /></div>
    </div>
    

    </div>

<div className="flex justify-center flex-col items-center my-4">
    <button className="font-Jumper text-2xl  w-fit bg-[#866FFA] text-white p-4 rounded-xl">{`Get`}</button>
    <button className="font-Jumper text-2xl w-fit bg-[#DFC6FF54] text-white p-4 rounded-xl">{`Solutions to`}</button>
    <button  className="font-Jumper text-2xl w-fit bg-white p-4 rounded-xl">{`Yours Dog's Problems`}</button>
    <Link href="/vetchat" className="mt-2">
            <button 
             className="bg-green-500 text-white text-lg lg:text-lg p-4 rounded-xl hover:after:content-['_↗']">Get Started
             </button>
    </Link>
</div>

    <div className="text-white flex justify-start gap-4 mt-5">
        <div className="flex items-end"><img src="/drSarahLeeAvatar.png" className="w-5 h-5 object-cover" alt="" /></div>
        <button className="p-4 rounded-t-full rounded-br-full border border-white border-3 shadow-xl ">Why is my dog not eating?</button>
    </div>


    <div className="text-white flex  justify-end gap-4 mt-5">
        <button className="p-4 rounded-t-full rounded-bl-full border border-white border-3 shadow-xl ">Weird growth thing on my dogs nose.</button>
        <div className="flex items-end"><img src="/drSarahLeeAvatar.png" className="w-5 h-5 object-cover" alt="" /></div>
    </div>

    <div className="text-white flex justify-start gap-4 mt-5">
        <div className="flex items-end"><img src="/drSarahLeeAvatar.png" className="w-5 h-5 object-cover" alt="" /></div>
        <button className="p-4 rounded-t-full rounded-br-full border border-white border-3 shadow-xl ">My dog is 10 years old with a UTI. What to do?</button>
    </div>

     <div className="text-white flex  justify-end gap-4 mt-5">
        <button className="p-4 rounded-t-full rounded-bl-full border border-white border-3 shadow-xl ">My dog is not drinking enough water.</button>
        <div className="flex items-end"><img src="/drSarahLeeAvatar.png" className="w-5 h-5 object-cover" alt="" /></div>
    </div>

</section>
    )
}

export default VetChatHomeChatSection